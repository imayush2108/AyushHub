import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://bflhzjbthimcqvclmmsh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmbGh6amJ0aGltY3F2Y2xtbXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxMjYxNzcsImV4cCI6MjEwNzcwMjE3N30.8L22LEob1u6Sh6Nmeio1vTz0VjhU7HufHVFVz_L1Auo';

export const isSupabaseConfigured = () => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (supabaseUrl.includes('your-supabase-url') || supabaseUrl.includes('placeholder')) return false;
  if (supabaseAnonKey.includes('your-anon-key') || supabaseAnonKey.includes('placeholder')) return false;
  try {
    const url = new URL(supabaseUrl);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
};

export const supabaseConfig = {
  url: supabaseUrl,
  hasAnonKey: Boolean(supabaseAnonKey),
  isConfigured: isSupabaseConfigured(),
};

// Initialize client only when valid configuration is present to avoid runtime crashes
export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'ayush_hub_admin_auth',
      },
    })
  : null;
