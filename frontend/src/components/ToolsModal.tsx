import { useEffect, useMemo, useState } from "react";
import { Image, Linking, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  ATBASH_MAP,
  BRAILLE_MAP,
  CLAVES_CATALOG,
  ClaveId,
  MURCIELAGO_ORDER,
  NUMERICA_MAP,
  T9_MAP,
  murcielagoCoord,
  zigzagEncode,
} from "@/src/data/claves";
import { AMARRES, CONSTRUCCIONES, NUDOS, CabuyeriaItem } from "@/src/data/cabuyeria";
import { CLAVE_DESCRIPTIONS, FOGATAS, REFUGIOS } from "@/src/data/campismo";
import { baseUrl } from "@/src/api";

const MORSE_MAP: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..",
  J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  Ñ: "--.--",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.",
};
const MORSE_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
);

function encodeMorse(text: string) {
  return text.toUpperCase().split("").map((ch) => (ch === " " ? "/" : MORSE_MAP[ch] ?? "")).filter(Boolean).join(" ");
}
function decodeMorse(code: string) {
  return code.trim().split(" ").map((t) => (t === "/" ? " " : MORSE_REVERSE[t] ?? "")).join("");
}

const CLAVE_LOCAL_ASSETS: Record<string, any> = {
  semaforo: require("@/assets/claves/semaforo.jpg"),
  siete_cruces: require("@/assets/claves/siete-cruces.webp"),
  agujerito: require("@/assets/claves/agujerito.jpg"),
  tierra_aire: require("@/assets/claves/tierra-aire.jpg"),
  sordomudo: require("@/assets/claves/sordomudo.jpg"),
};

