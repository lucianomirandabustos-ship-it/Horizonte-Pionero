import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { REFERENCE_TEXTS, ReferenceKey } from "@/src/data/references";

export function ReferenceModal({ kind, onClose, colors, styles }: { kind: ReferenceKey | null; onClose: () => void; colors: any; styles: any }) {
  const meta = kind ? REFERENCE_TEXTS[kind] : null;
  return (
    <Modal visible={!!meta} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>REFERENCIA ESENCIAL</Text>
            <Text style={styles.pdfModalTitle}>{meta?.title ?? ""}</Text>
          </View>
          <Pressable testID="reference-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }}>
          <View style={[styles.pdfIcon, { alignSelf: "flex-start", backgroundColor: colors.brandPrimary }]}>
            <MaterialCommunityIcons name={(meta?.icon as any) ?? "book"} size={22} color={colors.onBrandPrimary} />
          </View>
          <Text testID="reference-body" style={[styles.resultText, { marginTop: 14, fontSize: 15, lineHeight: 24, fontFamily: undefined }]}>{meta?.body ?? ""}</Text>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ReferenceModal;
