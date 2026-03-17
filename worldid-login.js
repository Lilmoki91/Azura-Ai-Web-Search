// ==============================================
// 🌐 AZURA AI - TEST WORKER SAHAJA
// ==============================================

const WORKER_URL = 'https://azura-ai.khairuldinsuyitno.workers.dev';
const APP_ID = 'app_16b861659b5f66f3fc33d9d515a82f80';
const ACTION = 'azura_login';

async function testWorker() {
  try {
    const response = await fetch(WORKER_URL + '/api/get-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: ACTION })
    });
    const data = await response.json();
    alert('✅ Worker OK!\n' + JSON.stringify(data));
  } catch (error) {
    alert('❌ Worker GAGAL: ' + error.message);
  }
}

testWorker();
