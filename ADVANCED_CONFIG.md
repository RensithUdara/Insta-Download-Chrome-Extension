# 🔧 Advanced Configuration Guide

This guide covers advanced customization options for the Instagram Downloader extension.

## 📋 Configuration Options

### 1. Modify Keyboard Shortcuts

Edit `manifest.json` to change keyboard shortcuts:

```json
"commands": {
  "download-media": {
    "suggested_key": {
      "default": "D",
      "mac": "Command+D",
      "linux": "Ctrl+D",
      "windows": "Ctrl+D"
    },
    "description": "Download current media"
  },
  "toggle-select": {
    "suggested_key": {
      "default": "S",
      "mac": "Command+S"
    },
    "description": "Toggle selection mode"
  }
}
```

**Available Keys**:
- Single letters: A-Z, 0-9
- Ctrl+X (any modifier + key)
- Cmd+X (Mac only)
- Alt+X, Shift+X

### 2. Customize Download Folder

In `background.js`, modify the download path:

```javascript
// Current: instagram/
// Change to:
filename: `my-instagram-downloads/media_${Date.now()}_${index}`
```

### 3. Adjust File Naming Pattern

In `background.js`, function `getFilename()`:

```javascript
// Current pattern: instagram_[timestamp]_[index]
// Examples of custom patterns:
return `instagram_${new Date().toISOString().split('T')[0]}_${index}${extension}`;
// Result: instagram_2024-01-15_0.jpg

return `insta_post_${index}${extension}`;
// Result: insta_post_0.jpg

return `media_${Date.now()}${extension}`;
// Result: media_1705330614832.jpg
```

### 4. Customize UI Colors

Edit `popup.css` to change the color scheme:

```css
:root {
  --primary-color: #E1306C;      /* Instagram pink */
  --secondary-color: #833AB4;    /* Instagram purple */
  --accent-color: #FD1D1D;       /* Instagram red */
  --bg-light: #FAFAFA;           /* Light background */
  --bg-dark: #121212;            /* Dark background */
  --text-light: #262626;         /* Light text */
  --text-dark: #FFFFFF;          /* Dark text */
  --border-color: #DBDBDB;       /* Border color */
  --success: #31A24C;            /* Success green */
  --warning: #F99500;            /* Warning orange */
}
```

**Example: Change primary color to blue**:
```css
--primary-color: #1E90FF;
```

### 5. Add ZIP Download Support

Uncomment this line in `popup.html` to enable ZIP downloads:

```html
<!-- Add before closing </body> tag -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
```

### 6. Custom Status Messages

Edit `popup.js` to customize status messages:

```javascript
// Change these messages:
showStatus('🔄 Detecting media...', 'info');
showStatus('❌ No media found on this page', 'error');
showStatus(`✅ Found ${count} media item(s). Downloading...`, 'success');

// To your preferred messages
showStatus('🔍 Scanning page...', 'info');
showStatus('⚠️ No downloadable content found', 'error');
showStatus(`✨ ${count} items ready!`, 'success');
```

### 7. Modify Permissions

In `manifest.json`, adjust permissions based on needs:

```json
"permissions": [
  "downloads",              // For downloading files
  "activeTab",             // For current tab access
  "scripting",             // For content script injection
  "storage"                // For saving settings
],
"host_permissions": [
  "https://www.instagram.com/*",    // Instagram
  "https://*.cdninstagram.com/*",   // CDN
  "https://*.fbcdn.net/*"           // Facebook CDN
]
```

**To add more permissions**, add entries to these arrays.

## 🎨 Advanced Styling

### Change Popup Size

In `popup.css` or `popup.html`:

```css
html {
  width: 500px;  /* Change from 500px */
}

body {
  width: 500px;  /* Change from 500px */
}
```

### Add Custom Animations

Add to `popup.css`:

```css
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.btn {
  animation: fadeInScale 0.2s ease-out;
}
```

### Custom Button Styles

```css
.btn-custom {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 14px 24px;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
}

.btn-custom:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.6);
}
```

## 🔍 Content Script Customization

### Filter Media Types

In `contentScript.js`, modify `getMediaUrls()`:

```javascript
// Download only images
document.querySelectorAll('img').forEach(img => {
  // ... existing code
});

// Skip videos:
// Remove the video section entirely
```

### Ignore Certain URLs

