async function checkIP() {
  try {
    const ipResponse = await fetch('https://api.ipify.org?format=json');
    const { ip } = await ipResponse.json();

    const bannedResponse = await fetch('bannedips.json');
    let banned = await bannedResponse.json();

    const resultEl = document.getElementById('result');
    if (banned.includes(ip)) {
      resultEl.innerHTML = `🚫 Your IP <strong>${ip}</strong> is BANNED!`;
      resultEl.style.color = '#ff4444';
    } else {
      resultEl.innerHTML = `✅ Your IP <strong>${ip}</strong> is clean.`;
      resultEl.style.color = '#00ff88';
    }
  } catch (e) {
    document.getElementById('result').innerHTML = 'Error checking IP.';
  }
}

let bannedIPs = [];

async function loadBannedList() {
  try {
    const res = await fetch('bannedips.json?v=' + Date.now());
    bannedIPs = await res.json();
    const listEl = document.getElementById('bannedList');
    listEl.innerHTML = bannedIPs.map(ip => 
      `<li>${ip} <button class="small-btn" onclick="unbanIPFromList('${ip}')">Unban</button></li>`
    ).join('');
  } catch (e) {
    console.error(e);
  }
}

function banIP() {
  const input = document.getElementById('ipInput').value.trim();
  if (!input) return alert('Enter an IP');
  if (bannedIPs.includes(input)) return alert('Already banned');

  bannedIPs.push(input);
  saveBannedListLocally();
  loadBannedList();
  alert(`✅ Banned ${input}`);
}

function unbanIP() {
  const input = document.getElementById('ipInput').value.trim();
  if (!input) return alert('Enter an IP');
  bannedIPs = bannedIPs.filter(ip => ip !== input);
  saveBannedListLocally();
  loadBannedList();
  alert(`✅ Unbanned ${input}`);
}

function unbanIPFromList(ip) {
  bannedIPs = bannedIPs.filter(i => i !== ip);
  saveBannedListLocally();
  loadBannedList();
}

function saveBannedListLocally() {
  // Client-side simulation only
  console.log('Updated banned list (in-memory):', bannedIPs);
  alert('Note: In this static GitHub Pages site, bans are saved only in your current browser session. For permanent changes, edit bannedips.json directly in the repo.');
}

// Load list on page load
window.onload = loadBannedList;