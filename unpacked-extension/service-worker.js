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
    function (message) {

        chrome.windows.getCurrent(
            function(currentWindow){

                switch (true) {
                    
                    case ((currentWindow.state === 'maximized') && (message.WindowState === 'maximized')):
                        chrome.windows.update(currentWindow.id, { state: 'fullscreen' /* := .requestFullscreen() */ })
                        break;
                    case (((currentWindow.state === 'fullscreen') || currentWindow.state === 'normal') && (message.WindowState === 'maximized')):
                        chrome.windows.update(currentWindow.id, { state: message.WindowState /* := .exitFullscreen() */ })
                        break;
                    
                    case ((currentWindow.state === 'fullscreen' || 'normal') && (message.WindowState === 'minimized')):
                        chrome.windows.update(currentWindow.id, { state: message.WindowState})
                        break;
                    
                    case (currentWindow.state && (message.WindowState === 'closed')):
                        chrome.windows.remove(currentWindow.id /* := window.close() */)
                        break;
                    
                }

        });
});