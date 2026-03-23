/**
 * Utility functions for testing API connectivity
 */

import { predictDyslexia } from '../services/apiService';

/**
 * Tests if the API endpoint is reachable
 * @returns {Promise<Object>} Test result with status and message
 */
export async function testApiConnection() {
  try {
    const response = await fetch('https://dibakarb-dyslexia-backend.hf.space/');
    
    if (response.ok) {
      return {
        success: true,
        message: 'API endpoint is reachable',
        status: response.status
      };
    } else {
      return {
        success: false,
        message: `API returned status ${response.status}`,
        status: response.status
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `Connection failed: ${error.message}`,
      error: error
    };
  }
}

/**
 * Creates a test image blob for API testing
 * @returns {Promise<File>} A test image file
 */
export async function createTestImage() {
  // Create a simple canvas with some text
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  
  // White background
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 256, 64);
  
  // Black text
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Test Handwriting Sample', 10, 35);
  
  // Convert to blob
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });
      resolve(file);
    }, 'image/jpeg');
  });
}

/**
 * Runs a complete API test with a test image
 * @returns {Promise<Object>} Test result
 */
export async function runFullApiTest() {
  console.log('🧪 Starting API test...');
  
  // Test 1: Check connectivity
  console.log('📡 Testing API connectivity...');
  const connectionTest = await testApiConnection();
  console.log('Connection test:', connectionTest);
  
  if (!connectionTest.success) {
    return {
      success: false,
      stage: 'connectivity',
      message: connectionTest.message
    };
  }
  
  // Test 2: Create test image
  console.log('🖼️ Creating test image...');
  const testImage = await createTestImage();
  console.log('Test image created:', testImage);
  
  // Test 3: Send prediction request
  console.log('🔬 Sending prediction request...');
  try {
    const startTime = Date.now();
    const result = await predictDyslexia(testImage, () => {
      console.log('⏳ Cold start detected...');
    });
    const duration = Date.now() - startTime;
    
    console.log('✅ Prediction successful:', result);
    console.log(`⏱️ Request took ${duration}ms`);
    
    return {
      success: true,
      result: result,
      duration: duration,
      message: 'API test completed successfully'
    };
  } catch (error) {
    console.error('❌ Prediction failed:', error);
    return {
      success: false,
      stage: 'prediction',
      message: error.message,
      error: error
    };
  }
}

// Export for console testing
if (typeof window !== 'undefined') {
  window.testApi = runFullApiTest;
  window.testApiConnection = testApiConnection;
}
