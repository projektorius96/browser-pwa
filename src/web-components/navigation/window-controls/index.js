const URL_SEPERATOR = new RegExp('\u{002F}').source.at(-1);
const window_controls = String(import.meta.url.split(URL_SEPERATOR).at(-2));
const button = HTMLButtonElement.name.slice(4,-7).toLocaleLowerCase();

customElements.define(window_controls, 
    class extends HTMLButtonElement {
        constructor(symbol){
            super()
            this.textContent = symbol;
            this.style.padding = "0.5em";
            return this;
        }
    },
    {
        extends: button
    })
    
    const button_minimize = Reflect.construct(customElements.get(window_controls), [RegExp('\u{1F5D5}').source])
    // # eventually will be replace by external chrome.runtime.send
        /* button_minimize.addEventListener('click', __preload__toolbarControls.minimize.bind()) */
    const button_close = Reflect.construct(customElements.get(window_controls), [RegExp('\u{1F5D9}').source])
    // # eventually will be replace by external chrome.runtime.send
        /* button_close.addEventListener('click', window.close.bind()) */
    const button_maximize = Reflect.construct(customElements.get(window_controls), [RegExp('\u{1F5D6}').source])
    // # eventually will be replace by external chrome.runtime.send
        // let isMinimizedReady = false;
        // button_maximize.addEventListener('click', ()=>{
        //     isMinimizedReady = !isMinimizedReady;
        //     if (isMinimizedReady){
        //         window.resizeTo(800, 600)
        //     }
        //     else {
        //         window.resizeTo(screen.availWidth, screen.availHeight)
        //     }
        // })
    
    const nav = document.body.children[window_controls];
    const nav$css = new CSSStyleSheet();
        nav$css.insertRule(`
            #${window_controls} {
                width: 100%;
                display: flex;
                justify-content: flex-end;
                background-color: #efefef;
            }
    `)
    
    nav.append(
        button_minimize,
        button_maximize,
        button_close,
    )

    document.adoptedStyleSheets.push(
        nav$css
    )