const body$css = new CSSStyleSheet();
    body$css.insertRule(/* style */`
        body,
        body * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
    `);

const nav = document.createElement('nav');
nav.id = "window-controls";
const nav$css = new CSSStyleSheet();
const theme = "#efefef";
nav$css.insertRule(/* style */`
    #${nav.id} {
        width: 100%;
        position: absolute;
        z-index: 999;
        display: flex;
        justify-content: flex-end;
        background-color: ${theme};
    }
`)

document.adoptedStyleSheets.push(
    body$css,
    nav$css
)

const btns = [...new Array(3)].map((_, i) => {
    const button = document.createElement('button');
    button.style.cssText = /* style */`
            padding: 0.5em;
            margin: 8px;
            margin-top: 0;
            border: none;
            background-color: ${theme};
        `;
    switch (i) {
        case 0:
            button.id = "minimized";
            button.textContent = RegExp('\u{1F5D5}').source;
            break;
        case 1:
            button.id = "maximized";
            button.textContent = RegExp('\u{1F5D6}').source;
            break;
        case 2:
            button.id = "closed";
            button.textContent = RegExp('\u{1F5D9}').source;
            break;
    }
    nav.appendChild(
        button
    )
    return button;
})

chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (false);
        else if (nav.children.length === btns.length && message?.fullscreenReady === true) {
            document.body.appendChild(nav);

            const EXTENSION_ID = sender.id;
            document.getElementById('minimized').addEventListener('click', () => chrome.runtime.sendMessage(EXTENSION_ID, { WindowState: "minimized" }))
            document.getElementById('maximized').addEventListener('click', () => chrome.runtime.sendMessage(EXTENSION_ID, { WindowState: "maximized" }))
            document.getElementById('closed').addEventListener('click', () => chrome.runtime.sendMessage(EXTENSION_ID, { WindowState: "closed" }))
        }
        else if (nav.children.length === btns.length && message?.fullscreenReady === false) {
            nav.remove()
        }
        else;
    }
)