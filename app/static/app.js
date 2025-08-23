function selectProvider(provider) {
    document.getElementById('provider').value = provider;
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('email-group').style.display = (provider === 'email' || provider === 'google' || provider === 'apple' || provider === 'x') ? 'block' : 'none';
    document.getElementById('username-group').style.display = (provider === 'username') ? 'block' : 'none';
    document.getElementById('password-group').style.display = (provider === 'username' || provider === 'email') ? 'block' : 'none';
}

document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const provider = document.getElementById('provider').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const email = document.getElementById('email').value.trim();
    let token = null;
    if (provider !== 'username' && provider !== 'email' && email) token = 'demo-token';

    const body = { provider };
    if (email) body.email = email;
    if (username) body.username = username;
    if (password) body.password = password;
    if (token) body.token = token;

    try {
        const res = await fetch('/auth/login', {
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