// ==============================================
// 🌐 AZURA AI - WORLD ID 4.0 (DATA BARU)
// ==============================================

const WORKER_URL = 'https://azura-ai.khairuldinsuyitno.workers.dev';
const APP_ID = 'app_cd116c43c9c77dc06507317ac70aee8a';     // <-- BARU
const RP_ID = 'rp_6c9c3c8c18e611db';                       // <-- BARU
const ACTION = 'azura_login';
const SIGNAL = 'azura-user-2026';

// Simpan status login
function saveWorldID(response) {
  console.log('✅ World ID response:', response);
  localStorage.setItem('world_verified', 'true');
  localStorage.setItem('world_nullifier', response.nullifier);
  
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  
  alert('✅ Selamat datang ke Azura AI!');
}

// Dapatkan RP signature dari worker
async function getRPSignature() {
  const response = await fetch(`${WORKER_URL}/api/get-signature`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: ACTION })
  });
  
  if (!response.ok) throw new Error('Gagal dapatkan signature');
  return await response.json();
}

// Hantar response ke worker untuk verifikasi akhir
async function verifyWithBackend(idkitResponse) {
  const response = await fetch(`${WORKER_URL}/api/verify-proof`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idkitResponse })
  });
  
  return await response.json();
}

// Fungsi utama login
async function loginWithWorldID() {
  try {
    console.log('🔐 Memulakan proses login...');
    
    // 1. Dapatkan RP signature dari worker
    const rpSig = await getRPSignature();
    console.log('✅ Signature diterima:', rpSig);
    
    // 2. Buat request ke IDKit
    const request = await window.IDKit.request({
      app_id: APP_ID,
      action: ACTION,
      rp_context: {
        rp_id: RP_ID,
        nonce: rpSig.nonce,
        created_at: rpSig.created_at,
        expires_at: rpSig.expires_at,
        signature: rpSig.sig,
      },
      allow_legacy_proofs: true,
      environment: 'production'
    }).preset(window.orbLegacy({ signal: SIGNAL }));
    
    // 3. Dapatkan URL untuk QR code
    const connectUrl = request.connectorURI;
    console.log('🔗 Connect URL:', connectUrl);
    
    // 4. Buka tab baru untuk QR code
    window.open(connectUrl, '_blank');
    
    // 5. Tunggu pengesahan
    console.log('⏳ Menunggu pengesahan...');
    const response = await request.pollUntilCompletion();
    console.log('✅ World ID response:', response);
    
    // 6. Hantar ke backend untuk verifikasi akhir
    const verification = await verifyWithBackend(response);
    
    if (verification.success || verification.ok) {
      saveWorldID(response);
    } else {
      throw new Error('Verifikasi backend gagal');
    }
    
  } catch (error) {
    console.error('❌ Login error:', error);
    alert('Gagal login: ' + error.message);
  }
}

// Papar butang login
function showLoginButton() {
  const container = document.createElement('div');
  container.id = 'login-container';
  container.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(145deg, #1a1f2e, #0f1117);
    padding: 40px;
    border-radius: 20px;
    border: 2px solid #007AFF;
    text-align: center;
    z-index: 10000;
  `;
  
  container.innerHTML = `
    <h2 style="color: white; margin-bottom: 20px;">🌐 Azura AI</h2>
    <p style="color: #94a3b8; margin-bottom: 30px;">Sila login dengan World ID</p>
    <button id="login-btn" style="
      padding: 15px 40px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-size: 18px;
    ">🔓 Login dengan World ID</button>
  `;
  
  document.body.appendChild(container);
  
  document.getElementById('login-btn').onclick = async () => {
    container.remove();
    await loginWithWorldID();
  };
}

// Start
if (localStorage.getItem('world_verified') === 'true') {
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
} else {
  showLoginButton();
}
