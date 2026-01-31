// Background Service Worker: Handles downloads and communication (Advanced)

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'DOWNLOAD') {
    downloadMedia(msg.urls, msg.filename, msg.asZip || false, msg.quality || 'high');
    sendResponse({ status: 'downloading', count: msg.urls.length });
  }
  
  if (msg.type === 'GET_SETTINGS') {
    chrome.storage.local.get(['settings'], (result) => {
      sendResponse(result.settings || getDefaultSettings());
    });
  }
  
  if (msg.type === 'SET_SETTINGS') {
    chrome.storage.local.set({ settings: msg.settings });
    sendResponse({ status: 'saved' });
  }
});

// Default settings for first run
function getDefaultSettings() {
  return {
    enabled: true,
    darkMode: false,
    autoDownload: false,
    zipEnabled: true,
    qualityPreference: 'high',
    downloadFormat: 'individual'
  };
}

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

// Download media files (supports stories, reels, posts)
async function downloadMedia(urls, baseFilename = 'instagram', asZip = false, quality = 'high') {
  if (!urls || urls.length === 0) {
    console.log('[Instagram Downloader] No URLs to download');
    return;
  }

  // Filter out duplicates and invalid URLs
  const validUrls = [...new Set(urls)].filter(url => typeof url === 'string' && url.startsWith('http'));

  if (asZip && validUrls.length > 1) {
    await downloadAsZip(validUrls, baseFilename);
  } else {
    validUrls.forEach((url, index) => {
      const filename = getFilename(url, baseFilename, index, quality);
      chrome.downloads.download({
        url: url,
        filename: `instagram/${filename}`,
        saveAs: false
      }, (downloadId) => {
        if (chrome.runtime.lastError) {
          console.error('[Instagram Downloader] Download error:', chrome.runtime.lastError);
        } else {
          console.log(`[Instagram Downloader] Download started: ${filename}`);
        }
      });
    });
  }
}

// Generate meaningful filename from URL
function getFilename(url, baseFilename, index, quality = 'high') {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    
    // Detect file type
    const extension = path.includes('.mp4') ? '.mp4' : 
                     path.includes('.webm') ? '.webm' :
                     path.includes('.mov') ? '.mov' :
                     path.includes('.png') ? '.png' :
                     path.includes('.gif') ? '.gif' : '.jpg';
    
    // Create meaningful filename
    const timestamp = new Date().toISOString().split('T')[0];
    const type = extension.includes('mp4') || extension.includes('webm') ? 'video' : 'photo';
    
    return `${type}_${timestamp}_${index}${extension}`;
  } catch (e) {
    return `media_${Date.now()}_${index}.jpg`;
  }
}

// Download as ZIP with JSZip library
async function downloadAsZip(urls, filename = 'instagram_download') {
  try {
    // Check if JSZip is available
    if (typeof JSZip === 'undefined') {
      console.log('[Instagram Downloader] JSZip not available, downloading individually');
      downloadMedia(urls, filename, false);
      return;
    }

    const zip = new JSZip();
    let successCount = 0;
    const mediaFolder = zip.folder('media');

    for (const url of urls) {
      try {
        const response = await fetch(url, {
          mode: 'cors',
          credentials: 'omit',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const ext = url.includes('.mp4') ? '.mp4' : 
                      url.includes('.webm') ? '.webm' :
                      url.includes('.png') ? '.png' : '.jpg';
          const timestamp = Date.now();
          mediaFolder.file(`media_${timestamp}_${successCount}${ext}`, blob);
          successCount++;
        }
      } catch (e) {
        console.log('[Instagram Downloader] Failed to fetch:', url, e);
        continue;
      }
    }

    if (successCount === 0) {
      console.log('[Instagram Downloader] No files successfully fetched for ZIP');
      return;
    }

    // Generate and download ZIP
    const blob = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().split('T')[0];
    
    chrome.downloads.download({
      url: zipUrl,
      filename: `instagram/${filename}_${timestamp}.zip`,
      saveAs: true
    });

    // Cleanup
    setTimeout(() => URL.revokeObjectURL(zipUrl), 60000);
    console.log(`[Instagram Downloader] ZIP created with ${successCount} files`);
  } catch (e) {
    console.error('[Instagram Downloader] ZIP creation failed:', e);
    downloadMedia(urls, filename, false);
  }
}

console.log('[Instagram Downloader] Background service worker loaded - Advanced version');
