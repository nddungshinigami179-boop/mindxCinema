function register(event) {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");

    usernameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let isValid = true;

    if (username.length < 6 || username.length > 18) {
        usernameError.textContent = "Tên người dùng phải từ 6 đến 18 ký tự.";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = "Email không đúng định dạng.";
        isValid = false;
    }

    if (password.length < 8 || password.length > 20) {
        passwordError.textContent = "Mật khẩu phải từ 8 đến 20 ký tự.";
        isValid = false;
    }

    if (confirmPassword !== password) {
        confirmPasswordError.textContent =
            "Mật khẩu xác nhận phải trùng với mật khẩu.";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    const oldUser =
        localStorage.getItem("mindxUser");
    if (oldUser) {
        const user =
            JSON.parse(oldUser);
        if (user.username === username) {
            usernameError.textContent =
                "Tên đăng nhập đã tồn tại.";
            return;
        }
        if (user.email === email) {
            emailError.textContent =
                "Email đã được sử dụng.";
            return;
        }
    }

    const newUser = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem(
        "mindxUser",
        JSON.stringify(newUser)
    );
    alert("Đăng ký thành công!");
    window.location.href = "login.html";
}

function login(event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value.trim();
    const password = document.getElementById("loginPassword").value;
    const usernameError = document.getElementById("loginUsernameError");
    const passwordError = document.getElementById("loginPasswordError");

    usernameError.textContent = "";
    passwordError.textContent = "";

    if (username === "") {
        usernameError.textContent =
            "Vui lòng nhập tên người dùng.";
        return;
    }

    if (password === "") {
        passwordError.textContent =
            "Vui lòng nhập mật khẩu.";
        return;
    }

    const savedUser =
        localStorage.getItem("mindxUser");
    if (!savedUser) {
        usernameError.textContent =
            "Tài khoản chưa được đăng ký.";
        return;
    }

    const user =
        JSON.parse(savedUser);
    if (username !== user.username) {
        usernameError.textContent =
            "Tên người dùng không chính xác.";
        return;
    }
    if (password !== user.password) {
        passwordError.textContent =
            "Mật khẩu không chính xác.";
        return;
    }
    alert(
        "Đăng nhập thành công! Chào mừng bạn đến MindX Cinema 🎬"
    );
    window.location.href = "index.html";
}

function searchMovie() {
    const input = document.getElementById("searchInput");
    const keyword = input.value.toLowerCase();
    const movies = document.querySelectorAll(".movie-card");

    movies.forEach(function(movie) {
        const title =
            movie.querySelector("h3")
                .textContent
                .toLowerCase();
        if (title.includes(keyword)) {
            movie.style.display = "block";
        }
        else {
            movie.style.display = "none";
        }
    });
}

const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        const confirmLogout = confirm(
            'Bạn có chắc chắn muốn đăng xuất không?'
        );
        if (confirmLogout) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('user');
            alert('Bạn đã đăng xuất!');
            window.location.href = 'login.html';
        }
    });
}

fetch('https://6aa61818d7765db985072b90.mockapi.io/food', {
  method: 'GET',
  headers: {'content-type':'application/json'},
}).then((res) => {
    console.log(res)
  if (res.ok) {
    return res.json();
  }
}).then((tasks) => {
    console.log(tasks)
}).catch((error) => {
    console.log(error)
})

const apiKey = '66618ee30321a9422e704a38b071a3fe'
const baseUrl = 'https://api.themoviedb.org/3';
const imgUrl = 'https://image.tmdb.org/t/p/w500';
const backdropUrl = 'https://image.tmdb.org/t/p/original';

const trendingUrl = `${baseUrl}/trending/movie/day` + `?api_key=${apiKey}` + `&language=vi-VN`;
const popularUrl = `${baseUrl}/movie/popular` + `?api_key=${apiKey}` + `&language=vi-VN&page=1`;
const topRatedUrl = `${baseUrl}/movie/top_rated` + `?api_key=${apiKey}` + `&language=vi-VN&page=1`;
const upcomingUrl = `${baseUrl}/movie/upcoming` + `?api_key=${apiKey}` + `&language=vi-VN&page=1`;
const nowPlayingUrl =`${baseUrl}/movie/now_playing` + `?api_key=${apiKey}` + `&language=vi-VN&page=1`;

const trendingContainer = document.getElementById('trendingMovies');
const popularContainer = document.getElementById('popularMovies');
const topRatedContainer = document.getElementById('topRatedMovies');
const upcomingContainer = document.getElementById('upcomingMovies');
const nowPlayingContainer = document.getElementById('nowPlayingMovies');

