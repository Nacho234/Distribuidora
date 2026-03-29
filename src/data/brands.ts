export interface Brand {
  id: string
  name: string
  description: string
  specialty: string
  featured: boolean
  color: string
}

export const brands: Brand[] = [
  {
    id: 'tonaleg',
    name: 'TONALEG',
    description: 'Nuestra marca insignia. Innovación y calidad en cada producto para profesionales exigentes.',
    specialty: 'Tratamientos Premium',
    featured: true,
    color: '#C9A84C',
  },
  {
    id: 'kerastase',
    name: 'Kérastase',
    description: 'El lujo del cuidado capilar. Rituales personalizados para cada tipo de cabello.',
    specialty: 'Rituales de Lujo',
    featured: true,
    color: '#9B8070',
  },
  {
    id: 'loreal',
    name: "L'Oréal Pro",
    description: 'La ciencia al servicio de la belleza. Coloración y tratamientos de vanguardia.',
    specialty: 'Coloración',
    featured: true,
    color: '#C0392B',
  },
  {
    id: 'wella',
    name: 'Wella Professionals',
    description: 'Tecnología alemana en coloración y cuidado para resultados extraordinarios.',
    specialty: 'Color & Cuidado',
    featured: true,
    color: '#2C3E50',
  },
  {
    id: 'schwarzkopf',
    name: 'Schwarzkopf',
    description: 'Más de 120 años de expertise en cosmética capilar profesional.',
    specialty: 'Profesional Expert',
    featured: false,
    color: '#1A1A2E',
  },
  {
    id: 'redken',
    name: 'Redken',
    description: 'Ciencia y arte fusionados. Proteínas y fórmulas de alto desempeño.',
    specialty: 'Proteínas & Ciencia',
    featured: false,
    color: '#E74C3C',
  },
  {
    id: 'olaplex',
    name: 'Olaplex',
    description: 'Tecnología patentada que repara el cabello desde adentro hacia afuera.',
    specialty: 'Reparación Molecular',
    featured: false,
    color: '#8E44AD',
  },
  {
    id: 'moroccanoil',
    name: 'Moroccanoil',
    description: 'El poder del aceite de argán para una belleza sin precedentes.',
    specialty: 'Aceite de Argán',
    featured: false,
    color: '#D35400',
  },
  {
    id: 'revlon',
    name: 'Revlon Professional',
    description: 'Innovación constante en coloración y cuidado para el profesional moderno.',
    specialty: 'Coloración & Styling',
    featured: false,
    color: '#C0392B',
  },
  {
    id: 'fanola',
    name: 'Fanola',
    description: 'Productos profesionales italianos con resultados extraordinarios.',
    specialty: 'Cuidado Italiano',
    featured: false,
    color: '#2980B9',
  },
]

export const marqueeLogos = [
  'TONALEG', 'KÉRASTASE', "L'ORÉAL", 'WELLA', 'SCHWARZKOPF',
  'REDKEN', 'OLAPLEX', 'MOROCCANOIL', 'REVLON', 'FANOLA',
  'TONALEG', 'KÉRASTASE', "L'ORÉAL", 'WELLA', 'SCHWARZKOPF',
  'REDKEN', 'OLAPLEX', 'MOROCCANOIL', 'REVLON', 'FANOLA',
]
