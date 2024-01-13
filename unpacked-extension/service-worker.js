/* === IGNORE === */
    // chrome.runtime.onMessageExternal.addListener(
    //     function (message, sender, sendResponse) {
    //         chrome.windows.update(sender.tab.windowId, { state: message.WindowState })
    //         otherwise do /* chrome.windows.remove(currentWindow.id) */
    //     }
    // );
/* === IGNORE === */

/* CONSIDERATIONS
....................    | ............... | currentWindow.state
----------------------------------------------------------------|
IF CURRENTLY WINDOW IS  |   MINIMIZED     | "normal" (or "minimized" if .getCurrent was called from console)
IF CURRENTLY WINDOW IS  |   MAXIMIZED     | "maximized"
IF CURRENTLY WINDOW IS  |   FULLSCREEN    | "fullscreen"
*/
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
            console.log(currentWindow.state)
        })

    }
);