/* CONSIDERATIONS
....................    | ............... | currentWindow.state
----------------------------------------------------------------|
IF CURRENTLY WINDOW IS  |   MINIMIZED     | "normal" (or "minimized" if .getCurrent was called from console)
IF CURRENTLY WINDOW IS  |   MAXIMIZED     | "maximized"
IF CURRENTLY WINDOW IS  |   FULLSCREEN    | "fullscreen"

OTHER CONSIDERATIONS:
- in PWA FULLSCREEN MODE, FULLSCREEN IS EQUIVALENT TO MAXIMIZED, however (see next line)
-- if I leave FULLSCREEN to MAXIMIZED     | Browser window controls must be detached from DOM
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

        const screenConfig = {
            left: 0,
            width: Math.ceil(sender.tab.width / 2), 
            top: 0,
            height: Math.ceil(sender.tab.height / 2) 
        }

        chrome.windows.getCurrent(function(currentWindow){
            /* === IGNORE === */
                ///* sender.tab.windowId === currentWindow.id */
                // chrome.windows.update(sender.tab.windowId, { state: message.WindowState })
                // chrome.windows.remove(currentWindow.id)
            /* === IGNORE === */

            switch (true) {
                
                /* [START] TOGGLEABLE FULLSCREEN */
                case ((currentWindow.state === 'maximized') && (message.WindowState === 'maximized')):
                    chrome.windows.update(currentWindow.id, { state: 'fullscreen' /* := .requestFullscreen() */ })
                    break;
                case (currentWindow.state && (message.WindowState === 'maximized')):
                    // chrome.windows.update(currentWindow.id, { state: message.WindowState /* := .exitFullscreen() */ })
                    if (false);
                    else if (currentWindow.state === 'fullscreen'){
                        chrome.windows.update(currentWindow.id, { state: message.WindowState /* := .exitFullscreen() */ })
                    }
                    else if (currentWindow.state === 'normal'){
                        chrome.windows.update(currentWindow.id, { state: message.WindowState /* := .exitFullscreen() */ })
                    }
                    else;
                    chrome.windows.update(currentWindow.id, { state: message.WindowState /* := .exitFullscreen() */ })
                    break;
                /* TOGGLEABLE FULLSCREEN [END]  */

                /* [START] INTERMEDIATE MINIMIZING STATE MANAGEMENT */
                case ((currentWindow.state === 'fullscreen' || 'maximized') && (message.WindowState === 'minimized')):
                    chrome.windows.update(currentWindow.id, { state: 'normal' , ...screenConfig})
                    break;
                case ((currentWindow.state === 'normal') && (message.WindowState === 'minimized')):
                    console.log("KILMER")
                    chrome.windows.update(currentWindow.id, { state: message.WindowState})
                    break;
                /* INTERMEDIATE MINIMIZING STATE MANAGEMENT [END] */
                

                /* [START] WINDOW CLOSING */
                case (currentWindow.state && (message.WindowState === 'closed')):
                    chrome.windows.remove(currentWindow.id /* := window.close() */)
                    break;
                /* WINDOW CLOSING [END] */
            }

    })
});