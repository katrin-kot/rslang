import './stats.css'
import {layoutGrid} from './components/layout'
import {header} from './components/header'
import {mainBlock} from "./components/mainBlock";
import {overallStats} from "./components/overallStats";

const body = document.querySelector('body');
body.appendChild(layoutGrid([header(),mainBlock(),overallStats()]));

