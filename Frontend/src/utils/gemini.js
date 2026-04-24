const API_BASE_URL = "http://localhost:5000/api/ai";

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem("userInfo"));
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${user?.token}`,
  };
};

export const createDoctorSession = (type = "symptoms") => {
  // We'll simulate a session by keeping history in the component
  return {
    sendMessage: async (message, history = []) => {
      const endpoint = type === "MENTAL_HEALTH" ? "/mental-health" : "/symptoms";
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ message, history }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Request failed");
      return { response: { text: () => data.text } };
    }
  };
};

export const detectCrisis = (text) => {
  const crisisKeywords = [
    "suicide", "kill myself", "end my life", "self harm", "hurt myself", 
    "don't want to live", "better off dead", "cutting", "overdose"
  ];
  const lowerText = text.toLowerCase();
  return crisisKeywords.some(keyword => lowerText.includes(keyword));
};

export const analyzeMedicine = async (text, file) => {
  let imageData = null;
  if (file) {
    imageData = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({
        data: reader.result.split(',')[1],
        mimeType: file.type
      });
      reader.readAsDataURL(file);
    });
  }

  const response = await fetch(`${API_BASE_URL}/medicine`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ text, image: imageData }),
  });

  const data = await response.json();
  if (!response.ok) return { error: data.message || "Failed to analyze medicine" };
  return data;
};
