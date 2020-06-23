import './dictionary.css';
import {
  getAllDeleteWords,
  getAllHardWords,
  getAllStudyWords,
} from '../../services/userWordService';
import { renderAllCards } from './renderAllCards';

import { getUserID } from '../../services/authService';

const body = document.querySelector('body');
const main = document.createElement('main');
body.appendChild(main);
const userId = getUserID();

const typeWords = [
  {
    name: 'to_study',
    textContent: 'Изучаемые слова',
    selected: 'true',
    dataLoader: 'getAllStudyWords',
  },
  {
    name: 'hard',
    textContent: 'Сложные слова',
    selected: 'false',
    dataLoader: 'getAllHardWords',
  },
  {
    name: 'delete',
    textContent: 'Удаленные слова',
    selected: 'false',
    dataLoader: 'getAllDeleteWords',
  },
];

function renderNavTabs() {
  const nav = document.createElement('div');
  nav.classList.add('nav');
  nav.classList.add('flex-column');
  nav.classList.add('nav-pills');
  nav.setAttribute('id', 'v-pills-tab');
  nav.setAttribute('role', 'tablist');
  nav.setAttribute('aria-orientation', 'vertical');
  typeWords.forEach((elem, idx) => {
    if (idx === 0) {
      nav.innerHTML += `<a class="nav-link active" id="v-pills-${elem.name}-tab" data-toggle="pill" href="#v-pills-${elem.name}" role="tab" data-content =${elem.dataLoader} aria-controls="v-pills-${elem.name}" aria-selected=${elem.selected}>${elem.textContent}</a>`;
    } else {
      nav.innerHTML += `<a class="nav-link" id="v-pills-${elem.name}-tab" data-toggle="pill" href="#v-pills-${elem.name}" role="tab" data-content =${elem.dataLoader} aria-controls="v-pills-${elem.name}" aria-selected=${elem.selected}>${elem.textContent}</a>`;
    }
  });
  return nav;
}

function renderTabContent() {
  const tab = document.createElement('div');
  tab.classList.add('tab-content');
  tab.setAttribute('id', 'v-pills-tabContent');
  typeWords.forEach((elem, idx) => {
    if (idx === 0) {
      tab.innerHTML += `<div class="tab-pane fade show active" id="v-pills-${elem.name}" role="tabpanel" aria-labelledby="v-pills-${elem.name}-tab"></div>`;
    } else {
      tab.innerHTML += `<div class="tab-pane fade" id="v-pills-${elem.name}" role="tabpanel"  aria-labelledby="v-pills-${elem.name}-tab"></div>`;
    }
  });
  return tab;
}
main.innerHTML = `
<div class="row">
  <div class="col-3">
  </div>
  <div class="col-9">
  </div></div>
  
`;
const col = document.querySelector('.col-3');
col.appendChild(renderNavTabs());
const col2 = document.querySelector('.col-9');
col2.appendChild(renderTabContent());

async function initStartContent(user) {
  const content = await getAllStudyWords(user);
  const activeTab = document.querySelector('.show');
  const settings = {
    image: true,
    audio: true,
  };
  const wordsContent = await renderAllCards(content, settings);
  activeTab.innerHTML = '';
  activeTab.appendChild(wordsContent);
}

initStartContent({ userId });

const loaders = {
  getAllStudyWords,
  getAllHardWords,
  getAllDeleteWords,
};

async function initContent(user, name) {
  const content = await loaders[name](user);
  const activeTab = document.querySelector('.show');
  const settings = {
    image: true,
    audio: true,
  };
  const wordsContent = await renderAllCards(content, settings);
  activeTab.innerHTML = '';
  activeTab.appendChild(wordsContent);
}

const navTabs = document.querySelectorAll('.nav-link');
navTabs.forEach((elem) => elem.addEventListener('click', () => initContent({ userId }, elem.dataset.content)));
