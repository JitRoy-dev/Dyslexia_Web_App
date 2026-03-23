# Cloudinary Setup Guide

## Why Cloudinary?

Cloudinary provides powerful image transformation APIs that can:
- Convert images to grayscale
- Invert colors (black ↔ white)
- Optimize image quality
- Handle transformations server-side (faster and more reliable)

## Setup Steps

### 1. Create Cloudinary Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

### 2. Get Your Credentials

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. Find your **Cloud Name** on the dashboard
3. Note it down (e.g., `dxyz123abc`)

### 3. Create Upload Preset

1. Go to **Settings** > **Upload** > **Upload presets**
2. Click **Add upload preset**
3. Configure:
   - **Preset name**: `dyslexia_app` (or any name you prefer)
   - **Signing mode**: Select **Unsigned** (for client-side uploads)
   - **Folder**: (optional) `dyslexia-uploads`
   - **Auto-tagging**: (optional) Add tags for organization
4. Click **Save**
5. Note the preset name

### 4. Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```env
   VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
   VITE_CLOUDINARY_UPLOAD_PRESET=dyslexia_app
   ```

3. Save the file

### 5. Restart Development Server

```bash
npm run dev
```

## How It Works

### Upload Flow

```
1. User uploads image
   ↓
2. Upload to Cloudinary
   ↓
3. Detect background color
   ↓
4. Apply transformations:
   - Grayscale conversion
   - Color inversion (if needed)
   ↓
5. Download transformed image
   ↓
6. Send to API for analysis
```

### Cloudinary Transformations

**For White Background Images:**
```
e_grayscale,e_negate,q_auto,f_auto
```
- `e_grayscale` - Convert to grayscale
- `e_negate` - Invert colors (white → black, black → white)
- `q_auto` - Auto quality optimization
- `f_auto` - Auto format selection

**For Black Background Images:**
```
e_grayscale,q_auto,f_auto
```
- Only grayscale conversion, no inversion

### Example URL

```
https://res.cloudinary.com/your-cloud-name/image/upload/e_grayscale,e_negate,q_auto,f_auto/sample-image.jpg
```

## Fallback Mechanism

The app includes automatic fallback:

1. **Try Cloudinary first** (if configured)
2. **Fallback to local preprocessing** (if Cloudinary fails)
3. **Always works** (even without Cloudinary)

### When Fallback Triggers

- Cloudinary not configured
- Upload fails (network issues)
- Transformation fails
- Download fails

## Benefits of Using Cloudinary

✅ **Server-side processing** - Faster and more reliable  
✅ **Better quality** - Professional image transformations  
✅ **Automatic optimization** - Smaller file sizes  
✅ **CDN delivery** - Fast image loading  
✅ **No client-side processing** - Better performance on low-end devices  
✅ **Consistent results** - Same output every time  

## Free Tier Limits

Cloudinary free tier includes:
- **25 credits/month** (1 credit = 1,000 transformations)
- **25 GB storage**
- **25 GB bandwidth**

This is sufficient for:
- ~25,000 image transformations per month
- Perfect for development and small-scale production

## Testing

### Check Configuration

Open browser console:
```javascript
// Check if Cloudinary is configured
console.log('Cloudinary configured:', window.isCloudinaryConfigured);
```

### Test Upload

1. Upload an image
2. Check console for messages:
   - ✅ "Using Cloudinary preprocessing" - Success
   - ⚠️ "Cloudinary failed, falling back to local" - Fallback
   - 📍 "Using local preprocessing" - Not configured

## Troubleshooting

### Issue: "Upload failed"

**Causes:**
- Invalid cloud name
- Invalid upload preset
- Upload preset not set to "unsigned"
- Network issues

**Solutions:**
- Verify cloud name in `.env`
- Check upload preset exists and is unsigned
- Check browser console for detailed error
- Test Cloudinary dashboard access

### Issue: "Transformation failed"

**Causes:**
- Invalid public ID
- Cloudinary service issues
- Network timeout

**Solutions:**
- Check browser console for error details
- Verify image uploaded successfully
- Try again (may be temporary issue)

### Issue: "CORS error"

**Causes:**
- Cloudinary CORS settings
- Browser security restrictions

**Solutions:**
- Cloudinary automatically handles CORS for image URLs
- If issues persist, check Cloudinary security settings
- Ensure using HTTPS URLs

## Security Considerations

### Unsigned Uploads

- ✅ Easy to implement
- ✅ No backend required
- ⚠️ Anyone can upload to your account
- ⚠️ Set upload limits in Cloudinary settings

### Recommendations

1. **Set upload limits** in Cloudinary dashboard
2. **Enable moderation** for uploaded images
3. **Set auto-deletion** for old images
4. **Monitor usage** regularly
5. **Use signed uploads** for production (requires backend)

## Advanced Configuration

### Custom Transformations

Edit `cloudinaryService.js`:

```javascript
const transformations = [
  'e_grayscale',
  'e_negate',
  'e_contrast:50',      // Increase contrast
  'e_sharpen:100',      // Sharpen image
  'q_auto:best',        // Best quality
  'f_auto'
].join(',');
```

### Resize Images

```javascript
const transformations = [
  'w_800,h_600,c_fit',  // Resize to 800x600
  'e_grayscale',
  'e_negate',
  'q_auto',
  'f_auto'
].join(',');
```

### Add Watermark

```javascript
const transformations = [
  'e_grayscale',
  'e_negate',
  'l_text:Arial_20:Processed',  // Add text overlay
  'g_south_east',                // Position bottom-right
  'q_auto',
  'f_auto'
].join(',');
```

## Monitoring

### Check Usage

1. Go to [Cloudinary Console](https://cloudinary.com/console)
2. View **Dashboard** for usage statistics
3. Monitor:
   - Transformations used
   - Storage used
   - Bandwidth used

### Set Alerts

1. Go to **Settings** > **Notifications**
2. Enable alerts for:
   - Usage limits
   - Quota warnings
   - Failed uploads

## Production Deployment

### Environment Variables

Set in your hosting platform:

**Vercel:**
```bash
vercel env add VITE_CLOUDINARY_CLOUD_NAME
vercel env add VITE_CLOUDINARY_UPLOAD_PRESET
```

**Netlify:**
```bash
netlify env:set VITE_CLOUDINARY_CLOUD_NAME your-cloud-name
netlify env:set VITE_CLOUDINARY_UPLOAD_PRESET your-preset
```

**GitHub Actions:**
Add to repository secrets

### Best Practices

1. Use different upload presets for dev/prod
2. Set appropriate folder structure
3. Enable auto-tagging for organization
4. Set up backup/archival policies
5. Monitor usage and costs

## Alternative: Local Preprocessing

If you prefer not to use Cloudinary:

1. Don't create `.env` file
2. App will automatically use local preprocessing
3. All processing happens in browser
4. No external dependencies
5. Works offline

## Support

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary Support](https://support.cloudinary.com/)
- [Community Forum](https://community.cloudinary.com/)

---

**Ready to use Cloudinary?** Follow the setup steps above and restart your dev server!
