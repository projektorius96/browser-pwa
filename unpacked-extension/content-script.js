chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse){
        if (message?.fullscreenReady){
            console.log(message?.fullscreenReady)
            /* CAVEATS TO CONSIDER:
                - nor static, nor dynamic imports works, otherwise I am missing something...
                - prior to content script injection (see for ^link), any web components must be converted to HTML strings due to lack of support for them  
                - ^link@https://developer.chrome.com/docs/extensions/reference/api/action#injecting_a_content_script_on_click
            */
        }
    }
)