// ==============================================
// 🌐 AZURA AI - LOGIN INTERNET IDENTITY (ICP)
// ==============================================

const II_URL = 'https://identity.ic0.app'; // Mainnet
let authClient = null;

// Muat AuthClient dari CDN
function loadAuthClient() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@dfinity/auth-client@1.0.1/dist/index.min.js';
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Inisialisasi AuthClient
async function initAuth() {
  if (authClient) return authClient;
  if (typeof window.AuthClient === 'undefined') await loadAuthClient();
  authClient = await window.AuthClient.AuthClient.create();
  return authClient;
}

// Simpan status login
function saveLogin(principal) {
  localStorage.setItem('ii_principal', principal);
  localStorage.setItem('world_verified', 'true');
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  alert('✅ Selamat datang!');
}

// Login
async function loginWithII() {
  try {
    await initAuth();
    await authClient.login({
      identityProvider: II_URL,
      onSuccess: () => {
        const identity = authClient.getIdentity();
        saveLogin(identity.getPrincipal().toString());
      },
      onError: (error) => alert('Gagal login: ' + error)
    });
  } catch (error) {
    alert('Error: ' + error.message);
  }
}

// Logout
async function logoutII() {
  await authClient?.logout();
  localStorage.clear();
  window.location.reload();
}

// Papar butang login
function showLoginButton() {
  const div = document.createElement('div');
  div.innerHTML = `
    <div style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2e; padding:40px; border-radius:20px; border:2px solid #007AFF; text-align:center;">
      <h2 style="color:white;">🌐 Azura AI</h2>
      <p style="color:#94a3b8; margin:30px 0;">Login dengan Internet Identity</p>
      <button onclick="loginWithII()" style="padding:15px 40px; background:linear-gradient(135deg,#667eea,#764ba2); color:white; border:none; border-radius:50px;">🔑 Login</button>
    </div>
  `;
  document.body.appendChild(div);
  window.loginWithII = loginWithII;
}

// Start
(async () => {
  try {
    await initAuth();
    const authed = await authClient.isAuthenticated();
    if (authed) {
      const identity = authClient.getIdentity();
      saveLogin(identity.getPrincipal().toString());
    } else {
      showLoginButton();
    }
  } catch {
    showLoginButton();
  }
})();
