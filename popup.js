// Popup Script - Instagram Downloader

let isExtensionEnabled = true;
let isDarkMode = false;
let isSelectMode = false;

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
    initializeSettings();
    setupEventListeners();
    loadSettings();
});

// Setup Event Listeners
function setupEventListeners() {
    document.getElementById('downloadBtn').addEventListener('click', downloadCurrentMedia);
    document.getElementById('selectBtn').addEventListener('click', toggleSelectMode);
    document.getElementById('downloadZipBtn').addEventListener('click', downloadAsZip);

    document.getElementById('enableToggle').addEventListener('change', (e) => {
        isExtensionEnabled = e.target.checked;
        saveSettings();
    });

    document.getElementById('darkModeToggle').addEventListener('change', (e) => {
        isDarkMode = e.target.checked;
        applyDarkMode(isDarkMode);
        saveSettings();
    });

    document.getElementById('autoDownloadToggle').addEventListener('change', (e) => {
        saveSettings();
    });
}

// Download current media
async function downloadCurrentMedia() {
    try {
        showStatus('🔄 Detecting media...', 'info');

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab.url.includes('instagram.com')) {
            showStatus('⚠️ Please open Instagram first', 'error');
            return;
        }

        chrome.tabs.sendMessage(tab.id, { type: 'GET_MEDIA' }, (response) => {
            if (chrome.runtime.lastError) {
                showStatus('❌ Content script not loaded. Refresh the page.', 'error');
                return;
            }

            if (!response || !response.urls || response.urls.length === 0) {
                showStatus('❌ No media found on this page', 'error');
                return;
            }

            const count = response.urls.length;
            showStatus(`✅ Found ${count} media item(s). Downloading...`, 'success');

            chrome.runtime.sendMessage({
                type: 'DOWNLOAD',
                urls: response.urls,
                quality: 'high'
            });

            setTimeout(() => {
                showStatus(`✅ ${count} item(s) queued for download!`, 'success');
            }, 1500);
        });
    } catch (error) {
        console.error('Error:', error);
        showStatus('❌ Error downloading media', 'error');
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
                showStatus('❌ Content script not loaded', 'error');
                return;
            }

            isSelectMode = response.selectMode;
            updateSelectButtonState();

            if (isSelectMode) {
                showStatus('🎯 Selection mode ON - Click media to select, then download', 'info');
            } else {
                showStatus('🎯 Selection mode OFF', 'info');
            }
        });
    } catch (error) {
        console.error('Error:', error);
        showStatus('❌ Error toggling select mode', 'error');
    }
}

// Download Selected Media
async function downloadSelected() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.tabs.sendMessage(tab.id, { type: 'GET_SELECTED' }, (response) => {
            if (!response || response.urls.length === 0) {
                showStatus('❌ No media selected', 'error');
                return;
            }

            const count = response.urls.length;
            showStatus(`✅ Downloading ${count} selected item(s)...`, 'success');

            chrome.runtime.sendMessage({
                type: 'DOWNLOAD',
                urls: response.urls,
                quality: 'high'
            });
        });
    } catch (error) {
        showStatus('❌ Error downloading selected media', 'error');
    }
}

// Download as ZIP
async function downloadAsZip() {
    try {
        showStatus('🔄 Preparing ZIP...', 'info');

        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!tab.url.includes('instagram.com')) {
            showStatus('⚠️ Please open Instagram first', 'error');
            return;
        }

        chrome.tabs.sendMessage(tab.id, { type: 'GET_MEDIA' }, (response) => {
            if (!response || !response.urls || response.urls.length === 0) {
                showStatus('❌ No media found', 'error');
                return;
            }

            const count = response.urls.length;
            showStatus(`✅ Creating ZIP with ${count} item(s)...`, 'success');

            chrome.runtime.sendMessage({
                type: 'DOWNLOAD',
                urls: response.urls,
                asZip: true,
                filename: `instagram_download_${new Date().toISOString().split('T')[0]}`
            });
        });
    } catch (error) {
        showStatus('❌ Error creating ZIP', 'error');
    }
}

// Show Status Message
function showStatus(message, type = 'info') {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = `status show ${type}`;

    setTimeout(() => {
        statusEl.classList.remove('show');
    }, 4000);
}

// Save Settings
function saveSettings() {
    const settings = {
        enabled: document.getElementById('enableToggle').checked,
        darkMode: document.getElementById('darkModeToggle').checked,
        autoDownload: document.getElementById('autoDownloadToggle').checked
    };

    chrome.runtime.sendMessage({
        type: 'SET_SETTINGS',
        settings: settings
    });
}

// Load Settings
function loadSettings() {
    chrome.runtime.sendMessage({ type: 'GET_SETTINGS' }, (settings) => {
        if (settings) {
            document.getElementById('enableToggle').checked = settings.enabled !== false;
            document.getElementById('darkModeToggle').checked = settings.darkMode || false;
            document.getElementById('autoDownloadToggle').checked = settings.autoDownload || false;

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

// Initialize Settings
function initializeSettings() {
    loadSettings();
}

console.log('[Instagram Downloader] Popup loaded');
