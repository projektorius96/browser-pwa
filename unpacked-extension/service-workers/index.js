import { getCurrentTabId } from "./handlers.js";

/* === IGNORE === */
    ///* CONSIDERATIONS
    // ....................    | ............... | currentWindow.state
    // ----------------------------------------------------------------|
    // IF CURRENTLY WINDOW IS  |   MINIMIZED     | "normal" (or "minimized" if .getCurrent was called from console)
    // IF CURRENTLY WINDOW IS  |   MAXIMIZED     | "maximized"
    // IF CURRENTLY WINDOW IS  |   FULLSCREEN    | "fullscreen"

    // OTHER CONSIDERATIONS:
    // - in PWA FULLSCREEN MODE, FULLSCREEN IS EQUIVALENT TO MAXIMIZED, however (see next line)
    // -- if I leave FULLSCREEN to MAXIMIZED     | Browser window controls must be detached from DOM
    // */
/* === IGNORE === */
chrome.action.onClicked.addListener(async (e)=>{
    // chrome.windows.getCurrent({populate: true}, ({tabs})=>{
    //     if (tabs[0].active){
    //         chrome.tabs.sendMessage(tabs[0].id, {fullscreenReady: true})
    //     }
    // })
    const TabId = await getCurrentTabId()
    chrome.tabs.sendMessage(TabId, {fullscreenReady: true})
    chrome.windows.update(e.windowId, { state: 'fullscreen' })
})

/* chrome.runtime.onMessageExternal.addListener( */
chrome.runtime.onMessage.addListener(
    function (message, sender) {

        chrome.windows.getCurrent(
            function(currentWindow){

                switch (true) {
                    
                    case ((currentWindow.state === 'maximized') && (message.WindowState === 'maximized')):
                        chrome.windows.update(currentWindow.id, { state: 'fullscreen' /* := .requestFullscreen() */ })
                        break;
                    case (((currentWindow.state === 'fullscreen') || currentWindow.state === 'normal') && (message.WindowState === 'maximized')):
                        chrome.windows.update(currentWindow.id, { state: message.WindowState /* := .exitFullscreen() */ })
                        chrome.tabs.sendMessage(sender.tab.id, {fullscreenReady: false})
                        break;
                    
                    case ((currentWindow.state === 'fullscreen' || 'normal') && (message.WindowState === 'minimized')):
                        chrome.windows.update(currentWindow.id, { state: message.WindowState})
                        chrome.tabs.sendMessage(sender.tab.id, {fullscreenReady: false})
                        break;
                    
                    case (currentWindow.state && (message.WindowState === 'closed')):
                        chrome.windows.remove(currentWindow.id /* := window.close() */)
                        break;
                    
                }

        });

});