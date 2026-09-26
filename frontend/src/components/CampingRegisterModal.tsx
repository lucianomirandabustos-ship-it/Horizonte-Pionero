import { useState, useMemo } from "react";
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AppState } from "@/src/api";

export function parseDateString(str: string): Date | null {
  if (!str) return null;
  const trimmed = str.trim();
  const parts = trimmed.split(/[-/]/);
  if (parts.length === 3) {
    // Formato YYYY-MM-DD
    if (parts[0].length === 4) {
      const y = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const d = parseInt(parts[2], 10);
      const dt = new Date(y, m, d);
      return isNaN(dt.getTime()) ? null : dt;
    }
    // Formato DD-MM-YYYY
    if (parts[2].length === 4) {
      const d = parseInt(parts[0], 10);
      const m = parseInt(parts[1], 10) - 1;
      const y = parseInt(parts[2], 10);
      const dt = new Date(y, m, d);
      return isNaN(dt.getTime()) ? null : dt;
    }
  }
  const dt = new Date(trimmed);
  return isNaN(dt.getTime()) ? null : dt;
}

export function calculateDateDiffDays(startStr: string, endStr: string): number | null {
  const d1 = parseDateString(startStr);
  const d2 = parseDateString(endStr);
  if (!d1 || !d2) return null;
  const diffTime = d2.getTime() - d1.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

export function CampingRegisterModal({ visible, onClose, onSubmit, colors, styles }: any) {
  const [place, setPlace] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [nights, setNights] = useState("");
  const [saving, setSaving] = useState(false);

  const enteredDays = parseInt(nights, 10);
  const calculatedDiff = useMemo(() => {
    if (startDate.trim() && endDate.trim()) {
      return calculateDateDiffDays(startDate, endDate);
    }
    return null;
  }, [startDate, endDate]);

  const hasDates = Boolean(startDate.trim() && endDate.trim());
  const hasDiff = calculatedDiff !== null;
  const isNegative = hasDiff && calculatedDiff < 0;
  const isMatch = hasDiff && !isNegative && !isNaN(enteredDays) && enteredDays > 0 && enteredDays === calculatedDiff;
  const showMismatch = (hasDates && hasDiff && !isMatch) || (hasDates && !hasDiff && nights.trim() !== "");

  const submit = async () => {
    if (!place.trim()) {
      Alert.alert("Campo requerido", "Por favor ingresa el lugar o nombre del campamento.");
      return;
    }
    if (!isMatch) {
      Alert.alert(
        "Fechas no coinciden",
        "Por favor revisa lo que estás colocando: las fechas seleccionadas no coinciden con la cantidad de días ingresada"
      );
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        place: place.trim(),
        start_date: startDate.trim(),
        end_date: endDate.trim(),
        date: `${startDate.trim()} al ${endDate.trim()}`,
        nights: enteredDays,
      });
      setPlace("");
      setStartDate("");
      setEndDate("");
      setNights("");
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>REGISTRAR CAMPAMENTO</Text>
            <Text style={styles.pdfModalTitle}>Suma a tu racha 2026</Text>
          </View>
          <Pressable testID="camp-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageSubtitle}>
            Cuenta desde ahora en tu racha; queda pendiente hasta que tu dirigente lo apruebe online.
          </Text>
          <View style={styles.profileCard}>
            <Text style={styles.fieldLabel}>Lugar o nombre del campamento</Text>
            <TextInput
              testID="camp-place"
              value={place}
              onChangeText={setPlace}
              placeholder="Ej. Campo Ferial San Jacinto, Tarija"
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
            />

            <Text style={[styles.fieldLabel, { marginTop: 12 }]}>Fecha de Inicio (AAAA-MM-DD o DD/MM/AAAA)</Text>
            <TextInput
              testID="camp-start-date"
              value={startDate}
              onChangeText={(val) => {
                setStartDate(val);
                // Si aún no ingresó noches y se completa el rango, sugerir valor
                const diff = calculateDateDiffDays(val, endDate);
                if (diff !== null && diff > 0 && !nights) setNights(String(diff));
              }}
              placeholder="Ej. 2026-10-10"
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
            />

            <Text style={[styles.fieldLabel, { marginTop: 12 }]}>Fecha de Fin (AAAA-MM-DD o DD/MM/AAAA)</Text>
            <TextInput
              testID="camp-end-date"
              value={endDate}
              onChangeText={(val) => {
                setEndDate(val);
                const diff = calculateDateDiffDays(startDate, val);
                if (diff !== null && diff > 0 && !nights) setNights(String(diff));
              }}
              placeholder="Ej. 2026-10-13"
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
            />

            <Text style={[styles.fieldLabel, { marginTop: 12 }]}>Cantidad de días / noches</Text>
            <TextInput
              testID="camp-nights"
              value={nights}
              onChangeText={setNights}
              placeholder="Ej. 3"
              keyboardType="number-pad"
              placeholderTextColor={styles.placeholder.color}
              style={styles.input}
            />

            {showMismatch && (
              <View
                testID="camp-mismatch-alert"
                style={[
                  styles.medicalNotice,
                  {
                    backgroundColor: colors.surfaceTertiary,
                    borderColor: colors.error,
                    borderWidth: 1,
                    marginTop: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  },
                ]}
              >
                <MaterialCommunityIcons name="alert-circle-outline" size={20} color={colors.error} />
                <Text style={[styles.medicalNoticeText, { color: colors.error, flex: 1 }]}>
                  Por favor revisa lo que estás colocando: las fechas seleccionadas no coinciden con la cantidad de días ingresada.
                  {hasDiff && calculatedDiff >= 0 ? ` (Diferencia calculada: ${calculatedDiff} días)` : ""}
                </Text>
              </View>
            )}

            {isMatch && (
              <View
                testID="camp-match-indicator"
                style={[
                  styles.medicalNotice,
                  {
                    backgroundColor: colors.surfaceTertiary,
                    borderColor: colors.success,
                    borderWidth: 1,
                    marginTop: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  },
                ]}
              >
                <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.success} />
                <Text style={[styles.medicalNoticeText, { color: colors.success, flex: 1 }]}>
                  Fechas y cantidad de días validadas correctamente ({enteredDays} días).
                </Text>
              </View>
            )}

            <Pressable
              testID="camp-submit"
              disabled={saving}
              onPress={submit}
              style={[
                styles.primaryButton,
                { marginTop: 16 },
                (saving || !isMatch || !place.trim()) && { opacity: 0.6 },
              ]}
            >
              <Text style={styles.primaryButtonText}>
                {saving ? "Registrando…" : "Registrar y solicitar aprobación"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export function computeCampingTotals(state: AppState) {
  const log = state.camping_log ?? [];
  const provisional = log.reduce((sum, c) => sum + (c.nights || 0), 0);
  const approved = log.filter((c) => c.status === "aprobado").reduce((sum, c) => sum + (c.nights || 0), 0);
  return { provisional, approved, entries: log };
}

export default CampingRegisterModal;
