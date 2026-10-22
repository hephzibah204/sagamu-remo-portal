import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../database/syncManager';

export interface CitizenIdCard {
  id: string;
  fullName: string;
  cardType: 'indigene' | 'non-indigene' | 'guest';
  subCategoryLabel?: string;
  locationSummary?: string;
  indigeneResidency?: 'sagamu' | 'diaspora' | 'nigeria' | null;
  quarter?: string;
  compound?: string;
  guestInterest?: string | null;
  status: string;
  issuedDate: string;
  expiryDate: string;
  verifiedBy: string;
  qrCodeUrl: string;
}

export interface CitizenUser {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  citizenType: 'indigene' | 'non-indigene' | 'guest';
  subCategoryLabel?: string;
  locationSummary?: string;
  indigeneResidency?: 'sagamu' | 'diaspora' | 'nigeria' | null;
  diasporaCountry?: string | null;
  diasporaCity?: string | null;
  nigeriaState?: string | null;
  nigeriaCity?: string | null;
  guestInterest?: string | null;
  quarter?: string;
  compound?: string;
  idCardNumber?: string;
  role: string;
  isVerified: boolean;
  idCard?: CitizenIdCard | null;
}

interface AuthContextType {
  user: CitizenUser | null;
  token: string | null;
  isLoading: boolean;
  isGuest: boolean;
  hasBiometrics: boolean;
  setGuestMode: (enabled: boolean) => void;
  signIn: (identifier: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: {
    fullName: string;
    email?: string;
    phone?: string;
    password: string;
    citizenType: 'indigene' | 'non-indigene' | 'guest';
    indigeneResidency?: 'sagamu' | 'diaspora' | 'nigeria';
    diasporaCountry?: string;
    diasporaCity?: string;
    nigeriaState?: string;
    nigeriaCity?: string;
    quarter?: string;
    compound?: string;
    address?: string;
    occupation?: string;
    guestInterest?: string;
    cityCountry?: string;
    organization?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  authenticateWithBiometrics: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const TOKEN_KEY = 'sagamu_auth_token';
const USER_KEY = 'sagamu_auth_user';
const BIOMETRIC_TOKEN_KEY = 'sagamu_bio_token';
const BIOMETRIC_USER_KEY = 'sagamu_bio_user';
const GUEST_KEY = 'sagamu_guest_mode';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CitizenUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [hasBiometrics, setHasBiometrics] = useState(false);

  useEffect(() => {
    bootstrapAuth();
    checkBiometrics();
  }, []);

  const checkBiometrics = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setHasBiometrics(compatible && enrolled);
    } catch {
      setHasBiometrics(false);
    }
  };

