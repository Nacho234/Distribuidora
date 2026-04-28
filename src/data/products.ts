export interface Product {
  id: string
  name: string
  brand: string
  category: string
  subcategory: string
  volume: string
  description: string
  price: number
  stock: number
  hairTypes: string[]
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
    gradient: 'from-[#fff8f0] to-[#fef0dc]',
  },
  {
    id: 'color',
    name: 'Color Profesional',
    description: 'Coloración, decoloración, oxidantes y toners para resultados perfectos y duraderos.',
    icon: '◈',
    count: 124,
    gradient: 'from-[#f4f0ff] to-[#ebe5ff]',
  },
  {
    id: 'styling',
    name: 'Styling & Acabado',
    description: 'Lacas, ceras, cremas y productos de acabado para crear looks únicos y profesionales.',
    icon: '❋',
    count: 63,
    gradient: 'from-[#f0fff4] to-[#e5f5e8]',
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
    price: 8500,
    stock: 24,
    hairTypes: ['seco', 'dañado', 'teñido'],
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
    price: 5200,
    stock: 18,
    hairTypes: ['todo tipo', 'lacio', 'ondulado'],
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
    price: 12000,
    stock: 9,
    hairTypes: ['todo tipo', 'fino', 'debilitado'],
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
    price: 3800,
    stock: 42,
    hairTypes: ['todo tipo', 'teñido'],
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
    price: 9700,
    stock: 15,
    hairTypes: ['todo tipo', 'resistente'],
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
    price: 4100,
    stock: 30,
    hairTypes: ['teñido', 'rubio'],
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
    price: 3200,
    stock: 55,
    hairTypes: ['todo tipo', 'lacio', 'ondulado'],
  },
  {
    id: '8',
    name: 'Cera Moldeadora Texturizada',
    brand: 'Redken',
    category: 'styling',
    subcategory: 'Ceras',
    volume: '100ml',
    description: 'Control y definición con efecto texturizado mate',
    price: 6800,
    stock: 11,
    hairTypes: ['rizado', 'ondulado', 'corto'],
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
    price: 18500,
    stock: 7,
    hairTypes: ['dañado', 'teñido', 'decolorado'],
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
    price: 14200,
    stock: 20,
    hairTypes: ['seco', 'dañado', 'rizado', 'ondulado'],
  },
  {
    id: '11',
    name: 'Crema Alisadora Keratin',
    brand: 'TONALEG',
    category: 'styling',
    subcategory: 'Alisadores',
    volume: '200ml',
    description: 'Alisado progresivo con keratina activa y argan',
    price: 7600,
    stock: 13,
    hairTypes: ['rizado', 'ondulado', 'rebelde'],
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
    price: 4500,
    stock: 38,
    hairTypes: ['todo tipo', 'teñido'],
  },
]
