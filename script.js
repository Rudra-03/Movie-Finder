const API_URL_SEARCH = "https://www.omdbapi.com/?apikey=f3520eb7&i=";
const API_URL = "https://www.omdbapi.com/?apikey=f3520eb7&s=";

const movieContainer = document.querySelector(".movie-section");
const movieNameInput = document.getElementById("Movie_name");
const searchBtn = document.getElementById("search");
const loader = document.getElementsByClassName("loader")[0];

const displayMovie = (movie_data) => {
  const { Poster, Title, Actors, Language, Year, Runtime, imdbRating,Type } = movie_data;

  const parentDiv = document.createElement("div");
  parentDiv.classList.add("card");

  const imageDiv = document.createElement("div");
  imageDiv.classList.add("image-container");
  const image = document.createElement("img");
  image.src = Poster;
  image.alt = "Movie Poster";
  imageDiv.appendChild(image);

  const textDiv = document.createElement("div");
  textDiv.classList.add("text-container");

  const titleP = document.createElement("h3");
  titleP.textContent = `Title: ${Title}`;

  const actorsP = document.createElement("p");
  actorsP.textContent = `Actors: ${Actors ? Actors : "None"}`;

  const langP = document.createElement("p");
  langP.textContent = `Language : ${Language}`;

  const typeP = document.createElement("p");
  typeP.textContent = `Type : ${Type.substr(0,1).toUpperCase()}${Type.slice(1)}`;

  const yearP = document.createElement("p");
  yearP.textContent = `Released Year: ${Year}`;

  const durationP = document.createElement("p");
  durationP.textContent = `Duration: ${Runtime}s`;

  const ratingP =  document.createElement("p");
  ratingP.textContent = `IMDB Rating: ${imdbRating}/10`;

  textDiv.appendChild(titleP);
  textDiv.appendChild(actorsP);
  textDiv.appendChild(langP);
  textDiv.appendChild(typeP);
  textDiv.appendChild(yearP);
  textDiv.appendChild(durationP);
  textDiv.appendChild(ratingP);

  parentDiv.appendChild(imageDiv);
  parentDiv.appendChild(textDiv);

  movieContainer.appendChild(parentDiv);
};

const clearMovieContainer = () => {
  movieContainer.innerHTML = "";
};

const getMovieData = async (id) => {
  try {
    const response = await fetch(API_URL_SEARCH + id);
    const movie_data = await response.json();
    // console.log(movie_data);
    displayMovie(movie_data);
  } catch (error) {
    console.error("Error fetching movie data:", error);
  }
};

const searchMovie = async () => {
  clearMovieContainer();
  const movieName = movieNameInput.value.trim();
  if (movieName === "") {
    console.log("Please enter a movie name");
    return;
  }

  try {
    const response = await fetch(API_URL + movieName);
    const data = await response.json();
    if (data.Search) {
      // data.Search.sort((a,b)=> {return parseInt(b.Year) - parseInt(a.Year)}); // Sort by IMDB rating in descending order

      data.Search.forEach((movie) => {
        // loader.style.display = 'block';
        getMovieData(movie.imdbID);
      });
    } else {
      console.log(`No movie found with name: ${movieName}`);
    }
    movieNameInput.value = "";
  } catch (error) {
    console.error("Error searching movie:", error);
  }
};

searchBtn.addEventListener("click", searchMovie);