  const syncOfflineRegistrations = async () => {
    try {
      const rawOffline = await AsyncStorage.getItem('sagamu_offline_users');
      if (!rawOffline) return;
      const offlineList: any[] = JSON.parse(rawOffline);
      const unsynced = offlineList.filter((u) => !u.syncedToCloud && u.password);
      if (unsynced.length === 0) return;

      let changed = false;
      for (const item of unsynced) {
        try {
          const res = await fetch(`${API_BASE_URL}/api/auth?action=register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
          });
          if (res.ok || res.status === 409) {
            item.syncedToCloud = true;
            changed = true;
          }
        } catch (_) {}
      }
      if (changed) {
        await AsyncStorage.setItem('sagamu_offline_users', JSON.stringify(offlineList));
      }
    } catch (_) {}
  };

  const bootstrapAuth = async () => {
    try {
      let savedToken: string | null = null;
      try {
        savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      } catch {
        savedToken = await AsyncStorage.getItem(TOKEN_KEY);
      }

      const savedUser = await AsyncStorage.getItem(USER_KEY);

      const savedGuest = await AsyncStorage.getItem(GUEST_KEY);
      if (savedGuest === 'true' && !savedToken) {
        setIsGuest(true);
      }

      if (savedToken && savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);

        // Live profile synchronization with Neon PostgreSQL backend (with 3.5s timeout)
        const syncCtrl = new AbortController();
        const syncTimeout = setTimeout(() => syncCtrl.abort(), 3500);

        fetch(`${API_BASE_URL}/api/auth?action=me`, {
          headers: { Authorization: `Bearer ${savedToken}` },
          signal: syncCtrl.signal,
        })
          .then((r) => r.json())
          .then(async (data) => {
            clearTimeout(syncTimeout);
            if (data && data.success && data.user) {
              setUser(data.user);
              await AsyncStorage.setItem(USER_KEY, JSON.stringify(data.user));
            }
          })
          .catch(() => {
            clearTimeout(syncTimeout);
          });
      }

      syncOfflineRegistrations();
    } catch (err) {
      console.error('[Auth] Bootstrap failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const setGuestMode = (enabled: boolean) => {
    setIsGuest(enabled);
    AsyncStorage.setItem(GUEST_KEY, enabled ? 'true' : 'false').catch(() => {});
  };

  const persistSession = async (authToken: string, authUser: CitizenUser) => {
    setToken(authToken);
    setUser(authUser);
    setIsGuest(false);
    AsyncStorage.setItem(GUEST_KEY, 'false').catch(() => {});

    try {
      await SecureStore.setItemAsync(TOKEN_KEY, authToken);
      await SecureStore.setItemAsync(BIOMETRIC_TOKEN_KEY, authToken);
    } catch {
      await AsyncStorage.setItem(TOKEN_KEY, authToken);
      await AsyncStorage.setItem(BIOMETRIC_TOKEN_KEY, authToken);
    }
    const userJson = JSON.stringify(authUser);
    await AsyncStorage.setItem(USER_KEY, userJson);
    await AsyncStorage.setItem(BIOMETRIC_USER_KEY, userJson);
  };

  const signIn = async (identifier: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    const cleanIdent = (identifier || '').trim().toLowerCase();
    const cleanPhone = cleanIdent.replace(/\D/g, '');

    // 10-second timeout to prevent the button from hanging indefinitely on slow mobile networks
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: cleanIdent, password: pass }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await res.json().catch(() => null);
      if (!res.ok || !data || !data.success) {
        return {
          success: false,
          error: (data && data.error) || 'Invalid credentials. Please check your email/phone and password.',
        };
      }

      await persistSession(data.token, data.user);
      return { success: true };
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn('[AuthContext] Network login error:', err?.message || err);

      // Offline fallback authentication for accounts registered while offline
      try {
        const rawOffline = await AsyncStorage.getItem('sagamu_offline_users');
        const offlineUsers: any[] = rawOffline ? JSON.parse(rawOffline) : [];

        const found = offlineUsers.find(u => {
          const uEmail = (u.email || '').toLowerCase().trim();
          const uPhone = (u.phone || '').replace(/\D/g, '');
          const uCard = (u.idCardNumber || '').toLowerCase().trim();
          const matches = uEmail === cleanIdent || (cleanPhone && uPhone === cleanPhone) || uCard === cleanIdent;
          return matches && u.password === pass;
        });

        if (found) {
          const { password: _, ...cleanUser } = found;
          const offlineToken = 'offline_jwt_' + Date.now();
          await persistSession(offlineToken, cleanUser);
          return { success: true };
        }
      } catch (_) {}

      // Fast fallback for standard demo/tester accounts when testing offline
      if (
        (cleanIdent === 'adewale.ogunleke@gmail.com' || cleanIdent === 'adewale@gmail.com') &&
        (pass === 'password123' || pass === 'sagamu2026')
      ) {
        const demoCitizen: CitizenUser = {
          id: 'demo_adewale_01',
          fullName: 'Chief Adewale Ogunleke',
          email: 'adewale.ogunleke@gmail.com',
          phone: '08034512345',
          citizenType: 'indigene',
          subCategoryLabel: 'Indigene · Resident in Sagamu',
          locationSummary: 'Resident in Sagamu (Itun-Iseje)',
          indigeneResidency: 'sagamu',
          diasporaCountry: null,
          diasporaCity: null,
          nigeriaState: null,
          nigeriaCity: null,
          guestInterest: null,
          quarter: 'Itun-Iseje',
          compound: 'Agbo Ile Obalufe',
          idCardNumber: 'SGM-IND-OG-782910',
          role: 'citizen',
          isVerified: true,
          idCard: {
            id: 'SGM-IND-OG-782910',
            fullName: 'Chief Adewale Ogunleke',
            cardType: 'indigene',
            subCategoryLabel: 'Indigene · Resident in Sagamu',
            locationSummary: 'Resident in Sagamu (Itun-Iseje)',
            indigeneResidency: 'sagamu',
            quarter: 'Itun-Iseje',
            compound: 'Agbo Ile Obalufe',
            guestInterest: null,
            status: 'approved',
            issuedDate: '2026-01-01',
            expiryDate: '2029-01-01',
            verifiedBy: 'Palace ICT Registry',
            qrCodeUrl: 'https://sagamu-portal.vercel.app/verify/SGM-IND-OG-782910',
          },
        };
        await persistSession('demo_token_' + Date.now(), demoCitizen);
        return { success: true };
      }

      const isTimeout = err?.name === 'AbortError';
      const msg = isTimeout
        ? 'Network request timed out. Please check your internet connection.'
        : 'Unable to connect to server. Please check your credentials or internet connection.';
      return { success: false, error: msg };
    }
  };

  const signUp = async (formData: any) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth?action=register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data && data.success) {
        await persistSession(data.token, data.user);
        return { success: true };
      }

      if (data && data.error) {
        return { success: false, error: data.error };
      }
    } catch (err: any) {
      console.warn('[Auth] Remote registration unreachable, queueing offline registration for sync...');
    }

    // Offline registration fallback: immediate certified Digital ID generation
    const randNum = Math.floor(100000 + Math.random() * 900000);
    let cardPrefix = 'SGM-IND';
    let locationSummary = '';
    let subCategoryLabel = '';

    if (formData.citizenType === 'indigene') {
      if (formData.indigeneResidency === 'diaspora') {
        cardPrefix = 'SGM-IND-INT';
        locationSummary = `Diaspora (${formData.diasporaCity ? formData.diasporaCity + ', ' : ''}${formData.diasporaCountry || 'International'})`;
        subCategoryLabel = 'Indigene · Diaspora';
      } else if (formData.indigeneResidency === 'nigeria') {
        cardPrefix = 'SGM-IND-NG';
        locationSummary = `Nigeria (${formData.nigeriaCity ? formData.nigeriaCity + ', ' : ''}${formData.nigeriaState || 'Interstate'})`;
        subCategoryLabel = 'Indigene · In Nigeria';
      } else {
        cardPrefix = 'SGM-IND-OG';
        locationSummary = `Resident in Sagamu (${formData.quarter || 'Itun-Iseje'})`;
        subCategoryLabel = 'Indigene · Resident in Sagamu';
      }
    } else if (formData.citizenType === 'non-indigene') {
      cardPrefix = 'SGM-RES';
      locationSummary = formData.address ? `${formData.address}, Sagamu` : `Resident in Sagamu (${formData.quarter || 'Itun-Iseje'})`;
      subCategoryLabel = 'Non-Indigene Resident';
    } else {
      cardPrefix = 'SGM-GST';
      locationSummary = formData.cityCountry || 'External Supporter';
      subCategoryLabel = `Guest (${formData.guestInterest || 'Friend of Sagamu'})`;
    }

    const cardId = `${cardPrefix}-${randNum}`;

    const today = new Date().toISOString().split('T')[0];
    const expiry = new Date(Date.now() + 3 * 365 * 24 * 3600 * 1000).toISOString().split('T')[0];

    const localUser: CitizenUser = {
      id: 'usr_' + Date.now().toString(36),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      citizenType: formData.citizenType,
      subCategoryLabel,
      locationSummary,
      indigeneResidency: formData.citizenType === 'indigene' ? formData.indigeneResidency : null,
      diasporaCountry: formData.diasporaCountry || null,
      diasporaCity: formData.diasporaCity || null,
      nigeriaState: formData.nigeriaState || null,
      nigeriaCity: formData.nigeriaCity || null,
      guestInterest: formData.guestInterest || null,
      quarter: formData.quarter || (formData.citizenType === 'guest' ? 'External' : 'Itun-Iseje'),
      compound: formData.compound || '',
      idCardNumber: cardId,
      role: formData.citizenType === 'guest' ? 'guest' : 'citizen',
      isVerified: true,
      idCard: {
        id: cardId,
        fullName: formData.fullName,
        cardType: formData.citizenType,
        subCategoryLabel,
        locationSummary,
        indigeneResidency: formData.citizenType === 'indigene' ? formData.indigeneResidency : null,
        quarter: formData.quarter || (formData.citizenType === 'guest' ? 'External' : 'Itun-Iseje'),
        compound: formData.compound || '',
        guestInterest: formData.guestInterest || null,
        status: 'approved',
        issuedDate: today,
        expiryDate: expiry,
        verifiedBy: 'HRH Akarigbo Palace ICT Registry',
        qrCodeUrl: `https://sagamu-portal.vercel.app/verify-id/${cardId}`,
      },
    };

    const offlineToken = 'offline_jwt_' + Date.now();
    await persistSession(offlineToken, localUser);

    try {
      const rawOffline = await AsyncStorage.getItem('sagamu_offline_users');
      const offlineList: any[] = rawOffline ? JSON.parse(rawOffline) : [];
      offlineList.unshift({ ...localUser, password: formData.password, syncedToCloud: false });
      await AsyncStorage.setItem('sagamu_offline_users', JSON.stringify(offlineList));
    } catch (_) {}

    return { success: true };
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    setIsGuest(true);
    AsyncStorage.setItem(GUEST_KEY, 'true').catch(() => {});
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    } catch {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }
    await AsyncStorage.removeItem(USER_KEY);
  };

  const deleteAccount = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (user?.id || token) {
        await fetch(`${API_BASE_URL}/api/auth?action=delete_account`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ action: 'delete_account', userId: user?.id }),
        }).catch(() => {});
      }
      try {
        await SecureStore.deleteItemAsync(BIOMETRIC_TOKEN_KEY);
      } catch {
        await AsyncStorage.removeItem(BIOMETRIC_TOKEN_KEY);
      }
      await AsyncStorage.removeItem(BIOMETRIC_USER_KEY);
      await signOut();
      return { success: true };
    } catch (e: any) {
      return { success: false, error: e?.message || 'Failed to delete account' };
    }
  };

  const authenticateWithBiometrics = async (): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Unlock Sagamu Civic Portal',
        fallbackLabel: 'Use Password',
        disableDeviceFallback: false,
      });
      if (!result.success) return false;

      let bioToken: string | null = null;
      try {
        bioToken = await SecureStore.getItemAsync(BIOMETRIC_TOKEN_KEY);
      } catch {
        bioToken = await AsyncStorage.getItem(BIOMETRIC_TOKEN_KEY);
      }
      const bioUser = await AsyncStorage.getItem(BIOMETRIC_USER_KEY);
      if (bioToken && bioUser) {
        await persistSession(bioToken, JSON.parse(bioUser));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isGuest,
        hasBiometrics,
        setGuestMode,
        signIn,
        signUp,
        signOut,
        deleteAccount,
        authenticateWithBiometrics,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
