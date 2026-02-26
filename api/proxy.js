// api/proxy.js - GUNA SISTEM AES JOHAN!

// Data dari IPFS (rahsia)
const IPFS_CONFIG = {
    cid: "QmduEbAZhbtdt37ijGkM8U5cteD3Lpfp9Y22VtoQv2UYZv",
    aesKey: "GA/6NIB5TbUKAPdw22D64e/OPE5TheEdCcDtIs8CG8A=",
    gateway: "https://gateway.pinata.cloud/ipfs/"
};

let API_KEY = null;

// DECRYPT FUNCTION
async function decryptAESGCM(combined, keyBase64) {
    const keyBuffer = Uint8Array.from(atob(keyBase64), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey('raw', keyBuffer, { name: 'AES-GCM' }, false, ['decrypt']);
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encryptedData);
    return decrypted;
}

// DAPAT API KEY DARI IPFS
async function getAPIKey() {
    if (API_KEY) return API_KEY;
    
    const response = await fetch(IPFS_CONFIG.gateway + IPFS_CONFIG.cid);
    const encryptedData = new Uint8Array(await response.arrayBuffer());
    const decryptedData = await decryptAESGCM(encryptedData, IPFS_CONFIG.aesKey);
    const data = JSON.parse(new TextDecoder().decode(decryptedData));
    API_KEY = data.API_KEY;
    return API_KEY;
}

// PROXY HANDLER
export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only POST allowed
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const API_KEY = await getAPIKey(); // 🔥 DAPAT DARI IPFS!
        const { prompt } = req.body;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const data = await response.json();
        res.status(200).json(data);
        
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: error.message });
    }
}
