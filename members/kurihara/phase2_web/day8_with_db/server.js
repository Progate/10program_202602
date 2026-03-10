const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/messages', async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const content = typeof req.body.content === 'string' ? req.body.content.trim() : '';

  if (!name || !content) {
    return res.status(400).json({
      success: false,
      error: 'name と content は必須です',
    });
  }

  try {
    const message = await prisma.message.create({
      data: { name, content },
    });

    console.log('[SERVER] 保存しました:', message);
    return res.json({ success: true, message });
  } catch (error) {
    console.error('[SERVER] 保存エラー:', error);
    return res.status(500).json({ success: false, error: '保存に失敗しました' });
  }
});

app.listen(PORT, () => {
  console.log(`[SERVER] http://localhost:${PORT} で起動しました`);
});

async function shutdown() {
  await prisma.$disconnect();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
