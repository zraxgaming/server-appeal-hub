// Appeal data types
export interface AppealData {
  id: string;
  username: string;
  discordTag: string;
  email: string;
  banReason: string;
  appealReason: string;
  additionalInfo?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'denied';
}

// Generate unique ID
const generateId = (): string => {
  return `appeal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// localStorage key
const STORAGE_KEY = 'zcraft_appeals';

// Get all appeals from localStorage
export const getAppeals = (): AppealData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading appeals from localStorage:', error);
    return [];
  }
};

// Save appeal to localStorage
export const saveAppeal = (appealData: Omit<AppealData, 'id' | 'submittedAt' | 'status'>): AppealData => {
  const newAppeal: AppealData = {
    ...appealData,
    id: generateId(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  const appeals = getAppeals();
  appeals.unshift(newAppeal);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appeals));
  
  return newAppeal;
};

// Get appeal by ID
export const getAppealById = (id: string): AppealData | null => {
  const appeals = getAppeals();
  return appeals.find(appeal => appeal.id === id) || null;
};

// Update appeal status
export const updateAppealStatus = (id: string, status: AppealData['status']): boolean => {
  const appeals = getAppeals();
  const index = appeals.findIndex(appeal => appeal.id === id);
  
  if (index === -1) return false;
  
  appeals[index].status = status;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appeals));
  return true;
};

// Optional webhook submission
export const submitToWebhook = async (appealData: AppealData): Promise<boolean> => {
  // Webhook URL would be configured - for now we'll skip if not available
  const webhookUrl = import.meta.env.VITE_APPEAL_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('No webhook URL configured, skipping webhook submission');
    return true; // Return true as webhook is optional
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        embeds: [{
          title: '📋 New Ban Appeal',
          color: 0x22c55e,
          fields: [
            { name: 'Username', value: appealData.username, inline: true },
            { name: 'Discord', value: appealData.discordTag, inline: true },
            { name: 'Email', value: appealData.email, inline: true },
            { name: 'Ban Reason', value: appealData.banReason },
            { name: 'Appeal Reason', value: appealData.appealReason },
            ...(appealData.additionalInfo ? [{ name: 'Additional Info', value: appealData.additionalInfo }] : []),
          ],
          footer: { text: `Appeal ID: ${appealData.id}` },
          timestamp: appealData.submittedAt,
        }],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Webhook submission failed (optional, continuing):', error);
    return true; // Return true as webhook is optional
  }
};
