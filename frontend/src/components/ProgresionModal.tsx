import { useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { GROWTH_AREAS, GrowthAreaId, Objective, STAGES, StageId } from "@/src/data/progresion";

type Progression = {
  busqueda: Objective[];
  encuentro: Objective[];
  desafio: Objective[];
};

export const EMPTY_PROGRESSION: Progression = { busqueda: [], encuentro: [], desafio: [] };

export function ProgresionModal({ visible, onClose, progression, onChange, colors, styles, onRequest }: any) {
  const [stage, setStage] = useState<StageId>("busqueda");
  const [area, setArea] = useState<GrowthAreaId | "all">("all");
  const [draft, setDraft] = useState("");
  const [draftArea, setDraftArea] = useState<GrowthAreaId>("corporalidad");

  const stageMeta = STAGES.find((s) => s.id === stage)!;
  const list: Objective[] = useMemo(() => progression?.[stage] ?? [], [progression, stage]);
  const filtered = useMemo(() => (area === "all" ? list : list.filter((o) => o.area === area)), [list, area]);
  const doneCount = list.filter((o) => o.done).length;
  const approvedCount = list.filter((o) => o.done && o.approved).length;

  const areaMeta = (id: GrowthAreaId) => GROWTH_AREAS.find((a) => a.id === id)!;

  const setStageList = (next: Objective[]) => {
    onChange({ ...(progression ?? EMPTY_PROGRESSION), [stage]: next });
  };

  const addObjective = () => {
    const text = draft.trim();
    if (!text) return;
    if (list.length >= stageMeta.quota) return;
    const obj: Objective = {
      id: `obj_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      text,
      area: draftArea,
      stage,
      done: false,
      approved: false,
    };
    setStageList([...list, obj]);
    setDraft("");
  };

  const toggleDone = (id: string) => {
    setStageList(list.map((o) => (o.id === id ? { ...o, done: !o.done, completed_at: !o.done ? new Date().toISOString() : undefined } : o)));
  };

  const remove = (id: string) => setStageList(list.filter((o) => o.id !== id));

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>PROGRESIÓN PERSONAL</Text>
            <Text style={styles.pdfModalTitle}>Etapa {stageMeta.label}</Text>
          </View>
          <Pressable testID="progresion-close" onPress={onClose} style={styles.closeButton} accessibilityRole="button">
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageSubtitle}>Registra objetivos por área de crecimiento. Cuota exacta {stageMeta.quota}.</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 14 }}>
            {STAGES.map((s) => (
              <Pressable key={s.id} testID={`stage-${s.id}`} onPress={() => setStage(s.id)} style={[styles.chip, stage === s.id && styles.chipActive]}>
                <MaterialCommunityIcons name={s.icon as any} size={13} color={stage === s.id ? colors.onBrandPrimary : colors.onSurfaceSecondary} />
                <Text style={[styles.chipText, stage === s.id && styles.chipTextActive]}>  {s.label} · {(progression?.[s.id] ?? []).length}/{s.quota}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.resultCard} testID="progresion-summary">
            <Text style={styles.resultLabel}>PROGRESO · {stageMeta.label.toUpperCase()}</Text>
            <View style={{ flexDirection: "row", gap: 12, marginTop: 6 }}>
              <Text style={styles.resultText}>{list.length}/{stageMeta.quota} registrados</Text>
              <Text style={[styles.resultText, { color: colors.brandSecondary }]}>{doneCount} completados</Text>
              <Text style={[styles.resultText, { color: colors.success }]}>{approvedCount} aprobados</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Áreas de crecimiento</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 12 }}>
            <Pressable testID="area-all" onPress={() => setArea("all")} style={[styles.chip, area === "all" && styles.chipActive]}>
              <Text style={[styles.chipText, area === "all" && styles.chipTextActive]}>Todas</Text>
            </Pressable>
            {GROWTH_AREAS.map((a) => (
              <Pressable key={a.id} testID={`area-${a.id}`} onPress={() => setArea(a.id)} style={[styles.chip, area === a.id && styles.chipActive]}>
                <MaterialCommunityIcons name={a.icon as any} size={13} color={area === a.id ? colors.onBrandPrimary : colors.onSurfaceSecondary} />
                <Text style={[styles.chipText, area === a.id && styles.chipTextActive]}>  {a.label}</Text>
              </Pressable>
            ))}
          </ScrollView>

          <View style={styles.profileCard} testID="progresion-add-card">
            <Text style={styles.resultLabel}>NUEVO OBJETIVO</Text>
            <TextInput
              testID="progresion-input"
              value={draft}
              onChangeText={setDraft}
              placeholder="Ej: Correr 3 km sin parar"
              placeholderTextColor={styles.placeholder.color}
              style={[styles.input, { marginTop: 10 }]}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 10 }}>
              {GROWTH_AREAS.map((a) => (
                <Pressable key={a.id} testID={`draft-area-${a.id}`} onPress={() => setDraftArea(a.id)} style={[styles.chip, draftArea === a.id && styles.chipActive]}>
                  <Text style={[styles.chipText, draftArea === a.id && styles.chipTextActive]}>{a.label}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              testID="progresion-add"
              disabled={list.length >= stageMeta.quota || !draft.trim()}
              onPress={addObjective}
              style={[styles.secondaryButton, (list.length >= stageMeta.quota || !draft.trim()) && { opacity: 0.5 }]}
            >
              <MaterialCommunityIcons name="plus" size={18} color={colors.onBrandSecondary} />
              <Text style={styles.secondaryButtonText}>{list.length >= stageMeta.quota ? "Cuota alcanzada" : "Agregar objetivo"}</Text>
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Objetivos ({filtered.length})</Text>
          {filtered.length === 0 ? (
            <View style={styles.placeholderCard}>
              <MaterialCommunityIcons name="target" size={30} color={colors.brandSecondary} />
              <Text style={styles.placeholderText}>Sin objetivos registrados en esta selección.</Text>
            </View>
          ) : (
            <View style={{ gap: 10 }}>
              {filtered.map((o) => {
                const meta = areaMeta(o.area);
                return (
                  <View key={o.id} testID={`objective-${o.id}`} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 8 }]}>
                    <View style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}>
                      <Pressable
                        testID={`objective-check-${o.id}`}
                        onPress={() => toggleDone(o.id)}
                        style={[
                          styles.pdfIcon,
                          { backgroundColor: o.done ? colors.brandPrimary : colors.surfaceTertiary },
                        ]}
                      >
                        <MaterialCommunityIcons name={o.done ? "check" : "checkbox-blank-outline"} size={20} color={o.done ? colors.onBrandPrimary : colors.brandSecondary} />
                      </Pressable>
                      <View style={styles.pdfCopy}>
                        <Text style={[styles.pdfTag, { color: meta.color }]}>{meta.label.toUpperCase()}</Text>
                        <Text style={[styles.pdfTitle, { textDecorationLine: o.done ? "line-through" : "none" }]}>{o.text}</Text>
                        <Text style={[styles.pdfDetail, { color: o.status === "aprobado" ? colors.success : o.status === "pendiente" ? colors.brandSecondary : o.status === "rechazado" ? colors.error : colors.muted }]}>
                          {o.status === "aprobado" ? "Aprobado por dirigente ✓" : o.status === "pendiente" ? "Pendiente de validación online" : o.status === "rechazado" ? "Requiere corrección" : o.done ? "Sin solicitar aprobación" : "Sin completar"}
                        </Text>
                        {o.review_note ? <Text style={styles.pdfDetail}>Nota: {o.review_note}</Text> : null}
                      </View>
                      <Pressable testID={`objective-remove-${o.id}`} onPress={() => remove(o.id)} style={styles.closeButton}>
                        <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.error} />
                      </Pressable>
                    </View>
                    {o.done && (o.status !== "aprobado" && o.status !== "pendiente") && onRequest && (
                      <Pressable testID={`objective-request-${o.id}`} onPress={() => onRequest(o)} style={[styles.secondaryButton, { alignSelf: "flex-start", paddingHorizontal: 14 }]}>
                        <MaterialCommunityIcons name="cloud-upload-outline" size={16} color={colors.onBrandSecondary} />
                        <Text style={styles.secondaryButtonText}>Solicitar aprobación</Text>
                      </Pressable>
                    )}
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ProgresionModal;
