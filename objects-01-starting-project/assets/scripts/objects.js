const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];

const clearAllInputs = () => {
  const userInputSection = document.getElementById("user-input");
  const inputs = userInputSection.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
};

const renderMovies = (filter = "") => {
  const movieListSection = document.getElementById("movie-list");
  movieListSection.innerHTML = "";
  if (movies.length === 0) {
    movieListSection.classList.remove("visible");
    return;
  } else {
    movieListSection.classList.add("visible");
  }
  movieListSection.innerHTML = "";

  const filteredMovies =
    filter === ""
      ? movies
      : movies.filter((moviesIndex) => moviesIndex.info.title.includes(filter));

  filteredMovies.forEach((moviesX) => {
    const movieElement = document.createElement("li");
    const moviesKey = Object.keys(moviesX.info);
    let text = `${moviesX.info.title} -  ${moviesKey[1]}: ${
      moviesX.info[moviesKey[1]]
    }`;
    movieElement.textContent = text;
    movieListSection.append(movieElement);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraValue.trim() === "" ||
    extraName.trim() === ""
  ) {
    return;
  }

  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.floor(Math.random()),
  };

  movies.push(newMovie);
  renderMovies();
  clearAllInputs();
};

const searchHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchHandler);
