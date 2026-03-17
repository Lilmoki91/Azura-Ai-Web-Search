// ==============================================
// 🌐 AZURA AI - WORLD ID 4.0 LOGIN (CONNECT DENGAN WORKER)
// ==============================================

const WORKER_URL = 'https://azura-ai.khairuldinsuyitno.workers.dev';
const APP_ID = 'app_16b861659b5f66f3fc33d9d515a82f80';
const ACTION = 'azura_login';
const DEBUG = true;

function log(...args) {
  if (DEBUG) console.log('🔐 [WorldID4]:', ...args);
}

// Simpan bukti login
function saveWorldID(proof) {
  log('✅ Proof verified!', proof);
  
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

// Periksa login status
function isWorldIDVerified() {
  return localStorage.getItem('world_verified') === 'true';
}

// Dapatkan RP signature dari worker
async function getRPSignature(action) {
  log('📡 Getting RP signature from worker...');
  const response = await fetch(`${WORKER_URL}/api/get-signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action })
  });
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gagal dapatkan signature: ${error}`);
  }
  
  const data = await response.json();
  log('✅ RP signature received', data);
  return data;
}

// Hantar proof untuk verifikasi ke worker
async function verifyProof(proofPayload) {
  log('📡 Sending proof to worker for verification...');
  const response = await fetch(`${WORKER_URL}/api/verify-proof`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proofPayload)
  });
  
  const result = await response.json();
  log('✅ Verification result:', result);
  return result;
}

// Muat IDKit (guna versi 1.4.1 untuk widget)
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

// Buat butang login
async function initWorldIDLogin() {
  log('🚀 Initializing World ID 4.0...');
  
  if (isWorldIDVerified()) {
    log('✅ User already verified');
    if (typeof window.showSearchUI === 'function') {
      window.showSearchUI();
    }
    return;
  }
  
  try {
    await loadIDKit();
  } catch (e) {
    alert('Gagal muatkan World ID SDK. Sila refresh halaman.');
    return;
  }
  
  // Cipta container dialog
  const container = document.createElement('div');
  container.id = 'worldid-container';
  container.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
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
    <p style="color: #94a3b8; margin-bottom: 30px;">Sila sahkan dengan World ID untuk teruskan</p>
    <button id="worldid-login-btn" style="
      padding: 15px 40px;
      font-size: 18px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
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
      // Dapatkan RP signature dari worker dulu
      const rpSig = await getRPSignature(ACTION);
      
      container.remove();
      
      // Buka World ID widget
      const idkit = new window.IDKitWidget({
        app_id: APP_ID,
        action: ACTION,
        signal: 'azura_user',
        onSuccess: async (proof) => {
          log('✅ World ID success!', proof);
          
          // Hantar proof ke worker untuk verifikasi
          try {
            const verification = await verifyProof(proof);
            log('✅ Final verification:', verification);
            
            if (verification.success || verification.ok) {
              saveWorldID(proof);
            } else {
              alert('Verification gagal: ' + (verification.error || 'Unknown error'));
            }
          } catch (e) {
            console.error('❌ Verification failed:', e);
            alert('Verification gagal di server');
          }
        },
        onError: (error) => {
          console.error('❌ World ID error:', error);
          alert('Ralat World ID: ' + (error.message || 'Sila cuba lagi'));
        }
      });
      
      idkit.open();
      
    } catch (error) {
      console.error('❌ Login error:', error);
      alert('Gagal: ' + error.message);
    }
  };
}

// Start
log('🚀 World ID 4.0 script dimulakan...');
if (!isWorldIDVerified()) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWorldIDLogin);
  } else {
    initWorldIDLogin();
  }
} else {
  log('✅ User already verified');
  if (typeof window.showSearchUI === 'function') {
    window.showSearchUI();
  }
}
