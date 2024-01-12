chrome.runtime.onMessageExternal.addListener(
    function (message) {
        switch (message.WindowState) {
            case 'maximized':
                chrome.windows.getCurrent(function (currentWindow) {
                    chrome.windows.update(currentWindow.id, { state: message.WindowState });
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