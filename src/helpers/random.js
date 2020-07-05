function randomNumHelper(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function randomUserWords(arr, wordsPerPage) {
  const rNum = randomNumHelper(0, arr.length - wordsPerPage);
  const randomWords = arr.slice(rNum, rNum + wordsPerPage);
  randomWords.forEach((word) => ({ ...word, isLearned: true }));
  return randomWords;
}
