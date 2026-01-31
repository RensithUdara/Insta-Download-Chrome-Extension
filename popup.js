// Popup Script - Instagram Downloader (Advanced Version)

let isExtensionEnabled = true;
let isDarkMode = false;
let isSelectMode = false;
let currentMediaCount = 0;
let currentStoryCount = 0;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadSettings();
    detectMedia();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('downloadBtn').addEventListener('click', downloadCurrentMedia);
    document.getElementById('selectBtn').addEventListener('click', toggleSelectMode);
    document.getElementById('downloadZipBtn').addEventListener('click', downloadAsZip);

    // Story/Reel/Post buttons
    if (document.getElementById('storyBtn')) {
        document.getElementById('storyBtn').addEventListener('click', () => filterByType('story'));
    }
    if (document.getElementById('reelsBtn')) {
        document.getElementById('reelsBtn').addEventListener('click', () => filterByType('reel'));
    }
    if (document.getElementById('postsBtn')) {
        document.getElementById('postsBtn').addEventListener('click', () => filterByType('post'));
    }

    document.getElementById('enableToggle').addEventListener('change', (e) => {
        isExtensionEnabled = e.target.checked;
        saveSettings();
    });

    document.getElementById('darkModeToggle').addEventListener('change', (e) => {
        isDarkMode = e.target.checked;
        applyDarkMode(isDarkMode);
        saveSettings();
    });

    if (document.getElementById('autoZipToggle')) {
        document.getElementById('autoZipToggle').addEventListener('change', (e) => {
            saveSettings();
        });
    }

    if (document.getElementById('qualitySelect')) {
        document.getElementById('qualitySelect').addEventListener('change', (e) => {
            saveSettings();
        });
    }
}

// Auto-detect media on page load
async function detectMedia() {
    try {
        if (typeof chrome === 'undefined' || !chrome.tabs) {
            return;
        }

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab.url.includes('instagram.com')) {
            return;
        }

        chrome.tabs.sendMessage(tab.id, { type: 'GET_MEDIA' }, (response) => {
            if (chrome.runtime.lastError) {
                return;
            }

            if (response && response.urls) {
                currentMediaCount = response.count || response.urls.length;

                // Update badge
                if (document.getElementById('mediaBadge') && currentMediaCount > 0) {
                    document.getElementById('mediaBadge').textContent = currentMediaCount;
                    document.getElementById('mediaBadge').style.display = 'inline-block';
                }

                // Update info
                if (document.getElementById('mediaInfo')) {
                    document.getElementById('mediaInfo').style.display = 'block';
                    document.getElementById('mediaCount').textContent = currentMediaCount;
                    document.getElementById('obfuscationStatus').textContent = response.obfuscated ? 'Bypassed' : 'Normal';
                }

                // Get story count
                chrome.tabs.sendMessage(tab.id, { type: 'GET_STORY_URLS' }, (storyResponse) => {
                    if (storyResponse && storyResponse.storyUrls) {
                        currentStoryCount = storyResponse.storyUrls.length;
                        if (document.getElementById('storyCount')) {
                            document.getElementById('storyCount').textContent = currentStoryCount;
                        }
                    }
                });
            }
        });
    } catch (error) {
        console.log('[Instagram Downloader] Detection error:', error);
    }
}

// Download current media
async function downloadCurrentMedia() {
    try {
        showStatus('🔄 Scanning page...', 'info');

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab.url.includes('instagram.com')) {
            showStatus('⚠️ Please open Instagram first', 'error');
            return;
        }

        chrome.tabs.sendMessage(tab.id, { type: 'GET_MEDIA' }, (response) => {
            if (chrome.runtime.lastError) {
                showStatus('❌ Please refresh Instagram and try again', 'error');
                return;
            }

            if (!response || !response.urls || response.urls.length === 0) {
                showStatus('❌ No downloadable content found', 'error');
                return;
            }

            const count = response.urls.length;
            const quality = document.getElementById('qualitySelect')?.value || 'high';

            showStatus(`✅ Found ${count} item(s). Starting download...`, 'success');

            chrome.runtime.sendMessage({
                type: 'DOWNLOAD',
                urls: response.urls,
                quality: quality
            });

            setTimeout(() => {
                showStatus(`✅ ${count} item(s) queued! Check Downloads folder.`, 'success');
            }, 1500);
        });
    } catch (error) {
        console.error('Error:', error);
        showStatus('❌ Error detecting media', 'error');
    }
}

// Toggle Select Mode
async function toggleSelectMode() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab.url.includes('instagram.com')) {
            showStatus('⚠️ Please open Instagram first', 'error');
            return;
        }

        chrome.tabs.sendMessage(tab.id, { type: 'TOGGLE_SELECT' }, (response) => {
            if (chrome.runtime.lastError) {
                showStatus('❌ Content not loaded', 'error');
                return;
            }

            isSelectMode = response.selectMode;
            updateSelectButtonState();

            if (isSelectMode) {
                showStatus('🎯 Selection ON - Click media to select (green = selected)', 'info');
            } else {
                showStatus('🎯 Selection OFF', 'info');
            }
        });
    } catch (error) {
        showStatus('❌ Error toggling selection', 'error');
    }
}

