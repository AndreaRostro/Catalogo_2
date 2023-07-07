//LOCAL STORAGE INFO
const actualPage1 = () => {
  return localStorage.getItem('actualPage')
}
const actualLanguage = () => {
  return localStorage.getItem('language')
}

const queryString = () => {
  return localStorage.getItem('valoreRicerca')
}

//GET FILM AND TV SERIES INFO
export const getMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: '5760b95ecb0778cac0b20b6197152aaa'
    },
  };

  try {
    const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?&page='+ actualPage1() + '&language=' + actualLanguage() + '&api_key=5760b95ecb0778cac0b20b6197152aaa', options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

export const getTV = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: '5760b95ecb0778cac0b20b6197152aaa'
    },
  };

  try {
    const response = await fetch('https://api.themoviedb.org/3/trending/tv/day?&page=' + actualPage1() + '&language=' + actualLanguage() + '&api_key=5760b95ecb0778cac0b20b6197152aaa', options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};


//GET FILM E TV SERIES DETAIL
export const getFilmDetail = async (movie_id) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzI3MzY5ZjRhNmY1YTY4ZWJjOWZlNzU3MTY0NTY5MSIsInN1YiI6IjY0OTkzYmZlNmY0M2VjMDExYzYzMTcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GuOloZNoYa7V8qh49k54UDZ67BqctyNsdM2cAL42Oy8'
    }
  };
  
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/' + movie_id + '?language=' + actualLanguage() + '&api_key=5760b95ecb0778cac0b20b6197152aaa', options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export const getTvSeriesDetail = async (series_id) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzI3MzY5ZjRhNmY1YTY4ZWJjOWZlNzU3MTY0NTY5MSIsInN1YiI6IjY0OTkzYmZlNmY0M2VjMDExYzYzMTcxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GuOloZNoYa7V8qh49k54UDZ67BqctyNsdM2cAL42Oy8'
    }
  };
  
  try {
    const response = await fetch('https://api.themoviedb.org/3/tv/' + series_id + '?language=' + actualLanguage() + '&api_key=5760b95ecb0778cac0b20b6197152aaa', options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
//GET FILM DA RICERCA
export const getFilmByResearch = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzYwYjk1ZWNiMDc3OGNhYzBiMjBiNjE5NzE1MmFhYSIsInN1YiI6IjY0OTU4YjY4OTdlYWI0MDE0NjU0MjFjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AcxRTdF_fL6yjp5U4O93UN3wKD_hLodIFN36btDLPZc'
    }
  };
  
  try {
    const response = await fetch('https://api.themoviedb.org/3/search/multi?query=' + queryString() + '&include_adult=false&language=' + actualLanguage() + '&page=1'+ '&api_key=5760b95ecb0778cac0b20b6197152aaa', options);
    const data = await response.json();
    return data
  } catch (err) {
    return console.error(err);
  }
}

//AGGIUNGI AI PREFERITI
export const addToFavorites = async (type, id, add_or_remove) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzYwYjk1ZWNiMDc3OGNhYzBiMjBiNjE5NzE1MmFhYSIsInN1YiI6IjY0OTU4YjY4OTdlYWI0MDE0NjU0MjFjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AcxRTdF_fL6yjp5U4O93UN3wKD_hLodIFN36btDLPZc'
    },
    body: JSON.stringify({"media_type": type, "media_id": id, "favorite": add_or_remove})
  };
  
  try {
    const response = await fetch('https://api.themoviedb.org/3/account/20052640/favorite', options)
    const data = await response.json()
    return data
  } catch (err) {
    return console.error(err)
  }
}

//OTTIENI LISTA PREFERITI
export const getFavoritesMovies = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzYwYjk1ZWNiMDc3OGNhYzBiMjBiNjE5NzE1MmFhYSIsInN1YiI6IjY0OTU4YjY4OTdlYWI0MDE0NjU0MjFjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AcxRTdF_fL6yjp5U4O93UN3wKD_hLodIFN36btDLPZc'
    }
  };
  
  try {
    const response = await fetch('https://api.themoviedb.org/3/account/20052640/favorite/movies?language=en-US&page=1&sort_by=created_at.asc'+ '&api_key=5760b95ecb0778cac0b20b6197152aaa', options)
    const data = await response.json()
    return data
  } catch (err) {
    return console.error(err)
  }
}