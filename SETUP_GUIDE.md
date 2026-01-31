# 🚀 Quick Start Guide - Instagram Downloader

## Step 1: Create Icon Files (Required)

You need to create 3 PNG icon files. Here's how:

### Option A: Using Online Icon Maker
1. Go to [favicon-generator.org](https://www.favicon-generator.org/) or similar tool
2. Upload or create an Instagram-inspired image (camera icon, gradient, etc.)
3. Download as PNG in these sizes:
   - 16x16 pixels → save as `icons/icon16.png`
   - 48x48 pixels → save as `icons/icon48.png`
   - 128x128 pixels → save as `icons/icon128.png`

### Option B: Using Graphics Software
- Use Photoshop, GIMP, or Figma to create simple icons
- Export each as PNG with the correct dimensions
- Place in the `icons/` folder

### Option C: Quick Placeholder (for testing)
For quick testing without real icons:
1. Save a small image (any format) in each size requirement
2. Chrome will display it as a placeholder
3. Replace with proper icons before Chrome Web Store submission

## Step 2: Load Extension in Chrome

1. **Open Chrome Extensions Page**:
   - Type `chrome://extensions/` in your address bar
   - Press Enter

2. **Enable Developer Mode**:
   - Look for "Developer mode" toggle in the top-right corner
   - Click it to enable (it should turn blue)

3. **Load Unpacked Extension**:
   - Click the "Load unpacked" button that appears
   - Navigate to and select your `instagram-downloader` folder
   - Click "Select Folder"

4. **Verify Installation**:
   - You should see "Instagram Downloader" in your extensions list
   - The extension icon should appear in your Chrome toolbar

## Step 3: Test the Extension

### Test on Instagram:
1. Go to [instagram.com](https://www.instagram.com)
2. Log into your Instagram account
3. Open any post, reel, or story
4. Click the extension icon in the toolbar
5. You should see the popup interface

### Test Download Feature:
1. Click "Download Media" button in the popup
2. You'll see a status message like "Found X media item(s)"
3. Check your Downloads folder
4. Look for `instagram/` subfolder with downloaded files

### Test Keyboard Shortcuts:
1. On an Instagram post/reel, press `D`
   - Should download media from the page
2. Press `S` 
   - Should activate selection mode (media will highlight)

## Step 4: Configure Settings

In the popup, you can:
- **Toggle Extension On/Off**: Disable without unloading
- **Enable Dark Mode**: Comfortable for low-light browsing
- **Auto-Download High Quality**: Automatically select best quality

## ⚠️ Troubleshooting

### Extension Icon Not Showing
- **Solution**: Right-click any extension icon → "Manage extensions" → search for Instagram Downloader
- Pin it to the toolbar for quick access

### Content Script Not Loaded
- **Error**: "Content script not loaded"
- **Solution**: 
  1. Refresh the Instagram page (F5)
  2. Wait for page to fully load
  3. Try again

### No Media Detected
- **Causes**: 
  - Page not fully loaded
  - Media is in an iframe (rare)
  - Instagram page structure changed
- **Solutions**:
  1. Scroll the page to load more media
  2. Wait 2-3 seconds for lazy-loaded content
  3. Try a different Instagram page

### Downloads Not Starting
- **Check**:
  - Is your Downloads folder accessible?
  - Do you have permission to write to the folder?
  - Is Chrome's download settings correct?
- **Solution**: 
  - Try saving to a different location
  - Check Chrome settings: Menu → Settings → Downloads

### Extension Suddenly Stops Working
- **Cause**: Instagram likely changed their website structure
- **Solution**: 
  1. Check if an update is needed
  2. Contact support with details
  3. Consider filing an issue on GitHub

## 🎯 Common Tasks

### Download a Single Post
1. Open the post on Instagram
2. Click extension icon
3. Click "Download Media"
4. Done! File saved to Downloads/instagram/

### Download Multiple Items from a Page
1. Scroll the Instagram page to load all items
2. Click extension icon
3. Click "Select Mode"
4. Click each media item to highlight it (turns green)
5. Click "Download Media" button
6. All selected items download

### Create a ZIP of All Content
1. Open a page with multiple posts
2. Click extension icon
3. Click "Download as ZIP"
4. A single ZIP file downloads containing all media

### Monitor Downloads
- Check Status Messages (in the popup, shown for 4 seconds)
- Watch Chrome's download bar at bottom of browser
- Check Downloads folder (Ctrl+Shift+J or Cmd+Shift+J)

## 🔄 Updating the Extension

### For New Versions:
1. Download the latest version
2. Open `chrome://extensions/`
3. Click the trash icon to remove old version
4. Follow "Step 2: Load Extension in Chrome" again

### Automatic Reloading (Dev Mode):
- Changes to files are NOT automatically reloaded
- You must click the refresh icon on the extension's card at `chrome://extensions/`
- Or press `Ctrl+R` when focused on the extension page

## 📊 Performance Tips

- **Large Batches**: Download in batches of 5-10 items for best results
- **Connection Speed**: Faster internet = faster downloads
- **Lazy Loading**: Scroll pages to pre-load media before selecting
- **Clear Cache**: Periodically clear browser cache if having issues

## 🔒 Privacy Checklist

✅ Confirm that:
- All processing happens in your browser
- No downloads send data to external servers
- Chrome's download history is your only record
- No accounts or login info is stored
- Extension only accesses what's displayed on page

## 📞 Getting Help

### Check These First:
1. Is the page fully loaded? (Wait 2-3 seconds)
2. Is there media on the page? (Not every page has downloadable content)
3. Are you on instagram.com? (Not other sites)
4. Did you install icons? (Without icons, extension won't load properly)

### If Still Stuck:
1. Open DevTools (F12) on Instagram page
2. Go to Console tab
3. Look for error messages starting with `[Instagram Downloader]`
4. Check the README.md for known issues
5. Try the issue with a different Instagram page

## 🎉 You're All Set!

Your Instagram Downloader extension is now ready to use. Start downloading your favorite Instagram content locally!

### Next Steps:
- Bookmark instagram.com for quick access
- Familiarize yourself with keyboard shortcuts (D and S)
- Customize settings to your preference
- Share feedback if you have suggestions

---

**Happy downloading!** 📸📹
