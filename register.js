async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    if (localStorage.getItem(newUsername)) {
        document.getElementById('registerMessage').textContent = 'Username already exists!';
    } else {
        const hashedPassword = await hashPassword(newPassword);
        const userData = { username: newUsername, password: hashedPassword };
        localStorage.setItem(newUsername, JSON.stringify(userData));
        alert('Registration successful! Please log in.');
        window.location.href = 'index.html';
    }
});