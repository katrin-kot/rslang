import './main.css';
import { header } from '../../components/main/header/header';
import { footer } from '../../components/main/footer/footer';
import { checkUserLogin } from '../../services/verifyUserService';

checkUserLogin();
header();
footer();
