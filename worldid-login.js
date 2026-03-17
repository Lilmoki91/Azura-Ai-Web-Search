// ==============================================
// 🌐 AZURA AI - WORLD ID LOGIN (VERSI SEBENAR)
// ==============================================

const APP_ID = 'app_16b861659b5f66f3fc33d9d515a82f80';
const ACTION = 'azura_login';
const DEBUG = true;

function log(...args) { if (DEBUG) console.log('🔐 [WorldID]:', ...args); }

function saveWorldID(proof) {
  log('✅ Proof diterima!', proof);
  localStorage.setItem('world_verified', 'true');
  localStorage.setItem('world_nullifier', proof.nullifier_hash);
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  setTimeout(() => alert('✅ Selamat datang!'), 100);
}

function isWorldIDVerified() {
  return localStorage.getItem('world_verified') === 'true';
}

function loadIDKit() {
  return new Promise((resolve, reject) => {
    if (window.IDKitWidget) { resolve(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@worldcoin/idkit@1.4.1/dist/idkit.umd.min.js';
    script.onload = resolve;
    script.onerror = () => reject('Gagal muat IDKit');
    document.head.appendChild(script);
  });
}

async function initWorldIDLogin() {
  if (isWorldIDVerified()) { document.getElementById('searchSection').style.display = 'block'; return; }
  try { await loadIDKit(); } catch { alert('Gagal muat IDKit'); return; }

  const div = document.createElement('div');
  div.id = 'loginBox';
  div.innerHTML = `
    <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); display:flex; align-items:center; justify-content:center; z-index:10000;">
      <div style="background:#1a1f2e; padding:40px; border-radius:20px; border:2px solid #007AFF; text-align:center; max-width:400px; width:90%;">
        <h2 style="color:white;">🌐 Azura AI</h2>
        <p style="color:#94a3b8; margin:30px 0;">Sahkan dengan World ID</p>
        <button id="loginBtn" style="padding:15px 40px; background:linear-gradient(135deg,#667eea,#764ba2); color:white; border:none; border-radius:50px; width:100%;">🔓 Login</button>
      </div>
    </div>
  `;
  document.body.appendChild(div);

  document.getElementById('loginBtn').onclick = () => {
    if (!window.IDKitWidget) { alert('Widget tak sedia'); return; }
    new window.IDKitWidget({
      app_id: APP_ID,
      action: ACTION,
      signal: 'azura_user',
      onSuccess: (proof) => { div.remove(); saveWorldID(proof); }
    }).open();
  };
}

if (!isWorldIDVerified()) {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initWorldIDLogin);
  else initWorldIDLogin();
} else {
  document.getElementById('searchSection').style.display = 'block';
}
