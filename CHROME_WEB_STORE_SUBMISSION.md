# Chrome Web Store Submission Guide

This document provides instructions for submitting Instagram Downloader to the Chrome Web Store.

## Pre-Submission Checklist

- ✅ Manifest.json is valid and complete
- ✅ All permissions are justified
- ✅ Privacy Policy is provided
- ✅ Icons are at required sizes (16x16, 48x48, 128x128)
- ✅ No malware, tracking, or prohibited content
- ✅ Complies with Chrome Web Store policies
- ✅ Code is clean and well-documented
- ✅ Extension has been tested locally

## Files Required for Submission

```
insta-download/
├── manifest.json              ✅ Extension configuration
├── popup.html                 ✅ Popup UI
├── popup.js                   ✅ Popup functionality
├── popup.css                  ✅ Popup styling
├── contentScript.js           ✅ Page content detection
├── background.js              ✅ Download management
├── icons/
│   ├── icon16.png            ✅ Toolbar icon
│   ├── icon48.png            ✅ Extension details
│   ├── icon128.png           ✅ Installation dialog
│   └── logo.png              ✅ Popup header
├── PRIVACY_POLICY.md         ✅ Privacy disclosure
└── README.md                 ✅ User documentation
```

## Icon Requirements

| Size | Usage | Status |
|------|-------|--------|
| 16×16 | Toolbar icon | ✅ Generated |
| 48×48 | Extension details | ✅ Generated |
| 128×128 | Chrome Web Store | ✅ Generated |

All icons should be PNG format with transparent backgrounds.

## Step-by-Step Submission Process

### 1. Register as a Chrome Web Store Developer
- Go to: https://chrome.google.com/webstore/devconsole
- Sign in with your Google account
- Accept the Developer Agreement
- Pay the one-time $5 registration fee

### 2. Prepare Store Listing
- **Display Name:** Instagram Downloader - Photos, Videos & Stories
- **Short Description:** Download Instagram photos, videos, reels, stories with one click
- **Detailed Description:**
  ```
  Download photos, videos, reels, stories, and highlights from Instagram 
  with one click. Privacy-first extension - 100% local processing, no tracking.
  
  Features:
  • Download single photos and videos
  • Download reels and TV content
  • Download stories and highlights
  • Batch download as ZIP
  • Selection mode for multiple items
  • Dark mode support
  • Fast and lightweight
  • 100% private - no data collection
  
  Permissions used only to:
  • Detect media on Instagram pages
  • Save downloads to your device
  • Remember your preferences
  ```

### 3. Category & Language
- **Category:** Productivity
- **Language:** English
- **Target Regions:** Worldwide

### 4. Content Rating
- Set appropriate content rating (likely General/Everyone)

### 5. Privacy
- Link to PRIVACY_POLICY.md
- Confirm single-purpose tool declaration
- Confirm no tracking or data collection

### 6. Upload Extension Package

Create a .zip file of your extension:
```bash
# From your project directory:
zip -r insta-download.zip \
  --exclude "*.git*" \
  --exclude "*.github*" \
  --exclude "*.md" \
  --exclude "*node_modules*" \
  .
```

Upload `insta-download.zip` to the store.

### 7. Store Listing Details

#### Screenshot 1 (1280×800):
- Show popup UI with main download button
- Caption: "One-click download of Instagram media"

#### Screenshot 2 (1280×800):
- Show Quick Access buttons
- Caption: "Download stories, reels, or posts separately"

#### Screenshot 3 (1280×800):
- Show settings and features
- Caption: "Batch download as ZIP with quality preferences"

#### Promotional Image (1400×560):
- Show logo with tagline "Download Instagram Photos, Videos & Stories"
- Highlight "100% Private" and "No Tracking"

#### Small Tile Image (440×280):
- Extension logo on gradient background
- Text: "Instagram Downloader"

### 8. Submission Review

After uploading:
1. Chrome Web Store team reviews your extension (usually 24-72 hours)
2. Look for approval email or rejection reasons
3. Common rejection reasons and fixes:

| Issue | Fix |
|-------|-----|
| Misleading name | Ensure name clearly describes function |
| Excessive permissions | Justify each permission |
| Privacy concerns | Provide clear Privacy Policy |
| Keyword stuffing | Use natural description |
| Trademark issues | Don't use Instagram's trademarked material |

### 9. Post-Submission

After approval:
- Extension appears in Chrome Web Store
- Users can install via store
- You can update extension anytime
- Publish release notes with each update

## Updates & Version Management

To update your extension:

1. Increment version in manifest.json
   ```json
   "version": "1.2.0"
   ```

2. Update CHANGELOG.md with changes

3. Upload new .zip file to store

4. Add release notes describing changes

## Policy Compliance

### ✅ Do's
- ✅ Use extension for personal Instagram downloads
- ✅ Provide clear documentation
- ✅ Respect user privacy
- ✅ Keep permissions minimal
- ✅ Be transparent about functionality

### ❌ Don'ts
- ❌ Don't collect user data
- ❌ Don't use deceptive marketing
- ❌ Don't include ads or affiliate links
- ❌ Don't modify Instagram's interface maliciously
- ❌ Don't violate Instagram's terms for automation

## Compliance Declaration

This extension:
1. **Does NOT:**
   - Collect personal information
   - Track user activity
   - Send data to external servers
   - Include ads or affiliate content
   - Modify Instagram's UI except for utility purposes

2. **Does:**
   - Process all data locally
   - Store preferences locally only
   - Respect user privacy
   - Provide clear functionality
   - Allow easy uninstallation

## Support & Maintenance

After launch:
- Monitor Chrome Web Store reviews
- Fix reported bugs promptly
- Respond to user feedback
- Keep extension updated with Instagram changes
- Test with latest Chrome versions

## Resources

- [Chrome Web Store Policies](https://support.google.com/chrome_webstore/answer/1047534)
- [Extension Development Docs](https://developer.chrome.com/docs/extensions/)
- [Privacy Policy Best Practices](https://support.google.com/chrome_webstore/answer/10161980)
- [Manifest V3 Guide](https://developer.chrome.com/docs/extensions/mv3/)

## Contact Support

If your extension is rejected:
1. Read the rejection reason carefully
2. Make required changes
3. Resubmit for review
4. Contact Chrome Web Store support if confused

---

**Ready to submit? Follow this guide step-by-step for smooth approval!** 🚀
