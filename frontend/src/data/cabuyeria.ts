// Catálogo de nudos, amarres y construcciones pioneras.
// Los diagramas son placeholders con emoji/ícono; reemplazar con SVGs/fotos oficiales.

export type CabuyeriaItem = {
  id: string;
  name: string;
  purpose: string;
  steps: string[];
  icon: string;
  tag: "basico" | "medio" | "avanzado";
  videoUrl?: string;
};

export const NUDOS: CabuyeriaItem[] = [
  {
    id: "rizo", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+nudo+rizo+scout",
    name: "Rizo o Llana",
    purpose: "Unir dos cuerdas del mismo grosor. Rápido de deshacer.",
    steps: [
      "Cruza el chicote derecho sobre el izquierdo y pásalo por debajo.",
      "Vuelve a cruzar el que ahora está a la izquierda sobre el otro.",
      "Ajusta ambos extremos simultáneamente para cerrarlo simétricamente.",
    ],
    icon: "shape-outline",
    tag: "basico",
  },
  {
    id: "cote", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+nudo+vuelta+de+cote+scout",
    name: "Vuelta de COTE",
    purpose: "Sujetar una cuerda a un poste o argolla de manera provisional.",
    steps: [
      "Pasa el chicote alrededor del poste.",
      "Rodea la cuerda principal y mete el chicote por el bucle que formaste.",
      "Ajusta jalando el chicote.",
    ],
    icon: "arrow-u-left-bottom",
    tag: "basico",
  },
  {
    id: "ballestrinque", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+nudo+ballestrinque+scout",
    name: "Ballestrinque",
    purpose: "Amarrar cuerda a poste o vara. Base de la mayoría de amarres.",
    steps: [
      "Da una vuelta al poste con el chicote.",
      "Crúzalo por encima y da otra vuelta paralela.",
      "Pasa el chicote por debajo de la segunda vuelta y tensa.",
    ],
    icon: "link-variant",
    tag: "basico",
  },
  {
    id: "as-de-guia", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+nudo+as+de+guia+scout",
    name: "As de Guía",
    purpose: "Lazo fijo que no se corre. Ideal para rescate.",
    steps: [
      "Forma una gaza pequeña dejando chicote largo.",
      'Pasa el chicote por la gaza "de abajo hacia arriba".',
      "Rodea la cuerda principal y regresa por la gaza.",
      "Ajusta manteniendo la forma del lazo.",
    ],
    icon: "lasso",
    tag: "medio",
  },
  {
    id: "margarita", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+nudo+margarita+scout",
    name: "Margarita",
    purpose: "Acorta una cuerda sin cortarla o refuerza una parte gastada.",
    steps: [
      "Forma dos bucles paralelos en la parte central de la cuerda.",
      "Pasa cada bucle por su lazo respectivo en los extremos.",
      "Tensa progresivamente ambos lados a la vez.",
    ],
    icon: "flower-outline",
    tag: "medio",
  },
  {
    id: "escota", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+nudo+vuelta+de+escota+scout",
    name: "Vuelta de Escota",
    purpose: "Unir dos cuerdas de distinto grosor.",
    steps: [
      "Forma una gaza con la cuerda gruesa.",
      "Pasa el chicote de la cuerda delgada por la gaza.",
      "Rodea la gaza y pasa el chicote por debajo de sí mismo.",
      "Ajusta manteniendo la simetría.",
    ],
    icon: "call-split",
    tag: "medio",
  },
  {
    id: "lenador", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+nudo+lenador+scout",
    name: "Leñador / Mata",
    purpose: "Amarrar y arrastrar un tronco o leña.",
    steps: [
      "Rodea el tronco con la cuerda dejando chicote largo.",
      "Enrolla el chicote sobre la cuerda principal 4-5 veces.",
      "Tira desde el otro extremo: cuanto más se jala, más se aprieta.",
    ],
    icon: "tree-outline",
    tag: "basico",
  },
];

export const AMARRES: CabuyeriaItem[] = [
  {
    id: "cuadrado", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+amarre+cuadrado+scout",
    name: "Amarre Cuadrado",
    purpose: "Unir dos varas perpendiculares (90°). Estructura de mesa o portada.",
    steps: [
      "Comienza con un ballestrinque en la vara vertical bajo la horizontal.",
      "Enrolla la cuerda cruzando alrededor de ambas varas 4 vueltas completas.",
      "Da 3 frapes apretando entre las varas.",
      "Termina con ballestrinque en la vara horizontal.",
    ],
    icon: "grid-large",
    tag: "medio",
  },
  {
    id: "diagonal", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+amarre+diagonal+scout",
    name: "Amarre Diagonal",
    purpose: "Unir dos varas cruzadas en X. Refuerza estructuras.",
    steps: [
      "Empieza con un nudo de vuelta de braza abrazando ambas varas.",
      "Da 3-4 vueltas diagonales en una dirección.",
      "Cambia y da 3-4 vueltas en la otra diagonal.",
      "Da 3 frapes y termina con ballestrinque.",
    ],
    icon: "vector-difference-ab",
    tag: "medio",
  },
  {
    id: "redondo", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+amarre+redondo+scout",
    name: "Amarre Redondo / Paralelo",
    purpose: "Alargar o unir dos varas paralelas para extender su longitud.",
    steps: [
      "Comienza con un ballestrinque abarcando ambas varas.",
      "Enrolla la cuerda unas 8-10 veces con cuidado.",
      "Frapa con 3 vueltas apretadas entre las varas.",
      "Cierra con ballestrinque.",
    ],
    icon: "vector-line",
    tag: "medio",
  },
];

export const CONSTRUCCIONES: CabuyeriaItem[] = [
  {
    id: "tripode", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+tripode+scout",
    name: "Trípode",
    purpose: "Estructura de 3 patas para colgar ollas, banderas o señalizaciones.",
    steps: [
      "Coloca 3 varas paralelas en el suelo.",
      "Haz un ballestrinque en una vara y amarra redondo suelto sobre las tres.",
      "Da 6-8 vueltas alrededor sin apretar demasiado.",
      "Frapa entre las varas alternando.",
      "Levanta y abre las patas formando un trípode estable.",
    ],
    icon: "triangle-outline",
    tag: "avanzado",
  },
  {
    id: "mesa", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+mesa+de+campamento+scout",
    name: "Mesa de Campamento",
    purpose: "Superficie horizontal usando amarres cuadrados y varas planas.",
    steps: [
      "Arma dos rectángulos con amarres cuadrados (marco de la mesa).",
      "Cruza y amarra varas paralelas encima como tablero.",
      "Fija las patas con amarres diagonales para estabilidad.",
    ],
    icon: "table-chair",
    tag: "avanzado",
  },
  {
    id: "portada", videoUrl: "https://www.youtube.com/results?search_query=como+hacer+portada+scout",
    name: "Portada de Salida",
    purpose: "Puerta ceremonial de entrada al campamento.",
    steps: [
      "Levanta dos trípodes o postes con amarres redondos.",
      "Une los postes con una vara transversal usando amarres cuadrados.",
      "Refuerza con vientos y decora con el nombre de la patrulla/unidad.",
    ],
    icon: "door-open",
    tag: "avanzado",
  },
];
