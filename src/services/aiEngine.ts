import { jsPDF } from 'jspdf';
import type { DiseaseInfo } from '../data/mockData';
import { MOCK_DISEASES } from '../data/mockData';

export async function analyzePlantImage(fileDataUrl: string, fileName: string = '', cropType?: string): Promise<DiseaseInfo> {
  const apiKey = localStorage.getItem('agrogen_apiKey');
  const modelChoice = localStorage.getItem('agrogen_modelChoice') || 'agrogen-vision-v2';

  const isRealAi = apiKey && apiKey.trim().length > 0 && modelChoice !== 'agrogen-vision-v2';

  if (isRealAi) {
    try {
      // Parse the data URL to get base64 data and mime type
      const match = fileDataUrl.match(/^data:([^;]+);base64,(.*)$/);
      let mimeType = 'image/jpeg';
      let base64Data = fileDataUrl;
      if (match) {
        mimeType = match[1];
        base64Data = match[2];
      }

      let parsedResult: any = null;

      if (modelChoice.startsWith('gemini')) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelChoice}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are an expert plant pathologist. Analyze this plant leaf image. 
Identify the crop, the disease, pest ("rog" in Hindi), or nutrient deficiency affecting it. 
You MUST respond strictly with a valid JSON object matching the JSON schema below. 
Do not include any other text, explanations, or markdown code block markers. Just return the raw JSON object.

JSON Schema:
{
  "id": "string (slug-format like 'tomato-late-blight')",
  "name": "string (e.g. 'Tomato Late Blight (Phytophthora infestans)')",
  "crop": "string (e.g. 'Tomato')",
  "category": "Fungal" | "Bacterial" | "Viral" | "Pest" | "Nutrient" | "Environmental",
  "confidence": number (between 0 and 100),
  "severity": "Low" | "Moderate" | "High" | "Critical",
  "affectedArea": "string (e.g. '35% of leaf surface')",
  "healthScore": number (between 0 and 100),
  "possibleCauses": ["string", "string", ...],
  "symptoms": ["string", "string", ...],
  "treatment": {
    "organic": ["string", "string", ...],
    "chemical": ["string", "string", ...]
  },
  "preventiveMeasures": ["string", "string", ...],
  "expectedRecoveryTime": "string",
  "recommendedFertilizers": ["string", ...],
  "recommendedPesticides": ["string", ...]
}`
                    },
                    {
                      inlineData: {
                        mimeType: mimeType,
                        data: base64Data
                      }
                    }
                  ]
                }
              ],
              generationConfig: {
                responseMimeType: "application/json"
              }
            })
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const resData = await response.json();
        const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!rawText) {
          throw new Error("Empty response returned from Gemini.");
        }
        
        let cleanedText = rawText.trim();
        if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, '').replace(/```$/, '').trim();
        }
        parsedResult = JSON.parse(cleanedText);

      } else if (modelChoice.startsWith('gpt')) {
        const apiModel = modelChoice === 'gpt-4o-mini' ? 'gpt-4o-mini' : 'gpt-4o';
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: apiModel,
            response_format: { type: "json_object" },
            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: `You are an expert plant pathologist. Analyze this plant leaf image. 
Identify the crop, the disease, pest ("rog" in Hindi), or nutrient deficiency affecting it. 
You MUST respond strictly with a valid JSON object matching the JSON schema below.

JSON Schema:
{
  "id": "string (slug-format like 'tomato-late-blight')",
  "name": "string (e.g. 'Tomato Late Blight (Phytophthora infestans)')",
  "crop": "string (e.g. 'Tomato')",
  "category": "Fungal" | "Bacterial" | "Viral" | "Pest" | "Nutrient" | "Environmental",
  "confidence": number (between 0 and 100),
  "severity": "Low" | "Moderate" | "High" | "Critical",
  "affectedArea": "string (e.g. '35% of leaf surface')",
  "healthScore": number (between 0 and 100),
  "possibleCauses": ["string", "string", ...],
  "symptoms": ["string", "string", ...],
  "treatment": {
    "organic": ["string", "string", ...],
    "chemical": ["string", "string", ...]
  },
  "preventiveMeasures": ["string", "string", ...],
  "expectedRecoveryTime": "string",
  "recommendedFertilizers": ["string", ...],
  "recommendedPesticides": ["string", ...]
}`
                  },
                  {
                    type: "image_url",
                    image_url: {
                      url: `data:${mimeType};base64,${base64Data}`
                    }
                  }
                ]
              }
            ]
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const resData = await response.json();
        const rawText = resData.choices?.[0]?.message?.content;
        if (!rawText) {
          throw new Error("Empty response returned from OpenAI.");
        }

        let cleanedText = rawText.trim();
        if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, '').replace(/```$/, '').trim();
        }
        parsedResult = JSON.parse(cleanedText);
      }

      if (parsedResult) {
        // Ensure all required fields exist for front-end rendering and type safety
        const validatedInfo: DiseaseInfo = {
          id: parsedResult.id || `disease-${Date.now()}`,
          name: parsedResult.name || 'Unknown Leaf Condition',
          crop: parsedResult.crop || 'Unknown Plant',
          category: parsedResult.category || 'Environmental',
          confidence: typeof parsedResult.confidence === 'number' ? parsedResult.confidence : 85.0,
          severity: parsedResult.severity || 'Moderate',
          affectedArea: parsedResult.affectedArea || '15% of foliage',
          healthScore: typeof parsedResult.healthScore === 'number' ? parsedResult.healthScore : 75,
          possibleCauses: Array.isArray(parsedResult.possibleCauses) ? parsedResult.possibleCauses : ['Environmental conditions', 'Foliage moisture'],
          symptoms: Array.isArray(parsedResult.symptoms) ? parsedResult.symptoms : ['Discoloration or lesion spot patterns observed'],
          treatment: {
            organic: Array.isArray(parsedResult.treatment?.organic) ? parsedResult.treatment.organic : ['Apply Neem oil spray preventative action'],
            chemical: Array.isArray(parsedResult.treatment?.chemical) ? parsedResult.treatment.chemical : ['Apply multi-purpose fungicide spray']
          },
          preventiveMeasures: Array.isArray(parsedResult.preventiveMeasures) ? parsedResult.preventiveMeasures : ['Keep leaves dry and maintain crop rotation'],
          expectedRecoveryTime: parsedResult.expectedRecoveryTime || '7 to 10 days',
          recommendedFertilizers: Array.isArray(parsedResult.recommendedFertilizers) ? parsedResult.recommendedFertilizers : [],
          recommendedPesticides: Array.isArray(parsedResult.recommendedPesticides) ? parsedResult.recommendedPesticides : [],
          videos: Array.isArray(parsedResult.videos) ? parsedResult.videos : [
            {
              title: `How to manage ${parsedResult.name || 'crop health'}`,
              duration: '4:30',
              views: '1.2K views',
              thumbnail: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=500&q=80',
              url: '#'
            }
          ],
          relatedDiseases: Array.isArray(parsedResult.relatedDiseases) ? parsedResult.relatedDiseases : [],
          nearbyExperts: Array.isArray(parsedResult.nearbyExperts) ? parsedResult.nearbyExperts : ['exp-1', 'exp-2']
        };

        return validatedInfo;
      }
    } catch (error) {
      console.error("AI Vision analysis failed, falling back to local simulation:", error);
    }
  }

  // Simulate AI deep learning processing latency for simulated engine
  await new Promise((resolve) => setTimeout(resolve, 2400));

  const lowerName = (cropType || fileName).toLowerCase();

  if (lowerName.includes('rice') || lowerName.includes('paddy')) {
    return MOCK_DISEASES['rice-blast'];
  } else if (lowerName.includes('wheat') || lowerName.includes('rust')) {
    return MOCK_DISEASES['wheat-rust'];
  } else if (lowerName.includes('aphid') || lowerName.includes('pest') || lowerName.includes('bug') || lowerName.includes('cotton')) {
    return MOCK_DISEASES['aphid-infestation'];
  } else if (lowerName.includes('corn') || lowerName.includes('yellow') || lowerName.includes('nitrogen') || lowerName.includes('maize')) {
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
