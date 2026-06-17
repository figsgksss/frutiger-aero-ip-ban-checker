async function checkIP() {
    const resultEl = document.getElementById('result');
    resultEl.innerHTML = 'Checking...';
    
    try {
        // Get public IP
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const { ip } = await ipRes.json();
        
        // Get banned IPs
        const bannedRes = await fetch('bannedips.json');
        const banned = await bannedRes.json();
        
        if (banned.includes(ip)) {
            resultEl.innerHTML = `🚫 BANNED!<br>Your IP: <strong>${ip}</strong>`;
            resultEl.style.color = '#ff4444';
        } else {
            resultEl.innerHTML = `✅ Clean!<br>Your IP: <strong>${ip}</strong>`;
            resultEl.style.color = '#44ff88';
        }
    } catch (err) {
        resultEl.innerHTML = '❌ Error checking IP. Try again later.';
        resultEl.style.color = '#ffaa44';
    }
}