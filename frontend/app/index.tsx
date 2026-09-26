import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import { useEffect, useRef, useState, useMemo, createElement } from "react";
import Constants from "expo-constants";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

import { api, AppState, clearToken, saveToken, uploadFile, User, baseUrl } from "@/src/api";
import { makeStyles, useTheme } from "@/src/theme";
import { storage } from "@/src/utils/storage";
import ToolsModal from "@/src/components/ToolsModal";
import ProgresionModal, { EMPTY_PROGRESSION } from "@/src/components/ProgresionModal";
import AdminPanel from "@/src/components/AdminPanel";
import LibroDeOroModal from "@/src/components/LibroDeOroModal";
import ItinerarioModal from "@/src/components/ItinerarioModal";
import TarijaVenuesModal from "@/src/components/TarijaVenuesModal";
import CampingRegisterModal, { computeCampingTotals } from "@/src/components/CampingRegisterModal";
import { NotificationBanner, Toast, NOTIF_SEEN_KEY, pickUnseenDecisions } from "@/src/components/NotificationBanner";
import ReferenceModal from "@/src/components/ReferenceModal";
import TribuTierraModal from "@/src/components/TribuTierraModal";
import ServicioModal from "@/src/components/ServicioModal";
import OfflineSetupModal from "@/src/components/OfflineSetupModal";
import { ReferenceKey } from "@/src/data/references";
import { AGENDA_SECTIONS, AgendaSection, GrowthAreaDetail } from "@/src/data/agenda";
import {
  SpecialtiesHomeScreen,
  AreaDetailScreen,
} from "@/src/components/specialties";
import * as ImagePicker from "expo-image-picker";

WebBrowser.maybeCompleteAuthSession();

type Section = "inicio" | "patria" | "bitacora" | "mas";

import { patriaPointLabels as pointLabels } from "@/src/data/patria";

const emptyState: AppState = {
  progress: { Búsqueda: 30, Encuentro: 35, Desafío: 40 },
  completedProgress: { Búsqueda: 18, Encuentro: 11, Desafío: 5 },
  patria: Array(15).fill(false),
  specialties: ["Primeros Auxilios", "Campista", "Conservacionista", "Cocinero", "Fotógrafo", "Orientación", "Nudos", "Liderazgo", "Astronomía", "Ciclismo", "Comunicación", "Rescate", "Arte"],
  notes: [], projects: [], service: [],
  events: [{ id: "event-1", title: "Reunión de unidad", date: "Sábado · 09:00", place: "Sede de la unidad" }],
  announcements: [{ id: "news-1", title: "Bienvenidos a la Agenda del Pionero", body: "Registra tus avances, momentos y servicio en un solo lugar.", date: "Hoy" }],
  earthTribe: [],
};

const offlinePdfDocs: Record<"agenda" | "specialties", { path: string; label: string }> = {
  agenda: { path: "/api/docs/agenda", label: "Agenda del Pionero" },
  specialties: { path: "/api/docs/specialties", label: "Especialidades Scouts" },
};

function backendBaseUrl() {
  return baseUrl();
}

