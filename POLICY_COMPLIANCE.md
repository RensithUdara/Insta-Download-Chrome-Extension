# Chrome Web Store Policy Compliance

## Single Purpose Declaration

### Primary Purpose
**Instagram Downloader** is a single-purpose extension with a narrow, clearly-defined function:

> **Download photos, videos, reels, stories, and highlights from Instagram**

### What It Does
- ✅ Detects downloadable media on Instagram.com
- ✅ Extracts download URLs from Instagram pages
- ✅ Saves media to your local Downloads folder
- ✅ Allows batch downloads as ZIP files
- ✅ Provides quality preferences (High/Medium/Low)
- ✅ Offers selection mode for multiple items

### What It Does NOT Do
- ❌ Does NOT modify Instagram's interface maliciously
- ❌ Does NOT interact with other websites
- ❌ Does NOT collect or transmit user data
- ❌ Does NOT include ads or affiliate links
- ❌ Does NOT track user activity
- ❌ Does NOT install other extensions or software
- ❌ Does NOT redirect users to external sites
- ❌ Does NOT automate Instagram (respects ToS)

### Single Purpose Evidence
1. **Name:** Clearly states "Instagram Downloader"
2. **Description:** Focused on download functionality
3. **Functionality:** Only works with Instagram.com
4. **Permissions:** All justify download functionality
5. **UI:** Simple, single-purpose popup interface
6. **Code:** No unnecessary features or bloat

---

## Privacy Compliance

### Data Collection
**We collect: NOTHING**
- ❌ No personal information
- ❌ No browsing history
- ❌ No user behavior tracking
- ❌ No device information
- ❌ No authentication data

### Data Storage
**All data stays local:**
- Downloaded files → Your Downloads folder
- User preferences → Browser local storage (encrypted)
- No cloud sync
- No external servers

### Third-Party Services
**Only external resource:** JSZip library
- Source: CDN (cdnjs.cloudflare.com)
- Purpose: Client-side ZIP creation
- Data sent: None (processing is local)
- Privacy impact: Minimal (standard CDN)

### Permissions Justification

| Permission | Why Required | How Used | Privacy Impact |
|-----------|-------------|----------|----------------|
| `downloads` | Save files | Download media to local disk | None - local only |
| `activeTab` | Know current page | Detect when on Instagram | None - browser only |
| `scripting` | Scan page content | Extract media URLs from DOM | None - page level only |
| `storage` | Remember settings | Store user preferences | None - local storage only |
| `tabs` | Tab information | Identify Instagram tabs | None - tab info only |
| `webNavigation` | Page load events | Trigger on Instagram pages | None - navigation only |

**Privacy Impact: ZERO**
- No permissions for external communication
- No network interception permissions
- No permission to access personal data
- All processing happens in browser only

### User Controls
Users have full control:
- ✅ Enable/disable extension anytime
- ✅ Delete downloaded files anytime
- ✅ Clear browser storage anytime
- ✅ Uninstall extension anytime
- ✅ Review extension code on GitHub
- ✅ No account needed

---

## Policy Compliance Statement

### Commitment
Instagram Downloader commits to:

✅ **Privacy Protection**
- Never collect personal data
- Never track user behavior
- Never send data to external servers
- Never use analytics or tracking
- Never share user information

✅ **Single Purpose**
- Download Instagram media only
- No additional features unrelated to downloads
- No feature creep or bloatware
- Focused, well-defined functionality
- Easy to understand what it does

✅ **Security**
- No malware or tracking code
- No deceptive practices
- No unauthorized access
- No credential harvesting
- Clean, auditable code

✅ **Respect**
- Respect Instagram's Terms of Service
- Respect user privacy
- Respect user choice
- Respect Chrome Web Store policies
- Respect intellectual property

### Compliance Checklist

| Requirement | Status | Evidence |
|------------|--------|----------|
| Single purpose | ✅ | Download Instagram media only |
| Narrow scope | ✅ | Instagram.com downloads only |
| Easy to understand | ✅ | Clear name, description, UI |
| No data collection | ✅ | Privacy policy, no tracking code |
| No tracking | ✅ | No analytics, no cookies |
| No ads | ✅ | No ad code in extension |
| No affiliate links | ✅ | No external monetization |
| Clear permissions | ✅ | All justified, documented |
| User control | ✅ | Can enable/disable anytime |
| Transparent | ✅ | Open source, documented |

