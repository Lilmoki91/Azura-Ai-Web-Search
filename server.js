const express = require('express');
const app = express();
app.use(express.json());

const APP_ID = "app_cd116c43c9c77dc06507317ac70aee8a";
const RP_ID = "rp_6c9c3c8c18e611db";

app.post('/verify', async (req, res) => {
    const { idkitResponse } = req.body;
    
    const response = await fetch(`https://developer.world.org/api/v4/verify/${RP_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(idkitResponse),
    });

    const data = await response.json();
    res.json(data);
});

app.listen(3000, () => console.log('Server World ID jalan di port 3000'));
