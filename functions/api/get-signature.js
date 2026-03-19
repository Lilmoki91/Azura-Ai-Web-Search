// functions/api/get-signature.js
import { signRequest } from "@worldcoin/idkit/signing";

export async function onRequest(context) {
  const { request, env } = context;
  
  console.log('📥 Request received:', request.method, request.url);
  
  // Hanya terima POST
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { action } = await request.json();
    console.log('🔍 Action:', action);
    console.log('🔑 Signing key exists:', !!env.RP_SIGNING_KEY);

    const signingKey = env.RP_SIGNING_KEY; // Dari Pages Secret Variable

    const { sig, nonce, createdAt, expiresAt } = signRequest(action, signingKey);

    console.log('✅ Signature generated');

    return new Response(JSON.stringify({
      sig,
      nonce,
      created_at: createdAt,
      expires_at: expiresAt
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
