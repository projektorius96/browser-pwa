chrome.runtime.onMessageExternal.addListener(
    function (message, sender, sendResponse) {
        if (message.WindowState === "ping"){
            sendResponse("pong")
        }
    }
);