function sessionIdFromUrl(url?: string | null) {
  if (!url) return null;
  const match = url.match(/[?#&]session_id=([^&#]+)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export default function Index() {
  const { colors } = useTheme();
  const styles = useStyles();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState<User | null>(null);
  const [state, setState] = useState<AppState>(emptyState);
  const [booting, setBooting] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [googleBusy, setGoogleBusy] = useState(false);
  const [section, setSection] = useState<Section>("inicio");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [profileForm, setProfileForm] = useState({ name: "", patrol: "", blood_type: "", emergency_contact: "", emergency_phone: "", camping_nights: "0", allergies: "", medical_conditions: "", medical_insurance: "" });
  const [pdfViewer, setPdfViewer] = useState<"agenda" | "specialties" | null>(null);
  const [pdfUri, setPdfUri] = useState<string | null>(null);
  const [toolOpen, setToolOpen] = useState<null | "claves" | "campismo" | "cabuyeria">(null);
  const [progresionOpen, setProgresionOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<"inbox" | "dirigentes" | "fichas" | "events">("inbox");
  const [libroOpen, setLibroOpen] = useState(false);
  const [itinerarioOpen, setItinerarioOpen] = useState(false);
  const [tarijaOpen, setTarijaOpen] = useState(false);
  const [campingOpen, setCampingOpen] = useState(false);
  const [referenceOpen, setReferenceOpen] = useState<ReferenceKey | null>(null);
  const [tribuOpen, setTribuOpen] = useState(false);
  const [servicioOpen, setServicioOpen] = useState(false);
  const [notifSeen, setNotifSeen] = useState<string[]>([]);
  const [notifApprovals, setNotifApprovals] = useState<any[]>([]);
  const [toast, setToast] = useState<{ tone: "success" | "error"; message: string; key: number } | null>(null);
  // Auth: role + fields
  const [regRole, setRegRole] = useState<"pionero" | "dirigente">("pionero");
  const [regGroup, setRegGroup] = useState("");
  const [regPatrol, setRegPatrol] = useState("");
  const [regStage, setRegStage] = useState<"busqueda" | "encuentro" | "desafio">("busqueda");
  const [regCredentialCode, setRegCredentialCode] = useState("");
  const [regMasterKey, setRegMasterKey] = useState("");
  const [bootstrapAvailable, setBootstrapAvailable] = useState(false);
  const handledSessions = useRef(new Set<string>());

  const [offlineModalVisible, setOfflineModalVisible] = useState(false);
  const [savedOfflineUser, setSavedOfflineUser] = useState<User | null>(null);

  const refreshState = async (targetUser?: User | null) => {
    const active = targetUser !== undefined ? targetUser : user;
    if (!active) {
      setState(emptyState);
      return;
    }
    try {
      const cached = await storage.getItem<string | null>("pionero.state:" + active.user_id, null);
      if (cached) {
        setState(JSON.parse(cached));
      }
    } catch { /* ignore */ }

    if (active.user_id !== "offline_pionero") {
      try {
        const result = await api.getState();
        setState(result.state);
        await storage.setItem("pionero.state:" + active.user_id, JSON.stringify(result.state));
      } catch {
        // En caso de fallo de red o modo offline se conserva la caché local
      }
    }
  };

  const acceptSession = async (token: string, nextUser: User) => {
    await saveToken(token);
    await storage.setItem("pionero.app.mode", "online");
    setUser(nextUser);
    setProfileForm({ name: nextUser.name, patrol: String(nextUser.profile?.patrol ?? ""), blood_type: String(nextUser.profile?.blood_type ?? ""), emergency_contact: String(nextUser.profile?.emergency_contact ?? ""), emergency_phone: String(nextUser.profile?.emergency_phone ?? ""), camping_nights: String(nextUser.profile?.camping_nights ?? 0), allergies: String(nextUser.profile?.allergies ?? ""), medical_conditions: String(nextUser.profile?.medical_conditions ?? ""), medical_insurance: String(nextUser.profile?.medical_insurance ?? "") });
    await refreshState(nextUser);
  };

  const exchangeGoogleSession = async (url: string | null) => {
    const id = sessionIdFromUrl(url);
    if (!id || handledSessions.current.has(id)) return false;
    handledSessions.current.add(id);
    try {
      const result = await api.googleSession(id);
      await acceptSession(result.session_token, result.user);
      if (Platform.OS === "web") window.history.replaceState(window.history.state, "", window.location.pathname);
      return true;
    } catch (error) {
      handledSessions.current.delete(id);
      Alert.alert("No se pudo iniciar sesión", error instanceof Error ? error.message : "Intenta de nuevo.");
      return false;
    }
  };

  const enterOfflineMode = async (customUser?: User) => {
    const target = customUser || savedOfflineUser;
    if (!target) {
      setOfflineModalVisible(true);
      return;
    }
    await storage.setItem("pionero.app.mode", "offline");
    setUser(target);
    setProfileForm({
      name: target.name,
      patrol: String(target.profile?.patrol ?? ""),
      blood_type: String(target.profile?.blood_type ?? ""),
      emergency_contact: String(target.profile?.emergency_contact ?? ""),
      emergency_phone: String(target.profile?.emergency_phone ?? ""),
      camping_nights: String(target.profile?.camping_nights ?? 0),
      allergies: String(target.profile?.allergies ?? ""),
      medical_conditions: String(target.profile?.medical_conditions ?? ""),
      medical_insurance: String(target.profile?.medical_insurance ?? ""),
    });
    await refreshState(target);
  };

  const handleSaveOfflineProfile = async (data: { name: string; patrol: string; stage: "busqueda" | "encuentro" | "desafio"; group_number: string }) => {
    setOfflineModalVisible(false);
    const newUser: User = {
      user_id: "offline_pionero",
      email: "offline@horizontepionero.local",
      name: data.name,
      role: "pionero",
      verification_status: "offline",
      profile: {
        patrol: data.patrol,
        stage: data.stage,
        group_number: data.group_number,
        blood_type: "",
        emergency_contact: "",
        emergency_phone: "",
        camping_nights: 0,
        allergies: "",
        medical_conditions: "",
        medical_insurance: "",
      },
    };
    await storage.setItem("pionero.offline.user", JSON.stringify(newUser));
    setSavedOfflineUser(newUser);
    await enterOfflineMode(newUser);
  };

  // Auth boot intentionally runs once; the exchange function owns its duplicate guard.
  useEffect(() => {
    let mounted = true;
    const boot = async () => {
      try {
        // Cargar perfil offline previo si existe
        const savedOffline = await storage.getItem<string | null>("pionero.offline.user", null);
        if (savedOffline) {
          try {
            const parsedOffline = JSON.parse(savedOffline);
            if (mounted) setSavedOfflineUser(parsedOffline);
          } catch { /* ignore */ }
        }

        const lastMode = await storage.getItem<string | null>("pionero.app.mode", null);
        if (lastMode === "offline" && savedOffline) {
          try {
            const offlineUser: User = JSON.parse(savedOffline);
            if (mounted) {
              setUser(offlineUser);
              setProfileForm({
                name: offlineUser.name,
                patrol: String(offlineUser.profile?.patrol ?? ""),
                blood_type: String(offlineUser.profile?.blood_type ?? ""),
                emergency_contact: String(offlineUser.profile?.emergency_contact ?? ""),
                emergency_phone: String(offlineUser.profile?.emergency_phone ?? ""),
                camping_nights: String(offlineUser.profile?.camping_nights ?? 0),
                allergies: String(offlineUser.profile?.allergies ?? ""),
                medical_conditions: String(offlineUser.profile?.medical_conditions ?? ""),
                medical_insurance: String(offlineUser.profile?.medical_insurance ?? ""),
              });
              await refreshState(offlineUser);
              setBooting(false);
              return;
            }
          } catch { /* proceed to online check */ }
        }

        api.bootstrapStatus().then((r) => { if (mounted) setBootstrapAvailable(!!r.bootstrap_available); }).catch(() => undefined);
        const initialUrl = Platform.OS === "web" ? window.location.href : await Linking.getInitialURL();
        if (await exchangeGoogleSession(initialUrl)) return;
        const result = await api.me();
        if (mounted) {
          setUser(result.user);
          setProfileForm({ name: result.user.name, patrol: String(result.user.profile?.patrol ?? ""), blood_type: String(result.user.profile?.blood_type ?? ""), emergency_contact: String(result.user.profile?.emergency_contact ?? ""), emergency_phone: String(result.user.profile?.emergency_phone ?? ""), camping_nights: String(result.user.profile?.camping_nights ?? 0), allergies: String(result.user.profile?.allergies ?? ""), medical_conditions: String(result.user.profile?.medical_conditions ?? ""), medical_insurance: String(result.user.profile?.medical_insurance ?? "") });
          await refreshState(result.user);
        }
      } catch {
        await clearToken();
      } finally {
        if (mounted) setBooting(false);
      }
    };
    const listener = Platform.OS === "web" ? undefined : Linking.addEventListener("url", ({ url }) => { void exchangeGoogleSession(url); });
    void boot();
    return () => { mounted = false; listener?.remove(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitAuth = async () => {
    Keyboard.dismiss();
    if (!email.trim() || password.length < 6 || (authMode === "register" && !name.trim())) {
      Alert.alert("Completa tus datos", authMode === "register" ? "Escribe tu nombre, correo y una contraseña de 6 caracteres." : "Escribe un correo y una contraseña de 6 caracteres.");
      return;
    }
    setBusy(true);
    try {
      const result = authMode === "register"
        ? await api.register({
            email: email.trim(),
            password,
            name: name.trim(),
            role: regRole,
            group_number: regGroup.trim() || undefined,
            patrol: regRole === "pionero" ? (regPatrol.trim() || undefined) : undefined,
            stage: regRole === "pionero" ? regStage : undefined,
            credential_code: regRole === "dirigente" ? (regCredentialCode.trim() || undefined) : undefined,
            master_key: regRole === "dirigente" ? (regMasterKey.trim() || undefined) : undefined,
          })
        : await api.login({ email: email.trim(), password });
      await acceptSession(result.session_token, result.user);
    } catch (error) {
      Alert.alert("No se pudo continuar", error instanceof Error ? error.message : "Revisa tus datos.");
    } finally { setBusy(false); }
  };

  const signInGoogle = async () => {
    setGoogleBusy(true);
    try {
      const redirectUrl = Platform.OS === "web" ? `${window.location.origin}/` : Linking.createURL("");
      const authUrl = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
      if (Platform.OS === "web") { window.location.href = authUrl; return; }
      let captured: string | null = null;
      const subscription = Linking.addEventListener("url", ({ url }) => { captured = url; });
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);
      subscription.remove();
      await exchangeGoogleSession(result.type === "success" ? result.url : captured ?? await Linking.getInitialURL());
    } catch (error) {
      Alert.alert("Google no disponible", error instanceof Error ? error.message : "Intenta de nuevo.");
    } finally { setGoogleBusy(false); }
  };

  const updateState = (next: AppState) => {
    setState(next);
    if (user) {
      void storage.setItem("pionero.state:" + user.user_id, JSON.stringify(next)).catch(() => undefined);
      if (user.user_id !== "offline_pionero") {
        void api.putState(next).catch(() => undefined);
      }
    }
  };
  const progressPercent = Math.round((state.patria.filter(Boolean).length / 15) * 100);

  // Load seen notif ids from local storage on user change
  useEffect(() => {
    if (!user) return;
    storage.getItem<string>(NOTIF_SEEN_KEY + ":" + user.user_id, "[]").then((raw) => {
      try { setNotifSeen(JSON.parse(raw ?? "[]")); } catch { setNotifSeen([]); }
    });
  }, [user]);

  // Poll approvals for pionero (own decisions)
  useEffect(() => {
    if (!user || user.role !== "pionero" || user.user_id === "offline_pionero") return;
    let cancelled = false;
    const tick = async () => {
      try {
        const res = await api.myApprovals();
        if (cancelled) return;
        setNotifApprovals(res.approvals);
      } catch { /* ignore */ }
    };
    tick();
    const t = setInterval(tick, 15000);
    return () => { cancelled = true; clearInterval(t); };
  }, [user]);

  const unseenNotifs = pickUnseenDecisions(notifApprovals, new Set(notifSeen));
  const prevUnseenCount = useRef(0);
  useEffect(() => {
    if (unseenNotifs.length > prevUnseenCount.current && unseenNotifs.length > 0) {
      const head = unseenNotifs[0];
      setToast({ tone: head.status === "aprobado" ? "success" : "error", message: head.status === "aprobado" ? "¡Aprobado por tu dirigente!" : "Solicitud rechazada con observaciones", key: Date.now() });
    }
    prevUnseenCount.current = unseenNotifs.length;
  }, [unseenNotifs.length]);

  const dismissNotif = async (approvalId: string) => {
    if (!user) return;
    const nextSeen = Array.from(new Set([...notifSeen, approvalId]));
    setNotifSeen(nextSeen);
    await storage.setItem(NOTIF_SEEN_KEY + ":" + user.user_id, JSON.stringify(nextSeen));
  };
  const dismissAllNotifs = async () => {
    if (!user) return;
    const ids = unseenNotifs.map((a) => a.approval_id);
    const nextSeen = Array.from(new Set([...notifSeen, ...ids]));
    setNotifSeen(nextSeen);
    await storage.setItem(NOTIF_SEEN_KEY + ":" + user.user_id, JSON.stringify(nextSeen));
  };
  const totalHours = state.projects.reduce((sum, item) => sum + item.hours, 0);
  const serviceHours = state.service.reduce((sum, item) => sum + item.hours, 0);
  const togglePoint = (index: number) => { const patria = [...state.patria]; patria[index] = !patria[index]; updateState({ ...state, patria }); };
  const saveNote = () => {
    if (!noteTitle.trim() || !noteBody.trim()) { Alert.alert("Tu nota necesita un título y una reflexión."); return; }
    updateState({ ...state, notes: [{ id: `note-${Date.now()}`, title: noteTitle.trim(), body: noteBody.trim(), date: "Ahora" }, ...state.notes] });
    setNoteTitle(""); setNoteBody("");
  };
  const saveProfile = async () => {
    const updatedProfile = { ...profileForm, camping_nights: Number(profileForm.camping_nights) || 0 };
    if (user?.user_id === "offline_pionero") {
      const updatedUser: User = {
        ...user,
        name: profileForm.name || user.name,
        profile: updatedProfile,
      };
      setUser(updatedUser);
      await storage.setItem("pionero.offline.user", JSON.stringify(updatedUser));
      Alert.alert("Ficha guardada", "Tus datos se guardaron en la memoria de este teléfono.");
      return;
    }
    try {
      const result = await api.updateProfile(updatedProfile);
      setUser(result.user);
      Alert.alert("Ficha guardada", "Tus datos personales quedaron sincronizados.");
    } catch (error) {
      Alert.alert("No se pudo guardar", error instanceof Error ? error.message : "Intenta de nuevo.");
    }
  };
  const openPdf = async (kind: "agenda" | "specialties") => {
    try {
      const doc = offlinePdfDocs[kind];
      const url = `${backendBaseUrl()}${doc.path}`;
      setPdfViewer(kind);
      setPdfUri(url);
    } catch {
      Alert.alert("Documento no disponible", "El archivo no pudo abrirse en este dispositivo.");
    }
  };
  const logout = async () => {
    if (user?.user_id === "offline_pionero") {
      await storage.setItem("pionero.app.mode", "online");
      setUser(null);
      return;
    }
    try { await api.logout(); } catch { /* local cleanup still matters */ }
    await clearToken();
    await storage.setItem("pionero.app.mode", "online");
    setUser(null);
  };

  if (booting) return <View style={styles.loading}><ActivityIndicator color={colors.brandSecondary} size="large" /><Text style={styles.loadingText}>Preparando tu agenda…</Text></View>;
  if (!user) return (
    <>
      <AuthScreen
        colors={colors}
        styles={styles}
        authMode={authMode}
        setAuthMode={setAuthMode}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        name={name}
        setName={setName}
        busy={busy}
        googleBusy={googleBusy}
        onSubmit={submitAuth}
        onGoogle={signInGoogle}
        regRole={regRole}
        setRegRole={setRegRole}
        regGroup={regGroup}
        setRegGroup={setRegGroup}
        regPatrol={regPatrol}
        setRegPatrol={setRegPatrol}
        regStage={regStage}
        setRegStage={setRegStage}
        regCredentialCode={regCredentialCode}
        setRegCredentialCode={setRegCredentialCode}
        regMasterKey={regMasterKey}
        setRegMasterKey={setRegMasterKey}
        bootstrapAvailable={bootstrapAvailable}
        onEnterOffline={() => enterOfflineMode()}
        onNewOfflineProfile={() => setOfflineModalVisible(true)}
        savedOfflineUser={savedOfflineUser}
      />
      <OfflineSetupModal
        visible={offlineModalVisible}
        onClose={() => setOfflineModalVisible(false)}
        onSave={handleSaveOfflineProfile}
      />
    </>
  );

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={[styles.scroll, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 34 }]} keyboardShouldPersistTaps="handled">
        {user.user_id === "offline_pionero" && (
          <View style={[styles.jefaturaBanner, { backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.brandSecondary }]} testID="offline-banner">
            <MaterialCommunityIcons name="cloud-off-outline" size={16} color={colors.brandSecondary} />
            <Text style={[styles.jefaturaBannerText, { color: colors.onSurfaceSecondary }]}>MODO AUTÓNOMO · 100% OFFLINE</Text>
            <View style={[styles.jefaturaStatusPill, { backgroundColor: colors.surfaceTertiary }]}>
              <Text style={[styles.jefaturaStatusText, { color: colors.brandSecondary }]}>GUARDADO LOCAL</Text>
            </View>
          </View>
        )}
        {user.role === "dirigente" && (
          <View style={styles.jefaturaBanner} testID="jefatura-banner">
            <MaterialCommunityIcons name="shield-crown-outline" size={16} color={colors.onBrandSecondary} />
            <Text style={styles.jefaturaBannerText}>MODO JEFATURA · DIRIGENTE</Text>
            <View style={[styles.jefaturaStatusPill, { backgroundColor: user.verification_status === "verificado" ? colors.success : colors.brandPrimary }]}>
              <Text style={styles.jefaturaStatusText}>{user.verification_status === "verificado" ? "VERIFICADO" : "PENDIENTE DE AUTORIZACIÓN"}</Text>
            </View>
          </View>
        )}
        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>{user.role === "dirigente" ? "PANEL DE JEFATURA" : "AGENDA DEL PIONERO"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 }}>
              <Text style={styles.greeting}>Hola, {user.name.split(" ")[0]} <Text style={styles.wave}>{user.role === "dirigente" ? "★" : "✦"}</Text></Text>
              {user.role === "dirigente" && (
                <View style={styles.roleBadge} testID="role-badge">
                  <MaterialCommunityIcons name="shield-star" size={11} color={colors.onBrandSecondary} />
                  <Text style={styles.roleBadgeText}>DIRIGENTE</Text>
                </View>
              )}
              {user.user_id === "offline_pionero" && (
                <View style={[styles.roleBadge, { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.brandSecondary }]}>
                  <MaterialCommunityIcons name="flash" size={11} color={colors.brandSecondary} />
                  <Text style={[styles.roleBadgeText, { color: colors.brandSecondary }]}>AUTÓNOMO</Text>
                </View>
              )}
            </View>
          </View>
          <Pressable style={[styles.avatar, user.role === "dirigente" && styles.avatarDirigente]} onPress={() => setSection("mas")} accessibilityRole="button">
            <Text style={styles.avatarText}>{user.name.slice(0, 1).toUpperCase()}</Text>
          </Pressable>
        </View>
        <View style={styles.navRow}>{(["inicio", "patria", "bitacora", "mas"] as Section[]).map((item) => <Pressable testID={`nav-${item}`} key={item} onPress={() => setSection(item)} style={[styles.navItem, section === item && styles.navItemActive]}><Text style={[styles.navText, section === item && styles.navTextActive]}>{item === "inicio" ? "Inicio" : item === "patria" ? "Scout" : item === "bitacora" ? "Bitácora" : "Más"}</Text></Pressable>)}</View>
        {user.role === "pionero" && unseenNotifs.length > 0 && (
          <NotificationBanner items={unseenNotifs} onDismiss={dismissNotif} onOpen={(row: any) => { void dismissAllNotifs(); if (row.kind === "patria") setSection("patria"); else if (row.kind === "progression") setProgresionOpen(true); else setSection("mas"); }} colors={colors} styles={styles} />
        )}
        {section === "inicio" && <HomeScreen styles={styles} colors={colors} state={state} progressPercent={progressPercent} setSection={setSection} user={user} openPdf={openPdf} openProgresion={() => setProgresionOpen(true)} openTool={setToolOpen} openLibro={() => setLibroOpen(true)} openItinerario={() => setItinerarioOpen(true)} openAdmin={() => { setAdminTab("inbox"); setAdminOpen(true); }} openFichasDirectory={() => { setAdminTab("fichas"); setAdminOpen(true); }} openTarija={() => setTarijaOpen(true)} openReference={(k: ReferenceKey) => setReferenceOpen(k)} openTribu={() => setTribuOpen(true)} />}
        {section === "patria" && <PatriaScreen styles={styles} colors={colors} state={state} progressPercent={progressPercent} togglePoint={togglePoint} user={user} requestApproval={async (idx: number) => {
          if (user?.user_id === "offline_pionero") {
            togglePoint(idx);
            return;
          }
          try { await api.requestApproval({ kind: "patria", ref_id: String(idx), text: pointLabels[idx] }); await refreshState(); } catch { /* ignore */ }
        }} />}
        {section === "bitacora" && <BitacoraScreen styles={styles} colors={colors} state={state} noteTitle={noteTitle} noteBody={noteBody} setNoteTitle={setNoteTitle} setNoteBody={setNoteBody} saveNote={saveNote} totalHours={totalHours} serviceHours={serviceHours} openLibro={() => setLibroOpen(true)} openServicio={() => setServicioOpen(true)} />}
        {section === "mas" && <MoreScreen styles={styles} colors={colors} user={user} state={state} profileForm={profileForm} setProfileForm={setProfileForm} saveProfile={saveProfile} logout={logout} openTool={setToolOpen} openCamping={() => setCampingOpen(true)} openTarija={() => setTarijaOpen(true)} refreshUser={async () => { try { const r = await api.me(); setUser(r.user); } catch { /* ignore */ } }} />}
      </ScrollView>
      <PdfModal kind={pdfViewer} uri={pdfUri} colors={colors} styles={styles} onClose={() => setPdfViewer(null)} />
      <ToolsModal kind={toolOpen} onClose={() => setToolOpen(null)} colors={colors} styles={styles} />
      <ProgresionModal
        visible={progresionOpen}
        onClose={() => setProgresionOpen(false)}
        progression={state.progression ?? EMPTY_PROGRESSION}
        onChange={(next: any) => updateState({ ...state, progression: next })}
        colors={colors}
        styles={styles}
        onRequest={async (obj: any) => {
          if (user?.user_id === "offline_pionero") {
            Alert.alert("Objetivo registrado", "Marcado en tu progresión personal local.");
            return;
          }
          try { await api.requestApproval({ kind: "progression", ref_id: obj.id, stage: obj.stage, text: obj.text }); await refreshState(); } catch { /* ignore */ }
        }}
      />
      <AdminPanel visible={adminOpen} onClose={() => setAdminOpen(false)} user={user} colors={colors} styles={styles} onDataChange={refreshState} initialTab={adminTab} />
      <LibroDeOroModal visible={libroOpen} onClose={() => setLibroOpen(false)} currentUser={user} colors={colors} styles={styles} />
      <ItinerarioModal visible={itinerarioOpen} onClose={() => setItinerarioOpen(false)} currentUser={user} colors={colors} styles={styles} />
      <TarijaVenuesModal visible={tarijaOpen} onClose={() => setTarijaOpen(false)} colors={colors} styles={styles} />
      <CampingRegisterModal
        visible={campingOpen}
        onClose={() => setCampingOpen(false)}
        colors={colors}
        styles={styles}
        onSubmit={async (payload: any) => {
          if (user?.user_id === "offline_pionero") {
            const nextEntries = [...(state.camping_log ?? state.camping ?? []), {
              id: `camp_${Date.now()}`,
              place: payload.place,
              date: payload.date || payload.start_date || "Campamento",
              start_date: payload.start_date,
              end_date: payload.end_date,
              nights: payload.nights,
              status: "aprobado",
              created_at: new Date().toISOString(),
            }];
            updateState({ ...state, camping: nextEntries, camping_log: nextEntries });
            Alert.alert("Campamento registrado", "Se sumó a tus noches de campamento en este celular.");
            return;
          }
          const id = `camp_${Date.now()}`;
          try {
            await api.requestApproval({
              kind: "camping",
              ref_id: id,
              place: payload.place,
              date: payload.date,
              start_date: payload.start_date,
              end_date: payload.end_date,
              nights: payload.nights,
              text: `${payload.place} · ${payload.nights} días (${payload.date})`,
            });
          } catch {
            /* ignore */
          }
          await refreshState();
        }}
      />
      <Toast visible={!!toast} message={toast?.message ?? ""} tone={toast?.tone ?? "success"} colors={colors} />
      <ReferenceModal kind={referenceOpen} onClose={() => setReferenceOpen(null)} colors={colors} styles={styles} />
      <TribuTierraModal
        visible={tribuOpen}
        onClose={() => setTribuOpen(false)}
        state={state}
        updateState={updateState}
        colors={colors}
        styles={styles}
        onRequest={async (payload: any) => {
          try { await api.requestApproval({ kind: "tribu", ref_id: payload.id, text: payload.name }); } catch { /* ignore */ }
          await refreshState();
        }}
      />
      <ServicioModal
        visible={servicioOpen}
        onClose={() => setServicioOpen(false)}
        state={state}
        colors={colors}
        styles={styles}
        onSubmit={async (payload: any) => {
          const id = `svc_${Date.now()}`;
          if (user?.user_id === "offline_pionero") {
            const nextService = [...state.service, {
              id,
              title: payload.title,
              hours: Number(payload.hours) || 0,
              date: payload.date || "Hoy",
              note: payload.note || "",
            }];
            updateState({ ...state, service: nextService });
            Alert.alert("Servicio registrado", "Se sumaron las horas voluntarias a tu bitácora.");
            return;
          }
          try { await api.requestApproval({ kind: "service", ref_id: id, text: payload.title, nights: payload.hours, date: payload.date, note: payload.note }); } catch { /* ignore */ }
          await refreshState();
        }}
      />
    </KeyboardAvoidingView>
  );
}

function AuthScreen({
  colors,
  styles,
  authMode,
  setAuthMode,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  busy,
  googleBusy,
  onSubmit,
  onGoogle,
  regRole,
  setRegRole,
  regGroup,
  setRegGroup,
  regPatrol,
  setRegPatrol,
  regStage,
  setRegStage,
  regCredentialCode,
  setRegCredentialCode,
  regMasterKey,
  setRegMasterKey,
  bootstrapAvailable,
  onEnterOffline,
  onNewOfflineProfile,
  savedOfflineUser,
}: any) {
  return (
    <KeyboardAvoidingView style={styles.authRoot} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.authContent} keyboardShouldPersistTaps="handled">
        <View style={styles.brandMark}><MaterialCommunityIcons name="compass-rose" size={34} color={colors.onBrandPrimary} /></View>
        <Text style={styles.authKicker}>HORIZONTE PIONERO · AGENDA DIGITAL</Text>
        <Text style={styles.authTitle}>Tu ruta, tus huellas.</Text>
        <Text style={styles.authSubtitle}>Una agenda viva para crecer, servir y recordar cada aventura.</Text>

        {/* TARJETA DESTACADA: MODO PIONERO AUTÓNOMO */}
        <View style={[styles.profileCard, { marginTop: 22, padding: 16, borderWidth: 2, borderColor: colors.brandSecondary, gap: 10, backgroundColor: colors.surfaceSecondary }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={[styles.pdfIcon, { backgroundColor: colors.brandSecondary, width: 44, height: 44, borderRadius: 14 }]}>
              <MaterialCommunityIcons name="compass-outline" size={24} color={colors.onBrandSecondary} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <View style={{ backgroundColor: colors.surfaceTertiary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 }}>
                  <Text style={[styles.pdfTag, { fontSize: 9, color: colors.brandSecondary }]}>100% AUTÓNOMO</Text>
                </View>
                <Text style={{ fontSize: 11, color: colors.success, fontWeight: "800" }}>SIN SERVIDOR</Text>
              </View>
              <Text style={[styles.pdfTitle, { fontSize: 16, marginTop: 2 }]}>
                {savedOfflineUser ? `Continuar como ${savedOfflineUser.name.split(" ")[0]}` : "Entrar en Modo Pionero"}
              </Text>
            </View>
          </View>

          <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 18 }}>
            {savedOfflineUser
              ? `Patrulla ${savedOfflineUser.profile?.patrol || "Pioneros"} · Tu progreso y especialidades están guardados en este celular.`
              : "Ideal para campamentos o sin conexión. Tus 65 especialidades, claves, cabuyería y avances se guardan directamente en este teléfono."}
          </Text>

          <Pressable
            testID="btn-enter-offline"
            onPress={onEnterOffline}
            style={({ pressed }) => [
              styles.primaryButton,
              { backgroundColor: colors.brandSecondary, marginTop: 2, minHeight: 46 },
              pressed && styles.pressed,
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <MaterialCommunityIcons name="flash" size={18} color={colors.onBrandSecondary} />
              <Text style={[styles.primaryButtonText, { color: colors.onBrandSecondary, fontSize: 14 }]}>
                {savedOfflineUser ? "Abrir mi agenda offline" : "Crear perfil pionero local"}
              </Text>
            </View>
          </Pressable>

          {savedOfflineUser && (
            <Pressable onPress={onNewOfflineProfile} style={{ alignSelf: "center", paddingTop: 2 }}>
              <Text style={{ fontSize: 11, color: colors.brandSecondary, fontWeight: "700" }}>
                + Crear o cambiar de pionero local
              </Text>
            </Pressable>
          )}
        </View>

        <View style={styles.orRow}>
          <View style={styles.orLine} />
          <Text style={styles.orText}>o sincroniza con jefatura en la nube</Text>
          <View style={styles.orLine} />
        </View>

        <View style={styles.authCard}>
          {authMode === "register" && (
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>Soy…</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Pressable testID="role-pionero" onPress={() => setRegRole("pionero")} style={[styles.chip, regRole === "pionero" && styles.chipActive, { flex: 1 }]}>
                  <Text style={[styles.chipText, regRole === "pionero" && styles.chipTextActive]}>Beneficiario (Pionero)</Text>
                </Pressable>
                <Pressable testID="role-dirigente" onPress={() => setRegRole("dirigente")} style={[styles.chip, regRole === "dirigente" && styles.chipActive, { flex: 1 }]}>
                  <Text style={[styles.chipText, regRole === "dirigente" && styles.chipTextActive]}>Dirigente / Guía</Text>
                </Pressable>
              </View>
            </View>
          )}
          {authMode === "register" && <Field testID="auth-name" label="Nombre completo" value={name} onChangeText={setName} placeholder="María Pionera" styles={styles} />}
          <Field testID="auth-email" label="Correo electrónico" value={email} onChangeText={setEmail} placeholder="tu@correo.com" keyboardType="email-address" styles={styles} />
          <Field testID="auth-password" label="Contraseña" value={password} onChangeText={setPassword} placeholder="Mínimo 6 caracteres" secureTextEntry styles={styles} />
          {authMode === "register" && (
            <>
              <Field testID="auth-group" label="Grupo scout" value={regGroup} onChangeText={setRegGroup} placeholder="Ej: Grupo 110" styles={styles} />
              {regRole === "pionero" && (
                <>
                  <Field testID="auth-patrol" label="Patrulla / Equipo" value={regPatrol} onChangeText={setRegPatrol} placeholder="Ej: Águilas" styles={styles} />
                  <View style={styles.field}>
                    <Text style={styles.fieldLabel}>Etapa actual</Text>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      {(["busqueda", "encuentro", "desafio"] as const).map((s) => (
                        <Pressable key={s} testID={`stage-pick-${s}`} onPress={() => setRegStage(s)} style={[styles.chip, regStage === s && styles.chipActive, { flex: 1 }]}>
                          <Text style={[styles.chipText, regStage === s && styles.chipTextActive]}>{s[0].toUpperCase() + s.slice(1)}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </>
              )}
              {regRole === "dirigente" && (
                <>
                  <Field testID="auth-credential" label="Código de credencial" value={regCredentialCode} onChangeText={setRegCredentialCode} placeholder="Ej: DIR-2024-007" styles={styles} />
                  <View style={[styles.medicalNotice, { backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.brandSecondary, marginBottom: 14 }]} testID="dirigente-pending-notice">
                    <MaterialCommunityIcons name="shield-account-outline" size={20} color={colors.brandSecondary} />
                    <Text style={[styles.medicalNoticeText, { color: colors.brandSecondary }]}>Tu cuenta quedará “Pendiente de autorización”. Un Dirigente ya verificado debe habilitarla desde el Panel de Jefatura antes de que puedas aprobar solicitudes.</Text>
                  </View>
                  {bootstrapAvailable && (
                    <Field testID="auth-master" label="Clave maestra (solo primer dirigente)" value={regMasterKey} onChangeText={setRegMasterKey} placeholder="Solo válida hasta que exista un dirigente autorizado" styles={styles} />
                  )}
                </>
              )}
            </>
          )}
          <Pressable testID="auth-submit" onPress={onSubmit} disabled={busy} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed, busy && styles.disabled]}>
            <Text style={styles.primaryButtonText}>{busy ? "Guardando…" : authMode === "login" ? "Entrar a mi agenda" : "Crear mi agenda"}</Text>
          </Pressable>
          <View style={styles.orRow}><View style={styles.orLine} /><Text style={styles.orText}>o continúa con</Text><View style={styles.orLine} /></View>
          <Pressable testID="auth-google" onPress={onGoogle} disabled={googleBusy} style={({ pressed }) => [styles.googleButton, pressed && styles.pressed]}>
            <MaterialCommunityIcons name="google" size={19} color={colors.onSurfaceSecondary} />
            <Text style={styles.googleText}>{googleBusy ? "Conectando…" : "Google"}</Text>
          </Pressable>
        </View>
        <Pressable testID="auth-switch" onPress={() => setAuthMode(authMode === "login" ? "register" : "login")}>
          <Text style={styles.switchText}>
            {authMode === "login" ? "¿Primera vez aquí? " : "¿Ya tienes cuenta? "}
            <Text style={styles.switchStrong}>{authMode === "login" ? "Crea tu perfil" : "Inicia sesión"}</Text>
          </Text>
        </Pressable>
        <Text style={styles.authFooter}>Tus datos de progreso y salud quedan protegidos.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, styles, ...props }: any) { return <View style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><TextInput {...props} style={styles.input} placeholderTextColor={styles.placeholder.color} autoCapitalize="none" /></View>; }

function HomeScreen({ styles, colors, state, progressPercent, setSection, user, openPdf, openProgresion, openTool, openLibro, openItinerario, openAdmin, openFichasDirectory, openTarija, openReference, openTribu }: any) {
  const isDirigente = user?.role === "dirigente" && user?.verification_status === "verificado";
  const isDirigentePending = user?.role === "dirigente" && user?.verification_status === "en_revision";
  return <View><View style={styles.heroCard}><View style={styles.heroCopy}><Text style={styles.heroOverline}>{isDirigente ? "PANEL DE JEFATURA" : "SCOUT DE LA PATRIA"}</Text><Text style={styles.heroTitle}>{isDirigente ? "Acompañas la ruta de tu unidad." : "Tu próxima gran huella empieza hoy."}</Text><Text style={styles.heroBody}>{isDirigente ? "Revisa aprobaciones y publica el itinerario." : `${progressPercent}% del camino verificado`}</Text><Pressable testID="hero-cta" style={styles.heroButton} onPress={() => (isDirigente ? openAdmin() : setSection("patria"))}><Text style={styles.heroButtonText}>{isDirigente ? "Abrir bandeja" : "Ver mi checklist"}</Text><MaterialCommunityIcons name="arrow-right" size={18} color={colors.onBrandSecondary} /></Pressable></View><View style={styles.progressRing}><Text style={styles.ringValue}>{isDirigente ? "★" : `${progressPercent}%`}</Text><Text style={styles.ringCaption}>{isDirigente ? "Dirigente" : "listo"}</Text></View></View>{isDirigentePending && <View style={[styles.medicalNotice, { backgroundColor: colors.surfaceTertiary }]}><MaterialCommunityIcons name="clock-outline" size={20} color={colors.brandSecondary} /><Text style={[styles.medicalNoticeText, { color: colors.brandSecondary }]}>Cuenta en revisión. Un dirigente verificado debe aprobar tu perfil.</Text></View>}<Text style={styles.sectionTitle}>Tu brújula de hoy</Text><View style={styles.quickGrid}><QuickCard testID="quick-patria" icon="flag-variant-outline" label="Scout de la Patria" detail={`${state.patria.filter(Boolean).length}/15 puntos`} onPress={() => setSection("patria")} colors={colors} styles={styles} /><QuickCard testID="quick-progresion" icon="stairs-up" label="Progresión Personal" detail={`${((state.progression?.busqueda?.length||0) + (state.progression?.encuentro?.length||0) + (state.progression?.desafio?.length||0))} objetivos`} onPress={openProgresion} colors={colors} styles={styles} /><QuickCard testID="quick-claves" icon="alphabetical-variant" label="Claves Scout" detail="14 códigos" onPress={() => openTool("claves")} colors={colors} styles={styles} /><QuickCard testID="quick-cabuyeria" icon="transit-connection-variant" label="Cabuyería" detail="13 guías" onPress={() => openTool("cabuyeria")} colors={colors} styles={styles} /><QuickCard testID="quick-libro" icon="image-multiple" label="Libro de Oro" detail="Recuerdos de unidad" onPress={openLibro} colors={colors} styles={styles} /><QuickCard testID="quick-itinerario" icon="calendar-month-outline" label="Itinerario" detail="Actividades y equipo" onPress={openItinerario} colors={colors} styles={styles} /><QuickCard testID="quick-tarija" icon="pine-tree" label="Sedes Tarija" detail="Directorio + auxilios" onPress={openTarija} colors={colors} styles={styles} /><QuickCard testID="quick-tribu" icon="earth" label="Tribu Tierra" detail="3 programas ambientales" onPress={openTribu} colors={colors} styles={styles} />{isDirigente && <QuickCard testID="quick-admin" icon="shield-crown-outline" label="Panel de Jefatura" detail="Aprobaciones online" onPress={openAdmin} colors={colors} styles={styles} />}<QuickCard testID="quick-ficha" icon="medical-bag" label={isDirigente ? "Fichas médicas" : "Ficha médica"} detail={isDirigente ? "Directorio de pioneros" : String(user.profile?.blood_type ?? "Por registrar")} onPress={() => (isDirigente ? openFichasDirectory() : setSection("mas"))} colors={colors} styles={styles} /><QuickCard testID="quick-campismo" icon="campfire" label="Campismo" detail="Fuegos y refugios" onPress={() => openTool("campismo")} colors={colors} styles={styles} /></View><Text style={styles.sectionTitle}>Recursos offline</Text><View style={styles.pdfGrid}><PdfCard testID="home-pdf-agenda" icon="book-open-variant" title="Agenda del Pionero" detail="64 páginas · progreso y objetivos" onPress={() => openPdf("agenda")} colors={colors} styles={styles} /><PdfCard testID="home-pdf-specialties" icon="certificate-outline" title="Especialidades Scouts" detail="69 páginas · 6 áreas oficiales" onPress={() => openPdf("specialties")} colors={colors} styles={styles} /></View><Text style={styles.sectionTitle}>Referencias esenciales</Text><View style={styles.referenceCard}><Reference testID="ref-promesa" icon="shield-star-outline" title="La Promesa" text="Toca para leer el texto completo" onPress={() => openReference("promesa")} styles={styles} /><Reference testID="ref-ley" icon="compass-outline" title="La Ley Scout" text="Los 10 principios de la ruta" onPress={() => openReference("ley")} styles={styles} /><Reference testID="ref-oracion" icon="hands-pray" title="Oración del Pionero" text="Oración tradicional pionera" onPress={() => openReference("oracion")} styles={styles} /></View><View style={styles.quoteCard}><MaterialCommunityIcons name="format-quote-open" size={28} color={colors.brandSecondary} /><Text style={styles.quoteText}>“Deja el mundo un poco mejor de como lo encontraste.”</Text><Text style={styles.quoteCaption}>— Baden-Powell</Text></View></View>;
}

function QuickCard({ testID, icon, label, detail, onPress, colors, styles }: any) { return <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [styles.quickCard, pressed && styles.cardPressed]}><View style={styles.iconBubble}><MaterialCommunityIcons name={icon} size={22} color={colors.brandSecondary} /></View><Text style={styles.quickLabel}>{label}</Text><Text style={styles.quickDetail}>{detail}</Text></Pressable>; }
function PdfCard({ testID, icon, title, detail, onPress, colors, styles }: any) { return <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [styles.pdfCard, pressed && styles.cardPressed]}><View style={styles.pdfIcon}><MaterialCommunityIcons name={icon} size={23} color={colors.brandSecondary} /></View><View style={styles.pdfCopy}><Text style={styles.pdfTag}>DISPONIBLE SIN CONEXIÓN</Text><Text style={styles.pdfTitle}>{title}</Text><Text style={styles.pdfDetail}>{detail}</Text></View><MaterialCommunityIcons name="arrow-top-right" size={18} color={colors.brandSecondary} /></Pressable>; }
function Reference({ testID, icon, title, text, styles, onPress }: any) { return <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [styles.referenceRow, pressed && styles.cardPressed]}><MaterialCommunityIcons name={icon} size={23} color={styles.eyebrow.color} /><View style={styles.referenceCopy}><Text style={styles.referenceTitle}>{title}</Text><Text style={styles.referenceText}>{text}</Text></View><MaterialCommunityIcons name="chevron-right" size={18} color={styles.quickDetail.color} /></Pressable>; }

function SpecialtiesGuideView({ colors, styles }: any = {}) {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);

  if (selectedAreaId) {
    return (
      <AreaDetailScreen
        areaId={selectedAreaId}
        onBack={() => setSelectedAreaId(null)}
      />
    );
  }

  return (
    <SpecialtiesHomeScreen
      onSelectArea={(areaId) => setSelectedAreaId(areaId)}
    />
  );
}


function AgendaGuideView({ colors, styles }: any) {
  const [selectedSection, setSelectedSection] = useState<string>("all");
  const [activeStageTab, setActiveStageTab] = useState<number>(0); // 0: Busqueda, 1: Encuentro, 2: Desafio

  const stageNames: ("Búsqueda (30)" | "Encuentro (35)" | "Desafío (40)")[] = [
    "Búsqueda (30)",
    "Encuentro (35)",
    "Desafío (40)",
  ];

  const displayedSections = useMemo(() => {
    if (selectedSection === "all") return AGENDA_SECTIONS;
    return AGENDA_SECTIONS.filter((s: AgendaSection) => s.id === selectedSection);
  }, [selectedSection]);

  return (
    <View style={{ gap: 14 }}>
      <Text style={styles.pageSubtitle}>
        Contenido pedagógico oficial de la Agenda del Pionero (ASB). Mística, objetivos de formación por áreas, vida de patrulla y la máxima distinción.
      </Text>

      {/* Navegación por secciones */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 4 }}>
        <Pressable
          onPress={() => setSelectedSection("all")}
          style={[styles.chip, selectedSection === "all" && styles.chipActive]}
        >
          <Text style={[styles.chipText, selectedSection === "all" && styles.chipTextActive]}>
            Todas las Secciones
          </Text>
        </Pressable>
        {AGENDA_SECTIONS.map((sec: AgendaSection) => {
          const isSelected = selectedSection === sec.id;
          return (
            <Pressable
              key={sec.id}
              onPress={() => setSelectedSection(sec.id)}
              style={[styles.chip, isSelected && styles.chipActive]}
            >
              <MaterialCommunityIcons name={sec.icon as any} size={13} color={isSelected ? colors.onBrandPrimary : colors.onSurfaceSecondary} />
              <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
                {"  " + sec.title.split(" ")[0]}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Secciones de la Agenda */}
      {displayedSections.map((sec: AgendaSection) => (
        <View key={sec.id} style={[styles.profileCard, { gap: 12 }]}>
          {/* Cabecera de la sección */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={[styles.pdfIcon, { backgroundColor: colors.brandPrimary }]}>
              <MaterialCommunityIcons name={sec.icon as any} size={24} color={colors.onBrandPrimary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.pdfTitle, { fontSize: 16 }]}>{sec.title}</Text>
              <Text style={[styles.pdfDetail, { fontSize: 12 }]}>{sec.subtitle}</Text>
            </View>
          </View>

          {/* Contenido narrativo */}
          {sec.content.map((p: string, i: number) => (
            <Text key={i} style={[styles.noteBody, { fontSize: 13, lineHeight: 20, color: colors.onSurfaceSecondary }]}>
              {p}
            </Text>
          ))}

          {/* Áreas de Crecimiento con TODOS sus Objetivos Educativos */}
          {sec.growthAreas && (
            <View style={{ marginTop: 6, gap: 12 }}>
              <View style={{ backgroundColor: colors.surfaceTertiary, padding: 12, borderRadius: 12 }}>
                <Text style={{ fontSize: 12, fontWeight: "800", color: colors.brandSecondary, marginBottom: 8, letterSpacing: 0.8 }}>
                  SELECCIONA LA ETAPA DE PROGRESIÓN:
                </Text>
                <View style={{ flexDirection: "row", gap: 8 }}>
                  {stageNames.map((sName: string, idx: number) => {
                    const isStageActive = activeStageTab === idx;
                    return (
                      <Pressable
                        key={sName}
                        onPress={() => setActiveStageTab(idx)}
                        style={[
                          styles.chip,
                          { flex: 1, paddingHorizontal: 4, height: 38 },
                          isStageActive && styles.chipActive,
                        ]}
                      >
                        <Text style={[styles.chipText, { fontSize: 11 }, isStageActive && styles.chipTextActive]} numberOfLines={1}>
                          {sName}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <Text style={[styles.resultLabel, { marginTop: 4 }]}>
                OBJETIVOS EDUCATIVOS · ETAPA {stageNames[activeStageTab].toUpperCase()}
              </Text>

              {sec.growthAreas.map((area: GrowthAreaDetail) => {
                const stageData = area.objectivesByStage[activeStageTab];
                return (
                  <View key={area.id} style={{ backgroundColor: colors.surfaceSecondary, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border, gap: 8 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                      <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: area.color, alignItems: "center", justifyContent: "center" }}>
                        <MaterialCommunityIcons name={area.icon as any} size={18} color="#FFFFFF" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 15, fontWeight: "800", color: colors.onSurface }}>{area.name}</Text>
                        <Text style={{ fontSize: 11, color: colors.muted }}>{stageData.stageDesc}</Text>
                      </View>
                    </View>
                    <Text style={{ fontSize: 12, color: colors.onSurfaceSecondary, fontStyle: "italic", lineHeight: 17 }}>
                      {area.definition}
                    </Text>
                    <View style={{ marginTop: 4, gap: 5, backgroundColor: colors.surfaceTertiary, padding: 10, borderRadius: 10 }}>
                      {stageData.items.map((item: string, itemIdx: number) => (
                        <View key={itemIdx} style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
                          <Text style={{ color: colors.brandSecondary, fontWeight: "800", fontSize: 12 }}>✓</Text>
                          <Text style={{ flex: 1, fontSize: 12, lineHeight: 18, color: colors.onSurfaceSecondary }}>
                            {item}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {/* Puntos clave / Datos estructurados */}
          {sec.keyPoints && (
            <View style={{ marginTop: 4, gap: 8, backgroundColor: colors.surfaceTertiary, padding: 12, borderRadius: 12 }}>
              {sec.keyPoints.map((kp: { label: string; text: string }, idx: number) => (
                <View key={idx} style={{ flexDirection: "row", alignItems: "flex-start", gap: 6 }}>
                  <Text style={{ color: colors.brandSecondary, fontWeight: "800", fontSize: 13, lineHeight: 18 }}>•</Text>
                  <Text style={[styles.pdfDetail, { flex: 1, fontSize: 12, lineHeight: 18, color: colors.onSurfaceSecondary }]}>
                    <Text style={{ fontWeight: "700", color: colors.onSurface }}>{kp.label}: </Text>
                    {kp.text}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Subsecciones detalladas (Ley Scout, Carta de Unidad, etc.) */}
          {sec.subsections && (
            <View style={{ marginTop: 4, gap: 10 }}>
              {sec.subsections.map((sub: any, sIdx: number) => (
                <View key={sIdx} style={{ backgroundColor: colors.surfaceTertiary, padding: 12, borderRadius: 12, gap: 6 }}>
                  <Text style={{ fontSize: 14, fontWeight: "800", color: colors.brandSecondary }}>
                    {sub.title}
                  </Text>
                  <Text style={{ fontSize: 12, color: colors.onSurfaceSecondary, lineHeight: 17 }}>
                    {sub.description}
                  </Text>
                  {sub.points && (
                    <View style={{ gap: 5, marginTop: 4 }}>
                      {sub.points.map((pt: string, pIdx: number) => (
                        <View key={pIdx} style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
                          <Text style={{ color: colors.brandSecondary, fontWeight: "800", fontSize: 12, lineHeight: 17 }}>▶</Text>
                          <Text style={{ flex: 1, fontSize: 12, lineHeight: 17, color: colors.onSurfaceSecondary }}>
                            {pt}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

function PdfModal({ kind, uri, colors, styles, onClose }: any) {
  const [activeTab, setActiveTab] = useState<"guia" | "pdf">("guia");
  const [downloading, setDownloading] = useState(false);
  const title = kind === "agenda" ? "Agenda del Pionero" : "Especialidades Scouts";
  const viewerUrl = uri ? `${uri}/viewer` : null;
  const displayUri = viewerUrl || uri;

  const downloadPdf = async () => {
    if (!uri) return;
    const downloadUrl = `${uri}?download=true`;
    const filename = kind === "agenda" ? "agenda-pionero.pdf" : "especialidades-scouts.pdf";

    if (Platform.OS === "web") {
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    try {
      setDownloading(true);
      const targetUri = `${FileSystem.documentDirectory}${filename}`;
      const res = await FileSystem.downloadAsync(downloadUrl, targetUri);
      setDownloading(false);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(res.uri, {
          mimeType: "application/pdf",
          dialogTitle: `Abrir ${title}`,
          UTI: "com.adobe.pdf",
        });
      } else {
        Alert.alert("Descarga completada", "El documento ha sido guardado en tu dispositivo.");
      }
    } catch {
      setDownloading(false);
      Linking.openURL(downloadUrl).catch(() => {
        Alert.alert("Error de descarga", "No se pudo descargar el archivo en este dispositivo.");
      });
    }
  };

  const openExternal = async () => {
    if (Platform.OS === "web") {
      if (uri) window.open(`${uri}?download=true`, "_blank", "noopener,noreferrer");
    } else {
      await downloadPdf();
    }
  };

  return (
    <Modal visible={Boolean(kind)} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>MATERIAL OFFLINE Y DESCARGABLE</Text>
            <Text style={styles.pdfModalTitle}>{title}</Text>
          </View>
          <Pressable testID="pdf-open-external" onPress={openExternal} style={[styles.closeButton, { marginRight: 8 }]} accessibilityRole="button" accessibilityLabel="Abrir en lector">
            <MaterialCommunityIcons name="open-in-new" size={20} color={colors.brandSecondary} />
          </Pressable>
          <Pressable testID="pdf-close" onPress={onClose} style={styles.closeButton} accessibilityRole="button" accessibilityLabel="Cerrar">
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>

        <View style={{ flexDirection: "row", paddingHorizontal: 20, paddingTop: 10, paddingBottom: 6, gap: 10 }}>
          <Pressable
            testID="pdf-tab-guia"
            onPress={() => setActiveTab("guia")}
            style={[styles.chip, activeTab === "guia" && styles.chipActive]}
          >
            <MaterialCommunityIcons name="book-open-page-variant" size={14} color={activeTab === "guia" ? colors.onBrandPrimary : colors.onSurfaceSecondary} />
            <Text style={[styles.chipText, activeTab === "guia" && styles.chipTextActive]}>  Guía Digital Embebida</Text>
          </Pressable>
          <Pressable
            testID="pdf-tab-pdf"
            onPress={() => setActiveTab("pdf")}
            style={[styles.chip, activeTab === "pdf" && styles.chipActive]}
          >
            <MaterialCommunityIcons name="file-pdf-box" size={14} color={activeTab === "pdf" ? colors.onBrandPrimary : colors.onSurfaceSecondary} />
            <Text style={[styles.chipText, activeTab === "pdf" && styles.chipTextActive]}>  Documento PDF</Text>
          </Pressable>
        </View>

        {activeTab === "guia" ? (
          <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }} testID="offline-guide-scroll">
            {kind === "agenda" && <AgendaGuideView colors={colors} styles={styles} />}
            {kind === "specialties" && <SpecialtiesGuideView colors={colors} styles={styles} />}
          </ScrollView>
        ) : (
          <View style={{ flex: 1 }}>
            {/* Barra de acción rápida para descargar el PDF original */}
            <View style={{ paddingHorizontal: 18, paddingVertical: 10, backgroundColor: colors.surfaceSecondary, borderBottomWidth: 1, borderBottomColor: colors.border, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 13, fontWeight: "800", color: colors.onSurface }}>Documento PDF Original</Text>
                <Text style={{ fontSize: 11, color: colors.muted }}>Descárgalo y ábrelo en tu lector PDF favorito.</Text>
              </View>
              <Pressable
                onPress={downloadPdf}
                disabled={downloading}
                style={[styles.secondaryButton, { marginTop: 0, paddingHorizontal: 12, height: 36, minHeight: 36, opacity: downloading ? 0.7 : 1 }]}
                accessibilityRole="button"
              >
                {downloading ? (
                  <ActivityIndicator size="small" color={colors.onBrandSecondary} />
                ) : (
                  <MaterialCommunityIcons name="download" size={16} color={colors.onBrandSecondary} />
                )}
                <Text style={[styles.secondaryButtonText, { fontSize: 12 }]}>
                  {downloading ? "Descargando..." : "Descargar"}
                </Text>
              </Pressable>
            </View>

            {displayUri ? (
              Platform.OS === "web" ? (
                <View testID="pdf-web-frame" style={{ flex: 1, backgroundColor: colors.surface }}>
                  {createElement("iframe", { src: displayUri, style: { flex: 1, border: "none", width: "100%", height: "100%" }, title })}
                </View>
              ) : (
                <WebView
                  testID="pdf-webview"
                  originWhitelist={["*"]}
                  source={{ uri: displayUri }}
                  style={styles.pdfWebView}
                  startInLoadingState
                  javaScriptEnabled
                  domStorageEnabled
                  renderLoading={() => <View style={styles.pdfLoading}><ActivityIndicator color={colors.brandSecondary} size="large" /></View>}
                />
              )
            ) : (
              <View style={styles.pdfLoading}>
                <ActivityIndicator color={colors.brandSecondary} size="large" />
                <Text style={styles.pdfLoadingText}>Abriendo archivo…</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </Modal>
  );
}

function PatriaScreen({ styles, colors, state, progressPercent, togglePoint, user, requestApproval }: any) {
  const status: string[] = state.patria_status ?? Array(15).fill("idle");
  const notes: string[] = state.patria_notes ?? Array(15).fill("");
  const isDirigente = user?.role === "dirigente";
  const badgeFor = (idx: number) => {
    const s = status[idx] ?? "idle";
    const done = state.patria[idx];
    if (done && (s === "aprobado" || s === "idle")) return { color: colors.success, label: "Aprobado por dirigente", icon: "check-decagram" };
    if (s === "pendiente") return { color: colors.brandSecondary, label: "Pendiente de validación online", icon: "clock-outline" };
    if (s === "rechazado") return { color: colors.error, label: "Requiere corrección", icon: "alert-circle-outline" };
    return { color: colors.muted, label: "Sin solicitar", icon: "circle-outline" };
  };
  return (
    <View>
      <Text style={styles.pageEyebrow}>MÓDULO EXCLUSIVO</Text>
      <Text style={styles.pageTitle}>Scout de la Patria</Text>
      <Text style={styles.pageSubtitle}>Solicita validación online a tu dirigente. El estado cambia a verde cuando aprueban.</Text>
      <View style={styles.scoreCard}>
        <View>
          <Text style={styles.scoreLabel}>AVANCE TOTAL</Text>
          <Text style={styles.scoreBig}>{state.patria.filter(Boolean).length}<Text style={styles.scoreSlash}>/15</Text></Text>
          <Text style={styles.scoreHint}>{progressPercent}% de requisitos verificados</Text>
        </View>
        <View style={styles.miniRing}><Text style={styles.miniRingText}>{progressPercent}%</Text></View>
      </View>
      <Text style={styles.sectionTitle}>Los 15 puntos oficiales</Text>
      {pointLabels.map((label, index) => {
        const info = badgeFor(index);
        const s = status[index] ?? "idle";
        const canRequest = !isDirigente && (s === "idle" || s === "rechazado");
        return (
          <View key={label} style={[styles.checkRow, { flexDirection: "column", alignItems: "stretch", gap: 8 }]} testID={`patria-point-${index + 1}`}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 11 }}>
              <Pressable testID={`patria-check-${index + 1}`} onPress={() => (isDirigente ? togglePoint(index) : undefined)} style={[styles.checkbox, state.patria[index] && styles.checkboxOn]}>
                {state.patria[index] && <MaterialCommunityIcons name="check" size={17} color={colors.onBrandPrimary} />}
              </Pressable>
              <View style={styles.checkCopy}>
                <Text style={[styles.checkLabel, state.patria[index] && styles.checkDone]}>{index + 1}. {label}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 5 }}>
                  <MaterialCommunityIcons name={info.icon as any} size={12} color={info.color} />
                  <Text style={[styles.checkMeta, { color: info.color }]}>{info.label}</Text>
                </View>
                {notes[index] ? <Text style={[styles.checkMeta, { marginTop: 3 }]}>Nota: {notes[index]}</Text> : null}
              </View>
            </View>
            {canRequest && (
              <Pressable testID={`patria-request-${index + 1}`} onPress={() => requestApproval(index)} style={[styles.secondaryButton, { alignSelf: "flex-start", paddingHorizontal: 14 }]}>
                <MaterialCommunityIcons name="cloud-upload-outline" size={16} color={colors.onBrandSecondary} />
                <Text style={styles.secondaryButtonText}>Solicitar aprobación</Text>
              </Pressable>
            )}
          </View>
        );
      })}
      <Text style={styles.sectionTitle}>Cuotas de progresión</Text>
      <View style={styles.quotaGrid}>
        {Object.entries(state.progress).map(([stage, quota]) => (
          <View style={styles.quotaCard} key={stage}>
            <Text style={styles.quotaStage}>{stage}</Text>
            <Text style={styles.quotaCount}>{state.completedProgress[stage]}/{Number(quota)}</Text>
            <View style={styles.quotaTrack}>
              <View style={[styles.quotaFill, { width: `${Math.min(100, (state.completedProgress[stage] / Number(quota)) * 100)}%` }]} />
            </View>
            <Text style={styles.quotaMeta}>objetivos logrados</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Especialidades y competencias</Text>
      <View style={styles.badgeCloud}>
        {state.specialties.map((badge: string, index: number) => (
          <View key={badge} style={[styles.badge, index < 3 && styles.badgeMandatory]}>
            <MaterialCommunityIcons name={index < 3 ? "star-four-points" : "check-decagram-outline"} size={14} color={index < 3 ? colors.brandSecondary : colors.success} />
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function BitacoraScreen({ styles, colors, state, noteTitle, noteBody, setNoteTitle, setNoteBody, saveNote, totalHours, serviceHours, openLibro, openServicio }: any) {
  const campingTotals = computeCampingTotals(state);
  const campingNights = campingTotals.approved;
  return <View><Text style={styles.pageEyebrow}>MEMORIA Y SERVICIO</Text><Text style={styles.pageTitle}>Cartilla, Bitácora & Libro de Oro</Text><Text style={styles.pageSubtitle}>Escribe lo que aprendiste. Tus recuerdos viajan contigo y se sincronizan.</Text><Pressable testID="bitacora-libro" onPress={openLibro} style={[styles.toolBanner, { flexDirection: "row" }]}><MaterialCommunityIcons name="image-multiple" size={28} color={colors.brandSecondary} /><View style={styles.toolBannerCopy}><Text style={styles.toolBannerTitle}>Libro de Oro compartido</Text><Text style={styles.toolBannerText}>Sube y revisa los recuerdos visuales de la unidad.</Text></View><MaterialCommunityIcons name="chevron-right" size={19} color={colors.muted} /></Pressable><Pressable testID="bitacora-servicio" onPress={openServicio} style={[styles.toolBanner, { flexDirection: "row" }]}><MaterialCommunityIcons name="hand-heart-outline" size={28} color={colors.brandSecondary} /><View style={styles.toolBannerCopy}><Text style={styles.toolBannerTitle}>Servicio a la comunidad</Text><Text style={styles.toolBannerText}>Registra horas voluntarias · requieren aprobación.</Text></View><MaterialCommunityIcons name="chevron-right" size={19} color={colors.muted} /></Pressable><View style={styles.noteComposer}><Text style={styles.composerTitle}>Nueva reflexión</Text><TextInput value={noteTitle} onChangeText={setNoteTitle} style={styles.input} placeholder="Título · Reunión, campamento…" placeholderTextColor={styles.placeholder.color} /><TextInput value={noteBody} onChangeText={setNoteBody} style={[styles.input, styles.textArea]} placeholder="¿Qué aprendiste hoy?" placeholderTextColor={styles.placeholder.color} multiline textAlignVertical="top" /><Pressable onPress={saveNote} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}><MaterialCommunityIcons name="plus" size={18} color={colors.onBrandSecondary} /><Text style={styles.secondaryButtonText}>Guardar en bitácora</Text></Pressable></View><View style={styles.statsRow}><Stat label="Proyectos" value={`${totalHours}h`} icon="leaf-circle-outline" styles={styles} /><Stat label="Servicio" value={`${serviceHours}h`} icon="hand-heart-outline" styles={styles} /><Stat label="Noches" value={`${campingNights}`} icon="tent" styles={styles} /></View><Text style={styles.sectionTitle}>Últimas reflexiones</Text>{state.notes.length === 0 ? <Empty icon="notebook-outline" text="Tu primera historia comienza aquí." styles={styles} /> : state.notes.slice(0, 4).map((note: any) => <View style={styles.noteRow} key={note.id}><View style={styles.noteIcon}><MaterialCommunityIcons name="feather" size={18} color={colors.brandSecondary} /></View><View style={styles.noteCopy}><Text style={styles.noteTitle}>{note.title}</Text><Text style={styles.noteBody} numberOfLines={2}>{note.body}</Text><Text style={styles.noteDate}>{note.date}</Text></View></View>)}<Text style={styles.sectionTitle}>Comunidad</Text>{state.announcements.map((item: any) => <View style={styles.announcement} key={item.id}><Text style={styles.announcementDate}>{item.date.toUpperCase()}</Text><Text style={styles.announcementTitle}>{item.title}</Text><Text style={styles.noteBody}>{item.body}</Text></View>)}</View>;
}

function MoreScreen({ styles, colors, user, state, profileForm, setProfileForm, saveProfile, logout, openTool, openCamping, openTarija, refreshUser }: any) {
  const isDirigente = user?.role === "dirigente";
  const totals = computeCampingTotals(state);
  const approvedNights = totals.approved;
  const pendingNights = Math.max(0, totals.provisional - totals.approved);
  const nightsGoal = 15;
  const pct = Math.min(100, (approvedNights / nightsGoal) * 100);
  const uploadCred = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"] as any, quality: 0.85, allowsEditing: false });
      if (res.canceled || !res.assets?.[0]) return;
      const a = res.assets[0];
      const up = await uploadFile(a.uri, a.fileName || `credencial-${Date.now()}.jpg`, a.mimeType || "image/jpeg", "credential");
      await api.updateProfile({ credential_doc_path: up.path });
      await refreshUser?.();
    } catch {
      /* ignore */
    }
  };
  return (
    <View>
      <Text style={styles.pageEyebrow}>MI PERFIL</Text>
      <Text style={styles.pageTitle}>{isDirigente ? "Ficha del dirigente" : "Ficha del pionero"}</Text>
      <Text style={styles.pageSubtitle}>Tu información de emergencia se comparte solo con dirigentes autorizados.</Text>

      {!isDirigente && (
        <View style={[styles.profileCard, { marginTop: 18 }]} testID="racha-card">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={[styles.pdfIcon, { backgroundColor: colors.brandPrimary }]}>
              <MaterialCommunityIcons name="tent" size={22} color={colors.onBrandPrimary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.resultLabel}>RACHA DE CAMPAMENTO · GESTIÓN 2026</Text>
              <Text style={[styles.scoreBig, { fontSize: 30 }]}>{approvedNights}<Text style={styles.scoreSlash}>/{nightsGoal}</Text></Text>
              <Text style={styles.pdfDetail}>{approvedNights} noches aprobadas · {pendingNights} pendientes de verificación</Text>
              <Text style={[styles.pdfDetail, { color: colors.brandSecondary }]}>Solo las noches aprobadas suman a tu ruta.</Text>
            </View>
          </View>
          <View style={[styles.quotaTrack, { marginTop: 10 }]}><View style={[styles.quotaFill, { width: `${pct}%` }]} /></View>
          <Pressable testID="camp-open" onPress={openCamping} style={[styles.secondaryButton, { marginTop: 12 }]}>
            <MaterialCommunityIcons name="plus" size={16} color={colors.onBrandSecondary} />
            <Text style={styles.secondaryButtonText}>Registrar campamento</Text>
          </Pressable>
          {totals.entries.length > 0 && (
            <View style={{ marginTop: 12, gap: 6 }}>
              {totals.entries.slice(-3).reverse().map((c) => (
                <View key={c.id} style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                  <MaterialCommunityIcons name={c.status === "aprobado" ? "check-decagram" : c.status === "rechazado" ? "alert-circle-outline" : "clock-outline"} size={14} color={c.status === "aprobado" ? colors.success : c.status === "rechazado" ? colors.error : colors.brandSecondary} />
                  <Text style={styles.pdfDetail}>{c.place} · {c.nights}n · {c.status}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {isDirigente && (
        <View style={[styles.profileCard, { marginTop: 18 }]} testID="credential-card">
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={[styles.pdfIcon, { backgroundColor: colors.brandPrimary }]}>
              <MaterialCommunityIcons name={user.credential_doc_path ? "shield-check" : "shield-alert-outline"} size={22} color={colors.onBrandPrimary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.resultLabel}>CREDENCIAL DE DIRIGENTE</Text>
              <Text style={styles.pdfTitle}>{user.credential_doc_path ? "Documento cargado" : "Falta cargar tu registro"}</Text>
              <Text style={styles.pdfDetail}>Código: {user.credential_code || "sin código registrado"}</Text>
              <Text style={styles.pdfDetail}>Los pioneros verán tu credencial al aprobar sus solicitudes.</Text>
            </View>
          </View>
          <Pressable testID="credential-upload" onPress={uploadCred} style={[styles.secondaryButton, { marginTop: 12 }]}>
            <MaterialCommunityIcons name="file-image-plus-outline" size={16} color={colors.onBrandSecondary} />
            <Text style={styles.secondaryButtonText}>{user.credential_doc_path ? "Reemplazar credencial" : "Subir credencial de dirigente"}</Text>
          </Pressable>
        </View>
      )}

      <View style={styles.medicalNotice}><MaterialCommunityIcons name="shield-lock-outline" size={22} color={colors.success} /><Text style={styles.medicalNoticeText}>Ficha protegida y sincronizada</Text></View>
      <View style={styles.profileCard}>
        <ProfileField label="Nombre completo" value={profileForm.name} onChangeText={(value: string) => setProfileForm({ ...profileForm, name: value })} styles={styles} />
        <ProfileField label="Patrulla" value={profileForm.patrol} onChangeText={(value: string) => setProfileForm({ ...profileForm, patrol: value })} styles={styles} />
        {(() => {
          const currentBlood = String(user?.profile?.blood_type ?? "").trim();
          const isBloodLocked = Boolean(currentBlood && currentBlood !== "Por registrar");
          return (
            <View style={styles.field}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                <Text style={styles.fieldLabel}>Tipo de sangre / RH</Text>
                {isBloodLocked && (
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <MaterialCommunityIcons name="lock" size={13} color={colors.brandSecondary} />
                    <Text style={{ fontSize: 11, color: colors.brandSecondary, fontWeight: "700" }}>Inmutable (Seguridad médica)</Text>
                  </View>
                )}
              </View>
              {isBloodLocked ? (
                <View style={[styles.input, { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: colors.surfaceTertiary }]} testID="blood-locked-view">
                  <Text style={{ color: colors.onSurface, fontWeight: "700", fontSize: 16 }}>{currentBlood}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <MaterialCommunityIcons name="shield-check" size={16} color={colors.success} />
                    <Text style={{ color: colors.success, fontSize: 12, fontWeight: "600" }}>Registrado en base de datos</Text>
                  </View>
                </View>
              ) : (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bt) => (
                    <Pressable
                      key={bt}
                      testID={`blood-${bt}`}
                      onPress={() => setProfileForm({ ...profileForm, blood_type: bt })}
                      style={[styles.chip, profileForm.blood_type === bt && styles.chipActive]}
                    >
                      <Text style={[styles.chipText, profileForm.blood_type === bt && styles.chipTextActive]}>{bt}</Text>
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </View>
          );
        })()}
        <ProfileField label="Alergias conocidas" value={profileForm.allergies} onChangeText={(value: string) => setProfileForm({ ...profileForm, allergies: value })} styles={styles} placeholder="Ej: penicilina, maní" />
        <ProfileField label="Condiciones médicas" value={profileForm.medical_conditions} onChangeText={(value: string) => setProfileForm({ ...profileForm, medical_conditions: value })} styles={styles} placeholder="Ej: asma, diabetes" />
        <ProfileField label="Seguro médico" value={profileForm.medical_insurance} onChangeText={(value: string) => setProfileForm({ ...profileForm, medical_insurance: value })} styles={styles} placeholder="Nombre y N° de afiliación" />
        <ProfileField label="Contacto de emergencia" value={profileForm.emergency_contact} onChangeText={(value: string) => setProfileForm({ ...profileForm, emergency_contact: value })} styles={styles} />
        <ProfileField label="Teléfono de emergencia" value={profileForm.emergency_phone} onChangeText={(value: string) => setProfileForm({ ...profileForm, emergency_phone: value })} keyboardType="phone-pad" styles={styles} />
        <Pressable testID="save-profile" onPress={saveProfile} style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
          <MaterialCommunityIcons name="content-save-outline" size={18} color={colors.onBrandSecondary} />
          <Text style={styles.secondaryButtonText}>Guardar ficha</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Herramientas del pionero</Text>
      <View style={styles.toolGrid}>
        <Tool testID="tool-claves" icon="alphabetical-variant" title="Claves Scout" text="14 códigos" onPress={() => openTool("claves")} styles={styles} colors={colors} />
        <Tool testID="tool-cabuyeria" icon="transit-connection-variant" title="Cabuyería" text="Nudos y construcciones" onPress={() => openTool("cabuyeria")} styles={styles} colors={colors} />
        <Tool testID="tool-tarija" icon="pine-tree" title="Sedes Tarija" text="Directorio + primeros auxilios" onPress={openTarija} styles={styles} colors={colors} />
      </View>

      {user?.user_id === "offline_pionero" && (
        <View style={[styles.profileCard, { marginTop: 16, padding: 16, borderWidth: 1, borderColor: colors.brandSecondary, gap: 10 }]}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <MaterialCommunityIcons name="cloud-off-outline" size={22} color={colors.brandSecondary} />
            <Text style={{ fontSize: 14, fontWeight: "800", color: colors.onSurface }}>Modo Autónomo (Local) Activo</Text>
          </View>
          <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 18 }}>
            Tu perfil scout y progreso están guardados en este celular. No necesitas internet para consultar especialidades ni registrar avances.
          </Text>
        </View>
      )}

      <Pressable testID="logout-btn" onPress={logout} style={styles.logoutButton}>
        <MaterialCommunityIcons name="logout" size={18} color={colors.error} />
        <Text style={styles.logoutText}>{user?.user_id === "offline_pionero" ? "Salir a pantalla de bienvenida" : "Cerrar sesión"}</Text>
      </Pressable>
    </View>
  );
}

function ProfileField({ label, styles, ...props }: any) { return <View style={styles.field}><Text style={styles.fieldLabel}>{label}</Text><TextInput {...props} style={styles.input} placeholderTextColor={styles.placeholder.color} /></View>; }
function Stat({ label, value, icon, styles }: any) { return <View style={styles.stat}><MaterialCommunityIcons name={icon} size={20} color={styles.eyebrow.color} /><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>; }
function Tool({ testID, icon, title, text, styles, colors, onPress }: any) { return <Pressable testID={testID} onPress={onPress} style={({ pressed }) => [styles.toolCard, pressed && styles.cardPressed]}><MaterialCommunityIcons name={icon} size={24} color={colors.brandSecondary} /><Text style={styles.toolTitle}>{title}</Text><Text style={styles.toolText}>{text}</Text></Pressable>; }
function Empty({ icon, text, styles }: any) { return <View style={styles.empty}><MaterialCommunityIcons name={icon} size={30} color={styles.quickDetail.color} /><Text style={styles.emptyText}>{text}</Text></View>; }


const useStyles = makeStyles((colors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.surface }, scroll: { paddingHorizontal: 20 }, loading: { flex: 1, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", gap: 16 }, loadingText: { color: colors.muted, fontSize: 15 },
  authRoot: { flex: 1, backgroundColor: colors.surface }, authContent: { flexGrow: 1, padding: 24, paddingTop: 70, paddingBottom: 34, justifyContent: "center" }, brandMark: { width: 68, height: 68, borderRadius: 22, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center", marginBottom: 22 }, authKicker: { color: colors.brandSecondary, fontSize: 11, fontWeight: "800", letterSpacing: 1.2 }, authTitle: { color: colors.onSurface, fontSize: 34, fontWeight: "800", marginTop: 9, letterSpacing: -0.8 }, authSubtitle: { color: colors.muted, fontSize: 16, lineHeight: 24, marginTop: 10, maxWidth: 320 }, authCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 24, padding: 20, marginTop: 28, borderWidth: 1, borderColor: colors.border }, switchText: { color: colors.muted, textAlign: "center", fontSize: 14, marginTop: 24 }, switchStrong: { color: colors.brandSecondary, fontWeight: "800" }, authFooter: { color: colors.muted, fontSize: 12, textAlign: "center", marginTop: 34 }, field: { marginBottom: 14 }, fieldLabel: { color: colors.onSurfaceSecondary, fontSize: 12, fontWeight: "700", marginBottom: 8 }, input: { minHeight: 48, borderRadius: 13, backgroundColor: colors.surfaceTertiary, color: colors.onSurfaceSecondary, paddingHorizontal: 14, fontSize: 15, borderWidth: 1, borderColor: colors.border }, textArea: { minHeight: 104, paddingTop: 14 }, placeholder: { color: colors.muted }, primaryButton: { minHeight: 52, backgroundColor: colors.brandPrimary, borderRadius: 15, alignItems: "center", justifyContent: "center", marginTop: 4 }, primaryButtonText: { color: colors.onBrandPrimary, fontSize: 15, fontWeight: "800" }, pressed: { opacity: 0.78, transform: [{ scale: 0.985 }] }, disabled: { opacity: 0.55 }, orRow: { flexDirection: "row", alignItems: "center", gap: 9, marginVertical: 19 }, orLine: { flex: 1, height: 1, backgroundColor: colors.divider }, orText: { color: colors.muted, fontSize: 12 }, googleButton: { minHeight: 48, borderRadius: 14, backgroundColor: colors.surfaceTertiary, borderWidth: 1, borderColor: colors.borderStrong, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 }, googleText: { color: colors.onSurfaceSecondary, fontWeight: "700" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }, eyebrow: { color: colors.brandSecondary, fontSize: 10, fontWeight: "800", letterSpacing: 1.25 }, greeting: { color: colors.onSurface, fontSize: 27, fontWeight: "800", marginTop: 4 }, wave: { color: colors.brandSecondary }, avatar: { width: 44, height: 44, borderRadius: 16, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }, avatarDirigente: { backgroundColor: colors.brandSecondary, borderWidth: 2, borderColor: colors.brandPrimary }, avatarText: { color: colors.onBrandPrimary, fontWeight: "800", fontSize: 18 },
  jefaturaBanner: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: colors.brandSecondary, borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 14, flexWrap: "wrap" }, jefaturaBannerText: { color: colors.onBrandSecondary, fontSize: 11, fontWeight: "800", letterSpacing: 1.1, flex: 1 }, jefaturaStatusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 }, jefaturaStatusText: { color: colors.onBrandPrimary, fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },
  roleBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.brandSecondary, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 }, roleBadgeText: { color: colors.onBrandSecondary, fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },
  navRow: { flexDirection: "row", gap: 8, marginBottom: 24 }, navItem: { paddingHorizontal: 15, paddingVertical: 10, borderRadius: 20, backgroundColor: colors.surfaceSecondary }, navItemActive: { backgroundColor: colors.brandPrimary }, navText: { color: colors.muted, fontSize: 13, fontWeight: "700" }, navTextActive: { color: colors.onBrandPrimary }, heroCard: { backgroundColor: colors.brandPrimary, borderRadius: 26, padding: 22, minHeight: 190, flexDirection: "row", justifyContent: "space-between", overflow: "hidden" }, heroCopy: { flex: 1, paddingRight: 10 }, heroOverline: { color: colors.onBrandPrimary, opacity: 0.76, fontSize: 10, fontWeight: "800", letterSpacing: 1 }, heroTitle: { color: colors.onBrandPrimary, fontSize: 23, lineHeight: 28, fontWeight: "800", marginTop: 10 }, heroBody: { color: colors.onBrandPrimary, opacity: 0.8, fontSize: 13, marginTop: 8 }, heroButton: { backgroundColor: colors.brandSecondary, borderRadius: 14, minHeight: 42, alignSelf: "flex-start", paddingHorizontal: 13, marginTop: 17, flexDirection: "row", alignItems: "center", gap: 6 }, heroButtonText: { color: colors.onBrandSecondary, fontWeight: "800", fontSize: 12 }, progressRing: { width: 92, height: 92, borderRadius: 46, borderWidth: 9, borderColor: colors.brandSecondary, alignItems: "center", justifyContent: "center", alignSelf: "center", marginLeft: 8 }, ringValue: { color: colors.onBrandPrimary, fontSize: 19, fontWeight: "800" }, ringCaption: { color: colors.onBrandPrimary, opacity: 0.75, fontSize: 10, marginTop: 2 }, sectionTitle: { color: colors.onSurface, fontSize: 20, fontWeight: "800", marginTop: 28, marginBottom: 13 }, quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 }, quickCard: { width: "48.5%", minHeight: 128, backgroundColor: colors.surfaceSecondary, borderRadius: 19, padding: 14, borderWidth: 1, borderColor: colors.border }, cardPressed: { opacity: 0.78, transform: [{ scale: 0.985 }] }, iconBubble: { width: 36, height: 36, borderRadius: 12, backgroundColor: colors.surfaceTertiary, alignItems: "center", justifyContent: "center", marginBottom: 12 }, quickLabel: { color: colors.onSurfaceSecondary, fontSize: 14, fontWeight: "800" }, quickDetail: { color: colors.muted, fontSize: 12, marginTop: 5 }, referenceCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 19, paddingHorizontal: 15, borderWidth: 1, borderColor: colors.border }, referenceRow: { flexDirection: "row", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: colors.divider, gap: 12 }, referenceIcon: { color: colors.brandSecondary }, referenceCopy: { flex: 1 }, referenceTitle: { color: colors.onSurfaceSecondary, fontWeight: "800", fontSize: 14 }, referenceText: { color: colors.muted, fontSize: 12, marginTop: 4 }, quoteCard: { marginTop: 18, padding: 18, borderRadius: 19, backgroundColor: colors.surfaceTertiary }, quoteText: { color: colors.onSurfaceSecondary, fontSize: 15, fontStyle: "italic", lineHeight: 22, marginTop: 4 }, quoteCaption: { color: colors.brandSecondary, fontSize: 12, fontWeight: "700", marginTop: 9 }, muted: { color: colors.muted },
  pageEyebrow: { color: colors.brandSecondary, fontSize: 11, fontWeight: "800", letterSpacing: 1.1 }, pageTitle: { color: colors.onSurface, fontSize: 31, lineHeight: 36, fontWeight: "800", marginTop: 5 }, pageSubtitle: { color: colors.muted, fontSize: 15, lineHeight: 22, marginTop: 8 }, scoreCard: { marginTop: 22, backgroundColor: colors.surfaceSecondary, borderRadius: 22, padding: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderWidth: 1, borderColor: colors.border }, scoreLabel: { color: colors.brandSecondary, fontSize: 10, fontWeight: "800", letterSpacing: 1 }, scoreBig: { color: colors.onSurfaceSecondary, fontSize: 38, fontWeight: "800", marginTop: 5 }, scoreSlash: { color: colors.muted, fontSize: 20, fontWeight: "500" }, scoreHint: { color: colors.muted, fontSize: 12, marginTop: 2 }, miniRing: { width: 70, height: 70, borderRadius: 35, borderWidth: 7, borderColor: colors.brandSecondary, alignItems: "center", justifyContent: "center" }, miniRingText: { color: colors.brandSecondary, fontSize: 15, fontWeight: "800" }, checkRow: { backgroundColor: colors.surfaceSecondary, borderRadius: 15, padding: 14, marginBottom: 8, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: colors.border, gap: 11 }, checkbox: { width: 27, height: 27, borderRadius: 9, borderWidth: 1.5, borderColor: colors.muted, alignItems: "center", justifyContent: "center" }, checkboxOn: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary }, checkCopy: { flex: 1 }, checkLabel: { color: colors.onSurfaceSecondary, fontSize: 14, fontWeight: "700", lineHeight: 19 }, checkDone: { textDecorationLine: "line-through", color: colors.muted }, checkMeta: { color: colors.muted, fontSize: 11, marginTop: 4 }, quotaGrid: { flexDirection: "row", gap: 8 }, quotaCard: { flex: 1, padding: 13, backgroundColor: colors.surfaceSecondary, borderRadius: 16, borderWidth: 1, borderColor: colors.border }, quotaStage: { color: colors.muted, fontSize: 11, fontWeight: "700" }, quotaCount: { color: colors.onSurfaceSecondary, fontSize: 20, fontWeight: "800", marginTop: 7 }, quotaTrack: { height: 5, borderRadius: 4, backgroundColor: colors.surfaceTertiary, marginTop: 9, overflow: "hidden" }, quotaFill: { height: "100%", backgroundColor: colors.brandSecondary, borderRadius: 4 }, quotaMeta: { color: colors.muted, fontSize: 9, marginTop: 6 }, badgeCloud: { flexDirection: "row", flexWrap: "wrap", gap: 8 }, badge: { backgroundColor: colors.surfaceSecondary, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 8, flexDirection: "row", gap: 5, alignItems: "center", borderWidth: 1, borderColor: colors.border }, badgeMandatory: { borderColor: colors.brandSecondary }, badgeText: { color: colors.onSurfaceSecondary, fontSize: 11, fontWeight: "700" },
  toolBanner: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceSecondary, borderRadius: 18, padding: 15, marginTop: 20, borderWidth: 1, borderColor: colors.border, gap: 12 }, toolBannerCopy: { flex: 1 }, toolBannerTitle: { color: colors.onSurfaceSecondary, fontSize: 14, fontWeight: "800" }, toolBannerText: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 3 }, noteComposer: { backgroundColor: colors.surfaceSecondary, borderRadius: 20, padding: 16, marginTop: 13, borderWidth: 1, borderColor: colors.border }, composerTitle: { color: colors.onSurfaceSecondary, fontSize: 16, fontWeight: "800", marginBottom: 13 }, secondaryButton: { minHeight: 46, borderRadius: 14, backgroundColor: colors.brandSecondary, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 7, marginTop: 3 }, secondaryButtonText: { color: colors.onBrandSecondary, fontWeight: "800", fontSize: 13 }, statsRow: { flexDirection: "row", gap: 9, marginTop: 15 }, stat: { flex: 1, backgroundColor: colors.surfaceTertiary, borderRadius: 15, padding: 12 }, statIcon: { color: colors.brandSecondary }, statValue: { color: colors.onSurfaceSecondary, fontSize: 20, fontWeight: "800", marginTop: 8 }, statLabel: { color: colors.muted, fontSize: 11, marginTop: 2 }, empty: { backgroundColor: colors.surfaceSecondary, borderRadius: 17, alignItems: "center", padding: 25, gap: 8 }, emptyText: { color: colors.muted, fontSize: 13 }, noteRow: { flexDirection: "row", backgroundColor: colors.surfaceSecondary, borderRadius: 16, padding: 13, marginBottom: 8, gap: 12, borderWidth: 1, borderColor: colors.border }, noteIcon: { width: 37, height: 37, backgroundColor: colors.surfaceTertiary, borderRadius: 12, alignItems: "center", justifyContent: "center" }, noteCopy: { flex: 1 }, noteTitle: { color: colors.onSurfaceSecondary, fontSize: 14, fontWeight: "800" }, noteBody: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 4 }, noteDate: { color: colors.brandSecondary, fontSize: 11, marginTop: 6, fontWeight: "700" }, eventRow: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceSecondary, borderRadius: 16, padding: 12, marginBottom: 8, gap: 12 }, dateTile: { backgroundColor: colors.brandPrimary, width: 45, height: 45, borderRadius: 12, alignItems: "center", justifyContent: "center" }, dateDay: { color: colors.onBrandPrimary, fontSize: 12, fontWeight: "800" }, dateMonth: { color: colors.onBrandPrimary, opacity: 0.75, fontSize: 9, marginTop: 2 }, eventTitle: { color: colors.onSurfaceSecondary, fontSize: 14, fontWeight: "800" }, announcement: { backgroundColor: colors.surfaceSecondary, padding: 16, borderRadius: 17, borderLeftWidth: 3, borderLeftColor: colors.brandSecondary, marginBottom: 8 }, announcementDate: { color: colors.brandSecondary, fontSize: 10, fontWeight: "800", letterSpacing: 1 }, announcementTitle: { color: colors.onSurfaceSecondary, fontSize: 15, fontWeight: "800", marginTop: 8 },
  medicalNotice: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: colors.surfaceSecondary, borderRadius: 15, padding: 14, marginTop: 18 }, medicalNoticeText: { color: colors.success, fontWeight: "700", fontSize: 13 }, profileCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 20, padding: 16, marginTop: 11, borderWidth: 1, borderColor: colors.border }, twoFields: { flexDirection: "row", gap: 9 }, half: { flex: 1 }, toolGrid: { flexDirection: "row", flexWrap: "wrap", gap: 9 }, toolCard: { width: "48.5%", minHeight: 120, borderRadius: 17, padding: 14, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border }, toolTitle: { color: colors.onSurfaceSecondary, fontSize: 14, fontWeight: "800", marginTop: 13 }, toolText: { color: colors.muted, fontSize: 11, marginTop: 5, lineHeight: 16 }, logoutButton: { minHeight: 48, borderRadius: 15, borderWidth: 1, borderColor: colors.error, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 28 }, logoutText: { color: colors.error, fontWeight: "800" },
  pdfGrid: { gap: 10 },
  pdfCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 18, padding: 14, flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderColor: colors.border },
  pdfIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: colors.surfaceTertiary, alignItems: "center", justifyContent: "center" },
  pdfCopy: { flex: 1 },
  pdfTag: { color: colors.brandSecondary, fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  pdfTitle: { color: colors.onSurfaceSecondary, fontSize: 14, fontWeight: "800", marginTop: 4 },
  pdfDetail: { color: colors.muted, fontSize: 11, marginTop: 3 },
  pdfModal: { flex: 1, backgroundColor: colors.surface },
  pdfModalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 18, paddingTop: 54, paddingBottom: 14, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 12 },
  pdfModalEyebrow: { color: colors.brandSecondary, fontSize: 10, fontWeight: "800", letterSpacing: 1.1 },
  pdfModalTitle: { color: colors.onSurface, fontSize: 18, fontWeight: "800", marginTop: 3 },
  closeButton: { width: 40, height: 40, borderRadius: 14, backgroundColor: colors.surfaceSecondary, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border },
  pdfWebView: { flex: 1, backgroundColor: colors.surface },
  pdfLoading: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  pdfLoadingText: { color: colors.muted, fontSize: 13 },
  chip: { paddingHorizontal: 14, height: 36, borderRadius: 18, backgroundColor: colors.surfaceSecondary, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  chipActive: { backgroundColor: colors.brandPrimary, borderColor: colors.brandPrimary },
  chipText: { color: colors.onSurfaceSecondary, fontSize: 12, fontWeight: "700" },
  chipTextActive: { color: colors.onBrandPrimary },
  helperText: { color: colors.muted, fontSize: 12, marginTop: 6, lineHeight: 18 },
  resultCard: { marginTop: 12, backgroundColor: colors.surfaceSecondary, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: colors.borderStrong },
  resultLabel: { color: colors.brandSecondary, fontSize: 10, fontWeight: "800", letterSpacing: 1 },
  resultText: { color: colors.onSurfaceSecondary, fontSize: 15, marginTop: 6, lineHeight: 22, fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }) },
  morseGrid: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
  morseCell: { width: "23%", backgroundColor: colors.surfaceTertiary, borderRadius: 10, paddingVertical: 8, alignItems: "center", borderWidth: 1, borderColor: colors.border },
  morseChar: { color: colors.brandSecondary, fontWeight: "800", fontSize: 14 },
  morseCode: { color: colors.onSurfaceTertiary, fontSize: 11, marginTop: 3, fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }) },
  placeholderCard: { backgroundColor: colors.surfaceSecondary, borderRadius: 18, padding: 22, marginTop: 18, alignItems: "center", gap: 10, borderWidth: 1, borderColor: colors.border },
  placeholderTitle: { color: colors.onSurfaceSecondary, fontSize: 16, fontWeight: "800", marginTop: 4, textAlign: "center" },
  placeholderText: { color: colors.muted, fontSize: 12, lineHeight: 18, textAlign: "center" },
  fabAdd: { position: "absolute", right: 22, bottom: 34, width: 60, height: 60, borderRadius: 30, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8, borderWidth: 2, borderColor: colors.brandSecondary },
}));