import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Webhook endpoint
app.post('/api/webhook/appeal', async (req, res) => {
  try {
    const webhookUrl = process.env.VITE_APPEAL_WEBHOOK_URL;
    
    if (!webhookUrl) {
      return res.status(400).json({ error: 'Webhook URL not configured' });
    }

    const { username, discordId, email, banReason, appealReason, id } = req.body;

    const payload = {
      content: `🆕 **New Ban Appeal**\n👤 Username: \`${username}\`\n🎮 Discord: \`${discordId}\`\n📧 Email: \`${email}\`\n⛔ Ban Reason: ${banReason}\n📅 ID: \`${id}\`\n\n💭 Appeal:\n${appealReason}`,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Discord webhook failed:', response.status, error);
      return res.status(response.status).json({ error: 'Failed to send webhook' });
    }

    res.json({ success: true, message: 'Appeal sent to Discord' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Webhook server running on http://localhost:${port}`);
});
