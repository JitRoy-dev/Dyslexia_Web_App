# Dyslexia Detection Web App

A responsive React web application for detecting dyslexia from handwriting samples using AI-powered analysis.

## Quick Start

```bash
npm install
npm run dev
```

## Features

- AI analysis via Hugging Face Spaces backend
- Drag and drop image upload
- Cold start detection for serverless backend
- Comprehensive error handling
- Fully responsive design (mobile, tablet, desktop)
- CSS Modules for scoped styling

## Project Structure

```
src/
├── components/
│   ├── icons/              # SVG icon components
│   ├── AnalysisResult.jsx  # Results display
│   ├── AnalyzeButton.jsx   # Analysis trigger button
│   ├── Features.jsx        # Feature cards grid
│   ├── Header.jsx          # App header
│   ├── Hero.jsx            # Hero section
│   └── UploadZone.jsx      # Drag & drop upload
├── services/
│   └── apiService.js       # API integration
├── utils/
│   └── apiTest.js          # Testing utilities
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## API Integration

**Endpoint:** `POST https://dibakarb-dyslexia-backend.hf.space/predict/`

**Request:** `multipart/form-data` with image file in `file` field

**Response:**
```json
{
  "prediction": 0,
  "label": "Non-Dyslexic",
  "confidence": 0.95
}
```

### Error Handling

| Error | Message |
|-------|---------|
| NetworkError | No internet connection. Please check your network and try again. |
| TimeoutError | Request timed out. The server might be starting up. Please try again. |
| ServerError | Server error. Please try again later. |

### Cold Start

Serverless backends can take 10–30 seconds on first request. A notification appears after 5 seconds to manage expectations.

## Deployment

```bash
npm run build   # outputs to dist/
```

Deploy the `dist/` folder to Vercel, Netlify, GitHub Pages, or any static host.

## Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Troubleshooting

**"No internet connection"** — Check network or verify the backend URL in `apiService.js`.

**"Request timed out"** — Normal on first request (cold start). Wait and retry.

**Styles not applying** — Restart dev server and clear browser cache.

## License

MIT
