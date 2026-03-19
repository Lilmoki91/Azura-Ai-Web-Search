// functions/api/get-signature.js
import { signRequest } from "@worldcoin/idkit/signing";

export async function onRequest(context) {
  const { request, env } = context;
  
  // Hanya terima POST
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { action } = await request.json();
    const signingKey = env.RP_SIGNING_KEY; // Dari Pages Secret Variable

    const { sig, nonce, createdAt, expiresAt } = signRequest(action, signingKey);

    return new Response(JSON.stringify({
      sig,
      nonce,
      created_at: createdAt,
      expires_at: expiresAt
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
