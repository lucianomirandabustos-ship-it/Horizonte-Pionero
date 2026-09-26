import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme";

interface OfflineSetupModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    patrol: string;
    stage: "busqueda" | "encuentro" | "desafio";
    group_number: string;
  }) => void;
}

export default function OfflineSetupModal({
  visible,
  onClose,
  onSave,
}: OfflineSetupModalProps) {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [patrol, setPatrol] = useState("");
  const [stage, setStage] = useState<"busqueda" | "encuentro" | "desafio">("busqueda");
  const [group, setGroup] = useState("Grupo 1 Tarija");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSave({
      name: name.trim(),
      patrol: patrol.trim() || "Pioneros",
      stage,
      group_number: group.trim() || "Tarija",
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalBackdrop}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={[styles.modalCard, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={[styles.iconBox, { backgroundColor: `${colors.brandSecondary}25` }]}>
              <MaterialCommunityIcons name="compass-rose" size={26} color={colors.brandSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.badge, { color: colors.brandSecondary }]}>MODO AUTÓNOMO TARIJA</Text>
              <Text style={[styles.title, { color: colors.onSurface }]}>Perfil de Pionero Local</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={8}>
              <MaterialCommunityIcons name="close" size={22} color={colors.muted} />
            </Pressable>
          </View>

          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Configura tu identidad scout. Todo tu progreso se guardará en este celular de manera permanente y sin depender de internet.
          </Text>

          <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
            {/* Campo: Nombre */}
            <View style={styles.field}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceSecondary }]}>Nombre completo *</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Ej: Mateo Valdivieso"
                placeholderTextColor={colors.muted}
                style={[styles.input, { backgroundColor: colors.surfaceTertiary, color: colors.onSurface, borderColor: colors.border }]}
              />
            </View>

            {/* Campo: Patrulla */}
            <View style={styles.field}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceSecondary }]}>Patrulla o Equipo</Text>
              <TextInput
                value={patrol}
                onChangeText={setPatrol}
                placeholder="Ej: Cóndores, Águilas, Jaguares"
                placeholderTextColor={colors.muted}
                style={[styles.input, { backgroundColor: colors.surfaceTertiary, color: colors.onSurface, borderColor: colors.border }]}
              />
            </View>

            {/* Selector de Etapa */}
            <View style={styles.field}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceSecondary }]}>Etapa actual</Text>
              <View style={styles.stageRow}>
                {(["busqueda", "encuentro", "desafio"] as const).map((s) => {
                  const isActive = stage === s;
                  const label = s === "busqueda" ? "Búsqueda" : s === "encuentro" ? "Encuentro" : "Desafío";
                  return (
                    <Pressable
                      key={s}
                      onPress={() => setStage(s)}
                      style={[
                        styles.stageChip,
                        {
                          backgroundColor: isActive ? colors.brandPrimary : colors.surfaceTertiary,
                          borderColor: isActive ? colors.brandSecondary : colors.border,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.stageChipText,
                          { color: isActive ? colors.onBrandPrimary : colors.onSurfaceSecondary },
                        ]}
                      >
                        {label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Campo: Grupo Scout */}
            <View style={styles.field}>
              <Text style={[styles.fieldLabel, { color: colors.onSurfaceSecondary }]}>Grupo Scout</Text>
              <TextInput
                value={group}
                onChangeText={setGroup}
                placeholder="Ej: Grupo 1 San Roque Tarija"
                placeholderTextColor={colors.muted}
                style={[styles.input, { backgroundColor: colors.surfaceTertiary, color: colors.onSurface, borderColor: colors.border }]}
              />
            </View>
          </ScrollView>

          {/* Botón de Confirmación */}
          <Pressable
            disabled={!name.trim()}
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              {
                backgroundColor: name.trim() ? colors.brandSecondary : colors.surfaceTertiary,
                opacity: pressed ? 0.85 : 1,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="check-bold"
              size={18}
              color={name.trim() ? colors.onBrandSecondary : colors.muted}
            />
            <Text
              style={[
                styles.submitButtonText,
                { color: name.trim() ? colors.onBrandSecondary : colors.muted },
              ]}
            >
              Comenzar mi Aventura Offline
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    borderRadius: 22,
    borderWidth: 1,
    padding: 22,
    maxHeight: "85%",
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
  },
  formScroll: {
    marginVertical: 4,
  },
  field: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 6,
  },
  input: {
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  stageRow: {
    flexDirection: "row",
    gap: 8,
  },
  stageChip: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stageChipText: {
    fontSize: 12,
    fontWeight: "800",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 48,
    borderRadius: 14,
    marginTop: 6,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: "800",
  },
});
