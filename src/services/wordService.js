export async function getWordbyId(wordId) {
  const rawResponse = await fetch(
    `https://afternoon-falls-25894.herokuapp.com/words/${wordId}`,
    {
      method: 'GET',
      withCredentials: true,
<<<<<<< HEAD
    },
  );
  return rawResponse.json();
}
=======
    }
  );
  return rawResponse.json();
}

export function getImageUrl(imgLink) {
  return `https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${imgLink}`;
}

export function getAudioUrl(audioLink) {
  return `https://raw.githubusercontent.com/bobrui4anin/rslang-data/master/${audioLink}`;
}
>>>>>>> refactor: delete cycle problem
