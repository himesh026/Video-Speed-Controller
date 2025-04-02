document.addEventListener("DOMContentLoaded", () => {
    const speedSelect = document.getElementById("speed");

    // Load previously set speed
    chrome.storage.sync.get("speed", (data) => {
        if (data.speed) {
            speedSelect.value = data.speed.toString();
        }
    });

    document.getElementById("setSpeed").addEventListener("click", () => {
        const speed = speedSelect.value;
        
        // Save speed
        chrome.storage.sync.set({ speed: speed });

        // Apply speed to video
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { speed: parseFloat(speed) });
        });

        // Close popup
        window.close();
    });
});
