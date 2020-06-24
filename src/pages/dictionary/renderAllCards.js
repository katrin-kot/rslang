
import { renderCard } from './renderCard';

export async function renderAllCards(content, settings) {
  const fragment = document.createDocumentFragment();
  const wordsCount = document.createElement('div');
  wordsCount.classList.add('row');
  wordsCount.innerHTML = `<h4>Всего слов: ${content.length}</h4> <a class="btn primary" href="#" role="button">Перейти к изучению</a>`;
  fragment.appendChild(wordsCount);
  content.forEach(async (elem) => {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    wordCard.classList.add('row');
    const card = renderCard(elem, settings);
    wordCard.appendChild(card);
    fragment.appendChild(wordCard);
  });
  return fragment;
}
