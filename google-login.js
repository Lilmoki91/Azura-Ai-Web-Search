// ==============================================
// 🔐 AZURA AI - GOOGLE LOGIN
// ==============================================

let accessToken = null;
let userEmail = null;

// Function untuk tunjuk butang Google
function showGoogleButton() {
  const loginDiv = document.getElementById('loginSection');
  if (!loginDiv) return;

  loginDiv.innerHTML = `
    <div style="text-align:center; padding:40px;">
      <h2 style="color:white;">Login untuk teruskan</h2>
      <div id="g_id_onload"
           data-client_id="YOUR_GOOGLE_CLIENT_ID"
           data-callback="handleGoogleLogin"
           data-auto_select="false">
      </div>
      <div class="g_id_signin"
           data-type="standard"
           data-size="large"
           data-theme="outline"
           data-text="sign_in_with"
           data-shape="rectangular"
           data-logo_alignment="left">
      </div>
    </div>
  `;
}

// Handle login berjaya
window.handleGoogleLogin = (response) => {
  console.log('✅ Login berjaya:', response);
  
  // Dapatkan email dari JWT
  const payload = JSON.parse(atob(response.credential.split('.')[1]));
  userEmail = payload.email;
  
  localStorage.setItem('google_logged_in', 'true');
  localStorage.setItem('google_email', userEmail);
  
  // Sembunyi login, tunjuk search
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('searchSection').style.display = 'block';
  
  alert(`✅ Selamat datang ${userEmail}!`);
  
  // Dapatkan access token untuk Google Drive
  getAccessToken();
};

// Dapatkan access token untuk Google Drive
function getAccessToken() {
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: 'YOUR_GOOGLE_CLIENT_ID',
    scope: 'https://www.googleapis.com/auth/drive.file',
    callback: (tokenResponse) => {
      accessToken = tokenResponse.access_token;
      console.log('✅ Access token sedia');
    }
  });
  tokenClient.requestAccessToken({ prompt: '' });
}

// Simpan sejarah ke Google Drive
window.saveHistoryToDrive = async (content, filename = 'azura_history.txt') => {
  if (!accessToken) {
    alert('Sila login Google dulu');
    return;
  }
  
  const metadata = {
    name: filename,
    mimeType: 'text/plain',
    parents: ['root']
  };
  
  const form = new FormData();
  form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
  form.append('file', new Blob([content], { type: 'text/plain' }));
  
  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}` },
    body: form
  });
  
  const data = await response.json();
  console.log('✅ Disimpan:', data);
  alert('Sejarah disimpan di Google Drive!');
};

// Start
if (localStorage.getItem('google_logged_in') === 'true') {
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  userEmail = localStorage.getItem('google_email');
  console.log('✅ Sudah login sebagai:', userEmail);
} else {
  showGoogleButton();
}
