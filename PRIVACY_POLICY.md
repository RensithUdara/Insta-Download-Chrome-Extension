# Privacy Policy - Instagram Downloader

**Last Updated:** February 1, 2026

## Overview

Instagram Downloader ("the Extension") is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our extension.

## Data Collection & Storage

### What We DON'T Collect
- ❌ We do NOT collect personal information
- ❌ We do NOT track your browsing activity
- ❌ We do NOT send data to external servers
- ❌ We do NOT use analytics or tracking services
- ❌ We do NOT access your Instagram account credentials

### What We DO Process Locally
- ✅ Media URLs detected on Instagram.com (processed locally only)
- ✅ User preferences (stored locally in browser storage)
- ✅ Download history (stored locally in your Downloads folder)

## Permissions Justification

### Required Permissions

| Permission | Purpose | Justification |
|-----------|---------|---------------|
| `downloads` | Save media files | Needed to download images and videos |
| `activeTab` | Access current tab info | Detect when you're on Instagram |
| `scripting` | Inject content script | Scan Instagram pages for media |
| `storage` | Save settings | Remember your preferences |
| `tabs` | Tab information | Identify Instagram tabs |
| `webNavigation` | Page navigation events | Detect Instagram page loads |

### Host Permissions

We access the following Instagram domains to detect and download media:
- `https://www.instagram.com/*`
- `https://*.cdninstagram.com/*`
- `https://*.fbcdn.net/*`
- `https://*.instagram.com/*`

## Data Storage

All data is stored locally:
- **Settings:** Chrome's local storage (encrypted by browser)
- **Downloads:** Your local Downloads folder
- **No cloud sync:** Settings don't sync across devices

## Third-Party Services

### JSZip Library
- Used for creating ZIP archives locally
- Loaded from CDN: `cdnjs.cloudflare.com/ajax/libs/jszip/`
- No data is sent during ZIP creation (all processing is client-side)

## Security

- 🔒 All processing happens in your browser
- 🔒 No internet requests except to Instagram domains
- 🔒 No external APIs or tracking
- 🔒 Open source code (auditable)

## User Controls

You can:
- Disable the extension anytime (Settings → Manage extensions)
- Clear downloaded files from your Downloads folder
- Access extension source code on GitHub

## Changes to This Policy

We may update this policy as needed. You'll be notified of significant changes.

## Contact

For privacy concerns:
- Email: rensithudaragonalagoda@gmail.com
- GitHub: https://github.com/RensithUdara/insta-download

## Compliance

This extension:
- ✅ Complies with Chrome Web Store policies
- ✅ Does not violate Instagram's Terms of Service (for personal use only)
- ✅ Does not contain malware or tracking code
- ✅ Is open source and auditable

---

**By using this extension, you acknowledge that you have read and understood this Privacy Policy.**
