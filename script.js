document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('/login', {
                email: email,
                password: password
            });

            const token = response.data;

            localStorage.setItem('auth-token', token);
            window.location.href = '/'; // Перенаправлення на головну сторінку
        } catch (error) {
            errorMessage.innerText = error.response.data;
        }
    });
});
