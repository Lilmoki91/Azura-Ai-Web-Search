// ==============================================
// 🌐 AZURA AI - WORLD ID 4.0 (PAGES FUNCTIONS)
// ==============================================

const ACTION = 'azura_login';
const SIGNAL = 'azura-user-2026';

async function loginWithWorldID() {
  try {
    console.log('🔐 Memulakan proses login...');

    // 1. Panggil Pages Functions untuk signature
    const rpSig = await fetch('/api/get-signature', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ action: ACTION })
    }).then(r => r.json());

    console.log('✅ Signature diterima:', rpSig);

    // 2. Buat request ke IDKit
    const request = await window.IDKit.request({
      app_id: 'app_cd116c43c9c77dc06507317ac70aee8a',
      action: ACTION,
      rp_context: {
        rp_id: 'rp_6c9c3c8c18e611db',
        nonce: rpSig.nonce,
        created_at: rpSig.created_at,
        expires_at: rpSig.expires_at,
        signature: rpSig.sig,
      },
      allow_legacy_proofs: true,
      environment: 'production'
    }).preset(window.orbLegacy({ signal: SIGNAL }));

    // 3. Dapatkan URL QR
    const connectUrl = request.connectorURI;
    console.log('🔗 Connect URL:', connectUrl);
    window.open(connectUrl, '_blank');

    // 4. Tunggu pengesahan
    console.log('⏳ Menunggu pengesahan...');
    const response = await request.pollUntilCompletion();
    console.log('✅ World ID response:', response);

    // 5. Hantar ke Pages Functions untuk verifikasi akhir
    const verification = await fetch('/api/verify-proof', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ idkitResponse: response })
    }).then(r => r.json());

    if (verification.success || verification.ok) {
      alert('✅ Selamat datang ke Azura AI!');
      localStorage.setItem('world_verified', 'true');
      document.getElementById('searchSection').style.display = 'block';
      document.getElementById('loginSection').style.display = 'none';
    } else {
      throw new Error('Verifikasi gagal');
    }

  } catch (error) {
    console.error('❌ Login error:', error);
    alert('Gagal login: ' + error.message);
  }
}

// Papar butang login (sama macam sebelum ni)
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
    box-shadow: 0 0 50px rgba(0,122,255,0.5);
    max-width: 400px;
    width: 90%;
  `;
  
  container.innerHTML = `
    <h2 style="color: white; margin-bottom: 20px; font-size: 28px;">
      🌐 <span style="color: #007AFF;">Azura AI</span>
    </h2>
    <p style="color: #94a3b8; margin-bottom: 30px; font-size: 16px;">
      Sila sahkan dengan World ID
    </p>
    <button onclick="loginWithWorldID()" style="
      padding: 15px 40px;
      font-size: 18px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
      font-weight: bold;
      width: 100%;
    ">🔓 Login World ID</button>
  `;
  
  document.body.appendChild(container);
}

// Start
if (localStorage.getItem('world_verified') === 'true') {
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
} else {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showLoginButton);
  } else {
    showLoginButton();
  }
}
