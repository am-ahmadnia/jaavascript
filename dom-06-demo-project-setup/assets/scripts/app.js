const addMovieModal = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelMovieModal = addMovieModal.querySelector(".btn--passive");
const realAddMovieBtn = cancelMovieModal.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const movies = [];
const entryTextSection = document.getElementById("entry-text");
console.log(entryTextSection);

const deleteMovieHandler = (movieID) => {
  let movieIndex = 0;
  for (const movieX of movies) {
    if (movieX.id === movieID) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
};

const renderNewMovieElement = (title, imageURL, ratingValue) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class='movie-element__image'>
      <img src='${imageURL}' alt='${title}'>
    </div>
    <div class='movie-element__info'>
      <h2>${title}</h2>
      <p>${ratingValue}/5 stars</p>
    </div>
  `;

  newMovieElement.addEventListener("click", deleteMovieHandler);
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const toggleBackdropHandler = () => {
  backdrop.classList.toggle("visible");
};

const toggleMovieModalHandler = () => {
  addMovieModal.classList.toggle("visible");
  toggleBackdropHandler();
};

const cancelAddMovieHandler = () => {
  toggleMovieModalHandler();
  clearMovieInputs();
};

const realAddMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageURL = userInputs[1].value;
  const ratingValue = +userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageURL.trim() === "" ||
    ratingValue < 1 ||
    ratingValue > 5
  ) {
    alert("PLaese enter valid value");
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    img: imageURL,
    rate: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModalHandler();
  clearMovieInputs();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.img,
    newMovie.rate
  );
  updateUI();
};

const clearMovieInputs = () => {
  for (const usrInp of userInputs) {
    usrInp.value = "";
  }
};
startAddMovieBtn.addEventListener("click", toggleMovieModalHandler);
backdrop.addEventListener("click", toggleMovieModalHandler);
cancelMovieModal.addEventListener("click", cancelAddMovieHandler);
realAddMovieBtn.addEventListener("click", realAddMovieHandler);
