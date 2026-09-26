import Constants from "expo-constants";
import { Platform } from "react-native";

import { storage } from "@/src/utils/storage";

export const SESSION_KEY = "pionero.session.token";
const configuredBaseUrl = String(Constants.expoConfig?.extra?.backendUrl ?? process.env.EXPO_BACKEND_URL ?? process.env.EXPO_PUBLIC_BACKEND_URL ?? "").replace(/\/$/, "");

export function baseUrl(): string {
  if (configuredBaseUrl && !configuredBaseUrl.includes("localhost") && !configuredBaseUrl.includes("127.0.0.1")) {
    return configuredBaseUrl;
  }
  if (Platform.OS === "web") {
    if (typeof window !== "undefined") {
      const host = window.location.hostname;
      const proto = window.location.protocol;
      if (window.location.port !== "8000") {
        return `${proto}//${host}:8000`;
      }
      return window.location.origin;
    }
  }
  const hostUri = Constants.expoConfig?.hostUri;
  if (hostUri) {
    const ip = hostUri.split(":")[0];
    return `http://${ip}:8000`;
  }
  return "https://horizonte-pionero.onrender.com";
}

export function backendBaseUrl(): string {
  return baseUrl();
}

export type User = {
  user_id: string;
  email: string;
  name: string;
  picture?: string | null;
  role: string;
  verification_status?: string;
  credential_code?: string | null;
  credential_doc_path?: string | null;
  profile: Record<string, any>;
};

export type ApprovalRow = {
  approval_id: string;
  user_id: string;
  user_name?: string;
  user_patrol?: string;
  kind: "patria" | "progression" | "camping" | "service" | "tribu";
  ref_id: string;
  stage?: string;
  text?: string;
  note?: string;
  nights?: number;
  date?: string;
  start_date?: string;
  end_date?: string;
  place?: string;
  status: "pendiente" | "aprobado" | "rechazado";
  review_note?: string;
  reviewer_name?: string;
  reviewer_credential_code?: string;
  reviewer_credential_doc_path?: string;
  reviewed_at?: string;
  created_at: string;
};

export type GalleryPost = {
  post_id: string;
  user_id: string;
  user_name?: string;
  user_patrol?: string;
  caption: string;
  file_path: string;
  created_at: string;
};

export type PioneroFicha = {
  user_id: string;
  name: string;
  email?: string;
  patrol?: string;
  group_number?: string;
  stage?: string;
  blood_type?: string;
  allergies?: string;
  medical_conditions?: string;
  medical_insurance?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  camping_nights?: number;
};

