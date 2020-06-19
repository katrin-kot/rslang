import './stats.css'
import {layoutGrid} from './components/layout'
import {header} from './components/header'
import {mainBlock} from "./components/mainBlock";

const body = document.querySelector('body');
body.appendChild(layoutGrid([header(),mainBlock()]));

