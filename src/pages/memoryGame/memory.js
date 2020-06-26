import './memory.css';
import difficultOptions from '../../components/main/difficultOptions/difficultOptions';

const body = document.querySelector('body');
const form = difficultOptions();
body.appendChild(form);
