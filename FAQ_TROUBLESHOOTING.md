# ❓ FAQ & Troubleshooting Guide

## ❓ Frequently Asked Questions

### Q: Is this legal to use?
**A:** The extension itself is legal. However, you must respect:
- Instagram's Terms of Service
- Copyright laws
- The rights of content creators
- Only download content you have permission to access

### Q: Will Instagram ban my account?
**A:** Unlikely if used normally. The extension:
- Uses standard browser features (no hacking)
- Doesn't access private/protected content
- Doesn't automate massive downloads
- Stays within normal usage patterns

**Best Practice**: Use reasonable limits (10-20 downloads per session).

### Q: Can I download private accounts' content?
**A:** No. The extension can only download:
- Public posts and reels
- Stories you have access to (if logged in)
- Content already visible on your screen

### Q: Why can't I download stories?
**A:** Stories are tricky because:
- Instagram doesn't keep them in the DOM
- They require special access
- The extension can only grab what's actively displayed
- Stories may have DRM protection

**Workaround**: Leave the story open in your browser; the extension can capture it.

### Q: Can I download Reels?
**A:** Yes! Reels work well with this extension:
1. Open the reel on Instagram
2. Use the extension as normal
3. The video will download

**Note**: Quality depends on what Instagram loads.

### Q: What's the maximum file size I can download?
**A:** Technically unlimited, but:
- Browser download limits: typically 4GB per file
- Your download folder space
- Connection timeout after 24+ hours

### Q: Can I batch download an entire profile?
**A:** Not directly, but you can:
1. Open the profile
2. Scroll to load multiple posts
3. Use Selection Mode to pick multiple items
4. Download as ZIP

**Note**: Instagram loads content dynamically, so you'll need to scroll and wait.

### Q: Does this work on mobile Chrome?
**A:** No. Chrome extensions only work on desktop/laptop Chrome.
- Mobile Chrome: Not supported
- Desktop Edge: Yes, same extension works
- Safari: No (different browser)

### Q: Can I use this on Instagram's web app (PWA)?
**A:** Yes! The extension works on web.instagram.com as well.

### Q: Do my downloads have metadata?
**A:** Downloaded files contain:
- **Included**: Image/video data, filename
- **Not included**: Caption, likes, dates (unless you save screenshot)

**Tip**: Save post links separately if you want context.

---

## 🐛 Troubleshooting Guide

### Problem: Extension Icon Doesn't Appear

**Symptoms**:
- Can't find Instagram Downloader in extensions list
- Icon not in toolbar

**Solutions**:
1. **Check if loaded**:
   - Go to `chrome://extensions/`
   - Search for "Instagram Downloader"
   - Should be listed there

2. **Pin to toolbar**:
   - Right-click extension icon area
   - Click "Manage extensions"
   - Find Instagram Downloader
   - Toggle icon to pin to toolbar

3. **Missing icons folder**:
   - Verify `icons/` folder exists
   - Check for `icon16.png`, `icon48.png`, `icon128.png`
   - Create proper PNG files (see SETUP_GUIDE.md)

4. **Reload extension**:
   - Go to `chrome://extensions/`
   - Click refresh button on extension card
   - Try again

---

### Problem: Content Script Not Loading

**Symptoms**:
- Error: "Content script not loaded"
- Popup shows error message
- Can't detect media

**Solutions**:
1. **Refresh Instagram page**:
   - Press F5 on Instagram tab
   - Wait 3 seconds for content to load
   - Try again

2. **Check page type**:
   - Ensure you're on instagram.com (not mobile version)
   - Not in an iframe or embedded view

3. **Reload extension**:
   - `chrome://extensions/` → Refresh icon on extension
   - Come back to Instagram, try again

4. **Check console**:
   - Press F12 on Instagram page
   - Go to Console tab
   - Look for red error messages
   - Note the errors for support

5. **Clear cache**:
   - Right-click Instagram page
   - Select "Empty cache and hard refresh"
   - Try downloading again

---

### Problem: No Media Detected

**Symptoms**:
- Status shows "No media found"
- Downloads don't start
- Even though posts are visible

**Solutions**:

1. **Wait for page to load**:
   - Instagram lazy-loads content
   - Scroll down and wait 2-3 seconds
   - Try downloading again

2. **Check if content is visible**:
   - The extension can't download hidden content
   - Some posts may be private or restricted
   - Protected content can't be downloaded

3. **Try another post**:
   - Go to a different post
   - Make sure it's fully loaded
   - Try downloading from there

4. **Check media type**:
   - Carousel posts: Usually work
   - Single image/video: Should work
   - Stories: Need special handling
   - Live videos: May not work

5. **Page structure changed**:
   - If nothing ever works
   - Instagram may have updated their website
   - Extension may need updating
   - Check for available updates

---

### Problem: Downloads Not Starting

**Symptoms**:
- Click download, nothing happens
- Status shows "downloading" but no file appears
- Download bar doesn't appear

**Solutions**:

1. **Check download settings**:
   - Chrome menu → Settings → Downloads
   - Verify download folder is valid
   - Check you have write permissions

2. **Try manual download**:
   - Right-click on media in browser
   - Select "Save image as..."
   - If this works, extension settings need adjustment

3. **Change download location**:
   - Settings → Downloads → Change
   - Select a different folder
   - Retry extension download

4. **Disable download confirmation**:
   - Settings → Downloads → Uncheck "Ask where to save each file"
   - Retry

5. **Check antivirus**:
   - Some antivirus blocks downloads
   - Temporarily disable to test
   - Add Chrome to whitelist if needed

---

### Problem: Extension Stops Working

**Symptoms**:
- Was working, now doesn't work
- Error messages appear
- Downloads fail randomly

**Solutions**:

