// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all('/plivo-response', (req, res) => {
  const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Speak>Welcome to Plivo. Connecting you now.</Speak>
    <Dial callerId="sip:testuser990109291922029390@phone.plivo.com">
        <Sip>sip:testuser11849479228825931@phone.plivo.com</Sip>
    </Dial>
</Response>`;
  res.set('Content-Type', 'text/xml');
  res.send(xmlResponse);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
