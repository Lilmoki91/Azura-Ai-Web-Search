// ==============================================
// 🌐 AZURA AI - LOGIN TERUS (GUNA PAGE SAHAJA)
// ==============================================

const APP_ID = 'app_cd116c43c9c77dc06507317ac70aee8a';
const ACTION = 'azura_login';

// Simpan status login
function saveWorldID(proof) {
  console.log('✅ Proof diterima:', proof);
  localStorage.setItem('world_verified', 'true');
  localStorage.setItem('world_nullifier', proof.nullifier_hash);
  
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  
  alert('✅ Selamat datang ke Azura AI!');
}

// Fungsi utama login
function loginWithWorldID() {
  if (!window.IDKitWidget) {
    alert('World ID SDK tidak sedia. Cuba refresh.');
    return;
  }
  
  new window.IDKitWidget({
    app_id: APP_ID,
    action: ACTION,
    signal: 'azura-user',
    onSuccess: saveWorldID,
    onError: (error) => {
      console.error('❌ Gagal:', error);
      alert('Gagal login: ' + error.message);
    }
  }).open();
}

// Tunggu IDKit sedia sebelum tunjuk button
function waitForIDKit(callback, retries = 25) {
  if (window.IDKitWidget) {
    callback();
  } else if (retries > 0) {
    setTimeout(() => waitForIDKit(callback, retries - 1), 200);
  } else {
    alert('World ID SDK tidak dapat dimuatkan. Cuba refresh.');
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
      transition: transform 0.2s;
    " onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
      🔓 Login World ID
    </button>
  `;
  
  document.body.appendChild(container);
}

// Start
if (localStorage.getItem('world_verified') === 'true') {
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
} else {
  // Tunggu IDKit siap dulu, baru tunjuk button
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      waitForIDKit(showLoginButton);
    });
  } else {
    waitForIDKit(showLoginButton);
  }
}
