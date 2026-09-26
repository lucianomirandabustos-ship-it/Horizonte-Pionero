import { useState } from "react";
import { Alert, Linking, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { FIRST_AID, TARIJA_VENUES, TRIBU_TIERRA_URL, Venue } from "@/src/data/tarija";

export function TarijaVenuesModal({ visible, onClose, colors, styles, currentUser, venues: propVenues, onSaveVenues }: any) {
  const isDirigente = currentUser?.role === "dirigente";
  const venueList: Venue[] = (propVenues && propVenues.length > 0) ? propVenues : TARIJA_VENUES;

  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState("");
  const [zone, setZone] = useState("");
  const [address, setAddress] = useState("");
  const [features, setFeatures] = useState("");
  const [contact, setContact] = useState("");

  const openMap = (v: Venue) => {
    const q = encodeURIComponent(v.mapsQuery || `${v.name} ${v.address} Tarija`);
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${q}`,
      android: `geo:0,0?q=${q}`,
      default: `https://www.google.com/maps/search/?api=1&query=${q}`,
    });
    Linking.openURL(url as string).catch(() => undefined);
  };

  const copyAddress = async (v: Venue) => {
    try {
      await Clipboard.setStringAsync(v.address);
      Alert.alert("Copiado", "La dirección quedó en tu portapapeles.");
    } catch {
      /* ignore */
    }
  };

  const handleAddVenue = () => {
    if (!name.trim()) {
      Alert.alert("Campo requerido", "Por favor ingresa el nombre de la sede o predio.");
      return;
    }
    if (!address.trim()) {
      Alert.alert("Campo requerido", "Por favor ingresa la dirección o ubicación de la sede.");
      return;
    }

    const featureArray = features.trim()
      ? features.split(",").map((s) => s.trim()).filter(Boolean)
      : ["Predio scout", "Coordinación previa"];

    const newVenue: Venue = {
      id: `venue-${Date.now()}`,
      name: name.trim(),
      zone: zone.trim() || "Tarija",
      address: address.trim(),
      features: featureArray,
      contact: contact.trim() || undefined,
      mapsQuery: `${name.trim()} Tarija`,
    };

    const nextList = [newVenue, ...venueList];
    onSaveVenues?.(nextList);
    setName("");
    setZone("");
    setAddress("");
    setFeatures("");
    setContact("");
    setIsAdding(false);
    Alert.alert("Sede agregada", `"${newVenue.name}" ha sido agregada exitosamente al directorio.`);
  };

  const handleDeleteVenue = (v: Venue) => {
    Alert.alert(
      "Eliminar sede",
      `¿Estás seguro de eliminar "${v.name}" del directorio de sedes?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            const nextList = venueList.filter((item) => item.id !== v.id);
            onSaveVenues?.(nextList);
            Alert.alert("Sede eliminada", "El directorio ha sido actualizado.");
          },
        },
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>CAMPISMO · TARIJA</Text>
            <Text style={styles.pdfModalTitle}>Lugares y sedes para acampar</Text>
          </View>
          <Pressable testID="tarija-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>

        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageSubtitle}>
            Sedes seguras y espacios cerrados verificados en la Provincia Cercado y alrededores de Tarija.
          </Text>

          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <Text style={styles.sectionTitle}>Directorio de Sedes ({venueList.length})</Text>
            {isDirigente && (
              <Pressable
                testID="tarija-add-btn"
                onPress={() => setIsAdding(!isAdding)}
                style={[styles.secondaryButton, { paddingHorizontal: 12, height: 38 }]}
              >
                <MaterialCommunityIcons name={isAdding ? "minus" : "plus"} size={16} color={colors.onBrandSecondary} />
                <Text style={[styles.secondaryButtonText, { fontSize: 13 }]}>
                  {isAdding ? "Cerrar" : "Añadir sede"}
                </Text>
              </Pressable>
            )}
          </View>

          {/* Formulario de creación exclusivo para Dirigentes */}
          {isDirigente && isAdding && (
            <View style={[styles.profileCard, { marginTop: 12, marginBottom: 16, borderColor: colors.brandSecondary, borderWidth: 1.5 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <MaterialCommunityIcons name="plus-circle-outline" size={22} color={colors.brandSecondary} />
                <Text style={[styles.resultLabel, { color: colors.brandSecondary, fontSize: 13 }]}>
                  REGISTRAR NUEVA SEDE SCOUT
                </Text>
              </View>

              <Text style={[styles.pdfDetail, { marginBottom: 4 }]}>Nombre del lugar o predio *</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Ej. Parroquia San Roque / Predios Tomatitas"
                placeholderTextColor={styles.placeholder.color}
                style={[styles.input, { marginBottom: 10 }]}
              />

              <Text style={[styles.pdfDetail, { marginBottom: 4 }]}>Zona / Barrio / Municipio</Text>
              <TextInput
                value={zone}
                onChangeText={setZone}
                placeholder="Ej. Cercado · San Roque / San Lorenzo"
                placeholderTextColor={styles.placeholder.color}
                style={[styles.input, { marginBottom: 10 }]}
              />

              <Text style={[styles.pdfDetail, { marginBottom: 4 }]}>Dirección exacta *</Text>
              <TextInput
                value={address}
                onChangeText={setAddress}
                placeholder="Ej. Calle Gral. Trigo entre Sucre y Campero"
                placeholderTextColor={styles.placeholder.color}
                style={[styles.input, { marginBottom: 10 }]}
              />

              <Text style={[styles.pdfDetail, { marginBottom: 4 }]}>Servicios / Características (separados por coma)</Text>
              <TextInput
                value={features}
                onChangeText={setFeatures}
                placeholder="Ej. Baños, Agua potable, Espacio cerrado, Electricidad"
                placeholderTextColor={styles.placeholder.color}
                style={[styles.input, { marginBottom: 10 }]}
              />

              <Text style={[styles.pdfDetail, { marginBottom: 4 }]}>Teléfono o Contacto del encargado</Text>
              <TextInput
                value={contact}
                onChangeText={setContact}
                placeholder="Ej. Tel. 70000000 / Párroco Juan"
                placeholderTextColor={styles.placeholder.color}
                style={[styles.input, { marginBottom: 14 }]}
              />

              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable
                  onPress={() => setIsAdding(false)}
                  style={[styles.secondaryButton, { flex: 1 }]}
                >
                  <Text style={styles.secondaryButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable
                  testID="tarija-save-venue"
                  onPress={handleAddVenue}
                  style={[styles.primaryButton, { flex: 1.5 }]}
                >
                  <MaterialCommunityIcons name="content-save-outline" size={18} color={colors.onBrandPrimary} />
                  <Text style={styles.primaryButtonText}>Guardar sede</Text>
                </Pressable>
              </View>
            </View>
          )}

          {venueList.map((v) => (
            <View key={v.id} testID={`venue-${v.id}`} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 10, marginBottom: 12 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={[styles.pdfIcon, { backgroundColor: colors.brandPrimary }]}>
                  <MaterialCommunityIcons name="pine-tree" size={22} color={colors.onBrandPrimary} />
                </View>
                <View style={[styles.pdfCopy, { flex: 1 }]}>
                  <Text style={styles.pdfTag}>{v.zone ? v.zone.toUpperCase() : "TARIJA"}</Text>
                  <Text style={styles.pdfTitle}>{v.name}</Text>
                  <Text style={styles.pdfDetail}>{v.address}</Text>
                  {v.contact ? <Text style={[styles.pdfDetail, { color: colors.brandSecondary }]}>Contacto: {v.contact}</Text> : null}
                </View>
              </View>

              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                {(v.features || []).map((f, i) => (
                  <View key={`${f}-${i}`} style={[styles.badge, { paddingVertical: 4 }]}>
                    <MaterialCommunityIcons name="check" size={11} color={colors.success} />
                    <Text style={styles.badgeText}>{f}</Text>
                  </View>
                ))}
              </View>

              <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
                <Pressable testID={`venue-map-${v.id}`} onPress={() => openMap(v)} style={[styles.secondaryButton, { flex: 1, paddingHorizontal: 10 }]}>
                  <MaterialCommunityIcons name="map-marker-outline" size={16} color={colors.onBrandSecondary} />
                  <Text style={[styles.secondaryButtonText, { fontSize: 13 }]}>Mapa</Text>
                </Pressable>
                <Pressable testID={`venue-copy-${v.id}`} onPress={() => copyAddress(v)} style={[styles.chip, { flex: 1, height: 46, flexDirection: "row", gap: 6, justifyContent: "center" }]}>
                  <MaterialCommunityIcons name="content-copy" size={14} color={colors.onSurfaceSecondary} />
                  <Text style={[styles.chipText, { fontSize: 13 }]}>Dirección</Text>
                </Pressable>
                {isDirigente && (
                  <Pressable
                    testID={`venue-delete-${v.id}`}
                    onPress={() => handleDeleteVenue(v)}
                    style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: "rgba(220, 38, 38, 0.15)", borderWidth: 1, borderColor: colors.error, alignItems: "center", justifyContent: "center" }}
                  >
                    <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.error} />
                  </Pressable>
                )}
              </View>
            </View>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Primeros auxilios básicos</Text>
          <Text style={styles.pageSubtitle}>Referencia rápida para dirigentes de patrulla en campo. No sustituye atención médica profesional.</Text>
          {FIRST_AID.map((f) => (
            <View key={f.id} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 8, marginTop: 12 }]} testID={`aid-${f.id}`}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={styles.pdfIcon}>
                  <MaterialCommunityIcons name="medical-bag" size={22} color={colors.brandSecondary} />
                </View>
                <View style={styles.pdfCopy}>
                  <Text style={styles.pdfTag}>PRIMEROS AUXILIOS</Text>
                  <Text style={styles.pdfTitle}>{f.title}</Text>
                </View>
              </View>
              {f.steps.map((s, i) => (
                <View key={i} style={{ flexDirection: "row", gap: 8 }}>
                  <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: colors.onBrandPrimary, fontWeight: "800", fontSize: 11 }}>{i + 1}</Text>
                  </View>
                  <Text style={[styles.helperText, { flex: 1, marginTop: 2 }]}>{s}</Text>
                </View>
              ))}
            </View>
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Tribu Tierra</Text>
          <View style={styles.placeholderCard}>
            <MaterialCommunityIcons name="earth" size={36} color={colors.brandSecondary} />
            <Text style={styles.placeholderTitle}>Programas y recursos oficiales</Text>
            <Text style={styles.placeholderText}>Visita el sitio oficial para revisar los programas Scouts Go Solar, Champions for Nature y Plastic Tide.</Text>
            <Pressable testID="tribu-tierra-link" onPress={() => Linking.openURL(TRIBU_TIERRA_URL).catch(() => undefined)} style={[styles.primaryButton, { alignSelf: "stretch", marginTop: 4 }]}>
              <Text style={styles.primaryButtonText}>Abrir sitio Tribu Tierra</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default TarijaVenuesModal;