export function ToolsModal({ kind, onClose, colors, styles }: any) {
  const [tab, setTab] = useState<ClaveId>("morse");
  const [inputText, setInputText] = useState("");
  const [caesarShift, setCaesarShift] = useState(3);
  const [zigzagRails, setZigzagRails] = useState(3);
  const [cabuyeriaTab, setCabuyeriaTab] = useState<"nudos" | "amarres" | "construcciones">("nudos");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (kind === "claves") {
      setTab("morse");
      setInputText("");
    }
    if (kind === "cabuyeria" || kind === "campismo") {
      setCabuyeriaTab("nudos");
      setExpandedItem(null);
    }
  }, [kind]);

  const title = kind === "claves" ? "Claves Scout" : kind === "cabuyeria" ? "Cabuyería" : "Campismo";
  const eyebrow = kind === "claves" ? "HERRAMIENTAS · CLAVES" : kind === "cabuyeria" ? "HERRAMIENTAS · CABUYERÍA" : "HERRAMIENTAS · CAMPISMO";
  const subtitle =
    kind === "claves"
      ? "Codifica y decodifica mensajes de patrulla."
      : kind === "cabuyeria"
      ? "Nudos, amarres y construcciones pioneras."
      : "Fuego, refugio y primeros auxilios en campo.";

  const upper = inputText.toUpperCase();

  const morseOut = useMemo(() => {
    if (tab !== "morse") return "";
    const looksLikeMorse = /^[\.\-\s/]+$/.test(inputText.trim()) && (inputText.includes(".") || inputText.includes("-"));
    return looksLikeMorse ? decodeMorse(inputText) : encodeMorse(inputText);
  }, [inputText, tab]);

  const caesarOut = useMemo(() => {
    if (tab !== "caesar") return "";
    return upper.split("").map((ch) => {
      const code = ch.charCodeAt(0);
      if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + caesarShift + 26) % 26) + 65);
      return ch;
    }).join("");
  }, [upper, caesarShift, tab]);

  const tapOut = useMemo(() => {
    if (tab !== "tap") return "";
    return upper.split("").map((ch) => {
      if (ch === " ") return " / ";
      const idx = "ABCDEFGHIKLMNOPQRSTUVWXYZ".indexOf(ch === "J" ? "I" : ch);
      if (idx < 0) return "";
      const row = Math.floor(idx / 5) + 1;
      const col = (idx % 5) + 1;
      return ".".repeat(row) + " " + ".".repeat(col);
    }).filter(Boolean).join("  ");
  }, [upper, tab]);

  const numericaOut = useMemo(() => {
    if (tab !== "numerica") return "";
    return upper.split("").map((ch) => (ch === " " ? "/" : NUMERICA_MAP[ch] ?? "")).filter(Boolean).join("-");
  }, [upper, tab]);

  const atbashOut = useMemo(() => {
    if (tab !== "atbash") return "";
    return upper.split("").map((ch) => ATBASH_MAP[ch] ?? ch).join("");
  }, [upper, tab]);

  const t9Out = useMemo(() => {
    if (tab !== "t9") return "";
    return upper.split("").map((ch) => (ch === " " ? "/" : T9_MAP[ch] ?? "")).filter(Boolean).join("-");
  }, [upper, tab]);

  const zigzagOut = useMemo(() => (tab === "zigzag" ? zigzagEncode(upper, zigzagRails) : ""), [upper, zigzagRails, tab]);

  const brailleOut = useMemo(() => {
    if (tab !== "braille") return "";
    return upper.split("").map((ch) => (ch === " " ? "/" : BRAILLE_MAP[ch] ? `[${BRAILLE_MAP[ch]}]` : "")).filter(Boolean).join(" ");
  }, [upper, tab]);

  const murcielagoOut = useMemo(() => {
    if (tab !== "murcielago") return "";
    return upper.split("").map((ch) => (ch === " " ? "/" : murcielagoCoord(ch) ?? "")).filter(Boolean).join(" ");
  }, [upper, tab]);

  return (
    <Modal visible={Boolean(kind)} animationType="slide" onRequestClose={onClose} transparent={false}>
      <View style={styles.pdfModal}>
        <View style={styles.pdfModalHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.pdfModalEyebrow}>{eyebrow}</Text>
            <Text style={styles.pdfModalTitle}>{title}</Text>
          </View>
          <Pressable testID="tool-close" onPress={onClose} style={styles.closeButton} accessibilityRole="button">
            <MaterialCommunityIcons name="close" size={22} color={colors.onSurfaceSecondary} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 80 }} keyboardShouldPersistTaps="handled">
          {kind !== "cabuyeria" && <Text style={styles.pageSubtitle}>{subtitle}</Text>}

          {kind === "claves" && (
            <ClavesSection
              tab={tab}
              setTab={setTab}
              inputText={inputText}
              setInputText={setInputText}
              caesarShift={caesarShift}
              setCaesarShift={setCaesarShift}
              zigzagRails={zigzagRails}
              setZigzagRails={setZigzagRails}
              outputs={{ morseOut, caesarOut, tapOut, numericaOut, atbashOut, t9Out, zigzagOut, brailleOut, murcielagoOut }}
              colors={colors}
              styles={styles}
            />
          )}

          {kind === "cabuyeria" && (
            <CabuyeriaSection
              tab={cabuyeriaTab}
              setTab={setCabuyeriaTab}
              expanded={expandedItem}
              setExpanded={setExpandedItem}
              colors={colors}
              styles={styles}
            />
          )}

          {kind === "campismo" && (
            <View testID="campismo-content" style={{ gap: 12 }}>
              <Text style={styles.sectionTitle}>Tipos de fogatas</Text>
              {FOGATAS.map((f) => (
                <View key={f.id} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 8 }]} testID={`fogata-${f.id}`}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <View style={styles.pdfIcon}><MaterialCommunityIcons name="campfire" size={22} color={colors.brandSecondary} /></View>
                    <View style={styles.pdfCopy}>
                      <Text style={styles.pdfTag}>FOGATA</Text>
                      <Text style={styles.pdfTitle}>{f.name}</Text>
                      <Text style={styles.pdfDetail}>{f.use}</Text>
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
                  <Text style={styles.pdfDetail}>Madera: {f.wood}</Text>
                  <Text style={[styles.pdfDetail, { color: colors.error }]}>Seguridad: {f.safety}</Text>
                </View>
              ))}
              <Text style={styles.sectionTitle}>Tipos de refugios</Text>
              {REFUGIOS.map((r) => (
                <View key={r.id} style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 8 }]} testID={`refugio-${r.id}`}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                    <View style={styles.pdfIcon}><MaterialCommunityIcons name="tent" size={22} color={colors.brandSecondary} /></View>
                    <View style={styles.pdfCopy}>
                      <Text style={styles.pdfTag}>REFUGIO</Text>
                      <Text style={styles.pdfTitle}>{r.name}</Text>
                      <Text style={styles.pdfDetail}>{r.use}</Text>
                    </View>
                  </View>
                  {r.steps.map((s, i) => (
                    <View key={i} style={{ flexDirection: "row", gap: 8 }}>
                      <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: colors.onBrandPrimary, fontWeight: "800", fontSize: 11 }}>{i + 1}</Text>
                      </View>
                      <Text style={[styles.helperText, { flex: 1, marginTop: 2 }]}>{s}</Text>
                    </View>
                  ))}
                  <Text style={styles.pdfDetail}>Herramientas: {r.tools}</Text>
                  <Text style={styles.pdfDetail}>Nudos: {r.knots}</Text>
                  <Text style={[styles.pdfDetail, { color: colors.brandSecondary }]}>Sitio: {r.site}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

