import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const SYSTEM_PROMPTS = {
  SYMPTOM_CHECKER: `You are an expert Medical Doctor consulting with a patient.
1. The user will provide a body part or a symptom.
2. Ask exactly ONE concise follow-up question at a time to gather more information.
3. Do NOT provide a full diagnosis until you have asked at least 3-4 questions.
4. Once you have enough context, provide a professional, highly concise assessment with likely conditions and a clear recommendation for care.
5. Speak with a professional, clinical doctor's tone. NEVER include a disclaimer that you are an AI or not a real doctor.
6. Do NOT use markdown bolding (**) or asterisks in your responses. Keep formatting as plain, clean text.`,
  
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
      model: "gemini-2.5-pro",
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
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
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
      model: "gemini-2.5-pro",
      systemInstruction: SYSTEM_PROMPTS.MENTAL_HEALTH 
    });
    const chat = model.startChat({ history: history || [] });
    const result = await chat.sendMessage(message);
    res.json({ text: result.response.text() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
