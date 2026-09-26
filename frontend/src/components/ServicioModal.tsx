import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export function ServicioModal({ visible, onClose, state, colors, styles, onSubmit }: any) {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState("1");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const log = state.service_log ?? [];
  const approvedHours = log.filter((s: any) => s.status === "aprobado").reduce((a: number, s: any) => a + (s.hours || 0), 0);
  const pendingHours = log.filter((s: any) => s.status === "pendiente").reduce((a: number, s: any) => a + (s.hours || 0), 0);

  const submit = async () => {
    const h = parseInt(hours, 10) || 0;
    if (!title.trim() || h < 1) return;
    setSaving(true);
    try {
      await onSubmit({ title: title.trim(), hours: h, date: date.trim(), note: note.trim() });
      setTitle("");
      setHours("1");
      setDate("");
      setNote("");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>SERVICIO A LA COMUNIDAD</Text>
            <Text style={styles.pdfModalTitle}>Horas voluntarias</Text>
          </View>
          <Pressable testID="servicio-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageSubtitle}>Cada registro requiere aprobación online del Dirigente antes de sumar al total del punto 14.</Text>

          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>PROGRESO · META 50 HORAS</Text>
            <Text style={[styles.scoreBig, { fontSize: 30, marginTop: 6 }]}>{approvedHours}<Text style={styles.scoreSlash}>/50 h</Text></Text>
            <Text style={styles.pdfDetail}>{pendingHours} h pendientes de verificación</Text>
            <View style={[styles.quotaTrack, { marginTop: 10 }]}><View style={[styles.quotaFill, { width: `${Math.min(100, (approvedHours / 50) * 100)}%` }]} /></View>
          </View>

          <View style={[styles.profileCard, { marginTop: 14 }]}>
            <Text style={styles.resultLabel}>NUEVO REGISTRO</Text>
            <TextInput testID="servicio-title" value={title} onChangeText={setTitle} placeholder="Actividad · Ej: Limpieza de plaza" placeholderTextColor={styles.placeholder.color} style={[styles.input, { marginTop: 10 }]} />
            <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
              <TextInput testID="servicio-hours" value={hours} onChangeText={setHours} placeholder="Horas" keyboardType="number-pad" placeholderTextColor={styles.placeholder.color} style={[styles.input, { flex: 1 }]} />
              <TextInput testID="servicio-date" value={date} onChangeText={setDate} placeholder="Fecha" placeholderTextColor={styles.placeholder.color} style={[styles.input, { flex: 2 }]} />
            </View>
            <TextInput testID="servicio-note" value={note} onChangeText={setNote} placeholder="Detalle / testigo (opcional)" placeholderTextColor={styles.placeholder.color} multiline style={[styles.input, styles.textArea, { marginTop: 10 }]} />
            <Pressable testID="servicio-submit" disabled={saving || !title.trim() || parseInt(hours, 10) < 1} onPress={submit} style={[styles.primaryButton, { marginTop: 12 }, (saving || !title.trim() || parseInt(hours, 10) < 1) && { opacity: 0.5 }]}>
              <Text style={styles.primaryButtonText}>{saving ? "Registrando…" : "Registrar y solicitar aprobación"}</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Historial ({log.length})</Text>
          {log.length === 0 && (
            <View style={styles.placeholderCard}>
              <MaterialCommunityIcons name="hand-heart-outline" size={30} color={colors.brandSecondary} />
              <Text style={styles.placeholderText}>Aún no has registrado horas de servicio.</Text>
            </View>
          )}
          {log.slice().reverse().map((s: any) => (
            <View key={s.id} style={[styles.pdfCard, { alignItems: "flex-start" }]} testID={`servicio-item-${s.id}`}>
              <View style={[styles.pdfIcon, { backgroundColor: s.status === "aprobado" ? colors.success : s.status === "rechazado" ? colors.error : colors.brandPrimary }]}>
                <MaterialCommunityIcons name={s.status === "aprobado" ? "check-decagram" : s.status === "rechazado" ? "alert-circle-outline" : "clock-outline"} size={20} color={colors.onBrandPrimary} />
              </View>
              <View style={styles.pdfCopy}>
                <Text style={styles.pdfTag}>{(s.date || "").toUpperCase()}</Text>
                <Text style={styles.pdfTitle}>{s.title} · {s.hours} h</Text>
                <Text style={[styles.pdfDetail, { color: s.status === "aprobado" ? colors.success : s.status === "rechazado" ? colors.error : colors.brandSecondary }]}>{s.status}{s.review_note ? ` · ${s.review_note}` : ""}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ServicioModal;
