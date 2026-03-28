import express from 'express';
import cors from 'cors';
import { signRequest } from '@worldcoin/idkit-core/signing';  // ✅ BETUL

const app = express();
app.use(cors());
app.use(express.json());

const RP_SIGNING_KEY = process.env.RP_SIGNING_KEY;
const RP_ID = process.env.RP_ID;

// Step 3: RP Signature
app.post('/api/rp-signature', (req, res) => {
  try {
    const { action } = req.body;
    const { sig, nonce, createdAt, expiresAt } = signRequest(action, RP_SIGNING_KEY);
    res.json({ sig, nonce, created_at: createdAt, expires_at: expiresAt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Step 5: Verify proof
app.post('/api/verify-proof', async (req, res) => {
  try {
    const { idkitResponse } = req.body;
    const response = await fetch(
      `https://developer.world.org/api/v4/verify/${RP_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(idkitResponse),
      }
    );
    const result = await response.json();
    res.status(response.status).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', rp_id: RP_ID });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
