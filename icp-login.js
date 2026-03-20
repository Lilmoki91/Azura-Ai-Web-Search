// ==============================================
// 🔥 AZURA AI - ICP LOGIN (NON-MODULE)
// ==============================================

console.log('🔥 1. Script dimulakan...');

// Muat AuthClient dari CDN
const script = document.createElement('script');
script.src = 'https://esm.sh/@dfinity/auth-client@1.0.1';
script.type = 'module';
script.onload = () => {
  console.log('✅ AuthClient siap');
  start();
};
document.head.appendChild(script);

async function start() {
  const { AuthClient } = await import('https://esm.sh/@dfinity/auth-client@1.0.1');
  console.log('✅ AuthClient diimport');
  
  const II_URL = 'https://identity.ic0.app';
  const authClient = await AuthClient.create();
  console.log('✅ AuthClient siap');
  
  const isAuthed = await authClient.isAuthenticated();
  console.log('isAuthenticated:', isAuthed);
  
  if (!isAuthed) {
    const btn = document.createElement('button');
    btn.textContent = '🔑 LOGIN ICP';
    btn.style.cssText = `
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 999999;
      background: red;
      color: white;
      padding: 15px;
      font-size: 20px;
    `;
    btn.onclick = async () => {
      await authClient.login({
        identityProvider: II_URL,
        onSuccess: () => {
          alert('Login berjaya!');
        },
        onError: (err) => alert('Gagal: ' + err)
      });
    };
    document.body.appendChild(btn);
  } else {
    alert('Dah login!');
  }
}
