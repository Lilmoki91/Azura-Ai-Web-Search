// ==============================================
// 🌐 AZURA AI - WORLD ID 4.0 WORKER (DATA BARU)
// ==============================================

async function generateSignature(action, signingKey) {
  const encoder = new TextEncoder();
  const timestamp = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomUUID();
  const message = `${action}:${nonce}:${timestamp}`;
  
  const keyBytes = hexToBytes(signingKey.replace('0x', ''));
  const privateKey = await crypto.subtle.importKey(
    'raw', keyBytes, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: 'SHA-256' }, privateKey, encoder.encode(message)
  );
  
  return {
    signature: bytesToHex(new Uint8Array(signature)),
    nonce, created_at: timestamp, expires_at: timestamp + 300
  };
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function verifyProof(rpId, proofPayload) {
  const res = await fetch(`https://developer.world.org/api/v4/verify/${rpId}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proofPayload)
  });
  return await res.json();
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

    try {
      // Test endpoint
      if (url.pathname === '/test') {
        return new Response('Worker OK with NEW data!', { headers: corsHeaders });
      }

      // Get signature endpoint
      if (url.pathname === '/api/get-signature' && request.method === 'POST') {
        const { action } = await request.json();
        const sigData = await generateSignature(action, env.SIGNING_KEY);
        return new Response(JSON.stringify({
          rp_id: env.RP_ID,
          sig: sigData.signature,
          nonce: sigData.nonce,
          created_at: sigData.created_at,
          expires_at: sigData.expires_at
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
      
      // Verify proof endpoint
      if (url.pathname === '/api/verify-proof' && request.method === 'POST') {
        const { idkitResponse } = await request.json();
        const verificationResult = await verifyProof(env.RP_ID, idkitResponse);
        return new Response(JSON.stringify(verificationResult), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      return new Response('Not found', { status: 404, headers: corsHeaders });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
