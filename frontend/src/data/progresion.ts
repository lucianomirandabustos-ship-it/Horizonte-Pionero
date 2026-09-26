// 6 áreas de crecimiento oficiales y cuotas por etapa.

export const GROWTH_AREAS = [
  { id: "corporalidad", label: "Corporalidad", icon: "arm-flex", color: "#E63946" },
  { id: "afectividad", label: "Afectividad", icon: "heart-outline", color: "#F4A261" },
  { id: "caracter", label: "Carácter", icon: "shield-star-outline", color: "#F1FAEE" },
  { id: "creatividad", label: "Creatividad", icon: "palette-outline", color: "#A8DADC" },
  { id: "espiritualidad", label: "Espiritualidad", icon: "meditation", color: "#457B9D" },
  { id: "sociabilidad", label: "Sociabilidad", icon: "account-group-outline", color: "#B5838D" },
] as const;

export type GrowthAreaId = (typeof GROWTH_AREAS)[number]["id"];

export const STAGES = [
  { id: "busqueda", label: "Búsqueda", quota: 30, icon: "compass-outline" },
  { id: "encuentro", label: "Encuentro", quota: 35, icon: "tent" },
  { id: "desafio", label: "Desafío", quota: 40, icon: "flag-checkered" },
] as const;

export type StageId = (typeof STAGES)[number]["id"];

export type Objective = {
  id: string;
  text: string;
  area: GrowthAreaId;
  stage: StageId;
  done: boolean;
  approved: boolean;
  completed_at?: string;
  status?: "pendiente" | "aprobado" | "rechazado";
  review_note?: string;
};
