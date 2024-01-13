const URL_SEPERATOR = new RegExp('\u{002F}').source.at(-1);
const window_controls = String(import.meta.url.split(URL_SEPERATOR).at(-2));
const button = HTMLButtonElement.name.slice(4,-7).toLocaleLowerCase();
/* === EXTENSION BROKER CONFIG === */
    const EXTENSION_ID = "cheppmdokkhfjoekoplklmfbaekdpdgk"; /* # EXTENSION_ID IS SUBJECT TO CHANGE !!! */
/* === EXTENSION BROKER CONFIG === */

const nav$css = new CSSStyleSheet();
const theme = "#efefef";
nav$css.insertRule(/* style */`
    #${window_controls} {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        background-color: ${theme};
    }
`)

document.adoptedStyleSheets.push(
    nav$css
)

customElements.define(window_controls, 
    class extends HTMLButtonElement {
        constructor(symbol){
            super()
            this.style.cssText = /* style */`
                padding: 0.5em;
                margin: 8px;
                margin-top: 0;
                border: none;
                background-color: ${theme};
            `;
            this.textContent = symbol;
            return this;
        }
    },
    {
        extends: button
    })
    
    const button_minimize = Reflect.construct(customElements.get(window_controls), [RegExp('\u{1F5D5}').source])
        button_minimize.addEventListener('click', ()=>chrome.runtime.sendMessage(EXTENSION_ID, {WindowState: "minimized"}))
    
    const button_close = Reflect.construct(customElements.get(window_controls), [RegExp('\u{1F5D9}').source])
        button_close.addEventListener('click', ()=>chrome.runtime.sendMessage(EXTENSION_ID, {WindowState: "closed"}))
    
    const button_maximize = Reflect.construct(customElements.get(window_controls), [RegExp('\u{1F5D6}').source])
        button_maximize.addEventListener('click', ()=>chrome.runtime.sendMessage(EXTENSION_ID, {WindowState: "maximized"}))

    const nav = document.body.children[window_controls];

        nav.append(
            button_minimize,
            button_maximize,
            button_close,
        )
    