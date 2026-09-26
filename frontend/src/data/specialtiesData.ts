/**
 * Catálogo Oficial de Especialidades Scouts - Rama Pioneros (100% Offline)
 * Asociación de Scouts de Bolivia (ASB)
 * 
 * 65 Especialidades organizadas en 6 Áreas oficiales y sus respectivas subcategorías.
 */

export interface Specialty {
  id: string;
  name: string;
  page: number;
  areaId: string;
  areaName: string;
  subcategoryId: string;
  subcategoryName: string;
  icon: string;
  color: string;
  basicKnowledge: string[];
  testsToPass: string[];
}

export interface SpecialtySubcategory {
  id: string;
  name: string;
  areaId: string;
  specialties: Specialty[];
}

export interface SpecialtyArea {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  subcategories: SpecialtySubcategory[];
  totalSpecialties: number;
}

export const SPECIALTY_AREAS_DATA: SpecialtyArea[] = [
  {
    "id": "area-salud",
    "name": "Salud, Seguridad y Rescate",
    "icon": "medical-bag",
    "color": "#D90429",
    "description": "Ciencias de la salud, primeros auxilios, prevención de riesgos y seguridad vial.",
    "subcategories": [
      {
        "id": "salud-ciencias",
        "name": "Especialidades en ciencias de la salud",
        "areaId": "area-salud",
        "specialties": [
          {
            "id": "soporte-basico-de-vida-primeros-auxilios",
            "name": "Soporte básico de vida (Primeros auxilios)",
            "page": 5,
            "areaId": "area-salud",
            "areaName": "Salud, Seguridad y Rescate",
            "subcategoryId": "salud-ciencias",
            "subcategoryName": "Especialidades en ciencias de la salud",
            "icon": "medical-bag",
            "color": "#D90429",
            "basicKnowledge": [
              "Conoce la anatomía básica de los sistemas Cardiaco, pulmonar, nervioso, gástrico, urinario y músculo esquelético",
              "sabe diferenciar entre las situaciones de Emergencia, Urgencia, y condición de alto riesgo",
              "Sabe cuales son los signos vitales y como se miden (Pulso o frecuencia cardiaca, frecuencia respiratoria, temperatura, presión arterial)",
              "conoce el ABC del auxiliador y sabe como dar soporte a las funciones vitales básicas.",
              "sabe como organizar su escenario y como realizar el acercamiento inicial a una victima",
              "sabe como utilizar y valorar el avds o mini examen neurológico",
              "conoce los principios con los cuales actúa maniobras como rai rac rcp heimlich",
              "puede elaborar un organigrama o árbol de decisiones con las acciones básicas a tomar",
              "sabe identificar las situaciones de alto riesgo como ser tec, shock, neumotórax a tensión, hemotórax o hemoneumotorax, tórax inestable, quemaduras, accidentes con ofidios o insectos además conoce las causas y acciones básicas a tomar",
              "sabe que es una situación de urgencia y como identificarlas como ser contusiones, heridas, hemorragias leves, fracturas, etc.",
              "conoce cuales son los elementos básicos que deben de haber en un botiquín personal, de equipo, de rama, para el auto y de la casa",
              "conoce y sabe manejar correctamente (indicaciones, reacciones adversas, dosificación etc.) un analgésico, antipirético, antiinflamatorio, antihistaminico, antiespasmódico"
            ],
            "testsToPass": [
              "Demuestra haber cursado y aprobado un curso de Soporte Básico de Vida organizado a nivel grupo, rama, distrito o nacional o por otras instituciones especializadas.",
              "Toma los signos vitales como pulso, temperatura, frecuencia respiratoria, presión arterial, nivel de conciencia",
              "Lleva a cabo correctamente la realización de maniobras como RAI, RAC, RCP y HEIMLICH",
              "Demuestra que puedes tratar quemaduras",
              "Demuestra que sabes las maniobras para cohibir hemorragias (compresión directa, uso de la gravedad, presión en vasos arteriales o venosos)",
              "Demuestra que puedes hacer inmovilización de fracturas e incluso de fracturas especiales (clavícula, etc.)",
              "Participa del equipo de atención medica por lo menos en dos eventos ya sea nivel grupo o distritales"
            ]
          },
          {
            "id": "salud-oral",
            "name": "Salud oral",
            "page": 6,
            "areaId": "area-salud",
            "areaName": "Salud, Seguridad y Rescate",
            "subcategoryId": "salud-ciencias",
            "subcategoryName": "Especialidades en ciencias de la salud",
            "icon": "tooth-outline",
            "color": "#D90429",
            "basicKnowledge": [
              "conoce la importancia de la salud oral",
              "sabe cuantos dientes tiene el niño y el adulto y cual es la erupción dentaria en orden cronológico",
              "conoce los procesos por los cuales se forman las caries",
              "conoce los distintos procesos congénitos que afectan a los dientes",
              "sabe la importancia de la prevención de caries y fluoración"
            ],
            "testsToPass": [
              "demuestra que puedes evaluar y reconocer las lesiones de la cavidad oral",
              "demuestra que puedes preparar solución fluorada para las campañas de fluoración",
              "participa en por lo menos 2 campañas de fluoración acompañando a profesionales de área (estudiantes, internos o médicos odontólogos)",
              "realiza una campaña de educación e higiene bucal con niños pequeños (escuela, kinder, manada, hogares, etc.) enseñándoles la correcta técnica de cepillado y la importancia de tener una dentadura sana"
            ]
          },
          {
            "id": "promotor-de-la-salud",
            "name": "Promotor de la salud",
            "page": 7,
            "areaId": "area-salud",
            "areaName": "Salud, Seguridad y Rescate",
            "subcategoryId": "salud-ciencias",
            "subcategoryName": "Especialidades en ciencias de la salud",
            "icon": "heart-pulse",
            "color": "#D90429",
            "basicKnowledge": [
              "conoce la importancia de los servicios básicos",
              "conoce la importancia y el impacto que tiene los agentes tóxicos en la salud de las personas",
              "sabe las funciones de los servicios de primer, segundo y tercer nivel de atención medica",
              "conoce los distintos programas vigentes en nuestro país tales como Tuberculosis, dengue, sida, rabia, etc.",
              "conoce en que consiste las campañas de vacunación y cual es el esquema de vacunación vigente en nuestro país",
              "conoce en que consiste el Pai 2, cuales son las enfermedades que reprotegen y cuales son las vacunas cual es la vía de administración y cual es la dosis"
            ],
            "testsToPass": [
              "Demuestra que sabes las distintas vías de administración de vacunas y puedes colocar vacunas o registrar en la planilla",
              "participa de una charla o curso sobre el pai donde se los adiestra en la vacunación, cadena de frió",
              "participa con un grupo de amigos de una campaña de vacunación ya sea como registrador o como vacunador"
            ]
          }
        ]
      },
      {
        "id": "salud-seguridad",
        "name": "Especialidades en seguridad y rescate",
        "areaId": "area-salud",
        "specialties": [
          {
            "id": "seguridad-vial",
            "name": "Seguridad vial",
            "page": 8,
            "areaId": "area-salud",
            "areaName": "Salud, Seguridad y Rescate",
            "subcategoryId": "salud-seguridad",
            "subcategoryName": "Especialidades en seguridad y rescate",
            "icon": "car-traction-control",
            "color": "#C9184A",
            "basicKnowledge": [
              "Averigua y explica acerca de las principales disposiciones que regulan el tránsito de peatones, vehículos y ciclistas.",
              "Averigua el significado de las señales de tránsito.",
              "Demuestra que conoces los significados de cada uno de los colores del Semáforo.",
              "Señala 5 reglas a seguir, al caminar en una carretera.",
              "Explica el significado de 10 señales de transito restrictivas y las informativas.",
              "Nombra las reglas de transito al manejar una bicicleta."
            ],
            "testsToPass": [
              "Realiza un mural con al menos 15 señales de transito PREVENTIVAS que tu conozcas.",
              "Da a conocer a tu Unidad, utilizando material audiovisual, recortes de periódico, etc. sobre las causas de accidentes de tránsito y las maneras de prevenirlos.",
              "En una caminata de por lo menos 10 cuadras por el centro de tu ciudad apunta todas las faltas a las normas de transito cometidas ya sea por peatones como por conductores.",
              "Participa en campañas de prevención de accidentes, ruido excesivo, etc.",
              "Identifica con ayuda de tu equipo, situaciones de riesgo relacionadas con el tránsito en tu barrio o el de tu comunidad escolar y solicita a quien corresponda su solución."
            ]
          }
        ]
      }
    ],
    "totalSpecialties": 4
  },
  {
    "id": "area-ciencias",
    "name": "Ciencias, Tecnología e Informática",
    "icon": "atom",
    "color": "#3A0CA3",
    "description": "Química, mecánica, astronomía, meteorología, tecnología de alimentos, computación y desarrollo digital.",
    "subcategories": [
      {
        "id": "ciencias-tecnologia",
        "name": "Especialidades en ciencias y tecnología",
        "areaId": "area-ciencias",
        "specialties": [
          {
            "id": "quimico",
            "name": "Químico",
            "page": 9,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-tecnologia",
            "subcategoryName": "Especialidades en ciencias y tecnología",
            "icon": "flask",
            "color": "#3A0CA3",
            "basicKnowledge": [
              "Conoce qué estudia la química, sus ramas y su importancia en el desarrollo de la humanidad.",
              "Las diferencias entre compuestos ácidos y básicos, presenta algunos ejemplos de uno y otro.",
              "La diferencia entre química inorgánica y química orgánica.",
              "Conoce el uso del material y los instrumentos más comunes en un laboratorio de química.",
              "Haz un estudio de los productos utilizados en tu hogar, sobre los compuestos que contienen y su acción específica.",
              "Explica qué es una reacción química, qué es un reactivo, un reactante y un catalizador.",
              "Haz un estudio de por lo menos 3 reacciones químicas que utilizamos en nuestra vida diaria y cómo podemos optimizarla.",
              "Indica cuáles son las medidas de seguridad en un laboratorio y los primeros auxilios necesarios en casos de accidente con compuestos peligrosos.",
              "Demuestra que conoces el sistema de clasificación periódico de los elementos."
            ],
            "testsToPass": [
              "Participa en alguna feria de ciencias o de colegio, donde realices algún experimento de química.",
              "Indica los usos comerciales e industriales de por lo menos 20 elementos de la tabla.",
              "Diseña un experimento en el que apliques todos tus conocimientos de química y muéstralo a tu Unidad o Grupo."
            ]
          },
          {
            "id": "mecanico",
            "name": "Mecánico",
            "page": 10,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-tecnologia",
            "subcategoryName": "Especialidades en ciencias y tecnología",
            "icon": "wrench",
            "color": "#3A0CA3",
            "basicKnowledge": [
              "Explica cuales son las principales herramientas utilizadas en talleres de mecánica.",
              "Explica cuales son los materiales que se emplean en un taller mecánico y sus principales características.",
              "Indica los tipos de soldadura y en qué casos se utiliza.",
              "Explica las partes principales y el funcionamiento de: el motor, sistema eléctrico y lubricación en un automóvil.",
              "Explica la mecánica de la caja de cambios."
            ],
            "testsToPass": [
              "Demuestra que puedes utilizar correctamente herramientas como martillo, limas, llaves de tuercas, desarmadores, etc.",
              "Demuestra habilidad en cuatro de las siguientes operaciones: • Verificar el nivel de aceite del motor y de la caja. • Limpiar y ajustar bujías. • Limpiar y pulir un automóvil. • Sacar y limpiar un filtro de carburador. • Sacar el agua de un radiador y limpiarlo. • Cambiar una llanta • Chequear la presión de los neumáticos.",
              "Prepara una lista de 6 puntos de inspección para la revisión de un automóvil tanto en apariencia como las condiciones de funcionamiento."
            ]
          },
          {
            "id": "astronomo",
            "name": "Astrónomo",
            "page": 11,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-tecnologia",
            "subcategoryName": "Especialidades en ciencias y tecnología",
            "icon": "telescope",
            "color": "#3A0CA3",
            "basicKnowledge": [
              "Investiga y explica acerca de los eclipses solares y lunares.",
              "Explica sobre el sistema solar y la vía láctea.",
              "Explica sobre las caras de la luna, sin olvidar la localización de mares y cráteres.",
              "Investiga y explica las teorías de la formación de planetas y sistemas.",
              "Explica los conceptos generales sobre: Estrellas y satélites naturales.",
              "Explica cuales son las estrellas que sobresalen y cómo se clasifican.",
              "Explica sobre los Tipos y uso del telescopio.",
              "Explica el cambio de estaciones, cambios climáticos y movimientos de la tierra."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Visita un observatorio astronómico.",
              "Hallar los puntos cardinales mediante las constelaciones.",
              "Conocer por lo menos 8 constelaciones de los dos hemisferios.",
              "Determina la hora por medio del sol y las estrellas.",
              "Reconoce constelaciones y estrellas en el firmamento.",
              "En una salida identificar mediante un telescopio cuerpos celestes (cúmulos, estrellas dobles, estrellas inestables, y nebulosas).",
              "Construye una maqueta del sistema solar y explica cada una de las estaciones del año y el movimiento aparente.",
              "Construye un reloj de sol y leer la hora. Compárala con la hora oficial."
            ]
          },
          {
            "id": "meteorologo",
            "name": "Meteorólogo",
            "page": 12,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-tecnologia",
            "subcategoryName": "Especialidades en ciencias y tecnología",
            "icon": "weather-partly-cloudy",
            "color": "#3A0CA3",
            "basicKnowledge": [
              "Investiga y explica el origen y la evolución de la meteorología.",
              "Explica los mecanismos que determinan los diferentes fenómenos atmosféricos.",
              "Investiga y explica acerca de los diferentes tipos de nubes y su significado.",
              "Explica que instrumentos se utilizan en meteorología.",
              "Explica todas las unidades en las que se miden los fenómenos climatológicos."
            ],
            "testsToPass": [
              "Investiga y explica todas las formaciones de nubes y como producen lluvia.",
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "Visitar una estación meteorológica, identificando los métodos para el estudio y la predicción del tiempo.",
              "Recopila datos brindados por el servicio Meteorológico durante un período de tiempo y vuélcalo en un cuadro comparativo. Extrae de ellos, los valores medios y extremos.",
              "Construye tu base meteorológica casera con al menos 3 instrumentos (pluviómetro, barómetro, anemómetro, higrómetro, tanque de evaporación, termómetro y veleta).",
              "Registra diariamente el estado del tiempo, teniendo en cuenta: temperatura, presión, humedad, vientos, nubes y precipitaciones, basándote en tus observaciones, y compáralos con las del servicio meteorológico.",
              "Realiza un registro de observaciones diarias del tiempo durante un mínimo de 4 meses incluyendo la temperatura, presión, vientos, y precipitación fluvial.",
              "Realiza una predicción de los fenómenos atmosféricos, de un día que tu elijas según tus observaciones"
            ]
          },
          {
            "id": "tecnologia-de-alimentos",
            "name": "Tecnología de alimentos",
            "page": 13,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-tecnologia",
            "subcategoryName": "Especialidades en ciencias y tecnología",
            "icon": "food-apple",
            "color": "#3A0CA3",
            "basicKnowledge": [
              "Explica que sustancias químicas se pueden encontrar en los alimentos.",
              "Explica que estudia la nutrición y porque es importante.",
              "Explica como se clasifican los alimentos.",
              "Explica los cuidados y la limpieza que deben tener los distintos tipos de alimentos.",
              "Explica las causas del deterioro de los alimentos.",
              "Explica los métodos de conservación de alimentos. (Ej. Pasteurización, salado en seco, salmuera, conservas, etc.)",
              "Explica que alimentos son los de mayor producción en tu Departamento."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Demuestra que conoces al menos 3 técnicas de conservación de alimentos.",
              "Visita una industria de alimentos en tu Departamento y realiza una exposición a tu Unidad de lo observado.",
              "Elabora un cuadro, donde señales los principales alimentos que se producen en tu Departamento, clasificándolos por tipo y señalando sus principales características nutricionales."
            ]
          },
          {
            "id": "agricultor",
            "name": "Agricultor",
            "page": 14,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-tecnologia",
            "subcategoryName": "Especialidades en ciencias y tecnología",
            "icon": "sprout",
            "color": "#3A0CA3",
            "basicKnowledge": [
              "Investiga y explica como esta conformado el suelo.",
              "Explica como se debe de conservar y preparar el suelo para la agricultura.",
              "Averigua y explica cuales son las herramientas y maquinarias, que se usan para agricultura.",
              "Infórmate sobre diferentes tipos de ganados existentes en tu Departamento como también de las especies nativas del mismo.",
              "Explica cual es la importancia de la rotación de cultivos y la eliminación de plagas, de forma no contaminantes.",
              "Explica los tipos y técnicas de cultivo que se utilizan en tu Departamento.",
              "Explica que es la agricultura orgánica"
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Fabrica abono con elementos no contaminantes.",
              "Realiza una exposición para todo el grupo de la importancia de la agricultura para el país",
              "Organiza junto a tu Unidad, una salida a una finca o hacienda y colaboren en la reparación de cercas, alimentación de animales, etc.",
              "Prepara un pedazo de tierra, para su cultivo. En ella: Ara, siembra, cosecha, empaca y transporta lo cultivado en el tiempo adecuado."
            ]
          },
          {
            "id": "geologo",
            "name": "Geólogo",
            "page": 15,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-tecnologia",
            "subcategoryName": "Especialidades en ciencias y tecnología",
            "icon": "terrain",
            "color": "#3A0CA3",
            "basicKnowledge": [
              "Explica la Hontoria de la geología.",
              "Explica cuales son las ramas de la geología.",
              "Averigua sobre las principales etapas de un proceso de extracción minera.",
              "Investiga y explica los diferentes tipos de fenómenos geológicos e identifica los efectos que pueden tener.",
              "Infórmate sobre las explotaciones mineras más importantes del país.",
              "Investiga explica la división de los tiempos geológicos y prepara un resumen haciendo referencia de algunos ejemplos.",
              "Explica los principales usos con los minerales: aluminio, carbón, cobre, estaño, hierro y uranio.",
              "Explica los principales peligros y enfermedades a los que están expuestos los mineros, señalando los medios de prevención más utilizados."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Identifica al menos quince rocas o minerales, clasifícalos y esquematiza su constitución química general.",
              "Realiza un mapa que señale las principales explotaciones mineras del país indicando sus características, tipo de mineral y sistema de extracción",
              "Realiza una maqueta que muestre la conformación de los continentes actuales a través de las eras geológicas."
            ]
          }
        ]
      },
      {
        "id": "ciencias-informatica",
        "name": "Especialidades en ciencias de la informática",
        "areaId": "area-ciencias",
        "specialties": [
          {
            "id": "hardware-de-la-computadora",
            "name": "Hardware de la computadora",
            "page": 16,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-informatica",
            "subcategoryName": "Especialidades en ciencias de la informática",
            "icon": "memory",
            "color": "#4361EE",
            "basicKnowledge": [
              "Debes conocer la historia de la computadora y su evolución, conocer e identificar los tipos de computadora.",
              "Debes conocer los componentes físicos de una computadora de escritorio (Procesador, Memorias, Tarjetas de video, placa madre, disco duro, fuente de poder, tarjeta de sonido)",
              "Debes de conocer los tipos de puertos que posee una computadora(puertos físicos: paralelos, serial, usb, sata, PCi, PCI express, Agp; puertos lógicos: ftp, http, ssh, telnet, SMTP, etc)",
              "Debes de conocer que es el BIOS y sus configuraciones",
              "Debes conocer todos los dispositivos de entrada (E), salida (S) y entrada/salida (E/S) para la comunicación con la computadora(escáner, DVD/CD, plotter, mouse, impresora, teclado, monitor, lápiz óptico, etc)",
              "Debes conocer la manera correcta de armar un equipo completo de computación (todo lo que posee el case y los componentes físicos complementarios)",
              "Debes conocer todos los tipos de impresoras que existen en el mercado, sus diferencias, cualidades, calidad de impresión, tipo de impresión.",
              "Debes de conocer los tipos de sistemas operativos que existen (Windows, Linux y MAC os) y la forma de instalarlos",
              "Debes saber instalar los driver del hardware de computadora y el software básico para un trabajo normal con el equipo ( Microsoft Windows, Microsoft Office, Antivirus)",
              "Debes de conocer y saber para que sirven las fuentes de suministro eléctrico (UPS), las fuentes de poder y los estabilizadores"
            ],
            "testsToPass": [
              "Realiza una exposición en tu unidad acerca de la historia de la computación (debes tener para esto cuadros explicativos, slides, transparencias, etc.)\u0000Realiza una exposición en tu unidad acerca de la historia de la computación (debes tener para esto cuadros explicativos, diapositivas, línea de tiempo, etc.)",
              "Describe un equipo de computación, todos sus componentes y todas sus posibilidades lo más detallado posible. (Describe un equipo de computación, todos sus componentes y todas sus cualidades lo más detallado posible.)",
              "Demuestra en tu unidad la manera correcta de mantener limpia una computadora, y enseña en esta los cuidados necesarios que se debe tener con un equipo.",
              "Arma un equipo de Computación, y has que arranque el BIOS y verifica que este reconozca los dispositivos instalados.",
              "Instala en un equipo de computación el software básico para trabajar con el equipo.",
              "Realiza el diagnostico para actualizar un equipo y entrega un informe técnico del procedimiento de actualización (componente o software a actualizar, soporte del equipo actual referente a la actualización, el costo de la actualización).",
              "Explica en tu unidad como se puede mantener limpio de virus un equipo de computación y limpia de virus dos equipos.",
              "Explica en tu unidad como se puede mantener limpio de virus un equipo de computación y limpia de virus dos equipos o dispositivos de almacenamiento externo (pen drive, discos duros externos)."
            ]
          },
          {
            "id": "software-de-computadora",
            "name": "Software de computadora",
            "page": 17,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-informatica",
            "subcategoryName": "Especialidades en ciencias de la informática",
            "icon": "code-braces",
            "color": "#4361EE",
            "basicKnowledge": [
              "Debe conocer el manejo completo de Dos Sistemas Operativos (MS-DOS, Microsoft Windows, Linux, UNIX, etc.) \u0000Debe conocer el manejo básico de Dos Sistemas Operativos (Windows, Linux, MAC os, etc.), su instalación y su manejo",
              "Debes manejar eficientemente un Procesador de Palabras, Planilla Electrónica.",
              "Debes manejar eficientemente un paquete estadístico.",
              "Debes manejar eficientemente por lo menos dos Graficadores. \u0000Debes manejar eficientemente por lo menos un editor de imágenes (Photoshop, GIMP).",
              "Debes de manejar eficientemente por lo menos un editor de video",
              "Debes manejar eficientemente por lo menos un Administrador de base de Datos (Access, MySQL, POSTGRESS, etc), dos Administradores de directorios y/o(total commander) archivos 7. Debes manejar eficientemente dos Antivirus.",
              "Debes de conocer en concepto de direcciones ip (ipv4, ipv6).",
              "Debes de conocer la configuración de redes por lo menos en 2 sistemas operativos"
            ],
            "testsToPass": [
              "Elabora dos pequeños manuales en un procesador de palabras que incluyan gráficos y tablas del manejo básico de los sistemas operativos que conozcas para el uso de tu unidad",
              "Diseña en una planilla electrónica unos formularios de uso frecuente de tu unidad, logra la aprobación de tu unidad y su respectiva implementación.",
              "Diseña en computadora por lo menos tres insignias, para actividades de tu unidad, con su respectivo certificado de participación.",
              "Elabora un cortometraje de las vivencias con tu unidad y/o actividades distritales.",
              "Diseña una base de datos en Access, donde almacenes información de tus dirigentes, compañeros, de los campamentos y quienes asistieron y mantenlo actualizado por lo menos 4 meses.",
              "Demuestra que sabes manejar dos administradores de archivos a toda tu unidad. 16. Instala un antivirus en tu equipo y demuestra como utilizarlo en tu unidad, limpiadapor lo menos 1 computadora y 3 pen drivers.",
              "Explica en una exposición que son los virus y como se pueden proteger los equipos y otros dispositivos de almacenamiento.",
              "configura 3 computadoras para que estén en red y que cada una tenga acceso a internet."
            ]
          },
          {
            "id": "programador",
            "name": "Programador",
            "page": 18,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-informatica",
            "subcategoryName": "Especialidades en ciencias de la informática",
            "icon": "laptop",
            "color": "#4361EE",
            "basicKnowledge": [
              "Debes de conocer la cronología de lenguajes de programación.",
              "Debes conocer los paradigmas de programación.",
              "Debes saber por lo menos una técnica sencilla de Análisis de Sistemas.",
              "Debes conocer por lo menos tres lenguajes de programación funcional, tres de programación estructurada y tres de programación orientada a objetos",
              "Debes saber manejar perfectamente por lo menos un lenguaje de programación.",
              "Debes de conocer el moldeamiento de entidad- relación",
              "Debes manejar por lo menos tres manejadores de base de datos."
            ],
            "testsToPass": [
              "Elabora un documento de requerimientos funcionales y no funcionales de un sistema que requiera tu unidad (seguimiento de asistencia, cuotas de tu unidad, plan de adelanto, etc).",
              "Elabora un documento de de casos de uso de un sistema que requiera tu unidad (seguimiento de asistencia, cuotas de tu unidad, plan de adelanto, etc).",
              "Elabora un documento de arquitectura donde muestres el diagrama de base de datos y otros dos diagramas (secuencia, despliegue, clases, etc ) de tu preferencia de un sistema que requiera tu unidad (seguimiento de asistencia, cuotas de tu unidad, plan de adelanto, etc).",
              "Programa un sistema que requiera tu unidad (seguimiento de asistencia, cuotas de tu unidad, plan de adelanto, etc). Usando el lenguaje de programación de tu preferencia usando conexión a un manejador de base de datos de tu preferencia"
            ]
          },
          {
            "id": "internet",
            "name": "Internet",
            "page": 19,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-informatica",
            "subcategoryName": "Especialidades en ciencias de la informática",
            "icon": "web",
            "color": "#4361EE",
            "basicKnowledge": [
              "Que es Internet y su historia?",
              "Que servicios ofrece Internet?",
              "Conexión a internet",
              "Quees la World Wide Web (WWW)?",
              "Conocer los navegadorespara internet",
              "Que son los buscadores de internet 7. Que es un correo electrónico",
              "Comunicación en on-line",
              "Compras por internet",
              "Seguridad en internet",
              "Blog y redes sociales"
            ],
            "testsToPass": [
              "Explicar a tu unidad que es el internet y la ventaja que aprender a usar el internet.",
              "Aprender a instalar y utilizar 2 navegadores.",
              "Buscar información que sean útiles para tu unidad en 3 buscadores diferentes.",
              "Crea una cuenta de e-mail basado en WWW (gratuito).",
              "Muestra como se escribe y envía un mensaje de correo electrónico.",
              "Describe las partes de una dirección de correo electrónico.",
              "Mantén contacto por correo electrónico con al menos 5 amigos(as).",
              "Qué es un hipervínculo.",
              "Copia un archivo de la WWW, en el disco duro de tu computadora.",
              "Suscríbete a un foro electrónico scout.",
              "Crea un blog gratuito para tu unidad",
              "Crea un grupo en cualquier red social de tu unidad"
            ]
          },
          {
            "id": "disenador-grafico",
            "name": "Diseñador gráfico",
            "page": 20,
            "areaId": "area-ciencias",
            "areaName": "Ciencias, Tecnología e Informática",
            "subcategoryId": "ciencias-informatica",
            "subcategoryName": "Especialidades en ciencias de la informática",
            "icon": "palette-outline",
            "color": "#4361EE",
            "basicKnowledge": [
              "Demuestra que conoces los paquetes básicos de diseño gráfico y los paquetes básicos de computación.",
              "Demuestra que conoces los colores básicos que se utilizan en diseño gráfico para la composición de la imagen.",
              "Explica qué es una separación de color de una imagen.",
              "Opera al menos tres paquetes gráficos, y dos de fotografía y color. 5. Demuestra tus conocimientos en un paquete con el cual tu trabajes preferentemente. 6. conocer una grafica digital."
            ],
            "testsToPass": [
              "Realiza un tríptico, un póster y una publicación de una empresa pionera de tu unidad, que contenga fondos, efectos, fotografías y textos.",
              "Imprimir el tríptico en separación de color.",
              "Retocar una fotografía borrando sus defectos.",
              "Redibujar una ilustración sencilla (Logo de unidad y logo de grupo).",
              "Realiza un collage de al menos tres elementos (montaje fotográfico).",
              "Hazte cargo por 6 meses de la publicación y diseño de todos los materiales gráficos de tu unidad."
            ]
          }
        ]
      }
    ],
    "totalSpecialties": 12
  },
  {
    "id": "area-sociales",
    "name": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "icon": "account-group",
    "color": "#AE2012",
    "description": "Desarrollo social, historia, civismo, lenguas, emprendimiento económico, periodismo y literatura.",
    "subcategories": [
      {
        "id": "sociales-desarrollo",
        "name": "Especialidades en desarrollo social y político",
        "areaId": "area-sociales",
        "specialties": [
          {
            "id": "guia-turistico",
            "name": "Guía turístico",
            "page": 21,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "map-marker-path",
            "color": "#AE2012",
            "basicKnowledge": [
              "Explica cual es la importancia del turismo para tu Departamento y para el país.",
              "Investiga y expone en tu unidad los atractivos turísticos que tiene tu Departamento y el país.",
              "Investiga y expone las condiciones que tiene tu Departamento y el país para promover el turismo, como ser carreteras, hotelería, restaurantes, transporte, etc.",
              "Demuestra que sabes guiar a otras personas"
            ],
            "testsToPass": [
              "Realiza un mapa de tu ciudad que contenga direcciones y números telefónicos de centros de interés cultural, lugares de recreación, campos deportivos, ferias artesanales, monumentos históricos, zoológicos, mercados, estaciones, terminales de micros, trenes, aeropuertos, etc.",
              "Realiza un álbum de fotografías, recortes, etc. de atractivos turísticos de tu Departamento.",
              "Diseña un itinerario turístico por tu ciudad o Departamento de un día de duración y realízalo guiando a lobatos o exploradores de tu grupo.",
              "Da a conocer a tu Unidad, utilizando material audiovisual, fotografías, etc. las posibilidades turísticas de seis lugares de paseo, ubicadas en los alrededores de tu ciudad.",
              "Realiza un afiche o folleto turístico de la Departamento donde vives y difúndelo con scouts de otros departamentos o de otros países."
            ]
          },
          {
            "id": "civismo",
            "name": "Civismo",
            "page": 22,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "flag",
            "color": "#AE2012",
            "basicKnowledge": [
              "Explica sobre los poderes del Estado y sus funciones",
              "Lee la Constitución Política del Estado; e investiga algunos de tus derechos y obligaciones como ciudadano, y la organización del Gobierno Nacional, Departamentales y Municipales.",
              "Escoge dos gobiernos extranjeros e investiga qué diferencias tiene con el gobierno de Bolivia.",
              "Investiga y explica dónde y quiénes fueron los que firmaron el Acta de la Independencia.",
              "Explica las consecuencias de ser un país mediterráneo y algunas soluciones que propondrías.",
              "Realiza un análisis con tu familia, de los servicios con los que cuenta tu ciudad y barrio.",
              "Demuestra que conoces los símbolos patrios y su evolución histórica.",
              "Demuestra que conoces las instituciones de servicio y las organizaciones de acción ciudadana de tu ciudad y colabora en algún proyecto con una de ellas."
            ],
            "testsToPass": [
              "Mostrar cómo debe usarse y cuidarse la bandera nacional; coordina los honores a la bandera dentro tu grupo o en campamento.",
              "Marca en un mapa de la comuna, la ubicación de los organismos públicos, principales servicios públicos y privados, indicando sus funciones.",
              "Haz un gráfico sobre la organización de tu gobierno local e indica los nombres de los principales funcionarios.",
              "Colabora con algún trámite familiar (Patentes, RUC, Catastro, etc.) en institución pública hasta su fin y explica los pormenores que tuviste.",
              "Recopila artículos de diferentes opiniones, sobre algunos de los problemas existentes, en tu comunidad local.",
              "Entrevista a una autoridad municipal o vecinal, sobre algunos de estos problemas. 15. Presencia y observa al menos una sesión del Consejo municipal o Departamental de tu ciudad, o algún organismo similar.",
              "Organiza y lleva a cabo con tu Equipo, Unidad, grupo scout, etc. una actividad de servicio, destinada a cooperar en beneficio y satisfacción del barrio, ante una necesidad de la misma.",
              "Prepara una actividad con tu equipo o unidad para difundir y promocionar los “Derechos de la Niñez”",
              "Realiza una encuesta en dos barrios de tu ciudad, uno que se encuentre en el centro y el otro en un sector periurbano, sobre los servicios con los que cuentan, identifica las diferencias y elabora un reporte para darlo a conocer a las autoridades correspondientes."
            ]
          },
          {
            "id": "alfabetizador",
            "name": "Alfabetizador",
            "page": 23,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "book-open-variant",
            "color": "#AE2012",
            "basicKnowledge": [
              "Investiga y explica los niveles de analfabetismo en el país y en tu departamento.",
              "Investiga y explica si hay alguna institución dedicada a la alfabetización en tu departamento o ciudad y contáctala."
            ],
            "testsToPass": [
              "Capacítate como alfabetizador en la institución correspondiente.",
              "Coordina acciones específicas en actividades de alfabetización, ya sea que las realice tu grupo, escuela u otra organización.",
              "Participa como alfabetizador en alguna campaña o proyecto que se realiza en tu Departamento.",
              "Diseña y coordina un programa de promoción cultural para tu unidad y grupo scout.",
              "Promueve y organiza la realización de talleres y actividades culturales en tu colegio.",
              "Realiza un proyecto de difusión de la cultura nacional, en tu ciudad.",
              "Elabora un artículo sobre la experiencia al participar en la alfabetización de otra(s) persona(s), o en el incremento de su nivel cultural, publícalo en el mural o boletín de tu grupo o unidad."
            ]
          },
          {
            "id": "historia",
            "name": "Historia",
            "page": 24,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "history",
            "color": "#AE2012",
            "basicKnowledge": [
              "Investiga y explica el papel de la historia en el desarrollo de la humanidad.",
              "Investiga y explica toda la historia de nuestro país.",
              "Investiga y explica la historia del escultismo mundial, nacional y local.",
              "Destaca a 5 personalidades, que según tu criterio sean los más importantes de la historia mundial en el último siglo, indica las razones y presenta sus biografías",
              "Destaca a 5 personalidades, que según tu criterio sean los más importantes de la historia nacional en el último siglo, indica las razones y presenta sus biografías",
              "Menciona 5 hechos que consideres de los más importantes en la historia mundial del último siglo.",
              "Domina, al menos un periodo de 40 años en la historia de Bolivia.",
              "Tener conocimientos generales de la historia moderna y clásica.",
              "Menciona 5 hechos que consideres de los más importantes en la historia nacional del último siglo.",
              "Realiza una exposición de la historia de tu equipo, de tu unidad y de tu grupo Scout."
            ],
            "testsToPass": [
              "Elabora un álbum de la historia de por lo menos los últimos 10 años de la ciudad donde vives con fotografías, recortes, dibujos, etc.",
              "Elabora un albun de la historia de tu grupo scout., con fotografías, recortes, dibujos, etc.",
              "Crea o mejora el libro de oro de tu equipo.",
              "Haz una investigación para redactar la historia de la comunidad o barrio donde vives."
            ]
          },
          {
            "id": "tradiciones-indigenas",
            "name": "Tradiciones indígenas",
            "page": 25,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "feather",
            "color": "#AE2012",
            "basicKnowledge": [
              "Investiga y explica la política del Gobierno Boliviano con respecto al indigenismo y compáralo con la de otros países.",
              "Investiga y explica que culturas indígenas existieron en nuestro territorio.",
              "Investiga y explica que culturas indígenas, aun existen en nuestro país, donde se ubican sus principales costumbres, su evolución histórica, su principal actividad económica, etc.",
              "Investiga y explica los principales problemas con los que viven en las comunidades indígenas.",
              "Investiga como es un día normal para un: indígena el que tu prefieras (chiquitano, quechua, guaraní, etc.) y compara sus horarios, actividades, etc. en una tabla con la de un hombre de la ciudad.",
              "Demuestra que conoces las lenguas indígenas del país y elaborar un diccionario con las palabras más comunes.",
              "Conocer al menos una técnica que utilice la comunidad indígena escogida en la manufactura de sus bienes"
            ],
            "testsToPass": [
              "Tener una colección de objetos indígenas que abarquen al menos 4 culturas del país y 2 extranjeras. al menos",
              "Visita un museo o un centro de investigación relacionado al indigenismo.",
              "Visita una comunidad indígena y prepara una exposición para tu unidad o grupo scout de lo que pudiste ver en la comunidad.",
              "Lleva a cabo un proyecto de difusión de una cultura indígena del país, en tu barrio, colegio, grupo scout, etc."
            ]
          },
          {
            "id": "interprete-traductor",
            "name": "Intérprete/Traductor",
            "page": 26,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "translate",
            "color": "#AE2012",
            "basicKnowledge": [
              "especialidad:",
              "Investiga y explica sobre los orígenes del idioma que escogiste",
              "Investiga y expón los países en los que se habla el idioma que escogiste y averigua sobre su cultura y principales características.",
              "Investiga y aprende las reglas gramaticales básicas del idioma que escogiste."
            ],
            "testsToPass": [
              "Lee y traduce un pasaje de un libro, revista o periódico.",
              "Sostén una conversación de por lo menos 15 minutos en el idioma que escogiste.",
              "Escribe una carta o un ensayo de por lo menos 400 palabras en el idioma que escogiste.",
              "Adquiere conocimientos elementales de algún otro idioma, aparte del que escogiste.",
              "Ayuda de intérprete o traductor a alguna persona que lo requiera."
            ]
          },
          {
            "id": "amigo-del-mundo",
            "name": "Amigo del mundo",
            "page": 27,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "earth",
            "color": "#AE2012",
            "basicKnowledge": [
              "Investiga y explica la historia y geografía de por lo menos tres países de cada continente.",
              "Investiga y explica la geografía, economía, organización social, organización política, costumbres y religión de por lo menos cinco países de diferente idioma.",
              "Averigua y explica la capital, moneda, presidente actual y la bandera de al menos 30 países.",
              "Explica los principales problemas que afectan a los países del tercer mundo",
              "Explica que es la globalización.",
              "Explica sobre la Organización del Movimiento Scout y la Asociación Mundial de las Guías Scouts, como también su distribución por el mundo.",
              "Recopila información, sobre el trabajo de otras organizaciones internacionales de cooperación y servicio.",
              "Reconoce los principales problemas mundiales."
            ],
            "testsToPass": [
              "Escoge un país de cualquier parte del mundo y realiza un mural con: Geografía, economía, organización social, producción, costumbres, etc. Te sugerimos colocar el mural en tu rincón de equipo.",
              "Participa en un evento internacional y conoce la mayor cantidad de gente posible.",
              "Mantén correspondencia con por lo menos 7 amigos de diferentes países.",
              "Consigue pañoletas y/o insignias scouts de 10 países."
            ]
          },
          {
            "id": "promotor-de-la-paz",
            "name": "Promotor de la paz",
            "page": 28,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "peace",
            "color": "#AE2012",
            "basicKnowledge": [
              "Explica la estructura de la ONU y de los organismos que dependen de ella.",
              "Investiga y explica que organizaciones a nivel mundial son afines al Movimiento Scout.",
              "Lee la Declaración Universal de los Derecho Humanos y los Derechos de la niñez",
              "Investiga y explica la vida, ideales, etc. de al menos 3 personas que promovieron la paz en el mundo.",
              "Investiga y explica acerca de 3 acontecimientos históricos en contra de la paz mundial.",
              "Investiga e indica quienes fueron los 5 últimos ganadores del premio Nobel de la paz y explica a tu Unidad los ideales de cada uno.",
              "Explica qué significa la sigla UNESCO, cuándo fue creada y cuál es su propósito.",
              "Investiga y explica cuales son los acuerdos internacionales que Bolivia ha suscrito en materia de defensa de los derechos humanos y la promoción de la paz mundial."
            ],
            "testsToPass": [
              "Realiza un mural con recortes de noticias actuales, de periódicos nacionales o internacionales que vayan en afán de promover la paz en el mundo.",
              "Conoce las funciones de la O.N.U. y todas sus dependencias en Pro de la paz mundial.",
              "Participa en actividades de promoción de la paz local, nacional e internacional.",
              "Demuestra que conoces los principales organismos que promueven la paz mundial y los que trabajan en defensa de los derechos humanos.",
              "Organiza una campaña de promoción de la paz que trascienda tu grupo scout.",
              "Elabora un álbum fotográfico que refleje la destrucción a la que nos llevan las guerras.",
              "Elabora un álbum fotográfico que refleje la importancia de vivir en un mundo donde reine la paz entre todos.",
              "Expone ambos álbumes en tu unidad y grupo scout."
            ]
          },
          {
            "id": "amigo-de-mi-pais",
            "name": "Amigo de mi país",
            "page": 29,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "shield-star",
            "color": "#AE2012",
            "basicKnowledge": [
              "Explica la historia y geografía de nuestro país.",
              "Investiga y explica cuales son las principales fuentes de ingresos para los habitantes de nuestro país.",
              "Investiga y explica cuales son los 5 lugares mas visitados por turistas en nuestro país.",
              "Investiga e indica que instituciones trabajan en tu departamento fomentando el desarrollo de nuestro país.",
              "Demuestra que sabes de geografía de Bolivia, señalando en un mapa con rapidez: ciudades, provincias, poblaciones, ríos y montañas que se te nombre.",
              "Conoce los principales sistemas de comunicación de Bolivia: Carreteras, ferrocarriles, aeropuertos, vías fluviales, radio, televisión y telefonía.",
              "Demuestra que puedes identificar a las principales autoridades Nacionales y regionales: como Presidente, Vicepresidente y algunos ministros; Prefecto, Alcalde, etc.",
              "Explica cómo los Scouts de Bolivia, trabajamos y contribuimos con el Desarrollo Nacional."
            ],
            "testsToPass": [
              "En un mapa de Bolivia, señala los lugares de interés histórico más importantes",
              "Presenta un cuadro o afiche con todos los símbolos patrios, su historia e importancia en las actividades cotidianas.",
              "Participa de algún evento de carácter nacional, ya sea campamento, curso o taller.",
              "Visita alguna provincia alejada, con tu familia o con tu equipo; presenta un reporte de tu visita, indicando los principales problemas que tiene y las posibles soluciones que planteas.",
              "Participa en una campaña de vacunación en tu ciudad o área rural.",
              "Participa en actividades de desarrollo regional, TRO o campañas de prevención de drogas."
            ]
          },
          {
            "id": "lector",
            "name": "Lector",
            "page": 30,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-desarrollo",
            "subcategoryName": "Especialidades en desarrollo social y político",
            "icon": "book-reader",
            "color": "#AE2012",
            "basicKnowledge": [
              "Investiga y explica Los diferentes estilos literarios y explica las características de cada uno de ellos.",
              "Demuestra que Conoces los cuidados para la preservación de los libros.",
              "Menciona quienes obtuvieron el premio Nobel de Literatura (al menos 3 y el título de la obra premiada).",
              "Menciona al menos 10 autores nacionales y sus obras.",
              "Demostrar que sabes consultar un tema en la biblioteca.",
              "Explica cuál es el papel que cumple un crítico literario.",
              "Averigua toda la bibliografía de Baden Powell, lee “Escultismo para muchachos” y realiza una comparación con el escultismo actual."
            ],
            "testsToPass": [
              "Lee al menos 6 libros en el periodo aproximado de no más de 12 meses, éstos deberán incluir libros sobre Escultismo, novelas clásicas y otros sobre interés particular.",
              "Elabora fichas bibliográficas para cada uno de ellos, las mismas deben incluir biografía del autor, estilo, tema y otros.",
              "Presenta tu carnet de lector de alguna biblioteca de tu ciudad",
              "Presenta una lista de las bibliotecas que hay en tu región.",
              "Forma una Biblioteca, o amplía la existente en tu unidad, grupo o escuela, manteniéndola en perfectas condiciones y llevando un control de los libros, que entran y salen.",
              "Realiza un resumen de uno de los libros que más te gustó, en no más de 3 páginas.",
              "Elabora un mapa conceptual sobre un libro que leiste"
            ]
          }
        ]
      },
      {
        "id": "sociales-economia",
        "name": "Especialidades en economía",
        "areaId": "area-sociales",
        "specialties": [
          {
            "id": "emprendedor-de-negocios",
            "name": "Emprendedor de negocios",
            "page": 31,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-economia",
            "subcategoryName": "Especialidades en economía",
            "icon": "cash-multiple",
            "color": "#9B2226",
            "basicKnowledge": [
              "Investiga sobre las diferentes posibilidades de negocio que te podrían interesar.",
              "Según el lugar, región y/o departamento donde vives identifica un negocio que te interese e identifica las oportunidades y obstáculos que tendrías.",
              "Investiga sobre lo que es una ventaja competitiva y lo que es una ventaja comparativa. Analízalo en la actividad que vas a emprender."
            ],
            "testsToPass": [
              "Organiza un Grupo de Trabajo, para desarrollar tu empresa, teniendo en cuenta el perfil de persona necesario para cada responsabilidad, trazándote una meta de negocio con un determinado tiempo para alcanzarla.",
              "Realiza una investigación de mercado para la empresa que te interesa.",
              "Grafica con tu Grupo de Trabajo el camino de vida que va a seguir tu negocio, teniendo en cuenta los posibles obstáculos que averiguaste.",
              "Elabora un plan de negocios donde incluya un análisis “FODA” que sea lo más cercano a tu realidad.",
              "Ejecuta el plan de negocios que has realizado, y evalúa el éxito obtenido"
            ]
          }
        ]
      },
      {
        "id": "sociales-comunicacion",
        "name": "Especialidades en expresión y comunicación",
        "areaId": "area-sociales",
        "specialties": [
          {
            "id": "periodista",
            "name": "Periodista",
            "page": 32,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-comunicacion",
            "subcategoryName": "Especialidades en expresión y comunicación",
            "icon": "newspaper-variant",
            "color": "#BB3E03",
            "basicKnowledge": [
              "Explica cuales son las funciones de un periodista.",
              "Explica cuales son las reglas básicas de redacción periodística.",
              "Explica los estilos periodísticos principales. Pirámide, Pirámide invertida, etc.",
              "Explica las diferencias entre periodista de periódico, de radio y de televisión",
              "Consigue, lee y analiza el código ético del periodista. Con ejemplos y ve si se cumple en el país."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "Entrevista a un periodista sobre su profesión y utiliza la entrevista para realizar un corto artículo sobre el periodismo Escribe un artículo sobre el Escultismo en Bolivia.",
              "Presenta al menos 3 artículos relacionados con las actividades scouts.",
              "Escribe un artículo (tema libre) con datos que hayas obtenido en la hemeroteca de tu ciudad.",
              "Presenta una lista completa de todos los medios de comunicación: radio, prensa y televisión de tu ciudad",
              "Visita la sala de prensa de cualquier medio.",
              "Presenta algunos de los artículos al boletín informativo de tu grupo o distrito.",
              "Menciona al menos 10 periodistas destacados de tu país.",
              "Realiza y presenta una entrevista grabada a una de las autoridades Scout de tu distrito.",
              "Escribe un artículo sobre una actividad de impacto social en el que haya participado tu unidad.",
              "Escribe un artículo sobre el escultismo y su incidencia en la ciudad e inténtalo publicar en algún medio de publicación.",
              "Realiza al menos una entrevista a un scout extranjero acerca del escultismo en su país."
            ]
          },
          {
            "id": "fotografo",
            "name": "Fotógrafo",
            "page": 33,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-comunicacion",
            "subcategoryName": "Especialidades en expresión y comunicación",
            "icon": "camera",
            "color": "#BB3E03",
            "basicKnowledge": [
              "La historia de la fotografía. ¿Quien invento la maquina fotográfica? ¿en que año y país?.",
              "Que es la fotografía? Que es una cámara fotográfica?",
              "Mencionar 5 tipos de cámaras fotográficas.",
              "Cómo la fotografía utiliza la luz para impresionar imágenes.",
              "Las partes y funciones de una cámara fotográfica",
              "Conoce las reglas básicas de composición.",
              "Como se utiliza y para qué, el obturador, el diafragma, el fotómetro, medidor de la velocidad, macroenfoque, como activar el temporizador, activación de hora y fecha, etc.",
              "¿Cuando y como es aconsejable el uso del flash?",
              "¿Que cuidados se debe dar a una cámara fotográfica?"
            ],
            "testsToPass": [
              "Con una maquina fotográfica saca las siguientes fotografías: • Foto de exterior • Foto de interior • Foto periodística • Foto artística • Foto paisaje • Foto con efecto Blanco y Negro • Foto con efecto Sepia. • Foto de tu grupo • Foto de tu equipo • Foto de tu unidad.",
              "Elaborar un álbum con las fotografías sacadas en el anterior punto",
              "Con una cámara saca fotografías con las siguientes características: • Fotografía sin luz (con la luz de una vela sin Flash) • Fotografía Instantánea (Con el medidor de velocidad en 1000 o 2000) • Fotografía inmóvil (Con el medidor de velocidad en B)",
              "Saca por los menos 10 fotografías de una actividad importantes que se desarrolle en tu grupo o distrito scout.",
              "Organiza una exposición en tu grupo de todas las fotografías tomadas para esta especialidad.",
              "Elabora un álbum fotográfico de un campamento de tu Unidad pionera"
            ]
          },
          {
            "id": "escritor",
            "name": "Escritor",
            "page": 34,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-comunicacion",
            "subcategoryName": "Especialidades en expresión y comunicación",
            "icon": "feather",
            "color": "#BB3E03",
            "basicKnowledge": [
              "Investiga y explica la historia y evolución de la literatura.",
              "Explica los diferentes géneros literarios (novela, cuento, historia, ensayo, etc.)",
              "Investiga y explica los derechos de autor en nuestro país.",
              "Explica que es prosa y verso."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Demuestra que conoces las reglas de ortografía, puntuación, gramática y de sintaxis.",
              "Presenta un escrito de no menos de 2 páginas de tema libre tomando en cuenta tus conocimientos en las reglas mencionadas en el anterior punto.",
              "Tienes nociones básicas sobre el manejo de frases y párrafos en escritos.",
              "Elige uno de los estilos literarios de tu agrado y escribe una obra con él.",
              "Cuenta a tu unidad algún cuento o novela que hayas escrito, no olvidando las partes de una narración (Presentación, nudo o problema y desenlace).",
              "Realiza la biografía del autor que más te guste.",
              "Colabora con el periódico, mural o boletín de tu unidad, grupo o distrito durante un periodo mínimo de 2 meses.",
              "Logra que una de tus obras sea publicada en cualquier boletín, revista juvenil, Periódico, memoria anual, etc."
            ]
          },
          {
            "id": "oratoria",
            "name": "Oratoria",
            "page": 35,
            "areaId": "area-sociales",
            "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
            "subcategoryId": "sociales-comunicacion",
            "subcategoryName": "Especialidades en expresión y comunicación",
            "icon": "bullhorn",
            "color": "#BB3E03",
            "basicKnowledge": [
              "Demuestra que conoces las reglas básicas de la oratoria.",
              "Demuestra que conoces las reglas básicas de pronunciación y modulación.",
              "Realiza un curso de oratoria de al 10 Horas académicas"
            ],
            "testsToPass": [
              "Realiza prácticas con grabadora para mejorar la oratoria.",
              "Realiza Lectura en voz alta y con técnica frente a público para presentar lo siguiente: • Una noticia • Una propaganda • Un cuento • Un cuento infantil",
              "Crea y diserta frente a público un discurso de por lo menos 7 minutos de cualquier tema de interés.",
              "Presenta en un lugar público, una charla sobre las características y beneficios de ser scout."
            ]
          }
        ]
      }
    ],
    "totalSpecialties": 15
  },
  {
    "id": "area-arte",
    "name": "Arte, Cultura y Deporte",
    "icon": "palette",
    "color": "#E76F51",
    "description": "Artes escénicas, música, gastronomía, deportes de montaña, atletismo, artes marciales y ajedrez.",
    "subcategories": [
      {
        "id": "arte-cultura",
        "name": "Especialidades en arte y cultura",
        "areaId": "area-arte",
        "specialties": [
          {
            "id": "baile-y-danza",
            "name": "Baile y danza",
            "page": 36,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-cultura",
            "subcategoryName": "Especialidades en arte y cultura",
            "icon": "dance-ballroom",
            "color": "#E76F51",
            "basicKnowledge": [
              "Investiga y explica la evolución del baile y la danza.",
              "Explica la clasificación de la danza y selecciona la de tu mayor agrado.",
              "Investiga y explica los bailes modernos de los últimos 5 años y en que país se originaron.",
              "Explica la importancia de la danza en el desarrollo de la cultura.",
              "Demuestra que conoces las danzas típicas de tu Departamento y del país",
              "Demuestra que conoces los aspectos históricos de la danza que dominas, así como su vestuario."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Ejecuta ante público tres danzas, una folklórica, una clásicas y una moderna.",
              "Demuestra que puedes bailar por lo menos seis ritmos diferentes.",
              "Demuestra que puedes bailar solo(a), con pareja o en grupo.",
              "Demuestra que puedes improvisar un baile.",
              "Asiste a eventos, motivo de la especialidad.",
              "Prepara con tu equipo o unidad una presentación para algún festival de danza."
            ]
          },
          {
            "id": "actor",
            "name": "Actor",
            "page": 37,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-cultura",
            "subcategoryName": "Especialidades en arte y cultura",
            "icon": "theater",
            "color": "#E76F51",
            "basicKnowledge": [
              "Explica lo básico acerca de la historia del teatro, dónde y cuánto se inició y cuándo fue su apogeo.",
              "Investiga y explica al menos tres expresiones básicas del teatro (drama, comedia, ficción)",
              "Explica la importancia de la iluminación, vestuario, maquillaje, sonido y escenografía en una obra teatral.",
              "Menciona el nombre de 5 actores o actrices nacionales."
            ],
            "testsToPass": [
              "Escribe un guión y represéntalo con tu equipo",
              "Interpreta un monólogo breve de una obra de tu agrado, tomando en cuenta una buena vocalización.",
              "Realiza tres caracterizaciones de distintos personajes, teniendo en cuenta maquillaje, vestuario y expresión corporal.",
              "Presenta un programa de pantomima de al menos 5 actos a tu Unidad.",
              "Demostrar que es capaz de conectarse con el público, haciendo sentir al mismo parte del teatro, como en un diálogo donde el público es la segunda persona que no te responde",
              "Memoriza un libreto de por lo menos 20 minutos de duración.",
              "Demuestra que conoces al menos 3 obras de teatro clásicas y tres obras nacionales.",
              "Elabora una obra de teatro de por lo menos 15 minutos tomando en cuenta todos tus conocimientos teatrales.",
              "Preparar con tiempo de anticipación y presentar la obra teatral que preparaste en tu unidad, grupo o distrito.",
              "Pertenece a un elenco teatral de tu barrio, colegio, parroquia o grupo scout. Si no existiese, promueve su formación."
            ]
          },
          {
            "id": "musico",
            "name": "Músico",
            "page": 38,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-cultura",
            "subcategoryName": "Especialidades en arte y cultura",
            "icon": "music",
            "color": "#E76F51",
            "basicKnowledge": [
              "Investiga y explica sobre la evolución de la música desde sus inicios hasta nuestros días, identificando sus principales características en diferentes épocas.",
              "Explica los grupos de instrumentos musicales, explicando su clasificación"
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "Demuestra que sabes tocar satisfactoriamente, el instrumento musical que escogiste y explica los cuidados que se debe de tener con el mismo, su origen y evolución.",
              "Demuestra que puedes afinar el instrumento.",
              "Lee con facilidad una página de música simple",
              "Realiza un cancionero de 30 temas Scouts como mínimo y difúndelo en tu tropa y grupo.",
              "Dirige al menos 10 canciones scouts en un campamento o actividad scout.",
              "Realiza una pequeña biografía de tu músico favorito.",
              "Compone una canción ya sea en música o letra.",
              "Realiza una lista de al menos, 10 grupos o solistas nacionales destacados a nivel internacional.",
              "Enseña a otro Pionero de tu Unidad a tocar el instrumento.",
              "Organiza un festival musical en tu grupo scout o distrito."
            ]
          },
          {
            "id": "pintura",
            "name": "Pintura",
            "page": 39,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-cultura",
            "subcategoryName": "Especialidades en arte y cultura",
            "icon": "palette",
            "color": "#E76F51",
            "basicKnowledge": [
              "Investiga y explica la historia de la pintura, elige algún pintor famoso e investiga su vida y obras.",
              "Investiga cuáles son las galerías de arte más importantes del mundo y dónde se encuentran.",
              "Investiga cuáles son las pinturas o cuadros más importantes del mundo y donde se encuentran.",
              "Investiga y explica cuales son las técnicas básicas de la pintura.",
              "Explica cuáles fueron las técnicas antiguas de la pintura desde el principio de la historia.",
              "Indica cuales son los implementos utilizados en este arte."
            ],
            "testsToPass": [
              "Realiza una comparación de los diferentes estilos de acuerdo a la época indicando un pintor destacado de cada una.",
              "Demuestra que sabes manejar los colores primarios y obtener los colores secundarios.",
              "Presenta un estudio de color en tres tipos diferentes de técnica (Pastel, acuarela, óleo, etc.)",
              "Demuestra que sabes restirar lienzos y repararlos.",
              "Organiza una visita con tu equipo a algún museo o galería de tu ciudad y con ayuda de un experto oriéntalos en la apreciación de las obras exhibidas.",
              "Realiza al menos una pintura con la técnica de tu agrado, demostrando que dominas la técnica.",
              "Organiza un taller de pintura para tu Unidad, tropa o para la manada."
            ]
          },
          {
            "id": "reposteria",
            "name": "Repostería",
            "page": 40,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-cultura",
            "subcategoryName": "Especialidades en arte y cultura",
            "icon": "cake-variant",
            "color": "#E76F51",
            "basicKnowledge": [
              "Explica el funcionamiento de un horno",
              "Demuestra que conoces los utensilios que se utilizan en repostería.",
              "Conoce el equivalente de pesos y medidas usuales en repostería.",
              "Conoce los primeros auxilios para accidentes más comunes."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "Demuestra que utilizas el horno tomando en cuenta todas las normas de seguridad necesarias.",
              "Realiza un recetario para campamentos y difúndelo en tu unidad y grupo.",
              "Demuestra que sabes decorar pasteles para distintas ocasiones.",
              "Visita alguna repostería y elabora una exposición para tu unidad de todo lo observado.",
              "Enseña a tu equipo a preparar al menos tres pasteles diferentes.",
              "Prepara un tipo de cada uno de los siguientes postres: galletas, gelatinas, pasteles horneados y en frío, confituras, budines y mermeladas y realiza una degustación en tu grupo y colegio.",
              "Construye un horno de campamento y prepara al menos 3 recetas."
            ]
          },
          {
            "id": "cocina",
            "name": "Cocina",
            "page": 41,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-cultura",
            "subcategoryName": "Especialidades en arte y cultura",
            "icon": "chef-hat",
            "color": "#E76F51",
            "basicKnowledge": [
              "Investiga y explica sobre los diferentes grupos de alimentos y las formas de cómo pueden combinarse para producir una dieta balanceada. Reconociendo en alimentos frescos y envasados, características de deterioro y vencimiento.",
              "Investiga y explica la manera de conservar los alimentos en buenas condiciones para su consumo."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "Prepara un menú balanceado para un niño, un adulto y un anciano.",
              "Prepara un menú, para un día de verano y otro de invierno, con sus correspondientes recetas.",
              "Cocina tres de los siguientes platos (comida o postre) • Un plato típico de la zona. • Un plato económico. • Un plato vegetariano. • Un plato para un enfermo celíaco o diabético. • Un plato de pocas calorías. • Un plato de otro país.",
              "Elige un tipo de cocina regional o de algún país y aprende a elaborar al menos 3 platillos característicos.",
              "Entrevista a un profesional de la cocina (chef o aprendiz)",
              "Prepara una cena completa y formal, adicionando el menú y todo su valor nutritivo, para todo tu equipo."
            ]
          },
          {
            "id": "filatelia",
            "name": "Filatelia",
            "page": 42,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-cultura",
            "subcategoryName": "Especialidades en arte y cultura",
            "icon": "email-seal",
            "color": "#E76F51",
            "basicKnowledge": [
              "Investiga y explica la historia y el origen del correo en Bolivia y el mundo",
              "Investiga y explica el origen de los sellos postales; también, explica el propósito para que los usaran.",
              "Explica las características de un sello de buena condición filatélica y los tipos de sellos postales que existen.",
              "Conoce las condiciones en el ambiente filatélico que le dan valor a un sello, además explicar por qué el valor de un sello postal puede diferir del valor en los catálogos",
              "Conoce el equipo básico de un filatelista y demuestra su uso y cuidados",
              "Conoce la organización de algún club o organismo filatélico del país.",
              "Explica el propósito de cada uno de los siguientes tipos de sellos: • Conmemorativo • Permanente • Aéreo • semipostal • Seguro postal • Precancelado"
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Demuestra que estas familiarizado con los términos mas utilizados en la filatelia.",
              "Demuestras que conoces los diferentes tipos de álbumes, como montar los sellos postales en un álbum con y sin charnelas, muestra los manejos y cuidados adecuados para los sellos postales.",
              "Explica los motivos y características que usas para formar una colección de sellos postales, explica el propósito de cada uno de los siguientes tipos de sellos: Permanente, conmemorativo, aéreo, semipostal, seguro postal y precancelado.",
              "De tu colección, cuáles son los sellos más atractivos y el por qué de esta consideración. 13. Expone tu colección de por lo menos 300 sellos postales."
            ]
          },
          {
            "id": "serigrafista",
            "name": "Serigrafista",
            "page": 43,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-cultura",
            "subcategoryName": "Especialidades en arte y cultura",
            "icon": "printer",
            "color": "#E76F51",
            "basicKnowledge": [
              "Demuestra que conoces por lo menos 5 técnicas de impresión.",
              "conoce y cataloga los materiales serigraficos según las técnicas apropiadas",
              "Demuestra que conoces los distintos tipos de tintas que existen y que uso tiene cada una de ellas.",
              "Describe cuáles son los colores básicos y cuáles son las combinaciones de las mismas para obtener los demás colores.",
              "Describe cuáles son las herramientas necesarias para la serigrafía, además de su uso y cuidado.",
              "Describe como se queman negativos y como se obtienen películas de serigrafía."
            ],
            "testsToPass": [
              "Dibuja un croquis de un taller de diseño grafico con todos sus elementos y herramientas y describe a detalle cada una de ellas.",
              "Confecciona viñetas por una impresión sencilla.",
              "Demuestra que sabes utilizar la malla antes y después de la impresión.",
              "Realiza un banderín decorativo para tu equipo.",
              "diseña por lo menos 5 estampas diferentes a todo color.",
              "Participa en un concurso de logotipo para cualquier actividad.",
              "Presenta una polera impresa por ti mismo.",
              "Inventa un tipo de letras original.",
              "Enseña a imprimir tu propia insignia de equipo u otro logotipo afín para autoadhesivos.",
              "Realiza una exposición para tu Grupo o unidad de todos los trabajos en serigrafía.",
              "Realiza por lo menos 10 trabajos serigrafiados con técnicas y materiales distintos.",
              "Serigrafía una tasa, un cuero, un lapicero, una gorra y una polera"
            ]
          }
        ]
      },
      {
        "id": "arte-deporte",
        "name": "Especialidades en deporte y cuidado del cuerpo",
        "areaId": "area-arte",
        "specialties": [
          {
            "id": "montanismo",
            "name": "Montañismo",
            "page": 44,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "image-filter-hdr",
            "color": "#F4A261",
            "basicKnowledge": [
              "Define los conceptos de escalada deportiva en roca y andinismo, ¿cual es la diferencia?",
              "¿Cuáles son las cumbres más altas de Bolivia, y las cumbres mas altas de cada continente (Europa, Asia, África, Antártica, Sudamérica y Norteamérica).",
              "Describe el equipo que se usa para la escalada en nieve y hielo.",
              "¿Cuáles son las normas de seguridad a seguir en la montaña o mientras se escala?",
              "¿Cuáles son los principios ambientales que se deben seguir en la montaña?",
              "¿Qué es un peligro objetivo, qué es un peligro subjetivo?",
              "conocer todo el equipo de andinismo Mochila, cuerdas, herramientas de sujeción. De traslación de alimentación, de seguridad, de movilidad.",
              "Conocer la historia del montañismo nacional e internacional.",
              "¿Cuáles son las características de la cuerda estáticas y las cuerdas dinámicas y cuál el uso de cada una de ellas?",
              "Conocer la ropa apropiada y la forma correcta de vestirse en la montaña."
            ],
            "testsToPass": [
              "Conocer cabulleria, primeros auxilios y caminante",
              "Muestra la forma correcta de ponerse un arnés de cintura y un arnés de pecho.",
              "Muestra la forma correcta de conectar una cuerda al arnés.",
              "Muestra la forma de improvisar un arnés con cinta tubular.",
              "Muestra la forma de montar un anclaje con protección fija artificial y como montar un anclaje cuando no existe esta protección.",
              "Muestra la forma de guardar y mantener la cuerda y demás piezas de equipo.",
              "Apareja un dispositivo de rapel, y desciende una altura no menor a 10 metros.",
              "Muestra la forma de ascender por una cuerda mediante ayudas mecánicas.",
              "Realiza 6 nudos que se usan en montañismo y explica su uso.",
              "Interpreta una hoja de descripción de ruta.",
              "Elabora un itinerario de escalada o salida al campo y realízalo con tu equipo."
            ]
          },
          {
            "id": "escalada-deportiva-en-roca",
            "name": "Escalada deportiva en roca",
            "page": 45,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "hiking",
            "color": "#F4A261",
            "basicKnowledge": [
              "Explica la diferencia entre escalda en LÍDER, TOP y BOULDER.",
              "Explica las partes características y uso de cordinos, cuerda, arnés, zapatillas, mosquetones, cintas, aparatos de aseguramiento, bolsa de magnesio y vestuario.",
              "Explica las normas generales de seguridad en la escalada deportiva.",
              "Repite las voces y comandos de escalada.",
              "Explique los principios y normas ambientales.",
              "Explique la clasificación técnica de las rutas de escalada."
            ],
            "testsToPass": [
              "Demuestre las técnicas de aseguramiento.",
              "Demuestre las técnicas básicas de agarre y pisadas.",
              "Demuestra las técnicas y normas de seguridad para realizar un anclaje.",
              "Escalar una vía 6a o superior en Top.",
              "Escalar una vía de nivel 5 o superior en líder.",
              "Realiza los siguientes nudos: • Ocho • Cinta. • Dinámico. • Pescador. • Ballestrinque. • Marchand y Prusick, explicar porqué es mejor utilizar el marchand y olvidar el prusiano. • Bulim para encordamiento",
              "Resolver un problema de Boulder a vista."
            ]
          },
          {
            "id": "atletismo",
            "name": "Atletismo",
            "page": 46,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "run-fast",
            "color": "#F4A261",
            "basicKnowledge": [
              "Explica la historia y evolución del Atletismo",
              "Explica que disciplinas corresponden al atletismo.",
              "Saber de que se tratan las siguientes especialidades. • Velocidad. • Fondos • Lanzamiento de bala • Lanzamiento de jabalina • Lanzamiento de disco. • Salto con garrocha. • Carrera de bayas. • Carrera con obstáculos. • Salto largo • Salto alto • Marcha",
              "Explica al menos las rutinas de ejercicios adecuados para tres disciplinas.",
              "Explica el reglamento básico de al menos otras 3 competencias olímpicas de atletismo, de tu elección."
            ],
            "testsToPass": [
              "Demuestra que practicas, activamente y conoces claramente las reglas de al menos dos disciplinas.",
              "Demuestra que mantienes un buen estado físico.",
              "Demuestra que llevas una dieta balanceada acorde a tu edad, y que conoces dietas adecuadas para la práctica de al menos dos disciplinas de atletismo.",
              "Demuestra que conoces las reglas de seguridad y los primeros auxilios en caso de accidentes.",
              "Realiza un registro sobre el desarrollo de una disciplina elegida en el ámbito local, nacional e internacional (datos, recortes, fotografías, etc.)",
              "Organiza competencias de atletismo con tu unidad",
              "Participa activamente en el equipo de atletismo de tu colegio."
            ]
          },
          {
            "id": "natacion",
            "name": "Natación",
            "page": 47,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "swim",
            "color": "#F4A261",
            "basicKnowledge": [
              "Explica sobre los reglamentos, condiciones físicas y normas de seguridad que rigen para el desarrollo de la disciplina.",
              "Forma parte de un club de natación"
            ],
            "testsToPass": [
              "Nada en estilo libre al menos 100 metros sin descanso",
              "Saber nadar en por lo menos cuatro estilos diferentes de competición.",
              "Nadar por lo menos 100 metros con la ropa puesta.",
              "Desvestirse dentro el agua (pantalones, polera y medias).",
              "Poder Sumergirse hasta 2 m. de profundidad y sacar del fondo un objeto que pese por lo menos 2 Kg.",
              "Sumergirse en el agua y realizar un recorrido de por lo menos 10 metros",
              "Mantente a flote por un tiempo razonable según tu Sinodal.",
              "Demuestra que no tienes problemas al nadar en ríos, arroyos o lagunas.",
              "Debes saber tirarte de la orilla de cabeza y de pie, además de conocer las precauciones necesarias.",
              "Anima a los integrantes de tu equipo, unidad o grupo de amigos a que aprendan a nadar. En caso de que sepan, realicen una actividad acuática junto al sinodal.",
              "Demuestra junto al sinodal, que sabes hacer una maniobra de salvataje, con salvavidas y cuerda."
            ]
          },
          {
            "id": "ciclismo",
            "name": "Ciclismo",
            "page": 48,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "bike",
            "color": "#F4A261",
            "basicKnowledge": [
              "Explica el origen y la evolución de la bicicleta.",
              "Explica las normas de tránsito que debe respetar un ciclista y los materiales y herramientas necesarios para el arreglo y mantenimiento de una bicicleta.",
              "Posee una bicicleta en buenas condiciones y equipada con lámpara, timbre, reflector trasero y delantero.",
              "Explica el reglamento de transito de tu Departamento",
              "Indica el manejo correcto de una bicicleta en una carrera de alta velocidad.",
              "Indica el mantenimiento que debe seguir una bicicleta."
            ],
            "testsToPass": [
              "Demuestra que sabes manejar correctamente bicicleta demostrando destreza y total dominio de la misma en alguna de las disciplinas (Ej. Velocidad, campo traviesa, ruta, acrobacia).",
              "Demuestra que sabes parchar correctamente las llantas.",
              "Desarma tu bicicleta, límpiala y vuelve a armarla, ajustando correctamente sus partes e indicando las funciones de cada una de ellas.",
              "Demuestra que respetas el reglamento de tránsito de tu Departamento.",
              "Recorre 10 Km. de distancia en bicicleta de acuerdo a tu disciplina, ejecutando y cumpliendo todas las normas de seguridad.",
              "Organiza un raid por tu ciudad en bicicleta, con tu equipo, tomando en cuenta todas las medidas de seguridad Durante y enseña a tu equipo las principales reparaciones en el raid."
            ]
          },
          {
            "id": "defensa-personal",
            "name": "Defensa personal",
            "page": 49,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "karate",
            "color": "#F4A261",
            "basicKnowledge": [
              "Explica sobre el desarrollo de la disciplina elegida en el ámbito local, nacional e internacional (datos, recortes, fotografías, etc.).",
              "Explica las normas que rigen la disciplina.",
              "Explica en tu unidad los beneficios de la práctica de la disciplina que elegiste.",
              "Inculca en tu unidad actitudes únicamente de defensa y nunca de ataque."
            ],
            "testsToPass": [
              "Demostrar capacidad y avance en la disciplina que seleccionaste, identificando en que te ha ayudado a mejorar como persona.",
              "Demuestra que conoces las reglas de la disciplina.",
              "Practica una rutina que te permita mantenerte en un buen estado físico.",
              "Demuestra que sabes: • Defenderte de un ataque por la espalda. • Defenderte de un ataque frontal sujeto de las muñecas. • Defenderte de un ataque lateral sujeto de un brazo. • Defensa de ataque frontal o lateral de ataque con puño. • Defenderte de un golpe de gancho de puño. • Defenderte de un ataque frontal o lateral.",
              "Practica la disciplina regularmente, en un centro de deportes habilitado.",
              "Participa en competencias o demostraciones",
              "Organiza una competencia de la disciplina para tu Unidad, grupo scout, barrio, escuela, etc."
            ]
          },
          {
            "id": "deportista",
            "name": "Deportista",
            "page": 50,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "trophy",
            "color": "#F4A261",
            "basicKnowledge": [
              "Explica los beneficios directos e indirectos de la practica del deporte",
              "Explica las normas y reglas del deporte que practicas",
              "Investiga y explica la organización del Deporte a nivel Regional, Nacional e internacional.",
              "Indica en qué puede influir la droga, el alcohol y el cigarrillo en el rendimiento del deportista.",
              "Demuestra que conoces las instancias organizativas del deporte en el ámbito nacional."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "Haz una presentación donde identificas los beneficios directos e indirectos de la práctica deportiva.",
              "Demuestra que practicas diariamente el deporte de tu preferencia y forma parte de la selección de tu colegio o de un club.",
              "Elabora un cronograma de rutina de un día normal de un deportista, además, incluye la dieta adecuada que debe seguir.",
              "Demuestra que conoces las enfermedades deportivas y/o lesiones más comunes, generadas por el deporte que practicas.",
              "Planifica, organiza y ejecuta una tarde deportiva en tu Unidad o Grupo.",
              "Elabora un folleto que promueva la práctica continua del Deporte y difúndelo en tu equipo, unidad, grupo, amigos y familia.",
              "Participa en al menos una competencia o campeonato del deporte que practicas."
            ]
          },
          {
            "id": "ajedrez",
            "name": "Ajedrez",
            "page": 51,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "chess-knight",
            "color": "#F4A261",
            "basicKnowledge": [
              "Investiga y explica la historia del ajedrez.",
              "Investiga y explica quienes fueron o son los mayores exponentes del ajedrez.",
              "Explica las reglas internacionales del ajedrez.",
              "Conoce al menos cinco aperturas.",
              "Conoce dos formas diferentes de llevar la anotación de una partida.",
              "Conoce las reglas internacionales de una partida de ajedrez y de un torneo.",
              "Conoce cinco defensas diferentes."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "reproduce 10 partidas famosas siguiendo la anotación y explícalas a un experto.",
              "Usa correctamente el reloj de juego.",
              "Organiza un torneo en tu unidad o grupo.",
              "Participa en uno o más torneos."
            ]
          },
          {
            "id": "aeromodelismo",
            "name": "Aeromodelismo",
            "page": 52,
            "areaId": "area-arte",
            "areaName": "Arte, Cultura y Deporte",
            "subcategoryId": "arte-deporte",
            "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
            "icon": "airplane",
            "color": "#F4A261",
            "basicKnowledge": [
              "Explica la mecánica de vuelo y menciona los tipos de aviones en aeromodelismo.",
              "Explica cuales son las partes de un motor de aeromodelismo.",
              "Explica los diferentes tipos de materiales de construcción de un modelo de aeromodelismo e indica en qué partes del modelo se utilizan.",
              "Indica las características de una buena madera de balsa y en qué puntos del modelo se puede utilizar.",
              "Explica la importancia del balanceado, centrado y diedro del ala.",
              "Demuestra que conoces todas las categorías de aeromodelos y las piruetas más importantes en vuelos radiocontrolados."
            ],
            "testsToPass": [
              "Describe las herramientas necesarias para la construcción de aeromodelos.",
              "Diseña y construye un modelo de pequeñas dimensiones (Fuselaje balsa 4 cm, ala balsa 2 cm, envergadura 25 cm, largo de fuselaje 25 cm, estabilizador 8 cm."
            ]
          }
        ]
      }
    ],
    "totalSpecialties": 17
  },
  {
    "id": "area-naturaleza",
    "name": "Vida en Naturaleza y Espiritualidad",
    "icon": "leaf",
    "color": "#2D6A4F",
    "description": "Conservacionismo ecológico, reciclaje, botánica, zoología, apicultura y animación de la fe.",
    "subcategories": [
      {
        "id": "naturaleza-ecologista",
        "name": "Especialidades en vida en naturaleza (ecologista)",
        "areaId": "area-naturaleza",
        "specialties": [
          {
            "id": "conservacionista",
            "name": "Conservacionista",
            "page": 53,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-ecologista",
            "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
            "icon": "shield-leaf",
            "color": "#2D6A4F",
            "basicKnowledge": [
              "prevención, uso, cuidado y protección del suelo y sus recursos naturales, renovables y no renovables, de sus aguas, recursos marítimos, de especies de flora y fauna a fin de garantizar su máximo de productividad y utilidad no sólo para la actual generación sino para las futuras, por tiempo indefinido.",
              "Identifica los recursos renovables y no renovables que existen en nuestro país.",
              "Explica con tus palabras que es desarrollo sostenible",
              "Explicar en qué consisten los recursos naturales (agua, tierra y aire). Y describir con ejemplos como los contamina el hombre.",
              "Explicar que es el calentamiento global y cual sus consecuencias.",
              "Explica qué es un ecosistema y cuántos tipos existen en Bolivia.",
              "Averigua cuántos y qué Parques Nacionales existen en Bolivia, la extensión de cada uno de ellos, su ubicación, clasificación y las principales especies de flora y fauna que resguardan.",
              "Investiga a fondo por lo menos diez especies de animales y diez especies de plantas que actualmente están en peligro de extinción, el ecosistema en que viven, las causas que producen su riesgo de desaparición y cómo podríamos ayudar a su conservación.",
              "Informarse acerca de la manera de generación de energía en nuestro país y el impacto ecológico que produce",
              "Conoce qué son las energías alternativas.",
              "Cuáles son los residuos que más contaminan en un campamento y la influencia de estos en el medio ambiente."
            ],
            "testsToPass": [
              "Participa activamente de la campaña “A limpiar el Mundo” (Clean up the World).",
              "Ponte como meta visitar tres de los parques nacionales que investigaste como mínimo en dos años.",
              "Visita a las Instituciones de tu región que trabajan en la conservación del ambiente, y averigua que hacen por éste.",
              "Organiza por lo menos una actividad conservacionista.",
              "Realiza en campamentos un mínimo de 5 clases de fogones conservacionistas.",
              "Construye un calentador solar de agua en un campamento."
            ]
          },
          {
            "id": "forestal",
            "name": "Forestal",
            "page": 54,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-ecologista",
            "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
            "icon": "pine-tree",
            "color": "#2D6A4F",
            "basicKnowledge": [
              "Explica cual es la estructura de un árbol, como se alimenta, respira y reproduce.",
              "Explica cual es el beneficio y papel que desempeñan los árboles en la naturaleza.",
              "Averigua sobre algunos productos secundarios del bosque.",
              "Explica sobre el peligro de los incendios forestales y cómo se pueden evitar.",
              "Explica sobre las plagas mas comunes y la forma de evitarlas"
            ],
            "testsToPass": [
              "Investiga y expone en tu unidad a por lo menos 40 especies diferentes de árboles que se encuentran en nuestro país.",
              "Investiga y demuestra la forma correcta de plantar un árbol.",
              "Conoce claramente y a detalle por lo menos 10 especies diferentes de árboles.",
              "Realiza un trabajo en el que expliques qué especies son utilizadas en la industria maderera.",
              "Prepara un muestrario de semillas forestales (mínimo 10 especies).",
              "Presenta al menos 5 artículos referentes a la temática forestal.",
              "Visita un vivero o un centro de estudios forestales, averigua las actividades que realiza y identifica la interrelación con otras ciencias o actividades, coméntalo mediante una exposición en tu unidad",
              "Realiza junto a tu patrulla y/o grupo de amigos, folletos sobre el peligro de los incendios forestales, principales causas que lo originan y medios para contenerlos y sofocarlos.",
              "Cultiva y cuida, en forma permanente al menos 3 árboles diferentes",
              "Participa en una campaña de repoblamiento forestal y planta al menos 20 plantínes controlándolos hasta los 6 meses de edad."
            ]
          },
          {
            "id": "reciclador",
            "name": "Reciclador",
            "page": 55,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-ecologista",
            "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
            "icon": "recycle",
            "color": "#2D6A4F",
            "basicKnowledge": [
              "Cuál es la clasificación de residuos sólidos y de los residuos líquidos.",
              "Cuáles son las fuentes de mayor basura en un campamento",
              "Explicar en qué consiste los recursos naturales (agua, tierra, aire). Y describir con ejemplos como los contamina el hombre y si podríamos prevenir esta continua contaminación.",
              "La clasificación de la basura y su importancia.",
              "Conocer los procesos de transformación de algunos materiales en nuestro medio como ser las botellas de plástico, papel, vidrio ¿Qué hacen con ellos, como los usan?",
              "Conocer en detalle el riesgo y las consecuencias que causan las bolsas de nylon o plástico al medio ambiente.",
              "Conocer en detalle el riesgo y las consecuencias que causan las baterías o pilas usadas cuando se botan a la basura de manera inadecuada."
            ],
            "testsToPass": [
              "Promueve con tu equipo un proyecto de re utilización de basura.",
              "Realiza un reglamento para tu equipo, para que evite la excesiva producción de basura.",
              "Construye el libro de oro de unidad o equipo con papel reciclado que tú fabricaste.",
              "Demuestra la eliminación de basura dentro de un campamento: orgánica, inorgánica, aceites.",
              "Desarrollar una campaña de información y educación acerca del correcto manejo de los desechos, en tu barrio curso u otra unidad de tu grupo."
            ]
          },
          {
            "id": "botanico",
            "name": "Botánico",
            "page": 56,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-ecologista",
            "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
            "icon": "flower",
            "color": "#2D6A4F",
            "basicKnowledge": [
              "La clasificación general de las plantas según sus características.",
              "Las partes que compone una planta y las funciones que cada una desempeña.",
              "Conoce cuales son las condiciones necesarias y adecuadas para el buen crecimiento de una planta, (tipo de suelo, fertilización, clima, enfermedades).",
              "Conoce los principales tipos de multiplicación artificial de plantas. Realiza con éxito uno de ellos.",
              "Las características más importantes de una célula vegetal.",
              "Conoce cuales son las plantas típicas más representativas de tu región.",
              "Explica según tu observación, el proceso de fecundación en una planta.",
              "Explica en qué consiste el proceso de fotosíntesis, respiración y transpiración."
            ],
            "testsToPass": [
              "Identifica en el campo, por lo menos 20 plantas diferentes, incluyendo al menos dos plantas de los siguientes grupos: alimenticias, textiles, maderables, medicinales",
              "Presenta un herbario organizado según las partes de la planta y sus formas más representativas."
            ]
          },
          {
            "id": "horticultor",
            "name": "Horticultor",
            "page": 57,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-ecologista",
            "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
            "icon": "watering-can",
            "color": "#2D6A4F",
            "basicKnowledge": [
              "Realiza una lista de las principales legumbres y hortalizas que se producen y consumen en tu región, indicando las especies nativas.",
              "Investiga y explica cuales son las principales plagas que dañan las hortalizas y formas de combatir las mismas.",
              "Investiga y explica las técnicas modernas de cultivos.",
              "Investiga y explica los diferentes tipos de abonos y la aplicación adecuada de al menos tres de ellos.",
              "Explica qué es un cultivo hidropónico e intenta efectuar esta práctica"
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Prepara una carpeta en la que se muestres 6 tipos de semillas hortícolas, según su reproducción, época de siembra, periodo vegetativo y época de cosecha.",
              "Realiza un cuadro de hortalizas y legumbres con sus respectivos beneficios para la salud, vitaminas, proteínas, etc.",
              "Realiza un informe de una visita al mercado de tu ciudad o departamento y verifica qué especies hortícolas están a la venta, el estado de las mismas, almacenamiento, costos, proveedores, etc.",
              "Prepara y abona una parcela de tierra para una siembra.",
              "Produce en tu parcela dos especies hortícolas produciendo una cosecha suficiente para proveer de ellas a tu familia por lo menos durante una semana.",
              "Describe los tipos de herramientas que empleaste para tu siembra.",
              "Realiza un pequeño estudio económico, es decir, las ganancias de la venta de tu cosecha, menos tu inversión."
            ]
          }
        ]
      },
      {
        "id": "naturaleza-animales",
        "name": "Especialidades en vida en naturaleza (amigo de los animales)",
        "areaId": "area-naturaleza",
        "specialties": [
          {
            "id": "entomologo",
            "name": "Entomólogo",
            "page": 58,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-animales",
            "subcategoryName": "Especialidades en vida en naturaleza (amigo de los animales)",
            "icon": "bug",
            "color": "#40916C",
            "basicKnowledge": [
              "Investiga y explica la diferencia entre insectos benéficos y perjudiciales con ejemplos",
              "Explica la relación que guardan los insectos con otros seres vivos, así como su importancia en el equilibrio ecológico",
              "Explica la forma de clasificación de los insectos y sus fundamentos.",
              "Investiga y explica sobre insectos nocivos para la agricultura y explica en qué consiste el",
              "control de plagas con otros insectos (control biológico).",
              "Explica la metamorfosis de un insecto, observa y descríbela en una especie (Ej. Mariposa, mosca, escarabajo)"
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Observa y diferencia al menos 30 especies diferentes de insectos: sus hábitos, los lugares donde se encuentran y sus utilidades o si son dañinos.",
              "Observar Una colonia de insectos y presentar una exposición a tu Unidad de las conclusiones obtenidas.",
              "Visita un centro de investigación de insectos, identifica su interrelación con otras actividades, coméntalo mediante una exposición en tu unidad.",
              "Durante un campamento o excursión, haz una colecta de un día y noche, sólo de insectos que no sean benéficos y prepara tu insectario debidamente.",
              "Explica a tu unidad las características de los insectos que atrapaste.",
              "Identifica un foco de reproducción de insectos perjudiciales y contribuye a su eliminación"
            ]
          },
          {
            "id": "zoologia",
            "name": "Zoología",
            "page": 59,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-animales",
            "subcategoryName": "Especialidades en vida en naturaleza (amigo de los animales)",
            "icon": "paw",
            "color": "#40916C",
            "basicKnowledge": [
              "Explica que estudia la zoología y cuales son sus ramas",
              "Explica la clasificación del reino animal.",
              "Explica cuales son las especies en vías de extinción de tu Departamento y del país.",
              "Explica los peligros a los que están expuestos los animales silvestres en tu Departamento y en el país y como contrarrestarlos.",
              "Investigar y explica cual es la fauna nociva y como se la puede contrarrestar."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "Realiza un mapa del país, señalando las zonas donde se encuentran los animales en vías de extinción.",
              "Visita un zoológico de alguna ciudad del país y prepara un informe de lo positivo y negativo que viste en el.",
              "Participar como guía de la manada o la tropa de tu grupo, en la visita a un parque, reserva natural o zoológico, explicando las características de los animales que habitan en el.",
              "Confecciona un álbum de recortes y/o fotografías de animales. Clasifícalas, según orden, familia, etc. Anota sus características, costumbres, hábitat y cualquier dato de interés",
              "Organiza un campamento con tu Unidad, en una reserva ecológica y coopera con los trabajos de preservación de fauna en ella.",
              "Participar en una campaña o un proyecto enfocado en la protección de la fauna."
            ]
          },
          {
            "id": "ornitologo",
            "name": "Ornitólogo",
            "page": 60,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-animales",
            "subcategoryName": "Especialidades en vida en naturaleza (amigo de los animales)",
            "icon": "bird",
            "color": "#40916C",
            "basicKnowledge": [
              "Explica que estudia la ornitología",
              "Explica cuales son las especies de aves que están en vías de extinción en tu Departamento y el País.",
              "Explica cuales son los peligros a que están expuestas las aves silvestres de tu Departamento y como contrarrestarlas.",
              "Investiga y explica por lo menos veinte familias de aves, no domésticas, que habiten en tu Departamento.",
              "Realiza una investigación de por lo 5 especies de aves útiles para la agricultura en el control de plagas, insectos, hiervas y de 5 aves de rapiña útiles para el control de roedores."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
              "Realiza un mapa del país, señalando las zonas donde se encuentran las aves en vías de extinción.",
              "Observa durante varias horas, aves silvestres, en tres ambientes naturales distintos. Haz un informe de lo observado, que incluya bosquejos, grabaciones, fotografías, etc.",
              "Reconoce por el sonido, sus nidos o huevos, diez tipos de aves.",
              "Construye 3 tipos de refugios para aves y colócalos en diferentes lugares.",
              "Confecciona un álbum de recortes y/o fotografías de aves. Clasifícalas, según orden, familia, etc. Anota sus características, costumbres, hábitat y cualquier dato de interés",
              "Participar en una campaña o un proyecto enfocado en la protección de las aves.",
              "Alimenta aves durante por lo menos 2 meses, mediante la construcción de comederos y bebederos para aves."
            ]
          },
          {
            "id": "apicultor",
            "name": "Apicultor",
            "page": 61,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-animales",
            "subcategoryName": "Especialidades en vida en naturaleza (amigo de los animales)",
            "icon": "beehive-outline",
            "color": "#40916C",
            "basicKnowledge": [
              "Investiga y explica sobre el equipo y los instrumentos que se utilizan para la apicultura moderna.",
              "Busca información sobre las clases de abejas y cómo pueden alimentarse artificialmente.",
              "Investiga y explica la época en que florecen las plantas de tu zona y cuales producen néctar.",
              "Explica acerca de la miel, que elementos la conforman y cual es el origen de su uso.",
              "Investiga y explica los tipos de abejas que existen, indicando sus principales características y sus depredadores más comunes.",
              "Investiga y explica sobre las lesiones que producen el mal manejo de las abejas y los primeros auxilios correspondientes",
              "Realiza un estudio taxonómico de las abejas y de la organización de una colonia de abejas."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Realiza un listado de los productos que se desprenden de la apicultura.",
              "Con ayuda del Experto, cuida de un enjambre, y cría abejas. Encorcha y alimenta artificialmente las mismas"
            ]
          }
        ]
      },
      {
        "id": "naturaleza-fe",
        "name": "Especialidades en animación de la fe",
        "areaId": "area-naturaleza",
        "specialties": [
          {
            "id": "animador-de-la-fe",
            "name": "Animador de la fe",
            "page": 62,
            "areaId": "area-naturaleza",
            "areaName": "Vida en Naturaleza y Espiritualidad",
            "subcategoryId": "naturaleza-fe",
            "subcategoryName": "Especialidades en animación de la fe",
            "icon": "hands-pray",
            "color": "#52B788",
            "basicKnowledge": [
              "Investiga y explica por lo menos 4 religiones diferentes de la tuya: Su origen, Historia y Doctrinas más importantes",
              "Investiga y presenta un resumen de la vida de por lo menos tres personalidades que se hayan destacado por haber vivido de acuerdo a los valores de su fe."
            ],
            "testsToPass": [
              "Difunde en tu equipo la fe; además crea espacios de reflexión y diálogo sobre el tema.",
              "Idea algunas oraciones originales para momentos precisos dentro tus reuniones de patrulla o tropa.",
              "Colabora con las celebraciones de tu Unidad, grupo y distrito.",
              "Realiza un libro para la biblioteca del grupo, Rama, etc. (o completa el existente), en donde se anoten diferentes clases de reflexiones relacionadas con la Naturaleza, con la fe, etc.",
              "Prepara, diferentes reflexiones / oraciones para: agradecer los alimentos, el final de un campamento, la inauguración de un evento, el equipo, un paso de rama, etc.",
              "Participa activamente en una comunidad religiosa, desempeñando un cargo o función (Catequesis, pastoral juvenil, etc.)",
              "Organiza una celebración para un campamento o alguna fiesta del grupo, Unidad, equipo, grupo de amigos, etc.",
              "Prepara y anima con una reflexión para la ceremonia de una Promesa"
            ]
          }
        ]
      }
    ],
    "totalSpecialties": 10
  },
  {
    "id": "area-tecnicas",
    "name": "Técnicas Scouts y Vida en Campamento",
    "icon": "tent",
    "color": "#1B4965",
    "description": "Pionerías, cabuyería y amarres, cocina de campamento, transmisiones, campismo y orientación.",
    "subcategories": [
      {
        "id": "tecnicas-scouts",
        "name": "Especialidades en técnicas scouts",
        "areaId": "area-tecnicas",
        "specialties": [
          {
            "id": "pionerias",
            "name": "Pionerías",
            "page": 63,
            "areaId": "area-tecnicas",
            "areaName": "Técnicas Scouts y Vida en Campamento",
            "subcategoryId": "tecnicas-scouts",
            "subcategoryName": "Especialidades en técnicas scouts",
            "icon": "hammer-wrench",
            "color": "#1B4965",
            "basicKnowledge": [
              "Explica el uso adecuado de cada herramienta necesaria en campamentos: hacha, machete, sierra, daga, cortaplumas, etc.",
              "Investiga y explica las ventajas y desventajas de al menos 3 tipos de cuerdas, en lo referente a materiales, grosor, peso, otros.",
              "Investiga y explica la forma de estimar la resistencia de una cuerda sólo conociendo su diámetro."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Debes saber y hacer uso de los siguientes nudos: ballestrinque, rizo, leñador, as de guía, arnés de hombre y vuelta de escota.",
              "Deberás usar correctamente los amarres: cuadrado, diagonal, redondo y trípode.",
              "Demuestra que puedes desenredar con paciencia hasta terminar un bollo de cordel enredado.",
              "Ejecuta por lo menos tres anclajes diferentes.",
              "Confeccionar una muestra de 5 tipos de ensambles de madera.",
              "Trozar apropiadamente un tronco de un diámetro superior a 25 cm. y una longitud mínima de 3 mt.",
              "Presenta una maqueta de campamento, indicando la disposición adecuada de carpas, construcciones y otros.",
              "Toma parte en la ejecución de cuatro construcciones en campamento, utilizando cañahuecas, bolillos u otros; usando los amarres correctos.",
              "Construye un refugio de campamento; choza o algo similar haciendo uso de materiales naturales del lugar y que sea apropiado para ser ocupado por dos personas.",
              "Ejecuta algunas habilidades de campamento como: mástil sin cavar, cocinas conservacionistas, instalar toldos, etc."
            ]
          },
          {
            "id": "cabuyeria",
            "name": "Cabuyería",
            "page": 64,
            "areaId": "area-tecnicas",
            "areaName": "Técnicas Scouts y Vida en Campamento",
            "subcategoryId": "tecnicas-scouts",
            "subcategoryName": "Especialidades en técnicas scouts",
            "icon": "transit-connection-variant",
            "color": "#1B4965",
            "basicKnowledge": [
              "Investiga y explica para que es importante la cabuyería y quienes la utilizan con mayor frecuencia.",
              "Investiga y explica las ventajas y desventajas de al menos 3 tipos de cuerdas, en lo referente a materiales, grosor, peso, otros.",
              "Explica la forma de estimar la resistencia de una cuerda sólo conociendo su diámetro.",
              "Explica los cuidados que se debe tener al utilizar y almacenar las cuerda."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Demuestra que conoces las ventajas y desventajas de al menos 3 tipos de cuerdas, en lo referente a materiales, grosor, peso, otros.",
              "Demuestra que conoces la terminología empleada en cabuyería, definiendo las palabras como: mena, cabo, cote, chicote, etc.",
              "Demuestra que conoces al menos 5 nudos de unión, realízalos correctamente y explica sus utilidades.",
              "Demuestra que conoces al menos 5 nudos de sujeción, realízalos correctamente y explica sus utilidades.",
              "Demuestra que conoces al menos 5 nudos de remate, realizados correctamente y explica sus utilidades.",
              "Demuestra que conoces al menos 5 eslingas, realízalas correctamente y explica sus utilidades.",
              "Demuestra que conoces al menos 5 anclajes, realízalos correctamente y explica sus utilidades.",
              "Realiza correctamente los siguientes amarres: cuadrado, diagonal, redondo, trípode; y explica sus utilidades.",
              "Elabora un cuadro de nudos con al menos 50 nudos que hayas realizado",
              "Realiza un Taller de cabuyería para los lobatos o exploradores de tu grupo."
            ]
          },
          {
            "id": "cocina-de-campamento",
            "name": "Cocina de campamento",
            "page": 65,
            "areaId": "area-tecnicas",
            "areaName": "Técnicas Scouts y Vida en Campamento",
            "subcategoryId": "tecnicas-scouts",
            "subcategoryName": "Especialidades en técnicas scouts",
            "icon": "campfire",
            "color": "#1B4965",
            "basicKnowledge": [
              "Explica sobre los utensilios utilizados para cocinar en campamento y como podrías sustituirlos en caso de no contar con ellos.",
              "Busca información sobre diferentes menús, para casos de diarrea y estreñimiento en campamento."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Construye un soporte para los utensilios de cocina.",
              "Prepara un menú balanceado, para un campamento de invierno y otro para verano.",
              "Cocina en fogata al menos durante 5 campamentos.",
              "Demuestra que conoces y aplicas correctamente las diferentes formas de empacar y conservar alimentos para campamentos de distintas duraciones.",
              "Elabora un instructivo para la clasificación de los tipos de basura, practícalo permanentemente y promueve la aplicación en los equipos de tu unidad.",
              "Demuestra que conoces las astucias de cocina como tipos de hornos, alacenas, refrigeradores y fogones.",
              "Cocina sin utensilios durante todo un campamento.",
              "Cocina los siguientes platos sin utensilios: • Huevo duro. • Pan de cazador (Pan de palo). • Papa asada.",
              "Presenta, prepara y cocina un menú completo para tu equipo, durante un campamento.",
              "Realiza un libro de recetas de cocina para campamentos que incluya sopas, carnes, pescados, pollos, verduras frescas, bebidas y postres, así como alimentos ligeros para caminatas, adjuntando sus valores alimenticios."
            ]
          },
          {
            "id": "transmisionista",
            "name": "Transmisionista",
            "page": 66,
            "areaId": "area-tecnicas",
            "areaName": "Técnicas Scouts y Vida en Campamento",
            "subcategoryId": "tecnicas-scouts",
            "subcategoryName": "Especialidades en técnicas scouts",
            "icon": "radio-handheld",
            "color": "#1B4965",
            "basicKnowledge": [
              "Investiga y explica cuales son las señales internacionales para pedir socorro y otros",
              "Investiga y explica que códigos son los más utilizados en el mundo para transmisiones de mensajes."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Envía y recibe un mensaje completo de no menos de 35 palabras mediante el código morse, utilizando un zumbador, cuerda o cualquier artefacto que emita sonidos.",
              "Envía y recibe el mismo mensaje por la noche, utilizando una linterna en forma intermitente.",
              "Envía y recibe el mismo mensaje mediante el \"semáforo\" a una distancia de por lo menos 30 m.",
              "Demuestra que conoces el Código morse, semáforo, murciélago, eucalipto, tip top y otras dos más.",
              "Indica en qué circunstancias se podrían utilizar estos tipos de transmisión de mensajes.",
              "Crea un tipo de código propio para que se puedan comunicar en clave entre los miembros de tu equipo.",
              "Realiza un taller de Transmisiones para los Lobatos o Exploradores de tu grupo."
            ]
          },
          {
            "id": "campismo",
            "name": "Campismo",
            "page": 67,
            "areaId": "area-tecnicas",
            "areaName": "Técnicas Scouts y Vida en Campamento",
            "subcategoryId": "tecnicas-scouts",
            "subcategoryName": "Especialidades en técnicas scouts",
            "icon": "tent",
            "color": "#1B4965",
            "basicKnowledge": [
              "Investiga y explica que zonas existen en tu Región aptas para realizar campamentos.",
              "Averigua como se toman en cuenta el tiempo, las condiciones climatológicas, la estación y el suministro de agua y las normas de seguridad, cuando se elige el lugar"
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Demuestra la manera correcta de empacar una mochila para una caminata de dos días.",
              "Demuestra en la práctica el respeto y el cuidado que merecen las plantas y animales de la naturaleza y la razón para ello. 6. Prepara maqueta de los siguientes tipos de fogatas: reflector, en cruz, polinesio y en estrella, construye y enciende una de ellas.",
              "Demuestra cómo se protege la leña en un día lluvioso y cómo se prepara comida en tales condiciones. 8. Demuestra cómo proteger el campamento incluyendo los alimentos, contra los animales, insectos, y el tiempo adverso",
              "Demuestra la manera correcta de eliminar basura.",
              "Elabora una maqueta de campamento de tropa, en la que se incluya el área de banderas y subcampos de patrulla, además la ubicación de cocina, comedor, letrinas y carpas.",
              "Elabora un cuadro con la típica distribución de responsabilidades en un campamento de patrullas de dos días.",
              "Construye una astucia de campamento demostrando el uso correcto de amarres y otra sin el uso de cuerdas.",
              "Demuestra haber acampado por lo menos 20 noches en campamentos con tu Equipo, Unidad o grupo."
            ]
          },
          {
            "id": "excursionismo",
            "name": "Excursionismo",
            "page": 68,
            "areaId": "area-tecnicas",
            "areaName": "Técnicas Scouts y Vida en Campamento",
            "subcategoryId": "tecnicas-scouts",
            "subcategoryName": "Especialidades en técnicas scouts",
            "icon": "compass",
            "color": "#1B4965",
            "basicKnowledge": [
              "Investiga y explica a detalle las buenas prácticas de excursionismo incluyendo el cuidado de los pies y uñas, tratamiento de las ampollas, tipo de vestimenta, calzados y medias, correcta forma de caminar con o sin mochila, las reglas de seguridad en una caminata por carretera, obtención de agua potable y realización de los fuegos de cocina, etc.",
              "Investiga y explica cómo puedes orientarte sin el uso de la brújula de día y de noche",
              "Investiga y explica que es la rosa de los vientos.",
              "Indica por lo menos 16 puntos principales de la rosa de los vientos."
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Explica y demuestra donde sea posible, los principales puntos de las buenas prácticas de excursionismo.",
              "Realiza tres amarres con los nudos correctos e indica su uso y funciones.",
              "Muestra las variantes en forma y función de tres eslingas y demuestra tres formas de remates y empalmes.",
              "Demuestra la construcción de cuatro clases de cocinas, de las cuales dos sean con conservador de calor (conservacionistas).",
              "Realiza pan de cazador",
              "Usando métodos improvisados, estima tres distancias no mayores a 800 metros y tres alturas no mayores a 30 metros con un error no mayor al 10 %.",
              "Calcula usando tu paso normal, distancias accesibles de 30 y 50 metros con un error máximo de 10%.",
              "Realiza una caminata de al menos 10 Km. Empleando un mapa y medios de orientación naturales."
            ]
          },
          {
            "id": "orientacion",
            "name": "Orientación",
            "page": 69,
            "areaId": "area-tecnicas",
            "areaName": "Técnicas Scouts y Vida en Campamento",
            "subcategoryId": "tecnicas-scouts",
            "subcategoryName": "Especialidades en técnicas scouts",
            "icon": "compass-rose",
            "color": "#1B4965",
            "basicKnowledge": [
              "Investiga y explica los tipos de orientación que existen.",
              "Explica que es la rosa de los vientos",
              "Explica la ubicación geográfica de tu ciudad, Departamento y del país.",
              "Explica como se lee un mapa y lo relacionado a la cartografía.",
              "Explica la historia de la brújula, su evolución, sus partes y el como utilizarla correctamente.",
              "Explica los diferentes métodos para obtener tiempos y distancias"
            ],
            "testsToPass": [
              "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
              "Demuestra que conoces por lo menos los 16 puntos principales de la rosa de los vientos.",
              "Demuestra que sabes leer correctamente un mapa y ubicar puntos específicos en él.",
              "Demuestra que sabes utilizar correctamente la brújula.",
              "Demuestra en que consisten por lo menos 5 métodos naturales diurnos para orientarte.",
              "Demuestra en que consisten por lo menos 5 métodos naturales nocturnos para orientarte",
              "Construye un reloj solar.",
              "Aplica tus conocimientos organizando una actividad para tu equipo o unidad, que te permita hacerlo (caminata, raid, etc.)"
            ]
          }
        ]
      }
    ],
    "totalSpecialties": 7
  }
];

