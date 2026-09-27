const apiKey = "66618ee30321a9422e704a38b071a3fe";
const baseUrl = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/w500";

const searchQuery = new URLSearchParams(location.search);

const movieId = searchQuery.get("id");
console.log("Movie ID:", movieId);
const videoUrls = {
};

async function loadMovie() {
  if (!movieId) {
    console.error("Không tìm thấy movieId");
    return;
  }
  const movieUrl =
    `${baseUrl}/movie/${movieId}` + `?api_key=${apiKey}` + `&language=vi-VN`;
  try {
    const response = await fetch(movieUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const movie = await response.json();
    const title = movie.title || movie.original_title || "Đang xem phim";
    const watchTitle = document.getElementById("watchTitle");
    if (watchTitle) {
      watchTitle.textContent = title;
    }
    const player = document.getElementById("moviePlayer");

    if (!player) {
      console.error("Không tìm thấy moviePlayer");
      return;
    }

    if (movie.backdrop_path) {
      player.poster = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
    }

    const videoUrl = videoUrls[movieId];

    if (videoUrl) {
      player.src = videoUrl;
      player.load();
    } 
    else {
      const videoContainer = document.querySelector(".video-container");

      if (videoContainer) {
        videoContainer.innerHTML = `
          <p class="video-message">
              Chưa có video cho phim này.
          </p>
        `;
      }
    }
  } 
  catch (error) {
    console.error("Lỗi tải phim:", error);

    const watchTitle = document.getElementById("watchTitle");
    if (watchTitle) {
      watchTitle.textContent = "Không thể tải thông tin phim";
    }
  }
}

document.addEventListener("DOMContentLoaded", loadMovie);