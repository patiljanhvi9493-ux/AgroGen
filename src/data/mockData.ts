export interface DiseaseInfo {
  id: string;
  name: string;
  crop: string;
  category: 'Fungal' | 'Bacterial' | 'Viral' | 'Pest' | 'Nutrient' | 'Environmental';
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  affectedArea: string;
  healthScore: number;
  possibleCauses: string[];
  symptoms: string[];
  treatment: {
    organic: string[];
    chemical: string[];
  };
  preventiveMeasures: string[];
  expectedRecoveryTime: string;
  recommendedFertilizers: string[];
  recommendedPesticides: string[];
  videos: { title: string; duration: string; views: string; thumbnail: string; url: string }[];
  relatedDiseases: string[];
  nearbyExperts: string[];
}

export interface CropInfo {
  id: string;
  name: string;
  category: string;
  image: string;
  overview: string;
  idealClimate: { temp: string; humidity: string; rainfall: string };
  soil: { type: string; ph: string };
  water: { frequency: string; requirement: string };
  commonDiseases: string[];
  nutrients: string;
  harvestTime: string;
  marketPrice: string;
  priceTrend: 'up' | 'down' | 'stable';
  governmentSchemes: string[];
  faqs: { q: string; a: string }[];
}

export interface Product {
  id: string;
  name: string;
  category: 'Seeds' | 'Fertilizers' | 'Pesticides' | 'Equipment' | 'Organic Products';
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  image: string;
  seller: string;
  organic: boolean;
  description: string;
  stock: number;
}

export interface Expert {
  id: string;
  name: string;
  title: string;
  specialization: string;
  experienceYears: number;
  rating: number;
  consultationFee: number;
  languages: string[];
  availableSlots: string[];
  image: string;
  location: string;
  hospitalOrOrg: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  category: 'Guide' | 'Research' | 'Scheme' | 'Organic' | 'Hydroponics';
  readTime: string;
  author: string;
  date: string;
  summary: string;
  image: string;
  content: string;
}

