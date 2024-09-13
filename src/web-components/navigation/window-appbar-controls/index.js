import { getImplname } from "./utils";

const
    /* DEV_NOTE (!) # EXTENSION_ID IS SUBJECT TO CHANGE */
    EXTENSION_ID = "kohicjhpajoobildgpddgiemglkdijaj"
    ,
    URL_SEPERATOR = new RegExp('\u{002F}').source.at(-1)
    ,
    FILE_NAMESPACE = String(import.meta.url.split(URL_SEPERATOR).at(-2))
    ;

customElements.define(FILE_NAMESPACE, class extends HTMLButtonElement {

        #theme = "#efefef"

        constructor( appbar_symbol_or_emoji ){

            if ( super() ){

                this.style.cssText = /* style */`
                    margin: 0.5em;
                    margin-top: 0;
                    padding: 0.5em;
                    border: none;
                    outline: none;
                    background-color: ${this.#theme};
                `;

                this.textContent = appbar_symbol_or_emoji;

            }
            
            return this;

        }

        connectedCallback(){

            this.parentElement.style.cssText = /* style */`
                width: 100%;
                display: flex;
                justify-content: flex-end;
                background-color: ${this.#theme};
                position: relative !important;
                top: 0;
                left: 0;
            `;
            
        }

    }
    ,
    {
        extends: getImplname( HTMLButtonElement )
    }
);
    
const button_minimize = Reflect.construct( customElements.get(FILE_NAMESPACE), [ RegExp('\u{1F5D5}').source ] );
    button_minimize.addEventListener('click', ()=> chrome.runtime.sendMessage( EXTENSION_ID, {WindowState: "minimized"} ) );

const button_close = Reflect.construct( customElements.get(FILE_NAMESPACE), [ RegExp('\u{1F5D9}').source ] );
    button_close.addEventListener('click', ()=> chrome.runtime.sendMessage( EXTENSION_ID, {WindowState: "closed"} ) );

const button_maximize = Reflect.construct( customElements.get(FILE_NAMESPACE), [ RegExp('\u{1F5D6}').source ] );
    button_maximize.addEventListener('click', ()=> chrome.runtime.sendMessage( EXTENSION_ID, {WindowState: "maximized"} ) );

const nav = document.body.children[FILE_NAMESPACE];
    nav.append(button_minimize, button_maximize, button_close);

/* === EXPERIMENTAL-PSEUDO-CURSOR (FULLSCREEN MODE) === */
    let i = null;
    document.body.addEventListener('click', async () => {
        await document.getElementById('window-appbar-controls').requestPointerLock();
        await document.documentElement.requestFullscreen()

        if( !document.querySelector('#pseudo-cursor') ){
            i?.remove();
            i = document.createElement('i');
                i.id = 'pseudo-cursor';
                i.style.cssText = /* style */`
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: transparent;
                `;
            i.textContent = '👆';
        }
        document.body.insertAdjacentElement('beforeend', i)

        let [mX, mY] = [0, 0];
        document.addEventListener('mousemove', (event) => {
            mX += event.movementX;
            mY += event.movementY;

            i !== null ? i.style.transform = `translate(${mX}px, ${mY}px)` : false; 
        });

    });
/* === EXPERIMENTAL-PSEUDO-CURSOR (FULLSCREEN MODE) === */
    