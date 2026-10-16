import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckStatus, setAdminCheckStatus] = useState('idle'); // 'idle' | 'checking' | 'authorized' | 'unauthorized' | 'table_missing'
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const isConfigured = isSupabaseConfigured();

  // Verify whether the authenticated user has admin privileges
  const verifyAdminPrivilege = useCallback(async (currentUser) => {
    if (!currentUser || !supabase) {
      setIsAdmin(false);
      setAdminCheckStatus('unauthorized');
      return false;
    }

    setAdminCheckStatus('checking');

    try {
      // Query the admin_profiles table protected by RLS
      const { data, error } = await supabase
        .from('admin_profiles')
        .select('id, email, role')
        .eq('id', currentUser.id)
        .maybeSingle();

      if (error) {
        // Table might not exist yet or RLS blocked
        console.warn('[Ayush Hub Security] admin_profiles query returned error:', error.message);
        
        // If table doesn't exist, check if user has an admin role in user_metadata or app_metadata
        const metadataRole = currentUser.app_metadata?.role || currentUser.user_metadata?.role;
        if (metadataRole === 'admin') {
          setIsAdmin(true);
          setAdminCheckStatus('authorized');
          return true;
        }

        // Check if an allowed admin email env is set as fallback
        const envAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'ayushshrivastava2108@gmail.com').trim().toLowerCase();
        if (envAdminEmail && currentUser.email?.toLowerCase() === envAdminEmail) {
          setIsAdmin(true);
          setAdminCheckStatus('authorized');
          return true;
        }

        setAdminCheckStatus('table_missing');
        setIsAdmin(false);
        return false;
      }

      if (data && (data.role === 'admin' || data.role === 'superadmin')) {
        setIsAdmin(true);
        setAdminCheckStatus('authorized');
        return true;
      } else {
        // Fallback checks for metadata/env if table row is absent
        const metadataRole = currentUser.app_metadata?.role || currentUser.user_metadata?.role;
        const envAdminEmail = (import.meta.env.VITE_ADMIN_EMAIL || 'ayushshrivastava2108@gmail.com').trim().toLowerCase();
        
        if (metadataRole === 'admin' || (envAdminEmail && currentUser.email?.toLowerCase() === envAdminEmail)) {
          setIsAdmin(true);
          setAdminCheckStatus('authorized');
          return true;
        }

        setIsAdmin(false);
        setAdminCheckStatus('unauthorized');
        return false;
      }
    } catch (err) {
      console.error('[Ayush Hub Security] Admin verification check failed:', err);
      setIsAdmin(false);
      setAdminCheckStatus('unauthorized');
      return false;
    }
  }, []);

  // Initialize and listen to auth state changes
  useEffect(() => {
    if (!isConfigured || !supabase) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    // Check existing session
    const initAuth = async () => {
      try {
        const { data: { session: existingSession }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (isMounted) {
          setSession(existingSession);
          setUser(existingSession?.user ?? null);
          if (existingSession?.user) {
            await verifyAdminPrivilege(existingSession.user);
          } else {
            setIsAdmin(false);
            setAdminCheckStatus('idle');
          }
        }
      } catch (err) {
        console.error('[Ayush Hub Security] Session initialization error:', err);
        if (isMounted) {
          setAuthError(err.message);
          setSession(null);
          setUser(null);
          setIsAdmin(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initAuth();

    // Subscribe to auth state updates (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!isMounted) return;

      setSession(newSession);
      setUser(newSession?.user ?? null);

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') {
        if (newSession?.user) {
          await verifyAdminPrivilege(newSession.user);
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAdmin(false);
        setAdminCheckStatus('idle');
        setAuthError(null);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [isConfigured, verifyAdminPrivilege]);

  // Log in with email and password
  const login = async (email, password) => {
    if (!isConfigured || !supabase) {
      throw new Error('Supabase is not configured. Please supply VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
    }

    setAuthError(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      setSession(data.session);
      setUser(data.user);

      const hasAdminRights = await verifyAdminPrivilege(data.user);
      return { success: true, user: data.user, isAdmin: hasAdminRights };
    } catch (err) {
      const msg = err.message || 'Authentication failed. Please verify credentials.';
      setAuthError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign out
  const logout = async () => {
    if (!supabase) return;

    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setAdminCheckStatus('idle');
      setAuthError(null);
    } catch (err) {
      console.error('[Ayush Hub Security] Sign out error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Password reset request
  const resetPassword = async (email) => {
    if (!isConfigured || !supabase) {
      throw new Error('Supabase is not configured.');
    }

    const redirectUrl = `${window.location.origin}${window.location.pathname}#admin`;
    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectUrl,
    });

    if (error) throw error;
    return data;
  };

  const value = {
    user,
    session,
    isAdmin,
    adminCheckStatus,
    loading,
    isConfigured,
    authError,
    login,
    logout,
    resetPassword,
    verifyAdminPrivilege: () => user && verifyAdminPrivilege(user),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
