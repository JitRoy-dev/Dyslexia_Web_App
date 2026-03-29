/**
 * Gemini AI Chat Service
 *
 * Provides conversational capabilities using a language model.
 * The chatbot is specialized in dyslexia-related topics and knowledge about
 * the DyslexiaScan project.
 */

import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const SYSTEM_INSTRUCTION = `You are DysBot, a helpful assistant for DyslexiaScan - a web app that uses deep learning to detect dyslexia indicators from handwriting images. Answer questions about dyslexia (signs, causes, support strategies) and about this tool (it analyzes handwriting using a deep learning model, gives a Dyslexic/Non-Dyslexic prediction with a confidence score, privacy-first). Be warm, concise, use bullet points. Always clarify this tool is a screening aid, not a medical diagnosis - recommend professional assessment. Stay on-topic. Use markdown for formatting.`;

let ai = null;
let chat = null;

/**
 * Lazily initialize the GoogleGenAI client
 */
function getClient() {
  if (!ai) {
    if (!API_KEY || API_KEY === 'your_gemini_api_key_here') {
      throw new Error('GEMINI_API_KEY_MISSING');
    }
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
  return ai;
}

/**
 * Start or retrieve the current chat session
 */
function getChat() {
  if (!chat) {
    const client = getClient();
    chat = client.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    });
  }
  return chat;
}

/**
 * Send a message to the Gemini chatbot and get a response
 *
 * @param {string} userMessage - The user's message
 * @returns {Promise<string>} The bot's response text
 */
export async function sendMessage(userMessage) {
  try {
    const chatSession = getChat();
    const response = await chatSession.sendMessage({
      message: userMessage,
    });
    return response.text;
  } catch (error) {
    console.error('Gemini API error:', error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));

    if (error.message === 'GEMINI_API_KEY_MISSING') {
      throw new Error('API key not configured. Please add your Gemini API key to the .env file.');
    }

    const errorStr = String(error.message || error).toLowerCase();

    if (errorStr.includes('api_key_invalid') || errorStr.includes('api key not valid')) {
      throw new Error('Invalid API key. Please check your Gemini API key in the .env file.');
    }

    if (errorStr.includes('quota') || errorStr.includes('rate limit') || errorStr.includes('resource_exhausted')) {
      throw new Error('API quota exceeded. Please try again in a minute.');
    }

    if (errorStr.includes('permission') || errorStr.includes('forbidden')) {
      throw new Error('API key does not have permission. Please check your Gemini API key.');
    }

    throw new Error(`Something went wrong: ${error.message || 'Unknown error'}. Please try again.`);
  }
}

/**
 * Reset the chat session (clears conversation history)
 */
export function resetChat() {
  chat = null;
}
