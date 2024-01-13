chrome.runtime.onMessageExternal.addListener(
    function (message, sender, sendResponse) {
        switch (message.WindowState) {
            case 'maximized':
                chrome.windows.getCurrent(function (currentWindow) {
                    chrome.windows.update(currentWindow.id, { state: message.WindowState });
                    if (currentWindow.state !== "minimized"){
                        chrome.windows.update(currentWindow.id, { state: 'fullscreen' });
                        /* sendResponse({requestFullscreen: "requestFullscreen"}) */
                    }
                    // ALTERNATIVE B [FAILING] 
                    // if (currentWindow.state === 'normal' || 'minimized'){
                    //     chrome.windows.update(currentWindow.id, { state: 'fullscreen' });
                    // }
                    // else {
                    //     chrome.windows.update(currentWindow.id, { state: 'normal' });
                    // }
                    // ALTERNATIVE C [FAILING]
                    // if(false);
                    // else if (currentWindow.state === message.WindowState){
                    //     chrome.windows.update(currentWindow.id, { state: 'normal' });
                    //     /* sendResponse({requestFullscreen: "requestFullscreen"}) */
                    // }
                    // else if (currentWindow.state !== message.WindowState){
                    //     chrome.windows.update(currentWindow.id, { state: 'fullscreen' });
                    //     /* sendResponse({requestFullscreen: "requestFullscreen"}) */
                    // }
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