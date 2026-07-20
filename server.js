import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '25mb' }));

// Static frontend build distribution
app.use(express.static(path.join(__dirname, 'dist')));

// Mock Database Datasets
const MOCK_DISEASES = {
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
      'Spores carried by wind from infected nearby fields'
    ],
    symptoms: [
      'Large, irregular pale green to dark water-soaked leaf spots',
      'White cottony fungal growth on lower leaf surface under high humidity',
      'Brown firm lesions on fruit with leather-like surface'
    ],
    treatment: {
      organic: [
        'Apply Copper Octanoate / Liquid Copper Fungicide spray twice weekly',
        'Spray Neem Oil (0.5% concentration) combined with potassium bicarbonate'
      ],
      chemical: [
        'Apply Chlorothalonil or Mancozeb preventative sprays',
        'Use systemic fungicides such as Cymoxanil or Dimethomorph'
      ]
    },
    expectedRecoveryTime: '10 to 14 days with prompt treatment',
    recommendedFertilizers: ['Bio-Potash Booster', 'Calcium-Magnesium Foliar Spray'],
    recommendedPesticides: ['AgroShield Copper Fungicide', 'BioClean Neem Max']
  },
  'rice-blast': {
    id: 'rice-blast',
    name: 'Rice Blast Disease (Magnaporthe oryzae)',
    crop: 'Rice',
    category: 'Fungal',
    confidence: 94.2,
    severity: 'Critical',
    affectedArea: '48% of leaf blade',
    healthScore: 48,
    possibleCauses: ['High nitrogen fertilizer application', 'Night temperature around 20-25°C with heavy dew'],
    symptoms: ['Diamond or spindle-shaped lesions', 'Rotting of panicle necks causing empty, white heads'],
    treatment: {
      organic: ['Apply Pseudomonas fluorescens bio-agent at 10g/L spray', 'Foliar spray of 5% raw cow milk extract'],
      chemical: ['Foliar spray with Tricyclazole 75% WP at 0.6g/L', 'Isoprothiolane 40% EC application']
    },
    expectedRecoveryTime: '14 to 21 days',
    recommendedFertilizers: ['Silicate Potassium Granules', 'Balanced NPK 19:19:19'],
    recommendedPesticides: ['Tricyclazole BlastShield', 'Bio-Trico Biofungicide']
  }
};

// --- API Endpoints ---

// Server Health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'AgroGen AI Smart Agriculture Server',
    version: '2.4.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// AI Disease Vision Scanner Endpoint
app.post('/api/analyze', (req, res) => {
  const { fileName = '' } = req.body;
  const lower = fileName.toLowerCase();

  if (lower.includes('rice') || lower.includes('paddy')) {
    return res.json({ success: true, data: MOCK_DISEASES['rice-blast'] });
  }

  res.json({ success: true, data: MOCK_DISEASES['tomato-blight'] });
});

// AI Chatbot Advisory Endpoint
app.post('/api/chat', (req, res) => {
  const { message = '' } = req.body;
  const lower = message.toLowerCase();

  let responseText = 'Thank you for consulting AgroGen AI. For maximum crop yield, ensure balanced NPK fertilization and monitor leaf moisture daily.';

  if (lower.includes('yellow')) {
    responseText = 'Yellowing of leaves (Chlorosis) indicates Nitrogen deficiency or overwatering. Apply a foliar spray of Liquid Bio-Nitrogen or Vermicompost tea.';
  } else if (lower.includes('fertilizer') || lower.includes('fertilisers')) {
    responseText = 'For vegetative growth, apply balanced NPK 19:19:19 or Neem Coated Urea. For fruit setting, use High-Potash formulations.';
  } else if (lower.includes('water')) {
    responseText = 'Ensure drip irrigation supplies 2-3 liters of water per plant daily in warm weather. Avoid spraying foliage directly.';
  }

  res.json({ success: true, response: responseText });
});

// Fallback route handler for SPA React routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🌾 AgroGen Full-Stack Node.js Express Server Live!`);
  console.log(`🌐 Application URL: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
