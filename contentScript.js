// Content Script: Detects media on Instagram pages

const mediaCache = new Map();
let selectMode = false;
let selectedMedia = new Set();

// Extract media URLs from current page
function getMediaUrls() {
    const urls = [];
    const seen = new Set();

    // Collect from img tags (photos, thumbnails)
    document.querySelectorAll('img').forEach(img => {
        if (img.src && !img.src.includes('data:')) {
            const src = img.src.split('?')[0]; // Remove query params
            if (src.includes('instagram') || src.includes('cdninstagram') || src.includes('fbcdn')) {
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

    return urls;
}

// Intercept fetch for story detection
const originalFetch = window.fetch;
window.fetch = async function (...args) {
    const response = await originalFetch(...args);

    try {
        const url = args[0];
        if (typeof url === 'string') {
            if (url.includes('.mp4') || url.includes('video') || url.includes('story')) {
                mediaCache.set(url, response.clone());
            }
        }
    } catch (e) {
        // Silently handle errors
    }

    return response;
};

// Listen for messages from popup or background
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'GET_MEDIA') {
        const urls = getMediaUrls();
        sendResponse({
            urls: urls,
            timestamp: new Date().toISOString(),
            pageUrl: window.location.href
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
        sendResponse({ urls: Array.from(selectedMedia) });
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
