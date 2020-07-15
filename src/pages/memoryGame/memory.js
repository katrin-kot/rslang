import './memory.css';
import { renderStartPage } from './startPage';
import { initHandlers } from './initHandlers';
import { checkUserLogin } from '../../services/verifyUserService';

renderStartPage();
initHandlers();
checkUserLogin();
