/**
 * Catálogo Oficial de Especialidades Scouts - Rama Pioneros (100% Offline)
 * Asociación de Scouts de Bolivia (ASB) - Distrito Tarija
 * 
 * Estructura pedagógica completa:
 * - Resumen y Justificación
 * - Conocimientos Teóricos a Investigar y Dominar
 * - Pruebas Prácticas y Demostraciones en Campo
 * - Criterios de Evaluación y Acreditación por el Asesor Técnico / Dirigente
 */

export type SpecialtyArea =
  | "Técnicas Scouts y Vida en Campamento"
  | "Salud, Seguridad y Rescate"
  | "Naturaleza, Ecología y Medio Ambiente"
  | "Ciencia, Tecnología e Informática"
  | "Ciencias Sociales, Humanidades y Comunicación"
  | "Arte, Cultura y Deporte";

export interface SpecialtyItem {
  id: string;
  name: string;
  area: SpecialtyArea;
  icon: string;
  badgeColor: string;
  summary: string;
  prerequisites?: string;
  objectives: string[];
  fieldRequirements: string[];
  evaluationCriteria: string;
}

export const SPECIALTY_AREAS: SpecialtyArea[] = [
  "Técnicas Scouts y Vida en Campamento",
  "Salud, Seguridad y Rescate",
  "Naturaleza, Ecología y Medio Ambiente",
  "Ciencia, Tecnología e Informática",
  "Ciencias Sociales, Humanidades y Comunicación",
  "Arte, Cultura y Deporte",
];

export interface SpecialtyAreaDetails {
  name: SpecialtyArea;
  icon: string;
  badgeColor: string;
  shortDescription: string;
  tagline: string;
}

export const SPECIALTY_AREAS_META: Record<SpecialtyArea, SpecialtyAreaDetails> = {
  "Técnicas Scouts y Vida en Campamento": {
    name: "Técnicas Scouts y Vida en Campamento",
    icon: "tent",
    badgeColor: "#1B4965",
    shortDescription: "Campismo, construcciones rústicas, orientación terrestre, cocina de raid y telecomunicaciones.",
    tagline: "Autonomía y destreza en el campamento",
  },
  "Salud, Seguridad y Rescate": {
    name: "Salud, Seguridad y Rescate",
    icon: "medical-bag",
    badgeColor: "#D90429",
    shortDescription: "Primeros auxilios, rescate agreste, prevención de riesgos y salud integral.",
    tagline: "Protección de vidas y servicio de emergencia",
  },
  "Naturaleza, Ecología y Medio Ambiente": {
    name: "Naturaleza, Ecología y Medio Ambiente",
    icon: "leaf",
    badgeColor: "#2D6A4F",
    shortDescription: "Conservación ambiental, gestión de residuos, dasonomía y animación de la fe.",
    tagline: "Compromiso ecológico y cuidado del planeta",
  },
  "Ciencia, Tecnología e Informática": {
    name: "Ciencia, Tecnología e Informática",
    icon: "atom",
    badgeColor: "#3A0CA3",
    shortDescription: "Astronomía celeste, meteorología, desarrollo digital y energías limpias.",
    tagline: "Innovación, investigación y pensamiento lógico",
  },
  "Ciencias Sociales, Humanidades y Comunicación": {
    name: "Ciencias Sociales, Humanidades y Comunicación",
    icon: "account-group",
    badgeColor: "#AE2012",
    shortDescription: "Liderazgo de patrulla, deberes cívicos, historia scout y periodismo.",
    tagline: "Ciudadanía activa, mediación y memoria viva",
  },
  "Arte, Cultura y Deporte": {
    name: "Arte, Cultura y Deporte",
    icon: "palette",
    badgeColor: "#9C6644",
    shortDescription: "Expresión escénica de fogón, montañismo de altura, ciclismo y artesanías.",
    tagline: "Creatividad artística, aventura y folclore",
  },
};