export const MOCK_DISEASES: Record<string, DiseaseInfo> = {
  'tomato-blight': {
    id: 'tomato-blight',
    name: 'Tomato Late Blight (Phytophthora infestans)',
    crop: 'Tomato',
    category: 'Fungal',
    confidence: 96.8,
    severity: 'High',
    affectedArea: '35% of upper leaf foliage',
    healthScore: 62,
    possibleCauses: [
      'Extended periods of leaf wetness (>12 hours)',
      'Cool, humid weather conditions (60-70°F)',
      'Spores carried by wind from infected nearby fields',
      'Over-dense canopy preventing rapid drying'
    ],
    symptoms: [
      'Large, irregular pale green to dark water-soaked leaf spots',
      'White cottony fungal growth on lower leaf surface under high humidity',
      'Stem dark lesions leading to collapse',
      'Brown firm lesions on fruit with leather-like surface'
    ],
    treatment: {
      organic: [
        'Apply Copper Octanoate / Liquid Copper Fungicide spray twice weekly',
        'Spray Neem Oil (0.5% concentration) combined with potassium bicarbonate',
        'Prune and safely incinerate heavily infected foliage'
      ],
      chemical: [
        'Apply Chlorothalonil or Mancozeb preventative sprays',
        'Use systemic fungicides such as Cymoxanil or Dimethomorph if disease is progressing',
        'Alternate fungicide groups to prevent chemical resistance build-up'
      ]
    },
    preventiveMeasures: [
      'Plant certified disease-resistant hybrid cultivars (e.g., Defiant PhR, Mountain Magic)',
      'Maintain 36-inch spacing between rows to ensure sunlight penetration',
      'Use drip irrigation instead of overhead sprinklers to keep leaves dry',
      'Rotate crops with non-solanaceous plants (e.g., corn, legumes) every 3 years'
    ],
    expectedRecoveryTime: '10 to 14 days with prompt treatment',
    recommendedFertilizers: ['Bio-Potash Booster', 'Calcium-Magnesium Foliar Spray', 'Organic Seaweed Extract'],
    recommendedPesticides: ['AgroShield Copper Fungicide', 'BioClean Neem Max', 'Mancozeb Pro 75% WP'],
    videos: [
      {
        title: 'How to Identify & Stop Tomato Late Blight',
        duration: '8:45',
        views: '124K views',
        thumbnail: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?w=500&q=80',
        url: '#'
      },
      {
        title: 'Organic Spray Guide for Fungal Crop Diseases',
        duration: '12:10',
        views: '89K views',
        thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80',
        url: '#'
      }
    ],
    relatedDiseases: ['Tomato Early Blight', 'Potato Late Blight', 'Septoria Leaf Spot'],
    nearbyExperts: ['exp-1', 'exp-2']
  },
  'rice-blast': {
    id: 'rice-blast',
    name: 'Rice Blast Disease (Magnaporthe oryzae)',
    crop: 'Rice',
    category: 'Fungal',
    confidence: 94.2,
    severity: 'Critical',
    affectedArea: '48% of leaf blade & neck node',
    healthScore: 48,
    possibleCauses: [
      'High nitrogen fertilizer application exceeding soil capacity',
      'Night temperature around 20-25°C with heavy dew deposition',
      'High air humidity (>90%) during vegetative stage'
    ],
    symptoms: [
      'Diamond or spindle-shaped lesions with reddish-brown borders',
      'Grayish-white center on leaf blades',
      'Rotting of panicle necks causing empty, white heads'
    ],
    treatment: {
      organic: [
        'Apply Pseudomonas fluorescens bio-agent at 10g/L spray',
        'Foliar spray of 5% raw cow milk extract in early morning',
        'Drain paddy field temporarily to reduce humidity around root zone'
      ],
      chemical: [
        'Foliar spray with Tricyclazole 75% WP at 0.6g/L',
        'Isoprothiolane 40% EC application at first sign of spindle spots'
      ]
    },
    preventiveMeasures: [
      'Use resistant seed varieties like Pusa 44 or Swarna Sub1',
      'Balance NPK fertilizer ratio (120:60:40 kg/ha split dosage)',
      'Avoid late evening irrigation'
    ],
    expectedRecoveryTime: '14 to 21 days',
    recommendedFertilizers: ['Silicate Potassium Granules', 'Balanced NPK 19:19:19'],
    recommendedPesticides: ['Tricyclazole BlastShield', 'Bio-Trico Biofungicide'],
    videos: [
      {
        title: 'Paddy Blast Disease Control in 5 Steps',
        duration: '10:15',
        views: '210K views',
        thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=500&q=80',
        url: '#'
      }
    ],
    relatedDiseases: ['Rice Brown Spot', 'Bacterial Leaf Blight'],
    nearbyExperts: ['exp-2', 'exp-3']
  },
  'wheat-rust': {
    id: 'wheat-rust',
    name: 'Wheat Stripe / Yellow Rust (Puccinia striiformis)',
    crop: 'Wheat',
    category: 'Fungal',
    confidence: 97.5,
    severity: 'High',
    affectedArea: '40% of leaf blades',
    healthScore: 55,
    possibleCauses: [
      'Cool temperatures (10-15°C) coupled with intermittent showers',
      'Airborne spore drift from higher elevation overwintering regions'
    ],
    symptoms: [
      'Bright yellow, powdery pustules arranged in linear stripes along leaf veins',
      'Chlorotic stripes that eventually turn brown and dry'
    ],
    treatment: {
      organic: [
        'Dust fine agricultural sulfur powder at 25kg/ha',
        'Garlic & chilli extract bio-spray'
      ],
      chemical: [
        'Spray Propiconazole 25% EC at 1ml per liter of water',
        'Tebuconazole 25.9% EC application at early pustule stage'
      ]
    },
    preventiveMeasures: [
      'Sow rust-resistant wheat varieties (HD-2967, DBW-187)',
      'Avoid excessive urea nitrogen application'
    ],
    expectedRecoveryTime: '7 to 10 days',
    recommendedFertilizers: ['Bio-Sulfur Liquid', 'Zinc-Boron Micronutrient Mix'],
    recommendedPesticides: ['Tilt Propiconazole Spray', 'RustOff Fungicide'],
    videos: [
      {
        title: 'Wheat Yellow Rust Management Guide',
        duration: '6:30',
        views: '95K views',
        thumbnail: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=500&q=80',
        url: '#'
      }
    ],
    relatedDiseases: ['Wheat Brown Rust', 'Powdery Mildew'],
    nearbyExperts: ['exp-1', 'exp-3']
  },
  'aphid-infestation': {
    id: 'aphid-infestation',
    name: 'Aphid Pest Infestation (Aphis gossypii)',
    crop: 'Cotton / Vegetables',
    category: 'Pest',
    confidence: 95.1,
    severity: 'Moderate',
    affectedArea: '25% of tender shoots & undersides',
    healthScore: 71,
    possibleCauses: [
      'Warm weather with dry spells',
      'High succulent tender growth from over-fertilization',
      'Lack of natural predators like ladybugs'
    ],
    symptoms: [
      'Curled, yellowed, and stunted leaves',
      'Sticky honeydew residue on lower foliage causing black sooty mold',
      'Dense colonies of tiny green, black, or yellow soft-bodied insects'
    ],
    treatment: {
      organic: [
        'Spray strong water blast to dislodge colonies',
        'Apply Potassium Salts of Fatty Acids (Insecticidal Soap)',
        'Release natural predatory Ladybird Beetles or Green Lacewings'
      ],
      chemical: [
        'Spray Imidacloprid 17.8% SL at 0.5ml/L',
        'Thiamethoxam 25% WG foliar treatment'
      ]
    },
    preventiveMeasures: [
      'Install Yellow Sticky Traps (15 per acre)',
      'Plant border trap crops such as marigold or coriander'
    ],
    expectedRecoveryTime: '5 to 7 days',
    recommendedFertilizers: ['Organic Potash', 'Seaweed Bio-Extract'],
    recommendedPesticides: ['NeemMax 10000 PPM', 'ImidaPro Systemic Insecticide'],
    videos: [
      {
        title: 'Natural Aphid Elimination in 48 Hours',
        duration: '7:20',
        views: '150K views',
        thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df515122519?w=500&q=80',
        url: '#'
      }
    ],
    relatedDiseases: ['Whitefly Infestation', 'Spider Mites'],
    nearbyExperts: ['exp-2']
  },
  'nitrogen-deficiency': {
    id: 'nitrogen-deficiency',
    name: 'Severe Nitrogen Deficiency (N-Deficiency)',
    crop: 'Corn / Maize',
    category: 'Nutrient',
    confidence: 98.1,
    severity: 'Moderate',
    affectedArea: 'Lower mature leaves',
    healthScore: 74,
    possibleCauses: [
      'Leaching of soil nitrates due to excessive rainfall/irrigation',
      'Low soil organic matter content',
      'Soil pH outside optimal range (5.5-7.0)'
    ],
    symptoms: [
      'V-shaped yellowing starting from leaf tip moving inward along midrib',
      'Lower leaves turn pale yellow while upper leaves stay light green',
      'Stunted stalk growth and delayed tassel formation'
    ],
    treatment: {
      organic: [
        'Apply well-rotted vermicompost or poultry manure at 2 tons/acre',
        'Foliar spray with Liquid Fish Emulsion or Fermented Azotobacter Biofertilizer'
      ],
      chemical: [
        'Side-dress with Urea (46% N) at 35 kg/acre',
        'Apply Ammonium Sulfate or Calcium Ammonium Nitrate'
      ]
    },
    preventiveMeasures: [
      'Perform seasonal Soil Testing prior to sowing',
      'Plant nitrogen-fixing legume cover crops during off-season',
      'Use slow-release or neem-coated urea'
    ],
    expectedRecoveryTime: '5 to 8 days',
    recommendedFertilizers: ['Neem Coated Urea', 'Nano Nitrogen Foliar Spray', 'Organic Vermicompost'],
    recommendedPesticides: [],
    videos: [
      {
        title: 'Identifying Nutrient Deficiencies in Crops',
        duration: '11:05',
        views: '180K views',
        thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&q=80',
        url: '#'
      }
    ],
    relatedDiseases: ['Potassium Deficiency', 'Sulfur Deficiency'],
    nearbyExperts: ['exp-1', 'exp-3']
  }
};

