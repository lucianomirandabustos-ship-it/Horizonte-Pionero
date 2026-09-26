import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/src/theme";
import {
  SpecialtyArea,
  SpecialtySubcategory,
  Specialty,
  getAreaById,
} from "@/src/data/specialtiesData";
import SpecialtyAccordionCard from "./SpecialtyAccordionCard";

interface AreaDetailScreenProps {
  areaId: string;
  onBack: () => void;
}

export default function AreaDetailScreen({
  areaId,
  onBack,
}: AreaDetailScreenProps) {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSpecialtyIds, setExpandedSpecialtyIds] = useState<Record<string, boolean>>({});

  const area: SpecialtyArea | undefined = useMemo(() => {
    return getAreaById(areaId);
  }, [areaId]);

  // Filtrado en tiempo real por búsqueda
  const filteredSubcategories = useMemo(() => {
    if (!area) return [];
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return area.subcategories;
    }

    return area.subcategories
      .map((subcat: SpecialtySubcategory) => {
        const matchingSpecialties = subcat.specialties.filter((sp: Specialty) => {
          return (
            sp.name.toLowerCase().includes(query) ||
            sp.subcategoryName.toLowerCase().includes(query) ||
            sp.basicKnowledge.some((k) => k.toLowerCase().includes(query)) ||
            sp.testsToPass.some((t) => t.toLowerCase().includes(query))
          );
        });

        return {
          ...subcat,
          specialties: matchingSpecialties,
        };
      })
      .filter((subcat) => subcat.specialties.length > 0);
  }, [area, searchQuery]);

  const totalFilteredSpecialties = useMemo(() => {
    return filteredSubcategories.reduce(
      (acc, subcat) => acc + subcat.specialties.length,
      0
    );
  }, [filteredSubcategories]);

  if (!area) {
    return (
      <View style={styles.errorContainer}>
        <Text style={[styles.errorText, { color: colors.error }]}>
          Área no encontrada
        </Text>
        <Pressable
          testID="btn-back-error"
          onPress={onBack}
          style={[styles.backButton, { backgroundColor: colors.surfaceSecondary }]}
        >
          <MaterialCommunityIcons name="arrow-left" size={18} color={colors.onSurface} />
          <Text style={[styles.backButtonText, { color: colors.onSurface }]}>
            Volver a Áreas
          </Text>
        </Pressable>
      </View>
    );
  }

  // Toggle individual specialty
  const toggleSpecialty = (id: string) => {
    setExpandedSpecialtyIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Expandir o colapsar todas
  const toggleAll = (expand: boolean) => {
    const next: Record<string, boolean> = {};
    if (expand) {
      filteredSubcategories.forEach((subcat) => {
        subcat.specialties.forEach((sp) => {
          next[sp.id] = true;
        });
      });
    }
    setExpandedSpecialtyIds(next);
  };

  const isAllExpanded =
    totalFilteredSpecialties > 0 &&
    filteredSubcategories.every((subcat) =>
      subcat.specialties.every((sp) => expandedSpecialtyIds[sp.id])
    );

  return (
    <View style={styles.container}>
      {/* Botón de Navegación Nivel 2 -> Nivel 1 */}
      <View style={styles.topNavRow}>
        <Pressable
          testID="btn-back-to-areas"
          onPress={onBack}
          style={({ pressed }) => [
            styles.backButton,
            {
              backgroundColor: colors.surfaceSecondary,
              borderColor: colors.border,
            },
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Volver a Áreas"
        >
          <MaterialCommunityIcons name="arrow-left" size={18} color={area.color} />
          <Text style={[styles.backButtonText, { color: colors.onSurface }]}>
            Volver a Áreas
          </Text>
        </Pressable>

        <View style={[styles.headerCountBadge, { backgroundColor: `${area.color}20` }]}>
          <Text style={[styles.headerCountText, { color: area.color }]}>
            {area.totalSpecialties} especialidades
          </Text>
        </View>
      </View>

      {/* Banner del Área Seleccionada */}
      <View
        style={[
          styles.areaBanner,
          {
            backgroundColor: colors.surfaceSecondary,
            borderColor: colors.border,
            borderLeftColor: area.color,
          },
        ]}
      >
        <View style={styles.bannerHeader}>
          <View style={[styles.bannerIconWrapper, { backgroundColor: `${area.color}25` }]}>
            <MaterialCommunityIcons name={area.icon as any} size={28} color={area.color} />
          </View>
          <View style={styles.bannerTitleBox}>
            <Text style={[styles.bannerAreaTag, { color: area.color }]}>
              ÁREA OFICIAL ASB
            </Text>
            <Text style={[styles.bannerTitle, { color: colors.onSurfaceSecondary }]}>
              {area.name}
            </Text>
          </View>
        </View>

        <Text style={[styles.bannerDescription, { color: colors.muted }]}>
          {area.description}
        </Text>
      </View>

      {/* Buscador superior en tiempo real */}
      <View
        style={[
          styles.searchContainer,
          {
            backgroundColor: colors.surfaceSecondary,
            borderColor: searchQuery ? area.color : colors.border,
          },
        ]}
      >
        <MaterialCommunityIcons
          name="magnify"
          size={20}
          color={searchQuery ? area.color : colors.muted}
        />
        <TextInput
          testID="specialties-search-input"
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`Buscar en ${area.name}...`}
          placeholderTextColor={colors.muted}
          style={[styles.searchInput, { color: colors.onSurface }]}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <Pressable
            testID="btn-clear-search"
            onPress={() => setSearchQuery("")}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Limpiar búsqueda"
          >
            <MaterialCommunityIcons name="close-circle" size={18} color={colors.muted} />
          </Pressable>
        )}
      </View>

      {/* Barra de estado de filtros y acción "Expandir todos" */}
      <View style={styles.filterStatusRow}>
        <Text style={[styles.filterStatusText, { color: colors.muted }]}>
          {searchQuery
            ? `Resultados: ${totalFilteredSpecialties} de ${area.totalSpecialties}`
            : `${totalFilteredSpecialties} especialidades en ${filteredSubcategories.length} categorías`}
        </Text>

        {totalFilteredSpecialties > 0 && (
          <Pressable
            onPress={() => toggleAll(!isAllExpanded)}
            style={({ pressed }) => [
              styles.expandAllButton,
              { backgroundColor: colors.surfaceTertiary },
              pressed && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name={isAllExpanded ? "arrow-collapse-vertical" : "arrow-expand-vertical"}
              size={14}
              color={area.color}
            />
            <Text style={[styles.expandAllText, { color: area.color }]}>
              {isAllExpanded ? "Colapsar todas" : "Expandir todas"}
            </Text>
          </Pressable>
        )}
      </View>

      {/* Caso: Sin resultados de búsqueda */}
      {totalFilteredSpecialties === 0 && (
        <View style={[styles.emptyCard, { backgroundColor: colors.surfaceSecondary, borderColor: colors.border }]}>
          <MaterialCommunityIcons name="file-search-outline" size={44} color={colors.muted} />
          <Text style={[styles.emptyTitle, { color: colors.onSurface }]}>
            No se encontraron especialidades
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.muted }]}>
            No hay resultados que coincidan con "{searchQuery}" dentro de {area.name}.
          </Text>
          <Pressable
            onPress={() => setSearchQuery("")}
            style={[styles.clearSearchBtn, { backgroundColor: area.color }]}
          >
            <Text style={styles.clearSearchBtnText}>Limpiar búsqueda</Text>
          </Pressable>
        </View>
      )}

      {/* Organización de especialidades por subcategorías */}
      <View style={styles.subcategoriesContainer}>
        {filteredSubcategories.map((subcat: SpecialtySubcategory) => (
          <View key={subcat.id} style={styles.subcategorySection}>
            {/* Cabecera de la Subcategoría */}
            <View
              style={[
                styles.subcatHeader,
                {
                  backgroundColor: colors.surfaceTertiary,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={[styles.subcatDot, { backgroundColor: area.color }]} />
              <Text style={[styles.subcatTitle, { color: colors.onSurface }]}>
                {subcat.name}
              </Text>
              <View style={[styles.subcatBadge, { backgroundColor: colors.surfaceSecondary }]}>
                <Text style={[styles.subcatBadgeText, { color: area.color }]}>
                  {subcat.specialties.length}
                </Text>
              </View>
            </View>

            {/* Lista de especialidades (Tarjetas expandibles tipo acordeón) */}
            <View style={styles.specialtiesList}>
              {subcat.specialties.map((specialty: Specialty) => (
                <SpecialtyAccordionCard
                  key={specialty.id}
                  specialty={specialty}
                  isExpanded={Boolean(expandedSpecialtyIds[specialty.id])}
                  onToggle={() => toggleSpecialty(specialty.id)}
                />
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Botón inferior de retorno a Nivel 1 */}
      <Pressable
        testID="btn-bottom-back-to-areas"
        onPress={onBack}
        style={({ pressed }) => [
          styles.bottomBackButton,
          {
            backgroundColor: colors.surfaceSecondary,
            borderColor: colors.border,
          },
          pressed && styles.pressed,
        ]}
      >
        <MaterialCommunityIcons name="arrow-left" size={18} color={area.color} />
        <Text style={[styles.bottomBackText, { color: colors.onSurface }]}>
          Volver a selección de Áreas
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
    paddingBottom: 24,
  },
  errorContainer: {
    padding: 24,
    alignItems: "center",
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "700",
  },
  topNavRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: "700",
  },
  headerCountBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  headerCountText: {
    fontSize: 11,
    fontWeight: "800",
  },
  areaBanner: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderLeftWidth: 5,
    gap: 10,
  },
  bannerHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bannerIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  bannerTitleBox: {
    flex: 1,
    gap: 2,
  },
  bannerAreaTag: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "900",
    lineHeight: 22,
  },
  bannerDescription: {
    fontSize: 12,
    lineHeight: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    height: 46,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: "100%",
  },
  filterStatusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  filterStatusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  expandAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  expandAllText: {
    fontSize: 11,
    fontWeight: "700",
  },
  subcategoriesContainer: {
    gap: 18,
  },
  subcategorySection: {
    gap: 10,
  },
  subcatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    gap: 8,
  },
  subcatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  subcatTitle: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
  },
  subcatBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  subcatBadgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
  specialtiesList: {
    gap: 8,
  },
  emptyCard: {
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    gap: 10,
    marginTop: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
  },
  clearSearchBtn: {
    marginTop: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  clearSearchBtnText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  bottomBackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 8,
  },
  bottomBackText: {
    fontSize: 13,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.85,
  },
});
