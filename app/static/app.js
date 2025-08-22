document.getElementById('login-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const provider = document.getElementById('provider').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let token = null;
    // For OAuth, you would redirect to provider's login page and get a token
    // Here, we just simulate
    if (provider !== 'username') token = 'demo-token';
    const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, token, username, password })
    });
    const data = await res.json();
    if (data.success) {
        document.getElementById('progress').innerText = 'Welcome! Starting your game...';
        // Start game for user
        const userId = data.user._id || data.user.id;
        await fetch(`/game/start/${userId}`, { method: 'POST' });
        // Show progress
        const progressRes = await fetch(`/user/progress/${userId}`);
        const progressData = await progressRes.json();
        document.getElementById('progress').innerText = `Level: ${progressData.progress.level || 1}, Points: ${progressData.progress.points || 0}`;
    } else {
        document.getElementById('progress').innerText = data.error || 'Login failed.';
    }
});
