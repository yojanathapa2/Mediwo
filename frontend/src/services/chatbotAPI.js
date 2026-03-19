// Chatbot API Service - Backend Integration Points
// Your friend can replace these mock functions with actual API calls

const API_BASE_URL = process.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const chatbotAPI = {
  // Send message to backend chatbot
  sendMessage: async (message, conversationHistory = []) => {
    try {
      // Replace this with actual backend API call
      // const response = await fetch(`${API_BASE_URL}/api/chatbot/message`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     message,
      //     conversation_history: conversationHistory,
      //     user_id: getCurrentUserId() // optional
      //   }),
      // });
      
      // if (!response.ok) throw new Error('Failed to send message');
      // return await response.json();

      // Mock response for development
      return mockBotResponse(message);
    } catch (error) {
      console.error('Chatbot API Error:', error);
      throw error;
    }
  },

  // Get conversation summary
  getSummary: async (conversationHistory) => {
    try {
      // Replace with actual backend call
      // const response = await fetch(`${API_BASE_URL}/api/chatbot/summary`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ conversation_history: conversationHistory })
      // });
      
      // return await response.json();
      
      return mockSummaryResponse(conversationHistory);
    } catch (error) {
      console.error('Summary API Error:', error);
      throw error;
    }
  },

  // Save conversation
  saveConversation: async (conversationData) => {
    try {
      // Replace with actual backend call
      // const response = await fetch(`${API_BASE_URL}/api/chatbot/save`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(conversationData)
      // });
      
      // return await response.json();
      
      return { success: true, conversation_id: Date.now() };
    } catch (error) {
      console.error('Save Conversation Error:', error);
      throw error;
    }
  }
};

// Mock functions for development - remove when connecting to real backend
const mockBotResponse = async (message) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
  
  const responses = [
    "I understand. Can you tell me more about when these symptoms started?",
    "That's helpful information. Have you experienced anything similar before?",
    "I see. On a scale of 1-10, how would you rate the severity?",
    "Thank you for sharing that. Are there any factors that make it better or worse?",
    "I'm making note of that. Have you taken any medications for this?",
    "That's important to know. Are there any other symptoms you've noticed?",
    "I understand your concern. Let me ask a few more questions to better understand your situation.",
    "Can you describe the pain or discomfort you're experiencing?",
    "Have you noticed any patterns or triggers for your symptoms?",
    "Are there any medical conditions I should be aware of?"
  ];
  
  return {
    message: responses[Math.floor(Math.random() * responses.length)],
    conversation_id: Date.now(),
    timestamp: new Date().toISOString()
  };
};

const mockSummaryResponse = async (conversationHistory) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    summary: "Patient reports experiencing symptoms for the past few days. Severity appears moderate. No previous similar episodes reported. Patient has not taken any medications. Further evaluation recommended.",
    key_points: [
      "Symptom onset: Recent (few days)",
      "Severity: Moderate", 
      "Medications: None taken",
      "Previous episodes: None"
    ],
    recommendations: ["Schedule clinical evaluation", "Monitor symptom progression"]
  };
};

// Helper function to get current user ID (implement based on your auth system)
const getCurrentUserId = () => {
  // This should integrate with your existing auth context
  // For now, return a mock ID
  return 'user_' + Date.now();
};

export default chatbotAPI;
