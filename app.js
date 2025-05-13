// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route for text-to-speech and dialing
app.get('/plivo-response', (req, res) => {
  const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Speak> Hello. This is a test message generated to demonstrate Plivo's text-to-speech feature. 
        This message will continue for approximately one minute. 
        Plivo enables you to deliver spoken messages to phones all over the world. 
        You can use it for reminders, alerts, or customer service notifications. 
        This example continues to fill time so that the total spoken duration will be close to sixty seconds. 
        You can customize the message, language, voice, and speed as needed. 
        Text-to-speech is a powerful feature for automation. 
        Let’s continue with more placeholder content to reach the target length. 
        This message includes enough words to make the call duration approximately one minute long. 
        We are still speaking. Nearly done. Thanks for listening. Have a great day..</Speak>
    <Dial callerId="+919905018700">
        <Number>+919905018700</Number>
    </Dial>
</Response>`;
  res.set('Content-Type', 'text/xml');
  res.send(xmlResponse);
});

// Route for simultaneous SIP dialing
app.get("/plivotransfer", (req, res) => {
  // Accept comma-separated list or repeated query params
  let sipUris = req.query.sipuris;
  if (!sipUris) {
    return res.status(400).send('Missing sipuris parameter');
  }

  // If it's a single string, split it by comma
  if (typeof sipUris === 'string') {
    sipUris = sipUris.split(',');
  }

  const xmlParts = ['<?xml version="1.0" encoding="UTF-8"?>', '<Response>', '  <Dial>'];

  sipUris.forEach(uri => {
    xmlParts.push(`    <User>${uri.trim()}</User>`);
  });

  xmlParts.push('  </Dial>', '</Response>');

  const xmlResponse = xmlParts.join('\n');

  res.set('Content-Type', 'text/xml');
  res.send(xmlResponse);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
