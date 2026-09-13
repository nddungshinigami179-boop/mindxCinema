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

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

function logout() {
    const confirmLogout =
        confirm("Bạn có muốn đăng xuất không?");
    if (confirmLogout) {
        window.location.href =
            "login.html";
    }
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