1. **Instagram changed their website** ⚠️ Most common
   - Features may break when Instagram updates
   - Extension needs code updates to fix
   - Check if new version available

2. **Browser update broke it**:
   - Go to `chrome://settings/help`
   - Update Chrome to latest version
   - Reload extension
   - Try again

3. **Reload extension**:
   - `chrome://extensions/`
   - Click refresh on extension card
   - Go back to Instagram
   - Try downloading

4. **Clear browser cache**:
   - Ctrl+Shift+Delete
   - Check "All time"
   - Clear cache
   - Try again

5. **Reinstall extension**:
   - `chrome://extensions/`
   - Click trash icon to remove
   - Follow install steps again

6. **Check for updates**:
   - `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Update extensions now"
   - Wait for updates to download

---

### Problem: ZIP Download Doesn't Work

**Symptoms**:
- "Download as ZIP" button does nothing
- No ZIP file appears
- Error messages about JSZip

**Solutions**:

1. **Add JSZip library**:
   - Open `popup.html`
   - Add before `</body>`:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
   ```
   - Save and reload extension

2. **Try individual downloads instead**:
   - ZIP feature is advanced
   - Use regular downloads instead
   - Or use Windows built-in ZIP

3. **File size too large**:
   - Many files = large ZIP
   - Try downloading fewer items
   - Or download in multiple batches

---

### Problem: Selection Mode Not Working

**Symptoms**:
- "Select Mode" button doesn't respond
- Can't click media to select
- No green highlight appears

**Solutions**:

1. **Refresh the page**:
   - Press F5
   - Wait for full load
   - Try selection mode again

2. **Check media is visible**:
   - Media must be in the DOM
   - Lazy-loaded content may not be selectable
   - Scroll to load more content

3. **Try a different page**:
   - Selection mode works on feed, profiles, posts
   - Some page types may not support it
   - Try a different Instagram page

4. **Reload extension**:
   - `chrome://extensions/` → Refresh
   - Return to Instagram
   - Try again

---

### Problem: Very Slow Downloads

**Symptoms**:
- Downloads take forever
- Page becomes unresponsive
- Browser slows down

**Solutions**:

1. **Check internet connection**:
   - Run speedtest.net
   - If speed is low, downloads will be slow
   - Use a faster WiFi/connection

2. **Download fewer items**:
   - Downloading 100 items = takes time
   - Download in batches of 10-20
   - Come back for more

3. **Close other tabs**:
   - Free up browser resources
   - Close unnecessary applications
   - Restart browser if needed

4. **Instagram's servers**:
   - Instagram may rate-limit
   - Space out your downloads
   - Try again later if many failures

---

### Problem: "Permission Denied" Error

**Symptoms**:
- Downloads fail with permission error
- Can't write to folder
- All downloads blocked

**Solutions**:

1. **Check folder permissions**:
   - Right-click Downloads folder
   - Properties → Security
   - Ensure your user has "Modify" permission
   - Click "Edit" if needed

2. **Change download folder**:
   - Chrome Settings → Downloads
   - Change folder to Desktop
   - Retry downloads

3. **Disable antivirus temporarily**:
   - Some security software blocks downloads
   - Temporarily disable during download
   - Re-enable after testing

4. **Run Chrome as Administrator** (Windows):
   - Right-click Chrome shortcut
   - "Run as administrator"
   - Try again

---

### Problem: Downloaded Files Are Corrupted

**Symptoms**:
- Downloaded images won't open
- Videos won't play
- "File corrupted" errors

**Solutions**:

1. **Check file size**:
   - Very small files (< 1KB) indicate download failure
   - Those likely corrupted
   - Try downloading again

2. **Try another post**:
   - Download from a different source
   - If it works, the post may have been the issue
   - If all fail, check internet

3. **Open in different app**:
   - Try different image/video player
   - Some apps handle formats better
   - May be compatibility issue

4. **Check internet connection**:
   - Unstable connection = partial downloads
   - Try on stable WiFi
   - Disable VPN temporarily

---

## 🔧 Advanced Troubleshooting

### View Console Logs

1. **On Instagram page**:
   - Press F12
   - Go to Console tab
   - Look for `[Instagram Downloader]` messages
   - Copy any errors

2. **Background worker logs**:
   - `chrome://extensions/`
   - Click "Service Worker" under extension
   - Logs appear here

### Clear Extension Storage

```javascript
// Run in console while extension popup is open:
chrome.storage.local.clear(() => {
  console.log('Storage cleared');
});
```

### Reset to Defaults

1. Uninstall extension
2. Delete the extension folder
3. Reinstall fresh copy
4. Set up from scratch

### Contact Support

If still stuck:
1. Document the exact error
2. Note which Instagram page you're on
3. Mention any error messages
4. Describe steps you've tried
5. Include browser/extension version

---

## ✅ Everything Works Checklist

- [ ] Extension icon visible in toolbar
- [ ] Can click popup without errors
- [ ] Can detect media on Instagram posts
- [ ] Download button shows status messages
- [ ] Files appear in Downloads folder
- [ ] Keyboard shortcuts (D, S) work
- [ ] Dark mode toggle works
- [ ] Selection mode highlights media
- [ ] Multiple items download correctly
- [ ] No console errors (F12)

If all checkboxes pass, your extension is working perfectly! 🎉

---

## 📞 When to Seek Help

**Before reaching out**:
- Try the solutions above
- Check if Instagram website changed
- Update Chrome to latest version
- Clear browser cache
- Reinstall extension

**Provide when asking for help**:
- Exact error message
- Chrome version (chrome://version/)
- Instagram page URL
- Steps to reproduce the issue
- Screenshot of the error

---

**Remember**: Most issues are solved by refreshing the Instagram page and reloading the extension! 🔄
