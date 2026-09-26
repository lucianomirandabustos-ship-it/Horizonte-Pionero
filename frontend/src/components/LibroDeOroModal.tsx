import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Image, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import { api, fileUrl, GalleryPost, uploadFile } from "@/src/api";

export function LibroDeOroModal({ visible, onClose, currentUser, colors, styles }: any) {
  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [uploadedPath, setUploadedPath] = useState<string | null>(null);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.gallery();
      setPosts(res.posts);
      const map: Record<string, string> = {};
      for (const p of res.posts) map[p.post_id] = await fileUrl(p.file_path);
      setUrls(map);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { if (visible) refresh(); }, [visible, refresh]);

  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (perm.status !== "granted") return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"] as any,
      quality: 0.75,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (result.canceled || !result.assets?.[0]) return;
    const asset = result.assets[0];
    setImageUri(asset.uri);
    setUploading(true);
    try {
      const name = asset.fileName || `photo-${Date.now()}.jpg`;
      const mime = asset.mimeType || "image/jpeg";
      const { path } = await uploadFile(asset.uri, name, mime, "gallery");
      setUploadedPath(path);
    } catch {
      setImageUri(null);
      setUploadedPath(null);
    } finally {
      setUploading(false);
    }
  };

  const publish = async () => {
    if (!uploadedPath || !caption.trim()) return;
    setUploading(true);
    try {
      await api.publishPost(caption.trim(), uploadedPath);
      setCaption("");
      setImageUri(null);
      setUploadedPath(null);
      await refresh();
    } finally {
      setUploading(false);
    }
  };

  const remove = async (post: GalleryPost) => {
    if (post.user_id !== currentUser?.user_id && currentUser?.role !== "dirigente") return;
    await api.deletePost(post.post_id).catch(() => undefined);
    await refresh();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>LIBRO Y RECUERDOS DE ORO</Text>
            <Text style={styles.pdfModalTitle}>Memoria de la unidad</Text>
          </View>
          <Pressable testID="libro-close" onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
          <Text style={styles.pageSubtitle}>Todas las patrullas ven y comparten. Sube fotos, escribe recuerdos.</Text>

          <View style={styles.profileCard}>
            <Text style={styles.resultLabel}>NUEVA PUBLICACIÓN</Text>
            <Pressable testID="libro-pick" onPress={pickImage} disabled={uploading} style={[styles.secondaryButton, { marginTop: 10 }, uploading && { opacity: 0.6 }]}>
              <MaterialCommunityIcons name="camera-plus-outline" size={18} color={colors.onBrandSecondary} />
              <Text style={styles.secondaryButtonText}>{imageUri ? "Cambiar foto" : "Elegir foto"}</Text>
            </Pressable>
            {imageUri && (
              <View style={{ marginTop: 12, borderRadius: 14, overflow: "hidden", height: 200, backgroundColor: colors.surfaceTertiary }}>
                <Image source={{ uri: imageUri }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              </View>
            )}
            <TextInput
              testID="libro-caption"
              value={caption}
              onChangeText={setCaption}
              placeholder="Escribe el recuerdo, patrulla, fecha…"
              placeholderTextColor={styles.placeholder.color}
              multiline
              style={[styles.input, styles.textArea, { marginTop: 12 }]}
            />
            <Pressable
              testID="libro-publish"
              disabled={!uploadedPath || !caption.trim() || uploading}
              onPress={publish}
              style={[styles.primaryButton, { marginTop: 12 }, (!uploadedPath || !caption.trim() || uploading) && { opacity: 0.5 }]}
            >
              {uploading ? <ActivityIndicator color={colors.onBrandPrimary} /> : <Text style={styles.primaryButtonText}>Publicar</Text>}
            </Pressable>
          </View>

          <Text style={styles.sectionTitle}>Feed ({posts.length})</Text>
          {loading && <ActivityIndicator color={colors.brandSecondary} />}
          {!loading && posts.length === 0 && (
            <View style={styles.placeholderCard}>
              <MaterialCommunityIcons name="image-multiple-outline" size={30} color={colors.brandSecondary} />
              <Text style={styles.placeholderText}>Aún no hay publicaciones. Sé el primero en compartir un recuerdo.</Text>
            </View>
          )}
          <View style={{ gap: 14 }}>
            {posts.map((p) => (
              <View key={p.post_id} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 10 }]} testID={`libro-post-${p.post_id}`}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View style={styles.pdfIcon}>
                    <MaterialCommunityIcons name="account-circle" size={24} color={colors.brandSecondary} />
                  </View>
                  <View style={styles.pdfCopy}>
                    <Text style={styles.pdfTag}>{p.user_patrol || "SIN PATRULLA"}</Text>
                    <Text style={styles.pdfTitle}>{p.user_name}</Text>
                  </View>
                  {(p.user_id === currentUser?.user_id || currentUser?.role === "dirigente") && (
                    <Pressable testID={`libro-remove-${p.post_id}`} onPress={() => remove(p)} style={styles.closeButton}>
                      <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.error} />
                    </Pressable>
                  )}
                </View>
                {urls[p.post_id] ? (
                  <Image source={{ uri: urls[p.post_id] }} style={{ width: "100%", height: 220, borderRadius: 14, backgroundColor: colors.surfaceTertiary }} resizeMode="cover" />
                ) : null}
                <Text style={styles.pdfDetail}>{p.caption}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default LibroDeOroModal;
