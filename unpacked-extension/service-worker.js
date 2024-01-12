chrome.runtime.onMessageExternal.addListener(
    function (message, sender, sendResponse) {
        switch (message.WindowState) {
            case 'maximized':
                chrome.windows.getCurrent(function (currentWindow) {
                    chrome.windows.update(currentWindow.id, { state: message.WindowState });
                    if (currentWindow.state === ("normal" || "minimized")){
                        sendResponse({requestFullscreen: "requestFullscreen"})
                    }
                })
            break;
            case 'minimized':
                chrome.windows.getCurrent(function (currentWindow) {
                    chrome.windows.update(currentWindow.id, { state: message.WindowState });
                })
            break;
            case 'closed':
                chrome.windows.getCurrent(function (currentWindow) {
                    // DEV_NOTE # it considers that whole application lifecycle manifests within single tab
                    chrome.windows.remove(currentWindow.id)
                });
            break;
        }
    }
);