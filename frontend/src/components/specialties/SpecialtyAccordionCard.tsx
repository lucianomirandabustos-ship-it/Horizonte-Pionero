import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme";
import { Specialty } from "@/src/data/specialtiesData";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface SpecialtyAccordionCardProps {
  specialty: Specialty;
  isExpanded?: boolean;
  onToggle?: () => void;
}

export default function SpecialtyAccordionCard({
  specialty,
  isExpanded: controlledExpanded,
  onToggle: controlledOnToggle,
}: SpecialtyAccordionCardProps) {
  const { colors } = useTheme();
  const [internalExpanded, setInternalExpanded] = useState(false);

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (controlledOnToggle) {
      controlledOnToggle();
    } else {
      setInternalExpanded(!internalExpanded);
    }
  };

  const accentColor = specialty.color || colors.brandPrimary;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surfaceSecondary,
          borderColor: isExpanded ? accentColor : colors.border,
        },
      ]}
    >
      {/* Encabezado Acordeón interactivo */}
      <Pressable
        testID={`specialty-accordion-${specialty.id}`}
        onPress={toggle}
        style={({ pressed }) => [
          styles.headerRow,
          pressed && styles.pressed,
        ]}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
        accessibilityLabel={`${specialty.name}, ${isExpanded ? "expandido" : "colapsado"}`}
      >
        <View style={[styles.iconBox, { backgroundColor: `${accentColor}25` }]}>
          <MaterialCommunityIcons
            name={(specialty.icon as any) || "certificate"}
            size={24}
            color={accentColor}
          />
        </View>

        <View style={styles.headerInfo}>
          <Text style={[styles.specialtyName, { color: colors.onSurfaceSecondary }]}>
            {specialty.name}
          </Text>

          <View style={styles.metaRow}>
            <View style={[styles.pageBadge, { backgroundColor: colors.surfaceTertiary }]}>
              <MaterialCommunityIcons name="book-open-outline" size={12} color={colors.muted} />
              <Text style={[styles.pageBadgeText, { color: colors.muted }]}>
                Pág. {specialty.page}
              </Text>
            </View>

            <Text style={[styles.metaDot, { color: colors.muted }]}>•</Text>

            <Text style={[styles.summaryText, { color: colors.muted }]}>
              {specialty.basicKnowledge.length} teóricos · {specialty.testsToPass.length} prácticos
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.chevronBox,
            {
              backgroundColor: isExpanded ? `${accentColor}20` : colors.surfaceTertiary,
            },
          ]}
        >
          <MaterialCommunityIcons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={22}
            color={isExpanded ? accentColor : colors.onSurfaceSecondary}
          />
        </View>
      </Pressable>

      {/* Contenido Expandible: Conocimientos y Pruebas */}
      {isExpanded && (
        <View style={[styles.expandedContent, { borderTopColor: colors.divider }]}>
          {/* SECCIÓN 1: Conocimientos Básicos */}
          <View style={styles.sectionBlock}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionIconBadge, { backgroundColor: `${colors.info}25` }]}>
                <MaterialCommunityIcons name="book-open-variant" size={15} color={colors.info} />
              </View>
              <Text style={[styles.sectionHeading, { color: colors.onSurface }]}>
                Conocimientos Básicos
              </Text>
              <View style={[styles.countPill, { backgroundColor: `${colors.info}20` }]}>
                <Text style={[styles.countPillText, { color: colors.info }]}>
                  {specialty.basicKnowledge.length} puntos
                </Text>
              </View>
            </View>

            <View style={styles.itemsList}>
              {specialty.basicKnowledge.map((item, index) => (
                <View
                  key={`knowledge-${index}`}
                  style={[styles.itemRow, { backgroundColor: colors.surfaceTertiary }]}
                >
                  <View style={[styles.numberBadge, { backgroundColor: `${colors.info}30` }]}>
                    <Text style={[styles.numberBadgeText, { color: colors.info }]}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={[styles.itemText, { color: colors.onSurfaceSecondary }]}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* SECCIÓN 2: Pruebas que debes superar */}
          <View style={[styles.sectionBlock, { marginTop: 8 }]}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionIconBadge, { backgroundColor: `${colors.success}25` }]}>
                <MaterialCommunityIcons name="check-decagram-outline" size={15} color={colors.success} />
              </View>
              <Text style={[styles.sectionHeading, { color: colors.onSurface }]}>
                Pruebas que debes superar
              </Text>
              <View style={[styles.countPill, { backgroundColor: `${colors.success}20` }]}>
                <Text style={[styles.countPillText, { color: colors.success }]}>
                  {specialty.testsToPass.length} pruebas
                </Text>
              </View>
            </View>

            <View style={styles.itemsList}>
              {specialty.testsToPass.map((test, index) => (
                <View
                  key={`test-${index}`}
                  style={[styles.itemRow, { backgroundColor: colors.surfaceTertiary }]}
                >
                  <View style={[styles.numberBadge, { backgroundColor: `${colors.success}30` }]}>
                    <Text style={[styles.numberBadgeText, { color: colors.success }]}>
                      {index + 1}
                    </Text>
                  </View>
                  <Text style={[styles.itemText, { color: colors.onSurfaceSecondary }]}>
                    {test}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    overflow: "hidden",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  pressed: {
    opacity: 0.85,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    flex: 1,
    gap: 4,
  },
  specialtyName: {
    fontSize: 15,
    fontWeight: "800",
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 6,
  },
  pageBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pageBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  metaDot: {
    fontSize: 11,
  },
  summaryText: {
    fontSize: 11,
    fontWeight: "600",
  },
  chevronBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  expandedContent: {
    padding: 14,
    borderTopWidth: 1,
    gap: 14,
  },
  sectionBlock: {
    gap: 8,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  countPill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: "auto",
  },
  countPillText: {
    fontSize: 11,
    fontWeight: "700",
  },
  itemsList: {
    gap: 6,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  numberBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    marginTop: 1,
  },
  numberBadgeText: {
    fontSize: 11,
    fontWeight: "900",
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
});
