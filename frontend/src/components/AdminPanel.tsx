import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { ActivityIndicator, Linking, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { api, ApprovalRow, PioneroFicha, User } from "@/src/api";
import { patriaPointLabels } from "@/src/data/patria";

type Tab = "inbox" | "dirigentes" | "fichas" | "events";

export function AdminPanel({ visible, onClose, user, colors, styles, onDataChange, initialTab }: any) {
  const [tab, setTab] = useState<Tab>(initialTab ?? "inbox");
  const [pending, setPending] = useState<ApprovalRow[]>([]);
  const [dirigentes, setDirigentes] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [decidingId, setDecidingId] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState<Record<string, string>>({});
  const pollTimer = useRef<any>(null);

  useEffect(() => {
    if (visible && initialTab) setTab(initialTab);
  }, [visible, initialTab]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [inbox, dpending] = await Promise.all([
        api.adminInbox().catch(() => ({ pending: [] })),
        api.pendingDirigentes().catch(() => ({ pending: [] })),
      ]);
      setPending(inbox.pending);
      setDirigentes(dpending.pending);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    load();
    pollTimer.current = setInterval(load, 10_000);
    return () => {
      if (pollTimer.current) clearInterval(pollTimer.current);
    };
  }, [visible, load]);

  const decide = async (row: ApprovalRow, approved: boolean) => {
    setDecidingId(row.approval_id);
    try {
      const note = rejectNote[row.approval_id] || undefined;
      await api.decideApproval(row.approval_id, approved, note);
      await load();
      onDataChange?.();
    } finally {
      setDecidingId(null);
    }
  };

  const decideDirigente = async (u: User, approve: boolean) => {
    setDecidingId(u.user_id);
    try {
      if (approve) await api.approveDirigente(u.user_id);
      else await api.rejectDirigente(u.user_id);
      await load();
    } finally {
      setDecidingId(null);
    }
  };

  const kindLabel = (row: ApprovalRow) => {
    if (row.kind === "patria") {
      const idx = parseInt(row.ref_id, 10);
      const label = patriaPointLabels[idx] ?? `Punto ${idx + 1}`;
      return `Patria · ${idx + 1}. ${label}`;
    }
    if (row.kind === "camping") {
      const dates = (row.start_date && row.end_date)
        ? `${row.start_date} al ${row.end_date}`
        : (row.date || "Fechas no especificadas");
      return `Campamento · ${row.place ?? "Campamento"} · ${row.nights ?? 0} días (${dates})`;
    }
    if (row.kind === "service") return `Servicio · ${row.text ?? ""} · ${row.nights ?? 0} h`;
    if (row.kind === "tribu") return `Tribu Tierra · ${row.text ?? row.ref_id}`;
    return `Progresión · ${row.stage?.toUpperCase() ?? ""}`;
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>PANEL DE JEFATURA</Text>
            <Text style={styles.pdfModalTitle}>Hola, {user?.name?.split(" ")[0] ?? "Dirigente"}</Text>
          </View>
          <Pressable testID="admin-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageSubtitle}>Refresca cada 10 s cuando este panel está abierto. Rojo = admin controls.</Text>

          <View style={[styles.medicalNotice, { backgroundColor: user?.credential_doc_path ? colors.surfaceSecondary : colors.surfaceTertiary, borderWidth: 1, borderColor: user?.credential_doc_path ? colors.success : colors.brandSecondary }]} testID="dirigente-credential-badge">
            <MaterialCommunityIcons name={user?.credential_doc_path ? "shield-check" : "shield-alert-outline"} size={20} color={user?.credential_doc_path ? colors.success : colors.brandSecondary} />
            <Text style={[styles.medicalNoticeText, { color: user?.credential_doc_path ? colors.success : colors.brandSecondary }]}>
              {user?.credential_doc_path ? `Credencial verificada · ${user?.credential_code || "sin código"}` : "Sube tu credencial desde tu perfil para reforzar cada aprobación."}
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 14 }}>
            <TabChip id="inbox" label={`Aprobaciones (${pending.length})`} active={tab === "inbox"} onPress={() => setTab("inbox")} styles={styles} />
            <TabChip id="dirigentes" label={`Dirigentes (${dirigentes.length})`} active={tab === "dirigentes"} onPress={() => setTab("dirigentes")} styles={styles} />
            <TabChip id="fichas" label="Fichas médicas" active={tab === "fichas"} onPress={() => setTab("fichas")} styles={styles} />
            <TabChip id="events" label="Itinerario" active={tab === "events"} onPress={() => setTab("events")} styles={styles} />
          </ScrollView>

          {loading && <ActivityIndicator color={colors.brandSecondary} size="small" />}

          {tab === "inbox" && (
            <View style={{ gap: 12 }}>
              {pending.length === 0 && (
                <View style={styles.placeholderCard}>
                  <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={30} color={colors.success} />
                  <Text style={styles.placeholderText}>Sin solicitudes pendientes. Todo al día ✓</Text>
                </View>
              )}
              {pending.map((row) => (
                <View key={row.approval_id} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 10 }]} testID={`inbox-item-${row.approval_id}`}>
                  <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                    <View style={styles.pdfIcon}>
                      <MaterialCommunityIcons name={row.kind === "patria" ? "flag-outline" : row.kind === "camping" ? "tent" : row.kind === "service" ? "hand-heart-outline" : row.kind === "tribu" ? "earth" : "stairs-up"} size={22} color={colors.brandSecondary} />
                    </View>
                    <View style={styles.pdfCopy}>
                      <Text style={styles.pdfTag}>{row.user_patrol || "Sin patrulla"} · {row.user_name}</Text>
                      <Text style={styles.pdfTitle}>{kindLabel(row)}</Text>
                      {row.text ? <Text style={styles.pdfDetail}>“{row.text}”</Text> : null}
                      {row.note ? <Text style={styles.pdfDetail}>Nota del pionero: {row.note}</Text> : null}
                      {row.kind === "camping" && (
                        <View style={{ marginTop: 6, backgroundColor: colors.surfaceTertiary, padding: 8, borderRadius: 8, gap: 3 }}>
                          <Text style={[styles.pdfDetail, { color: colors.onSurface }]}>
                            🏕️ <Text style={{ fontWeight: "700" }}>Total días:</Text> {row.nights ?? 0} días
                          </Text>
                          <Text style={[styles.pdfDetail, { color: colors.onSurface }]}>
                            📅 <Text style={{ fontWeight: "700" }}>Fechas (Inicio - Fin):</Text> {row.start_date && row.end_date ? `${row.start_date} al ${row.end_date}` : (row.date || "No especificadas")}
                          </Text>
                          {row.place ? (
                            <Text style={[styles.pdfDetail, { color: colors.onSurface }]}>
                              📍 <Text style={{ fontWeight: "700" }}>Lugar:</Text> {row.place}
                            </Text>
                          ) : null}
                        </View>
                      )}
                    </View>
                  </View>
                  <TextInput
                    testID={`inbox-note-${row.approval_id}`}
                    value={rejectNote[row.approval_id] || ""}
                    onChangeText={(v) => setRejectNote({ ...rejectNote, [row.approval_id]: v })}
                    placeholder="Nota de retroalimentación (opcional)"
                    placeholderTextColor={styles.placeholder.color}
                    style={styles.input}
                  />
                  <View style={{ flexDirection: "row", gap: 10 }}>
                    <Pressable
                      testID={`inbox-approve-${row.approval_id}`}
                      onPress={() => decide(row, true)}
                      disabled={decidingId === row.approval_id}
                      style={[styles.secondaryButton, { flex: 1 }]}
                    >
                      <MaterialCommunityIcons name="check" size={16} color={colors.onBrandSecondary} />
                      <Text style={styles.secondaryButtonText}>Aprobar</Text>
                    </Pressable>
                    <Pressable
                      testID={`inbox-reject-${row.approval_id}`}
                      onPress={() => decide(row, false)}
                      disabled={decidingId === row.approval_id}
                      style={[styles.primaryButton, { flex: 1, minHeight: 46, flexDirection: "row", gap: 8 }]}
                    >
                      <MaterialCommunityIcons name="close-circle-outline" size={16} color={colors.onBrandPrimary} />
                      <Text style={styles.primaryButtonText}>Rechazar</Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}

          {tab === "dirigentes" && (
            <View style={{ gap: 12 }}>
              {dirigentes.length === 0 && (
                <View style={styles.placeholderCard}>
                  <MaterialCommunityIcons name="account-check-outline" size={30} color={colors.success} />
                  <Text style={styles.placeholderText}>No hay dirigentes en revisión.</Text>
                </View>
              )}
              {dirigentes.map((u) => (
                <View key={u.user_id} style={[styles.pdfCard, { alignItems: "flex-start" }]} testID={`dir-item-${u.user_id}`}>
                  <View style={styles.pdfIcon}>
                    <MaterialCommunityIcons name="account-tie" size={22} color={colors.brandSecondary} />
                  </View>
                  <View style={styles.pdfCopy}>
                    <Text style={styles.pdfTag}>Grupo {u.profile?.group_number || "s/n"}</Text>
                    <Text style={styles.pdfTitle}>{u.name}</Text>
                    <Text style={styles.pdfDetail}>{u.email}</Text>
                    <Text style={styles.pdfDetail}>Credencial: {u.credential_code || "sin código"}</Text>
                  </View>
                  <View style={{ gap: 8 }}>
                    <Pressable testID={`dir-approve-${u.user_id}`} onPress={() => decideDirigente(u, true)} style={styles.closeButton}>
                      <MaterialCommunityIcons name="check" size={18} color={colors.success} />
                    </Pressable>
                    <Pressable testID={`dir-reject-${u.user_id}`} onPress={() => decideDirigente(u, false)} style={styles.closeButton}>
                      <MaterialCommunityIcons name="close" size={18} color={colors.error} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}

          {tab === "events" && <AdminEventsSection colors={colors} styles={styles} />}
          {tab === "fichas" && <FichasSection colors={colors} styles={styles} />}
        </ScrollView>
      </View>
    </Modal>
  );
}

function AdminEventsSection({ colors, styles }: any) {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentText, setEquipmentText] = useState("");
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    const res = await api.calendar().catch(() => ({ events: [] }));
    setEvents(res.events);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const create = async () => {
    if (!title.trim() || !date.trim() || !place.trim()) return;
    setSaving(true);
    try {
      const equipment = equipmentText.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
      await api.createEvent({ title, date, time, place, description, equipment });
      setTitle(""); setDate(""); setTime(""); setPlace(""); setDescription(""); setEquipmentText("");
      await refresh();
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    await api.deleteEvent(id).catch(() => undefined);
    await refresh();
  };

  return (
    <View style={{ gap: 14 }}>
      <View style={styles.profileCard}>
        <Text style={styles.resultLabel}>NUEVA ACTIVIDAD</Text>
        <TextInput testID="event-title" placeholder="Título" placeholderTextColor={styles.placeholder.color} value={title} onChangeText={setTitle} style={[styles.input, { marginTop: 10 }]} />
        <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
          <TextInput testID="event-date" placeholder="Fecha (ej. 15 Nov 2026)" placeholderTextColor={styles.placeholder.color} value={date} onChangeText={setDate} style={[styles.input, { flex: 1 }]} />
          <TextInput testID="event-time" placeholder="Hora" placeholderTextColor={styles.placeholder.color} value={time} onChangeText={setTime} style={[styles.input, { flex: 1 }]} />
        </View>
        <TextInput testID="event-place" placeholder="Lugar / Sede" placeholderTextColor={styles.placeholder.color} value={place} onChangeText={setPlace} style={[styles.input, { marginTop: 10 }]} />
        <TextInput testID="event-desc" placeholder="Descripción (opcional)" placeholderTextColor={styles.placeholder.color} value={description} onChangeText={setDescription} multiline style={[styles.input, styles.textArea, { marginTop: 10 }]} />
        <TextInput testID="event-equipment" placeholder={"Equipo (separar por comas)\nEj: casaco, cantina, bolsa de dormir"} placeholderTextColor={styles.placeholder.color} value={equipmentText} onChangeText={setEquipmentText} multiline style={[styles.input, styles.textArea, { marginTop: 10 }]} />
        <Pressable testID="event-create" onPress={create} disabled={saving || !title.trim() || !date.trim() || !place.trim()} style={[styles.secondaryButton, (saving || !title.trim() || !date.trim() || !place.trim()) && { opacity: 0.5 }]}>
          <MaterialCommunityIcons name="calendar-plus" size={18} color={colors.onBrandSecondary} />
          <Text style={styles.secondaryButtonText}>Publicar actividad</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Actividades publicadas ({events.length})</Text>
      {events.length === 0 && (
        <View style={styles.placeholderCard}>
          <MaterialCommunityIcons name="calendar-blank-outline" size={30} color={colors.brandSecondary} />
          <Text style={styles.placeholderText}>Aún no hay actividades publicadas.</Text>
        </View>
      )}
      {events.map((e) => (
        <View key={e.event_id} style={[styles.pdfCard, { alignItems: "flex-start" }]} testID={`event-item-${e.event_id}`}>
          <View style={styles.pdfIcon}>
            <MaterialCommunityIcons name="calendar" size={22} color={colors.brandSecondary} />
          </View>
          <View style={styles.pdfCopy}>
            <Text style={styles.pdfTag}>{e.date}{e.time ? ` · ${e.time}` : ""}</Text>
            <Text style={styles.pdfTitle}>{e.title}</Text>
            <Text style={styles.pdfDetail}>{e.place}</Text>
            {e.equipment?.length ? <Text style={styles.pdfDetail}>Equipo: {e.equipment.join(", ")}</Text> : null}
          </View>
          <Pressable testID={`event-delete-${e.event_id}`} onPress={() => remove(e.event_id)} style={styles.closeButton}>
            <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.error} />
          </Pressable>
        </View>
      ))}
    </View>
  );
}

function TabChip({ id, label, active, onPress, styles }: any) {
  return (
    <Pressable testID={`admin-tab-${id}`} onPress={onPress} style={[styles.chip, active && styles.chipActive]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

function FichasSection({ colors, styles }: any) {
  const [pioneros, setPioneros] = useState<PioneroFicha[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.listPioneros().catch(() => ({ pioneros: [] }));
      setPioneros(res.pioneros);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pioneros;
    return pioneros.filter((p) =>
      [p.name, p.patrol, p.blood_type, p.email].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  }, [pioneros, query]);

  const call = (phone?: string) => {
    if (!phone) return;
    const digits = phone.replace(/[^0-9+]/g, "");
    if (!digits) return;
    Linking.openURL(`tel:${digits}`).catch(() => undefined);
  };

  return (
    <View style={{ gap: 12 }}>
      <View style={[styles.medicalNotice, { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.brandSecondary }]}>
        <MaterialCommunityIcons name="shield-lock-outline" size={18} color={colors.brandSecondary} />
        <Text style={[styles.medicalNoticeText, { color: colors.brandSecondary }]}>Datos médicos confidenciales. Usar solo para emergencias y planificación de campamento.</Text>
      </View>
      <TextInput
        testID="fichas-search"
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar por nombre, patrulla, tipo de sangre…"
        placeholderTextColor={styles.placeholder.color}
        style={styles.input}
        autoCapitalize="none"
      />
      {loading && <ActivityIndicator color={colors.brandSecondary} size="small" />}
      {!loading && filtered.length === 0 && (
        <View style={styles.placeholderCard}>
          <MaterialCommunityIcons name="account-search-outline" size={30} color={colors.brandSecondary} />
          <Text style={styles.placeholderText}>Sin pioneros registrados aún.</Text>
        </View>
      )}
      {filtered.map((p) => {
        const isOpen = openId === p.user_id;
        const hasBlood = Boolean(p.blood_type);
        const hasAllergy = Boolean(p.allergies && p.allergies.trim());
        return (
          <View key={p.user_id} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 10 }]} testID={`ficha-${p.user_id}`}>
            <Pressable onPress={() => setOpenId(isOpen ? null : p.user_id)} style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
              <View style={[styles.pdfIcon, { backgroundColor: hasBlood ? colors.brandPrimary : colors.surfaceTertiary }]}>
                <Text style={{ color: hasBlood ? colors.onBrandPrimary : colors.muted, fontSize: 13, fontWeight: "800" }}>{p.blood_type || "?"}</Text>
              </View>
              <View style={styles.pdfCopy}>
                <Text style={styles.pdfTag}>{p.patrol || "Sin patrulla"}{p.group_number ? ` · Grupo ${p.group_number}` : ""}</Text>
                <Text style={styles.pdfTitle}>{p.name}</Text>
                <Text style={styles.pdfDetail}>{p.stage ? p.stage.toUpperCase() : "Etapa por definir"} · {p.camping_nights ?? 0} noches</Text>
                {hasAllergy && (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                    <MaterialCommunityIcons name="alert-circle" size={12} color={colors.error} />
                    <Text style={[styles.pdfDetail, { color: colors.error, fontWeight: "700" }]} numberOfLines={1}>Alergias: {p.allergies}</Text>
                  </View>
                )}
              </View>
              <MaterialCommunityIcons name={isOpen ? "chevron-up" : "chevron-down"} size={22} color={colors.muted} />
            </Pressable>

            {isOpen && (
              <View style={{ gap: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.divider }} testID={`ficha-details-${p.user_id}`}>
                <FichaRow icon="water" label="Tipo de sangre" value={p.blood_type || "—"} tone={hasBlood ? "danger" : "muted"} colors={colors} styles={styles} />
                <FichaRow icon="allergy" label="Alergias conocidas" value={p.allergies || "Sin registrar"} tone={hasAllergy ? "danger" : "muted"} colors={colors} styles={styles} />
                <FichaRow icon="stethoscope" label="Condiciones médicas" value={p.medical_conditions || "Sin registrar"} colors={colors} styles={styles} />
                <FichaRow icon="hospital-box-outline" label="Seguro médico" value={p.medical_insurance || "Sin registrar"} colors={colors} styles={styles} />
                <FichaRow icon="account-heart-outline" label="Contacto de emergencia" value={p.emergency_contact || "Sin registrar"} colors={colors} styles={styles} />
                <FichaRow icon="email-outline" label="Correo" value={p.email || "—"} colors={colors} styles={styles} />
                {p.emergency_phone ? (
                  <Pressable testID={`ficha-call-${p.user_id}`} onPress={() => call(p.emergency_phone)} style={[styles.primaryButton, { flexDirection: "row", gap: 8, marginTop: 4 }]}>
                    <MaterialCommunityIcons name="phone" size={16} color={colors.onBrandPrimary} />
                    <Text style={styles.primaryButtonText}>Llamar {p.emergency_phone}</Text>
                  </Pressable>
                ) : (
                  <Text style={[styles.pdfDetail, { color: colors.muted }]}>Sin teléfono de emergencia registrado.</Text>
                )}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

function FichaRow({ icon, label, value, tone, colors, styles }: any) {
  const color = tone === "danger" ? colors.error : tone === "muted" ? colors.muted : colors.onSurfaceSecondary;
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <MaterialCommunityIcons name={icon} size={16} color={color} />
      <View style={{ flex: 1 }}>
        <Text style={[styles.pdfTag, { color: colors.muted }]}>{label.toUpperCase()}</Text>
        <Text style={[styles.pdfDetail, { color, fontWeight: tone === "danger" ? "700" : "600" }]}>{value}</Text>
      </View>
    </View>
  );
}

export default AdminPanel;
