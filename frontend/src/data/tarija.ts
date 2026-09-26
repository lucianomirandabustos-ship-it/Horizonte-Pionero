export type Venue = {
  id: string;
  name: string;
  address: string;
  zone: string;
  features: string[];
  contact?: string;
  mapsQuery: string;
};

export const TARIJA_VENUES: Venue[] = [
  {
    id: "bicentenario",
    name: "Albergue Municipal Bicentenario",
    address: "Av. Víctor Paz Estenssoro, Zona Central / Parque Temático",
    zone: "Cercado · Zona Central",
    features: ["Espacio cerrado", "Baños", "Agua potable", "Seguridad 24 h", "Parqueo"],
    contact: "Tel. Alcaldía Tarija",
    mapsQuery: "Albergue Municipal Bicentenario Tarija",
  },
  {
    id: "san-jacinto",
    name: "Campo Ferial de San Jacinto",
    address: "Carretera a San Jacinto, predios cerrados para delegaciones",
    zone: "Cercado · San Jacinto",
    features: ["Predios cerrados", "Zona de acampada", "Escenario", "Estacionamiento", "Baños"],
    contact: "Gobernación de Tarija",
    mapsQuery: "Campo Ferial San Jacinto Tarija",
  },
  {
    id: "garcia-agreda",
    name: "Complejo Deportivo García Agreda",
    address: "Costanera del Río Guadalquivir",
    zone: "Cercado · Costanera",
    features: ["Polideportivos", "Pabellones cubiertos", "Baños", "Vestuarios", "Áreas verdes"],
    contact: "Servicio Departamental de Deportes",
    mapsQuery: "Complejo García Agreda Tarija",
  },
  {
    id: "san-lorenzo",
    name: "Centro de Entrenamiento / Predios Parroquiales San Lorenzo",
    address: "Plaza Principal, San Lorenzo · Provincia Méndez",
    zone: "San Lorenzo",
    features: ["Salones cerrados", "Comedor comunitario", "Zona verde", "Cocina", "Accesible en bus"],
    contact: "Parroquia San Lorenzo",
    mapsQuery: "San Lorenzo Tarija plaza principal",
  },
  {
    id: "polideportivos-cercado",
    name: "Complejos Polideportivos Educativos Cercado",
    address: "Distintas unidades educativas de la Provincia Cercado",
    zone: "Cercado",
    features: ["Polideportivos cubiertos", "Baños", "Agua", "Coordinación previa con dirección"],
    contact: "SEDUCA Tarija",
    mapsQuery: "Polideportivo educativo Cercado Tarija",
  },
];

export const FIRST_AID = [
  {
    id: "cortes",
    title: "Cortes y heridas leves",
    steps: [
      "Lava tus manos y usa guantes si es posible.",
      "Enjuaga la herida con agua limpia; retira arena/suciedad.",
      "Presiona con gasa estéril hasta detener el sangrado (5-10 min).",
      "Aplica antiséptico y cubre con vendaje.",
      "Cambia la venda a diario y observa signos de infección.",
    ],
  },
  {
    id: "quemaduras",
    title: "Quemaduras de primer grado",
    steps: [
      "Enfría con agua corriente fresca 10-15 min (no hielo).",
      "No revientes ampollas.",
      "Cubre suavemente con gasa estéril.",
      "Analgésico si es necesario; consulta médica si es extensa.",
    ],
  },
  {
    id: "esguince",
    title: "Esguinces y torceduras (R.I.C.E.)",
    steps: [
      "Reposo: evita apoyar la zona.",
      "Ice: aplica hielo envuelto 15 min cada 2 h.",
      "Compresión: venda elástica firme, no apretada.",
      "Elevación: mantén la parte lesionada más arriba del corazón.",
    ],
  },
  {
    id: "picaduras",
    title: "Picaduras de insectos",
    steps: [
      "Retira el aguijón raspando con una tarjeta (no con pinzas).",
      "Lava con agua y jabón; aplica compresa fría.",
      "Vigila signos de alergia: hinchazón, dificultad para respirar.",
      "Si hay reacción severa, busca atención médica de inmediato.",
    ],
  },
  {
    id: "insolacion",
    title: "Insolación y golpe de calor",
    steps: [
      "Traslada a lugar fresco y ventilado.",
      "Retira ropa ajustada; refresca con paños húmedos.",
      "Hidrata con agua o suero oral en sorbos pequeños.",
      "Si hay confusión o desmayo, activa emergencia.",
    ],
  },
  {
    id: "botiquin",
    title: "Botiquín scout esencial",
    steps: [
      "Gasas, vendas y esparadrapo.",
      "Antisépticos (yodo/clorhexidina) y guantes.",
      "Analgésicos, antihistamínico, suero oral.",
      "Tijeras, pinzas, termómetro y silbato.",
      "Manta térmica y guía de contactos de emergencia.",
    ],
  },
];

export const TRIBU_TIERRA_URL = "https://sites.google.com/view/asb-tributierra/tribu-tierra?pli=1&authuser=0";
