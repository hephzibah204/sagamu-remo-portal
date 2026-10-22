// mobile/src/services/fixMyStreetService.ts
// Civic Infrastructure, Public Works & IBEDC Power Grid Monitor for Sagamu Remo Mobile App

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IssueCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface QuarterPowerStatus {
  id: string;
  name: string;
  powerStatus: 'ON' | 'OFF';
  lastPowerChange: string;
  transformer: string;
  loadRating: string;
}

export interface StreetIssue {
  id: string;
  title: string;
  category: string;
  quarter: string;
  location: string;
  latitude: number;
  longitude: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'REPORTED' | 'INVESTIGATING' | 'CONTRACTOR_ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED';
  upvotes: number;
  reporterName: string;
  description: string;
  assignedContractor: string | null;
  contractorEta: string | null;
  reportedAt: string;
  photoUrl: string | null;
}

export const ISSUE_CATEGORIES: IssueCategory[] = [
  { id: 'pothole_road', label: 'Road Damage & Potholes', icon: '🚧', color: '#f59e0b' },
  { id: 'power_transformer', label: 'IBEDC Transformer / Blackout', icon: '⚡', color: '#eab308' },
  { id: 'drainage_flooding', label: 'Clogged Drainage & Flooding', icon: '🌊', color: '#38bdf8' },
  { id: 'streetlight_fault', label: 'Solar Streetlight Malfunction', icon: '💡', color: '#a855f7' },
  { id: 'water_pipe_leak', label: 'Public Borehole / Pipe Burst', icon: '🚰', color: '#06b6d4' },
  { id: 'waste_dump', label: 'Illegal Waste Dump & Sanitation', icon: '🗑️', color: '#ef4444' },
];

export const SAGAMU_QUARTERS: QuarterPowerStatus[] = [
  // Itajiren Ward Quarters
  { id: 'itun_iseje', name: 'Itun-Iseje', powerStatus: 'ON', lastPowerChange: '3 hrs ago', transformer: 'Iseje Feeder 500kVA', loadRating: '74%' },
  { id: 'itun_morisagbara', name: 'Itun-Morisagbara', powerStatus: 'ON', lastPowerChange: '4 hrs ago', transformer: 'Morisagbara 300kVA', loadRating: '68%' },
  { id: 'itun_okuta', name: 'Itun-Okuta', powerStatus: 'ON', lastPowerChange: '2 hrs ago', transformer: 'Okuta Substation 500kVA', loadRating: '82%' },
  { id: 'itun_oke', name: 'Itun-Oke', powerStatus: 'ON', lastPowerChange: '5 hrs ago', transformer: 'Itun-Oke Feeder 300kVA', loadRating: '71%' },
  { id: 'itun_epe', name: 'Itun-Epe', powerStatus: 'ON', lastPowerChange: '1 hr ago', transformer: 'Epe Line 300kVA', loadRating: '65%' },
  { id: 'itun_agbon', name: 'Itun-Agbon', powerStatus: 'ON', lastPowerChange: '6 hrs ago', transformer: 'Agbon Feeder 500kVA', loadRating: '79%' },
  { id: 'itun_nla', name: 'Itun-Nla', powerStatus: 'ON', lastPowerChange: '2 hrs ago', transformer: 'Itun-Nla Substation 500kVA', loadRating: '85%' },
  { id: 'idaren', name: 'Idaren', powerStatus: 'ON', lastPowerChange: '3 hrs ago', transformer: 'Idaren Line 300kVA', loadRating: '60%' },

  // Oke-Lisa (Oke-Ilu) Ward Quarters
  { id: 'itun_iraye', name: 'Itun-Iraye', powerStatus: 'ON', lastPowerChange: '1 hr ago', transformer: 'Iraye Substation 500kVA', loadRating: '77%' },
  { id: 'itun_maro', name: 'Itun-Maro', powerStatus: 'ON', lastPowerChange: '4 hrs ago', transformer: 'Maro Feeder 300kVA', loadRating: '63%' },
  { id: 'itun_lisa', name: 'Itun-Lisa', powerStatus: 'ON', lastPowerChange: '3 hrs ago', transformer: 'Lisa Chieftaincy Feeder 500kVA', loadRating: '80%' },
  { id: 'itun_idomogun', name: 'Itun-Idomogun', powerStatus: 'ON', lastPowerChange: '2 hrs ago', transformer: 'Idomogun Substation 300kVA', loadRating: '72%' },
  { id: 'itun_aledo', name: 'Itun-Aledo', powerStatus: 'ON', lastPowerChange: '5 hrs ago', transformer: 'Aledo Feeder 300kVA', loadRating: '69%' },

  // Historical & Hub Corridors
  { id: 'agbele', name: 'Agbele (Ancestral Cradle)', powerStatus: 'ON', lastPowerChange: '1 hr ago', transformer: 'Agbele Substation 300kVA', loadRating: '62%' },
  { id: 'oja_oba', name: 'Oja Oba Central Palace Axis', powerStatus: 'ON', lastPowerChange: '3 hrs ago', transformer: 'Central Palace 500kVA', loadRating: '88%' },
  { id: 'expressway_toll', name: 'Expressway & Tollgate Hub', powerStatus: 'ON', lastPowerChange: '8 hrs ago', transformer: 'Industrial Feeder 1MVA', loadRating: '91%' },
];

