# Discord Webhook Integration - Ban Appeal System

## Overview
The ban appeal system now sends beautifully formatted Discord embeds to a webhook when appeals are submitted. Admins can view all appeal details and take quick actions.

## Discord Embed Features

### Visual Elements
- **Gradient Headers**: Professional blue styling with appeal title
- **Player Avatar**: Automatically fetches Minecraft player skin
- **Color-Coded Fields**: 
  - 👤 Minecraft Username
  - 🎮 Discord Tag
  - 📧 Email Address
  - ⛔ Ban Reason (with emoji indicators)
  - 📅 Appeal ID
  - 🕐 Submitted Time (Discord timestamp)
  - 💭 Full Appeal Reason

### Action Buttons
The Discord embed includes interactive buttons for admins:

1. **💬 Contact on Discord** - Opens Discord DM with the appealer
2. **📧 Send Email** - Opens email client with pre-filled subject
3. **✅ Approve** - Button for approval (requires backend implementation)
4. **❌ Deny** - Button for denial (requires backend implementation)

## Environment Setup

The webhook URL is stored in `.env`:
```
VITE_APPEAL_WEBHOOK_URL="https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN"
```

## Enhanced UI Improvements

### Appeal Form
- **Gradient Headers**: Eye-catching title with green-to-blue gradient
- **Emoji Labels**: Each field has descriptive emojis
- **Better Spacing**: Improved visual hierarchy
- **Hover Effects**: Smooth transitions on interactive elements
- **Form Validation**: Real-time feedback with clear error messages

### Success Screen
- **Gradient Background**: Modern emerald gradient styling
- **Large Icon**: Prominent checkmark with shadow
- **Clear Message**: Confirms submission and next steps
- **Contact Info**: Reminds users they'll be contacted via Discord or email

### Info Cards
- **Gradient Backgrounds**: Each card has a unique gradient (emerald, blue, purple)
- **Hover Scale**: Cards scale up on hover for better interactivity
- **Better Shadows**: Enhanced depth with shadow transitions
- **Bold Icons**: Eye-catching emoji indicators

## How It Works

1. **User submits appeal** → Form data collected
2. **Data saved** → Saved to Supabase + localStorage backup
3. **Webhook triggered** → Discord embed sent with all details
4. **Admin receives notification** → Can immediately see appeal details
5. **Admin can act** → Use buttons to contact or manage appeal

## Discord Embed JSON Structure

The webhook sends:
```json
{
  "content": "🆕 **New Ban Appeal Submitted**",
  "embeds": [{
    "color": 3498843,
    "title": "📋 Appeal from [Username]",
    "fields": [
      { "name": "👤 Minecraft Username", "value": "`username`" },
      { "name": "🎮 Discord Tag", "value": "`user#1234`" },
      { "name": "📧 Email", "value": "`user@example.com`" },
      { "name": "⛔ Ban Reason", "value": "⚔️ Hacking / Cheating" },
      { "name": "📅 Appeal ID", "value": "`appeal_id_123`" },
      { "name": "🕐 Submitted", "value": "<t:timestamp:R>" },
      { "name": "💭 Appeal Reason", "value": "Full appeal text..." }
    ],
    "thumbnail": { "url": "Minecraft skin URL" },
    "timestamp": "ISO timestamp"
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 1, "label": "💬 Contact on Discord", "url": "discord://..." },
      { "type": 2, "style": 5, "label": "📧 Send Email", "url": "mailto:..." },
      { "type": 2, "style": 3, "label": "✅ Approve", "custom_id": "approve_..." },
      { "type": 2, "style": 4, "label": "❌ Deny", "custom_id": "deny_..." }
    ]
  }]
}
```

## Testing the Webhook

To test if appeals are being sent to Discord:
1. Submit a test appeal on the website
2. Check the Discord channel where the webhook is configured
3. You should see a formatted embed with all appeal details
4. Click action buttons to test contact functionality

## Future Enhancements

- [ ] Implement backend handlers for Approve/Deny buttons
- [ ] Add appeal status tracking in Discord
- [ ] Create admin dashboard for appeal management
- [ ] Add automatic unban API integration
- [ ] Send appeal status updates back to users
