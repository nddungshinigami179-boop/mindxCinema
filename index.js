function register(event) {
    event.preventDefault();

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
        alert("Mật khẩu nhập lại không giống nhau!");
        return;
    }
    const oldUser = localStorage.getItem("mindxUser");
    if (oldUser) {
        const user =
            JSON.parse(oldUser);
        if (user.username === username) {
            alert("Tên đăng nhập đã tồn tại!");
            return;
        }
    }

    const newUser = {
        username: username,
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

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const savedUser = localStorage.getItem("mindxUser");
    if (!savedUser) {
        alert("Bạn chưa có tài khoản!");
        return;
    }
    const user =
        JSON.parse(savedUser);
    if (
        username === user.username &&
        password === user.password
    ) {
        alert(
            "Đăng nhập thành công! Chào mừng bạn đến MindX Cinema"
        );
    } else {
        alert(
            "Tên đăng nhập hoặc mật khẩu không chính xác!"
        );
    }
}