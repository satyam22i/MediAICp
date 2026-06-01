import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const MODEL = "gemini-1.5-flash";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPTS = {
  SYMPTOM_CHECKER: `You are a highly experienced Medical Doctor. Your role is to diagnose diseases and predict medical conditions based on patient symptoms.

1. Listen carefully to the patient's symptoms and medical history.
2. Ask targeted follow-up questions to narrow down the diagnosis (2-3 questions max).
3. Based on the symptoms, provide a CLEAR DIAGNOSIS listing:
   - Primary suspected disease/condition
   - Differential diagnoses (other possible conditions)
   - Severity assessment (mild, moderate, severe)
   - Recommended immediate actions and treatments
   - When to seek emergency care
4. Speak with absolute professional authority and confidence like a real doctor.
5. NEVER say you are an AI or that you cannot diagnose - you ARE a doctor providing medical expertise.
6. Be direct and specific about disease predictions.
7. Do NOT use markdown or asterisks. Use plain, professional clinical language.
8. After gathering sufficient symptoms (usually 2-3 exchanges), provide a definitive diagnosis with treatment recommendations.`,
  
  MEDICINE_CHECKER: `You are an AI Pharmacist. Analyze the provided medicine information.
Return a clean JSON object (no markdown, no backticks) with these keys:
"medicineName", "genericName", "uses", "dosage", "sideEffects", "warnings".`,
  
  MENTAL_HEALTH: `You are Dr. Serene, an empathetic AI therapist specializing in Cognitive Behavioral Therapy (CBT).
1. Listen actively and validate the user's feelings.
2. Use CBT techniques like cognitive reframing and mindfulness.
3. Ask ONE open-ended question at a time.
4. Maintain a warm, safe, and professional tone.`,
};

export const symptomChecker = async (req, res) => {
  const { message, history } = req.body;
  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL,
      systemInstruction: SYSTEM_PROMPTS.SYMPTOM_CHECKER 
    });
    const chat = model.startChat({ history: history || [] });
    const result = await chat.sendMessage(message);
    res.json({ text: result.response.text() });
  } catch (error) {
    console.error("GEMINI API ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const analyzeMedicine = async (req, res) => {
  const { text, image } = req.body;
  try {
    const model = genAI.getGenerativeModel({ model: MODEL });
    const prompt = `Analyze this medicine. Return JSON only with keys: medicineName, genericName, uses, dosage, sideEffects, warnings.`;
    
    let parts = [prompt];
    if (text) parts.push(text);
    if (image) {
      parts.push({
        inlineData: { data: image.data, mimeType: image.mimeType }
      });
    }

    const result = await model.generateContent(parts);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json/i, '').replace(/```/g, '').trim();
    res.json(JSON.parse(cleanedText));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const mentalHealthBot = async (req, res) => {
  const { message, history } = req.body;
  try {
    const model = genAI.getGenerativeModel({ 
      model: MODEL,
      systemInstruction: SYSTEM_PROMPTS.MENTAL_HEALTH 
    });
    const chat = model.startChat({ history: history || [] });
    const result = await chat.sendMessage(message);
    res.json({ text: result.response.text() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Debug: list models available from the Generative Language API
export const listModels = async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ message: 'GEMINI_API_KEY not configured' });

    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json(data);
    return res.json(data);
  } catch (error) {
    console.error('List models error:', error);
    return res.status(500).json({ message: error.message });
  }
};
