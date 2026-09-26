/**
 * Guía Oficial de la Agenda del Pionero (100% Offline)
 * Asociación de Scouts de Bolivia (ASB) - Rama Pioneros (15 a 17 años)
 * 
 * Contenido pedagógico integral:
 * - Identidad, Mística y Simbolismo de la Rama
 * - Las 6 Áreas de Formación / Crecimiento con TODOS sus Objetivos Educativos por Etapa
 * - La Patrulla, Cargos, Órganos de Gobierno y Carta de Unidad
 * - La Empresa Pionera (Metodología de Proyectos en 5 Fases)
 * - Los 10 Artículos de la Ley Scout explicados para la juventud actual
 * - Requisitos y los 15 Puntos de la Insignia de Máxima Distinción: Scout de la Patria
 */

export interface GrowthAreaDetail {
  id: string;
  name: string;
  icon: string;
  color: string;
  definition: string;
  objectivesByStage: {
    stage: "Búsqueda (30)" | "Encuentro (35)" | "Desafío (40)";
    stageDesc: string;
    items: string[];
  }[];
}

export interface AgendaSubsection {
  title: string;
  description: string;
  points?: string[];
}

export interface AgendaSection {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  content: string[];
  keyPoints?: { label: string; text: string }[];
  subsections?: AgendaSubsection[];
  growthAreas?: GrowthAreaDetail[];
}

