function setPlaybackSpeed(speed) {
    const videos = document.getElementsByTagName("video");
    if (videos.length > 0) {
        videos[0].playbackRate = speed;
    }
}

const observer = new MutationObserver(() => {
    const videos = document.getElementsByTagName("video");
    if (videos.length > 0) {
        chrome.storage.sync.get(["speed"], (data) => {
            if (data.speed) {
                setPlaybackSpeed(data.speed);
            }
        });
        observer.disconnect();  // Stop observing once the video is found
    }
});

observer.observe(document.body, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((request) => {
    if (request.speed) {
        setPlaybackSpeed(request.speed);
    }
});
