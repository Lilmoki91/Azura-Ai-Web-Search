// ==============================================
// 🔥 AZURA AI - TEST ICP LOGIN (DEBUG)
// ==============================================

console.log('🔥 1. Script dimulakan...');

import { AuthClient } from 'https://esm.sh/@dfinity/auth-client@1.0.1';
console.log('✅ 2. AuthClient diimport');

const II_URL = 'https://identity.ic0.app';

(async () => {
  console.log('🔧 3. Mula init AuthClient...');
  const authClient = await AuthClient.create();
  console.log('✅ 4. AuthClient siap');

  const isAuthed = await authClient.isAuthenticated();
  console.log('🔍 5. isAuthenticated:', isAuthed);

  if (!isAuthed) {
    console.log('🟢 6. Belum login, tunjuk butang...');
    
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
      border-radius: 10px;
    `;
    btn.onclick = async () => {
      console.log('🖱️ 7. Butang diklik');
      await authClient.login({
        identityProvider: II_URL,
        onSuccess: () => {
          console.log('✅ 8. Login berjaya!');
          alert('Berjaya!');
          const principal = authClient.getIdentity().getPrincipal().toString();
          console.log('Principal:', principal);
          localStorage.setItem('ii_principal', principal);
        },
        onError: (err) => {
          console.error('❌ 9. Login error:', err);
          alert('Gagal: ' + err);
        }
      });
    };
    document.body.appendChild(btn);
  } else {
    console.log('✅ User dah login');
    const identity = authClient.getIdentity();
    alert('Dah login! Principal: ' + identity.getPrincipal().toString());
  }
})();
