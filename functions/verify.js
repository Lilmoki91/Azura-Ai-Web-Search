export async function onRequestPost({ request }) {
  try {
    const body = await request.json();

    // Hantar proof ke World ID API
    const verifyRes = await fetch("https://developer.worldcoin.org/api/v1/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        app_id: "app_16b861659b5f66f3fc33d9d515a82f80", // app_id kau
        action: "login",
        signal: body.merkle_root,
        proof: body.proof,
        nullifier_hash: body.nullifier_hash
      })
    });

    const data = await verifyRes.json();

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
