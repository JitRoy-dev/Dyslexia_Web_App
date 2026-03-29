# DyslexiaScan

A modern, responsive React web application that analyzes handwriting samples to detect indicators of dyslexia using a custom deep-learning model. It also features an integrated Google Gemini-powered smart assistant (DysBot).

## ✨ Features

- **Deep Learning Analysis**: Uses a custom-trained deep learning model served via a FastAPI backend on Hugging Face Spaces to analyze handwriting images for structural dyslexia indicators.
- **DysBot Smart Assistant**: A fully integrated, floating chatbot widget powered by Google Gemini (v2.5 Flash) that answers questions about dyslexia and the DyslexiaScan project itself.
- **Premium Glassmorphism UI**: Built with modern CSS techniques, fluid animations, and **Tailwind CSS v4** for a sleek, dark-mode-first aesthetic.
- **Robust Error Handling**: Automatically detects backend "cold starts" (serverless wake-up times) and informs users to manage expectations smoothly.
- **Privacy-First**: Images are analyzed and discarded; they are never permanently stored or shared.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Ensure you have a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://dibakarb-dyslexia-backend.hf.space
   VITE_API_TIMEOUT=60000
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   *Note: `VITE_GEMINI_API_KEY` is required for the DysBot assistant to function.*

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
src/
├── components/
│   ├── icons/              # SVG icon components
│   ├── AnalysisResult.jsx  # Results display & confidence bars
│   ├── AnalyzeButton.jsx   # Animated analysis trigger button
│   ├── Chatbot.jsx         # Gemini-powered floating assistant
│   ├── Features.jsx        # Feature capabilities grid
│   ├── Header.jsx          # Fixed active model header
│   ├── Hero.jsx            # Landing hero section
│   └── UploadZone.jsx      # Interactive drag-and-drop file upload
├── services/
│   ├── apiService.js       # Backend deep-learning API logic
│   └── geminiService.js    # Google GenAI model initialization & prompts
├── App.jsx                 # Application entry and state manager
├── index.css               # Global Tailwind injects and CSS variables
└── main.jsx                # React DOM root
```

## ⚙️ How it Works

1. **Client**: A React Single Page Application (SPA), styled purely with standard utility classes from Tailwind v4.
2. **Inference Backend API**: The image is sent to a Hugging Face Space running a FastAPI server holding the model parameters. 
   - **Endpoint**: `POST /predict/`
   - **Request Format**: `multipart/form-data` with the image in `file`.
   - **Response**: Predicts whether handwriting has dyslexia indicators alongside a confidence metric.
3. **Chatbot (DysBot)**: Summons the Gemini-driven assistant. It dynamically renders markdown responses, auto-scrolls, tracks conversation history, and handles API rate limiting elegantly.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 / Vite
- **Styling**: Tailwind CSS v4, Inter font (Google Fonts)
- **System Architecture**:
  - Image Prediction: Custom Deep Learning Model (via FastAPI)
  - Conversational Agent: Google SDK `@google/genai` (Gemini 2.0 Flash)

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build outputting to dist/
npm run preview  # Run a local web server to preview the production build
```

## 📖 License

MIT