---

## Privacy Policy (Full)

### What We Collect
**NOTHING** ✅

We do not collect:
- Personal information
- Browsing data
- Usage statistics
- Device identifiers
- Location data
- Any other user data

### What We Process
Locally only:
- Media URLs (while browser is open)
- Downloaded files (saved to your device)
- User preferences (stored in browser)

### What We Send
**NOTHING** ✅

We do not send data to:
- External servers
- Analytics platforms
- Ad networks
- Any third party
- Our servers

### Permissions Justification
All permissions used only for:
- Detecting Instagram pages
- Extracting media URLs
- Saving files locally
- Storing preferences

### Cookies & Tracking
- ❌ No cookies
- ❌ No tracking pixels
- ❌ No analytics
- ❌ No fingerprinting
- ❌ No session tracking

### Third-Party Services
Only JSZip library from CDN:
- Used for ZIP creation
- Processing done locally
- No data transmission
- Standard web resource

### Data Retention
- Files: Stored in your Downloads folder (your control)
- Settings: Stored in browser local storage (your control)
- No cloud storage
- No remote backups
- Delete anytime

### User Rights
You have the right to:
- ✅ Access your data (view files)
- ✅ Delete your data (delete files)
- ✅ Port your data (manual download)
- ✅ Disable the extension (anytime)
- ✅ Uninstall completely (anytime)

### Compliance
This extension complies with:
- ✅ Chrome Web Store policies
- ✅ GDPR principles (no data collection)
- ✅ CCPA standards (no personal info)
- ✅ Privacy best practices
- ✅ Transparency standards

---

## Acceptable Use Policy

### ✅ Acceptable Uses
Users may use this extension to:
- Download their own photos and videos
- Save their own stories and reels
- Archive their own account content
- Backup personal memories
- Download public content for personal use
- Learn about extension development

### ⚠️ Terms of Service
Users agree to:
- Use extension for personal purposes only
- Respect copyright and intellectual property
- Comply with Instagram's Terms of Service
- Not use for commercial scraping
- Not violate anyone's privacy rights
- Not use for automation against ToS

### ❌ Prohibited Uses
Users may NOT use this extension to:
- Violate Instagram's Terms of Service
- Scrape or harvest Instagram data
- Automate downloads at scale
- Infringe on creator's copyrights
- Bypass Instagram's restrictions
- Collect user data for resale
- Create competing services
- Engage in commercial piracy

---

## Security Statement

### Code Safety
✅ No malware
✅ No tracking code
✅ No mining code
✅ No credential theft
✅ Clean, auditable source

### Dependency Safety
✅ Only uses JSZip (popular, maintained library)
✅ No unnecessary dependencies
✅ All dependencies are secure

### Communication Safety
✅ Only connects to Instagram.com domains
✅ Only sends/receives media URLs
✅ HTTPS only (secure)
✅ No unencrypted data transmission

### User Safety
✅ Extension uses least-privilege model
✅ No root/admin requirements
✅ No system modifications
✅ Sandboxed by browser
✅ No file access beyond Downloads

---

## Transparency

### Open Source
This extension's code is available on GitHub:
- Repository: https://github.com/RensithUdara/insta-download
- License: MIT (free to audit and modify)
- Anyone can review the code
- Anyone can report security issues
- Community contributions welcome

### Documentation
Complete documentation includes:
- Privacy Policy
- Terms of Service
- Code comments
- GitHub README
- User guides
- Developer guides

### Accountability
- Report issues: rensithudaragonalagoda@gmail.com
- GitHub Issues: Bug reports and feature requests
- Responsive: Prompt response to concerns
- Transparent: Clear communication

---

## Questions?

### Privacy Questions
See: [PRIVACY_POLICY.md](./PRIVACY_POLICY.md)

### Technical Questions
See: [README.md](./README.md)

### Submission Questions
See: [SUBMIT_TO_STORE.md](./SUBMIT_TO_STORE.md)

### Security Concerns
Email: rensithudaragonalagoda@gmail.com

---

**This extension is built with privacy, security, and respect for users at its core.**

✅ **Chrome Web Store Policy Compliant**
✅ **Privacy Protected**
✅ **Single Purpose Focused**

---

*Last Updated: February 1, 2026*
*Version: 1.1.0*