export const SPECIALTIES_CATALOG: SpecialtyItem[] = [
  // =========================================================================
  // ÁREA 1: TÉCNICAS SCOUTS Y VIDA EN CAMPAMENTO
  // =========================================================================
  {
    id: "campismo",
    name: "Campismo y Vida en la Naturaleza",
    area: "Técnicas Scouts y Vida en Campamento",
    icon: "tent",
    badgeColor: "#1B4965",
    summary:
      "El campismo es el corazón del Escultismo. Esta especialidad capacita al pionero para planificar, instalar, mantener y desmontar un campamento autosuficiente de patrulla o unidad en cualquier condición meteorológica, aplicando normas estrictas de seguridad, ergonomía y mínimo impacto ambiental.",
    prerequisites: "Haber participado en al menos dos campamentos de fin de semana con su patrulla y contar con equipo personal básico.",
    objectives: [
      "Explicar los 7 principios de 'No Deje Rastro' (Leave No Trace) y cómo aplicarlos en ecosistemas frágiles del valle y cordillera.",
      "Diseñar un plano técnico a escala de un Rincón de Patrulla óptimo (zona de carpas, cocina, comedor, intendencia, leñero y zanja de grasa).",
      "Conocer los distintos tipos de tiendas de campaña (iglú, canadiense, estructural, vivac) y los materiales de fabricación (nylon ripstop, poliéster con tratamiento PU, varillas de duraluminio).",
      "Saber cómo mantener, limpiar, impermeabilizar y almacenar tiendas y lonas para evitar moho y degradación por rayos UV.",
      "Comprender las técnicas de ventilación interna y anclaje con vientos tensores según la dirección predominante del viento y la pendiente del terreno.",
    ],
    fieldRequirements: [
      "Haber completado un mínimo de 15 noches de campamento bajo carpa registradas y firmadas en su Bitácora de Progresión.",
      "Montar y desmontar una tienda de campaña en menos de 10 minutos, asegurando un tensado impecable y zanja de drenaje perimetral si llueve.",
      "Construir y pernoctar al menos una noche en un vivac o refugio de emergencia improvisado con elementos naturales y una lona impermeable (tarp).",
      "Liderar la inspección diaria de orden, higiene y seguridad del rincón de patrulla durante un campamento de al menos 3 días.",
    ],
    evaluationCriteria:
      "Demostración práctica en campamento evaluada por el Asesor Técnico o Dirigente de Unidad, verificando orden, destreza en armado de refugios y respeto riguroso por el entorno natural.",
  },
  {
    id: "cabuyeria",
    name: "Cabuyería y Construcciones Pioneras",
    area: "Técnicas Scouts y Vida en Campamento",
    icon: "transit-connection-variant",
    badgeColor: "#264653",
    summary:
      "Arte y ciencia del manejo de cuerdas, nudos, amarres y construcciones de ingeniería rústica. Permite levantar estructuras habitables, funcionales y seguras para el campamento (portadas, torres de observación, puentes y comedores) sin usar clavos ni alterar madera viva.",
    prerequisites: "Dominio de los nudos básicos de la Tropa Scout (Rizo, Ballestrinque y As de Guía).",
    objectives: [
      "Clasificar los tipos de cabos según su material (fibras naturales como cáñamo/sisal vs. sintéticas como polipropileno/poliamida) y factores de carga y elasticidad.",
      "Describir la anatomía de una cuerda: cabo, chicote, seno, firme y mena.",
      "Explicar la función y técnica correcta de al menos 12 nudos especializados: Rizo, As de Guía, Ballestrinque, Pescador doble, Vuelta de Escota, Margarita, Ocho por chicote, Vuelta de Braza, Tensor de Carpa (Taunt-line), Leñador, Balso por Chicote y Nudo Prusik.",
      "Conocer la diferencia estructural y distribución de tensiones entre los 4 amarres fundamentales: Cuadrado, Diagonal, Trípode/Figura de Ocho y Redondo.",
      "Aprender métodos de remate de cabos: falcaceado con hilo de bramante, empalme de ojo (splice) y sellado térmico.",
    ],
    fieldRequirements: [
      "Ejecutar los 12 nudos reglamentarios con los ojos vendados o en menos de 15 segundos cada uno.",
      "Elaborar un muestrario didáctico de nudos y amarres sobre tabla de madera o cuerda modelo para la sede de patrulla.",
      "Diseñar y dirigir la construcción de una obra pionera de gran porte en campamento (puente de caballetes, torre de semáforo o portada monumental) con cálculo de resistencia para sostener a una persona de 80 kg.",
      "Enseñar a tres scouts menores a realizar amarres resistentes con ajuste de tensión y remate firme.",
    ],
    evaluationCriteria:
      "Supervisión presencial de la obra pionera en campamento. La estructura debe ser firme, segura, estéticamente simétrica y desmontarse al concluir sin deteriorar las cuerdas ni los bordones.",
  },
  {
    id: "orientacion",
    name: "Orientación y Cartografía Terrestre",
    area: "Técnicas Scouts y Vida en Campamento",
    icon: "compass",
    badgeColor: "#E76F51",
    summary:
      "Habilidad vital para desplazarse con autonomía y certeza en cualquier geografía. Abarca el uso experto de la brújula tipo Silva, la lectura de cartas topográficas del Instituto Geográfico Militar (IGM), la estimación de distancias y la navegación astronómica nocturna.",
    prerequisites: "Conocimiento de los cuatro puntos cardinales y manejo elemental de brújula.",
    objectives: [
      "Describir las partes de una brújula cartográfica: limbo graduado, aguja magnética, flecha de dirección de viaje, líneas norte-sur y lupa de aumento.",
      "Explicar los conceptos de Norte Geográfico (Verdadero), Norte Magnético y Norte de Cuadrícula, así como el cálculo de la declinación magnética anual.",
      "Interpretar una carta topográfica escala 1:50.000 del IGM: curvas de nivel (equidistancia, cotas, collados, vaguadas), hidrografía, coordenadas UTM y simbología convencional.",
      "Calibrar el propio paso humano (talonamiento): calcular cuántos dobles pasos equivalen a 100 metros en terreno plano, en subida y en bajada.",
      "Identificar los métodos de orientación natural: por la constelación de la Cruz del Sur en el hemisferio sur, sombras solares (método del palo y sombras) y vegetación/musgo.",
    ],
    fieldRequirements: [
      "Trazar una ruta de orientación de al menos 8 kilómetros en terreno abierto o serranía, con al menos 6 puntos de control (balizas) utilizando carta y brújula.",
      "Guiar con éxito a su patrulla a través de la ruta de orientación sin desviarse más de 20 metros del rumbo fijado.",
      "Guiar una marcha nocturna de al menos 3 km utilizando exclusivamente referencias astronómicas y acimut magnético.",
      "Elaborar un croquis topográfico de marcha (hoja de ruta) de un sendero local registrando distancias, desniveles, toponimia y puntos de agua potable.",
    ],
    evaluationCriteria:
      "Comprobación en campo del raid de orientación. El pionero debe llegar a las balizas en el tiempo estimado y justificar técnicamente cada rumbo y triangulación.",
  },
  {
    id: "cocinero",
    name: "Cocina de Campamento y Nutrición de Raid",
    area: "Técnicas Scouts y Vida en Campamento",
    icon: "silverware-fork-knife",
    badgeColor: "#F4A261",
    summary:
      "La moral y energía de una patrulla dependen directamente de su alimentación. Esta especialidad abarca la planificación de menús hipercalóricos y balanceados, el manejo bromatológico de alimentos, la cocción eficiente a fuego vivo y las técnicas de cocina rústica sin utensilios.",
    prerequisites: "Conocimiento básico de manipulación higiénica de alimentos.",
    objectives: [
      "Calcular el balance calórico diario necesario para un scout en campamento activo (2.800 a 3.500 kcal/día según clima y esfuerzo físico).",
      "Elaborar una tabla de raciones, menú semanal y presupuesto económico para una patrulla de 6 personas en un campamento de 4 días.",
      "Conocer las técnicas de conservación y almacenamiento seguro de alimentos en el monte: protección contra roedores, refrigeración por agua corriente y aislamiento del calor.",
      "Dominar los tipos de fogatas para cocción: fuego de trinchera/zanja, fuego polinesio, fuego de reflector y estufa de piedras.",
      "Conocer las normas de seguridad de manejo de cocinillas a gas o alcohol de montaña y extinción total de cenizas.",
    ],
    fieldRequirements: [
      "Ser el Cocinero Principal e Intendente de Alimentos de su patrulla durante un campamento completo de fin de semana, entregando todas las comidas a horario y en raciones equilibradas.",
      "Preparar un almuerzo completo nutritivo utilizando cocina sin utensilios: pan de cazador (twist de masa en vara), huevo al rescoldo en cáscara de naranja o cebolla, y carne asada sobre laja de piedra limpia.",
      "Diseñar y montar una alacena de campamento elevada y una trampa de grasa ecológica para no contaminar las aguas del lugar.",
    ],
    evaluationCriteria:
      "Evaluación del menú servido en campamento por los miembros de la patrulla y el Dirigente. Se calificará sabor, puntualidad, higiene, valor nutricional y limpieza absoluta del área de cocina.",
  },
  {
    id: "transmisiones",
    name: "Transmisiones y Telecomunicaciones",
    area: "Técnicas Scouts y Vida en Campamento",
    icon: "radio-tower",
    badgeColor: "#4361EE",
    summary:
      "La comunicación rápida y precisa salva vidas en emergencias y mantiene coordinadas a las patrullas en grandes raids. Esta especialidad abarca el uso de equipos de radio VHF/UHF, protocolos de radioafición, código morse auditivo y luminoso, y alfabeto fonético internacional.",
    prerequisites: "Disposición para aprender códigos y normas de radiocomunicación.",
    objectives: [
      "Memorizar y aplicar con soltura el Alfabeto Fonético OACI/OTAN (Alfa, Bravo, Charlie, Delta...).",
      "Conocer los códigos de radioafición básicos (Código Q: QTH, QSL, QSO, QRZ, QAP) y protocolo de llamada de emergencia (Mayday y Pan-Pan).",
      "Comprender los principios de propagación electromagnética: bandas VHF, UHF y HF, alcance visual de antenas y factores de atenuación en montañas.",
      "Aprender el Código Morse internacional: recepción y emisión sonora y por destellos de luz a un mínimo de 15 caracteres por minuto.",
      "Conocer las regulaciones bolivianas de la ATT sobre uso de frecuencias del espectro radioeléctrico.",
    ],
    fieldRequirements: [
      "Operar una estación de radio móvil o walkie-talkie durante un gran juego o simulacro de campamento, transmitiendo mensajes de coordenadas y partes de patrulla con brevedad y claridad.",
      "Enviar y decodificar correctamente un mensaje en clave Morse de al menos 50 letras mediante linterna o silbato entre dos colinas distantes 500 metros.",
      "Participar activamente en el evento internacional JOTA-JOTI (Jamboree on the Air / Jamboree on the Internet) contactando con scouts de al menos dos países diferentes.",
    ],
    evaluationCriteria:
      "Prueba de transmisión y recepción en vivo con el asesor técnico. Se valorará la ausencia de errores en las coordenadas y el cumplimiento estricto del lenguaje de radio.",
  },

  // =========================================================================
  // ÁREA 2: SALUD, SEGURIDAD Y RESCATE
  // =========================================================================
  {
    id: "primeros-auxilios",
    name: "Primeros Auxilios y Soporte Vital Básico",
    area: "Salud, Seguridad y Rescate",
    icon: "medical-bag",
    badgeColor: "#D90429",
    summary:
      "Capacitación médica inicial para estabilizar a una víctima y salvar vidas en los primeros minutos críticos tras un traumatismo o paro cardiorrespiratorio en zonas urbanas o de difícil acceso, hasta el arribo de asistencia médica profesional.",
    prerequisites: "Mayoría de edad scout en la Rama Pioneros (15 a 17 años) y actitud serena ante situaciones de estrés.",
    objectives: [
      "Dominar el protocolo PAS universal: Proteger el área del siniestro, Avisar a los servicios de auxilio (110 Policía, 118 Ambulancia, 119 Bomberos Tarija) y Socorrer según triage.",
      "Conocer la evaluación primaria ABCDE: Vía aérea con control cervical, Buena ventilación, Circulación con control de hemorragias masivas, Déficit neurológico (escala AVDI) y Exposición/Temperatura.",
      "Aprender las maniobras de RCP (Reanimación Cardiopulmonar) sólo con las manos y el uso seguro de un Desfibrilador Externo Automático (DEA).",
      "Conocer el manejo y desinfección de heridas punzocortantes, abrasiones, quemaduras de 1°, 2° y 3° grado, y prevención del shock hipovolémico.",
      "Comprender la atención inmediata de lesiones osteoarticulares aplicando el protocolo R.I.C.E. (Reposo, Hielo, Compresión y Elevación) e inmovilización con férulas rígidas e inflables.",
      "Identificar y tratar oportunamente cuadros de hipotermia, golpe de calor, deshidratación severa y picaduras de animales ponzoñosos locales (víboras cascabel/yarará, arañas reclusas y alacranes).",
    ],
    fieldRequirements: [
      "Presentar y mantener equipado el Botiquín Oficial de Patrulla y el Botiquín Personal con insumos vigentes (vendas elásticas, gasas estériles, apósitos, povidona yodada, tijera de trauma, guantes de nitrilo, manta térmica y sales de rehidratación).",
      "Demostrar en simulación práctica la maniobra de Heimlich contra atragantamiento en adultos, niños y auto-aplicación.",
      "Inmovilizar y empaquetar a un compañero con fractura simulada de tibia/peroné utilizando ramas y pañoletas scouts.",
      "Aprobar un curso teórico-práctico dictado por la Cruz Roja Boliviana, Bomberos Voluntarios o el médico del Grupo Scout.",
    ],
    evaluationCriteria:
      "Examen práctico de simulación de accidente múltiple supervisado por un profesional de la salud o paramédico certificado. La técnica de RCP y vendajes debe ser impecable.",
  },
  {
    id: "rescate",
    name: "Búsqueda, Rescate y Evacuación Agreste",
    area: "Salud, Seguridad y Rescate",
    icon: "lifebuoy",
    badgeColor: "#EF233C",
    summary:
      "Técnicas de localización de personas extraviadas en zonas agrestes, transporte seguro de heridos en terrenos escarpados y protocolos de coordinación con brigadas de rescate especializadas (SAR-FAB, Bomberos, Bomberos Voluntarios Tarija).",
    prerequisites: "Tener aprobada la especialidad de Primeros Auxilios o conocimientos equivalentes verificados.",
    objectives: [
      "Aprender los patrones y métodos de búsqueda terrestre en terreno agreste: barrido en línea frontal, abanico y espiral.",
      "Conocer las técnicas de fabricación de camillas de circunstancia con bordones scouts, cuerdas, lonas y chaquetas de abrigo.",
      "Comprender los principios de empaquetamiento del paciente en camilla rígida o tipo cuchara, fijación de cinturones y protección contra hipotermia durante el traslado.",
      "Conocer las señales de emergencia internacionales tierra-aire (confección de señales con piedras o ropa y señales corporales para helicópteros de socorro).",
      "Identificar los factores de riesgo en montaña: desprendimiento de rocas, crecidas repentinas de ríos, tormentas eléctricas y niebla espesa.",
    ],
    fieldRequirements: [
      "Organizar y coordinar un simulacro de búsqueda de un miembro extraviado de la unidad en una serranía o bosque, aplicando rastreo de huellas y barrido sistemático.",
      "Construir una camilla de campaña con dos bordones y tres chaquetas, transportando a un herido simulado de 70 kg a lo largo de 800 metros en terreno irregular sin que la víctima toque el suelo.",
      "Diseñar la Guía de Evacuación y Puntos de Encuentro de la sede de grupo y del campamento anual.",
    ],
    evaluationCriteria:
      "Simulación de rescate cronometrada. El asesor verificará que la víctima sea tratada con máxima delicadeza cervical y que el transporte sea coordinado y seguro.",
  },
  {
    id: "prevencion-riesgos",
    name: "Seguridad y Prevención de Desastres",
    area: "Salud, Seguridad y Rescate",
    icon: "shield-alert",
    badgeColor: "#C9184A",
    summary:
      "La cultura de la prevención es la mayor salvaguarda scout. Esta especialidad capacita al pionero para identificar vulnerabilidades, prevenir incendios, actuar ante sismos o riadas e implementar planes de contingencia en eventos scouts y comunitarios.",
    prerequisites: "Interés en protección civil y seguridad industrial comunitaria.",
    objectives: [
      "Conocer la química del fuego: el tetraedro del fuego (combustible, comburente, calor y reacción en cadena) y las clases de fuego (A, B, C, D, K).",
      "Aprender el funcionamiento, inspección y uso correcto de extintores portátiles de polvo químico seco (PQS) y dióxido de carbono (CO2).",
      "Comprender la gestión del riesgo de desastres: prevención, mitigación, preparación, alerta temprana, respuesta y recuperación.",
      "Identificar las amenazas naturales y antrópicas más comunes en el departamento de Tarija y Bolivia: incendios forestales en la cordillera de Sama, riadas, granizadas y accidentes carreteros.",
    ],
    fieldRequirements: [
      "Elaborar un mapa de riesgos y recursos (croquis con salidas de emergencia y extintores) de la sede de su Grupo Scout o colegio.",
      "Impartir una charla de 20 minutos a la Tropa o Manada sobre qué hacer antes, durante y después de un sismo o incendio estructural.",
      "Demostrar el uso real o simulado de un extintor de incendios extinguiendo un conato controlado de fuego clase A o B.",
    ],
    evaluationCriteria:
      "Revisión técnica del mapa de riesgos y plan de contingencia presentado. Debe contener rutas de evacuación claras, números de emergencia actualizados y roles bien definidos.",
  },
  {
    id: "salud-deporte",
    name: "Acondicionamiento Físico y Salud Integral",
    area: "Salud, Seguridad y Rescate",
    icon: "run",
    badgeColor: "#800F2F",
    summary:
      "Cultivo del cuerpo como templo de vida y servicio. Fomenta hábitos de vida activa, disciplina deportiva, prevención del sedentarismo y las adicciones, y fortalecimiento de la salud mental y emocional del joven.",
    prerequisites: "Apto médico de salud al día.",
    objectives: [
      "Explicar los beneficios fisiológicos del ejercicio aeróbico y anaeróbico sobre el sistema cardiovascular y muscular.",
      "Conocer los principios de una hidratación adecuada antes, durante y después de actividades físicas intensas en climas cálidos y fríos.",
      "Comprender los riesgos neurológicos, orgánicos y sociales del consumo de alcohol, tabaco, cigarrillos electrónicos (vapeo) y sustancias controladas.",
      "Analizar la relación entre el sueño reparador (7 a 9 horas diarias), la reducción del estrés y el rendimiento escolar y scout.",
    ],
    fieldRequirements: [
      "Diseñar y sostener durante 8 semanas consecutivas un plan de entrenamiento físico personal registrado en su bitácora (fuerza, flexibilidad y resistencia).",
      "Completar una prueba de resistencia verificada: correr 5 km en menos de 30 minutos o nadar 400 metros de forma continua.",
      "Coordinar una jornada deportiva o torneo recreativo para toda la unidad pionera fomentando el juego limpio y la camaradería.",
    ],
    evaluationCriteria:
      "Verificación del registro de 8 semanas de entrenamiento y superación de las marcas iniciales de resistencia física.",
  },

  // =========================================================================
  // ÁREA 3: NATURALEZA, ECOLOGÍA Y MEDIO AMBIENTE
  // =========================================================================
  {
    id: "conservacionista",
    name: "Conservacionista y Acción Climática",
    area: "Naturaleza, Ecología y Medio Ambiente",
    icon: "pine-tree",
    badgeColor: "#2D6A4F",
    summary:
      "Compromiso activo con la preservación del patrimonio natural de Bolivia. Abarca el estudio de ecosistemas nativos, la protección de cuencas hídricas, la lucha contra la deforestación y la participación en iniciativas de la Tribu Tierra de la OMMS.",
    prerequisites: "Haber participado en al menos una jornada ambiental comunitaria.",
    objectives: [
      "Identificar las principales ecorregiones de Bolivia (Chaco, Valles Secos, Altiplano, Yungas, Amazonía) y las áreas protegidas de Tarija (Reserva de Sama, Tariquía, Aguaragüe).",
      "Explicar el ciclo hidrológico de la cuenca del Río Guadalquivir y las principales amenazas que afectan su caudal y calidad de agua.",
      "Reconocer al menos 5 especies de flora nativa (queñua, molle, lapacho, algarrobo, tola) y 5 especies de fauna silvestre amenazada (cóndor andino, taruca, oso jucumari, flamenco andino).",
      "Comprender las causas y consecuencias del calentamiento global antropogénico y el papel de los bosques como sumideros de carbono.",
    ],
    fieldRequirements: [
      "Diseñar y liderar una campaña de arborización con especies nativas en un espacio público, parque o sede scout, plantando y cuidando al menos 10 arbolitos durante 3 meses.",
      "Organizar una jornada de limpieza comunitaria de riberas o senderos recolectando y clasificando residuos plásticos.",
      "Completar los requisitos de la Insignia 'Campeones de la Naturaleza' o 'Marea de Plástico' de la Tribu Tierra (Earth Tribe WOSM).",
    ],
    evaluationCriteria:
      "Informe con fotografías y evidencias del proyecto ambiental liderado, evaluando el impacto ecológico y el grado de involucramiento de la patrulla y la comunidad.",
  },
  {
    id: "gestion-residuos",
    name: "Gestión de Residuos y Economía Circular",
    area: "Naturaleza, Ecología y Medio Ambiente",
    icon: "recycle",
    badgeColor: "#40916C",
    summary:
      "Transformación del modelo lineal de consumo en un modelo circular. Capacita al pionero para minimizar la generación de basura, clasificar residuos en origen, fabricar compostaje y liderar la política 'Cero Plásticos' en los campamentos scouts.",
    prerequisites: "Compromiso de implementar separación de residuos en el hogar y en la sede.",
    objectives: [
      "Diferenciar los conceptos de basura, residuo sólido aprovechable y residuo peligroso.",
      "Conocer el código de colores boliviano (Norma NB 758) para la clasificación de residuos: verde (orgánicos), amarillo (plásticos), azul (papel/cartón), plomo (vidrio) y negro (no aprovechables).",
      "Explicar los procesos químicos y biológicos del compostaje aeróbico y del vermicompostaje (lombricultura).",
      "Conocer el impacto ambiental de los plásticos de un solo uso en la fauna marina y terrestre y el fenómeno de los microplásticos.",
    ],
    fieldRequirements: [
      "Instalar y mantener funcionando durante 2 meses una compostera doméstica o comunitaria en la sede de grupo, utilizando los desechos orgánicos para abonar un huerto.",
      "Garantizar que en un campamento de unidad se aplique separación al 100% de los residuos generados, pesando y entregando el material reciclable a centros de acopio locales.",
      "Crear un objeto útil y duradero para campamento o sede utilizando materiales recuperados (madera de palets, botellas plásticas, neumáticos en desuso).",
    ],
    evaluationCriteria:
      "Visita técnica a la compostera y verificación del pesaje y entrega de materiales reciclables en una recicladora autorizada.",
  },
  {
    id: "dasonomia",
    name: "Dasonomía y Ciencia Forestal",
    area: "Naturaleza, Ecología y Medio Ambiente",
    icon: "tree",
    badgeColor: "#52B788",
    summary:
      "Estudio y custodia de los bosques. Enseña a reconocer las especies forestales de la región, sus propiedades mecánicas y medicinales, técnicas de recolección de semillas, viveros forestales y prevención de incendios de cobertura vegetal.",
    prerequisites: "Gusto por la botánica y el trabajo de campo en el monte.",
    objectives: [
      "Describir la estructura morfológica de un árbol: raíz, fuste, copa, corteza, albura, duramen y médula.",
      "Identificar en el terreno al menos 10 especies arbóreas nativas y exóticas por sus hojas, corteza, flores y frutos.",
      "Conocer las maderas más comunes en Bolivia y sus usos adecuados para construcciones pioneras sin talar ejemplares vivos.",
      "Comprender la dinámica de los chaqueos agrícolas y los factores que desencadenan incendios forestales catastróficos.",
    ],
    fieldRequirements: [
      "Construir un herbario forestal con muestras prensadas y fichas técnicas de 10 especies arbóreas de la región de Tarija.",
      "Germinar y cultivar en vivero o almacigo al menos 15 plantines forestales nativos listos para trasplante.",
      "Participar en un taller teórico sobre líneas de defensa y herramientas forestales (mcleod, pulaski, matafuegos) con brigadistas forestales.",
    ],
    evaluationCriteria:
      "Entrega del herbario técnico clasificado y presentación de los plantines germinados con su ficha de cuidados.",
  },
  {
    id: "espiritualidad-naturaleza",
    name: "Animación de la Fe y Ecoteología",
    area: "Naturaleza, Ecología y Medio Ambiente",
    icon: "hands-pray",
    badgeColor: "#74C69D",
    summary:
      "Exploración de la dimensión trascendente de la vida a través de la contemplación y reverencia por la Creación. Fomenta el respeto a todas las confesiones de fe, el servicio desinteresado y la vivencia íntima de los valores de la Promesa Scout.",
    prerequisites: "Vivencia de la Promesa Scout y disposición al diálogo reflexivo y fraterno.",
    objectives: [
      "Analizar el Artículo 6 de la Ley Scout: 'El Scout ve en la naturaleza la obra de Dios y protege a los animales y plantas'.",
      "Conocer las oraciones tradicionales del Movimiento Scout: Oración Scout, Oración del Pionero y bendición de alimentos.",
      "Comprender el valor del ecumenismo y el respeto interreligioso entre las diversas manifestaciones espirituales presentes en Bolivia.",
      "Reflexionar sobre la Carta de la Tierra y encíclicas ecológicas universales sobre el cuidado de la casa común.",
    ],
    fieldRequirements: [
      "Preparar y conducir un momento de reflexión espiritual ecuménico durante el amanecer o atardecer de un campamento de unidad.",
      "Escribir una oración o reflexión personal de consagración de la patrulla para incorporarla al Libro de Oro.",
      "Coordinar una acción de voluntariado en una institución benéfica, hogar de ancianos o centro de acogida infantil.",
    ],
    evaluationCriteria:
      "Evaluación del momento de reflexión espiritual conducido en campamento y testimonio personal de empatía, respeto y coherencia con los valores scouts.",
  },

  // =========================================================================
  // ÁREA 4: CIENCIA, TECNOLOGÍA E INFORMÁTICA
  // =========================================================================
  {
    id: "astronomia",
    name: "Astronomía y Cosmografía",
    area: "Ciencia, Tecnología e Informática",
    icon: "star-crescent",
    badgeColor: "#3A0CA3",
    summary:
      "El cielo nocturno es el mapa más antiguo de la humanidad. Esta especialidad capacita para identificar constelaciones andinas y occidentales en el hemisferio sur, comprender la mecánica celeste de planetas y satélites, y utilizar los astros para orientarse y medir el tiempo.",
    prerequisites: "Interés por la ciencia del cosmos y paciencia para la observación nocturna.",
    objectives: [
      "Identificar y ubicar en el cielo austral las constelaciones principales: Cruz del Sur, Centauro (Alfa y Beta), Orión, Escorpio, Tauro y Can Mayor (Sirio).",
      "Conocer la cosmovisión astronómica de los pueblos originarios andinos (la Chacana, la constelación de la Llama Cósmica / Yacana y el Machacuay).",
      "Explicar los movimientos de rotación y traslación de la Tierra, equinoccios, solsticios y las 4 fases de la Luna.",
      "Comprender el funcionamiento de un telescopio reflector y refractor, y el uso de binoculares para observación astronómica de cráteres lunares y satélites galileanos de Júpiter.",
    ],
    fieldRequirements: [
      "Construir un mapa celeste manual (planisferio celeste) o un cuadrante artesanal para calcular la latitud geográfica a partir de la estrella Polar austral o la Cruz del Sur.",
      "Liderar una velada astronómica para la patrulla en campamento, señalando a cielo abierto al menos 4 constelaciones y 2 planetas visibles.",
      "Registrar durante un ciclo lunar completo (28 días) el cambio de fases y horarios de salida y puesta de la Luna en su libreta de campo.",
    ],
    evaluationCriteria:
      "Prueba práctica a cielo abierto en campamento nocturno reconociendo constelaciones y explicando su uso para encontrar el Sur verdadero.",
  },
  {
    id: "meteorologia",
    name: "Meteorología de Campamento",
    area: "Ciencia, Tecnología e Informática",
    icon: "weather-partly-cloudy",
    badgeColor: "#4361EE",
    summary:
      "La seguridad y el éxito de una expedición dependen de saber anticipar el tiempo. Esta especialidad enseña a leer la presión atmosférica, clasificar nubes, predecir frentes fríos (surazos) y tormentas eléctricas, y construir instrumentos meteorológicos caseros.",
    prerequisites: "Conocimientos elementales de física escolar.",
    objectives: [
      "Clasificar los tipos de nubes según su altura y forma: cirros, estratos, cúmulos y cumulonimbos (nubes de tormenta severa).",
      "Comprender la función del barómetro, anemómetro, termómetro de máxima y mínima e higrómetro.",
      "Explicar los fenómenos meteorológicos característicos de Bolivia: surazos invernales, vientos zonda de cordillera y granizadas torrenciales de valle.",
      "Aprender señales naturales predictivas del tiempo: halos lunares/solares, comportamiento de animales y dirección del viento al atardecer.",
    ],
    fieldRequirements: [
      "Construir una estación meteorológica rústica funcional para el campamento (barómetro aneroide casero, veleta y pluviómetro graduado).",
      "Llevar un registro meteorológico dos veces al día durante un campamento de 4 días, anticipando con acierto los cambios climáticos.",
      "Diseñar el protocolo de seguridad de la patrulla en caso de tormenta eléctrica en campo abierto (posición de cuclillas, dispersión y alejamiento de árboles aislados).",
    ],
    evaluationCriteria:
      "Presentación de la bitácora meteorológica de campamento y verificación de la precisión de los pronósticos emitidos.",
  },
  {
    id: "programacion",
    name: "Programación y Desarrollo Digital",
    area: "Ciencia, Tecnología e Informática",
    icon: "code-braces",
    badgeColor: "#4CC9F0",
    summary:
      "El escultismo abraza la era digital. Capacita al pionero para escribir código, automatizar tareas de patrulla, desarrollar aplicaciones útiles para la comunidad y comprender los principios éticos de la inteligencia artificial y la ciberseguridad.",
    prerequisites: "Acceso a una computadora o dispositivo móvil con entorno de programación.",
    objectives: [
      "Comprender la lógica algorítmica: variables, condicionales, bucles, funciones y estructuras de datos (listas, mapas).",
      "Conocer los fundamentos de desarrollo web o móvil moderno (HTML, CSS, JavaScript, TypeScript, Python o React Native).",
      "Explicar las buenas prácticas de ciberseguridad: contraseñas seguras, autenticación de dos factores (2FA), protección de datos personales y prevención del phishing.",
      "Comprender los principios de licencias de software libre (open source) y el uso ético y responsable de modelos de Inteligencia Artificial.",
    ],
    fieldRequirements: [
      "Desarrollar una aplicación, página web o script funcional que resuelva una necesidad real de su patrulla o unidad (calculadora de raciones de campamento, generador de claves scouts o catálogo interactivo).",
      "Colaborar en un repositorio de código abierto o publicar su proyecto con documentación clara de instalación.",
      "Impartir un taller básico de alfabetización digital o ciberseguridad preventiva para los miembros de su Grupo Scout.",
    ],
    evaluationCriteria:
      "Demostración en vivo del software desarrollado, evaluando su funcionamiento, calidad de código y utilidad práctica para la unidad pionera.",
  },
  {
    id: "energias-renovables",
    name: "Energías Renovables y Tecnologías Sostenibles",
    area: "Ciencia, Tecnología e Informática",
    icon: "solar-power",
    badgeColor: "#7209B7",
    summary:
      "Transición energética para el campismo autosuficiente. Enseña a aprovechar la energía solar, eólica e hidráulica para iluminación, recarga de equipos de emergencia y cocción limpia, reduciendo el consumo de combustibles fósiles.",
    prerequisites: "Nociones básicas de electricidad y circuitos eléctricos.",
    objectives: [
      "Explicar el efecto fotovoltaico y la conversión de radiación solar en electricidad continua (DC).",
      "Conocer los componentes de un sistema solar fotovoltaico aislado: panel solar, regulador de carga PWM/MPPT, batería y convertidor a corriente alterna.",
      "Comprender los principios termodinámicos de un horno solar de concentración o caja térmica.",
      "Aprender a calcular el consumo eléctrico de dispositivos móviles y radios de comunicación en campamento para dimensionar un banco de baterías.",
    ],
    fieldRequirements: [
      "Diseñar y construir un cargador solar portátil para alimentar dispositivos de comunicación durante un raid o expedición.",
      "Construir una cocina o deshidratador solar con materiales reciclados (cajas de cartón, papel aluminio y vidrio) y cocinar o deshidratar alimentos en él.",
      "Realizar una auditoría energética en la sede de su Grupo Scout proponiendo medidas concretas de ahorro y eficiencia.",
    ],
    evaluationCriteria:
      "Demostración del dispositivo solar en campamento comprobando la generación de voltaje y corriente bajo la radiación solar directa.",
  },

  // =========================================================================
  // ÁREA 5: CIENCIAS SOCIALES, HUMANIDADES Y COMUNICACIÓN
  // =========================================================================
  {
    id: "liderazgo",
    name: "Liderazgo, Mediación y Trabajo en Equipo",
    area: "Ciencias Sociales, Humanidades y Comunicación",
    icon: "account-group",
    badgeColor: "#9B2226",
    summary:
      "El verdadero líder scout sirve en silencio e inspira con el ejemplo. Esta especialidad capacita para dirigir patrullas democráticamente, dinamizar reuniones, mediar en desacuerdos y formular la Carta de Unidad como pacto ético de honor.",
    prerequisites: "Estar desempeñando o haber desempeñado el rol de Guía, Subguía o encargado de comisión en la patrulla.",
    objectives: [
      "Comparar los distintos estilos de liderazgo: autoritario, permisivo (laissez-faire) y democrático-servicial (liderazgo transformacional).",
      "Aprender técnicas de escucha activa, asertividad en la comunicación no violenta y mediación de conflictos entre pares.",
      "Conocer la estructura y metodología del Consejo de Patrulla y la Asamblea de Unidad Pionera.",
      "Comprender las 5 fases de desarrollo de un equipo: formación, conflicto, normalización, desempeño y disolución.",
    ],
    fieldRequirements: [
      "Planificar y presidir con éxito al menos 4 reuniones del Consejo de Patrulla registrando acuerdos y tareas en el Libro de Oro.",
      "Facilitar la redacción o actualización de la Carta de Unidad Pionera con participación equitativa de todos los miembros.",
      "Intervenir como mediador fraternal en una diferencia o desacuerdo dentro de la patrulla logrando un acuerdo consensuado y duradero.",
    ],
    evaluationCriteria:
      "Evaluación 360° realizada por los integrantes de la patrulla y el Dirigente de Unidad sobre la madurez, empatía y espíritu de servicio del pionero.",
  },
  {
    id: "civismo-ciudadania",
    name: "Civismo, Soberanía y Derechos Ciudadanos",
    area: "Ciencias Sociales, Humanidades y Comunicación",
    icon: "bank",
    badgeColor: "#AE2012",
    summary:
      "Amor a la Patria boliviana expresado en acciones concretas. Enseña la estructura democrática del Estado, el respeto a los símbolos nacionales, la participación juvenil en políticas públicas y la defensa de los derechos humanos y la cultura de paz.",
    prerequisites: "Conocimiento de la historia y geografía de Bolivia.",
    objectives: [
      "Conocer la estructura orgánica del Estado Plurinacional de Bolivia: Órgano Ejecutivo, Legislativo, Judicial y Electoral.",
      "Aprender el protocolo de ceremonial de la Bandera Tricolor, el Escudo de Armas, la Wiphala, la Escarapela y el Canto al Himno Nacional.",
      "Comprender los Derechos Humanos fundamentales y los derechos de la niñez y adolescencia consagrados en el Código Niño, Niña y Adolescente.",
      "Conocer el funcionamiento del Gobierno Autónomo Municipal de Tarija y los mecanismos de participación ciudadana juvenil.",
    ],
    fieldRequirements: [
      "Participar en un proyecto de servicio ciudadano o voluntariado interinstitucional de al menos 20 horas acreditadas.",
      "Coordinar el acto cívico solemne de izamiento de pabellones en un evento scout de grupo o aniversario patrio.",
      "Investigar y exponer ante la unidad sobre un héroe civil boliviano o prócer de la independencia de Tarija (ej. Eustaquio 'Moto' Méndez).",
    ],
    evaluationCriteria:
      "Presentación del informe de servicio ciudadano y demostración de destreza en protocolo cívico durante ceremonias formales.",
  },
  {
    id: "historia-scout",
    name: "Historia y Tradiciones del Escultismo",
    area: "Ciencias Sociales, Humanidades y Comunicación",
    icon: "book-open-page-variant",
    badgeColor: "#BB3E03",
    summary:
      "Quien no conoce su historia no valora su identidad. Un recorrido apasionante desde el campamento de Brownsea en 1907 y la gesta de Lord Baden-Powell de Gilwell, hasta la fundación del Escultismo en Bolivia en 1911 y la evolución de la Rama Pioneros.",
    prerequisites: "Haber formulado la Promesa Scout.",
    objectives: [
      "Relatar la biografía de Baden-Powell y Olave Saint Clair Soames, el Sitio de Mafeking y el campamento experimental de Brownsea.",
      "Conocer la historia de la fundación del Escultismo en Bolivia (Adolfo Flores en Uyuni, 1911) y la trayectoria de la Asociación de Scouts de Bolivia (ASB).",
      "Explicar el origen de la Rama Pioneros / Caminantes, sus colores, insignias y marco simbólico del viaje y la exploración.",
      "Conocer el significado heráldico de la Flor de Lis mundial y sus tres pétalos (Dios/Patria, Prójimo y Ley Scout).",
    ],
    fieldRequirements: [
      "Elaborar una línea de tiempo ilustrada para la pared de la sede de unidad destacando los hitos del escultismo mundial, nacional y distrital.",
      "Visitar a un dirigente veterano o antiguo scout de la región para entrevistarlo y rescatar anécdotas para el Libro de Oro.",
      "Organizar una trivia interactiva de historia scout para la Manada o Tropa de su grupo.",
    ],
    evaluationCriteria:
      "Exposición oral documentada sobre la historia del escultismo en Bolivia y entrega de la transcripción de la entrevista al scout veterano.",
  },
  {
    id: "comunicacion-periodismo",
    name: "Periodismo, Fotografía y Medios de Unidad",
    area: "Ciencias Sociales, Humanidades y Comunicación",
    icon: "camera",
    badgeColor: "#CA6702",
    summary:
      "La voz y los ojos de la unidad pionera. Enseña a redactar crónicas apasionantes para el Libro de Oro, capturar fotografías con valor testimonial y estético, y gestionar boletines informativos para padres de familia y redes sociales scouts.",
    prerequisites: "Manejo de cámara fotográfica o teléfono inteligente con cámara.",
    objectives: [
      "Comprender las reglas de composición fotográfica: regla de los tercios, líneas guía, profundidad de campo, enfoque selectivo e iluminación.",
      "Aprender las técnicas del reportaje periodístico: las 5 preguntas clave (Qué, Quién, Cuándo, Dónde, Por qué) y la pirámide invertida.",
      "Conocer las normas éticas de protección de imagen de menores de edad en medios de difusión según la política 'A Salvo del Peligro' (Safe from Harm WOSM).",
      "Dominar la edición básica de imágenes y redacción de comunicados de prensa.",
    ],
    fieldRequirements: [
      "Ser el Cronista y Fotógrafo Oficial de una actividad mayor (campamento de unidad o raid distrital), redactando una crónica completa para el Libro de Oro con fotografías seleccionadas.",
      "Diseñar y publicar un boletín informativo mensual (físico o digital) para mantener informada a la comunidad scout y familiares.",
      "Realizar un ensayo fotográfico de 10 imágenes que transmita la hermandad y el espíritu scout en su máxima expresión.",
    ],
    evaluationCriteria:
      "Revisión de la crónica y ensayo fotográfico presentado. Se valorará la calidad técnica de las tomas, la ortografía impecable y el respeto a la política A Salvo del Peligro.",
  },

  // =========================================================================
  // ÁREA 6: ARTE, CULTURA Y DEPORTE
  // =========================================================================
  {
    id: "fogones-teatro",
    name: "Expresión Escénica y Animación de Fogón",
    area: "Arte, Cultura y Deporte",
    icon: "fire",
    badgeColor: "#9C6644",
    summary:
      "El Gran Fogón de campamento es el altar de la alegría y la mística scout. Esta especialidad capacita para dirigir ceremonias de fuego, crear sketches con mensaje ético, entonar danzas y canciones tradicionales, y mantener viva la chispa del humor sano.",
    prerequisites: "Entusiasmo por la animación grupal y respeto por las tradiciones de campamento.",
    objectives: [
      "Conocer el protocolo y mística del Fogón Scout: el Guardián del Fuego, el Director de Fogón, el encendido ceremonial y la Flor Roja.",
      "Aprender técnicas de modulación vocal, proyección escénica y expresión corporal sin amplificación electrónica.",
      "Conocer un repertorio de al menos 15 canciones scouts tradicionales (canciones de marcha, de fogón, solemnes y de despedida).",
      "Comprender cómo diseñar sketches cómicos e inteligentes que no ridiculicen ni discriminen a nadie, manteniendo la caballerosidad scout.",
    ],
    fieldRequirements: [
      "Dirigir y conducir como Maestro de Ceremonias el Gran Fogón de un campamento de unidad, coordinando el programa artístico de todas las patrullas.",
      "Escribir y poner en escena junto a su patrulla una representación dramática o sketch con un mensaje constructivo sobre la Ley Scout.",
      "Enseñar 3 canciones scouts nuevas con dinámicas de animación a toda la unidad pionera.",
    ],
    evaluationCriteria:
      "Evaluación en vivo durante el Fogón de campamento. Se calificará la energía, el respeto a los tiempos, la variedad del programa y la emoción transmitida.",
  },
  {
    id: "montanismo",
    name: "Montañismo y Senderismo de Altura",
    area: "Arte, Cultura y Deporte",
    icon: "image-filter-hdr",
    badgeColor: "#7F4F24",
    summary:
      "La conquista de las cumbres requiere templanza, preparación física y respeto reverente por la montaña. Abarca la marcha dosificada, el uso de bastones de trekking, la aclimatación al mal de altura (soroche) y la seguridad en pendientes rocosas.",
    prerequisites: "Aprobación médica de salud cardiovascular y experiencia previa en caminatas de serranía.",
    objectives: [
      "Conocer las técnicas de marcha en ascenso y descenso: longitud del paso, ritmo de respiración acompasado y uso eficiente de bastones de trekking.",
      "Comprender la fisiología del mal de altura agudo (soroche), síntomas de edema pulmonar y cerebral, y protocolos inmediatos de descenso forzado.",
      "Aprender a empacar una mochila de expedición de 60 a 75 litros: distribución del peso (centro de gravedad pegado a la espalda), impermeabilización y equipo de abrigo térmico por capas (teoría de las 3 capas).",
      "Conocer las escalas de dificultad de senderos y clasificación de terrenos montañosos.",
    ],
    fieldRequirements: [
      "Planificar y completar una expedición de alta montaña o senderismo de al menos 20 kilómetros acumulados y 800 metros de desnivel positivo con mochila de carga completa.",
      "Alcanzar la cumbre de un cerro o montaña representativa de la región (ej. Serranía de Sama o cerros tutelares del valle de Tarija) junto a su patrulla.",
      "Armar y verificar el botiquín específico de montaña con manta aluminizada, sales de rehidratación y analgésicos de emergencia.",
    ],
    evaluationCriteria:
      "Registro GPS o bitácora de cumbre sellada, verificando que la expedición se llevó a cabo con seguridad, sin extravíos y con equipo adecuado.",
  },
  {
    id: "ciclismo",
    name: "Ciclismo y Cicloturismo de Aventura",
    area: "Arte, Cultura y Deporte",
    icon: "bike",
    badgeColor: "#936639",
    summary:
      "Movilidad ecológica sobre dos ruedas. Esta especialidad capacita para realizar raids cicloturistas de media y larga distancia, mantener la mecánica preventiva de la bicicleta en ruta, aplicar normas de seguridad vial y viajar con mínimo impacto ambiental.",
    prerequisites: "Poseer bicicleta en estado mecánico operativo y casco reglamentario.",
    objectives: [
      "Conocer la anatomía y componentes mecánicos de la bicicleta: transmisión, desviadores, frenos de disco/v-brake, eje de centro, mazas y presión de neumáticos.",
      "Aprender a reparar en ruta una cámara pinchada (parchado y cambio), despinzar una cadena rota con tronchacadenas y calibrar cambios desajustados.",
      "Estudiar el Código de Tránsito de Bolivia relativo a vehículos a tracción humana y normas internacionales de circulación vial segura.",
      "Calcular la nutrición e hidratación necesaria en rutas ciclistas de resistencia.",
    ],
    fieldRequirements: [
      "Realizar un raid en bicicleta de al menos 40 kilómetros junto a su patrulla, documentando la ruta con altimetría y puntos de descanso.",
      "Mantener un puesto de auxilio mecánico para bicicletas durante una actividad scout masiva o rodada ciudadana.",
      "Realizar un mantenimiento integral a su bicicleta: limpieza de transmisión, lubricación de cadena y ajuste de zapatas o pastillas de freno.",
    ],
    evaluationCriteria:
      "Superación de la prueba de ruta de 40 km y demostración práctica de reparación de un pinchazo y cadena en menos de 10 minutos con herramientas de bolsillo.",
  },
  {
    id: "artesanias-folklore",
    name: "Artesanías y Tradición Folclórica",
    area: "Arte, Cultura y Deporte",
    icon: "palette",
    badgeColor: "#6B705C",
    summary:
      "Rescate de las raíces y la identidad cultural boliviana. Abarca el conocimiento de la música e instrumentos tradicionales (erke, quenilla, charango, guitarra), danzas de la región (cueca chapaca, rueda, chacarera) y el trabajo artesanal en cuero, madera o arcilla.",
    prerequisites: "Interés por las expresiones culturales y la identidad folclórica.",
    objectives: [
      "Conocer los ritmos, vestimentas e instrumentos típicos de las distintas regiones de Tarija y Bolivia (valle, chaco y altiplano).",
      "Aprender las técnicas básicas del tallado en madera, pirograbado de bordones o repujado en cuero para artículos scouts.",
      "Conocer la historia y las costumbres de la Fiesta Grande de Tarija (San Roque y los Chunchos promesantes) como Patrimonio Cultural Inmaterial de la Humanidad.",
    ],
    fieldRequirements: [
      "Tocar un instrumento tradicional o bailar una danza folclórica boliviana en un festival cultural o fogón de campamento.",
      "Tallar o pirograbar un bordón de mando, tótem de patrulla o trofeo de unidad utilizando técnicas artesanales tradicionales.",
      "Confeccionar el banderín de patrulla en tela y bordado o pintura a mano con el animal tótem y los colores oficiales.",
    ],
    evaluationCriteria:
      "Presentación del banderín o bordón artesanal terminado y demostración artística de música o danza tradicional.",
  },
];
