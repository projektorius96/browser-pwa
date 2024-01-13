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

        chrome.windows.getCurrent(function(currentWindow){

            // DEV_NOTE # worked, but again buggy behaviour
            // if ((currentWindow.state === 'normal') && (message.WindowState === 'minimized')){
            //     console.log(currentWindow.state, message.WindowState)
            //     chrome.windows.update(currentWindow.id, { state: 'minimized'/* message.WindowState */})
            // }

            switch (true) {
                
                /* [START] TOGGLEABLE FULLSCREEN */
                case ((currentWindow.state === 'maximized') && (message.WindowState === 'maximized')):
                    chrome.windows.update(currentWindow.id, { state: 'fullscreen' /* := .requestFullscreen() */ })
                    break;
                case (currentWindow.state && (message.WindowState === 'maximized')):
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
                    chrome.windows.update(currentWindow.id, { state: /* message.WindowState,  */'normal'})
                    break;
                
                // case ((currentWindow.state === 'normal') && (message.WindowState === 'minimized')):
                //     console.log(123456789)
                // break;
                
                /* [START] WINDOW CLOSING */
                case (currentWindow.state && (message.WindowState === 'closed')):
                    chrome.windows.remove(currentWindow.id /* := window.close() */)
                    break;
                /* WINDOW CLOSING [END] */
            }

    })
});