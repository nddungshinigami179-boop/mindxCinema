// ==================== TMDB ====================
const apiKey = '66618ee30321a9422e704a38b071a3fe';
const baseUrl = 'https://api.themoviedb.org/3';
const imgUrl = 'https://image.tmdb.org/t/p/w500';
// ==================== GET MOVIE ID ====================
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
// ==================== FETCH MOVIE ====================
async function fetchMovie() {
    if (!movieId) {
        return;
    }
    try {
        const response = await fetch(
            `${baseUrl}/movie/${movieId}` +
            `?api_key=${apiKey}` +
            `&language=vi-VN`
        );
        if (!response.ok) {
            throw new Error('Không tìm thấy phim');
        }
        const movie = await response.json();
        displayMovie(movie);
        loadTrailer();
    } 
    catch (error) {
        console.error(error);
        document.getElementById('movieTitle').textContent =
            'Không thể tải thông tin phim';
    }
}
// ==================== DISPLAY MOVIE ====================
function displayMovie(movie) {
    const title =
        movie.title ||
        movie.original_title ||
        'Không có tên';
    document.title =
        `${title} - MovieHub`;


    // Poster

    const moviePoster =
        document.getElementById('moviePoster');

    if (movie.poster_path) {

        moviePoster.src =
            `${imgUrl}${movie.poster_path}`;

    }


    // Title

    document.getElementById('movieTitle')
        .textContent = title;


    // Rating

    document.getElementById('movieRating')
        .textContent =
        `⭐ ${movie.vote_average.toFixed(1)}`;


    // Year

    document.getElementById('movieYear')
        .textContent =
        movie.release_date
            ? movie.release_date.substring(0, 4)
            : '';


    // Runtime

    document.getElementById('movieRuntime')
        .textContent =
        movie.runtime
            ? `${movie.runtime} phút`
            : '';


    // Overview

    document.getElementById('movieOverview')
        .textContent =
        movie.overview ||
        'Chưa có thông tin nội dung.';


    // Genres

    const genres =
        movie.genres
            ? movie.genres
                .map(genre => genre.name)
                .join(', ')
            : '';


    document.getElementById('movieGenres')
        .textContent = genres;


    // Language

    document.getElementById('movieLanguage')
        .textContent =
        movie.original_language
            ? movie.original_language.toUpperCase()
            : '--';


    // Watch button

    document.getElementById('watchButton')
        .addEventListener('click', () => {

            window.location.href =
                `watch.html?id=${movie.id}`;

        });
}


// ==================== TRAILER ====================

async function loadTrailer() {

    const trailerContainer =
        document.getElementById(
            'trailerContainer'
        );


    try {

        const response = await fetch(

            `${baseUrl}/movie/${movieId}/videos` +
            `?api_key=${apiKey}` +
            `&language=en-US`

        );


        if (!response.ok) {
            throw new Error('Không lấy được trailer');
        }


        const data =
            await response.json();


        const trailer =
            data.results.find(video =>
                video.site === 'YouTube' &&
                video.type === 'Trailer'
            );


        if (!trailer) {

            trailerContainer.innerHTML = `
                <p>
                    Phim này chưa có trailer.
                </p>
            `;

            return;
        }


        trailerContainer.innerHTML = `

            <iframe
                src="https://www.youtube.com/embed/${trailer.key}"
                title="Trailer"
                allowfullscreen
            >
            </iframe>

        `;

    } catch (error) {

        console.error(error);

        trailerContainer.innerHTML = `
            <p>
                Không thể tải trailer.
            </p>
        `;

    }
}


// ==================== START ====================

document.addEventListener(
    'DOMContentLoaded',
    fetchMovie
);