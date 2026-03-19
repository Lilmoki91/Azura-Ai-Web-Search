// functions/api/verify-proof.js
export async function onRequest(context) {
  const { request, env } = context;
  
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { idkitResponse } = await request.json();
    const rp_id = env.RP_ID;

    const response = await fetch(
      `https://developer.world.org/api/v4/verify/${rp_id}`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(idkitResponse),
      }
    );

    const payload = await response.json();
    return new Response(JSON.stringify(payload), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
