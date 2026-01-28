import { supabase } from '@/integrations/supabase/client';

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

// Generate unique ID
const generateId = (): string => {
  return `appeal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// localStorage key for backup
const STORAGE_KEY = 'zcraft_appeals_backup';

// Get all appeals from Supabase
export const getAppeals = async (): Promise<AppealData[]> => {
  try {
    const { data, error } = await supabase
      .from('ban_appeals')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching appeals from Supabase:', error);
      // Fallback to localStorage
      return getAppealsFromLocalStorage();
    }

    return (data || []).map(appeal => ({
      id: appeal.id,
      username: appeal.username,
      discordId: appeal.discord_tag || '',
      email: appeal.email || '',
      banReason: appeal.ban_reason || '',
      appealReason: appeal.appeal_reason || '',
      submittedAt: appeal.created_at,
      status: (appeal.status as 'pending' | 'approved' | 'denied') || 'pending',
    }));
  } catch (error) {
    console.error('Error reading appeals from Supabase:', error);
    return getAppealsFromLocalStorage();
  }
};

// Fallback: Get appeals from localStorage
const getAppealsFromLocalStorage = (): AppealData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading appeals from localStorage:', error);
    return [];
  }
};

// Save appeal to both Supabase and localStorage
export const saveAppeal = async (appealData: Omit<AppealData, 'id' | 'submittedAt' | 'status'>): Promise<AppealData> => {
  const newAppeal: AppealData = {
    ...appealData,
    id: generateId(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };

  // Try to save to Supabase
  try {
    const { error } = await supabase
      .from('ban_appeals')
      .insert([
        {
          username: newAppeal.username,
          discord_tag: newAppeal.discordId,
          email: newAppeal.email,
          ban_reason: newAppeal.banReason,
          appeal_reason: newAppeal.appealReason,
          status: newAppeal.status,
        }
      ]);

    if (error) {
      console.error('Error saving to Supabase:', error);
      // Fallback to localStorage
      saveAppealToLocalStorage(newAppeal);
    } else {
      console.log('Appeal saved to Supabase successfully');
    }
  } catch (error) {
    console.error('Exception while saving to Supabase:', error);
    // Fallback to localStorage
    saveAppealToLocalStorage(newAppeal);
  }

  return newAppeal;
};

// Fallback: Save appeal to localStorage
const saveAppealToLocalStorage = (newAppeal: AppealData): void => {
  const appeals = getAppealsFromLocalStorage();
  appeals.unshift(newAppeal);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appeals));
};

// Get appeal by ID
export const getAppealById = async (id: string): Promise<AppealData | null> => {
  try {
    const { data, error } = await supabase
      .from('ban_appeals')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      console.error('Error fetching appeal from Supabase:', error);
      // Fallback to localStorage
      const appeals = getAppealsFromLocalStorage();
      return appeals.find(appeal => appeal.id === id) || null;
    }

    return {
      id: data.id,
      username: data.username,
      discordId: data.discord_tag || '',
      email: data.email || '',
      banReason: data.ban_reason || '',
      appealReason: data.appeal_reason || '',
      submittedAt: data.created_at,
      status: (data.status as 'pending' | 'approved' | 'denied') || 'pending',
    };
  } catch (error) {
    console.error('Error reading appeal from Supabase:', error);
    const appeals = getAppealsFromLocalStorage();
    return appeals.find(appeal => appeal.id === id) || null;
  }
};

// Update appeal status
export const updateAppealStatus = async (id: string, status: AppealData['status']): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('ban_appeals')
      .update({ 
        status: status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);

    if (error) {
      console.error('Error updating appeal status in Supabase:', error);
      // Fallback to localStorage
      return updateAppealStatusInLocalStorage(id, status);
    }

    return true;
  } catch (error) {
    console.error('Exception while updating appeal status in Supabase:', error);
    return updateAppealStatusInLocalStorage(id, status);
  }
};

// Fallback: Update appeal status in localStorage
const updateAppealStatusInLocalStorage = (id: string, status: AppealData['status']): boolean => {
  const appeals = getAppealsFromLocalStorage();
  const index = appeals.findIndex(appeal => appeal.id === id);
  
  if (index === -1) return false;
  
  appeals[index].status = status;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appeals));
  return true;
};

// Webhook submission
export const submitToWebhook = async (appealData: AppealData): Promise<boolean> => {
  // Get webhook URL from environment variable
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
        id: appealData.id,
        username: appealData.username,
        discordId: appealData.discordId,
        email: appealData.email,
        banReason: appealData.banReason,
        appealReason: appealData.appealReason,
        submittedAt: appealData.submittedAt,
        status: appealData.status,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Webhook submission failed:', response.status, errorData);
      return false;
    }

    console.log('Webhook submitted successfully');
    return true;
  } catch (error) {
    console.error('Webhook submission failed:', error);
    return false;
  }
};