// Download as ZIP
async function downloadAsZip() {
    try {
        showStatus('📦 Preparing ZIP...', 'info');

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab.url.includes('instagram.com')) {
            showStatus('⚠️ Please open Instagram first', 'error');
            return;
        }

        chrome.tabs.sendMessage(tab.id, { type: 'GET_MEDIA' }, (response) => {
            if (!response || !response.urls || response.urls.length === 0) {
                showStatus('❌ No media to ZIP', 'error');
                return;
            }

            const count = response.urls.length;
            const timestamp = new Date().toISOString().split('T')[0];

            showStatus(`✅ Creating ZIP with ${count} item(s)...`, 'success');

            chrome.runtime.sendMessage({
                type: 'DOWNLOAD',
                urls: response.urls,
                asZip: true,
                filename: `instagram_batch_${timestamp}`
            });
        });
    } catch (error) {
        showStatus('❌ Error creating ZIP', 'error');
    }
}

// Filter by content type
async function filterByType(type) {
    try {
        showStatus(`🔍 Finding ${type}s...`, 'info');

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.tabs.sendMessage(tab.id, { type: 'GET_MEDIA' }, (response) => {
            if (!response || !response.urls) {
                showStatus('❌ No content found', 'error');
                return;
            }

            let filtered = response.urls;

            if (type === 'story') {
                chrome.tabs.sendMessage(tab.id, { type: 'GET_STORY_URLS' }, (storyResponse) => {
                    if (storyResponse && storyResponse.storyUrls.length > 0) {
                        chrome.runtime.sendMessage({
                            type: 'DOWNLOAD',
                            urls: storyResponse.storyUrls,
                            quality: 'high'
                        });
                        showStatus(`✅ Downloading ${storyResponse.storyUrls.length} story/stories...`, 'success');
                    } else {
                        showStatus('❌ No stories found on this page', 'error');
                    }
                });
            } else {
                // For reels/posts, download all for now (can be enhanced with better filtering)
                chrome.runtime.sendMessage({
                    type: 'DOWNLOAD',
                    urls: filtered,
                    quality: 'high'
                });
                showStatus(`✅ Downloading ${filtered.length} ${type}(s)...`, 'success');
            }
        });
    } catch (error) {
        showStatus(`❌ Error filtering ${type}s`, 'error');
    }
}

// Show Status Message
function showStatus(message, type = 'info') {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status show ${type}`;

    setTimeout(() => {
        statusEl.classList.remove('show');
    }, 5000);
}

// Save Settings
function saveSettings() {
    const settings = {
        enabled: document.getElementById('enableToggle')?.checked ?? true,
        darkMode: document.getElementById('darkModeToggle')?.checked ?? false,
        autoZip: document.getElementById('autoZipToggle')?.checked ?? false,
        quality: document.getElementById('qualitySelect')?.value ?? 'high'
    };

    if (typeof chrome !== 'undefined' && chrome.runtime) {
        chrome.runtime.sendMessage({
            type: 'SET_SETTINGS',
            settings: settings
        });
    }
}

// Load Settings
function loadSettings() {
    if (typeof chrome === 'undefined' || !chrome.runtime) {
        console.log('[Instagram Downloader] Chrome API not available');
        return;
    }

    chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, (settings) => {
        if (chrome.runtime.lastError) {
            console.log('[Instagram Downloader] Background script not ready');
            return;
        }

        if (settings) {
            if (document.getElementById('enableToggle')) {
                document.getElementById('enableToggle').checked = settings.enabled !== false;
            }
            if (document.getElementById('darkModeToggle')) {
                document.getElementById('darkModeToggle').checked = settings.darkMode || false;
            }
            if (document.getElementById('autoZipToggle')) {
                document.getElementById('autoZipToggle').checked = settings.autoZip || false;
            }
            if (document.getElementById('qualitySelect')) {
                document.getElementById('qualitySelect').value = settings.quality || 'high';
            }

            if (settings.darkMode) {
                applyDarkMode(true);
            }
        }
    });
}

// Apply Dark Mode
function applyDarkMode(enable) {
    if (enable) {
        document.documentElement.style.colorScheme = 'dark';
    } else {
        document.documentElement.style.colorScheme = 'light';
    }
}

// Update Select Button State
function updateSelectButtonState() {
    const selectBtn = document.getElementById('selectBtn');
    if (isSelectMode) {
        selectBtn.style.background = 'linear-gradient(135deg, #E1306C 0%, #833AB4 100%)';
        selectBtn.style.color = 'white';
    } else {
        selectBtn.style.background = '';
        selectBtn.style.color = '';
    }
}

console.log('[Instagram Downloader] Popup loaded - Advanced version');
