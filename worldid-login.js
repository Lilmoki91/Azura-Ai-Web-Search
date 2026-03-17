// ==============================================
// 🌐 AZURA AI - WORLD ID 4.0 (PASTI JALAN)
// ==============================================

const WORKER_URL = 'https://azura-ai.khairuldinsuyitno.workers.dev';
const APP_ID = 'app_16b861659b5f66f3fc33d9d515a82f80';
const ACTION = 'azura_login';
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log('🔐 [WorldID]:', ...args);
}

// Simpan bukti login
function saveWorldID(proof) {
  log('✅ Proof diterima!', proof);
  
  localStorage.setItem('world_verified', 'true');
  localStorage.setItem('world_nullifier', proof.nullifier || proof.nullifier_hash);
  
  if (typeof window.showSearchUI === 'function') {
    window.showSearchUI();
  } else {
    document.getElementById('searchSection').style.display = 'block';
    document.getElementById('loginSection').style.display = 'none';
  }
  
  setTimeout(() => {
    alert('✅ World ID verified! Selamat datang ke Azura AI!');
  }, 100);
}

function isWorldIDVerified() {
  return localStorage.getItem('world_verified') === 'true';
}

// Dapatkan RP signature dari worker
async function getRPSignature(action) {
  const response = await fetch(`${WORKER_URL}/api/get-signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  });
  
  if (!response.ok) throw new Error('Gagal dapatkan signature');
  return await response.json();
}

// MUAT IDKIT DARI ESM.RUN - INI YANG PALING PENTING!
async function loadIDKit() {
  return new Promise((resolve, reject) => {
    // Guna esm.run - confirm ada dan cepat
    const script = document.createElement('script');
    script.src = 'https://esm.run/@worldcoin/idkit@1.4.1';
    script.type = 'module';
    
    script.onload = () => {
      log('✅ IDKit loaded dari esm.run');
      resolve();
    };
    
    script.onerror = () => {
      reject(new Error('Gagal muat IDKit'));
    };
    
    document.head.appendChild(script);
  });
}

// Buat butang login
async function initWorldIDLogin() {
  log('🚀 Initializing World ID...');
  
  if (isWorldIDVerified()) {
    window.showSearchUI?.();
    return;
  }
  
  try {
    await loadIDKit();
  } catch (e) {
    alert('Gagal muatkan World ID SDK. Sila refresh halaman.');
    return;
  }
  
  // Dialog login
  const container = document.createElement('div');
  container.id = 'worldid-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    backdrop-filter: blur(5px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  const dialog = document.createElement('div');
  dialog.style.cssText = `
    background: linear-gradient(145deg, #1a1f2e, #0f1117);
    padding: 40px;
    border-radius: 20px;
    border: 2px solid #007AFF;
    box-shadow: 0 0 50px rgba(0,122,255,0.5);
    text-align: center;
    max-width: 400px;
    width: 90%;
    position: relative;
  `;
  
  dialog.innerHTML = `
    <h2 style="color: white; margin-bottom: 20px;">🌐 <span style="color: #007AFF;">Azura AI</span> Login</h2>
    <p style="color: #94a3b8; margin-bottom: 30px;">Sila sahkan dengan World ID</p>
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
    ">✕</button>
  `;
  
  container.appendChild(dialog);
  document.body.appendChild(container);
  
  document.getElementById('close-dialog').onclick = () => container.remove();
  
  document.getElementById('worldid-login-btn').onclick = async () => {
    try {
      const rpSig = await getRPSignature(ACTION);
      container.remove();
      
      // Buka widget - GUNA CARA LAMA YANG TERBUKTI BERJAYA
      if (window.IDKitWidget) {
        const idkit = new window.IDKitWidget({
          app_id: APP_ID,
          action: ACTION,
          signal: 'azura_user',
          onSuccess: saveWorldID,
          onError: (error) => alert('Ralat: ' + error.message)
        });
        idkit.open();
      } else {
        alert('Widget IDKit tak sedia. Cuba refresh.');
      }
      
    } catch (error) {
      alert('Gagal: ' + error.message);
    }
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
