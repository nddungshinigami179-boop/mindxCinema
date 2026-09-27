const apiKey = "66618ee30321a9422e704a38b071a3fe";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";

const searchQuery = new URLSearchParams(location.search);

const movieId = searchQuery.get("id");
console.log("Movie ID:", movieId);
const videoUrls = {};