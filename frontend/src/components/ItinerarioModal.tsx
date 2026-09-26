import { useCallback, useEffect, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { api, CalendarEvent } from "@/src/api";
import { storage } from "@/src/utils/storage";

const CHECK_KEY = "horizonte.events.equipment_check";

const EVENT_CATEGORIES = [
  { id: "reunion", label: "Reunión", icon: "calendar-star" },
  { id: "campamento", label: "Campamento", icon: "tent" },
  { id: "servicio", label: "Servicio", icon: "hand-heart-outline" },
  { id: "excursion", label: "Excursión", icon: "hiking" },
  { id: "fogata", label: "Fogata", icon: "campfire" },
  { id: "ceremonia", label: "Ceremonia", icon: "shield-star-outline" },
  { id: "formacion", label: "Formación", icon: "school-outline" },
  { id: "otro", label: "Otro", icon: "calendar-outline" },
];

export function ItinerarioModal({ visible, onClose, currentUser, colors, styles }: any) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [checks, setChecks] = useState<Record<string, Record<string, boolean>>>({});
  const [addOpen, setAddOpen] = useState(false);

  const refresh = useCallback(async () => {
    const res = await api.calendar().catch(() => ({ events: [] }));
    setEvents(res.events);
  }, []);

  useEffect(() => {
    if (!visible) return;
    refresh();
    storage.getItem<string>(CHECK_KEY, "{}").then((raw) => {
      try {
        const v = JSON.parse(raw ?? "{}");
        setChecks(v && typeof v === "object" ? v : {});
      } catch {
        setChecks({});
      }
    });
  }, [visible, refresh]);

  const toggle = async (eventId: string, item: string) => {
    const next = { ...checks, [eventId]: { ...(checks[eventId] || {}), [item]: !(checks[eventId]?.[item]) } };
    setChecks(next);
    await storage.setItem(CHECK_KEY, JSON.stringify(next));
  };

  const isDirigente = currentUser?.role === "dirigente" && currentUser?.verification_status === "verificado";

  const iconForEvent = (e: any) => {
    const cat = (e.category || "").toLowerCase();
    const hit = EVENT_CATEGORIES.find((c) => c.id === cat);
    return hit?.icon ?? "calendar-star";
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>ITINERARIO</Text>
            <Text style={styles.pdfModalTitle}>Próximas actividades</Text>
          </View>
          <Pressable testID="itinerario-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageSubtitle}>{isDirigente ? "Publica nuevas actividades para toda tu unidad usando el botón + de abajo." : "Marca tu equipo personal para cada actividad publicada por dirigentes."}</Text>
          {events.length === 0 && (
            <View style={styles.placeholderCard}>
              <MaterialCommunityIcons name="calendar-blank-outline" size={30} color={colors.brandSecondary} />
              <Text style={styles.placeholderText}>Aún no hay actividades publicadas.</Text>
            </View>
          )}
          {events.map((e: any) => (
            <View key={e.event_id} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 10, marginTop: 12 }]} testID={`itinerario-event-${e.event_id}`}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={[styles.pdfIcon, { backgroundColor: colors.brandPrimary }]}>
                  <MaterialCommunityIcons name={iconForEvent(e) as any} size={22} color={colors.onBrandPrimary} />
                </View>
                <View style={styles.pdfCopy}>
                  <Text style={styles.pdfTag}>{e.date}{e.time ? ` · ${e.time}` : ""}</Text>
                  <Text style={styles.pdfTitle}>{e.title}</Text>
                  <Text style={styles.pdfDetail}>{e.place}</Text>
                  {e.creator_name ? <Text style={styles.pdfDetail}>Publicado por {e.creator_name}</Text> : null}
                </View>
                {isDirigente && (
                  <Pressable
                    testID={`itinerario-delete-${e.event_id}`}
                    onPress={() => {
                      Alert.alert("Eliminar actividad", `¿Confirmas eliminar "${e.title}"?`, [
                        { text: "Cancelar", style: "cancel" },
                        {
                          text: "Eliminar",
                          style: "destructive",
                          onPress: async () => {
                            await api.deleteEvent(e.event_id).catch(() => undefined);
                            await refresh();
                          },
                        },
                      ]);
                    }}
                    style={styles.closeButton}
                  >
                    <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.error} />
                  </Pressable>
                )}
              </View>
              {e.description ? <Text style={styles.pdfDetail}>{e.description}</Text> : null}
              {e.equipment?.length ? (
                <View style={{ gap: 6 }}>
                  <Text style={styles.resultLabel}>MI CHECKLIST DE EQUIPO</Text>
                  {e.equipment.map((item: string) => {
                    const done = !!checks[e.event_id]?.[item];
                    return (
                      <Pressable key={item} testID={`equip-${e.event_id}-${item}`} onPress={() => toggle(e.event_id, item)} style={styles.checkRow}>
                        <View style={[styles.checkbox, done && styles.checkboxOn]}>
                          {done && <MaterialCommunityIcons name="check" size={16} color={colors.onBrandPrimary} />}
                        </View>
                        <View style={styles.checkCopy}>
                          <Text style={[styles.checkLabel, done && styles.checkDone]}>{item}</Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
              ) : null}
            </View>
          ))}
        </ScrollView>

        {isDirigente && (
          <Pressable
            testID="itinerario-fab-add"
            onPress={() => setAddOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Publicar nueva actividad"
            style={styles.fabAdd}
          >
            <MaterialCommunityIcons name="plus" size={30} color={colors.onBrandPrimary} />
          </Pressable>
        )}

        <AddEventModal
          visible={addOpen}
          onClose={() => setAddOpen(false)}
          onCreated={async () => { setAddOpen(false); await refresh(); }}
          colors={colors}
          styles={styles}
        />
      </View>
    </Modal>
  );
}

function AddEventModal({ visible, onClose, onCreated, colors, styles }: any) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [equipmentText, setEquipmentText] = useState("");
  const [category, setCategory] = useState<string>("reunion");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setTitle(""); setDate(""); setTime(""); setPlace(""); setDescription(""); setEquipmentText(""); setCategory("reunion");
  }, [visible]);

  const submit = async () => {
    if (!title.trim() || !date.trim() || !place.trim()) {
      Alert.alert("Faltan datos", "Título, fecha y lugar son obligatorios.");
      return;
    }
    setSaving(true);
    try {
      const equipment = equipmentText.split(/[,\n]/).map((s) => s.trim()).filter(Boolean);
      await api.createEvent({ title: title.trim(), date: date.trim(), time: time.trim() || undefined, place: place.trim(), description: description.trim() || undefined, equipment, category } as any);
      await onCreated?.();
    } catch (e: any) {
      Alert.alert("No se pudo publicar", e?.message || "Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>NUEVA ACTIVIDAD</Text>
            <Text style={styles.pdfModalTitle}>Publicar al itinerario</Text>
          </View>
          <Pressable testID="add-event-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 90 }} keyboardShouldPersistTaps="handled">
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Categoría / Icono</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
              {EVENT_CATEGORIES.map((c) => (
                <Pressable
                  key={c.id}
                  testID={`event-cat-${c.id}`}
                  onPress={() => setCategory(c.id)}
                  style={[styles.chip, category === c.id && styles.chipActive, { flexDirection: "row", gap: 6 }]}
                >
                  <MaterialCommunityIcons name={c.icon as any} size={14} color={category === c.id ? colors.onBrandSecondary : colors.muted} />
                  <Text style={[styles.chipText, category === c.id && styles.chipTextActive]}>{c.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Título de la actividad</Text>
            <TextInput testID="add-event-title" value={title} onChangeText={setTitle} placeholder="Ej: Campamento de patrulla" placeholderTextColor={styles.placeholder.color} style={styles.input} />
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Fecha</Text>
              <TextInput testID="add-event-date" value={date} onChangeText={setDate} placeholder="15 Nov 2026" placeholderTextColor={styles.placeholder.color} style={styles.input} />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Hora</Text>
              <TextInput testID="add-event-time" value={time} onChangeText={setTime} placeholder="09:00" placeholderTextColor={styles.placeholder.color} style={styles.input} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Lugar / Sede</Text>
            <TextInput testID="add-event-place" value={place} onChangeText={setPlace} placeholder="Sede de la unidad" placeholderTextColor={styles.placeholder.color} style={styles.input} />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Descripción</Text>
            <TextInput testID="add-event-desc" value={description} onChangeText={setDescription} placeholder="Detalle de la actividad" placeholderTextColor={styles.placeholder.color} multiline style={[styles.input, styles.textArea]} />
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Equipo sugerido (separar por comas)</Text>
            <TextInput testID="add-event-equipment" value={equipmentText} onChangeText={setEquipmentText} placeholder="Bolsa de dormir, cantina, linterna" placeholderTextColor={styles.placeholder.color} multiline style={[styles.input, styles.textArea]} />
          </View>

          <Pressable testID="add-event-submit" onPress={submit} disabled={saving} style={[styles.primaryButton, { minHeight: 52, flexDirection: "row", gap: 8, marginTop: 8 }, saving && { opacity: 0.6 }]}>
            <MaterialCommunityIcons name="calendar-plus" size={18} color={colors.onBrandPrimary} />
            <Text style={styles.primaryButtonText}>{saving ? "Publicando…" : "Publicar actividad"}</Text>
          </Pressable>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ItinerarioModal;
