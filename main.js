import './global.css';
import './src/web-components/navigation/window-appbar-controls/index.js';
import { name } from './package.json';

document.addEventListener('DOMContentLoaded', ()=>{
    document.title = name;
})

/* === */

document.body.addEventListener('click', function(){
    document.documentElement.requestFullscreen();
    this.addEventListener('mousemove', (e)=>{
        if (document.fullscreenElement && e.clientY <= 8) {
            this.requestPointerLock() ;
        }
        if (document.pointerLockElement === this && e.clientY > 8){
            document.exitPointerLock();
        }
    });
});