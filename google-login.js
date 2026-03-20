// ==============================================
// 🔐 AZURA AI - GOOGLE LOGIN + GOOGLE DRIVE
// ==============================================

let accessToken = null;
let userEmail = null;

// Init Google Drive API
function initDriveAPI() {
  gapi.load('client', async () => {
    await gapi.client.init({
      apiKey: 'YOUR_API_KEY',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
    });
  });
}

// Google One Tap / Popup Login
function handleCredentialResponse(response) {
  console.log('✅ Login berjaya:', response);
  // Decode JWT untuk dapat email
  const payload = JSON.parse(atob(response.credential.split('.')[1]));
  userEmail = payload.email;
  
  localStorage.setItem('google_logged_in', 'true');
  localStorage.setItem('google_email', userEmail);
  
  // Dapatkan access token untuk Google Drive
  getAccessToken();
  
  // Sembunyi login section
  document.getElementById('loginSection').style.display = 'none';
  document.getElementById('searchSection').style.display = 'block';
  alert('✅ Login Google berjaya!');
}

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
async function saveHistoryToDrive(content) {
  if (!accessToken) {
    alert('Sila login Google dulu');
    return;
  }
  
  const filename = `azura_history_${new Date().toISOString().slice(0,10)}.txt`;
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
}

// Cek login status
function isGoogleLoggedIn() {
  return localStorage.getItem('google_logged_in') === 'true';
}

// Papar butang login Google
function showGoogleLoginButton() {
  const loginDiv = document.getElementById('loginSection');
  if (!loginDiv) return;
  
  loginDiv.innerHTML = `
    <div id="g_id_onload"
         data-client_id="YOUR_GOOGLE_CLIENT_ID"
         data-callback="handleCredentialResponse"
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
    <p style="color:#94a3b8; margin-top:20px;">atau</p>
    <button onclick="loginWithWorldID()" style="background:linear-gradient(135deg,#667eea,#764ba2);">🔑 Login World ID</button>
  `;
}

// Start
if (!isGoogleLoggedIn()) {
  showGoogleLoginButton();
} else {
  document.getElementById('searchSection').style.display = 'block';
  document.getElementById('loginSection').style.display = 'none';
  userEmail = localStorage.getItem('google_email');
}

// Export untuk guna di tempat lain
window.saveHistoryToDrive = saveHistoryToDrive;
window.handleCredentialResponse = handleCredentialResponse;
