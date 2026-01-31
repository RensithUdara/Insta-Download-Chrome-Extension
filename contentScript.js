// Content Script: Detects media on Instagram pages (Advanced)

const mediaCache = new Map();
let selectMode = false;
let selectedMedia = new Set();
const storyUrls = new Set();
let isObfuscated = false;

// Advanced obfuscation detection and bypass
const ObfuscationBypass = {
    // Pattern matching for obfuscated video/image URLs
    patterns: [
        /vimeo\.com/i,
        /\/v\/[\w-]+\//,
        /scontent.*fbcdn/i,
        /instagram\.com.*\/media\//i,
        /[a-z0-9]{15,}\.jpg/i,
        /blob:/i
    ],

    // Detect if DOM is heavily obfuscated
    isObfuscated() {
        const elements = document.querySelectorAll('img, video, picture, [role="img"]');
        let obfuscatedCount = 0;

        elements.forEach(el => {
            const src = el.src || el.getAttribute('src') || '';
            const classStr = el.className || '';
            const idStr = el.id || '';

            // Check for heavily minified/obfuscated attributes
            if (/[a-z]{1,3}_[a-z0-9]{10,}/i.test(classStr + idStr)) {
                obfuscatedCount++;
            }
        });

        return obfuscatedCount / Math.max(elements.length, 1) > 0.5;
    },

    // Get all candidate URLs including hidden ones
    getAllCandidateUrls() {
        const urls = [];
        const seen = new Set();

        // Check all attributes that might contain URLs
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            // Check style backgrounds
            const style = window.getComputedStyle(el);
            const bgImage = style.backgroundImage;
            if (bgImage && bgImage.includes('url')) {
                const match = bgImage.match(/url\(['"]?([^'"()]+)['"]?\)/);
                if (match) {
                    const url = match[1];
                    if (this.patterns.some(p => p.test(url))) {
                        if (!seen.has(url)) {
                            urls.push(url);
                            seen.add(url);
                        }
                    }
                }
            }

            // Check data attributes
            for (let attr of el.attributes || []) {
                if (attr.value && (attr.value.includes('.jpg') || attr.value.includes('.mp4') || attr.value.includes('.webm'))) {
                    const urls_from_attr = attr.value.match(/https?:\/\/[^\s"'<>]+/g);
                    if (urls_from_attr) {
                        urls_from_attr.forEach(url => {
                            if (!seen.has(url)) {
                                urls.push(url);
                                seen.add(url);
                            }
                        });
                    }
                }
            }
        });

        return urls;
    }
};

// Extract media URLs from current page
function getMediaUrls() {
    const urls = [];
    const seen = new Set();

    // Detect obfuscation
    isObfuscated = ObfuscationBypass.isObfuscated();

    // Collect from img tags (photos, thumbnails)
    document.querySelectorAll('img').forEach(img => {
        if (img.src && !img.src.includes('data:')) {
            const src = img.src.split('?')[0]; // Remove query params
            if (src.includes('instagram') || src.includes('cdninstagram') || src.includes('fbcdn') || src.includes('scontent')) {
                if (!seen.has(src)) {
                    urls.push(src);
                    seen.add(src);
                }
            }
        }
    });

    // Collect from video tags (reels, stories, videos)
    document.querySelectorAll('video').forEach(video => {
        if (video.src) {
            const src = video.src.split('?')[0];
            if (!seen.has(src)) {
                urls.push(src);
                seen.add(src);
            }
        }

        // Check source tags within video
        video.querySelectorAll('source').forEach(source => {
            if (source.src) {
                const src = source.src.split('?')[0];
                if (!seen.has(src)) {
                    urls.push(src);
                    seen.add(src);
                }
            }
        });
    });

    // Collect from picture elements (responsive images)
    document.querySelectorAll('picture').forEach(picture => {
        picture.querySelectorAll('source').forEach(source => {
            if (source.srcset) {
                const urls_from_srcset = source.srcset.split(',').map(url => url.trim().split(' ')[0]);
                urls_from_srcset.forEach(url => {
                    if (!seen.has(url)) {
                        urls.push(url);
                        seen.add(url);
                    }
                });
            }
        });
    });

    // Handle obfuscated DOM
    if (isObfuscated) {
        const obfuscatedUrls = ObfuscationBypass.getAllCandidateUrls();
        obfuscatedUrls.forEach(url => {
            if (!seen.has(url)) {
                urls.push(url);
                seen.add(url);
            }
        });
    }

    return urls;
}

