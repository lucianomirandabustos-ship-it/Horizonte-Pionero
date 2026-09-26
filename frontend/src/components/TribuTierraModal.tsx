import { useState } from "react";
import { Linking, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const TRIBU_TIERRA_URL = "https://sites.google.com/view/asb-tributierra/tribu-tribu?pli=1&authuser=0";

export const TRIBU_PROGRAMS = [
  {
    id: "solar",
    name: "Scouts Go Solar",
    icon: "solar-power",
    checklist: [
      "Charla o taller sobre energía renovable",
      "Actividad práctica con energía solar",
      "Registro fotográfico de la acción",
    ],
  },
  {
    id: "nature",
    name: "Champions for Nature",
    icon: "leaf",
    checklist: [
      "Campaña de reforestación o cuidado de biodiversidad",
      "Educación ambiental en la comunidad",
      "Reporte de impacto con métricas",
    ],
  },
  {
    id: "plastic",
    name: "Plastic Tide Turners",
    icon: "recycle",
    checklist: [
      "Jornada de limpieza y clasificación de residuos",
      "Reducción del uso de plástico en actividades",
      "Difusión con la unidad y familias",
    ],
  },
];

type EntryStatus = "idle" | "pendiente" | "aprobado" | "rechazado";

function statusOf(data: any): EntryStatus {
  if (data?.approved) return "aprobado";
  if (data?.status === "rechazado") return "rechazado";
  if (data?.status === "pendiente") return "pendiente";
  return "idle";
}

export function TribuTierraModal({ visible, onClose, state, updateState, onRequest, colors, styles }: any) {
  const tt = state.tribu_tierra ?? {};
  const [_, force] = useState(0);
  const setChecked = (progId: string, itemIdx: number, done: boolean) => {
    const next = { ...(state.tribu_tierra ?? {}) };
    const current = next[progId] ?? { checks: {}, approved: false, status: "idle" };
    // Once approved by a leader, requirements are locked
    if (current.approved) return;
    next[progId] = { ...current, checks: { ...(current.checks ?? {}), [itemIdx]: done } };
    updateState({ ...state, tribu_tierra: next });
    force((x) => x + 1);
  };
  const requestReview = async (progId: string, name: string) => {
    if (!onRequest) return;
    try {
      await onRequest({ id: progId, name });
    } catch { /* ignore */ }
  };
  const completedPrograms = TRIBU_PROGRAMS.filter((p) => statusOf(tt[p.id]) === "aprobado").length;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>TRIBU TIERRA</Text>
            <Text style={styles.pdfModalTitle}>{completedPrograms}/3 programas verificados</Text>
          </View>
          <Pressable testID="tribu-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageSubtitle}>Debes completar los requisitos y esperar la validación online de tu dirigente para marcar el programa como verificado.</Text>

          <Pressable testID="tribu-info-link" onPress={() => Linking.openURL(TRIBU_TIERRA_URL).catch(() => undefined)} style={[styles.primaryButton, { marginTop: 10 }]}>
            <MaterialCommunityIcons name="open-in-new" size={18} color={colors.onBrandPrimary} />
            <Text style={styles.primaryButtonText}>  Más información oficial (Tribu Tierra)</Text>
          </Pressable>

          {TRIBU_PROGRAMS.map((p) => {
            const data = tt[p.id] ?? { checks: {}, approved: false, status: "idle" };
            const doneCount = p.checklist.filter((_, i) => data.checks?.[i]).length;
            const complete = doneCount === p.checklist.length;
            const st = statusOf(data);
            const statusInfo = st === "aprobado"
              ? { label: "APROBADO POR DIRIGENTE", color: colors.success, icon: "check-decagram" }
              : st === "pendiente"
              ? { label: "PENDIENTE DE APROBACIÓN", color: colors.brandSecondary, icon: "clock-outline" }
              : st === "rechazado"
              ? { label: "REQUIERE CORRECCIÓN", color: colors.error, icon: "alert-circle-outline" }
              : complete
              ? { label: "LISTO PARA SOLICITAR", color: colors.brandSecondary, icon: "cloud-upload-outline" }
              : { label: "EN PROGRESO", color: colors.muted, icon: "progress-clock" };
            const canRequest = complete && (st === "idle" || st === "rechazado");
            return (
              <View key={p.id} style={[styles.profileCard, { marginTop: 14 }]} testID={`tribu-${p.id}`}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View style={[styles.pdfIcon, { backgroundColor: st === "aprobado" ? colors.success : colors.brandPrimary }]}>
                    <MaterialCommunityIcons name={p.icon as any} size={22} color={colors.onBrandPrimary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                      <MaterialCommunityIcons name={statusInfo.icon as any} size={12} color={statusInfo.color} />
                      <Text style={[styles.pdfTag, { color: statusInfo.color }]}>{statusInfo.label}</Text>
                    </View>
                    <Text style={styles.pdfTitle}>{p.name}</Text>
                    <Text style={styles.pdfDetail}>{doneCount}/{p.checklist.length} requisitos</Text>
                    {data.review_note ? <Text style={styles.pdfDetail}>Nota del dirigente: {data.review_note}</Text> : null}
                  </View>
                </View>
                <View style={{ marginTop: 12, gap: 6 }}>
                  {p.checklist.map((item, i) => {
                    const locked = st === "aprobado" || st === "pendiente";
                    return (
                      <Pressable
                        key={i}
                        testID={`tribu-${p.id}-${i}`}
                        onPress={() => !locked && setChecked(p.id, i, !data.checks?.[i])}
                        style={styles.checkRow}
                      >
                        <View style={[styles.checkbox, data.checks?.[i] && styles.checkboxOn]}>
                          {data.checks?.[i] && <MaterialCommunityIcons name="check" size={16} color={colors.onBrandPrimary} />}
                        </View>
                        <View style={styles.checkCopy}>
                          <Text style={[styles.checkLabel, data.checks?.[i] && styles.checkDone]}>{item}</Text>
                        </View>
                      </Pressable>
                    );
                  })}
                </View>
                {canRequest && (
                  <Pressable testID={`tribu-${p.id}-request`} onPress={() => requestReview(p.id, p.name)} style={[styles.secondaryButton, { marginTop: 12 }]}>
                    <MaterialCommunityIcons name="cloud-upload-outline" size={16} color={colors.onBrandSecondary} />
                    <Text style={styles.secondaryButtonText}>Solicitar aprobación al dirigente</Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

export default TribuTierraModal;
