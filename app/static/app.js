function selectProvider(provider) {
    document.getElementById('provider').value = provider;
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('email-group').style.display = (provider === 'email' || provider === 'google' || provider === 'apple' || provider === 'x') ? 'block' : 'none';
    document.getElementById('username-group').style.display = (provider === 'username') ? 'block' : 'none';
    document.getElementById('password-group').style.display = (provider === 'username' || provider === 'email') ? 'block' : 'none';
}


document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    let provider = document.getElementById('provider').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const email = document.getElementById('email').value.trim();
    let token = null;
    let url = '/auth/login';

    // If registering, set provider based on which field is filled
    if (provider === 'register') {
        url = '/auth/register';
        if (email) {
            provider = 'email';
        } else if (username) {
            provider = 'username';
        }
    }

    const body = { provider };
    if (email) body.email = email;
    if (username) body.username = username;
    if (password) body.password = password;
    if (token) body.token = token;

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        if (data.success) {
            document.getElementById('progress').innerText = 'Welcome! Starting your game...';
            const userId = data.user.id;
            await fetch(`/game/start/${userId}`, { method: 'POST' });
            const progressRes = await fetch(`/user/progress/${userId}`);
            const progressData = await progressRes.json();
            document.getElementById('progress').innerText = `Level: ${progressData.progress.level || 1}, Points: ${progressData.progress.points || 0}`;
        } else {
            document.getElementById('progress').innerText = data.error || data.detail || 'Login failed.';
        }
    } catch (error) {
        document.getElementById('progress').innerText = 'Error: Unable to connect to server.';
        console.error(error);
    }
});

// Add registration toggle

document.querySelectorAll('.btn-outline-light').forEach(button => {
    button.addEventListener('click', function() {
        const provider = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        // If register button, set provider to 'register' for form logic
        document.getElementById('provider').value = provider === 'register' ? 'register' : provider;
    });
});