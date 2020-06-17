import './stats.css'
import {layoutGrid} from './components/layout'
import {header} from './components/header'

const body = document.querySelector('body');
body.appendChild(layoutGrid([header()]));