export const AGENDA_SECTIONS: AgendaSection[] = [
  // =========================================================================
  // SECCIÓN 1: IDENTIDAD Y MÍSTICA PIONERA
  // =========================================================================
  {
    id: "identidad",
    title: "Identidad y Mística Pionera",
    subtitle: "El horizonte de los 15 a 17 años en la Asociación de Scouts de Bolivia",
    icon: "compass-rose",
    content: [
      "El Pionero es un joven en camino hacia la adultez que no se conforma con ser un espectador de la realidad: explora nuevos caminos, desafía sus propios límites y asume un compromiso activo con la construcción de un mundo mejor.",
      "La Rama Pioneros (jóvenes de 15 a 17 años) vive la mística del Viaje, la Exploración, la Cumbre y el Horizonte. El pionero abre sendas donde antes no había huella y convierte las dificultades en oportunidades de aprendizaje.",
      "Nuestro lema oficial es: '¡Siempre Listo para Servir!'. No es un lema pasivo ni una fórmula ceremonial; es la disposición permanente de actuar con generosidad, competencia técnica y prontitud frente a las necesidades del prójimo y de la sociedad boliviana.",
    ],
    keyPoints: [
      { label: "Lema Oficial", text: "¡Siempre Listo para Servir!" },
      { label: "Color de Rama", text: "Rojo Carmesí (símbolo de calor humano, audacia, pasión y fuerza) y Azul Horizonte (lealtad y trascendencia)." },
      { label: "La Horquilla de Madera", text: "Vara de marcha bifurcada en 'Y' que simboliza la permanente encrucijada de decisiones éticas y vocacionales que el caminante debe tomar con criterio propio." },
      { label: "La Rosa de los Vientos", text: "Brújula moral orientada hacia los 4 puntos cardinales que recuerda la fidelidad a los principios scouts en cualquier circunstancia." },
      { label: "La Cumbre y el Fuego", text: "Aspirar a las metas más elevadas manteniendo encendida la llama de la amistad sincera y el calor fraterno en el campamento." },
    ],
    subsections: [
      {
        title: "La Ceremonia de Investidura del Pionero",
        description: "Momento solemne en el que el joven recibe los símbolos de la rama: la Horquilla, el parche de la Rosa de los Vientos y la cinta roja, comprometiéndose a liderar su propio proyecto de vida.",
        points: [
          "Presentación del aspirante por su Guía de Patrulla ante el Consejo de Unidad.",
          "Entrega de la Horquilla tallada o personalizada por el propio pionero.",
          "Renovación voluntaria y consciente de la Promesa Scout ante el fuego o en la cumbre.",
        ],
      },
    ],
  },

  // =========================================================================
  // SECCIÓN 2: LAS 6 ÁREAS DE FORMACIÓN Y TODOS SUS OBJETIVOS EDUCATIVOS
  // =========================================================================
  {
    id: "areas-crecimiento",
    title: "Las 6 Áreas de Formación y Objetivos Educativos",
    subtitle: "El mapa integral de desarrollo personal en las etapas de Búsqueda, Encuentro y Desafío",
    icon: "target-variant",
    content: [
      "En el Escultismo boliviano y mundial, la formación del joven no es académica, sino integral. Abarca todas las dimensiones del ser humano agrupadas en 6 Áreas de Crecimiento / Formación.",
      "Para avanzar a través de las etapas de progresión (Búsqueda: 30 objetivos, Encuentro: 35 objetivos y Desafío: 40 objetivos), el pionero formula y alcanza metas concretas en cada una de estas áreas, acompañado por su Guía de Patrulla y Dirigente Asesor.",
    ],
    growthAreas: [
      {
        id: "corporalidad",
        name: "Corporalidad",
        icon: "arm-flex",
        color: "#E63946",
        definition:
          "Desarrollo consciente del cuerpo, la salud física, la nutrición adecuada, la prevención de riesgos y adicciones, y el respeto por los ritmos biológicos.",
        objectivesByStage: [
          {
            stage: "Búsqueda (30)",
            stageDesc: "Autoconocimiento y hábitos básicos de salud",
            items: [
              "Acepta y valora su propio cuerpo y los cambios biológicos propios de la adolescencia.",
              "Mantiene hábitos regulares de higiene personal en la ciudad y en campamento.",
              "Conoce y practica una alimentación balanceada adecuada para el esfuerzo físico.",
              "Practica un deporte o actividad física regular al menos dos veces por semana.",
              "Conoce las medidas de prevención contra el consumo de tabaco, alcohol y drogas.",
            ],
          },
          {
            stage: "Encuentro (35)",
            stageDesc: "Resistencia física y prevención activa",
            items: [
              "Supera pruebas de resistencia física dosificada (marchas de montaña de media jornada).",
              "Aplica técnicas de primeros auxilios y estabilización inmediata ante traumatismos comunes.",
              "Adopta hábitos de sueño reparador y manejo del cansancio en periodos de alta exigencia.",
              "Difunde activamente en su patrulla información preventiva sobre adicciones y salud sexual responsable.",
              "Mantiene su ficha médica personal actualizada y conoce su grupo sanguíneo y alergias.",
              "Demuestra disciplina y cuidado en el uso de herramientas de campamento (hacha, machete, hornallas).",
            ],
          },
          {
            stage: "Desafío (40)",
            stageDesc: "Autonomía física y liderazgo en seguridad",
            items: [
              "Completa una expedición o raid de alta exigencia física demostrando autocontrol y resistencia.",
              "Diseña y supervisa el plan de seguridad e higiene de su unidad en un campamento de al menos 4 días.",
              "Promueve en su comunidad escolar o vecinal jornadas de salud preventiva o vida sana.",
              "Posee certificación en Soporte Básico de Vida o primeros auxilios avanzados.",
              "Adopta la actividad física como un estilo de vida permanente y equilibrado.",
              "Reconoce y gestiona de manera saludable las señales físicas del estrés y la ansiedad.",
              "Actúa como socorrista de primer contacto en simulacros o emergencias reales de la unidad.",
            ],
          },
        ],
      },
      {
        id: "creatividad",
        name: "Creatividad",
        icon: "palette-outline",
        color: "#A8DADC",
        definition:
          "Capacidad de innovar, pensar críticamente, resolver problemas prácticos, expresarse a través del arte y aplicar la ciencia y la tecnología con sentido ético.",
        objectivesByStage: [
          {
            stage: "Búsqueda (30)",
            stageDesc: "Curiosidad intelectual e inventiva básica",
            items: [
              "Aplica su ingenio para resolver imprevistos técnicos durante las acampadas de patrulla.",
              "Desarrolla habilidades manuales en construcciones de madera, cabuyería y tallado.",
              "Participa activamente en la creación de dinámicas, sketches o ambientaciones para el fogón.",
              "Utiliza fuentes confiables para investigar temas scouts y escolares, contrastando información.",
              "Aprende el uso constructivo de herramientas digitales y aplicaciones móviles.",
            ],
          },
          {
            stage: "Encuentro (35)",
            stageDesc: "Innovación técnica y expresión artística",
            items: [
              "Diseña soluciones rústicas innovadoras para mejorar el confort y la ecología del campamento.",
              "Expresa sus ideas y emociones a través de una disciplina artística (música, fotografía, dibujo, redacción).",
              "Aporta ideas originales y viables durante la formulación de la Empresa de Unidad.",
              "Aprende a programar, utilizar sensores o construir dispositivos mecánicos o electrónicos simples.",
              "Lee periódicamente libros o artículos de divulgación científica, cultural o social.",
              "Propone alternativas creativas ante conflictos o estancamientos en el trabajo de equipo.",
            ],
          },
          {
            stage: "Desafío (40)",
            stageDesc: "Pensamiento crítico y proyectos transformadores",
            items: [
              "Lidera el diseño y la dirección técnica de una obra pionera compleja o proyecto digital innovador.",
              "Demuestra un pensamiento crítico independiente frente a las opiniones de masas y noticias falsas.",
              "Publica crónicas, ensayos o registros visuales de alta calidad en el Libro de Oro de la unidad.",
              "Desarrolla una especialidad técnica avanzada que beneficie directamente a su comunidad.",
              "Organiza un evento cultural, científico o artístico para los grupos scouts del distrito.",
              "Aplica metodologías ágiles de diseño (Design Thinking) para solucionar problemas de su entorno.",
              "Enseña a scouts menores a desarrollar su ingenio y habilidades manuales sin temor a equivocarse.",
            ],
          },
        ],
      },
      {
        id: "caracter",
        name: "Carácter",
        icon: "shield-star-outline",
        color: "#F1FAEE",
        definition:
          "Construcción de la propia identidad, firmeza en los principios morales, coherencia con la Ley y Promesa Scout, resiliencia y honestidad a toda prueba.",
        objectivesByStage: [
          {
            stage: "Búsqueda (30)",
            stageDesc: "Autenticidad y responsabilidad inicial",
            items: [
              "Identifica sus principales virtudes, debilidades e intereses personales con sinceridad.",
              "Asume con puntualidad y responsabilidad los compromisos contraídos con su patrulla.",
              "Actúa con honestidad en sus estudios, familia y actividades scouts, sin engaños.",
              "Acepta las observaciones fraternas de sus dirigentes y compañeros de patrulla con madurez.",
              "Mantiene el optimismo y la buena disposición aun frente a tareas difíciles o climas adversos.",
            ],
          },
          {
            stage: "Encuentro (35)",
            stageDesc: "Coherencia ética y perseverancia",
            items: [
              "Demuestra coherencia entre lo que dice, piensa y hace, defendiendo la justicia.",
              "Supera los fracasos o desilusiones perseverando hasta alcanzar los objetivos fijados.",
              "Defiende sus convicciones con serenidad y respeto, sin ceder ante presiones indebidas del grupo.",
              "Acepta con gallardía las consecuencias de sus errores y repara el daño causado si corresponde.",
              "Demuestra lealtad incondicional a su patrulla y a la palabra empeñada.",
              "Formula su propio Plan de Vida y Progresión evaluándolo periódicamente con su asesor.",
            ],
          },
          {
            stage: "Desafío (40)",
            stageDesc: "Madurez moral y liderazgo íntegro",
            items: [
              "Es un referente de integridad y testimonio vivo de la Ley y Promesa Scout en todos los ámbitos.",
              "Toma decisiones difíciles guiado exclusivamente por la ética, el bien común y la verdad.",
              "Mantiene la calma, la claridad mental y el coraje moral durante situaciones de crisis o emergencia.",
              "Ejerce la autocrítica constructiva y busca constantemente perfeccionar su carácter.",
              "Demuestra generosidad de espíritu, sabiendo perder y ganar con dignidad y humildad.",
              "Muestra una conducta intachable que inspira a los scouts de ramas menores a ser mejores.",
              "Reafirma solemnemente su compromiso con el país de cara a la insignia Scout de la Patria.",
            ],
          },
        ],
      },
      {
        id: "afectividad",
        name: "Afectividad",
        icon: "heart-outline",
        color: "#F4A261",
        definition:
          "Autoconocimiento emocional, cultivo de amistades profundas, vivencia madura del amor y la sexualidad, y empatía en las relaciones familiares y sociales.",
        objectivesByStage: [
          {
            stage: "Búsqueda (30)",
            stageDesc: "Expresión emocional y respeto familiar",
            items: [
              "Reconoce y nombra sus emociones (alegría, rabia, frustración, miedo) sin reprimirlas ni violentarse.",
              "Mantiene una comunicación respetuosa y colaborativa dentro del hogar familiar.",
              "Establece lazos de amistad leal y compañerismo sincero con todos los integrantes de su patrulla.",
              "Respeta la intimidad, la dignidad y el espacio personal de sus pares.",
              "Evita el chisme, la burla y las actitudes que puedan herir la sensibilidad de los demás.",
            ],
          },
          {
            stage: "Encuentro (35)",
            stageDesc: "Madurez relacional y afecto constructivo",
            items: [
              "Comprende que la sexualidad humana es una dimensión integral basada en el respeto, el afecto y la responsabilidad.",
              "Escucha con empatía los problemas de sus compañeros brindando apoyo fraternal oportuno.",
              "Resuelve desacuerdos interpersonales a través del diálogo sereno, evitando el resentimiento.",
              "Colabora activamente en la armonía familiar asumiendo tareas concretas en el hogar.",
              "Reconoce el valor de la ternura y la sensibilidad sin considerarlas signos de debilidad.",
              "Acepta y respeta la diversidad en las formas de sentir y expresarse de los demás.",
            ],
          },
          {
            stage: "Desafío (40)",
            stageDesc: "Compromiso afectivo y empatía profunda",
            items: [
              "Construye relaciones interpersonales maduras, duraderas y libres de dependencias dañinas.",
              "Acompaña con paciencia y sabiduría a compañeros que atraviesan dificultades emocionales.",
              "Maneja el perdón y la reconciliación como herramientas indispensables para la paz comunitaria.",
              "Demuestra una actitud de afecto y gratitud sincera hacia sus padres, familiares y mentores.",
              "Promueve activamente espacios de diálogo afectivo y confianza mutua en la unidad pionera.",
              "Vive el amor como una decisión de entrega desinteresada y servicio al prójimo.",
              "Demuestra madurez afectiva para afrontar despedidas, transiciones y nuevos comienzos.",
            ],
          },
        ],
      },
      {
        id: "sociabilidad",
        name: "Sociabilidad",
        icon: "account-group-outline",
        color: "#B5838D",
        definition:
          "Compromiso cívico con la comunidad boliviana, ejercicio democrático de la ciudadanía, defensa de los Derechos Humanos, cultura de paz y servicio voluntario constante.",
        objectivesByStage: [
          {
            stage: "Búsqueda (30)",
            stageDesc: "Integración a la patrulla y normas sociales",
            items: [
              "Cumple puntualmente con los acuerdos democráticos del Consejo de Patrulla y la Carta de Unidad.",
              "Conoce y respeta las normas de convivencia ciudadana y el cuidado de los espacios públicos.",
              "Participa con entusiasmo en las acciones de servicio comunitario planificadas por la unidad.",
              "Valora la diversidad cultural, étnica y lingüística de las diversas regiones de Bolivia.",
              "Cuida y protege los bienes y herramientas compartidas de la patrulla y el grupo scout.",
            ],
          },
          {
            stage: "Encuentro (35)",
            stageDesc: "Liderazgo participativo y servicio continuado",
            items: [
              "Desempeña con probidad y dinamismo un cargo de responsabilidad formal en su patrulla.",
              "Participa en proyectos comunitarios que atiendan necesidades reales de sectores vulnerables.",
              "Conoce los derechos y deberes fundamentales establecidos en la Constitución Política del Estado.",
              "Promueve la inclusión de jóvenes sin distinción de condición económica, credo o capacidad.",
              "Contribuye a crear una atmósfera de juego limpio, equidad y respeto en todas las actividades.",
              "Se interesa por la realidad socioeconómica de su municipio (Tarija) y país, debatiendo con fundamento.",
            ],
          },
          {
            stage: "Desafío (40)",
            stageDesc: "Impacto comunitario y ciudadanía ejemplar",
            items: [
              "Diseña, gestiona y evalúa un proyecto de desarrollo comunitario o ecológico de alto impacto.",
              "Ejerce un liderazgo democrático y servicial facilitando el crecimiento de sus compañeros.",
              "Defiende activamente los Derechos Humanos y la cultura de paz ante situaciones de injusticia.",
              "Participa en redes juveniles o mesas de trabajo de voluntariado a nivel distrital o departamental.",
              "Demuestra compromiso cívico activo y conocimiento de las instituciones del Estado boliviano.",
              "Orienta a los pioneros más nuevos en el funcionamiento del sistema de patrullas y la asamblea.",
              "Se prepara para asumir su rol ciudadano adulto como un agente positivo de cambio social.",
            ],
          },
        ],
      },
      {
        id: "espiritualidad",
        name: "Espiritualidad",
        icon: "meditation",
        color: "#457B9D",
        definition:
          "Búsqueda del sentido trascendente de la vida, vivencia profunda y coherente de la propia fe, respeto ecuménico a las diversas creencias y contemplación de la Creación.",
        objectivesByStage: [
          {
            stage: "Búsqueda (30)",
            stageDesc: "Reflexión personal y admiración por la naturaleza",
            items: [
              "Participa con respeto y atención en los momentos de reflexión y oración de la unidad.",
              "Descubre la presencia divina y la belleza del orden universal a través de la naturaleza.",
              "Conoce y practica los principios de su propia religión o fe espiritual.",
              "Respeta con sincera fraternidad las convicciones religiosas diferentes de otros scouts.",
              "Dedica momentos de silencio personal para examinar sus actos cotidianos.",
            ],
          },
          {
            stage: "Encuentro (35)",
            stageDesc: "Vivencia de la fe y diálogo interreligioso",
            items: [
              "Profundiza en las enseñanzas morales y espirituales de su propia confesión religiosa.",
              "Prepara y conduce oraciones o ceremonias ecuménicas respetuosas para el campamento.",
              "Reconoce en el servicio desinteresado al prójimo la más alta manifestación espiritual.",
              "Estudia la importancia de la espiritualidad andina y originaria en armonía con la Madre Tierra.",
              "Mantiene la esperanza y la paz interior en momentos de tribulación y dificultad.",
              "Integra los valores espirituales en sus decisiones cotidianas y relaciones familiares.",
            ],
          },
          {
            stage: "Desafío (40)",
            stageDesc: "Trascendencia vivida y vocación de servicio",
            items: [
              "Vive su fe con convicción, alegría y testimonio coherente, sin fanatismos ni hipocresía.",
              "Define su escala de valores espirituales como cimiento fundamental de su proyecto de vida.",
              "Es un promotor activo del diálogo interreligioso, la tolerancia y la fraternidad universal.",
              "Encuentra en la contemplación de la naturaleza una fuente permanente de renovación interior.",
              "Participa activamente en su comunidad religiosa o espacios de desarrollo espiritual.",
              "Guía con sensibilidad y respeto a scouts que buscan orientación sobre el sentido de la vida.",
              "Vive la Promesa Scout como una consagración sagrada de servicio al Creador y a la Patria.",
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // SECCIÓN 3: LA PATRULLA, CARGOS Y LA CARTA DE UNIDAD
  // =========================================================================
  {
    id: "patrulla-unidad",
    title: "La Patrulla y la Carta de Unidad",
    subtitle: "El sistema democrático de autogobierno scout",
    icon: "account-group",
    content: [
      "El Escultismo funciona a través del Sistema de Patrullas, ideado por Baden-Powell como la escuela definitiva de carácter, democracia y hermandad.",
      "La Patrulla Pionera es un equipo permanente de 5 a 7 jóvenes con identidad propia: nombre de tótem (animal o elemento natural), lema, colores, banderín y tradiciones.",
    ],
    keyPoints: [
      { label: "Guía de Patrulla", text: "Líder servidor electo o designado. Coordina actividades, anima a sus compañeros y representa a la patrulla en la Corte de Honor y Asamblea." },
      { label: "Subguía", text: "Mano derecha del Guía. Supervisa la logística, administra los detalles operativos y asume el mando en ausencia del Guía." },
      { label: "Intendente de Material", text: "Custodia, revisa, repara y clasifica las herramientas, carpas, cuerdas y menaje de campamento. Nadie sale sin su control de inventario." },
      { label: "Tesorero de Patrulla", text: "Administra las cuotas semanales, elabora presupuestos para campamentos y compras de insumos, rindiendo cuentas claras en cada reunión." },
      { label: "Secretario y Cronista", text: "Lleva el Libro de Actas, redacta las crónicas de cada salida para el Libro de Oro y mantiene el archivo histórico de patrulla." },
      { label: "Sanitario / Socorrista", text: "Mantiene provisto el botiquín de patrulla, conoce los datos médicos esenciales de sus compañeros y vela por la higiene en campo." },
    ],
    subsections: [
      {
        title: "La Carta de Unidad: Constitución Ética",
        description: "Documento sagrado redactado, debatido y firmado solemnemente por todos los miembros de la unidad pionera al inicio de cada gestión scout.",
        points: [
          "Establece las reglas claras de convivencia fraterna y respeto mutuo.",
          "Fija las metas comunitarias, ecológicas y de servicio que la unidad se compromete a alcanzar.",
          "Define los mecanismos de mediación y resolución de desacuerdos internos.",
          "Se evalúa periódicamente en la Asamblea de Unidad para verificar su cumplimiento.",
        ],
      },
      {
        title: "Órganos de Gobierno en la Rama Pioneros",
        description: "Estructuras formales donde se toman decisiones mediante el ejercicio democrático y la deliberación responsable.",
        points: [
          "Consejo de Patrulla: Reunión íntima y periódica de todos los miembros de la patrulla para planificar actividades y evaluar su marcha.",
          "Corte de Honor / Consejo de Unidad: Formado por los Guías, Subguías y Dirigentes para resolver aspectos disciplinarios, evaluar progresiones y coordinar el calendario.",
          "Asamblea de Unidad: Reunión plenaria de todos los pioneros de la unidad donde se vota y aprueba democráticamente la Empresa Pionera.",
        ],
      },
    ],
  },

  // =========================================================================
  // SECCIÓN 4: LA EMPRESA PIONERA (METODOLOGÍA DE PROYECTOS)
  // =========================================================================
  {
    id: "empresa-pionera",
    title: "La Empresa Pionera",
    subtitle: "Aprender haciendo a través de grandes proyectos autogestionados",
    icon: "rocket-launch-outline",
    content: [
      "La Empresa es la herramienta pedagógica central de la Rama Pioneros. Es una gran aventura colectiva diseñada, financiada, ejecutada y evaluada por los propios jóvenes con el acompañamiento de sus dirigentes.",
      "A través de la Empresa, los pioneros demuestran su capacidad técnica, organizativa y de servicio transformando una idea en una realidad tangible para el grupo o la sociedad boliviana.",
    ],
    keyPoints: [
      { label: "Fase 1: Ideación", text: "Cada patrulla investiga necesidades y formula una propuesta atractiva, viable y desafiante." },
      { label: "Fase 2: Elección", text: "En Asamblea de Unidad, las patrullas defienden sus proyectos y se elige democráticamente la Empresa mediante votación transparente." },
      { label: "Fase 3: Planificación", text: "Se distribuyen responsabilidades en Comisiones de Trabajo (Logística, Finanzas, Técnica, Comunicación y Seguridad) con cronograma detallado." },
      { label: "Fase 4: Ejecución", text: "Puesta en marcha del proyecto en terreno (campamento volante, obra comunitaria, expedición, campaña ambiental)." },
      { label: "Fase 5: Evaluación y Celebración", text: "Análisis reflexivo de los logros y aprendizajes alcanzados, balance económico y Gran Fiesta de Celebración de la Unidad." },
    ],
  },

  // =========================================================================
  // SECCIÓN 5: LA LEY Y LA PROMESA SCOUT
  // =========================================================================
  {
    id: "ley-promesa",
    title: "La Promesa y la Ley Scout",
    subtitle: "El código de honor que define el estilo de vida del Scout",
    icon: "shield-star-outline",
    content: [
      "La Promesa y la Ley Scout no son un conjunto de prohibiciones impuestas, sino un pacto voluntario de caballerosidad, libertad y dignidad que el scout elige como brújula para toda su vida.",
      "Texto Oficial de la Promesa Scout: 'Por mi honor prometo hacer cuanto de mí dependa para cumplir mis deberes para con Dios y la Patria, ayudar al prójimo en toda circunstancia y cumplir fielmente la Ley Scout.'",
    ],
    subsections: [
      {
        title: "Los 10 Artículos de la Ley Scout Explicados para el Joven de Hoy",
        description: "Reflexión profunda sobre cada uno de los principios éticos del Escultismo:",
        points: [
          "1. El Scout cifra su honor en ser digno de confianza: Su palabra vale más que cualquier contrato. La verdad, la puntualidad y la sinceridad rigen todas sus acciones.",
          "2. El Scout es leal: Fiel a sus principios, a su Patria, a sus padres, a sus dirigentes y a sus amigos, jamás los traiciona ni habla a sus espaldas.",
          "3. El Scout es útil y ayuda a los demás sin pensar en recompensa: Hace de la Buena Acción diaria un hábito constante, sirviendo con humildad sin esperar aplausos.",
          "4. El Scout es amigo de todos y hermano de cualquier otro Scout: Derriba prejuicios raciales, sociales o religiosos. Para un scout no existen extranjeros en la hermandad mundial.",
          "5. El Scout es cortés y caballeroso: Practica la delicadeza en el trato, respeta a los mayores, protege a los más débiles y rechaza toda forma de grosería o violencia.",
          "6. El Scout ve en la naturaleza la obra de Dios y protege a los animales y plantas: Cuida el medio ambiente, no destruye vegetación innecesariamente y combate la crueldad animal.",
          "7. El Scout es obediente y disciplinado y no hace nada a medias: Acepta con prontitud las directivas legítimas de sus dirigentes y guías, y concluye todo lo que empieza con excelencia.",
          "8. El Scout sonríe y canta en sus dificultades: Enfrenta la adversidad, el cansancio y el dolor con buen humor, infundiendo valentía y alegría a quienes lo rodean.",
          "9. El Scout es económico, trabajador y cuidadoso del bien ajeno: Administra sabiamente su dinero y tiempo, evita el derroche y respeta escrupulosamente la propiedad pública y ajena.",
          "10. El Scout es limpio y puro en pensamientos, palabras y acciones: Mantiene su mente libre de bajeza, cuida su lenguaje corporal y verbal, y vive con transparencia ética.",
        ],
      },
    ],
  },

  // =========================================================================
  // SECCIÓN 6: SCOUT DE LA PATRIA (MÁXIMA DISTINCIÓN)
  // =========================================================================
  {
    id: "patria",
    title: "Insignia Máxima: Scout de la Patria",
    subtitle: "El honor más alto para un Pionero en la Asociación de Scouts de Bolivia",
    icon: "crown-outline",
    content: [
      "La condecoración 'Scout de la Patria' representa la culminación exitosa de la vida del joven en la Rama Pioneros y su consagración como ciudadano ejemplar para Bolivia.",
      "Para recibir este reconocimiento oficial otorgado por la Corte Nacional de Honor de la ASB, el candidato debe cumplir rigurosamente con los 15 Puntos Exigibles verificados por su Jefatura de Unidad y Distrito.",
    ],
    keyPoints: [
      { label: "Punto 1: Permanencia Activa", text: "Permanencia mínima ininterrumpida de dos años en la Rama Pioneros con asistencia regular a reuniones y campamentos." },
      { label: "Punto 2: Etapa Desafío", text: "Haber culminado exitosamente la Etapa Desafío con sus 40 objetivos registrados en la Bitácora." },
      { label: "Punto 3: Ley y Promesa", text: "Ser testimonio vivo y constante de la Promesa y Ley Scout dentro y fuera del movimiento." },
      { label: "Punto 4: Ficha Médica e Historial", text: "Ficha médica completa al día con tipo de sangre inmutable validado y registro físico de campismo." },
      { label: "Punto 5: Especialidades Oficiales", text: "Haber certificado al menos 4 especialidades scouts de diferentes áreas, incluyendo obligatoriamente Primeros Auxilios y Campismo." },
      { label: "Punto 6: Campamentos Anuales", text: "Haber participado en al menos dos campamentos largos de unidad o distrito y un raid de supervivencia." },
      { label: "Punto 7: Noches de Acampada", text: "Contar con un mínimo de 25 noches de campamento bajo carpa certificadas en su bitácora." },
      { label: "Punto 8: Liderazgo de Patrulla", text: "Haber desempeñado con probidad el cargo de Guía o Subguía de Patrulla durante al menos 6 meses." },
      { label: "Punto 9: Empresa Pionera", text: "Haber coordinado o desempeñado un rol protagónico en al menos una Empresa Pionera aprobada por la Asamblea." },
      { label: "Punto 10: Proyecto de Servicio", text: "Diseñar y ejecutar un Proyecto de Servicio Comunitario personal de impacto social o ecológico medible." },
      { label: "Punto 11: Tribu Tierra OMMS", text: "Haber obtenido al menos una insignia del programa mundial Tribu Tierra (Campeones de la Naturaleza o Marea de Plástico)." },
      { label: "Punto 12: Acondicionamiento Físico", text: "Demostrar condición física óptima superando una marcha de montaña de 20 km con mochila completa." },
      { label: "Punto 13: Civismo y Soberanía", text: "Conocimiento riguroso de los símbolos patrios bolivianos y la historia nacional y distrital." },
      { label: "Punto 14: Recomendación de Honor", text: "Aprobación unánime del Consejo de Patrulla y recomendación formal del Consejo de Unidad Pionera." },
      { label: "Punto 15: Entrevista de Homologación", text: "Aprobación de la entrevista personal y revisión del expediente ante el Comisionado de Distrito de la ASB." },
    ],
  },
];
