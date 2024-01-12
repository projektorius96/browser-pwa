chrome.runtime.onMessageExternal.addListener(
    function (message, sender, sendResponse) {
        if (message.WindowState === "ping"){
            console.log(message.WindowState)
            sendResponse("pong")
        }
    }
);