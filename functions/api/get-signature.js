// functions/api/get-signature.js
export async function onRequest(context) {
  const { request, env } = context;
  
  console.log('📥 Request received:', request.method, request.url);
  
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { action } = await request.json();
    console.log('🔍 Action:', action);
    
    const signingKey = env.RP_SIGNING_KEY;
    console.log('🔑 Signing key exists:', !!signingKey);

    // Hasilkan signature (manual)
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = crypto.randomUUID();
    const message = `${action}:${nonce}:${timestamp}`;
    
    const keyBytes = hexToBytes(signingKey.replace('0x', ''));
    const privateKey = await crypto.subtle.importKey(
      'raw', 
      keyBytes, 
      { name: 'ECDSA', namedCurve: 'P-256' }, 
      false, 
      ['sign']
    );
    
    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign(
      { name: 'ECDSA', hash: 'SHA-256' },
      privateKey,
      encoder.encode(message)
    );

    return new Response(JSON.stringify({
      sig: bytesToHex(new Uint8Array(signature)),
      nonce,
      created_at: timestamp,
      expires_at: timestamp + 300
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Helper functions
function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
  }
  return bytes;
}

function bytesToHex(bytes) {
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
