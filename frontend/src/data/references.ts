export const REFERENCE_TEXTS = {
  promesa: {
    title: "Promesa Scout",
    icon: "shield-star-outline",
    body: `Por mi honor prometo hacer cuanto de mí dependa por:

Cumplir mis deberes para con Dios y mi Patria.

Ayudar al prójimo en toda circunstancia, y

Cumplir fielmente la Ley Scout.`,
  },
  ley: {
    title: "Ley Scout",
    icon: "compass-outline",
    body: `1. El scout cifra su honor en ser digno de confianza.
2. El scout es leal.
3. El scout es útil y ayuda a los demás sin esperar recompensa.
4. El scout es amigo de todos y hermano de todo otro scout, sin distinción de credo, raza, nacionalidad o clase social.
5. El scout es cortés y actúa como caballero/dama.
6. El scout ve en la naturaleza la obra de Dios y protege a plantas y animales.
7. El scout obedece sin réplica y no hace nada a medias.
8. El scout sonríe y canta en sus dificultades.
9. El scout es económico, trabajador y respetuoso del bien ajeno.
10. El scout es limpio y sano; puro en pensamientos, palabras y obras.`,
  },
  oracion: {
    title: "Oración del Pionero",
    icon: "hands-pray",
    body: `Señor, dame fuerza para cambiar lo que pueda ser cambiado, serenidad para aceptar lo que no puedo ser cambiado, pero sobre todas las cosas, sabiduría para poder discernir entre ambas.

Amén.`,
  },
} as const;

export type ReferenceKey = keyof typeof REFERENCE_TEXTS;
