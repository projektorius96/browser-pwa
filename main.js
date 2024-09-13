import './global.css';
import './src/web-components/navigation/window-appbar-controls/index.js';
import { name } from './package.json';

document.addEventListener('DOMContentLoaded', ()=>{
    document.title = name;
})