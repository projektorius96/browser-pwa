chrome.runtime.onMessageExternal.addListener(
    function (message, sender, sendResponse) {
        switch(message.WindowState){
            case 'maximized':
                chrome.windows.getCurrent(function (currentWindow) {
                    chrome.windows.update(currentWindow.id, { state: message.WindowState });
                })
            case 'minimized':
                chrome.windows.getCurrent(function (currentWindow) {
                    chrome.windows.update(currentWindow.id, { state: message.WindowState });
                })
        }
    }
);