export const ALL_SPECIALTIES: Specialty[] = [
  {
    "id": "soporte-basico-de-vida-primeros-auxilios",
    "name": "Soporte básico de vida (Primeros auxilios)",
    "page": 5,
    "areaId": "area-salud",
    "areaName": "Salud, Seguridad y Rescate",
    "subcategoryId": "salud-ciencias",
    "subcategoryName": "Especialidades en ciencias de la salud",
    "icon": "medical-bag",
    "color": "#D90429",
    "basicKnowledge": [
      "Conoce la anatomía básica de los sistemas Cardiaco, pulmonar, nervioso, gástrico, urinario y músculo esquelético",
      "sabe diferenciar entre las situaciones de Emergencia, Urgencia, y condición de alto riesgo",
      "Sabe cuales son los signos vitales y como se miden (Pulso o frecuencia cardiaca, frecuencia respiratoria, temperatura, presión arterial)",
      "conoce el ABC del auxiliador y sabe como dar soporte a las funciones vitales básicas.",
      "sabe como organizar su escenario y como realizar el acercamiento inicial a una victima",
      "sabe como utilizar y valorar el avds o mini examen neurológico",
      "conoce los principios con los cuales actúa maniobras como rai rac rcp heimlich",
      "puede elaborar un organigrama o árbol de decisiones con las acciones básicas a tomar",
      "sabe identificar las situaciones de alto riesgo como ser tec, shock, neumotórax a tensión, hemotórax o hemoneumotorax, tórax inestable, quemaduras, accidentes con ofidios o insectos además conoce las causas y acciones básicas a tomar",
      "sabe que es una situación de urgencia y como identificarlas como ser contusiones, heridas, hemorragias leves, fracturas, etc.",
      "conoce cuales son los elementos básicos que deben de haber en un botiquín personal, de equipo, de rama, para el auto y de la casa",
      "conoce y sabe manejar correctamente (indicaciones, reacciones adversas, dosificación etc.) un analgésico, antipirético, antiinflamatorio, antihistaminico, antiespasmódico"
    ],
    "testsToPass": [
      "Demuestra haber cursado y aprobado un curso de Soporte Básico de Vida organizado a nivel grupo, rama, distrito o nacional o por otras instituciones especializadas.",
      "Toma los signos vitales como pulso, temperatura, frecuencia respiratoria, presión arterial, nivel de conciencia",
      "Lleva a cabo correctamente la realización de maniobras como RAI, RAC, RCP y HEIMLICH",
      "Demuestra que puedes tratar quemaduras",
      "Demuestra que sabes las maniobras para cohibir hemorragias (compresión directa, uso de la gravedad, presión en vasos arteriales o venosos)",
      "Demuestra que puedes hacer inmovilización de fracturas e incluso de fracturas especiales (clavícula, etc.)",
      "Participa del equipo de atención medica por lo menos en dos eventos ya sea nivel grupo o distritales"
    ]
  },
  {
    "id": "salud-oral",
    "name": "Salud oral",
    "page": 6,
    "areaId": "area-salud",
    "areaName": "Salud, Seguridad y Rescate",
    "subcategoryId": "salud-ciencias",
    "subcategoryName": "Especialidades en ciencias de la salud",
    "icon": "tooth-outline",
    "color": "#D90429",
    "basicKnowledge": [
      "conoce la importancia de la salud oral",
      "sabe cuantos dientes tiene el niño y el adulto y cual es la erupción dentaria en orden cronológico",
      "conoce los procesos por los cuales se forman las caries",
      "conoce los distintos procesos congénitos que afectan a los dientes",
      "sabe la importancia de la prevención de caries y fluoración"
    ],
    "testsToPass": [
      "demuestra que puedes evaluar y reconocer las lesiones de la cavidad oral",
      "demuestra que puedes preparar solución fluorada para las campañas de fluoración",
      "participa en por lo menos 2 campañas de fluoración acompañando a profesionales de área (estudiantes, internos o médicos odontólogos)",
      "realiza una campaña de educación e higiene bucal con niños pequeños (escuela, kinder, manada, hogares, etc.) enseñándoles la correcta técnica de cepillado y la importancia de tener una dentadura sana"
    ]
  },
  {
    "id": "promotor-de-la-salud",
    "name": "Promotor de la salud",
    "page": 7,
    "areaId": "area-salud",
    "areaName": "Salud, Seguridad y Rescate",
    "subcategoryId": "salud-ciencias",
    "subcategoryName": "Especialidades en ciencias de la salud",
    "icon": "heart-pulse",
    "color": "#D90429",
    "basicKnowledge": [
      "conoce la importancia de los servicios básicos",
      "conoce la importancia y el impacto que tiene los agentes tóxicos en la salud de las personas",
      "sabe las funciones de los servicios de primer, segundo y tercer nivel de atención medica",
      "conoce los distintos programas vigentes en nuestro país tales como Tuberculosis, dengue, sida, rabia, etc.",
      "conoce en que consiste las campañas de vacunación y cual es el esquema de vacunación vigente en nuestro país",
      "conoce en que consiste el Pai 2, cuales son las enfermedades que reprotegen y cuales son las vacunas cual es la vía de administración y cual es la dosis"
    ],
    "testsToPass": [
      "Demuestra que sabes las distintas vías de administración de vacunas y puedes colocar vacunas o registrar en la planilla",
      "participa de una charla o curso sobre el pai donde se los adiestra en la vacunación, cadena de frió",
      "participa con un grupo de amigos de una campaña de vacunación ya sea como registrador o como vacunador"
    ]
  },
  {
    "id": "seguridad-vial",
    "name": "Seguridad vial",
    "page": 8,
    "areaId": "area-salud",
    "areaName": "Salud, Seguridad y Rescate",
    "subcategoryId": "salud-seguridad",
    "subcategoryName": "Especialidades en seguridad y rescate",
    "icon": "car-traction-control",
    "color": "#C9184A",
    "basicKnowledge": [
      "Averigua y explica acerca de las principales disposiciones que regulan el tránsito de peatones, vehículos y ciclistas.",
      "Averigua el significado de las señales de tránsito.",
      "Demuestra que conoces los significados de cada uno de los colores del Semáforo.",
      "Señala 5 reglas a seguir, al caminar en una carretera.",
      "Explica el significado de 10 señales de transito restrictivas y las informativas.",
      "Nombra las reglas de transito al manejar una bicicleta."
    ],
    "testsToPass": [
      "Realiza un mural con al menos 15 señales de transito PREVENTIVAS que tu conozcas.",
      "Da a conocer a tu Unidad, utilizando material audiovisual, recortes de periódico, etc. sobre las causas de accidentes de tránsito y las maneras de prevenirlos.",
      "En una caminata de por lo menos 10 cuadras por el centro de tu ciudad apunta todas las faltas a las normas de transito cometidas ya sea por peatones como por conductores.",
      "Participa en campañas de prevención de accidentes, ruido excesivo, etc.",
      "Identifica con ayuda de tu equipo, situaciones de riesgo relacionadas con el tránsito en tu barrio o el de tu comunidad escolar y solicita a quien corresponda su solución."
    ]
  },
  {
    "id": "quimico",
    "name": "Químico",
    "page": 9,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-tecnologia",
    "subcategoryName": "Especialidades en ciencias y tecnología",
    "icon": "flask",
    "color": "#3A0CA3",
    "basicKnowledge": [
      "Conoce qué estudia la química, sus ramas y su importancia en el desarrollo de la humanidad.",
      "Las diferencias entre compuestos ácidos y básicos, presenta algunos ejemplos de uno y otro.",
      "La diferencia entre química inorgánica y química orgánica.",
      "Conoce el uso del material y los instrumentos más comunes en un laboratorio de química.",
      "Haz un estudio de los productos utilizados en tu hogar, sobre los compuestos que contienen y su acción específica.",
      "Explica qué es una reacción química, qué es un reactivo, un reactante y un catalizador.",
      "Haz un estudio de por lo menos 3 reacciones químicas que utilizamos en nuestra vida diaria y cómo podemos optimizarla.",
      "Indica cuáles son las medidas de seguridad en un laboratorio y los primeros auxilios necesarios en casos de accidente con compuestos peligrosos.",
      "Demuestra que conoces el sistema de clasificación periódico de los elementos."
    ],
    "testsToPass": [
      "Participa en alguna feria de ciencias o de colegio, donde realices algún experimento de química.",
      "Indica los usos comerciales e industriales de por lo menos 20 elementos de la tabla.",
      "Diseña un experimento en el que apliques todos tus conocimientos de química y muéstralo a tu Unidad o Grupo."
    ]
  },
  {
    "id": "mecanico",
    "name": "Mecánico",
    "page": 10,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-tecnologia",
    "subcategoryName": "Especialidades en ciencias y tecnología",
    "icon": "wrench",
    "color": "#3A0CA3",
    "basicKnowledge": [
      "Explica cuales son las principales herramientas utilizadas en talleres de mecánica.",
      "Explica cuales son los materiales que se emplean en un taller mecánico y sus principales características.",
      "Indica los tipos de soldadura y en qué casos se utiliza.",
      "Explica las partes principales y el funcionamiento de: el motor, sistema eléctrico y lubricación en un automóvil.",
      "Explica la mecánica de la caja de cambios."
    ],
    "testsToPass": [
      "Demuestra que puedes utilizar correctamente herramientas como martillo, limas, llaves de tuercas, desarmadores, etc.",
      "Demuestra habilidad en cuatro de las siguientes operaciones: • Verificar el nivel de aceite del motor y de la caja. • Limpiar y ajustar bujías. • Limpiar y pulir un automóvil. • Sacar y limpiar un filtro de carburador. • Sacar el agua de un radiador y limpiarlo. • Cambiar una llanta • Chequear la presión de los neumáticos.",
      "Prepara una lista de 6 puntos de inspección para la revisión de un automóvil tanto en apariencia como las condiciones de funcionamiento."
    ]
  },
  {
    "id": "astronomo",
    "name": "Astrónomo",
    "page": 11,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-tecnologia",
    "subcategoryName": "Especialidades en ciencias y tecnología",
    "icon": "telescope",
    "color": "#3A0CA3",
    "basicKnowledge": [
      "Investiga y explica acerca de los eclipses solares y lunares.",
      "Explica sobre el sistema solar y la vía láctea.",
      "Explica sobre las caras de la luna, sin olvidar la localización de mares y cráteres.",
      "Investiga y explica las teorías de la formación de planetas y sistemas.",
      "Explica los conceptos generales sobre: Estrellas y satélites naturales.",
      "Explica cuales son las estrellas que sobresalen y cómo se clasifican.",
      "Explica sobre los Tipos y uso del telescopio.",
      "Explica el cambio de estaciones, cambios climáticos y movimientos de la tierra."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Visita un observatorio astronómico.",
      "Hallar los puntos cardinales mediante las constelaciones.",
      "Conocer por lo menos 8 constelaciones de los dos hemisferios.",
      "Determina la hora por medio del sol y las estrellas.",
      "Reconoce constelaciones y estrellas en el firmamento.",
      "En una salida identificar mediante un telescopio cuerpos celestes (cúmulos, estrellas dobles, estrellas inestables, y nebulosas).",
      "Construye una maqueta del sistema solar y explica cada una de las estaciones del año y el movimiento aparente.",
      "Construye un reloj de sol y leer la hora. Compárala con la hora oficial."
    ]
  },
  {
    "id": "meteorologo",
    "name": "Meteorólogo",
    "page": 12,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-tecnologia",
    "subcategoryName": "Especialidades en ciencias y tecnología",
    "icon": "weather-partly-cloudy",
    "color": "#3A0CA3",
    "basicKnowledge": [
      "Investiga y explica el origen y la evolución de la meteorología.",
      "Explica los mecanismos que determinan los diferentes fenómenos atmosféricos.",
      "Investiga y explica acerca de los diferentes tipos de nubes y su significado.",
      "Explica que instrumentos se utilizan en meteorología.",
      "Explica todas las unidades en las que se miden los fenómenos climatológicos."
    ],
    "testsToPass": [
      "Investiga y explica todas las formaciones de nubes y como producen lluvia.",
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "Visitar una estación meteorológica, identificando los métodos para el estudio y la predicción del tiempo.",
      "Recopila datos brindados por el servicio Meteorológico durante un período de tiempo y vuélcalo en un cuadro comparativo. Extrae de ellos, los valores medios y extremos.",
      "Construye tu base meteorológica casera con al menos 3 instrumentos (pluviómetro, barómetro, anemómetro, higrómetro, tanque de evaporación, termómetro y veleta).",
      "Registra diariamente el estado del tiempo, teniendo en cuenta: temperatura, presión, humedad, vientos, nubes y precipitaciones, basándote en tus observaciones, y compáralos con las del servicio meteorológico.",
      "Realiza un registro de observaciones diarias del tiempo durante un mínimo de 4 meses incluyendo la temperatura, presión, vientos, y precipitación fluvial.",
      "Realiza una predicción de los fenómenos atmosféricos, de un día que tu elijas según tus observaciones"
    ]
  },
  {
    "id": "tecnologia-de-alimentos",
    "name": "Tecnología de alimentos",
    "page": 13,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-tecnologia",
    "subcategoryName": "Especialidades en ciencias y tecnología",
    "icon": "food-apple",
    "color": "#3A0CA3",
    "basicKnowledge": [
      "Explica que sustancias químicas se pueden encontrar en los alimentos.",
      "Explica que estudia la nutrición y porque es importante.",
      "Explica como se clasifican los alimentos.",
      "Explica los cuidados y la limpieza que deben tener los distintos tipos de alimentos.",
      "Explica las causas del deterioro de los alimentos.",
      "Explica los métodos de conservación de alimentos. (Ej. Pasteurización, salado en seco, salmuera, conservas, etc.)",
      "Explica que alimentos son los de mayor producción en tu Departamento."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Demuestra que conoces al menos 3 técnicas de conservación de alimentos.",
      "Visita una industria de alimentos en tu Departamento y realiza una exposición a tu Unidad de lo observado.",
      "Elabora un cuadro, donde señales los principales alimentos que se producen en tu Departamento, clasificándolos por tipo y señalando sus principales características nutricionales."
    ]
  },
  {
    "id": "agricultor",
    "name": "Agricultor",
    "page": 14,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-tecnologia",
    "subcategoryName": "Especialidades en ciencias y tecnología",
    "icon": "sprout",
    "color": "#3A0CA3",
    "basicKnowledge": [
      "Investiga y explica como esta conformado el suelo.",
      "Explica como se debe de conservar y preparar el suelo para la agricultura.",
      "Averigua y explica cuales son las herramientas y maquinarias, que se usan para agricultura.",
      "Infórmate sobre diferentes tipos de ganados existentes en tu Departamento como también de las especies nativas del mismo.",
      "Explica cual es la importancia de la rotación de cultivos y la eliminación de plagas, de forma no contaminantes.",
      "Explica los tipos y técnicas de cultivo que se utilizan en tu Departamento.",
      "Explica que es la agricultura orgánica"
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Fabrica abono con elementos no contaminantes.",
      "Realiza una exposición para todo el grupo de la importancia de la agricultura para el país",
      "Organiza junto a tu Unidad, una salida a una finca o hacienda y colaboren en la reparación de cercas, alimentación de animales, etc.",
      "Prepara un pedazo de tierra, para su cultivo. En ella: Ara, siembra, cosecha, empaca y transporta lo cultivado en el tiempo adecuado."
    ]
  },
  {
    "id": "geologo",
    "name": "Geólogo",
    "page": 15,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-tecnologia",
    "subcategoryName": "Especialidades en ciencias y tecnología",
    "icon": "terrain",
    "color": "#3A0CA3",
    "basicKnowledge": [
      "Explica la Hontoria de la geología.",
      "Explica cuales son las ramas de la geología.",
      "Averigua sobre las principales etapas de un proceso de extracción minera.",
      "Investiga y explica los diferentes tipos de fenómenos geológicos e identifica los efectos que pueden tener.",
      "Infórmate sobre las explotaciones mineras más importantes del país.",
      "Investiga explica la división de los tiempos geológicos y prepara un resumen haciendo referencia de algunos ejemplos.",
      "Explica los principales usos con los minerales: aluminio, carbón, cobre, estaño, hierro y uranio.",
      "Explica los principales peligros y enfermedades a los que están expuestos los mineros, señalando los medios de prevención más utilizados."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Identifica al menos quince rocas o minerales, clasifícalos y esquematiza su constitución química general.",
      "Realiza un mapa que señale las principales explotaciones mineras del país indicando sus características, tipo de mineral y sistema de extracción",
      "Realiza una maqueta que muestre la conformación de los continentes actuales a través de las eras geológicas."
    ]
  },
  {
    "id": "hardware-de-la-computadora",
    "name": "Hardware de la computadora",
    "page": 16,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-informatica",
    "subcategoryName": "Especialidades en ciencias de la informática",
    "icon": "memory",
    "color": "#4361EE",
    "basicKnowledge": [
      "Debes conocer la historia de la computadora y su evolución, conocer e identificar los tipos de computadora.",
      "Debes conocer los componentes físicos de una computadora de escritorio (Procesador, Memorias, Tarjetas de video, placa madre, disco duro, fuente de poder, tarjeta de sonido)",
      "Debes de conocer los tipos de puertos que posee una computadora(puertos físicos: paralelos, serial, usb, sata, PCi, PCI express, Agp; puertos lógicos: ftp, http, ssh, telnet, SMTP, etc)",
      "Debes de conocer que es el BIOS y sus configuraciones",
      "Debes conocer todos los dispositivos de entrada (E), salida (S) y entrada/salida (E/S) para la comunicación con la computadora(escáner, DVD/CD, plotter, mouse, impresora, teclado, monitor, lápiz óptico, etc)",
      "Debes conocer la manera correcta de armar un equipo completo de computación (todo lo que posee el case y los componentes físicos complementarios)",
      "Debes conocer todos los tipos de impresoras que existen en el mercado, sus diferencias, cualidades, calidad de impresión, tipo de impresión.",
      "Debes de conocer los tipos de sistemas operativos que existen (Windows, Linux y MAC os) y la forma de instalarlos",
      "Debes saber instalar los driver del hardware de computadora y el software básico para un trabajo normal con el equipo ( Microsoft Windows, Microsoft Office, Antivirus)",
      "Debes de conocer y saber para que sirven las fuentes de suministro eléctrico (UPS), las fuentes de poder y los estabilizadores"
    ],
    "testsToPass": [
      "Realiza una exposición en tu unidad acerca de la historia de la computación (debes tener para esto cuadros explicativos, slides, transparencias, etc.)\u0000Realiza una exposición en tu unidad acerca de la historia de la computación (debes tener para esto cuadros explicativos, diapositivas, línea de tiempo, etc.)",
      "Describe un equipo de computación, todos sus componentes y todas sus posibilidades lo más detallado posible. (Describe un equipo de computación, todos sus componentes y todas sus cualidades lo más detallado posible.)",
      "Demuestra en tu unidad la manera correcta de mantener limpia una computadora, y enseña en esta los cuidados necesarios que se debe tener con un equipo.",
      "Arma un equipo de Computación, y has que arranque el BIOS y verifica que este reconozca los dispositivos instalados.",
      "Instala en un equipo de computación el software básico para trabajar con el equipo.",
      "Realiza el diagnostico para actualizar un equipo y entrega un informe técnico del procedimiento de actualización (componente o software a actualizar, soporte del equipo actual referente a la actualización, el costo de la actualización).",
      "Explica en tu unidad como se puede mantener limpio de virus un equipo de computación y limpia de virus dos equipos.",
      "Explica en tu unidad como se puede mantener limpio de virus un equipo de computación y limpia de virus dos equipos o dispositivos de almacenamiento externo (pen drive, discos duros externos)."
    ]
  },
  {
    "id": "software-de-computadora",
    "name": "Software de computadora",
    "page": 17,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-informatica",
    "subcategoryName": "Especialidades en ciencias de la informática",
    "icon": "code-braces",
    "color": "#4361EE",
    "basicKnowledge": [
      "Debe conocer el manejo completo de Dos Sistemas Operativos (MS-DOS, Microsoft Windows, Linux, UNIX, etc.) \u0000Debe conocer el manejo básico de Dos Sistemas Operativos (Windows, Linux, MAC os, etc.), su instalación y su manejo",
      "Debes manejar eficientemente un Procesador de Palabras, Planilla Electrónica.",
      "Debes manejar eficientemente un paquete estadístico.",
      "Debes manejar eficientemente por lo menos dos Graficadores. \u0000Debes manejar eficientemente por lo menos un editor de imágenes (Photoshop, GIMP).",
      "Debes de manejar eficientemente por lo menos un editor de video",
      "Debes manejar eficientemente por lo menos un Administrador de base de Datos (Access, MySQL, POSTGRESS, etc), dos Administradores de directorios y/o(total commander) archivos 7. Debes manejar eficientemente dos Antivirus.",
      "Debes de conocer en concepto de direcciones ip (ipv4, ipv6).",
      "Debes de conocer la configuración de redes por lo menos en 2 sistemas operativos"
    ],
    "testsToPass": [
      "Elabora dos pequeños manuales en un procesador de palabras que incluyan gráficos y tablas del manejo básico de los sistemas operativos que conozcas para el uso de tu unidad",
      "Diseña en una planilla electrónica unos formularios de uso frecuente de tu unidad, logra la aprobación de tu unidad y su respectiva implementación.",
      "Diseña en computadora por lo menos tres insignias, para actividades de tu unidad, con su respectivo certificado de participación.",
      "Elabora un cortometraje de las vivencias con tu unidad y/o actividades distritales.",
      "Diseña una base de datos en Access, donde almacenes información de tus dirigentes, compañeros, de los campamentos y quienes asistieron y mantenlo actualizado por lo menos 4 meses.",
      "Demuestra que sabes manejar dos administradores de archivos a toda tu unidad. 16. Instala un antivirus en tu equipo y demuestra como utilizarlo en tu unidad, limpiadapor lo menos 1 computadora y 3 pen drivers.",
      "Explica en una exposición que son los virus y como se pueden proteger los equipos y otros dispositivos de almacenamiento.",
      "configura 3 computadoras para que estén en red y que cada una tenga acceso a internet."
    ]
  },
  {
    "id": "programador",
    "name": "Programador",
    "page": 18,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-informatica",
    "subcategoryName": "Especialidades en ciencias de la informática",
    "icon": "laptop",
    "color": "#4361EE",
    "basicKnowledge": [
      "Debes de conocer la cronología de lenguajes de programación.",
      "Debes conocer los paradigmas de programación.",
      "Debes saber por lo menos una técnica sencilla de Análisis de Sistemas.",
      "Debes conocer por lo menos tres lenguajes de programación funcional, tres de programación estructurada y tres de programación orientada a objetos",
      "Debes saber manejar perfectamente por lo menos un lenguaje de programación.",
      "Debes de conocer el moldeamiento de entidad- relación",
      "Debes manejar por lo menos tres manejadores de base de datos."
    ],
    "testsToPass": [
      "Elabora un documento de requerimientos funcionales y no funcionales de un sistema que requiera tu unidad (seguimiento de asistencia, cuotas de tu unidad, plan de adelanto, etc).",
      "Elabora un documento de de casos de uso de un sistema que requiera tu unidad (seguimiento de asistencia, cuotas de tu unidad, plan de adelanto, etc).",
      "Elabora un documento de arquitectura donde muestres el diagrama de base de datos y otros dos diagramas (secuencia, despliegue, clases, etc ) de tu preferencia de un sistema que requiera tu unidad (seguimiento de asistencia, cuotas de tu unidad, plan de adelanto, etc).",
      "Programa un sistema que requiera tu unidad (seguimiento de asistencia, cuotas de tu unidad, plan de adelanto, etc). Usando el lenguaje de programación de tu preferencia usando conexión a un manejador de base de datos de tu preferencia"
    ]
  },
  {
    "id": "internet",
    "name": "Internet",
    "page": 19,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-informatica",
    "subcategoryName": "Especialidades en ciencias de la informática",
    "icon": "web",
    "color": "#4361EE",
    "basicKnowledge": [
      "Que es Internet y su historia?",
      "Que servicios ofrece Internet?",
      "Conexión a internet",
      "Quees la World Wide Web (WWW)?",
      "Conocer los navegadorespara internet",
      "Que son los buscadores de internet 7. Que es un correo electrónico",
      "Comunicación en on-line",
      "Compras por internet",
      "Seguridad en internet",
      "Blog y redes sociales"
    ],
    "testsToPass": [
      "Explicar a tu unidad que es el internet y la ventaja que aprender a usar el internet.",
      "Aprender a instalar y utilizar 2 navegadores.",
      "Buscar información que sean útiles para tu unidad en 3 buscadores diferentes.",
      "Crea una cuenta de e-mail basado en WWW (gratuito).",
      "Muestra como se escribe y envía un mensaje de correo electrónico.",
      "Describe las partes de una dirección de correo electrónico.",
      "Mantén contacto por correo electrónico con al menos 5 amigos(as).",
      "Qué es un hipervínculo.",
      "Copia un archivo de la WWW, en el disco duro de tu computadora.",
      "Suscríbete a un foro electrónico scout.",
      "Crea un blog gratuito para tu unidad",
      "Crea un grupo en cualquier red social de tu unidad"
    ]
  },
  {
    "id": "disenador-grafico",
    "name": "Diseñador gráfico",
    "page": 20,
    "areaId": "area-ciencias",
    "areaName": "Ciencias, Tecnología e Informática",
    "subcategoryId": "ciencias-informatica",
    "subcategoryName": "Especialidades en ciencias de la informática",
    "icon": "palette-outline",
    "color": "#4361EE",
    "basicKnowledge": [
      "Demuestra que conoces los paquetes básicos de diseño gráfico y los paquetes básicos de computación.",
      "Demuestra que conoces los colores básicos que se utilizan en diseño gráfico para la composición de la imagen.",
      "Explica qué es una separación de color de una imagen.",
      "Opera al menos tres paquetes gráficos, y dos de fotografía y color. 5. Demuestra tus conocimientos en un paquete con el cual tu trabajes preferentemente. 6. conocer una grafica digital."
    ],
    "testsToPass": [
      "Realiza un tríptico, un póster y una publicación de una empresa pionera de tu unidad, que contenga fondos, efectos, fotografías y textos.",
      "Imprimir el tríptico en separación de color.",
      "Retocar una fotografía borrando sus defectos.",
      "Redibujar una ilustración sencilla (Logo de unidad y logo de grupo).",
      "Realiza un collage de al menos tres elementos (montaje fotográfico).",
      "Hazte cargo por 6 meses de la publicación y diseño de todos los materiales gráficos de tu unidad."
    ]
  },
  {
    "id": "guia-turistico",
    "name": "Guía turístico",
    "page": 21,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "map-marker-path",
    "color": "#AE2012",
    "basicKnowledge": [
      "Explica cual es la importancia del turismo para tu Departamento y para el país.",
      "Investiga y expone en tu unidad los atractivos turísticos que tiene tu Departamento y el país.",
      "Investiga y expone las condiciones que tiene tu Departamento y el país para promover el turismo, como ser carreteras, hotelería, restaurantes, transporte, etc.",
      "Demuestra que sabes guiar a otras personas"
    ],
    "testsToPass": [
      "Realiza un mapa de tu ciudad que contenga direcciones y números telefónicos de centros de interés cultural, lugares de recreación, campos deportivos, ferias artesanales, monumentos históricos, zoológicos, mercados, estaciones, terminales de micros, trenes, aeropuertos, etc.",
      "Realiza un álbum de fotografías, recortes, etc. de atractivos turísticos de tu Departamento.",
      "Diseña un itinerario turístico por tu ciudad o Departamento de un día de duración y realízalo guiando a lobatos o exploradores de tu grupo.",
      "Da a conocer a tu Unidad, utilizando material audiovisual, fotografías, etc. las posibilidades turísticas de seis lugares de paseo, ubicadas en los alrededores de tu ciudad.",
      "Realiza un afiche o folleto turístico de la Departamento donde vives y difúndelo con scouts de otros departamentos o de otros países."
    ]
  },
  {
    "id": "civismo",
    "name": "Civismo",
    "page": 22,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "flag",
    "color": "#AE2012",
    "basicKnowledge": [
      "Explica sobre los poderes del Estado y sus funciones",
      "Lee la Constitución Política del Estado; e investiga algunos de tus derechos y obligaciones como ciudadano, y la organización del Gobierno Nacional, Departamentales y Municipales.",
      "Escoge dos gobiernos extranjeros e investiga qué diferencias tiene con el gobierno de Bolivia.",
      "Investiga y explica dónde y quiénes fueron los que firmaron el Acta de la Independencia.",
      "Explica las consecuencias de ser un país mediterráneo y algunas soluciones que propondrías.",
      "Realiza un análisis con tu familia, de los servicios con los que cuenta tu ciudad y barrio.",
      "Demuestra que conoces los símbolos patrios y su evolución histórica.",
      "Demuestra que conoces las instituciones de servicio y las organizaciones de acción ciudadana de tu ciudad y colabora en algún proyecto con una de ellas."
    ],
    "testsToPass": [
      "Mostrar cómo debe usarse y cuidarse la bandera nacional; coordina los honores a la bandera dentro tu grupo o en campamento.",
      "Marca en un mapa de la comuna, la ubicación de los organismos públicos, principales servicios públicos y privados, indicando sus funciones.",
      "Haz un gráfico sobre la organización de tu gobierno local e indica los nombres de los principales funcionarios.",
      "Colabora con algún trámite familiar (Patentes, RUC, Catastro, etc.) en institución pública hasta su fin y explica los pormenores que tuviste.",
      "Recopila artículos de diferentes opiniones, sobre algunos de los problemas existentes, en tu comunidad local.",
      "Entrevista a una autoridad municipal o vecinal, sobre algunos de estos problemas. 15. Presencia y observa al menos una sesión del Consejo municipal o Departamental de tu ciudad, o algún organismo similar.",
      "Organiza y lleva a cabo con tu Equipo, Unidad, grupo scout, etc. una actividad de servicio, destinada a cooperar en beneficio y satisfacción del barrio, ante una necesidad de la misma.",
      "Prepara una actividad con tu equipo o unidad para difundir y promocionar los “Derechos de la Niñez”",
      "Realiza una encuesta en dos barrios de tu ciudad, uno que se encuentre en el centro y el otro en un sector periurbano, sobre los servicios con los que cuentan, identifica las diferencias y elabora un reporte para darlo a conocer a las autoridades correspondientes."
    ]
  },
  {
    "id": "alfabetizador",
    "name": "Alfabetizador",
    "page": 23,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "book-open-variant",
    "color": "#AE2012",
    "basicKnowledge": [
      "Investiga y explica los niveles de analfabetismo en el país y en tu departamento.",
      "Investiga y explica si hay alguna institución dedicada a la alfabetización en tu departamento o ciudad y contáctala."
    ],
    "testsToPass": [
      "Capacítate como alfabetizador en la institución correspondiente.",
      "Coordina acciones específicas en actividades de alfabetización, ya sea que las realice tu grupo, escuela u otra organización.",
      "Participa como alfabetizador en alguna campaña o proyecto que se realiza en tu Departamento.",
      "Diseña y coordina un programa de promoción cultural para tu unidad y grupo scout.",
      "Promueve y organiza la realización de talleres y actividades culturales en tu colegio.",
      "Realiza un proyecto de difusión de la cultura nacional, en tu ciudad.",
      "Elabora un artículo sobre la experiencia al participar en la alfabetización de otra(s) persona(s), o en el incremento de su nivel cultural, publícalo en el mural o boletín de tu grupo o unidad."
    ]
  },
  {
    "id": "historia",
    "name": "Historia",
    "page": 24,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "history",
    "color": "#AE2012",
    "basicKnowledge": [
      "Investiga y explica el papel de la historia en el desarrollo de la humanidad.",
      "Investiga y explica toda la historia de nuestro país.",
      "Investiga y explica la historia del escultismo mundial, nacional y local.",
      "Destaca a 5 personalidades, que según tu criterio sean los más importantes de la historia mundial en el último siglo, indica las razones y presenta sus biografías",
      "Destaca a 5 personalidades, que según tu criterio sean los más importantes de la historia nacional en el último siglo, indica las razones y presenta sus biografías",
      "Menciona 5 hechos que consideres de los más importantes en la historia mundial del último siglo.",
      "Domina, al menos un periodo de 40 años en la historia de Bolivia.",
      "Tener conocimientos generales de la historia moderna y clásica.",
      "Menciona 5 hechos que consideres de los más importantes en la historia nacional del último siglo.",
      "Realiza una exposición de la historia de tu equipo, de tu unidad y de tu grupo Scout."
    ],
    "testsToPass": [
      "Elabora un álbum de la historia de por lo menos los últimos 10 años de la ciudad donde vives con fotografías, recortes, dibujos, etc.",
      "Elabora un albun de la historia de tu grupo scout., con fotografías, recortes, dibujos, etc.",
      "Crea o mejora el libro de oro de tu equipo.",
      "Haz una investigación para redactar la historia de la comunidad o barrio donde vives."
    ]
  },
  {
    "id": "tradiciones-indigenas",
    "name": "Tradiciones indígenas",
    "page": 25,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "feather",
    "color": "#AE2012",
    "basicKnowledge": [
      "Investiga y explica la política del Gobierno Boliviano con respecto al indigenismo y compáralo con la de otros países.",
      "Investiga y explica que culturas indígenas existieron en nuestro territorio.",
      "Investiga y explica que culturas indígenas, aun existen en nuestro país, donde se ubican sus principales costumbres, su evolución histórica, su principal actividad económica, etc.",
      "Investiga y explica los principales problemas con los que viven en las comunidades indígenas.",
      "Investiga como es un día normal para un: indígena el que tu prefieras (chiquitano, quechua, guaraní, etc.) y compara sus horarios, actividades, etc. en una tabla con la de un hombre de la ciudad.",
      "Demuestra que conoces las lenguas indígenas del país y elaborar un diccionario con las palabras más comunes.",
      "Conocer al menos una técnica que utilice la comunidad indígena escogida en la manufactura de sus bienes"
    ],
    "testsToPass": [
      "Tener una colección de objetos indígenas que abarquen al menos 4 culturas del país y 2 extranjeras. al menos",
      "Visita un museo o un centro de investigación relacionado al indigenismo.",
      "Visita una comunidad indígena y prepara una exposición para tu unidad o grupo scout de lo que pudiste ver en la comunidad.",
      "Lleva a cabo un proyecto de difusión de una cultura indígena del país, en tu barrio, colegio, grupo scout, etc."
    ]
  },
  {
    "id": "interprete-traductor",
    "name": "Intérprete/Traductor",
    "page": 26,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "translate",
    "color": "#AE2012",
    "basicKnowledge": [
      "especialidad:",
      "Investiga y explica sobre los orígenes del idioma que escogiste",
      "Investiga y expón los países en los que se habla el idioma que escogiste y averigua sobre su cultura y principales características.",
      "Investiga y aprende las reglas gramaticales básicas del idioma que escogiste."
    ],
    "testsToPass": [
      "Lee y traduce un pasaje de un libro, revista o periódico.",
      "Sostén una conversación de por lo menos 15 minutos en el idioma que escogiste.",
      "Escribe una carta o un ensayo de por lo menos 400 palabras en el idioma que escogiste.",
      "Adquiere conocimientos elementales de algún otro idioma, aparte del que escogiste.",
      "Ayuda de intérprete o traductor a alguna persona que lo requiera."
    ]
  },
  {
    "id": "amigo-del-mundo",
    "name": "Amigo del mundo",
    "page": 27,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "earth",
    "color": "#AE2012",
    "basicKnowledge": [
      "Investiga y explica la historia y geografía de por lo menos tres países de cada continente.",
      "Investiga y explica la geografía, economía, organización social, organización política, costumbres y religión de por lo menos cinco países de diferente idioma.",
      "Averigua y explica la capital, moneda, presidente actual y la bandera de al menos 30 países.",
      "Explica los principales problemas que afectan a los países del tercer mundo",
      "Explica que es la globalización.",
      "Explica sobre la Organización del Movimiento Scout y la Asociación Mundial de las Guías Scouts, como también su distribución por el mundo.",
      "Recopila información, sobre el trabajo de otras organizaciones internacionales de cooperación y servicio.",
      "Reconoce los principales problemas mundiales."
    ],
    "testsToPass": [
      "Escoge un país de cualquier parte del mundo y realiza un mural con: Geografía, economía, organización social, producción, costumbres, etc. Te sugerimos colocar el mural en tu rincón de equipo.",
      "Participa en un evento internacional y conoce la mayor cantidad de gente posible.",
      "Mantén correspondencia con por lo menos 7 amigos de diferentes países.",
      "Consigue pañoletas y/o insignias scouts de 10 países."
    ]
  },
  {
    "id": "promotor-de-la-paz",
    "name": "Promotor de la paz",
    "page": 28,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "peace",
    "color": "#AE2012",
    "basicKnowledge": [
      "Explica la estructura de la ONU y de los organismos que dependen de ella.",
      "Investiga y explica que organizaciones a nivel mundial son afines al Movimiento Scout.",
      "Lee la Declaración Universal de los Derecho Humanos y los Derechos de la niñez",
      "Investiga y explica la vida, ideales, etc. de al menos 3 personas que promovieron la paz en el mundo.",
      "Investiga y explica acerca de 3 acontecimientos históricos en contra de la paz mundial.",
      "Investiga e indica quienes fueron los 5 últimos ganadores del premio Nobel de la paz y explica a tu Unidad los ideales de cada uno.",
      "Explica qué significa la sigla UNESCO, cuándo fue creada y cuál es su propósito.",
      "Investiga y explica cuales son los acuerdos internacionales que Bolivia ha suscrito en materia de defensa de los derechos humanos y la promoción de la paz mundial."
    ],
    "testsToPass": [
      "Realiza un mural con recortes de noticias actuales, de periódicos nacionales o internacionales que vayan en afán de promover la paz en el mundo.",
      "Conoce las funciones de la O.N.U. y todas sus dependencias en Pro de la paz mundial.",
      "Participa en actividades de promoción de la paz local, nacional e internacional.",
      "Demuestra que conoces los principales organismos que promueven la paz mundial y los que trabajan en defensa de los derechos humanos.",
      "Organiza una campaña de promoción de la paz que trascienda tu grupo scout.",
      "Elabora un álbum fotográfico que refleje la destrucción a la que nos llevan las guerras.",
      "Elabora un álbum fotográfico que refleje la importancia de vivir en un mundo donde reine la paz entre todos.",
      "Expone ambos álbumes en tu unidad y grupo scout."
    ]
  },
  {
    "id": "amigo-de-mi-pais",
    "name": "Amigo de mi país",
    "page": 29,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "shield-star",
    "color": "#AE2012",
    "basicKnowledge": [
      "Explica la historia y geografía de nuestro país.",
      "Investiga y explica cuales son las principales fuentes de ingresos para los habitantes de nuestro país.",
      "Investiga y explica cuales son los 5 lugares mas visitados por turistas en nuestro país.",
      "Investiga e indica que instituciones trabajan en tu departamento fomentando el desarrollo de nuestro país.",
      "Demuestra que sabes de geografía de Bolivia, señalando en un mapa con rapidez: ciudades, provincias, poblaciones, ríos y montañas que se te nombre.",
      "Conoce los principales sistemas de comunicación de Bolivia: Carreteras, ferrocarriles, aeropuertos, vías fluviales, radio, televisión y telefonía.",
      "Demuestra que puedes identificar a las principales autoridades Nacionales y regionales: como Presidente, Vicepresidente y algunos ministros; Prefecto, Alcalde, etc.",
      "Explica cómo los Scouts de Bolivia, trabajamos y contribuimos con el Desarrollo Nacional."
    ],
    "testsToPass": [
      "En un mapa de Bolivia, señala los lugares de interés histórico más importantes",
      "Presenta un cuadro o afiche con todos los símbolos patrios, su historia e importancia en las actividades cotidianas.",
      "Participa de algún evento de carácter nacional, ya sea campamento, curso o taller.",
      "Visita alguna provincia alejada, con tu familia o con tu equipo; presenta un reporte de tu visita, indicando los principales problemas que tiene y las posibles soluciones que planteas.",
      "Participa en una campaña de vacunación en tu ciudad o área rural.",
      "Participa en actividades de desarrollo regional, TRO o campañas de prevención de drogas."
    ]
  },
  {
    "id": "lector",
    "name": "Lector",
    "page": 30,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-desarrollo",
    "subcategoryName": "Especialidades en desarrollo social y político",
    "icon": "book-reader",
    "color": "#AE2012",
    "basicKnowledge": [
      "Investiga y explica Los diferentes estilos literarios y explica las características de cada uno de ellos.",
      "Demuestra que Conoces los cuidados para la preservación de los libros.",
      "Menciona quienes obtuvieron el premio Nobel de Literatura (al menos 3 y el título de la obra premiada).",
      "Menciona al menos 10 autores nacionales y sus obras.",
      "Demostrar que sabes consultar un tema en la biblioteca.",
      "Explica cuál es el papel que cumple un crítico literario.",
      "Averigua toda la bibliografía de Baden Powell, lee “Escultismo para muchachos” y realiza una comparación con el escultismo actual."
    ],
    "testsToPass": [
      "Lee al menos 6 libros en el periodo aproximado de no más de 12 meses, éstos deberán incluir libros sobre Escultismo, novelas clásicas y otros sobre interés particular.",
      "Elabora fichas bibliográficas para cada uno de ellos, las mismas deben incluir biografía del autor, estilo, tema y otros.",
      "Presenta tu carnet de lector de alguna biblioteca de tu ciudad",
      "Presenta una lista de las bibliotecas que hay en tu región.",
      "Forma una Biblioteca, o amplía la existente en tu unidad, grupo o escuela, manteniéndola en perfectas condiciones y llevando un control de los libros, que entran y salen.",
      "Realiza un resumen de uno de los libros que más te gustó, en no más de 3 páginas.",
      "Elabora un mapa conceptual sobre un libro que leiste"
    ]
  },
  {
    "id": "emprendedor-de-negocios",
    "name": "Emprendedor de negocios",
    "page": 31,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-economia",
    "subcategoryName": "Especialidades en economía",
    "icon": "cash-multiple",
    "color": "#9B2226",
    "basicKnowledge": [
      "Investiga sobre las diferentes posibilidades de negocio que te podrían interesar.",
      "Según el lugar, región y/o departamento donde vives identifica un negocio que te interese e identifica las oportunidades y obstáculos que tendrías.",
      "Investiga sobre lo que es una ventaja competitiva y lo que es una ventaja comparativa. Analízalo en la actividad que vas a emprender."
    ],
    "testsToPass": [
      "Organiza un Grupo de Trabajo, para desarrollar tu empresa, teniendo en cuenta el perfil de persona necesario para cada responsabilidad, trazándote una meta de negocio con un determinado tiempo para alcanzarla.",
      "Realiza una investigación de mercado para la empresa que te interesa.",
      "Grafica con tu Grupo de Trabajo el camino de vida que va a seguir tu negocio, teniendo en cuenta los posibles obstáculos que averiguaste.",
      "Elabora un plan de negocios donde incluya un análisis “FODA” que sea lo más cercano a tu realidad.",
      "Ejecuta el plan de negocios que has realizado, y evalúa el éxito obtenido"
    ]
  },
  {
    "id": "periodista",
    "name": "Periodista",
    "page": 32,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-comunicacion",
    "subcategoryName": "Especialidades en expresión y comunicación",
    "icon": "newspaper-variant",
    "color": "#BB3E03",
    "basicKnowledge": [
      "Explica cuales son las funciones de un periodista.",
      "Explica cuales son las reglas básicas de redacción periodística.",
      "Explica los estilos periodísticos principales. Pirámide, Pirámide invertida, etc.",
      "Explica las diferencias entre periodista de periódico, de radio y de televisión",
      "Consigue, lee y analiza el código ético del periodista. Con ejemplos y ve si se cumple en el país."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "Entrevista a un periodista sobre su profesión y utiliza la entrevista para realizar un corto artículo sobre el periodismo Escribe un artículo sobre el Escultismo en Bolivia.",
      "Presenta al menos 3 artículos relacionados con las actividades scouts.",
      "Escribe un artículo (tema libre) con datos que hayas obtenido en la hemeroteca de tu ciudad.",
      "Presenta una lista completa de todos los medios de comunicación: radio, prensa y televisión de tu ciudad",
      "Visita la sala de prensa de cualquier medio.",
      "Presenta algunos de los artículos al boletín informativo de tu grupo o distrito.",
      "Menciona al menos 10 periodistas destacados de tu país.",
      "Realiza y presenta una entrevista grabada a una de las autoridades Scout de tu distrito.",
      "Escribe un artículo sobre una actividad de impacto social en el que haya participado tu unidad.",
      "Escribe un artículo sobre el escultismo y su incidencia en la ciudad e inténtalo publicar en algún medio de publicación.",
      "Realiza al menos una entrevista a un scout extranjero acerca del escultismo en su país."
    ]
  },
  {
    "id": "fotografo",
    "name": "Fotógrafo",
    "page": 33,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-comunicacion",
    "subcategoryName": "Especialidades en expresión y comunicación",
    "icon": "camera",
    "color": "#BB3E03",
    "basicKnowledge": [
      "La historia de la fotografía. ¿Quien invento la maquina fotográfica? ¿en que año y país?.",
      "Que es la fotografía? Que es una cámara fotográfica?",
      "Mencionar 5 tipos de cámaras fotográficas.",
      "Cómo la fotografía utiliza la luz para impresionar imágenes.",
      "Las partes y funciones de una cámara fotográfica",
      "Conoce las reglas básicas de composición.",
      "Como se utiliza y para qué, el obturador, el diafragma, el fotómetro, medidor de la velocidad, macroenfoque, como activar el temporizador, activación de hora y fecha, etc.",
      "¿Cuando y como es aconsejable el uso del flash?",
      "¿Que cuidados se debe dar a una cámara fotográfica?"
    ],
    "testsToPass": [
      "Con una maquina fotográfica saca las siguientes fotografías: • Foto de exterior • Foto de interior • Foto periodística • Foto artística • Foto paisaje • Foto con efecto Blanco y Negro • Foto con efecto Sepia. • Foto de tu grupo • Foto de tu equipo • Foto de tu unidad.",
      "Elaborar un álbum con las fotografías sacadas en el anterior punto",
      "Con una cámara saca fotografías con las siguientes características: • Fotografía sin luz (con la luz de una vela sin Flash) • Fotografía Instantánea (Con el medidor de velocidad en 1000 o 2000) • Fotografía inmóvil (Con el medidor de velocidad en B)",
      "Saca por los menos 10 fotografías de una actividad importantes que se desarrolle en tu grupo o distrito scout.",
      "Organiza una exposición en tu grupo de todas las fotografías tomadas para esta especialidad.",
      "Elabora un álbum fotográfico de un campamento de tu Unidad pionera"
    ]
  },
  {
    "id": "escritor",
    "name": "Escritor",
    "page": 34,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-comunicacion",
    "subcategoryName": "Especialidades en expresión y comunicación",
    "icon": "feather",
    "color": "#BB3E03",
    "basicKnowledge": [
      "Investiga y explica la historia y evolución de la literatura.",
      "Explica los diferentes géneros literarios (novela, cuento, historia, ensayo, etc.)",
      "Investiga y explica los derechos de autor en nuestro país.",
      "Explica que es prosa y verso."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Demuestra que conoces las reglas de ortografía, puntuación, gramática y de sintaxis.",
      "Presenta un escrito de no menos de 2 páginas de tema libre tomando en cuenta tus conocimientos en las reglas mencionadas en el anterior punto.",
      "Tienes nociones básicas sobre el manejo de frases y párrafos en escritos.",
      "Elige uno de los estilos literarios de tu agrado y escribe una obra con él.",
      "Cuenta a tu unidad algún cuento o novela que hayas escrito, no olvidando las partes de una narración (Presentación, nudo o problema y desenlace).",
      "Realiza la biografía del autor que más te guste.",
      "Colabora con el periódico, mural o boletín de tu unidad, grupo o distrito durante un periodo mínimo de 2 meses.",
      "Logra que una de tus obras sea publicada en cualquier boletín, revista juvenil, Periódico, memoria anual, etc."
    ]
  },
  {
    "id": "oratoria",
    "name": "Oratoria",
    "page": 35,
    "areaId": "area-sociales",
    "areaName": "Ciencias Sociales, Humanidades, Economía y Comunicación",
    "subcategoryId": "sociales-comunicacion",
    "subcategoryName": "Especialidades en expresión y comunicación",
    "icon": "bullhorn",
    "color": "#BB3E03",
    "basicKnowledge": [
      "Demuestra que conoces las reglas básicas de la oratoria.",
      "Demuestra que conoces las reglas básicas de pronunciación y modulación.",
      "Realiza un curso de oratoria de al 10 Horas académicas"
    ],
    "testsToPass": [
      "Realiza prácticas con grabadora para mejorar la oratoria.",
      "Realiza Lectura en voz alta y con técnica frente a público para presentar lo siguiente: • Una noticia • Una propaganda • Un cuento • Un cuento infantil",
      "Crea y diserta frente a público un discurso de por lo menos 7 minutos de cualquier tema de interés.",
      "Presenta en un lugar público, una charla sobre las características y beneficios de ser scout."
    ]
  },
  {
    "id": "baile-y-danza",
    "name": "Baile y danza",
    "page": 36,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-cultura",
    "subcategoryName": "Especialidades en arte y cultura",
    "icon": "dance-ballroom",
    "color": "#E76F51",
    "basicKnowledge": [
      "Investiga y explica la evolución del baile y la danza.",
      "Explica la clasificación de la danza y selecciona la de tu mayor agrado.",
      "Investiga y explica los bailes modernos de los últimos 5 años y en que país se originaron.",
      "Explica la importancia de la danza en el desarrollo de la cultura.",
      "Demuestra que conoces las danzas típicas de tu Departamento y del país",
      "Demuestra que conoces los aspectos históricos de la danza que dominas, así como su vestuario."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Ejecuta ante público tres danzas, una folklórica, una clásicas y una moderna.",
      "Demuestra que puedes bailar por lo menos seis ritmos diferentes.",
      "Demuestra que puedes bailar solo(a), con pareja o en grupo.",
      "Demuestra que puedes improvisar un baile.",
      "Asiste a eventos, motivo de la especialidad.",
      "Prepara con tu equipo o unidad una presentación para algún festival de danza."
    ]
  },
  {
    "id": "actor",
    "name": "Actor",
    "page": 37,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-cultura",
    "subcategoryName": "Especialidades en arte y cultura",
    "icon": "theater",
    "color": "#E76F51",
    "basicKnowledge": [
      "Explica lo básico acerca de la historia del teatro, dónde y cuánto se inició y cuándo fue su apogeo.",
      "Investiga y explica al menos tres expresiones básicas del teatro (drama, comedia, ficción)",
      "Explica la importancia de la iluminación, vestuario, maquillaje, sonido y escenografía en una obra teatral.",
      "Menciona el nombre de 5 actores o actrices nacionales."
    ],
    "testsToPass": [
      "Escribe un guión y represéntalo con tu equipo",
      "Interpreta un monólogo breve de una obra de tu agrado, tomando en cuenta una buena vocalización.",
      "Realiza tres caracterizaciones de distintos personajes, teniendo en cuenta maquillaje, vestuario y expresión corporal.",
      "Presenta un programa de pantomima de al menos 5 actos a tu Unidad.",
      "Demostrar que es capaz de conectarse con el público, haciendo sentir al mismo parte del teatro, como en un diálogo donde el público es la segunda persona que no te responde",
      "Memoriza un libreto de por lo menos 20 minutos de duración.",
      "Demuestra que conoces al menos 3 obras de teatro clásicas y tres obras nacionales.",
      "Elabora una obra de teatro de por lo menos 15 minutos tomando en cuenta todos tus conocimientos teatrales.",
      "Preparar con tiempo de anticipación y presentar la obra teatral que preparaste en tu unidad, grupo o distrito.",
      "Pertenece a un elenco teatral de tu barrio, colegio, parroquia o grupo scout. Si no existiese, promueve su formación."
    ]
  },
  {
    "id": "musico",
    "name": "Músico",
    "page": 38,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-cultura",
    "subcategoryName": "Especialidades en arte y cultura",
    "icon": "music",
    "color": "#E76F51",
    "basicKnowledge": [
      "Investiga y explica sobre la evolución de la música desde sus inicios hasta nuestros días, identificando sus principales características en diferentes épocas.",
      "Explica los grupos de instrumentos musicales, explicando su clasificación"
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "Demuestra que sabes tocar satisfactoriamente, el instrumento musical que escogiste y explica los cuidados que se debe de tener con el mismo, su origen y evolución.",
      "Demuestra que puedes afinar el instrumento.",
      "Lee con facilidad una página de música simple",
      "Realiza un cancionero de 30 temas Scouts como mínimo y difúndelo en tu tropa y grupo.",
      "Dirige al menos 10 canciones scouts en un campamento o actividad scout.",
      "Realiza una pequeña biografía de tu músico favorito.",
      "Compone una canción ya sea en música o letra.",
      "Realiza una lista de al menos, 10 grupos o solistas nacionales destacados a nivel internacional.",
      "Enseña a otro Pionero de tu Unidad a tocar el instrumento.",
      "Organiza un festival musical en tu grupo scout o distrito."
    ]
  },
  {
    "id": "pintura",
    "name": "Pintura",
    "page": 39,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-cultura",
    "subcategoryName": "Especialidades en arte y cultura",
    "icon": "palette",
    "color": "#E76F51",
    "basicKnowledge": [
      "Investiga y explica la historia de la pintura, elige algún pintor famoso e investiga su vida y obras.",
      "Investiga cuáles son las galerías de arte más importantes del mundo y dónde se encuentran.",
      "Investiga cuáles son las pinturas o cuadros más importantes del mundo y donde se encuentran.",
      "Investiga y explica cuales son las técnicas básicas de la pintura.",
      "Explica cuáles fueron las técnicas antiguas de la pintura desde el principio de la historia.",
      "Indica cuales son los implementos utilizados en este arte."
    ],
    "testsToPass": [
      "Realiza una comparación de los diferentes estilos de acuerdo a la época indicando un pintor destacado de cada una.",
      "Demuestra que sabes manejar los colores primarios y obtener los colores secundarios.",
      "Presenta un estudio de color en tres tipos diferentes de técnica (Pastel, acuarela, óleo, etc.)",
      "Demuestra que sabes restirar lienzos y repararlos.",
      "Organiza una visita con tu equipo a algún museo o galería de tu ciudad y con ayuda de un experto oriéntalos en la apreciación de las obras exhibidas.",
      "Realiza al menos una pintura con la técnica de tu agrado, demostrando que dominas la técnica.",
      "Organiza un taller de pintura para tu Unidad, tropa o para la manada."
    ]
  },
  {
    "id": "reposteria",
    "name": "Repostería",
    "page": 40,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-cultura",
    "subcategoryName": "Especialidades en arte y cultura",
    "icon": "cake-variant",
    "color": "#E76F51",
    "basicKnowledge": [
      "Explica el funcionamiento de un horno",
      "Demuestra que conoces los utensilios que se utilizan en repostería.",
      "Conoce el equivalente de pesos y medidas usuales en repostería.",
      "Conoce los primeros auxilios para accidentes más comunes."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "Demuestra que utilizas el horno tomando en cuenta todas las normas de seguridad necesarias.",
      "Realiza un recetario para campamentos y difúndelo en tu unidad y grupo.",
      "Demuestra que sabes decorar pasteles para distintas ocasiones.",
      "Visita alguna repostería y elabora una exposición para tu unidad de todo lo observado.",
      "Enseña a tu equipo a preparar al menos tres pasteles diferentes.",
      "Prepara un tipo de cada uno de los siguientes postres: galletas, gelatinas, pasteles horneados y en frío, confituras, budines y mermeladas y realiza una degustación en tu grupo y colegio.",
      "Construye un horno de campamento y prepara al menos 3 recetas."
    ]
  },
  {
    "id": "cocina",
    "name": "Cocina",
    "page": 41,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-cultura",
    "subcategoryName": "Especialidades en arte y cultura",
    "icon": "chef-hat",
    "color": "#E76F51",
    "basicKnowledge": [
      "Investiga y explica sobre los diferentes grupos de alimentos y las formas de cómo pueden combinarse para producir una dieta balanceada. Reconociendo en alimentos frescos y envasados, características de deterioro y vencimiento.",
      "Investiga y explica la manera de conservar los alimentos en buenas condiciones para su consumo."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "Prepara un menú balanceado para un niño, un adulto y un anciano.",
      "Prepara un menú, para un día de verano y otro de invierno, con sus correspondientes recetas.",
      "Cocina tres de los siguientes platos (comida o postre) • Un plato típico de la zona. • Un plato económico. • Un plato vegetariano. • Un plato para un enfermo celíaco o diabético. • Un plato de pocas calorías. • Un plato de otro país.",
      "Elige un tipo de cocina regional o de algún país y aprende a elaborar al menos 3 platillos característicos.",
      "Entrevista a un profesional de la cocina (chef o aprendiz)",
      "Prepara una cena completa y formal, adicionando el menú y todo su valor nutritivo, para todo tu equipo."
    ]
  },
  {
    "id": "filatelia",
    "name": "Filatelia",
    "page": 42,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-cultura",
    "subcategoryName": "Especialidades en arte y cultura",
    "icon": "email-seal",
    "color": "#E76F51",
    "basicKnowledge": [
      "Investiga y explica la historia y el origen del correo en Bolivia y el mundo",
      "Investiga y explica el origen de los sellos postales; también, explica el propósito para que los usaran.",
      "Explica las características de un sello de buena condición filatélica y los tipos de sellos postales que existen.",
      "Conoce las condiciones en el ambiente filatélico que le dan valor a un sello, además explicar por qué el valor de un sello postal puede diferir del valor en los catálogos",
      "Conoce el equipo básico de un filatelista y demuestra su uso y cuidados",
      "Conoce la organización de algún club o organismo filatélico del país.",
      "Explica el propósito de cada uno de los siguientes tipos de sellos: • Conmemorativo • Permanente • Aéreo • semipostal • Seguro postal • Precancelado"
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Demuestra que estas familiarizado con los términos mas utilizados en la filatelia.",
      "Demuestras que conoces los diferentes tipos de álbumes, como montar los sellos postales en un álbum con y sin charnelas, muestra los manejos y cuidados adecuados para los sellos postales.",
      "Explica los motivos y características que usas para formar una colección de sellos postales, explica el propósito de cada uno de los siguientes tipos de sellos: Permanente, conmemorativo, aéreo, semipostal, seguro postal y precancelado.",
      "De tu colección, cuáles son los sellos más atractivos y el por qué de esta consideración. 13. Expone tu colección de por lo menos 300 sellos postales."
    ]
  },
  {
    "id": "serigrafista",
    "name": "Serigrafista",
    "page": 43,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-cultura",
    "subcategoryName": "Especialidades en arte y cultura",
    "icon": "printer",
    "color": "#E76F51",
    "basicKnowledge": [
      "Demuestra que conoces por lo menos 5 técnicas de impresión.",
      "conoce y cataloga los materiales serigraficos según las técnicas apropiadas",
      "Demuestra que conoces los distintos tipos de tintas que existen y que uso tiene cada una de ellas.",
      "Describe cuáles son los colores básicos y cuáles son las combinaciones de las mismas para obtener los demás colores.",
      "Describe cuáles son las herramientas necesarias para la serigrafía, además de su uso y cuidado.",
      "Describe como se queman negativos y como se obtienen películas de serigrafía."
    ],
    "testsToPass": [
      "Dibuja un croquis de un taller de diseño grafico con todos sus elementos y herramientas y describe a detalle cada una de ellas.",
      "Confecciona viñetas por una impresión sencilla.",
      "Demuestra que sabes utilizar la malla antes y después de la impresión.",
      "Realiza un banderín decorativo para tu equipo.",
      "diseña por lo menos 5 estampas diferentes a todo color.",
      "Participa en un concurso de logotipo para cualquier actividad.",
      "Presenta una polera impresa por ti mismo.",
      "Inventa un tipo de letras original.",
      "Enseña a imprimir tu propia insignia de equipo u otro logotipo afín para autoadhesivos.",
      "Realiza una exposición para tu Grupo o unidad de todos los trabajos en serigrafía.",
      "Realiza por lo menos 10 trabajos serigrafiados con técnicas y materiales distintos.",
      "Serigrafía una tasa, un cuero, un lapicero, una gorra y una polera"
    ]
  },
  {
    "id": "montanismo",
    "name": "Montañismo",
    "page": 44,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "image-filter-hdr",
    "color": "#F4A261",
    "basicKnowledge": [
      "Define los conceptos de escalada deportiva en roca y andinismo, ¿cual es la diferencia?",
      "¿Cuáles son las cumbres más altas de Bolivia, y las cumbres mas altas de cada continente (Europa, Asia, África, Antártica, Sudamérica y Norteamérica).",
      "Describe el equipo que se usa para la escalada en nieve y hielo.",
      "¿Cuáles son las normas de seguridad a seguir en la montaña o mientras se escala?",
      "¿Cuáles son los principios ambientales que se deben seguir en la montaña?",
      "¿Qué es un peligro objetivo, qué es un peligro subjetivo?",
      "conocer todo el equipo de andinismo Mochila, cuerdas, herramientas de sujeción. De traslación de alimentación, de seguridad, de movilidad.",
      "Conocer la historia del montañismo nacional e internacional.",
      "¿Cuáles son las características de la cuerda estáticas y las cuerdas dinámicas y cuál el uso de cada una de ellas?",
      "Conocer la ropa apropiada y la forma correcta de vestirse en la montaña."
    ],
    "testsToPass": [
      "Conocer cabulleria, primeros auxilios y caminante",
      "Muestra la forma correcta de ponerse un arnés de cintura y un arnés de pecho.",
      "Muestra la forma correcta de conectar una cuerda al arnés.",
      "Muestra la forma de improvisar un arnés con cinta tubular.",
      "Muestra la forma de montar un anclaje con protección fija artificial y como montar un anclaje cuando no existe esta protección.",
      "Muestra la forma de guardar y mantener la cuerda y demás piezas de equipo.",
      "Apareja un dispositivo de rapel, y desciende una altura no menor a 10 metros.",
      "Muestra la forma de ascender por una cuerda mediante ayudas mecánicas.",
      "Realiza 6 nudos que se usan en montañismo y explica su uso.",
      "Interpreta una hoja de descripción de ruta.",
      "Elabora un itinerario de escalada o salida al campo y realízalo con tu equipo."
    ]
  },
  {
    "id": "escalada-deportiva-en-roca",
    "name": "Escalada deportiva en roca",
    "page": 45,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "hiking",
    "color": "#F4A261",
    "basicKnowledge": [
      "Explica la diferencia entre escalda en LÍDER, TOP y BOULDER.",
      "Explica las partes características y uso de cordinos, cuerda, arnés, zapatillas, mosquetones, cintas, aparatos de aseguramiento, bolsa de magnesio y vestuario.",
      "Explica las normas generales de seguridad en la escalada deportiva.",
      "Repite las voces y comandos de escalada.",
      "Explique los principios y normas ambientales.",
      "Explique la clasificación técnica de las rutas de escalada."
    ],
    "testsToPass": [
      "Demuestre las técnicas de aseguramiento.",
      "Demuestre las técnicas básicas de agarre y pisadas.",
      "Demuestra las técnicas y normas de seguridad para realizar un anclaje.",
      "Escalar una vía 6a o superior en Top.",
      "Escalar una vía de nivel 5 o superior en líder.",
      "Realiza los siguientes nudos: • Ocho • Cinta. • Dinámico. • Pescador. • Ballestrinque. • Marchand y Prusick, explicar porqué es mejor utilizar el marchand y olvidar el prusiano. • Bulim para encordamiento",
      "Resolver un problema de Boulder a vista."
    ]
  },
  {
    "id": "atletismo",
    "name": "Atletismo",
    "page": 46,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "run-fast",
    "color": "#F4A261",
    "basicKnowledge": [
      "Explica la historia y evolución del Atletismo",
      "Explica que disciplinas corresponden al atletismo.",
      "Saber de que se tratan las siguientes especialidades. • Velocidad. • Fondos • Lanzamiento de bala • Lanzamiento de jabalina • Lanzamiento de disco. • Salto con garrocha. • Carrera de bayas. • Carrera con obstáculos. • Salto largo • Salto alto • Marcha",
      "Explica al menos las rutinas de ejercicios adecuados para tres disciplinas.",
      "Explica el reglamento básico de al menos otras 3 competencias olímpicas de atletismo, de tu elección."
    ],
    "testsToPass": [
      "Demuestra que practicas, activamente y conoces claramente las reglas de al menos dos disciplinas.",
      "Demuestra que mantienes un buen estado físico.",
      "Demuestra que llevas una dieta balanceada acorde a tu edad, y que conoces dietas adecuadas para la práctica de al menos dos disciplinas de atletismo.",
      "Demuestra que conoces las reglas de seguridad y los primeros auxilios en caso de accidentes.",
      "Realiza un registro sobre el desarrollo de una disciplina elegida en el ámbito local, nacional e internacional (datos, recortes, fotografías, etc.)",
      "Organiza competencias de atletismo con tu unidad",
      "Participa activamente en el equipo de atletismo de tu colegio."
    ]
  },
  {
    "id": "natacion",
    "name": "Natación",
    "page": 47,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "swim",
    "color": "#F4A261",
    "basicKnowledge": [
      "Explica sobre los reglamentos, condiciones físicas y normas de seguridad que rigen para el desarrollo de la disciplina.",
      "Forma parte de un club de natación"
    ],
    "testsToPass": [
      "Nada en estilo libre al menos 100 metros sin descanso",
      "Saber nadar en por lo menos cuatro estilos diferentes de competición.",
      "Nadar por lo menos 100 metros con la ropa puesta.",
      "Desvestirse dentro el agua (pantalones, polera y medias).",
      "Poder Sumergirse hasta 2 m. de profundidad y sacar del fondo un objeto que pese por lo menos 2 Kg.",
      "Sumergirse en el agua y realizar un recorrido de por lo menos 10 metros",
      "Mantente a flote por un tiempo razonable según tu Sinodal.",
      "Demuestra que no tienes problemas al nadar en ríos, arroyos o lagunas.",
      "Debes saber tirarte de la orilla de cabeza y de pie, además de conocer las precauciones necesarias.",
      "Anima a los integrantes de tu equipo, unidad o grupo de amigos a que aprendan a nadar. En caso de que sepan, realicen una actividad acuática junto al sinodal.",
      "Demuestra junto al sinodal, que sabes hacer una maniobra de salvataje, con salvavidas y cuerda."
    ]
  },
  {
    "id": "ciclismo",
    "name": "Ciclismo",
    "page": 48,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "bike",
    "color": "#F4A261",
    "basicKnowledge": [
      "Explica el origen y la evolución de la bicicleta.",
      "Explica las normas de tránsito que debe respetar un ciclista y los materiales y herramientas necesarios para el arreglo y mantenimiento de una bicicleta.",
      "Posee una bicicleta en buenas condiciones y equipada con lámpara, timbre, reflector trasero y delantero.",
      "Explica el reglamento de transito de tu Departamento",
      "Indica el manejo correcto de una bicicleta en una carrera de alta velocidad.",
      "Indica el mantenimiento que debe seguir una bicicleta."
    ],
    "testsToPass": [
      "Demuestra que sabes manejar correctamente bicicleta demostrando destreza y total dominio de la misma en alguna de las disciplinas (Ej. Velocidad, campo traviesa, ruta, acrobacia).",
      "Demuestra que sabes parchar correctamente las llantas.",
      "Desarma tu bicicleta, límpiala y vuelve a armarla, ajustando correctamente sus partes e indicando las funciones de cada una de ellas.",
      "Demuestra que respetas el reglamento de tránsito de tu Departamento.",
      "Recorre 10 Km. de distancia en bicicleta de acuerdo a tu disciplina, ejecutando y cumpliendo todas las normas de seguridad.",
      "Organiza un raid por tu ciudad en bicicleta, con tu equipo, tomando en cuenta todas las medidas de seguridad Durante y enseña a tu equipo las principales reparaciones en el raid."
    ]
  },
  {
    "id": "defensa-personal",
    "name": "Defensa personal",
    "page": 49,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "karate",
    "color": "#F4A261",
    "basicKnowledge": [
      "Explica sobre el desarrollo de la disciplina elegida en el ámbito local, nacional e internacional (datos, recortes, fotografías, etc.).",
      "Explica las normas que rigen la disciplina.",
      "Explica en tu unidad los beneficios de la práctica de la disciplina que elegiste.",
      "Inculca en tu unidad actitudes únicamente de defensa y nunca de ataque."
    ],
    "testsToPass": [
      "Demostrar capacidad y avance en la disciplina que seleccionaste, identificando en que te ha ayudado a mejorar como persona.",
      "Demuestra que conoces las reglas de la disciplina.",
      "Practica una rutina que te permita mantenerte en un buen estado físico.",
      "Demuestra que sabes: • Defenderte de un ataque por la espalda. • Defenderte de un ataque frontal sujeto de las muñecas. • Defenderte de un ataque lateral sujeto de un brazo. • Defensa de ataque frontal o lateral de ataque con puño. • Defenderte de un golpe de gancho de puño. • Defenderte de un ataque frontal o lateral.",
      "Practica la disciplina regularmente, en un centro de deportes habilitado.",
      "Participa en competencias o demostraciones",
      "Organiza una competencia de la disciplina para tu Unidad, grupo scout, barrio, escuela, etc."
    ]
  },
  {
    "id": "deportista",
    "name": "Deportista",
    "page": 50,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "trophy",
    "color": "#F4A261",
    "basicKnowledge": [
      "Explica los beneficios directos e indirectos de la practica del deporte",
      "Explica las normas y reglas del deporte que practicas",
      "Investiga y explica la organización del Deporte a nivel Regional, Nacional e internacional.",
      "Indica en qué puede influir la droga, el alcohol y el cigarrillo en el rendimiento del deportista.",
      "Demuestra que conoces las instancias organizativas del deporte en el ámbito nacional."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "Haz una presentación donde identificas los beneficios directos e indirectos de la práctica deportiva.",
      "Demuestra que practicas diariamente el deporte de tu preferencia y forma parte de la selección de tu colegio o de un club.",
      "Elabora un cronograma de rutina de un día normal de un deportista, además, incluye la dieta adecuada que debe seguir.",
      "Demuestra que conoces las enfermedades deportivas y/o lesiones más comunes, generadas por el deporte que practicas.",
      "Planifica, organiza y ejecuta una tarde deportiva en tu Unidad o Grupo.",
      "Elabora un folleto que promueva la práctica continua del Deporte y difúndelo en tu equipo, unidad, grupo, amigos y familia.",
      "Participa en al menos una competencia o campeonato del deporte que practicas."
    ]
  },
  {
    "id": "ajedrez",
    "name": "Ajedrez",
    "page": 51,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "chess-knight",
    "color": "#F4A261",
    "basicKnowledge": [
      "Investiga y explica la historia del ajedrez.",
      "Investiga y explica quienes fueron o son los mayores exponentes del ajedrez.",
      "Explica las reglas internacionales del ajedrez.",
      "Conoce al menos cinco aperturas.",
      "Conoce dos formas diferentes de llevar la anotación de una partida.",
      "Conoce las reglas internacionales de una partida de ajedrez y de un torneo.",
      "Conoce cinco defensas diferentes."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "reproduce 10 partidas famosas siguiendo la anotación y explícalas a un experto.",
      "Usa correctamente el reloj de juego.",
      "Organiza un torneo en tu unidad o grupo.",
      "Participa en uno o más torneos."
    ]
  },
  {
    "id": "aeromodelismo",
    "name": "Aeromodelismo",
    "page": 52,
    "areaId": "area-arte",
    "areaName": "Arte, Cultura y Deporte",
    "subcategoryId": "arte-deporte",
    "subcategoryName": "Especialidades en deporte y cuidado del cuerpo",
    "icon": "airplane",
    "color": "#F4A261",
    "basicKnowledge": [
      "Explica la mecánica de vuelo y menciona los tipos de aviones en aeromodelismo.",
      "Explica cuales son las partes de un motor de aeromodelismo.",
      "Explica los diferentes tipos de materiales de construcción de un modelo de aeromodelismo e indica en qué partes del modelo se utilizan.",
      "Indica las características de una buena madera de balsa y en qué puntos del modelo se puede utilizar.",
      "Explica la importancia del balanceado, centrado y diedro del ala.",
      "Demuestra que conoces todas las categorías de aeromodelos y las piruetas más importantes en vuelos radiocontrolados."
    ],
    "testsToPass": [
      "Describe las herramientas necesarias para la construcción de aeromodelos.",
      "Diseña y construye un modelo de pequeñas dimensiones (Fuselaje balsa 4 cm, ala balsa 2 cm, envergadura 25 cm, largo de fuselaje 25 cm, estabilizador 8 cm."
    ]
  },
  {
    "id": "conservacionista",
    "name": "Conservacionista",
    "page": 53,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-ecologista",
    "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
    "icon": "shield-leaf",
    "color": "#2D6A4F",
    "basicKnowledge": [
      "prevención, uso, cuidado y protección del suelo y sus recursos naturales, renovables y no renovables, de sus aguas, recursos marítimos, de especies de flora y fauna a fin de garantizar su máximo de productividad y utilidad no sólo para la actual generación sino para las futuras, por tiempo indefinido.",
      "Identifica los recursos renovables y no renovables que existen en nuestro país.",
      "Explica con tus palabras que es desarrollo sostenible",
      "Explicar en qué consisten los recursos naturales (agua, tierra y aire). Y describir con ejemplos como los contamina el hombre.",
      "Explicar que es el calentamiento global y cual sus consecuencias.",
      "Explica qué es un ecosistema y cuántos tipos existen en Bolivia.",
      "Averigua cuántos y qué Parques Nacionales existen en Bolivia, la extensión de cada uno de ellos, su ubicación, clasificación y las principales especies de flora y fauna que resguardan.",
      "Investiga a fondo por lo menos diez especies de animales y diez especies de plantas que actualmente están en peligro de extinción, el ecosistema en que viven, las causas que producen su riesgo de desaparición y cómo podríamos ayudar a su conservación.",
      "Informarse acerca de la manera de generación de energía en nuestro país y el impacto ecológico que produce",
      "Conoce qué son las energías alternativas.",
      "Cuáles son los residuos que más contaminan en un campamento y la influencia de estos en el medio ambiente."
    ],
    "testsToPass": [
      "Participa activamente de la campaña “A limpiar el Mundo” (Clean up the World).",
      "Ponte como meta visitar tres de los parques nacionales que investigaste como mínimo en dos años.",
      "Visita a las Instituciones de tu región que trabajan en la conservación del ambiente, y averigua que hacen por éste.",
      "Organiza por lo menos una actividad conservacionista.",
      "Realiza en campamentos un mínimo de 5 clases de fogones conservacionistas.",
      "Construye un calentador solar de agua en un campamento."
    ]
  },
  {
    "id": "forestal",
    "name": "Forestal",
    "page": 54,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-ecologista",
    "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
    "icon": "pine-tree",
    "color": "#2D6A4F",
    "basicKnowledge": [
      "Explica cual es la estructura de un árbol, como se alimenta, respira y reproduce.",
      "Explica cual es el beneficio y papel que desempeñan los árboles en la naturaleza.",
      "Averigua sobre algunos productos secundarios del bosque.",
      "Explica sobre el peligro de los incendios forestales y cómo se pueden evitar.",
      "Explica sobre las plagas mas comunes y la forma de evitarlas"
    ],
    "testsToPass": [
      "Investiga y expone en tu unidad a por lo menos 40 especies diferentes de árboles que se encuentran en nuestro país.",
      "Investiga y demuestra la forma correcta de plantar un árbol.",
      "Conoce claramente y a detalle por lo menos 10 especies diferentes de árboles.",
      "Realiza un trabajo en el que expliques qué especies son utilizadas en la industria maderera.",
      "Prepara un muestrario de semillas forestales (mínimo 10 especies).",
      "Presenta al menos 5 artículos referentes a la temática forestal.",
      "Visita un vivero o un centro de estudios forestales, averigua las actividades que realiza y identifica la interrelación con otras ciencias o actividades, coméntalo mediante una exposición en tu unidad",
      "Realiza junto a tu patrulla y/o grupo de amigos, folletos sobre el peligro de los incendios forestales, principales causas que lo originan y medios para contenerlos y sofocarlos.",
      "Cultiva y cuida, en forma permanente al menos 3 árboles diferentes",
      "Participa en una campaña de repoblamiento forestal y planta al menos 20 plantínes controlándolos hasta los 6 meses de edad."
    ]
  },
  {
    "id": "reciclador",
    "name": "Reciclador",
    "page": 55,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-ecologista",
    "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
    "icon": "recycle",
    "color": "#2D6A4F",
    "basicKnowledge": [
      "Cuál es la clasificación de residuos sólidos y de los residuos líquidos.",
      "Cuáles son las fuentes de mayor basura en un campamento",
      "Explicar en qué consiste los recursos naturales (agua, tierra, aire). Y describir con ejemplos como los contamina el hombre y si podríamos prevenir esta continua contaminación.",
      "La clasificación de la basura y su importancia.",
      "Conocer los procesos de transformación de algunos materiales en nuestro medio como ser las botellas de plástico, papel, vidrio ¿Qué hacen con ellos, como los usan?",
      "Conocer en detalle el riesgo y las consecuencias que causan las bolsas de nylon o plástico al medio ambiente.",
      "Conocer en detalle el riesgo y las consecuencias que causan las baterías o pilas usadas cuando se botan a la basura de manera inadecuada."
    ],
    "testsToPass": [
      "Promueve con tu equipo un proyecto de re utilización de basura.",
      "Realiza un reglamento para tu equipo, para que evite la excesiva producción de basura.",
      "Construye el libro de oro de unidad o equipo con papel reciclado que tú fabricaste.",
      "Demuestra la eliminación de basura dentro de un campamento: orgánica, inorgánica, aceites.",
      "Desarrollar una campaña de información y educación acerca del correcto manejo de los desechos, en tu barrio curso u otra unidad de tu grupo."
    ]
  },
  {
    "id": "botanico",
    "name": "Botánico",
    "page": 56,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-ecologista",
    "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
    "icon": "flower",
    "color": "#2D6A4F",
    "basicKnowledge": [
      "La clasificación general de las plantas según sus características.",
      "Las partes que compone una planta y las funciones que cada una desempeña.",
      "Conoce cuales son las condiciones necesarias y adecuadas para el buen crecimiento de una planta, (tipo de suelo, fertilización, clima, enfermedades).",
      "Conoce los principales tipos de multiplicación artificial de plantas. Realiza con éxito uno de ellos.",
      "Las características más importantes de una célula vegetal.",
      "Conoce cuales son las plantas típicas más representativas de tu región.",
      "Explica según tu observación, el proceso de fecundación en una planta.",
      "Explica en qué consiste el proceso de fotosíntesis, respiración y transpiración."
    ],
    "testsToPass": [
      "Identifica en el campo, por lo menos 20 plantas diferentes, incluyendo al menos dos plantas de los siguientes grupos: alimenticias, textiles, maderables, medicinales",
      "Presenta un herbario organizado según las partes de la planta y sus formas más representativas."
    ]
  },
  {
    "id": "horticultor",
    "name": "Horticultor",
    "page": 57,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-ecologista",
    "subcategoryName": "Especialidades en vida en naturaleza (ecologista)",
    "icon": "watering-can",
    "color": "#2D6A4F",
    "basicKnowledge": [
      "Realiza una lista de las principales legumbres y hortalizas que se producen y consumen en tu región, indicando las especies nativas.",
      "Investiga y explica cuales son las principales plagas que dañan las hortalizas y formas de combatir las mismas.",
      "Investiga y explica las técnicas modernas de cultivos.",
      "Investiga y explica los diferentes tipos de abonos y la aplicación adecuada de al menos tres de ellos.",
      "Explica qué es un cultivo hidropónico e intenta efectuar esta práctica"
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Prepara una carpeta en la que se muestres 6 tipos de semillas hortícolas, según su reproducción, época de siembra, periodo vegetativo y época de cosecha.",
      "Realiza un cuadro de hortalizas y legumbres con sus respectivos beneficios para la salud, vitaminas, proteínas, etc.",
      "Realiza un informe de una visita al mercado de tu ciudad o departamento y verifica qué especies hortícolas están a la venta, el estado de las mismas, almacenamiento, costos, proveedores, etc.",
      "Prepara y abona una parcela de tierra para una siembra.",
      "Produce en tu parcela dos especies hortícolas produciendo una cosecha suficiente para proveer de ellas a tu familia por lo menos durante una semana.",
      "Describe los tipos de herramientas que empleaste para tu siembra.",
      "Realiza un pequeño estudio económico, es decir, las ganancias de la venta de tu cosecha, menos tu inversión."
    ]
  },
  {
    "id": "entomologo",
    "name": "Entomólogo",
    "page": 58,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-animales",
    "subcategoryName": "Especialidades en vida en naturaleza (amigo de los animales)",
    "icon": "bug",
    "color": "#40916C",
    "basicKnowledge": [
      "Investiga y explica la diferencia entre insectos benéficos y perjudiciales con ejemplos",
      "Explica la relación que guardan los insectos con otros seres vivos, así como su importancia en el equilibrio ecológico",
      "Explica la forma de clasificación de los insectos y sus fundamentos.",
      "Investiga y explica sobre insectos nocivos para la agricultura y explica en qué consiste el",
      "control de plagas con otros insectos (control biológico).",
      "Explica la metamorfosis de un insecto, observa y descríbela en una especie (Ej. Mariposa, mosca, escarabajo)"
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Observa y diferencia al menos 30 especies diferentes de insectos: sus hábitos, los lugares donde se encuentran y sus utilidades o si son dañinos.",
      "Observar Una colonia de insectos y presentar una exposición a tu Unidad de las conclusiones obtenidas.",
      "Visita un centro de investigación de insectos, identifica su interrelación con otras actividades, coméntalo mediante una exposición en tu unidad.",
      "Durante un campamento o excursión, haz una colecta de un día y noche, sólo de insectos que no sean benéficos y prepara tu insectario debidamente.",
      "Explica a tu unidad las características de los insectos que atrapaste.",
      "Identifica un foco de reproducción de insectos perjudiciales y contribuye a su eliminación"
    ]
  },
  {
    "id": "zoologia",
    "name": "Zoología",
    "page": 59,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-animales",
    "subcategoryName": "Especialidades en vida en naturaleza (amigo de los animales)",
    "icon": "paw",
    "color": "#40916C",
    "basicKnowledge": [
      "Explica que estudia la zoología y cuales son sus ramas",
      "Explica la clasificación del reino animal.",
      "Explica cuales son las especies en vías de extinción de tu Departamento y del país.",
      "Explica los peligros a los que están expuestos los animales silvestres en tu Departamento y en el país y como contrarrestarlos.",
      "Investigar y explica cual es la fauna nociva y como se la puede contrarrestar."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "Realiza un mapa del país, señalando las zonas donde se encuentran los animales en vías de extinción.",
      "Visita un zoológico de alguna ciudad del país y prepara un informe de lo positivo y negativo que viste en el.",
      "Participar como guía de la manada o la tropa de tu grupo, en la visita a un parque, reserva natural o zoológico, explicando las características de los animales que habitan en el.",
      "Confecciona un álbum de recortes y/o fotografías de animales. Clasifícalas, según orden, familia, etc. Anota sus características, costumbres, hábitat y cualquier dato de interés",
      "Organiza un campamento con tu Unidad, en una reserva ecológica y coopera con los trabajos de preservación de fauna en ella.",
      "Participar en una campaña o un proyecto enfocado en la protección de la fauna."
    ]
  },
  {
    "id": "ornitologo",
    "name": "Ornitólogo",
    "page": 60,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-animales",
    "subcategoryName": "Especialidades en vida en naturaleza (amigo de los animales)",
    "icon": "bird",
    "color": "#40916C",
    "basicKnowledge": [
      "Explica que estudia la ornitología",
      "Explica cuales son las especies de aves que están en vías de extinción en tu Departamento y el País.",
      "Explica cuales son los peligros a que están expuestas las aves silvestres de tu Departamento y como contrarrestarlas.",
      "Investiga y explica por lo menos veinte familias de aves, no domésticas, que habiten en tu Departamento.",
      "Realiza una investigación de por lo 5 especies de aves útiles para la agricultura en el control de plagas, insectos, hiervas y de 5 aves de rapiña útiles para el control de roedores."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente",
      "Realiza un mapa del país, señalando las zonas donde se encuentran las aves en vías de extinción.",
      "Observa durante varias horas, aves silvestres, en tres ambientes naturales distintos. Haz un informe de lo observado, que incluya bosquejos, grabaciones, fotografías, etc.",
      "Reconoce por el sonido, sus nidos o huevos, diez tipos de aves.",
      "Construye 3 tipos de refugios para aves y colócalos en diferentes lugares.",
      "Confecciona un álbum de recortes y/o fotografías de aves. Clasifícalas, según orden, familia, etc. Anota sus características, costumbres, hábitat y cualquier dato de interés",
      "Participar en una campaña o un proyecto enfocado en la protección de las aves.",
      "Alimenta aves durante por lo menos 2 meses, mediante la construcción de comederos y bebederos para aves."
    ]
  },
  {
    "id": "apicultor",
    "name": "Apicultor",
    "page": 61,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-animales",
    "subcategoryName": "Especialidades en vida en naturaleza (amigo de los animales)",
    "icon": "beehive-outline",
    "color": "#40916C",
    "basicKnowledge": [
      "Investiga y explica sobre el equipo y los instrumentos que se utilizan para la apicultura moderna.",
      "Busca información sobre las clases de abejas y cómo pueden alimentarse artificialmente.",
      "Investiga y explica la época en que florecen las plantas de tu zona y cuales producen néctar.",
      "Explica acerca de la miel, que elementos la conforman y cual es el origen de su uso.",
      "Investiga y explica los tipos de abejas que existen, indicando sus principales características y sus depredadores más comunes.",
      "Investiga y explica sobre las lesiones que producen el mal manejo de las abejas y los primeros auxilios correspondientes",
      "Realiza un estudio taxonómico de las abejas y de la organización de una colonia de abejas."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Realiza un listado de los productos que se desprenden de la apicultura.",
      "Con ayuda del Experto, cuida de un enjambre, y cría abejas. Encorcha y alimenta artificialmente las mismas"
    ]
  },
  {
    "id": "animador-de-la-fe",
    "name": "Animador de la fe",
    "page": 62,
    "areaId": "area-naturaleza",
    "areaName": "Vida en Naturaleza y Espiritualidad",
    "subcategoryId": "naturaleza-fe",
    "subcategoryName": "Especialidades en animación de la fe",
    "icon": "hands-pray",
    "color": "#52B788",
    "basicKnowledge": [
      "Investiga y explica por lo menos 4 religiones diferentes de la tuya: Su origen, Historia y Doctrinas más importantes",
      "Investiga y presenta un resumen de la vida de por lo menos tres personalidades que se hayan destacado por haber vivido de acuerdo a los valores de su fe."
    ],
    "testsToPass": [
      "Difunde en tu equipo la fe; además crea espacios de reflexión y diálogo sobre el tema.",
      "Idea algunas oraciones originales para momentos precisos dentro tus reuniones de patrulla o tropa.",
      "Colabora con las celebraciones de tu Unidad, grupo y distrito.",
      "Realiza un libro para la biblioteca del grupo, Rama, etc. (o completa el existente), en donde se anoten diferentes clases de reflexiones relacionadas con la Naturaleza, con la fe, etc.",
      "Prepara, diferentes reflexiones / oraciones para: agradecer los alimentos, el final de un campamento, la inauguración de un evento, el equipo, un paso de rama, etc.",
      "Participa activamente en una comunidad religiosa, desempeñando un cargo o función (Catequesis, pastoral juvenil, etc.)",
      "Organiza una celebración para un campamento o alguna fiesta del grupo, Unidad, equipo, grupo de amigos, etc.",
      "Prepara y anima con una reflexión para la ceremonia de una Promesa"
    ]
  },
  {
    "id": "pionerias",
    "name": "Pionerías",
    "page": 63,
    "areaId": "area-tecnicas",
    "areaName": "Técnicas Scouts y Vida en Campamento",
    "subcategoryId": "tecnicas-scouts",
    "subcategoryName": "Especialidades en técnicas scouts",
    "icon": "hammer-wrench",
    "color": "#1B4965",
    "basicKnowledge": [
      "Explica el uso adecuado de cada herramienta necesaria en campamentos: hacha, machete, sierra, daga, cortaplumas, etc.",
      "Investiga y explica las ventajas y desventajas de al menos 3 tipos de cuerdas, en lo referente a materiales, grosor, peso, otros.",
      "Investiga y explica la forma de estimar la resistencia de una cuerda sólo conociendo su diámetro."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Debes saber y hacer uso de los siguientes nudos: ballestrinque, rizo, leñador, as de guía, arnés de hombre y vuelta de escota.",
      "Deberás usar correctamente los amarres: cuadrado, diagonal, redondo y trípode.",
      "Demuestra que puedes desenredar con paciencia hasta terminar un bollo de cordel enredado.",
      "Ejecuta por lo menos tres anclajes diferentes.",
      "Confeccionar una muestra de 5 tipos de ensambles de madera.",
      "Trozar apropiadamente un tronco de un diámetro superior a 25 cm. y una longitud mínima de 3 mt.",
      "Presenta una maqueta de campamento, indicando la disposición adecuada de carpas, construcciones y otros.",
      "Toma parte en la ejecución de cuatro construcciones en campamento, utilizando cañahuecas, bolillos u otros; usando los amarres correctos.",
      "Construye un refugio de campamento; choza o algo similar haciendo uso de materiales naturales del lugar y que sea apropiado para ser ocupado por dos personas.",
      "Ejecuta algunas habilidades de campamento como: mástil sin cavar, cocinas conservacionistas, instalar toldos, etc."
    ]
  },
  {
    "id": "cabuyeria",
    "name": "Cabuyería",
    "page": 64,
    "areaId": "area-tecnicas",
    "areaName": "Técnicas Scouts y Vida en Campamento",
    "subcategoryId": "tecnicas-scouts",
    "subcategoryName": "Especialidades en técnicas scouts",
    "icon": "transit-connection-variant",
    "color": "#1B4965",
    "basicKnowledge": [
      "Investiga y explica para que es importante la cabuyería y quienes la utilizan con mayor frecuencia.",
      "Investiga y explica las ventajas y desventajas de al menos 3 tipos de cuerdas, en lo referente a materiales, grosor, peso, otros.",
      "Explica la forma de estimar la resistencia de una cuerda sólo conociendo su diámetro.",
      "Explica los cuidados que se debe tener al utilizar y almacenar las cuerda."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Demuestra que conoces las ventajas y desventajas de al menos 3 tipos de cuerdas, en lo referente a materiales, grosor, peso, otros.",
      "Demuestra que conoces la terminología empleada en cabuyería, definiendo las palabras como: mena, cabo, cote, chicote, etc.",
      "Demuestra que conoces al menos 5 nudos de unión, realízalos correctamente y explica sus utilidades.",
      "Demuestra que conoces al menos 5 nudos de sujeción, realízalos correctamente y explica sus utilidades.",
      "Demuestra que conoces al menos 5 nudos de remate, realizados correctamente y explica sus utilidades.",
      "Demuestra que conoces al menos 5 eslingas, realízalas correctamente y explica sus utilidades.",
      "Demuestra que conoces al menos 5 anclajes, realízalos correctamente y explica sus utilidades.",
      "Realiza correctamente los siguientes amarres: cuadrado, diagonal, redondo, trípode; y explica sus utilidades.",
      "Elabora un cuadro de nudos con al menos 50 nudos que hayas realizado",
      "Realiza un Taller de cabuyería para los lobatos o exploradores de tu grupo."
    ]
  },
  {
    "id": "cocina-de-campamento",
    "name": "Cocina de campamento",
    "page": 65,
    "areaId": "area-tecnicas",
    "areaName": "Técnicas Scouts y Vida en Campamento",
    "subcategoryId": "tecnicas-scouts",
    "subcategoryName": "Especialidades en técnicas scouts",
    "icon": "campfire",
    "color": "#1B4965",
    "basicKnowledge": [
      "Explica sobre los utensilios utilizados para cocinar en campamento y como podrías sustituirlos en caso de no contar con ellos.",
      "Busca información sobre diferentes menús, para casos de diarrea y estreñimiento en campamento."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Construye un soporte para los utensilios de cocina.",
      "Prepara un menú balanceado, para un campamento de invierno y otro para verano.",
      "Cocina en fogata al menos durante 5 campamentos.",
      "Demuestra que conoces y aplicas correctamente las diferentes formas de empacar y conservar alimentos para campamentos de distintas duraciones.",
      "Elabora un instructivo para la clasificación de los tipos de basura, practícalo permanentemente y promueve la aplicación en los equipos de tu unidad.",
      "Demuestra que conoces las astucias de cocina como tipos de hornos, alacenas, refrigeradores y fogones.",
      "Cocina sin utensilios durante todo un campamento.",
      "Cocina los siguientes platos sin utensilios: • Huevo duro. • Pan de cazador (Pan de palo). • Papa asada.",
      "Presenta, prepara y cocina un menú completo para tu equipo, durante un campamento.",
      "Realiza un libro de recetas de cocina para campamentos que incluya sopas, carnes, pescados, pollos, verduras frescas, bebidas y postres, así como alimentos ligeros para caminatas, adjuntando sus valores alimenticios."
    ]
  },
  {
    "id": "transmisionista",
    "name": "Transmisionista",
    "page": 66,
    "areaId": "area-tecnicas",
    "areaName": "Técnicas Scouts y Vida en Campamento",
    "subcategoryId": "tecnicas-scouts",
    "subcategoryName": "Especialidades en técnicas scouts",
    "icon": "radio-handheld",
    "color": "#1B4965",
    "basicKnowledge": [
      "Investiga y explica cuales son las señales internacionales para pedir socorro y otros",
      "Investiga y explica que códigos son los más utilizados en el mundo para transmisiones de mensajes."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Envía y recibe un mensaje completo de no menos de 35 palabras mediante el código morse, utilizando un zumbador, cuerda o cualquier artefacto que emita sonidos.",
      "Envía y recibe el mismo mensaje por la noche, utilizando una linterna en forma intermitente.",
      "Envía y recibe el mismo mensaje mediante el \"semáforo\" a una distancia de por lo menos 30 m.",
      "Demuestra que conoces el Código morse, semáforo, murciélago, eucalipto, tip top y otras dos más.",
      "Indica en qué circunstancias se podrían utilizar estos tipos de transmisión de mensajes.",
      "Crea un tipo de código propio para que se puedan comunicar en clave entre los miembros de tu equipo.",
      "Realiza un taller de Transmisiones para los Lobatos o Exploradores de tu grupo."
    ]
  },
  {
    "id": "campismo",
    "name": "Campismo",
    "page": 67,
    "areaId": "area-tecnicas",
    "areaName": "Técnicas Scouts y Vida en Campamento",
    "subcategoryId": "tecnicas-scouts",
    "subcategoryName": "Especialidades en técnicas scouts",
    "icon": "tent",
    "color": "#1B4965",
    "basicKnowledge": [
      "Investiga y explica que zonas existen en tu Región aptas para realizar campamentos.",
      "Averigua como se toman en cuenta el tiempo, las condiciones climatológicas, la estación y el suministro de agua y las normas de seguridad, cuando se elige el lugar"
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Demuestra la manera correcta de empacar una mochila para una caminata de dos días.",
      "Demuestra en la práctica el respeto y el cuidado que merecen las plantas y animales de la naturaleza y la razón para ello. 6. Prepara maqueta de los siguientes tipos de fogatas: reflector, en cruz, polinesio y en estrella, construye y enciende una de ellas.",
      "Demuestra cómo se protege la leña en un día lluvioso y cómo se prepara comida en tales condiciones. 8. Demuestra cómo proteger el campamento incluyendo los alimentos, contra los animales, insectos, y el tiempo adverso",
      "Demuestra la manera correcta de eliminar basura.",
      "Elabora una maqueta de campamento de tropa, en la que se incluya el área de banderas y subcampos de patrulla, además la ubicación de cocina, comedor, letrinas y carpas.",
      "Elabora un cuadro con la típica distribución de responsabilidades en un campamento de patrullas de dos días.",
      "Construye una astucia de campamento demostrando el uso correcto de amarres y otra sin el uso de cuerdas.",
      "Demuestra haber acampado por lo menos 20 noches en campamentos con tu Equipo, Unidad o grupo."
    ]
  },
  {
    "id": "excursionismo",
    "name": "Excursionismo",
    "page": 68,
    "areaId": "area-tecnicas",
    "areaName": "Técnicas Scouts y Vida en Campamento",
    "subcategoryId": "tecnicas-scouts",
    "subcategoryName": "Especialidades en técnicas scouts",
    "icon": "compass",
    "color": "#1B4965",
    "basicKnowledge": [
      "Investiga y explica a detalle las buenas prácticas de excursionismo incluyendo el cuidado de los pies y uñas, tratamiento de las ampollas, tipo de vestimenta, calzados y medias, correcta forma de caminar con o sin mochila, las reglas de seguridad en una caminata por carretera, obtención de agua potable y realización de los fuegos de cocina, etc.",
      "Investiga y explica cómo puedes orientarte sin el uso de la brújula de día y de noche",
      "Investiga y explica que es la rosa de los vientos.",
      "Indica por lo menos 16 puntos principales de la rosa de los vientos."
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Explica y demuestra donde sea posible, los principales puntos de las buenas prácticas de excursionismo.",
      "Realiza tres amarres con los nudos correctos e indica su uso y funciones.",
      "Muestra las variantes en forma y función de tres eslingas y demuestra tres formas de remates y empalmes.",
      "Demuestra la construcción de cuatro clases de cocinas, de las cuales dos sean con conservador de calor (conservacionistas).",
      "Realiza pan de cazador",
      "Usando métodos improvisados, estima tres distancias no mayores a 800 metros y tres alturas no mayores a 30 metros con un error no mayor al 10 %.",
      "Calcula usando tu paso normal, distancias accesibles de 30 y 50 metros con un error máximo de 10%.",
      "Realiza una caminata de al menos 10 Km. Empleando un mapa y medios de orientación naturales."
    ]
  },
  {
    "id": "orientacion",
    "name": "Orientación",
    "page": 69,
    "areaId": "area-tecnicas",
    "areaName": "Técnicas Scouts y Vida en Campamento",
    "subcategoryId": "tecnicas-scouts",
    "subcategoryName": "Especialidades en técnicas scouts",
    "icon": "compass-rose",
    "color": "#1B4965",
    "basicKnowledge": [
      "Investiga y explica los tipos de orientación que existen.",
      "Explica que es la rosa de los vientos",
      "Explica la ubicación geográfica de tu ciudad, Departamento y del país.",
      "Explica como se lee un mapa y lo relacionado a la cartografía.",
      "Explica la historia de la brújula, su evolución, sus partes y el como utilizarla correctamente.",
      "Explica los diferentes métodos para obtener tiempos y distancias"
    ],
    "testsToPass": [
      "Prepara para toda tu unidad, una exposición con todo lo investigado anteriormente.",
      "Demuestra que conoces por lo menos los 16 puntos principales de la rosa de los vientos.",
      "Demuestra que sabes leer correctamente un mapa y ubicar puntos específicos en él.",
      "Demuestra que sabes utilizar correctamente la brújula.",
      "Demuestra en que consisten por lo menos 5 métodos naturales diurnos para orientarte.",
      "Demuestra en que consisten por lo menos 5 métodos naturales nocturnos para orientarte",
      "Construye un reloj solar.",
      "Aplica tus conocimientos organizando una actividad para tu equipo o unidad, que te permita hacerlo (caminata, raid, etc.)"
    ]
  }
];

export function getSpecialtyById(id: string): Specialty | undefined {
  return ALL_SPECIALTIES.find((s) => s.id === id);
}

export function getAreaById(id: string): SpecialtyArea | undefined {
  return SPECIALTY_AREAS_DATA.find((a) => a.id === id);
}
