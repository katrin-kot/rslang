import './team.css';
import Member from './Member';
import { members } from './members';
import { createElement } from '../SRgame/helpers';
import { header } from '../../components/main/header/header';
import { footer } from '../../components/main/footer/footer';


const main = createElement('main', 'team');
header();
const container = createElement('div', 'team__container');
const title = createElement('h1', 'team__title', 'Наша команда');
members.forEach((element) => {
  const member = new Member(element);
  container.append(member.createMemberElement());
});
main.append(title);
main.append(container);
document.body.append(main);
footer();