async function fetchMovies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }
        const data = await response.json();
        return data.results || [];
    } 
    catch (error) {
        console.error(
            'API Error:',
            error
        );
        return [];
    }
}

function displayMovies(movies, container) {
    if (!container) {
        console.error("Không tìm thấy container!");
        return;
    }
    container.innerHTML = '';
    if (!movies || movies.length === 0) {
        container.innerHTML = `
            <div class="loading">
                Không có dữ liệu phim.
            </div>
        `;
        return;
    }
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        const title =
            movie.title ||
            movie.original_title ||
            'Không có tên';
        const poster =
            movie.poster_path
                ? `${imgUrl}${movie.poster_path}`
                : 'https://via.placeholder.com/500x750?text=No+Image';
        const rating =
            movie.vote_average
                ? movie.vote_average.toFixed(1)
                : 'N/A';
        const year =
            movie.release_date
                ? movie.release_date.substring(0, 4)
                : '';
        card.innerHTML = `
            <img
                src="${poster}"
                alt="${title}"
                loading="lazy"
            >
            <div class="movie-info">
                <h3 class="movie-title">
                    ${title}
                </h3>
                <div class="movie-bottom">
                    <span class="rating">
                        ★ ${rating}
                    </span>
                    <span class="date">
                        ${year}
                    </span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function displayHero(movie) {
    if (!movie) return;
    const title = movie.title || movie.original_title || 'Phim nổi bật';
    document.getElementById('heroTitle').textContent = title;
    document.getElementById('heroRating').textContent =`⭐ ${movie.vote_average.toFixed(1)}`;
    document.getElementById('heroDate').textContent =
        movie.release_date
            ? movie.release_date.substring(0, 4)
            : '';
    document.getElementById('heroDescription').textContent = movie.overview || 'Khám phá bộ phim đang được yêu thích.';
    if (movie.backdrop_path) {
        document.getElementById('hero').style.backgroundImage = `url("${backdropUrl}${movie.backdrop_path}")`;
    }
}

async function loadTrending() {
    const movies = await fetchMovies(trendingUrl);
    displayMovies(movies, trendingContainer);
    if (movies.length > 0) {displayHero(movies[0]);}
}

async function loadPopular() {
    const movies = await fetchMovies(popularUrl);
    displayMovies(movies, popularContainer);
}

async function loadTopRated() {
    const movies = await fetchMovies(topRatedUrl);
    displayMovies(movies, topRatedContainer);
}

async function loadUpcoming() {
    const movies = await fetchMovies(upcomingUrl);
    displayMovies(movies, upcomingContainer);
}

async function loadNowPlaying() {
    const movies = await fetchMovies(nowPlayingUrl);
    displayMovies(movies, nowPlayingContainer);
}

async function searchMovies(keyword) {
    if (!keyword.trim()) return;
    const url =
        `${baseUrl}/search/movie` +
        `?api_key=${apiKey}` +
        `&language=vi-VN` +
        `&query=${encodeURIComponent(keyword)}`;
    const movies = await fetchMovies(url);
    const resultSection = document.getElementById('searchResultSection');
    const resultContainer = document.getElementById('searchResults');
    const resultText = document.getElementById('searchResultText');
    resultSection.style.display = 'block';
    resultText.textContent = `Tìm thấy ${movies.length} kết quả cho "${keyword}"`;
    displayMovies(movies, resultContainer);
    resultSection.scrollIntoView({
        behavior: 'smooth'
    });
}

const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');
searchBtn.addEventListener(
    'click',
    () => {
        searchBox.classList.toggle('show');
    }
);

const searchSubmit = document.getElementById('searchSubmit');
const searchInput = document.getElementById('searchInput');
searchSubmit.addEventListener(
    'click',
    () => {
        searchMovies(
            searchInput.value
        );
    }
);

searchInput.addEventListener(
    'keydown',
    event => {
        if (event.key === 'Enter') {
            searchMovies(searchInput.value);
        }
    }
);

const tabs = document.querySelectorAll('.tabs button');
tabs.forEach(tab => {
    tab.addEventListener(
        'click',
        async () => {
            tabs.forEach(item => {
                item.classList.remove('active');
            });
            tab.classList.add('active');
            const isWeek = tab.textContent.includes('Tuần');
            const url =
                `${baseUrl}/trending/movie/` +
                `${isWeek ? 'week' : 'day'}` +
                `?api_key=${apiKey}` +
                `&language=vi-VN`;
            const movies = await fetchMovies(url);
            displayMovies(movies, trendingContainer);
        }
    );
});

document.addEventListener(
    'DOMContentLoaded',
    () => {
        loadTrending();
        loadPopular();
        loadTopRated();
        loadUpcoming();
        loadNowPlaying();
    }
);