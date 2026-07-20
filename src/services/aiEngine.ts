import { jsPDF } from 'jspdf';
import type { DiseaseInfo } from '../data/mockData';
import { MOCK_DISEASES } from '../data/mockData';

export async function analyzePlantImage(_fileDataUrl: string, fileName: string = ''): Promise<DiseaseInfo> {
  // Simulate AI deep learning processing latency
  await new Promise((resolve) => setTimeout(resolve, 2400));

  const lowerName = fileName.toLowerCase();

  if (lowerName.includes('rice') || lowerName.includes('paddy')) {
    return MOCK_DISEASES['rice-blast'];
  } else if (lowerName.includes('wheat') || lowerName.includes('rust')) {
    return MOCK_DISEASES['wheat-rust'];
  } else if (lowerName.includes('aphid') || lowerName.includes('pest') || lowerName.includes('bug')) {
    return MOCK_DISEASES['aphid-infestation'];
  } else if (lowerName.includes('corn') || lowerName.includes('yellow') || lowerName.includes('nitrogen')) {
    return MOCK_DISEASES['nitrogen-deficiency'];
  }

  // Default to Late Blight as primary showcase disease
  return MOCK_DISEASES['tomato-blight'];
}

export function generateReportPDF(disease: DiseaseInfo, farmerName: string = 'Registered Farmer') {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(11, 28, 17);
  doc.rect(0, 0, 210, 38, 'F');

  doc.setTextColor(34, 197, 94);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('AgroGen Smart Diagnostic Report', 14, 20);

  doc.setTextColor(200, 225, 210);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated on: ${new Date().toLocaleDateString()} | Farmer: ${farmerName}`, 14, 30);

  // Disease Summary Card
  doc.setLineWidth(0.5);
  doc.setDrawColor(34, 197, 94);
  doc.setFillColor(245, 250, 246);
  doc.roundedRect(14, 45, 182, 38, 3, 3, 'FD');

  doc.setTextColor(20, 40, 25);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(disease.name, 20, 56);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Crop: ${disease.crop}  |  Category: ${disease.category}  |  AI Confidence: ${disease.confidence}%`, 20, 65);
  doc.text(`Severity Level: ${disease.severity}  |  Affected Area: ${disease.affectedArea}`, 20, 74);

  // Symptoms & Causes
  let y = 92;
  doc.setTextColor(15, 80, 40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Symptoms Observed:', 14, y);
  y += 7;

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  disease.symptoms.forEach((symptom) => {
    doc.text(`• ${symptom}`, 18, y);
    y += 6;
  });

  y += 4;
  doc.setTextColor(15, 80, 40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Organic & Chemical Treatments:', 14, y);
  y += 7;

  doc.setTextColor(34, 139, 34);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Organic Remedies:', 18, y);
  y += 6;

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  disease.treatment.organic.forEach((item) => {
    doc.text(`- ${item}`, 22, y);
    y += 6;
  });

  y += 2;
  doc.setTextColor(180, 40, 40);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Chemical Remedies:', 18, y);
  y += 6;

  doc.setTextColor(50, 50, 50);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  disease.treatment.chemical.forEach((item) => {
    doc.text(`- ${item}`, 22, y);
    y += 6;
  });

  // Recommendations
  y += 6;
  doc.setTextColor(15, 80, 40);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Recommended Products:', 14, y);
  y += 7;

  doc.setTextColor(60, 60, 60);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Fertilizers: ${disease.recommendedFertilizers.join(', ')}`, 18, y);
  y += 6;
  doc.text(`Pesticides/Fungicides: ${disease.recommendedPesticides.join(', ')}`, 18, y);

  // Footer Signature
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('AgroGen AI Smart Agriculture Platform - Verified Diagnostic Advisory', 14, 285);

  doc.save(`AgroGen_Report_${disease.crop}_${Date.now()}.pdf`);
}

export async function chatWithAgroBot(userMessage: string, contextCrop?: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const lower = userMessage.toLowerCase();

  if (lower.includes('yellow') || lower.includes('leaves turning')) {
    return `Yellowing of leaves (Chlorosis) is often caused by either Nitrogen deficiency, overwatering, or fungal infections like Early Blight.
    
1. Check soil moisture: Ensure drainage is clear and soil isn't waterlogged.
2. Nitrogen Boost: Apply a foliar spray of Liquid Bio-Nitrogen or Vermicompost Tea.
3. Disease Check: Inspect the leaf undersides for brown/black spots. If present, apply Neem Oil or Copper Fungicide.`;
  }

  if (lower.includes('fertilizer') || lower.includes('fertilisers')) {
    return `For optimal crop health, fertilizer selection depends on the growth stage:
    
• Vegetative Growth Stage: High-Nitrogen formulation (NPK 19:19:19 or Organic Neem-coated Urea).
• Flowering & Fruit Setting: High-Phosphorus and Potassium (NPK 0:52:34 or Bio-Potash) to boost bloom size and disease resistance.
• Micronutrients: Foliar Zinc & Boron spray every 21 days prevents flower drop.`;
  }

  if (lower.includes('water') || lower.includes('irrigation')) {
    const cropName = contextCrop || 'crops';
    return `Water requirements for ${cropName}:
    
• Paddy Rice: Requires continuous 2-5cm standing water during vegetative growth.
• Wheat: Needs 4-6 critical irrigations at Crown Root Initiation, Jointing, and Flowering stages.
• Tomatoes: Best watered via drip irrigation supplying 2-3 liters per plant daily in warm weather. Avoid spraying leaves directly!`;
  }

  if (lower.includes('insect') || lower.includes('pest') || lower.includes('bug')) {
    return `For pest identification and control:
    
1. Sucking Pests (Aphids/Whiteflies): Spray Neem Oil 10,000 PPM @ 3ml/L water or install Yellow Sticky Traps (15/acre).
2. Chewing Caterpillars (Bollworm/Armyworm): Spray Bacillus thuringiensis (Bt) bio-insecticide or Emamectin Benzoate.
3. Natural Predators: Introduce Ladybird beetles or Lacewings to naturally eliminate pest colonies.`;
  }

  if (lower.includes('strawberry') || lower.includes('strawberries')) {
    return `To grow healthy strawberries:
    
• Soil: Well-drained sandy loam with pH 5.8 - 6.5.
• Sunlight: Full sun (at least 6-8 hours per day).
• Spacing: 12-18 inches apart with straw mulch to prevent soil contact with fruits.
• Irrigation: Drip irrigation to keep crown dry and avoid gray mold (Botrytis).`;
  }

  return `I have analyzed your query regarding "${userMessage}". As your AgroGen Smart Assistant, I recommend maintaining optimal soil pH (6.0-7.0), using balanced organic nutrients, and inspecting leaves daily for early disease signs. You can also upload a leaf photo directly here for instant AI diagnostic scan!`;
}

export function textToSpeech(text: string) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); // Stop ongoing speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}
