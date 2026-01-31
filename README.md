# Instagram Downloader - Chrome Extension

A powerful, privacy-first Chrome extension that allows you to download photos, videos, reels, stories, and highlights from Instagram with a single click.

## 🚀 Features

- **📸 Download Posts & Reels** - Download single or multiple media from Instagram posts and reels
- **📹 High-Quality Videos** - Save videos and reels in their best quality
- **📖 Stories & Highlights** - Access and download Instagram stories and highlights
- **📦 Batch Downloading** - Select multiple items and download as a ZIP file
- **⌨️ Keyboard Shortcuts** - Use `D` to download and `S` for selection mode
- **🎯 Selection Mode** - Click to select specific media, then batch download
- **🌙 Dark Mode Support** - Comfortable viewing in dark environments
- **🔒 100% Private** - All processing happens locally, no data sent to external servers
- **⚡ Lightning Fast** - Instant media detection and downloading
- **🎨 Modern UI** - Instagram-inspired interface with smooth animations

## 📋 Requirements

- Chrome/Edge 88+ (Manifest V3)
- Instagram account (for accessing content)
- PNG icon files (16x16, 48x48, 128x128)

## 📁 Project Structure

```
instagram-downloader/
├── manifest.json          # Extension configuration
├── popup.html            # Popup UI
├── popup.css             # Popup styling
├── popup.js              # Popup functionality
├── contentScript.js      # DOM parsing and media detection
├── background.js         # Download handling and background tasks
└── icons/
    ├── icon16.png        # Small icon
    ├── icon48.png        # Medium icon
    └── icon128.png       # Large icon
```

## 🔧 Installation

### For Development:

1. **Prepare Icons** (Required):
   - Create 3 PNG image files:
     - `icons/icon16.png` (16x16 pixels)
     - `icons/icon48.png` (48x48 pixels)
     - `icons/icon128.png` (128x128 pixels)
   - You can use online tools or design software to create simple Instagram-themed icons

2. **Load Extension in Chrome**:
   - Open `chrome://extensions/` in your browser
   - Enable "Developer mode" (top right corner)
   - Click "Load unpacked"
   - Select the `instagram-downloader` folder
   - The extension should now appear in your extensions list

3. **Verify Installation**:
   - Visit `https://www.instagram.com`
   - You should see the extension icon in the toolbar
   - Click it to see the popup interface

## 🎯 Usage Guide

### Basic Download:
1. Open an Instagram post, reel, or story
2. Click the extension icon
3. Click "Download Media"
4. Media will be saved to your Downloads folder in an `instagram/` subfolder

### Selection Mode:
1. Click the extension icon
2. Click "Select Mode"
3. Click on individual media items to select them (they'll highlight in green)
4. Click the primary download button to download all selected items

### Batch Download as ZIP:
1. Open a page with multiple posts/reels
2. Click the extension icon
3. Click "Download as ZIP"
4. A ZIP file with all media will be created and downloaded

### Keyboard Shortcuts:
- **D** - Download media from current page
- **S** - Toggle selection mode on/off

## 🔐 Privacy & Security

✅ **100% Local Processing**
- All media detection happens in your browser
- No data is sent to external servers
- No analytics or tracking
- No cookies or authentication tokens stored

✅ **Open Source**
- Code is transparent and auditable
- Free to modify and distribute
- No hidden functionality

⚠️ **Important Notes**
- Respect Instagram's Terms of Service
- Download only content you have permission to download
- Instagram actively changes its website, which may require extension updates
- This extension only accesses media already loaded in your browser

## 🛠️ How It Works

### Content Script (`contentScript.js`)
- Scans the DOM for Instagram media URLs
- Detects images and videos in `<img>`, `<video>`, and `<picture>` elements
- Intercepts network requests for story detection
- Manages selection mode and highlighting
- Communicates media URLs to the popup

### Background Service Worker (`background.js`)
- Handles download commands
- Manages file naming and organization
- Supports ZIP file creation (if JSZip library is added)
- Stores user preferences

### Popup UI (`popup.html`, `popup.css`, `popup.js`)
- Provides intuitive interface
- Shows extension status
- Displays keyboard shortcuts
- Manages settings (enable/disable, dark mode, auto-download)
- Shows real-time status messages

## 🚨 Limitations & Considerations

### Instagram Stories
- Stories are stored on Instagram's servers with restricted access
- The extension can only download stories currently displayed in your browser
- Stories may have DRM or access restrictions

### Video Quality
- Download quality depends on what Instagram loads in your browser
- High-quality versions may require scrolling/loading
- Instagram serves different resolutions based on connection speed

### Updates Required
- Instagram frequently updates its website structure
- This may cause the extension to break periodically
- Updates to the extension code will be needed to fix compatibility issues

### Rate Limiting
- Instagram may rate-limit downloads if you download too much content too quickly
- Space your downloads if you're batch downloading large amounts

## 🛠️ Development

### Adding JSZip for ZIP Downloads:
To enable ZIP functionality, add JSZip library to popup.html:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
```

### Testing:
1. Load the extension in Chrome
2. Open Instagram in a new tab
3. Use the popup interface to test features
4. Check browser console (DevTools) for debug logs
5. Look for `[Instagram Downloader]` messages

### Debugging:
- **Content Script Issues**: Check the page console on Instagram
- **Background Issues**: Open `chrome://extensions/`, find the extension, click "Service Worker"
- **Popup Issues**: Right-click extension icon → "Inspect popup"

## 📦 Building for Chrome Web Store (Future)

When ready to publish:

1. Prepare store assets:
   - Detailed description (already provided in this README)
   - Screenshot images (1280x800)
   - Promo image (440x280)

2. Create compressed package:
   - ZIP all files (excluding .git, node_modules, etc.)

3. Upload to Chrome Web Store:
   - Add manifest details
   - Submit for review
   - Instagram ToS review may take time

## ⚠️ Legal & Compliance Notes

- **Instagram Terms of Service**: Review Instagram's ToS before distribution
- **DMCA Compliance**: Ensure compliance with DMCA anti-circumvention provisions
- **Copyright**: Users are responsible for respecting content creators' rights
- **User Agreement**: Consider adding a user agreement for distribution

## 🤝 Contributing

This is an open-source project. To contribute:
1. Fork/modify the code
2. Test thoroughly on different Instagram pages
3. Document any changes
4. Maintain privacy-first principles

## 🐛 Known Issues & Workarounds

| Issue | Solution |
|-------|----------|
| No media detected | Refresh the Instagram page and try again |
| Downloads fail | Check your Downloads folder permissions |
| Stories don't download | Open the story in your browser first, then use the extension |
| Selection mode not working | Refresh the page and reload the extension |
| ZIP file too large | Download in smaller batches |

## 📞 Support

- Check this README for common solutions
- Review browser console for error messages
- Ensure Instagram page is fully loaded before downloading
- Try refreshing the Instagram page if extension stops working

## 📝 Changelog

### Version 1.0.0 (Initial Release)
- Basic post and reel downloading
- Selection mode for batch downloads
- Keyboard shortcuts
- Dark mode support
- Privacy-first architecture
- Modern UI with Instagram-inspired design

## 📄 License

This extension is provided as-is for educational and personal use. Users are responsible for compliance with Instagram's Terms of Service and applicable copyright laws.

---

**Remember**: Always respect content creators' rights and Instagram's Terms of Service when using this extension. Download only content you have permission to access.
