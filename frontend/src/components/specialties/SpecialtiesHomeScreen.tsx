import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme";
import { SPECIALTY_AREAS_DATA, SpecialtyArea } from "@/src/data/specialtiesData";

interface SpecialtiesHomeScreenProps {
  onSelectArea: (areaId: string) => void;
}

export default function SpecialtiesHomeScreen({
  onSelectArea,
}: SpecialtiesHomeScreenProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {/* Banner de introducción institucional */}
      <View style={[styles.headerCard, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
        <View style={styles.badgeRow}>
          <View style={[styles.statusBadge, { backgroundColor: colors.surfaceTertiary, borderColor: colors.borderStrong }]}>
            <MaterialCommunityIcons name="cloud-off-outline" size={14} color={colors.brandSecondary} />
            <Text style={[styles.statusBadgeText, { color: colors.brandSecondary }]}>100% OFFLINE</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: colors.surfaceTertiary, borderColor: colors.borderStrong }]}>
            <MaterialCommunityIcons name="certificate-outline" size={14} color={colors.success} />
            <Text style={[styles.statusBadgeText, { color: colors.success }]}>65 ESPECIALIDADES</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: colors.surfaceTertiary, borderColor: colors.borderStrong }]}>
            <MaterialCommunityIcons name="layers-outline" size={14} color={colors.info} />
            <Text style={[styles.statusBadgeText, { color: colors.info }]}>6 ÁREAS</Text>
          </View>
        </View>

        <Text style={[styles.headerTitle, { color: colors.onSurface }]}>
          Especialidades Scouts
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.muted }]}>
          Catálogo Oficial de la Asociación de Scouts de Bolivia (Rama Pioneros).
          Selecciona un área para explorar sus especialidades, requisitos teóricos y pruebas de campo.
        </Text>
      </View>

      {/* Título de sección */}
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, { color: colors.onSurface }]}>
          Áreas Oficiales
        </Text>
        <Text style={[styles.sectionCount, { color: colors.muted }]}>
          6 disponibles
        </Text>
      </View>

      {/* Las 6 Tarjetas Principales del Nivel 1 */}
      <View style={styles.cardsGrid}>
        {SPECIALTY_AREAS_DATA.map((area: SpecialtyArea, index: number) => {
          const subcatCount = area.subcategories.length;

          return (
            <Pressable
              key={area.id}
              testID={`specialty-area-card-${area.id}`}
              onPress={() => onSelectArea(area.id)}
              style={({ pressed }) => [
                styles.areaCard,
                {
                  backgroundColor: colors.surfaceSecondary,
                  borderColor: colors.border,
                  borderLeftColor: area.color,
                },
                pressed && styles.areaCardPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Área ${area.name}, ${area.totalSpecialties} especialidades`}
            >
              {/* Encabezado de la tarjeta: Icono, Título y Chevron */}
              <View style={styles.cardHeader}>
                <View style={[styles.iconWrapper, { backgroundColor: `${area.color}22` }]}>
                  <MaterialCommunityIcons
                    name={area.icon as any}
                    size={28}
                    color={area.color}
                  />
                </View>

                <View style={styles.cardHeaderText}>
                  <View style={styles.areaNumberRow}>
                    <Text style={[styles.areaNumber, { color: area.color }]}>
                      ÁREA {index + 1}
                    </Text>
                    <View style={[styles.countBadge, { backgroundColor: `${area.color}20` }]}>
                      <MaterialCommunityIcons name="star-outline" size={12} color={area.color} />
                      <Text style={[styles.countBadgeText, { color: area.color }]}>
                        {area.totalSpecialties} especialidades
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.areaTitle, { color: colors.onSurfaceSecondary }]}>
                    {area.name}
                  </Text>
                </View>

                <View style={styles.chevronWrapper}>
                  <MaterialCommunityIcons
                    name="chevron-right"
                    size={24}
                    color={colors.muted}
                  />
                </View>
              </View>

              {/* Descripción del área */}
              <Text style={[styles.areaDescription, { color: colors.muted }]}>
                {area.description}
              </Text>

              {/* Subcategorías de esta área (badges) */}
              <View style={styles.subcatList}>
                {area.subcategories.map((subcat) => (
                  <View
                    key={subcat.id}
                    style={[styles.subcatPill, { backgroundColor: colors.surfaceTertiary }]}
                  >
                    <Text
                      style={[styles.subcatPillText, { color: colors.onSurfaceTertiary }]}
                      numberOfLines={1}
                    >
                      {subcat.name.replace(/^Especialidades en\s+/i, "")} ({subcat.specialties.length})
                    </Text>
                  </View>
                ))}
              </View>

              {/* Pie de tarjeta: acción rápida */}
              <View style={[styles.cardFooter, { borderTopColor: colors.divider }]}>
                <Text style={[styles.footerSubcatText, { color: colors.muted }]}>
                  {subcatCount} {subcatCount === 1 ? "categoría" : "categorías"}
                </Text>

                <View style={styles.actionPrompt}>
                  <Text style={[styles.actionPromptText, { color: area.color }]}>
                    Ver especialidades
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={15}
                    color={area.color}
                  />
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 24,
  },
  headerCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    fontSize: 13,
    lineHeight: 19,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: "600",
  },
  cardsGrid: {
    gap: 14,
  },
  areaCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderLeftWidth: 5,
    padding: 16,
    gap: 12,
  },
  areaCardPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  cardHeaderText: {
    flex: 1,
    gap: 3,
  },
  areaNumberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  areaNumber: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  countBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
  areaTitle: {
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 22,
  },
  chevronWrapper: {
    paddingLeft: 4,
  },
  areaDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  subcatList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  subcatPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    maxWidth: "100%",
  },
  subcatPillText: {
    fontSize: 11,
    fontWeight: "600",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: 1,
  },
  footerSubcatText: {
    fontSize: 12,
    fontWeight: "600",
  },
  actionPrompt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionPromptText: {
    fontSize: 12,
    fontWeight: "800",
  },
});
