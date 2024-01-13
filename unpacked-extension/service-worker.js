/* CONSIDERATIONS
....................    | ............... | currentWindow.state
----------------------------------------------------------------|
IF CURRENTLY WINDOW IS  |   MINIMIZED     | "normal" (or "minimized" if .getCurrent was called from console)
IF CURRENTLY WINDOW IS  |   MAXIMIZED     | "maximized"
IF CURRENTLY WINDOW IS  |   FULLSCREEN    | "fullscreen"
*/
/* === IGNORE === */
chrome.runtime.onMessageExternal.addListener(
    function (message, sender, sendResponse) {
        /* === IGNORE === */
            // switch (message.WindowState) {
            //     case 'normal':
            //     case 'maximized':
            //     case 'minimized':
            //     case 'fullscreen':
            //         console.log(message.WindowState)
            // }
        /* === IGNORE === */

        chrome.windows.getCurrent(function(currentWindow){
            /* === IGNORE === */
                ///* sender.tab.windowId === currentWindow.id */
                // chrome.windows.update(sender.tab.windowId, { state: message.WindowState })
                // chrome.windows.remove(currentWindow.id)
            /* === IGNORE === */

            switch (true) {
                // if currentWindow.state not maximized, but we pressing maximized button from webpage, please do the following:
                case ((currentWindow.state === 'maximized') && (message.WindowState === 'maximized')):
                    chrome.windows.update(currentWindow.id, { state: 'fullscreen' })
                    break;
                case ((currentWindow.state == 'fullscreen') && (message.WindowState === 'maximized')):
                    chrome.windows.update(currentWindow.id, { state: 'maximized' })
                    break;
            }

    })
});