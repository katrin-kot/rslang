export async function getWordbyId(wordId) {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/words/${wordId}`,
    {
      method: 'GET',
      withCredentials: true,
    }
  );
  return rawResponse.json();
}
