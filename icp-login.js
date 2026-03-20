// ==============================================
// 🌐 AZURA AI - LOGIN INTERNET IDENTITY (ICP)
// ==============================================

const II_URL = 'https://identity.ic0.app'; // Mainnet
let authClient = null;

// Fungsi muat script dari URL
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Muat AuthClient dari pelbagai CDN
async function loadAuthClient() {
  const urls = [
    'https://cdn.jsdelivr.net/npm/@dfinity/auth-client@1.0.1/dist/index.min.js',
    'https://unpkg.com/@dfinity/auth-client@1.0.1/dist/index.min.js',
    'https://esm.sh/@dfinity/auth-client@1.0.1'
  ];
  
  for (const url of urls) {
    try {
      await loadScript(url);
      console.log('✅ AuthClient dimuat dari:', url);
      return;
    } catch (e) {
      console.warn('❌ Gagal muat dari:', url);
    }
  }
  
  throw new Error('Semua CDN gagal');
}

// Inisialisasi AuthClient
async function initAuth() {
  if (authClient) return authClient;
  
  // Tunggu AuthClient wujud
  let retries = 0;
  while (typeof window.AuthClient === 'undefined' && retries < 20) {
    await new Promise(r => setTimeout(r, 200));
    retries++;
  }

  if (typeof window.AuthClient === 'undefined') {
    throw new Error('AuthClient gagal dimuat');
  }

  authClient = await window.AuthClient.AuthClient.create();
  return authClient;
}

// Simpan status login
function saveLogin(principal) {
  console.log('✅ Principal ID:', principal);
  localStorage.setItem('ii_principal', principal);
  localStorage.setItem('world_verified', 'true');
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('login-container')?.remove();
  alert('✅ Selamat datang ke Azura AI!');
}

// Login dengan Internet Identity
async function loginWithII() {
  try {
    console.log('🔐 Memulakan login...');
    
    if (!authClient) {
      authClient = await initAuth();
      if (!authClient) throw new Error('AuthClient gagal dimuat');
    }
    
    await authClient.login({
      identityProvider: II_URL,
      onSuccess: () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toString();
        saveLogin(principal);
      },
      onError: (error) => {
        console.error('❌ Gagal login:', error);
        alert('Gagal login: ' + (error || 'Unknown error'));
      }
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    alert('Gagal login: ' + error.message);
  }
}

// Papar butang login
function showLoginButton() {
  const container = document.createElement('div');
  container.id = 'login-container';
  container.innerHTML = `
    <div style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); background:#1a1f2e; padding:40px; border-radius:20px; border:2px solid #007AFF; text-align:center; max-width:400px; width:90%;">
      <h2 style="color:white; font-size:28px; margin-bottom:20px;">🌐 <span style="color:#007AFF;">Azura AI</span></h2>
      <p style="color:#94a3b8; margin-bottom:30px;">Login dengan Internet Identity</p>
      <button id="login-btn" style="padding:15px 40px; background:linear-gradient(135deg,#667eea,#764ba2); color:white; border:none; border-radius:50px; cursor:pointer; font-weight:bold; width:100%;">🔑 Login</button>
    </div>
  `;
  document.body.appendChild(container);
  document.getElementById('login-btn').addEventListener('click', loginWithII);
}

// Start
(async function() {
  try {
    await loadAuthClient();
    await initAuth();
    
    const isAuthed = await authClient.isAuthenticated();
    if (isAuthed) {
      const identity = authClient.getIdentity();
      const principal = identity.getPrincipal().toString();
      saveLogin(principal);
    } else {
      showLoginButton();
    }
  } catch (error) {
    console.error('❌ Init error:', error);
    showLoginButton();
  }
})();
