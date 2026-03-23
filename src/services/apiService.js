/**
 * API Service for Dyslexia Detection
 * 
 * Handles communication with the FastAPI backend hosted on Hugging Face Spaces
 */

const BASE_URL = 'https://dibakarb-dyslexia-backend.hf.space';
const TIMEOUT = 60000; // 60 seconds to accommodate cold starts
const COLD_START_THRESHOLD = 5000; // 5 seconds

/**
 * Custom error classes for better error handling
 */
export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class ServerError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
  }
}

export class ClientError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'ClientError';
    this.statusCode = statusCode;
  }
}

export class InvalidResponseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidResponseError';
  }
}

/**
 * Sends an image to the backend API for dyslexia prediction
 * 
 * @param {File} imageFile - The image file to analyze
 * @param {Function} onColdStart - Optional callback triggered after 5 seconds if no response
 * @returns {Promise<Object>} Prediction result with label and confidence
 */
export async function predictDyslexia(imageFile, onColdStart = null) {
  let coldStartTimer = null;
  let requestCompleted = false;

  try {
    // Start cold start detection timer
    if (onColdStart) {
      coldStartTimer = setTimeout(() => {
        if (!requestCompleted) {
          onColdStart();
        }
      }, COLD_START_THRESHOLD);
    }

    // Create FormData with the image file
    const formData = new FormData();
    formData.append('file', imageFile, 'handwriting.jpg');

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    // Send request
    const response = await fetch(`${BASE_URL}/predict/`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    requestCompleted = true;
    if (coldStartTimer) clearTimeout(coldStartTimer);

    // Handle HTTP status codes
    if (response.status >= 500) {
      throw new ServerError(
        `Server error: ${response.status}`,
        response.status
      );
    } else if (response.status >= 400) {
      throw new ClientError(
        `Client error: ${response.status}`,
        response.status
      );
    } else if (response.status !== 200) {
      throw new InvalidResponseError(
        `Unexpected status code: ${response.status}`
      );
    }

    // Parse JSON response
    try {
      const jsonResponse = await response.json();
      
      // Validate response structure
      if (
        typeof jsonResponse.prediction !== 'number' ||
        typeof jsonResponse.label !== 'string' ||
        typeof jsonResponse.confidence !== 'number'
      ) {
        throw new InvalidResponseError('Invalid response structure');
      }

      return {
        prediction: jsonResponse.prediction,
        label: jsonResponse.label,
        confidence: jsonResponse.confidence,
        hasDyslexia: jsonResponse.label === 'Dyslexic',
      };
    } catch (e) {
      if (e instanceof InvalidResponseError) throw e;
      throw new InvalidResponseError(`Failed to parse response: ${e.message}`);
    }
  } catch (error) {
    requestCompleted = true;
    if (coldStartTimer) clearTimeout(coldStartTimer);

    // Handle abort/timeout
    if (error.name === 'AbortError') {
      throw new TimeoutError(`Request timed out after ${TIMEOUT / 1000} seconds`);
    }

    // Handle network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('No internet connection or server unreachable');
    }

    // Re-throw custom errors
    throw error;
  }
}
