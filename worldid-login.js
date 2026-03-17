// ==============================================
// 🌐 AZURA AI - WORLD ID (VERSI POWER)
// ==============================================

const APP_ID = 'app_16b861659b5f66f3fc33d9d515a82f80';
const ACTION = 'azura_login';
const DEBUG = true;

function log(...args) { if (DEBUG) console.log('🔐 [WorldID]:', ...args); }

// Simpan bukti login
function saveWorldID(proof) {
  log('✅ Proof diterima!', proof);
  localStorage.setItem('world_verified', 'true');
  localStorage.setItem('world_nullifier', proof.nullifier_hash);
  
  if (typeof window.showSearchUI === 'function') {
    window.showSearchUI();
  } else {
    document.getElementById('searchSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'none';
  }
  
  setTimeout(() => alert('✅ Selamat datang ke Azura AI!'), 100);
}

function isWorldIDVerified() {
  return localStorage.getItem('world_verified') === 'true';
}

// Muat IDKit dari CDN (PASTI ADA)
function loadIDKit() {
  return new Promise((resolve, reject) => {
    if (window.IDKitWidget) {
      log('✅ IDKit already loaded');
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@worldcoin/idkit@1.4.1/dist/idkit.umd.min.js';
    script.onload = () => {
      log('✅ IDKit loaded');
      resolve();
    };
    script.onerror = () => {
      reject(new Error('Gagal muat IDKit'));
    };
    document.head.appendChild(script);
  });
}

// Buat dialog login
async function initWorldIDLogin() {
  log('🚀 Initializing World ID...');
  
  if (isWorldIDVerified()) {
    window.showSearchUI?.();
    return;
  }
  
  try {
    await loadIDKit();
  } catch (e) {
    alert('Gagal muat IDKit. Sila refresh.');
    return;
  }
  
  // Container dialog
  const container = document.createElement('div');
  container.id = 'worldid-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.95);
    backdrop-filter: blur(5px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  container.innerHTML = `
    <div style="
      background: linear-gradient(145deg, #1a1f2e, #0f1117);
      padding: 40px;
      border-radius: 20px;
      border: 2px solid #007AFF;
      box-shadow: 0 0 50px rgba(0,122,255,0.5);
      text-align: center;
      max-width: 400px;
      width: 90%;
      position: relative;
    ">
      <h2 style="color: white; margin-bottom: 20px; font-size: 28px;">
        🌐 <span style="color: #007AFF;">Azura AI</span>
      </h2>
      <p style="color: #94a3b8; margin-bottom: 30px; font-size: 16px;">
        Sahkan dengan World ID untuk teruskan
      </p>
      <button id="worldid-login-btn" style="
        padding: 15px 40px;
        font-size: 18px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50px;
        cursor: pointer;
        font-weight: bold;
        width: 100%;
        transition: transform 0.2s;
      ">🔓 Login dengan World ID</button>
      <button id="close-dialog" style="
        position: absolute;
        top: 10px;
        right: 15px;
        background: none;
        border: none;
        color: #ff4444;
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
      ">✕</button>
    </div>
  `;
  
  document.body.appendChild(container);
  
  // Event listeners
  document.getElementById('close-dialog').onclick = () => container.remove();
  
  document.getElementById('worldid-login-btn').onclick = () => {
    if (!window.IDKitWidget) {
      alert('Widget IDKit tak sedia. Cuba refresh.');
      return;
    }
    
    new window.IDKitWidget({
      app_id: APP_ID,
      action: ACTION,
      signal: 'azura_user',
      onSuccess: (proof) => {
        container.remove();
        saveWorldID(proof);
      },
      onError: (error) => {
        console.error('❌ World ID error:', error);
        alert('Ralat: ' + (error.message || 'Sila cuba lagi'));
      }
    }).open();
  };
  
  // Hover effect
  const btn = document.getElementById('worldid-login-btn');
  btn.onmouseover = () => {
    btn.style.transform = 'scale(1.02)';
    btn.style.boxShadow = '0 0 20px #667eea';
  };
  btn.onmouseout = () => {
    btn.style.transform = 'scale(1)';
    btn.style.boxShadow = 'none';
  };
}

// Start
log('🚀 Script dimulakan...');
if (!isWorldIDVerified()) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorldIDLogin);
  } else {
    initWorldIDLogin();
  }
} else {
  window.showSearchUI?.();
}