export const MOCK_CROPS: CropInfo[] = [
  {
    id: 'rice',
    name: 'Rice (Paddy)',
    category: 'Cereals',
    image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=600&q=80',
    overview: 'Rice is the primary staple crop for over half of the world population. It thrives in warm, humid climates with abundant water supply.',
    idealClimate: { temp: '20°C - 35°C', humidity: '70% - 90%', rainfall: '1000 - 2500 mm' },
    soil: { type: 'Clayey Loam / Silt Loam with good water retention', ph: '5.5 - 6.5' },
    water: { frequency: 'Continuous standing water (2-5 cm)', requirement: '1200 - 1500 mm per season' },
    commonDiseases: ['Rice Blast', 'Bacterial Leaf Blight', 'Brown Spot', 'Sheath Blight'],
    nutrients: 'NPK 120:60:40 kg/ha with Zinc Sulfate top dressing',
    harvestTime: '110 - 140 days after transplanting',
    marketPrice: '$380 / Ton',
    priceTrend: 'up',
    governmentSchemes: ['PM-KISAN Fertilizer Subsidy', 'National Food Security Mission Paddy Grant', 'Sub-Mission on Agricultural Mechanization'],
    faqs: [
      { q: 'What is the best time for transplanting paddy?', a: 'Early monsoon season (June to July) yields optimal root establishment.' },
      { q: 'How to control yellowing of paddy leaves early on?', a: 'Check for Zinc deficiency; apply Zinc Sulfate 21% @ 10kg/acre.' }
    ]
  },
  {
    id: 'wheat',
    name: 'Wheat',
    category: 'Cereals',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80',
    overview: 'Wheat is a staple rabi season crop grown under cool temperatures during germination and warm sunny days during grain ripening.',
    idealClimate: { temp: '10°C - 25°C', humidity: '50% - 70%', rainfall: '450 - 650 mm' },
    soil: { type: 'Well-drained Fertile Loam to Clay Loam', ph: '6.0 - 7.5' },
    water: { frequency: '4 to 6 critical irrigations', requirement: '450 - 500 mm total' },
    commonDiseases: ['Yellow Stripe Rust', 'Loose Smut', 'Powdery Mildew', 'Karnal Bunt'],
    nutrients: 'NPK 120:60:40 kg/ha split across basal and crown root initiation',
    harvestTime: '120 - 150 days',
    marketPrice: '$290 / Ton',
    priceTrend: 'stable',
    governmentSchemes: ['MSP Wheat Procurement Guarantee', 'PM Krishi Sinchayee Yojana'],
    faqs: [
      { q: 'What are the critical irrigation stages in wheat?', a: 'Crown Root Initiation (21 days), Tillering, Jointing, Flowering, and Grain Filling.' }
    ]
  },
  {
    id: 'tomato',
    name: 'Tomato',
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?w=600&q=80',
    overview: 'High-value horticultural crop rich in Lycopene, Vitamin C, and essential minerals. Grown both in open fields and high-tech greenhouses.',
    idealClimate: { temp: '18°C - 28°C', humidity: '60% - 75%', rainfall: '600 - 800 mm' },
    soil: { type: 'Deep, well-drained Sandy Loam rich in organic matter', ph: '6.0 - 6.8' },
    water: { frequency: 'Every 3-5 days via drip irrigation', requirement: '600 - 700 mm' },
    commonDiseases: ['Late Blight', 'Early Blight', 'Leaf Curl Virus', 'Bacterial Wilt'],
    nutrients: 'NPK 150:100:120 kg/ha with Calcium and Magnesium supplementation',
    harvestTime: '75 - 90 days after transplanting',
    marketPrice: '$420 / Ton',
    priceTrend: 'up',
    governmentSchemes: ['Mission for Integrated Development of Horticulture (MIDH)', 'Polyhouse Subsidy Scheme'],
    faqs: [
      { q: 'How to prevent fruit cracking in tomatoes?', a: 'Maintain consistent soil moisture levels and ensure regular Calcium supply.' }
    ]
  },
  {
    id: 'cotton',
    name: 'Cotton',
    category: 'Fiber Crops',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&q=80',
    overview: 'Known as "White Gold", cotton is the chief raw material for global textile industries requiring warm climate and abundant sunlight.',
    idealClimate: { temp: '21°C - 32°C', humidity: '50% - 65%', rainfall: '500 - 1000 mm' },
    soil: { type: 'Deep Black Cotton Soil (Vertisols) or Alluvial Loam', ph: '6.5 - 8.0' },
    water: { frequency: 'Irrigate every 10-14 days during boll formation', requirement: '700 - 1200 mm' },
    commonDiseases: ['Bollworm Infestation', 'Bacterial Blight', 'Fusarium Wilt', 'Aphids'],
    nutrients: 'NPK 100:50:50 kg/ha',
    harvestTime: '150 - 180 days',
    marketPrice: '$1,150 / Ton',
    priceTrend: 'up',
    governmentSchemes: ['Cotton Corporation MSP Scheme', 'Drip Irrigation Infrastructure Subsidy'],
    faqs: [
      { q: 'How to manage Pink Bollworm naturally?', a: 'Deploy Pheromone Traps @ 8-10 traps/acre and spray Neem EC 1500 PPM.' }
    ]
  },
  {
    id: 'sugarcane',
    name: 'Sugarcane',
    category: 'Cash Crops',
    image: 'https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=600&q=80',
    overview: 'Perennial tropical grass cultivated for sucrose production, biofuel ethanol, and molasses byproducts.',
    idealClimate: { temp: '26°C - 35°C', humidity: '70% - 85%', rainfall: '1500 - 2500 mm' },
    soil: { type: 'Deep Fertile Loam with good drainage', ph: '6.5 - 7.5' },
    water: { frequency: 'Irrigate every 7-10 days in summer', requirement: '1500 - 2500 mm' },
    commonDiseases: ['Red Rot', 'Smut', 'Wilt', 'Early Shoot Borer'],
    nutrients: 'NPK 250:115:115 kg/ha with Bio-fertilizers',
    harvestTime: '12 - 14 months',
    marketPrice: '$45 / Ton',
    priceTrend: 'stable',
    governmentSchemes: ['FRP Sugar Cane Price Guarantee', 'Drip Irrigation Subsidy'],
    faqs: [
      { q: 'How to control Red Rot in sugarcane?', a: 'Use heat-treated seed setts and apply Trichoderma viride bio-agent to soil.' }
    ]
  },
  {
    id: 'potato',
    name: 'Potato',
    category: 'Tubers',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&q=80',
    overview: 'High-yielding root tuber crop essential for food security and industrial processing.',
    idealClimate: { temp: '15°C - 22°C', humidity: '60% - 80%', rainfall: '400 - 600 mm' },
    soil: { type: 'Loose, well-aerated Sandy Loam', ph: '5.2 - 6.4' },
    water: { frequency: 'Light irrigation every 5-7 days', requirement: '500 mm' },
    commonDiseases: ['Potato Early Blight', 'Late Blight', 'Black Scurf', 'Aphids'],
    nutrients: 'NPK 180:80:100 kg/ha',
    harvestTime: '90 - 110 days',
    marketPrice: '$220 / Ton',
    priceTrend: 'down',
    governmentSchemes: ['Cold Storage Infrastructure Grant', 'Horticulture Development Subsidies'],
    faqs: [
      { q: 'Why do potato tubers turn green?', a: 'Exposure to direct sunlight produces chlorophyll and toxic solanine. Earthing-up prevents this.' }
    ]
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'AgroShield Copper Bio-Fungicide (1 Liter)',
    category: 'Organic Products',
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&q=80',
    seller: 'AgroGreen Bio Tech',
    organic: true,
    description: 'Broad-spectrum OMRI-certified copper fungicide for organic prevention of Late Blight, Mildew, and Leaf Spots.',
    stock: 45
  },
  {
    id: 'prod-2',
    name: 'Nano Nitrogen Bio-Foliar Liquid Spray (500ml)',
    category: 'Fertilizers',
    price: 18.50,
    originalPrice: 22.00,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=500&q=80',
    seller: 'NanoCrop Science',
    organic: true,
    description: 'Ultra-absorbable nano-particles deliver instant nitrogen to leaves with 90% efficiency without soil leaching.',
    stock: 120
  },
  {
    id: 'prod-3',
    name: 'Hybrid Tomato Seeds - BlightResist Pro (100g)',
    category: 'Seeds',
    price: 32.00,
    originalPrice: 40.00,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19657?w=500&q=80',
    seller: 'Global Seeds Corp',
    organic: false,
    description: 'High-yield hybrid tomato seeds genetically bred for immunity against Late Blight and Leaf Curl Virus.',
    stock: 60
  },
  {
    id: 'prod-4',
    name: 'Smart Drip Irrigation Kit (1/2 Acre Coverage)',
    category: 'Equipment',
    price: 189.00,
    originalPrice: 230.00,
    rating: 4.9,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=500&q=80',
    seller: 'AquaSmart Irrigation Systems',
    organic: false,
    description: 'Complete drip line setup with pressure-compensating emitters, filters, timer valve, and fertilizer injector.',
    stock: 15
  },
  {
    id: 'prod-5',
    name: 'NeemMax 10,000 PPM Cold Pressed Botanical Insecticide',
    category: 'Pesticides',
    price: 29.99,
    originalPrice: 38.00,
    rating: 4.6,
    reviewsCount: 204,
    image: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=500&q=80',
    seller: 'PureEarth Organics',
    organic: true,
    description: 'High concentration Azadirachtin neem extract controlling over 200 species of chewing and sucking pests.',
    stock: 80
  }
];

