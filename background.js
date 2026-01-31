// Background Service Worker: Handles downloads and communication

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.type === 'DOWNLOAD') {
        downloadMedia(msg.urls, msg.filename, msg.asZip || false);
        sendResponse({ status: 'downloading' });
    }

    if (msg.type === 'GET_SETTINGS') {
        chrome.storage.local.get(['settings'], (result) => {
            sendResponse(result.settings || {});
        });
    }

    if (msg.type === 'SET_SETTINGS') {
        chrome.storage.local.set({ settings: msg.settings });
        sendResponse({ status: 'saved' });
    }
});

// Handle keyboard commands
chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            if (command === 'download-media') {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'KEYBOARD_DOWNLOAD' });
            } else if (command === 'toggle-select') {
                chrome.tabs.sendMessage(tabs[0].id, { type: 'KEYBOARD_SELECT' });
            }
        }
    });
});

// Download media files
async function downloadMedia(urls, baseFilename = 'instagram', asZip = false) {
    if (!urls || urls.length === 0) {
        console.log('No URLs to download');
        return;
    }

    if (asZip) {
        await downloadAsZip(urls, baseFilename);
    } else {
        urls.forEach((url, index) => {
            if (url && typeof url === 'string') {
                const filename = getFilename(url, baseFilename, index);
                chrome.downloads.download({
                    url: url,
                    filename: `instagram/${filename}`,
                    saveAs: false
                }, (downloadId) => {
                    if (chrome.runtime.lastError) {
                        console.error('Download error:', chrome.runtime.lastError);
                    } else {
                        console.log(`Download started: ${filename}`);
                    }
                });
            }
        });
    }
}

// Generate filename from URL
function getFilename(url, baseFilename, index) {
    try {
        const urlObj = new URL(url);
        const path = urlObj.pathname;
        const extension = path.includes('.mp4') ? '.mp4' :
            path.includes('.jpg') ? '.jpg' :
                path.includes('.png') ? '.png' : '.jpg';

        return `${baseFilename}_${Date.now()}_${index}${extension}`;
    } catch (e) {
        return `${baseFilename}_${Date.now()}_${index}.jpg`;
    }
}

// Download as ZIP (requires JSZip library)
async function downloadAsZip(urls, filename) {
    try {
        // Check if JSZip is available (needs to be loaded via popup)
        if (typeof JSZip === 'undefined') {
            console.log('JSZip not available, downloading individually');
            downloadMedia(urls, filename, false);
            return;
        }

        const zip = new JSZip();
        let count = 0;

        for (const url of urls) {
            try {
                const response = await fetch(url, {
                    mode: 'cors',
                    credentials: 'omit'
                });

                if (response.ok) {
                    const blob = await response.blob();
                    const ext = url.includes('.mp4') ? '.mp4' : '.jpg';
                    zip.file(`media_${Date.now()}_${count}${ext}`, blob);
                    count++;
                }
            } catch (e) {
                console.log('Failed to fetch URL:', url);
            }
        }

        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);

        chrome.downloads.download({
            url: url,
            filename: `instagram/${filename}_${Date.now()}.zip`,
            saveAs: true
        });

        setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (e) {
        console.error('ZIP creation failed:', e);
        downloadMedia(urls, filename, false);
    }
}

console.log('[Instagram Downloader] Background service worker loaded');
