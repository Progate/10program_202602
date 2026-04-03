const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const messages = [];

console.log('messages:', messages);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/messages', (req, res) => {
  const { message } = req.body;
  const item = {
    message,
    receivedAt: new Date().toISOString(),
  };

  messages.push(item);
  console.log('[SERVER] 受信データ:', item);

  res.json({ success: true });
  console.log('messages:', messages);
});

app.listen(PORT, () => {
  console.log(`[SERVER] http://localhost:${PORT} で起動しました`);
});