// Story/Highlight detector - intercept network requests
function setupStoryDetection() {
    // Intercept fetch for story video detection
    const originalFetch = window.fetch;
    window.fetch = async function (...args) {
        const response = await originalFetch(...args);

        try {
            const url = args[0];
            if (typeof url === 'string' && response.ok) {
                // Detect story/highlight URLs
                if (url.includes('story') || url.includes('highlight') || url.includes('reel')) {
                    if (url.includes('.mp4') || url.includes('video')) {
                        storyUrls.add(url.split('?')[0]);
                    }
                }
            }
        } catch (e) {
            // Silently handle errors
        }

        return response;
    };
}

setupStoryDetection();

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'GET_MEDIA') {
        const urls = getMediaUrls();
        // Include story URLs
        const allUrls = [...new Set([...urls, ...Array.from(storyUrls)])];
        sendResponse({
            urls: allUrls,
            timestamp: new Date().toISOString(),
            pageUrl: window.location.href,
            obfuscated: isObfuscated,
            count: allUrls.length
        });
    }

    if (msg.type === 'TOGGLE_SELECT') {
        selectMode = !selectMode;
        selectedMedia.clear();

        if (selectMode) {
            document.body.style.cursor = 'crosshair';
            highlightSelectableMedia();
        } else {
            document.body.style.cursor = 'auto';
            clearHighlights();
        }

        sendResponse({ selectMode: selectMode });
    }

    if (msg.type === 'GET_SELECTED') {
        sendResponse({ urls: Array.from(selectedMedia), count: selectedMedia.size });
    }

    if (msg.type === 'GET_STORY_URLS') {
        sendResponse({ storyUrls: Array.from(storyUrls) });
    }
});

// Highlight selectable media
function highlightSelectableMedia() {
    const allMedia = [...document.querySelectorAll('img'), ...document.querySelectorAll('video')];

    allMedia.forEach((element, index) => {
        const isInsta = element.src?.includes('instagram') ||
            element.src?.includes('cdninstagram') ||
            element.src?.includes('fbcdn');

        if (isInsta) {
            element.style.cursor = 'pointer';
            element.style.outline = '3px solid #E1306C';
            element.style.outlineOffset = '2px';
            element.dataset.mediaIndex = index;

            element.addEventListener('click', handleMediaClick, true);
        }
    });
}

// Handle media selection
function handleMediaClick(e) {
    e.preventDefault();
    e.stopPropagation();

    const url = e.target.src;
    if (selectedMedia.has(url)) {
        selectedMedia.delete(url);
        e.target.style.outline = '3px solid #E1306C';
    } else {
        selectedMedia.add(url);
        e.target.style.outline = '5px solid #00A854';
    }
}

// Clear highlights
function clearHighlights() {
    const allMedia = [...document.querySelectorAll('img'), ...document.querySelectorAll('video')];
    allMedia.forEach(element => {
        element.style.outline = 'none';
        element.style.cursor = 'auto';
        element.removeEventListener('click', handleMediaClick, true);
        delete element.dataset.mediaIndex;
    });
}

// Listen for keyboard shortcuts
chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === 'KEYBOARD_DOWNLOAD') {
        const urls = getMediaUrls();
        chrome.runtime.sendMessage({
            type: 'DOWNLOAD',
            urls: urls,
            quality: 'high'
        });
    }

    if (msg.type === 'KEYBOARD_SELECT') {
        selectMode = !selectMode;
        if (selectMode) {
            document.body.style.cursor = 'crosshair';
            highlightSelectableMedia();
        } else {
            document.body.style.cursor = 'auto';
            clearHighlights();
        }
    }
});

console.log('[Instagram Downloader] Content script loaded');
