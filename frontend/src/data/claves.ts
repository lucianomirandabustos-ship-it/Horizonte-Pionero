// Datos de referencia para Claves y Códigos Scout.
// Reemplaza los placeholders con imágenes oficiales cuando estén disponibles.

export const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const NUMERICA_MAP: Record<string, string> = {
  A: "1", B: "2", C: "3", D: "4", E: "5", F: "6", G: "7", H: "8", I: "9", J: "10",
  K: "11", L: "12", M: "13", N: "14", Ñ: "15", O: "16", P: "17", Q: "18", R: "19",
  S: "20", T: "21", U: "22", V: "23", W: "24", X: "25", Y: "26", Z: "27",
};

export const ATBASH_MAP: Record<string, string> = Object.fromEntries(
  ABC.split("").map((ch, i) => [ch, ABC[25 - i]])
);

// T9 Celular multi-tap. Cada dígito repetido n veces = n-ésima letra.
export const T9_MAP: Record<string, string> = {
  A: "2", B: "22", C: "222",
  D: "3", E: "33", F: "333",
  G: "4", H: "44", I: "444",
  J: "5", K: "55", L: "555",
  M: "6", N: "66", O: "666",
  P: "7", Q: "77", R: "777", S: "7777",
  T: "8", U: "88", V: "888",
  W: "9", X: "99", Y: "999", Z: "9999",
};

// Braille: patrón de 6 puntos (arriba-abajo, izq-der): 1 4 / 2 5 / 3 6.
export const BRAILLE_MAP: Record<string, string> = {
  A: "1", B: "1,2", C: "1,4", D: "1,4,5", E: "1,5", F: "1,2,4", G: "1,2,4,5", H: "1,2,5",
  I: "2,4", J: "2,4,5", K: "1,3", L: "1,2,3", M: "1,3,4", N: "1,3,4,5", O: "1,3,5",
  P: "1,2,3,4", Q: "1,2,3,4,5", R: "1,2,3,5", S: "2,3,4", T: "2,3,4,5", U: "1,3,6",
  V: "1,2,3,6", W: "2,4,5,6", X: "1,3,4,6", Y: "1,3,4,5,6", Z: "1,3,5,6",
  Ñ: "1,2,4,5,6",
};

// Murciélago: sustitución directa de M-U-R-C-I-E-L-A-G-O por 0-9 (y viceversa).
// Para letras fuera de MURCIELAGO se produce una coordenada fila-columna en dígitos.
export const MURCIELAGO_ORDER = "MURCIELAGO"; // filas y columnas
export const MURCIELAGO_SUB: Record<string, string> = Object.fromEntries(
  MURCIELAGO_ORDER.split("").map((ch, i) => [ch, String(i)])
);
export function murcielagoCoord(ch: string): string | null {
  const up = ch.toUpperCase();
  if (/^[0-9]$/.test(up)) {
    return MURCIELAGO_ORDER[parseInt(up, 10)] ?? null;
  }
  if (MURCIELAGO_SUB[up] !== undefined) {
    return MURCIELAGO_SUB[up];
  }
  const idx = ABC.replace(/Ñ/g, "").indexOf(up);
  if (idx < 0 || idx >= MURCIELAGO_ORDER.length * MURCIELAGO_ORDER.length) return null;
  const row = Math.floor(idx / MURCIELAGO_ORDER.length);
  const col = idx % MURCIELAGO_ORDER.length;
  return `${row}${col}`;
}

// Zigzag: escribe el mensaje en zigzag sobre N filas y lo lee por filas.
export function zigzagEncode(text: string, rails = 3): string {
  const clean = text.toUpperCase().replace(/\s+/g, "");
  if (rails < 2 || !clean) return clean;
  const rows: string[][] = Array.from({ length: rails }, () => []);
  let row = 0;
  let dir = 1;
  for (const ch of clean) {
    rows[row].push(ch);
    if (row === 0) dir = 1;
    else if (row === rails - 1) dir = -1;
    row += dir;
  }
  return rows.map((r) => r.join("")).join(" ");
}

export const CLAVES_CATALOG = [
  { id: "morse", label: "Morse", type: "interactive", icon: "morse-code" },
  { id: "tap", label: "Tap Code", type: "interactive", icon: "grid" },
  { id: "caesar", label: "Cifrado César", type: "interactive", icon: "shield-key-outline" },
  { id: "numerica", label: "Numérica 1-27", type: "interactive", icon: "numeric" },
  { id: "atbash", label: "Inversa (Atbash)", type: "interactive", icon: "swap-horizontal" },
  { id: "t9", label: "Celular T9", type: "interactive", icon: "cellphone-text" },
  { id: "zigzag", label: "Zigzag", type: "interactive", icon: "vector-polyline" },
  { id: "braille", label: "Braille", type: "table", icon: "dots-grid" },
  { id: "murcielago", label: "Murciélago 10×10", type: "table", icon: "matrix" },
  { id: "semaforo", label: "Semáforo", type: "visual", icon: "flag-triangle" },
  { id: "sordomudo", label: "Sordomudo", type: "visual", icon: "hand-back-right-outline" },
  { id: "tierra_aire", label: "Tierra-Aire", type: "visual", icon: "human-handsup" },
  { id: "agujerito", label: "Agujerito", type: "visual", icon: "circle-outline" },
  { id: "siete_cruces", label: "Siete Cruces", type: "visual", icon: "cross" },
] as const;

export type ClaveId = (typeof CLAVES_CATALOG)[number]["id"];
