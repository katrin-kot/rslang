
import { renderCard } from './renderCard';

export async function renderAllCards(content, settings) {
  const fragment = document.createDocumentFragment();
  const wordsCount = document.createElement('div');
  wordsCount.innerHTML = `<h3>Всего слов:${content.length}</h3>`;
  fragment.appendChild(wordsCount);
  content.forEach(async (elem) => {
    const wordCard = document.createElement('div');
    wordCard.classList.add('word-card');
    const card = renderCard(elem, settings);
    wordCard.appendChild(card);
    fragment.appendChild(wordCard);
  });
  return fragment;
}
