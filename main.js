import './global.css';
import './src/web-components/navigation/window-appbar-controls/index.js';
import { name } from './package.json';

document.addEventListener('DOMContentLoaded', ()=>{
    document.title = name;
})

/* === */

/**
 * @type
 * 
 * Arbitrary margin
 */
let marginTop = 8;
document.body.addEventListener('click', function(){
    /* document.documentElement.requestFullscreen(); */
    this.addEventListener('mousemove', (e)=>{
        if (/* document.fullscreenElement &&  */e.clientY <= marginTop) {
            this.requestPointerLock() ;
        }
        if (document.pointerLockElement === this && e.clientY > marginTop){
            document.exitPointerLock();
        }
    });
});