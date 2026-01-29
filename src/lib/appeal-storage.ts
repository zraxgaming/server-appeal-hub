// Appeal data types
export interface AppealData {
  id: string;
  username: string;
  discordId: string;
  email: string;
  banReason: string;
  appealReason: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'denied';
}

// localStorage key
const STORAGE_KEY = 'zcraft_appeals';

// Generate unique ID
const generateId = (): string => {
  return `appeal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get all appeals from localStorage
export const getAppeals = async (): Promise<AppealData[]> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading appeals from localStorage:', error);
    return [];
  }
};

// Save appeal to localStorage
export const saveAppeal = async (appealData: Omit<AppealData, 'id' | 'submittedAt' | 'status'>): Promise<AppealData> => {
  const newAppeal: AppealData = {
    ...appealData,
    id: generateId(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  try {
    const appeals = await getAppeals();
    appeals.unshift(newAppeal);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appeals));
    console.log('Appeal saved to localStorage successfully');
  } catch (error) {
    console.error('Error saving appeal to localStorage:', error);
  }

  return newAppeal;
};

// Get appeal by ID
export const getAppealById = async (id: string): Promise<AppealData | null> => {
  try {
    const appeals = await getAppeals();
    return appeals.find(appeal => appeal.id === id) || null;
  } catch (error) {
    console.error('Error reading appeal from localStorage:', error);
    return null;
  }
};

// Update appeal status
export const updateAppealStatus = async (id: string, status: AppealData['status']): Promise<boolean> => {
  try {
    const appeals = await getAppeals();
    const index = appeals.findIndex(appeal => appeal.id === id);
    
    if (index === -1) return false;
    
    appeals[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appeals));
    return true;
  } catch (error) {
    console.error('Error updating appeal status:', error);
    return false;
  }
};

// Helper function to get ban reason label
const getBanReasonLabel = (reason: string): string => {
  const reasons: Record<string, string> = {
    'hacking': '⚔️ Hacking / Cheating',
    'toxicity': '💬 Toxicity / Harassment',
    'scamming': '💰 Scamming',
    'exploiting': '🐛 Bug Exploiting',
    'advertising': '📢 Advertising',
    'inappropriate': '⚠️ Inappropriate Content',
    'ban-evasion': '🔄 Ban Evasion',
    'other': '❓ Other',
  };
  return reasons[reason] || reason;
};

// Webhook submission - direct to Discord
export const submitToWebhook = async (appealData: AppealData): Promise<boolean> => {
  const webhookUrl = import.meta.env.VITE_APPEAL_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('No webhook configured');
    return true;
  }

  try {
    const payload = {
      content: `🆕 **New Ban Appeal**\n\n👤 Username: \`${appealData.username}\`\n🎮 Discord: \`${appealData.discordId}\`\n📧 Email: \`${appealData.email}\`\n⛔ Ban Reason: ${getBanReasonLabel(appealData.banReason)}\n\n💭 Appeal:\n${appealData.appealReason}`,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // Discord returns 204 No Content on success
    if (response.status === 204 || response.status === 200) {
      console.log('✅ Sent to Discord');
      return true;
    }

    console.log('Response:', response.status);
    return true; // Don't fail even if response is odd
  } catch (error) {
    console.error('Webhook error:', error);
    return true; // Don't fail - appeal still submitted locally
  }
};

// Helper function to extract Discord ID from tag
const extractDiscordId = (discordTag: string): string => {
  // If it's already a number (Discord ID), return it
  if (/^\d+$/.test(discordTag)) {
    return discordTag;
  }
  // Otherwise return the tag as-is and let Discord handle it
  return discordTag.replace('#', '');
};
