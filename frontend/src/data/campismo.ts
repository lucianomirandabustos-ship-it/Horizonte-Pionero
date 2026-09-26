export const CLAVE_DESCRIPTIONS: Record<string, string> = {
  semaforo:
    "Es un sistema de comunicación donde la posición de los brazos representa cada letra del alfabeto. Se usa de día con banderas rojas y blancas; de noche se sustituyen por antorchas o linterna en morse.",
  siete_cruces:
    "Funciona similar a la clave gato. Cada grupo de letras se agrupa dentro de una cruz numerada. La combinación de trazos y el número indica la letra correspondiente.",
  agujerito:
    "Sustituye cada letra por la que aparece inmediatamente abajo en la tabla. Es equivalente a la clave murciélago: por ejemplo, ¿Cómo te llamas? se convierte en ¿Cama ge llomos?",
  tierra_aire:
    "Código internacional para comunicar necesidades desde tierra a aeronaves de rescate. Cada gesto corporal representa una instrucción clara sin requerir radios ni aparatos sofisticados.",
  sordomudo:
    "Alfabeto dactilológico universal. Cada letra se representa con una posición de mano específica; útil para comunicación silenciosa o inclusiva en actividades.",
};

export const FOGATAS = [
  { id: "piramide", name: "Fogata Pirámide", use: "Fogata central de campamento y ceremonias.", steps: ["Coloca leños cruzados en capas cada vez más pequeñas.", "Rellena el interior con yesca y ramas finas.", "Enciende desde el centro; da fuego alto y prolongado."], wood: "Leña seca gruesa y ramas medianas.", safety: "Requiere zona amplia libre de vegetación seca." },
  { id: "pagoda", name: "Fogata Pagoda", use: "Buena para cocinar y calentarse.", steps: ["Forma un pozo con leños paralelos por pares alternando dirección.", "Deja huecos internos para oxígeno.", "Enciende por el centro."], wood: "Leños medianos rectos.", safety: "Vigila que la torre no colapse hacia afuera." },
  { id: "reflector", name: "Fogata Reflector", use: "Refleja calor hacia el refugio en noches frías.", steps: ["Clava dos estacas y apila leños detrás como muro.", "Enciende fuego delante del reflector.", "El calor se proyecta hacia adelante."], wood: "Leños largos para el muro; leña seca para el fuego.", safety: "Coloca el reflector a favor del viento, nunca contra él." },
  { id: "zanja", name: "Fogata Zanja / Tribu", use: "Fogata segura en zonas con viento fuerte.", steps: ["Cava una zanja de 20-30 cm.", "Alimenta el fuego dentro; usa piedras alrededor como muro.", "Ideal para grupos amplios."], wood: "Leña media, aviva con brasas.", safety: "Aleja materiales inflamables del borde." },
  { id: "estrella", name: "Fogata Estrella", use: "Fuego de larga duración con poco consumo.", steps: ["Coloca 5 leños en forma de estrella con las puntas al centro.", "Enciende el centro; empuja los leños según se consumen.", "Perfecta para pernoctar."], wood: "Troncos largos.", safety: "No dejar sin supervisión durante la noche." },
];

export const REFUGIOS = [
  { id: "refugio-a", name: "Refugio en A", use: "Refugio compacto para 1-2 personas.", steps: ["Coloca una cumbrera horizontal entre dos árboles.", "Apoya ramas inclinadas a ambos lados.", "Cubre con hojas o lona formando la forma de A."], tools: "Cuerda, machete o cuchillo, lona opcional.", knots: "Ballestrinque para amarrar la cumbrera.", site: "Terreno drenado, sin ramas muertas encima." },
  { id: "cobertizo", name: "Cobertizo", use: "Techo inclinado, ideal para grupos y refugio contra lluvia.", steps: ["Construye una estructura horizontal alta.", "Añade postes inclinados.", "Cubre con ramas o lona; refuerza con amarres cuadrados."], tools: "Varas, cuerda, lona.", knots: "Amarre cuadrado y diagonal.", site: "En pendiente ligera para drenaje." },
  { id: "naturales", name: "Refugios Naturales", use: "Uso de recursos existentes: cuevas, árboles caídos, rocas.", steps: ["Inspecciona el sitio buscando fauna o inestabilidad.", "Refuerza con ramas y hojas los espacios abiertos.", "Aísla el suelo con hojarasca gruesa."], tools: "Mínimos: cuerda y machete si es posible.", knots: "Nudos simples según necesidad.", site: "Verifica ausencia de animales o insectos peligrosos." },
  { id: "tarp", name: "Tarp / Lona", use: "Rápido de montar, versátil.", steps: ["Extiende la lona entre dos árboles o postes.", "Amarra las esquinas con nudos ajustables.", "Ajusta ángulo según lluvia y viento."], tools: "Lona, cuerda, estacas.", knots: "As de guía, tensor.", site: "Suelo plano y firme; evita corrientes de agua." },
];
