async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const storedUser = localStorage.getItem(username);
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        const hashedPassword = await hashPassword(password);

        if (userData.password === hashedPassword) {
            alert('Login successful!');
            localStorage.setItem('currentUser', username);
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('message').textContent = 'Incorrect password!';
        }
    } else {
        document.getElementById('message').textContent = 'User not found!';
    }
});