const SEED_ISSUES: StreetIssue[] = [
  {
    id: 'FMS-2026-104',
    title: 'Severe Asphalt Potholes on Palace Way near Town Hall',
    category: 'pothole_road',
    quarter: 'Itun-Oke',
    location: 'Palace Way, directly opposite SDA Secretariat',
    latitude: 6.9368,
    longitude: 3.6330,
    severity: 'HIGH',
    status: 'CONTRACTOR_ASSIGNED',
    upvotes: 28,
    reporterName: 'Segun Ogunsanya',
    description: 'Deep pothole damaging low vehicle suspensions and slowing emergency ambulances from Tollgate.',
    assignedContractor: 'Remo North Works Dept & SDA Paving Unit',
    contractorEta: 'Paving team mobilized for Friday 26th Sep',
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    photoUrl: null,
  },
  {
    id: 'FMS-2026-098',
    title: 'Transformer Fuse Surge near Ijana Junction',
    category: 'power_transformer',
    quarter: 'Itun-Lisa',
    location: 'Ijana Market Link, adjacent to Aladura Primary School',
    latitude: 6.9354,
    longitude: 3.6338,
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    upvotes: 45,
    reporterName: 'Engr. Dapo Alabi',
    description: 'High voltage spark caused feeder trip during evening thunderstorm. Entire Ijana residential axis offline.',
    assignedContractor: 'IBEDC Sagamu Technical Unit',
    contractorEta: 'Engineers on site replacing feeder dropouts',
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    photoUrl: null,
  },
  {
    id: 'FMS-2026-092',
    title: 'Clogged Concrete Gutter Causing Market Stagnation',
    category: 'drainage_flooding',
    quarter: 'Itun-Iseje',
    location: 'Oja Oba Periphery Drain Line 2',
    latitude: 6.9358,
    longitude: 3.6341,
    severity: 'MEDIUM',
    status: 'RESOLVED',
    upvotes: 19,
    reporterName: 'Alhaja Simbiat',
    description: 'Debris accumulated in drain causing rainwater to overflow into market stalls.',
    assignedContractor: 'SDA Sanitation & Youth Taskforce',
    contractorEta: 'Cleared and evacuated on Tuesday',
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    photoUrl: null,
  },
];

const STORAGE_KEY = 'sagamu_fix_my_street_v1';

import Constants from 'expo-constants';
const API_BASE_URL = Constants.expoConfig?.extra?.apiUrl || 'https://sagamu-portal.vercel.app';

export async function getStreetIssues(): Promise<StreetIssue[]> {
  try {
    try {
      const res = await fetch(`${API_BASE_URL}/api/community?type=fix-my-street`);
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data) && data.length > 0) {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          return data;
        }
      }
    } catch (err) {
      console.warn('[FMS Sync Failed]', err);
    }

    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_ISSUES));
      return SEED_ISSUES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_ISSUES;
  }
}

export async function reportStreetIssue(payload: Partial<StreetIssue>): Promise<StreetIssue> {
  const current = await getStreetIssues();
  const id = `FMS-${new Date().getFullYear()}-${String(current.length + 105).padStart(3, '0')}`;

  const newIssue: StreetIssue = {
    id,
    title: payload.title || 'Untitled Civic Issue',
    category: payload.category || 'pothole_road',
    quarter: payload.quarter || 'Itun-Iseje',
    location: payload.location || 'Sagamu Remo',
    latitude: payload.latitude || 6.9371,
    longitude: payload.longitude || 3.6335,
    severity: payload.severity || 'MEDIUM',
    status: 'REPORTED',
    upvotes: 1,
    reporterName: payload.reporterName || 'Concerned Citizen',
    description: payload.description || '',
    assignedContractor: null,
    contractorEta: 'Pending SDA Assessment',
    reportedAt: new Date().toISOString(),
    photoUrl: payload.photoUrl || null,
  };

  const updated = [newIssue, ...current];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  try {
    await fetch(`${API_BASE_URL}/api/community?type=fix-my-street`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    });
  } catch (err) {
    console.warn('[FMS Cloud Sync Fallback]:', err);
  }

  return newIssue;
}

export async function upvoteIssue(issueId: string): Promise<StreetIssue[]> {
  const current = await getStreetIssues();
  let target: StreetIssue | undefined;
  const updated = current.map((item) => {
    if (item.id === issueId) {
      target = { ...item, upvotes: item.upvotes + 1 };
      return target;
    }
    return item;
  });
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

  if (target) {
    try {
      await fetch(`${API_BASE_URL}/api/community?type=fix-my-street`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote', issueId, issueUpdate: target }),
      });
    } catch (err) {
      console.warn('[FMS Upvote Sync Fallback]:', err);
    }
  }

  return updated;
}
