/* === IGNORE === */
    ///* ASSUMPTIONS
    // .......................... | ............... | currentWindow.state
    // -----------------------------------------------------------------|
    // IF WINDOW IS CURRENTLY IN  |   MINIMIZED     | "normal" or "minimized" iff .getCurrent() was called from the browser's Console
    // IF WINDOW IS CURRENTLY IN  |   MAXIMIZED     | "maximized"
    // IF WINDOW IS CURRENTLY IN  |   FULLSCREEN    | "fullscreen"
    // -----------------------------------------------------------------|
    // OTHER NOTES:
    // - in PWA is in FULLSCREEN MODE, FULLSCREEN IS EQUIVALENT TO 'MAXIMIZED', however... (see next line)
    //   - ..if I leave FULLSCREEN to MAXIMIZED  | , then the browser's window appbar controls must be detached from DOM
    // */
/* === IGNORE === */

chrome.runtime.onMessageExternal.addListener(
    function ( message ) {

        chrome.windows.getCurrent(
            function( currentWindow ){

                switch (true) {
                    
                    case ( (currentWindow.state === 'maximized') && (message.WindowState === 'maximized') ):
                        chrome.windows.update(currentWindow.id, { state: 'fullscreen' /* := .requestFullscreen() */ })
                        break;
                    case ( ((currentWindow.state === 'fullscreen') || currentWindow.state === 'normal') && (message.WindowState === 'maximized') ):
                        chrome.windows.update(currentWindow.id, { state: message.WindowState /* := .exitFullscreen() */ })
                        break;
                    case ((currentWindow.state === 'fullscreen' || 'normal') && (message.WindowState === 'minimized')):
                        chrome.windows.update(currentWindow.id, { state: message.WindowState})
                        break;
                    case (currentWindow.state && (message.WindowState === 'closed')):
                        chrome.windows.remove(currentWindow.id /* === window.close() */)
                        break;
                    default:
                        break;
                
                }

        });

});