export type CalendarEvent = {
  event_id: string;
  title: string;
  date: string;
  time?: string;
  place: string;
  description?: string;
  equipment: string[];
  category?: string;
  creator_name?: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = await storage.secureGet<string | null>(SESSION_KEY, null);
  const response = await fetch(`${baseUrl()}/api${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers ?? {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.detail ?? "No se pudo completar la solicitud");
    (error as Error & { status?: number }).status = response.status;
    throw error;
  }
  return payload as T;
}

export async function uploadFile(uri: string, name: string, mime: string, purpose: string): Promise<{ path: string; size: number }> {
  const token = await storage.secureGet<string | null>(SESSION_KEY, null);
  const form = new FormData();
  if (Platform.OS === "web") {
    const blob = await (await fetch(uri)).blob();
    form.append("file", blob, name);
  } else {
    form.append("file", { uri, name, type: mime } as any);
  }
  form.append("purpose", purpose);
  const response = await fetch(`${baseUrl()}/api/upload`, {
    method: "POST",
    body: form,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(payload.detail ?? "No se pudo subir el archivo");
    (err as any).status = response.status;
    throw err;
  }
  return payload;
}

export async function fileUrl(path: string): Promise<string> {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const token = await storage.secureGet<string | null>(SESSION_KEY, null);
  const query = token ? `?token=${encodeURIComponent(token)}` : "";
  return `${baseUrl()}/api/files/${path}${query}`;
}

export const api = {
  register: (body: {
    email: string;
    password: string;
    name: string;
    role?: "pionero" | "dirigente";
    group_number?: string;
    patrol?: string;
    stage?: "busqueda" | "encuentro" | "desafio";
    credential_code?: string;
    master_key?: string;
  }) => request<{ session_token: string; user: User }>("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body: { email: string; password: string }) => request<{ session_token: string; user: User }>("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  googleSession: (session_id: string) => request<{ session_token: string; user: User }>("/auth/session", { method: "POST", body: JSON.stringify({ session_id }) }),
  me: () => request<{ user: User }>("/auth/me"),
  logout: () => request<{ ok: boolean }>("/auth/logout", { method: "POST" }),
  bootstrapStatus: () => request<{ bootstrap_available: boolean }>("/auth/bootstrap-status"),
  getState: () => request<{ state: AppState }>("/state"),
  putState: (state: AppState) => request<{ state: AppState }>("/state", { method: "PUT", body: JSON.stringify({ state }) }),
  updateProfile: (profile: Record<string, unknown>) => request<{ user: User }>("/profile", { method: "PUT", body: JSON.stringify(profile) }),
  // Approvals
  requestApproval: (payload: { kind: "patria" | "progression" | "camping" | "service" | "tribu"; ref_id: string; stage?: string; text?: string; note?: string; nights?: number; date?: string; start_date?: string; end_date?: string; place?: string }) =>
    request<{ approval: ApprovalRow }>("/approvals/request", { method: "POST", body: JSON.stringify(payload) }),
  myApprovals: () => request<{ approvals: ApprovalRow[] }>("/approvals/mine"),
  // Admin
  adminInbox: () => request<{ pending: ApprovalRow[] }>("/admin/approvals/inbox"),
  decideApproval: (approval_id: string, approved: boolean, note?: string) =>
    request<{ ok: boolean; status: string }>(`/admin/approvals/${approval_id}/decide`, { method: "POST", body: JSON.stringify({ approved, note }) }),
  pendingDirigentes: () => request<{ pending: User[] }>("/admin/dirigentes/pending"),
  approveDirigente: (user_id: string) => request<{ ok: boolean }>(`/admin/dirigentes/${user_id}/approve`, { method: "POST" }),
  rejectDirigente: (user_id: string) => request<{ ok: boolean }>(`/admin/dirigentes/${user_id}/reject`, { method: "POST" }),
  // Fichas médicas
  listPioneros: () => request<{ pioneros: PioneroFicha[] }>("/admin/pioneros"),
  // Gallery
  gallery: () => request<{ posts: GalleryPost[] }>("/gallery"),
  publishPost: (caption: string, file_path: string) => request<{ post: GalleryPost }>("/gallery", { method: "POST", body: JSON.stringify({ caption, file_path }) }),
  deletePost: (post_id: string) => request<{ ok: boolean }>(`/gallery/${post_id}`, { method: "DELETE" }),
  // Calendar
  calendar: () => request<{ events: CalendarEvent[] }>("/calendar"),
  createEvent: (event: Omit<CalendarEvent, "event_id" | "creator_name"> & { id?: string }) =>
    request<{ event: CalendarEvent }>("/calendar", { method: "POST", body: JSON.stringify(event) }),
  deleteEvent: (event_id: string) => request<{ ok: boolean }>(`/calendar/${event_id}`, { method: "DELETE" }),
};

export type AppState = {
  progress: Record<string, number>;
  completedProgress: Record<string, number>;
  patria: boolean[];
  patria_status?: string[];
  patria_notes?: string[];
  specialties: string[];
  notes: { id: string; title: string; body: string; date: string }[];
  projects: { id: string; title: string; hours: number; category: string }[];
  service: { id: string; title: string; hours: number }[];
  events: { id: string; title: string; date: string; place: string }[];
  announcements: { id: string; title: string; body: string; date: string }[];
  earthTribe: string[];
  camping?: any[];
  camping_log?: { id: string; place?: string; date?: string; start_date?: string; end_date?: string; nights: number; status: string; review_note?: string }[];
  service_log?: { id: string; title?: string; hours: number; date?: string; note?: string; status: string; review_note?: string }[];
  tribu_tierra?: Record<string, { checks: Record<string, boolean>; approved: boolean; status?: string; review_note?: string; program_name?: string }>;
  notif_seen?: string[];
  progression?: {
    busqueda: { id: string; text: string; area: string; stage: string; done: boolean; approved: boolean; status?: string; review_note?: string; completed_at?: string }[];
    encuentro: { id: string; text: string; area: string; stage: string; done: boolean; approved: boolean; status?: string; review_note?: string; completed_at?: string }[];
    desafio: { id: string; text: string; area: string; stage: string; done: boolean; approved: boolean; status?: string; review_note?: string; completed_at?: string }[];
  };
};

export async function saveToken(token: string) {
  await storage.secureSet(SESSION_KEY, token);
}

export async function clearToken() {
  await storage.secureRemove(SESSION_KEY);
}