```javascript
if (src.includes('instagram') && !src.includes('profile')) {
  // Skip profile images
  urls.push(src);
}
```

### Custom Media Detection

```javascript
// Add detection for new media types
document.querySelectorAll('[data-media-type="custom"]').forEach(element => {
  if (element.dataset.url) {
    urls.push(element.dataset.url);
  }
});
```

## 🛠️ Advanced Features

### Add Download History

In `background.js`:

```javascript
function saveToHistory(url, filename) {
  chrome.storage.local.get(['history'], (result) => {
    const history = result.history || [];
    history.push({
      url: url,
      filename: filename,
      timestamp: Date.now()
    });
    chrome.storage.local.set({ history: history });
  });
}
```

### Add Retry Logic

```javascript
async function downloadWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await chrome.downloads.download({
        url: url,
        filename: `instagram/media_${Date.now()}`
      });
      return true;
    } catch (e) {
      if (i === retries - 1) throw e;
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}
```

### Add Progress Tracking

```javascript
let downloadCount = 0;
let totalDownloads = 0;

function updateProgress() {
  downloadCount++;
  const percent = Math.round((downloadCount / totalDownloads) * 100);
  console.log(`Progress: ${percent}%`);
}
```

## 🔐 Security Enhancements

### Add URL Validation

```javascript
function isValidInstagramUrl(url) {
  const instagramDomains = [
    'instagram.com',
    'cdninstagram.com',
    'fbcdn.net'
  ];
  try {
    const urlObj = new URL(url);
    return instagramDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
}
```

### Add Rate Limiting

```javascript
const RateLimiter = {
  downloads: [],
  maxPerMinute: 30,
  
  canDownload() {
    const now = Date.now();
    this.downloads = this.downloads.filter(t => now - t < 60000);
    
    if (this.downloads.length >= this.maxPerMinute) {
      return false;
    }
    
    this.downloads.push(now);
    return true;
  }
};
```

## 📊 Performance Optimization

### Lazy Content Detection

```javascript
// Only scan visible area
function getVisibleMediaUrls() {
  const urls = [];
  document.querySelectorAll('img').forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      // Element is visible
      urls.push(img.src);
    }
  });
  return urls;
}
```

### Debounce Downloads

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

const debouncedDownload = debounce(downloadMedia, 500);
```

## 🧪 Testing & Debugging

### Add Debug Logging

```javascript
const DEBUG = true;

function log(...args) {
  if (DEBUG) {
    console.log('[Instagram Downloader DEBUG]', ...args);
  }
}

log('Media URLs found:', urls);
```

### Test Different Instagram Page Types

- Feed: `https://www.instagram.com/`
- Profile: `https://www.instagram.com/username/`
- Post: `https://www.instagram.com/p/POST_ID/`
- Reel: `https://www.instagram.com/reels/REEL_ID/`
- Story (browser view): Limited access

### Monitoring

```javascript
// Track download statistics
const stats = {
  totalDownloads: 0,
  successfulDownloads: 0,
  failedDownloads: 0,
  averageFileSize: 0
};

// Log stats periodically
setInterval(() => {
  console.log('Download Stats:', stats);
}, 60000);
```

## 📝 Manifest Customization

### Add Extension Icons

```json
"icons": {
  "16": "icons/icon16.png",
  "48": "icons/icon48.png",
  "128": "icons/icon128.png"
}
```

### Change Display Name

```json
"name": "My Instagram Downloader",
"short_name": "IG Downloader"
```

### Add Version Info

```json
"version": "1.0.0",
"version_name": "1.0.0 - Initial Release"
```

## 🚀 Building for Distribution

### Preparation Checklist:
- [ ] Test all features thoroughly
- [ ] Update version number in manifest.json
- [ ] Create proper icon files (16x16, 48x48, 128x128)
- [ ] Write detailed description
- [ ] Create privacy policy
- [ ] Review Terms of Service compliance

### Package for Distribution:
```bash
# Create ZIP file
zip -r instagram-downloader.zip \
  manifest.json \
  popup.html popup.css popup.js \
  contentScript.js background.js \
  icons/
  
# Exclude unnecessary files
# .git, node_modules, tests, etc.
```

## 🔄 Version Control Notes

Use `.gitignore`:
```
node_modules/
.DS_Store
*.pem
downloads/
test/
```

---

For more customization options, refer to the [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