export const MOCK_EXPERTS: Expert[] = [
  {
    id: 'exp-1',
    name: 'Dr. Rajesh Kumar, Ph.D.',
    title: 'Senior Plant Pathologist',
    specialization: 'Fungal Diseases & Vegetable Crops',
    experienceYears: 18,
    rating: 4.95,
    consultationFee: 25.00,
    languages: ['English', 'Hindi', 'Punjabi'],
    availableSlots: ['Today 04:00 PM', 'Today 06:30 PM', 'Tomorrow 10:00 AM'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    location: 'Punjab Agricultural University',
    hospitalOrOrg: 'ICAR National Research Institute'
  },
  {
    id: 'exp-2',
    name: 'Dr. Sarah Jenkins',
    title: 'Agronomist & Pest Specialist',
    specialization: 'Integrated Pest Management (IPM)',
    experienceYears: 14,
    rating: 4.88,
    consultationFee: 30.00,
    languages: ['English', 'Spanish'],
    availableSlots: ['Today 05:00 PM', 'Tomorrow 11:30 AM', 'Tomorrow 03:00 PM'],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    location: 'California AgriScience Lab',
    hospitalOrOrg: 'Global Farming Advisory'
  },
  {
    id: 'exp-3',
    name: 'Prof. Ramesh Patel',
    title: 'Soil Health & Crop Nutritionist',
    specialization: 'Soil Microbiology & Organic Farming',
    experienceYears: 22,
    rating: 4.98,
    consultationFee: 20.00,
    languages: ['English', 'Hindi', 'Gujarati'],
    availableSlots: ['Today 07:00 PM', 'Tomorrow 09:00 AM', 'Tomorrow 02:00 PM'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    location: 'Anand Agricultural University',
    hospitalOrOrg: 'BioSoil Science Research'
  }
];

export const MOCK_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-1',
    title: 'Complete Guide to Organic Bio-Pesticides Formulation',
    category: 'Organic',
    readTime: '6 min read',
    author: 'Prof. Ramesh Patel',
    date: 'July 15, 2026',
    summary: 'Learn how to formulate natural bio-pesticides using neem leaves, garlic, chilli, and buttermilk to combat chewing pests.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80',
    content: 'Organic bio-pesticides provide an eco-friendly alternative to harsh synthetic chemicals...'
  },
  {
    id: 'art-2',
    title: 'Hydroponics & Vertical Farming: Maximizing Yield per Square Foot',
    category: 'Hydroponics',
    readTime: '9 min read',
    author: 'Dr. Sarah Jenkins',
    date: 'July 18, 2026',
    summary: 'Discover Nutrient Film Technique (NFT) and Deep Water Culture setups for growing strawberries and leafy greens indoors.',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=600&q=80',
    content: 'Vertical hydroponics allows farmers to grow up to 10x more produce using 90% less water...'
  },
  {
    id: 'art-3',
    title: 'Government Subsidies & Grants for Smart Drip Irrigation in 2026',
    category: 'Scheme',
    readTime: '5 min read',
    author: 'AgroGen Agri-Policy Team',
    date: 'July 10, 2026',
    summary: 'A step-by-step application walkthrough to claim up to 80% subsidy on precision drip lines and solar pumps.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    content: 'Under the National Agriculture Development Scheme, small-scale farmers qualify for financial assistance...'
  }
];
