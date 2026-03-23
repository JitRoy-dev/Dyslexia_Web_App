# Dyslexia Detection Web App

A fully responsive React web application for detecting dyslexia from handwriting samples using AI-powered analysis.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Image Preprocessing](#image-preprocessing)
- [Components](#components)
- [Testing](#testing)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- ✅ **Real API Integration** - Connected to Hugging Face Spaces backend
- ✅ **Cloudinary Image Processing** - Server-side transformations with automatic fallback
- ✅ **Smart Image Preprocessing** - Automatic background detection and color inversion
- ✅ **Cold Start Detection** - Handles serverless backend startup gracefully
- ✅ **Comprehensive Error Handling** - Network, timeout, and server errors
- ✅ **Fully Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Component-Based Architecture** - Modular and maintainable code
- ✅ **CSS Modules** - Scoped styling without conflicts

## 📁 Project Structure

```
dyslexia_app/
├── src/
│   ├── components/
│   │   ├── icons/              # SVG icon components
│   │   │   ├── AlertIcon.jsx
│   │   │   ├── BrainIcon.jsx
│   │   │   ├── CheckIcon.jsx
│   │   │   └── UploadIcon.jsx
│   │   ├── AnalysisResult.jsx  # Results display
│   │   ├── AnalyzeButton.jsx   # Analysis trigger button
│   │   ├── Features.jsx        # Feature cards grid
│   │   ├── Header.jsx          # App header
│   │   ├── Hero.jsx            # Hero section
│   │   ├── PreprocessingInfo.jsx # Info card
│   │   ├── UploadZone.jsx      # File upload area
│   │   └── *.module.css        # Component styles
│   ├── services/
│   │   ├── apiService.js       # API integration ⭐
│   │   └── cloudinaryService.js # Cloudinary integration ⭐
│   ├── utils/
│   │   ├── apiTest.js          # Testing utilities
│   │   └── imagePreprocessor.js # Local image preprocessing
│   ├── App.jsx                 # Main app component
│   ├── App.css                 # Global app styles
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── package.json
└── README.md
```

## 🔌 API Integration

### Endpoint

```
POST https://dibakarb-dyslexia-backend.hf.space/predict/
```

### Request Format

- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: Image file with field name `file`

### Response Format

```json
{
  "prediction": 0,
  "label": "Non-Dyslexic",
  "confidence": 0.95
}
```

**Fields:**
- `prediction`: Integer (0 = Non-Dyslexic, 1 = Dyslexic)
- `label`: String ("Non-Dyslexic" or "Dyslexic")
- `confidence`: Float (0.0 to 1.0)

### Error Handling

The app handles various error scenarios:

| Error Type | User Message |
|-----------|--------------|
| NetworkError | "No internet connection. Please check your network and try again." |
| TimeoutError | "Request timed out. The server might be starting up. Please try again." |
| ServerError | "Server error. Please try again later." |
| Generic | "An unexpected error occurred. Please try again." |

### Cold Start Detection

Serverless backends may take 10-30 seconds on first request:
- Blue notification appears after 5 seconds
- Button text changes to "Starting server..."
- Helps manage user expectations

## 🖼️ Image Preprocessing

### Two Processing Methods

The app supports two preprocessing methods:

1. **Cloudinary API** (Recommended) - Server-side processing
2. **Local Processing** (Fallback) - Browser-based processing

### Cloudinary Setup (Optional)

For better performance and quality, configure Cloudinary:

1. Create free account at [Cloudinary](https://cloudinary.com/)
2. Get your Cloud Name and create an Upload Preset
3. Copy `.env.example` to `.env`
4. Add your credentials:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=your-preset
   ```
5. Restart dev server

See [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) for detailed instructions.

### Why Preprocessing?

The model was trained on images with:
- **Black background**
- **White handwriting/text**
- **Grayscale format**

Most user images have white backgrounds and may be in color, so we need to process them.

### Smart Background Detection

The app intelligently detects if inversion is needed:

```javascript
function hasBlackBackground(imageData) {
  // 1. Sample ~84 pixels from image edges
  // 2. Calculate average brightness (0-255)
  // 3. Return true if average < 128 (dark)
}
```

### Processing Flow

**With Cloudinary:**
```
Upload → Cloudinary API → Grayscale + Invert → Download → API
```

**Without Cloudinary (Fallback):**
```
Upload → Browser Processing → Grayscale + Invert → API
```

### Cloudinary Transformations

**For White Background:**
```
e_grayscale,e_negate,q_auto,f_auto
```

**For Black Background:**
```
e_grayscale,q_auto,f_auto
```

### Benefits of Cloudinary

✅ Server-side processing (faster)  
✅ Better image quality  
✅ Automatic optimization  
✅ CDN delivery  
✅ Works on low-end devices  
✅ Automatic fallback to local if unavailable

### User Feedback

**When Inverted:**
- Shows side-by-side comparison (original vs processed)

**When NOT Inverted:**
- Shows green message: "✓ Image already has black background - no inversion needed"

## 🎨 Components

### Header
- App branding and status indicator
- Responsive layout with flex wrapping

### Hero
- Main title and description
- Gradient text effect
- Responsive typography using `clamp()`

### PreprocessingInfo
- Explains smart preprocessing to users
- Collapsible info card

### UploadZone
- Drag and drop file upload
- Image preview
- File type validation (PNG, JPG, JPEG)

### AnalyzeButton
- Triggers AI analysis
- Loading state with spinner
- Disabled during processing

### AnalysisResult
- Displays detection results
- Confidence score visualization
- Analysis markers
- Disclaimer for positive results

### Features
- Grid of feature cards
- Responsive layout (1-4 columns)
- Hover effects

## 🧪 Testing

### Console Testing

Open browser console and run:

```javascript
// Test API connectivity
await window.testApiConnection()

// Run full API test with test image
await window.testApi()
```

### Manual Testing Checklist

- [ ] App loads without errors
- [ ] Can upload image files
- [ ] Image preprocessing works correctly
- [ ] Preview comparison shows (if inverted)
- [ ] "Already black background" message shows (if not inverted)
- [ ] Analyze button appears after upload
- [ ] Loading state shows during analysis
- [ ] Cold start message appears (first request)
- [ ] Results display correctly
- [ ] Can analyze another sample
- [ ] Error messages display properly
- [ ] Responsive on mobile (< 640px)
- [ ] Responsive on tablet (641-1024px)
- [ ] Responsive on desktop (> 1024px)

### Test Images

1. **White background, black text** → Converts to grayscale → Inverts → Black BG, white text ✅
2. **Black background, white text** → Converts to grayscale → No invert → Black BG, white text ✅
3. **Colored image** → Converts to grayscale → Inverts if light BG → Black BG, white text ✅
4. **Gray background** → Depends on brightness (< 128 = no invert, ≥ 128 = invert)

## 📱 Responsive Design

### Breakpoints

- **Mobile**: < 640px
- **Tablet**: 641px - 1024px
- **Desktop**: > 1024px

### Techniques Used

- CSS `clamp()` for fluid typography
- Flexbox and Grid for layouts
- CSS Modules for scoped styles
- Mobile-first approach

### Example

```css
font-size: clamp(14px, 2.5vw, 16px);
/* Mobile: 14px, scales with viewport, max 16px on desktop */
```

## 🚢 Deployment

### Build

```bash
npm run build
```

The `dist/` folder contains the production build.

### Deploy To

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **Any static hosting**: Upload `dist/` folder

### Environment Variables (Optional)

Create `.env` file:

```env
# Cloudinary (for image preprocessing)
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset

# API Configuration
VITE_API_BASE_URL=https://dibakarb-dyslexia-backend.hf.space
VITE_API_TIMEOUT=60000
```

Update `apiService.js` and `cloudinaryService.js` to use these variables.

## 🐛 Troubleshooting

### Issue: "No internet connection"

**Causes:**
- No network connectivity
- Backend URL incorrect
- CORS errors

**Solutions:**
- Check internet connection
- Verify backend URL in `apiService.js`
- Check browser console for CORS errors

### Issue: "Request timed out"

**Causes:**
- Cold start (first request)
- Backend overloaded
- Network issues

**Solutions:**
- Wait and try again (normal on first request)
- Backend should be faster on subsequent requests
- Check backend status on Hugging Face Spaces

### Issue: Components not rendering

**Causes:**
- Missing dependencies
- Import errors
- Build errors

**Solutions:**
- Run `npm install`
- Check browser console for errors
- Clear cache and restart dev server

### Issue: Styles not applying

**Causes:**
- CSS Module import errors
- File path issues
- Build cache

**Solutions:**
- Verify CSS Module imports
- Check file paths are correct
- Restart dev server
- Clear browser cache

### Issue: Wrong preprocessing detection

**Causes:**
- Unusual background patterns
- Gradient backgrounds
- Colored backgrounds

**Solutions:**
- Adjust threshold in `imagePreprocessor.js`
- Add manual override option
- Convert to grayscale first

## 🔧 Configuration

### Change API Endpoint

Edit `src/services/apiService.js`:

```javascript
const BASE_URL = 'https://your-new-endpoint.com';
```

### Adjust Timeouts

Edit `src/services/apiService.js`:

```javascript
const TIMEOUT = 60000; // 60 seconds
const COLD_START_THRESHOLD = 5000; // 5 seconds
```

### Adjust Brightness Threshold

Edit `src/utils/imagePreprocessor.js`:

```javascript
// In hasBlackBackground function
return averageBrightness < 128; // Change 128 to your threshold
```

## 📊 Performance

### Typical Processing Times

| Image Size | Resolution | Processing Time |
|-----------|-----------|-----------------|
| Small     | 640x480   | ~50ms          |
| Medium    | 1280x720  | ~150ms         |
| Large     | 1920x1080 | ~300ms         |
| Very Large| 3840x2160 | ~800ms         |

### API Response Times

- **First request (cold start)**: 10-30 seconds
- **Subsequent requests**: 2-5 seconds

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Style

- Use functional components with hooks
- CSS Modules for component styles
- Async/await for asynchronous operations
- Descriptive variable and function names

### Adding New Components

1. Create component file: `src/components/MyComponent.jsx`
2. Create styles: `src/components/MyComponent.module.css`
3. Import and use in parent component

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Backend API hosted on Hugging Face Spaces
- Model trained on dyslexia handwriting dataset
- Built with React and Vite

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Review this README
3. Test API connectivity using console tools
4. Check backend status on Hugging Face Spaces

## 🎯 Future Enhancements

- [ ] Batch image processing
- [ ] Result history and export
- [ ] User accounts and authentication
- [ ] Advanced image preprocessing options
- [ ] Real-time analysis progress
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] PWA support for offline use

---

**Built with ❤️ for better dyslexia detection**