function ClavesSection({ tab, setTab, inputText, setInputText, caesarShift, setCaesarShift, zigzagRails, setZigzagRails, outputs, colors, styles }: any) {
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 14 }}>
        {CLAVES_CATALOG.map((c) => (
          <Pressable key={c.id} testID={`clave-${c.id}`} onPress={() => setTab(c.id)} style={[styles.chip, tab === c.id && styles.chipActive]}>
            <MaterialCommunityIcons name={c.icon as any} size={13} color={tab === c.id ? colors.onBrandPrimary : colors.onSurfaceSecondary} />
            <Text style={[styles.chipText, tab === c.id && styles.chipTextActive]}>  {c.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {tab === "morse" && (
        <View>
          <Text style={styles.helperText}>Escribe texto para codificar, o puntos/rayas (con espacio y &quot;/&quot; entre palabras) para decodificar.</Text>
          <TextInput testID="morse-input" value={inputText} onChangeText={setInputText} style={[styles.input, styles.textArea]} multiline placeholder="SIEMPRE LISTO  o  ... .. . -- .--. .-. ." placeholderTextColor={styles.placeholder.color} autoCapitalize="characters" />
          <Output label="RESULTADO" value={outputs.morseOut} styles={styles} testID="morse-output" />
          <Text style={styles.sectionTitle}>Tabla Morse</Text>
          <View style={styles.morseGrid}>
            {Object.entries(MORSE_MAP).slice(0, 27).map(([ch, code]) => (
              <View key={ch} style={styles.morseCell}>
                <Text style={styles.morseChar}>{ch}</Text>
                <Text style={styles.morseCode}>{code}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {tab === "tap" && (
        <View>
          <Text style={styles.helperText}>Codifica en Tap Code (matriz 5×5 Polybios, J → I).</Text>
          <ClaveInput testID="tap-input" value={inputText} onChange={setInputText} styles={styles} placeholder="SIEMPRE LISTO" />
          <Output label="RESULTADO" value={outputs.tapOut} styles={styles} testID="tap-output" />
        </View>
      )}

      {tab === "caesar" && (
        <View>
          <Text style={styles.helperText}>Desplazamiento: {caesarShift}. Ajusta con +/−.</Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
            <Pressable testID="caesar-minus" onPress={() => setCaesarShift((s: number) => (s - 1 + 26) % 26)} style={styles.chip}><Text style={styles.chipText}>−</Text></Pressable>
            <Pressable testID="caesar-plus" onPress={() => setCaesarShift((s: number) => (s + 1) % 26)} style={styles.chip}><Text style={styles.chipText}>+</Text></Pressable>
            <Pressable testID="caesar-reset" onPress={() => setCaesarShift(3)} style={styles.chip}><Text style={styles.chipText}>Reset (3)</Text></Pressable>
          </View>
          <ClaveInput testID="caesar-input" value={inputText} onChange={setInputText} styles={styles} placeholder="MENSAJE SECRETO" />
          <Output label="RESULTADO" value={outputs.caesarOut} styles={styles} testID="caesar-output" />
        </View>
      )}

      {tab === "numerica" && (
        <View>
          <Text style={styles.helperText}>A = 1, B = 2, … Z = 27 (incluye Ñ = 15).</Text>
          <ClaveInput testID="numerica-input" value={inputText} onChange={setInputText} styles={styles} placeholder="PIONEROS" />
          <Output label="RESULTADO" value={outputs.numericaOut} styles={styles} testID="numerica-output" />
          <Text style={styles.sectionTitle}>Tabla Numérica</Text>
          <View style={styles.morseGrid}>
            {Object.entries(NUMERICA_MAP).map(([ch, n]) => (
              <View key={ch} style={styles.morseCell}>
                <Text style={styles.morseChar}>{ch}</Text>
                <Text style={styles.morseCode}>{n}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {tab === "atbash" && (
        <View>
          <Text style={styles.helperText}>Alfabeto invertido: A ↔ Z, B ↔ Y, C ↔ X…</Text>
          <ClaveInput testID="atbash-input" value={inputText} onChange={setInputText} styles={styles} placeholder="LEAL Y SERVICIAL" />
          <Output label="RESULTADO" value={outputs.atbashOut} styles={styles} testID="atbash-output" />
        </View>
      )}

      {tab === "t9" && (
        <View>
          <Text style={styles.helperText}>Multi-tap del teclado numérico: A=2, B=22, C=222, D=3…</Text>
          <ClaveInput testID="t9-input" value={inputText} onChange={setInputText} styles={styles} placeholder="HOLA" />
          <Output label="RESULTADO" value={outputs.t9Out} styles={styles} testID="t9-output" />
        </View>
      )}

      {tab === "zigzag" && (
        <View>
          <Text style={styles.helperText}>Filas: {zigzagRails}. Escribe el mensaje sin espacios.</Text>
          <View style={{ flexDirection: "row", gap: 10, marginTop: 8 }}>
            <Pressable testID="zigzag-minus" onPress={() => setZigzagRails((r: number) => Math.max(2, r - 1))} style={styles.chip}><Text style={styles.chipText}>−</Text></Pressable>
            <Pressable testID="zigzag-plus" onPress={() => setZigzagRails((r: number) => Math.min(6, r + 1))} style={styles.chip}><Text style={styles.chipText}>+</Text></Pressable>
          </View>
          <ClaveInput testID="zigzag-input" value={inputText} onChange={setInputText} styles={styles} placeholder="MENSAJESECRETO" />
          <Output label="RESULTADO" value={outputs.zigzagOut} styles={styles} testID="zigzag-output" />
        </View>
      )}

      {tab === "braille" && (
        <View>
          <Text style={styles.helperText}>Puntos activos del patrón Braille (1-4 arriba, 2-5 medio, 3-6 abajo).</Text>
          <ClaveInput testID="braille-input" value={inputText} onChange={setInputText} styles={styles} placeholder="ASB" />
          <Output label="RESULTADO" value={outputs.brailleOut} styles={styles} testID="braille-output" />
          <Text style={styles.sectionTitle}>Tabla Braille</Text>
          <View style={styles.morseGrid}>
            {Object.entries(BRAILLE_MAP).map(([ch, pts]) => (
              <View key={ch} style={styles.morseCell}>
                <Text style={styles.morseChar}>{ch}</Text>
                <Text style={styles.morseCode}>{pts}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {tab === "murcielago" && (
        <View>
          <Text style={styles.helperText}>Sustitución MURCIELAGO. Cada letra reemplaza a un dígito de 0 a 9:  M=0 · U=1 · R=2 · C=3 · I=4 · E=5 · L=6 · A=7 · G=8 · O=9. Para letras fuera de MURCIELAGO se usa la coordenada fila-columna en la matriz 10×10.</Text>
          <ClaveInput testID="murcielago-input" value={inputText} onChange={setInputText} styles={styles} placeholder="SCOUT" />
          <Output label="RESULTADO" value={outputs.murcielagoOut} styles={styles} testID="murcielago-output" />
          <Text style={styles.sectionTitle}>Tabla de sustitución</Text>
          <View style={styles.morseGrid}>
            {MURCIELAGO_ORDER.split("").map((ch, i) => (
              <View key={ch} style={styles.morseCell} testID={`murcielago-cell-${ch}`}>
                <Text style={styles.morseChar}>{ch}</Text>
                <Text style={styles.morseCode}>{i}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {["semaforo", "sordomudo", "tierra_aire", "agujerito", "siete_cruces"].includes(tab) && (
        <View testID={`clave-visual-${tab}`}>
          <Text style={styles.helperText}>{CLAVE_DESCRIPTIONS[tab as string] ?? ""}</Text>
          <View style={{ marginTop: 14, borderRadius: 18, overflow: "hidden", backgroundColor: colors.surfaceTertiary }}>
            <Image
              source={CLAVE_LOCAL_ASSETS[tab] || { uri: `${baseUrl()}/api/claves/${tab}` }}
              style={{ width: "100%", height: 480, resizeMode: "contain", backgroundColor: "#FFFFFF" }}
              accessibilityLabel={String(CLAVES_CATALOG.find((c) => c.id === tab)?.label || tab)}
            />
          </View>
        </View>
      )}
    </>
  );
}

function CabuyeriaSection({ tab, setTab, expanded, setExpanded, colors, styles }: any) {
  const list: CabuyeriaItem[] = tab === "nudos" ? NUDOS : tab === "amarres" ? AMARRES : CONSTRUCCIONES;
  const catalog = [
    { id: "nudos", label: "Nudos" },
    { id: "amarres", label: "Amarres" },
    { id: "construcciones", label: "Construcciones" },
  ];
  return (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingVertical: 14 }}>
        {catalog.map((c) => (
          <Pressable key={c.id} testID={`cabuyeria-tab-${c.id}`} onPress={() => setTab(c.id)} style={[styles.chip, tab === c.id && styles.chipActive]}>
            <Text style={[styles.chipText, tab === c.id && styles.chipTextActive]}>{c.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={{ gap: 12 }}>
        {list.map((item) => (
          <Pressable
            key={item.id}
            testID={`cabuyeria-item-${item.id}`}
            onPress={() => setExpanded(expanded === item.id ? null : item.id)}
            style={[styles.pdfCard, { flexDirection: "column", alignItems: "stretch", gap: 8 }]}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={styles.pdfIcon}>
                <MaterialCommunityIcons name={item.icon as any} size={22} color={colors.brandSecondary} />
              </View>
              <View style={styles.pdfCopy}>
                <Text style={styles.pdfTag}>{item.tag.toUpperCase()}</Text>
                <Text style={styles.pdfTitle}>{item.name}</Text>
                <Text style={styles.pdfDetail}>{item.purpose}</Text>
              </View>
              <MaterialCommunityIcons name={expanded === item.id ? "chevron-up" : "chevron-down"} size={22} color={colors.onSurfaceSecondary} />
            </View>
            {expanded === item.id && (
              <View style={{ paddingTop: 6, gap: 6 }} testID={`cabuyeria-steps-${item.id}`}>
                {item.steps.map((step, idx) => (
                  <View key={idx} style={{ flexDirection: "row", gap: 8, alignItems: "flex-start" }}>
                    <View style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: colors.brandPrimary, alignItems: "center", justifyContent: "center" }}>
                      <Text style={{ color: colors.onBrandPrimary, fontWeight: "800", fontSize: 11 }}>{idx + 1}</Text>
                    </View>
                    <Text style={[styles.helperText, { flex: 1, marginTop: 2 }]}>{step}</Text>
                  </View>
                ))}
                {item.videoUrl && (
                  <Pressable testID={`cabuyeria-video-${item.id}`} onPress={() => Linking.openURL(item.videoUrl!).catch(() => undefined)} style={[styles.primaryButton, { alignSelf: "stretch", marginTop: 6, flexDirection: "row", gap: 8 }]}>
                    <MaterialCommunityIcons name="youtube" size={18} color={colors.onBrandPrimary} />
                    <Text style={styles.primaryButtonText}>Ver video explicativo</Text>
                  </Pressable>
                )}
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </>
  );
}

function ClaveInput({ testID, value, onChange, styles, placeholder }: any) {
  return (
    <TextInput
      testID={testID}
      value={value}
      onChangeText={onChange}
      style={[styles.input, styles.textArea, { marginTop: 12 }]}
      multiline
      placeholder={placeholder}
      placeholderTextColor={styles.placeholder.color}
      autoCapitalize="characters"
    />
  );
}

function Output({ label, value, styles, testID }: any) {
  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text testID={testID} style={styles.resultText} selectable>{value || "—"}</Text>
    </View>
  );
}

export default ToolsModal;
