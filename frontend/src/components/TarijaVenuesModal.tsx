import { Alert, Linking, Modal, Platform, Pressable, ScrollView, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { FIRST_AID, TARIJA_VENUES, TRIBU_TIERRA_URL, Venue } from "@/src/data/tarija";

export function TarijaVenuesModal({ visible, onClose, colors, styles }: any) {
  const openMap = (v: Venue) => {
    const q = encodeURIComponent(v.mapsQuery);
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

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>CAMPISMO · TARIJA</Text>
            <Text style={styles.pdfModalTitle}>Lugares cerrados para acampar</Text>
          </View>
          <Pressable testID="tarija-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
          <Text style={styles.pageSubtitle}>Sedes seguras y espacios cerrados verificados en la Provincia Cercado.</Text>
          <Text style={styles.sectionTitle}>Directorio</Text>
          {TARIJA_VENUES.map((v) => (
            <View key={v.id} testID={`venue-${v.id}`} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 10, marginBottom: 12 }]}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={[styles.pdfIcon, { backgroundColor: colors.brandPrimary }]}>
                  <MaterialCommunityIcons name="pine-tree" size={22} color={colors.onBrandPrimary} />
                </View>
                <View style={styles.pdfCopy}>
                  <Text style={styles.pdfTag}>{v.zone.toUpperCase()}</Text>
                  <Text style={styles.pdfTitle}>{v.name}</Text>
                  <Text style={styles.pdfDetail}>{v.address}</Text>
                  {v.contact ? <Text style={styles.pdfDetail}>Contacto: {v.contact}</Text> : null}
                </View>
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
                {v.features.map((f) => (
                  <View key={f} style={[styles.badge, { paddingVertical: 4 }]}><MaterialCommunityIcons name="check" size={11} color={colors.success} /><Text style={styles.badgeText}>{f}</Text></View>
                ))}
              </View>
              <View style={{ flexDirection: "row", gap: 8 }}>
                <Pressable testID={`venue-map-${v.id}`} onPress={() => openMap(v)} style={[styles.secondaryButton, { flex: 1, paddingHorizontal: 12 }]}>
                  <MaterialCommunityIcons name="map-marker-outline" size={16} color={colors.onBrandSecondary} />
                  <Text style={styles.secondaryButtonText}>Ver en mapa</Text>
                </Pressable>
                <Pressable testID={`venue-copy-${v.id}`} onPress={() => copyAddress(v)} style={[styles.chip, { flex: 1, height: 46, flexDirection: "row", gap: 6 }]}>
                  <MaterialCommunityIcons name="content-copy" size={14} color={colors.onSurfaceSecondary} />
                  <Text style={styles.chipText}>Copiar dirección</Text>
                </Pressable>
              </View>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Primeros auxilios básicos</Text>
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

          <Text style={styles.sectionTitle}>Tribu Tierra</Text>
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
