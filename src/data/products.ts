export interface Product {
  id: string
  name: string
  brand: string
  category: string
  subcategory: string
  volume: string
  description: string
  badge?: string
  isNew?: boolean
  isBestseller?: boolean
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  count: number
  gradient: string
}

export const categories: Category[] = [
  {
    id: 'treatments',
    name: 'Tratamientos Capilares',
    description: 'Máscaras, serums, aceites y ampollas para restaurar y fortalecer el cabello desde las raíces.',
    icon: '✦',
    count: 87,
    gradient: 'from-[#1a0e05] to-[#2d1a08]',
  },
  {
    id: 'color',
    name: 'Color Profesional',
    description: 'Coloración, decoloración, oxidantes y toners para resultados perfectos y duraderos.',
    icon: '◈',
    count: 124,
    gradient: 'from-[#0d0a1a] to-[#1a1033]',
  },
  {
    id: 'styling',
    name: 'Styling & Acabado',
    description: 'Lacas, ceras, cremas y productos de acabado para crear looks únicos y profesionales.',
    icon: '❋',
    count: 63,
    gradient: 'from-[#0a1a0e] to-[#0d2614]',
  },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'Mascarilla Reparadora Intensiva',
    brand: 'TONALEG',
    category: 'treatments',
    subcategory: 'Máscaras',
    volume: '500ml',
    description: 'Reparación profunda con keratina y aceites esenciales',
    badge: 'BESTSELLER',
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Sérum Brillo & Protección',
    brand: 'TONALEG',
    category: 'treatments',
    subcategory: 'Serums',
    volume: '100ml',
    description: 'Sérum de acabado con protección térmica hasta 230°C',
    isNew: true,
  },
  {
    id: '3',
    name: 'Ampolla Caída Capilar',
    brand: 'TONALEG',
    category: 'treatments',
    subcategory: 'Ampollas',
    volume: '12x10ml',
    description: 'Tratamiento intensivo anticaída con biotina y zinc',
    badge: 'TOP',
  },
  {
    id: '4',
    name: 'Color Permanente Vibrant',
    brand: "L'Oréal Pro",
    category: 'color',
    subcategory: 'Coloración',
    volume: '60ml',
    description: 'Coloración permanente con tecnología de triple protección',
    isBestseller: true,
  },
  {
    id: '5',
    name: 'Polvo Decolorante Platinium',
    brand: 'Wella',
    category: 'color',
    subcategory: 'Decoloración',
    volume: '500g',
    description: 'Decoloración de hasta 9 tonos con acción anti-rotura',
    badge: 'PRO',
  },
  {
    id: '6',
    name: 'Toner Matizador Violeta',
    brand: 'Schwarzkopf',
    category: 'color',
    subcategory: 'Toners',
    volume: '60ml',
    description: 'Neutraliza tonos amarillos y brinda reflejos fríos perfectos',
    isNew: true,
  },
  {
    id: '7',
    name: 'Spray Fijador Ultra Hold',
    brand: 'TONALEG',
    category: 'styling',
    subcategory: 'Fijadores',
    volume: '400ml',
    description: 'Fijación extrema con acabado natural sin residuos',
  },
  {
    id: '8',
    name: 'Cera Moldeadora Texturizada',
    brand: 'Redken',
    category: 'styling',
    subcategory: 'Ceras',
    volume: '100ml',
    description: 'Control y definición con efecto texturizado mate',
    isBestseller: true,
  },
  {
    id: '9',
    name: 'Bond Building N°3',
    brand: 'Olaplex',
    category: 'treatments',
    subcategory: 'Bond Repair',
    volume: '100ml',
    description: 'Reparación molecular del vínculo del cabello',
    badge: 'ICON',
  },
  {
    id: '10',
    name: 'Aceite de Argán Puro',
    brand: 'Moroccanoil',
    category: 'treatments',
    subcategory: 'Aceites',
    volume: '100ml',
    description: 'Aceite de argán marroquí 100% puro para brillo extremo',
  },
  {
    id: '11',
    name: 'Crema Alisadora Keratin',
    brand: 'TONALEG',
    category: 'styling',
    subcategory: 'Alisadores',
    volume: '200ml',
    description: 'Alisado progresivo con keratina activa y argan',
    isNew: true,
  },
  {
    id: '12',
    name: 'Oxidante 20 Vol Cremoso',
    brand: "L'Oréal Pro",
    category: 'color',
    subcategory: 'Oxidantes',
    volume: '1L',
    description: 'Oxidante cremoso para coloraciones perfectas y uniformes',
  },
]
