// src/services/fixMyStreetService.js
// Civic Infrastructure, Public Works & IBEDC Power Grid Monitor for Sagamu Remo

export const ISSUE_CATEGORIES = [
  { id: 'pothole_road', label: 'Road Damage & Potholes', icon: '🚧', color: '#f59e0b' },
  { id: 'power_transformer', label: 'IBEDC Transformer / Blackout', icon: '⚡', color: '#eab308' },
  { id: 'drainage_flooding', label: 'Clogged Drainage & Flooding', icon: '🌊', color: '#38bdf8' },
  { id: 'streetlight_fault', label: 'Solar Streetlight Malfunction', icon: '💡', color: '#a855f7' },
  { id: 'water_pipe_leak', label: 'Public Borehole / Pipe Burst', icon: '🚰', color: '#06b6d4' },
  { id: 'waste_dump', label: 'Illegal Waste Dump & Sanitation', icon: '🗑️', color: '#ef4444' },
];

export const SAGAMU_QUARTERS = [
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

const SEED_ISSUES = [
  {
    id: 'FMS-2026-104',
    title: 'Severe Asphalt Potholes on Palace Way near Town Hall',
    category: 'pothole_road',
    quarter: 'Itun-Oke',
    location: 'Palace Way, directly opposite SDA Secretariat',
    latitude: 6.9368,
    longitude: 3.6330,
    severity: 'HIGH',
    status: 'CONTRACTOR_ASSIGNED', // REPORTED, INVESTIGATING, CONTRACTOR_ASSIGNED, IN_PROGRESS, RESOLVED
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
    quarter: 'Makun',
    location: 'Makun Hospital Road Drain',
    latitude: 6.9325,
    longitude: 3.6310,
    severity: 'MEDIUM',
    status: 'RESOLVED',
    upvotes: 19,
    reporterName: 'Mrs. Funke Solarin',
    description: 'Sand silt accumulation blocking stormwater runoff from flowing into the stream.',
    assignedContractor: 'SDA Youth Environmental Sanitation Corps',
    contractorEta: 'Desilting completed and drain opened',
    reportedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    photoUrl: null,
  },
];

export function getStreetIssues() {
  try {
    const stored = localStorage.getItem('sagamu_street_issues');
    return stored ? JSON.parse(stored) : SEED_ISSUES;
  } catch (_) {
    return SEED_ISSUES;
  }
}

export function reportStreetIssue(issueData) {
  const current = getStreetIssues();
  const newId = `FMS-2026-${Math.floor(100 + Math.random() * 900)}`;

  const newIssue = {
    id: newId,
    title: issueData.title,
    category: issueData.category || 'pothole_road',
    quarter: issueData.quarter || 'Itun-Iseje',
    location: issueData.location,
    latitude: issueData.latitude || 6.9368,
    longitude: issueData.longitude || 3.6330,
    severity: issueData.severity || 'MEDIUM',
    status: 'REPORTED',
    upvotes: 1,
    reporterName: issueData.reporterName || 'Concerned Citizen',
    description: issueData.description,
    assignedContractor: 'SDA Public Works Triage Desk',
    contractorEta: 'Under assessment',
    reportedAt: new Date().toISOString(),
    photoUrl: issueData.photoUrl || null,
  };

  const updated = [newIssue, ...current];
  try {
    localStorage.setItem('sagamu_street_issues', JSON.stringify(updated));
    // Asynchronously dispatch to backend database
    fetch('/api/community?type=fix-my-street', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).catch(err => console.warn('[FixMyStreet Cloud Sync Fallback]:', err.message));
  } catch (_) {}

  broadcastFmsEvent('sagamu-fms-updated', newIssue);
  return newIssue;
}

export function upvoteStreetIssue(issueId) {
  const current = getStreetIssues();
  const updated = current.map((i) => (i.id === issueId ? { ...i, upvotes: i.upvotes + 1 } : i));
  const target = updated.find((i) => i.id === issueId);
  try {
    localStorage.setItem('sagamu_street_issues', JSON.stringify(updated));
    if (typeof fetch !== 'undefined') {
      fetch('/api/community?type=fix-my-street', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote', issueId, issueUpdate: target }),
      }).catch(err => console.warn('[FixMyStreet Upvote Sync Fallback]:', err.message));
    }
  } catch (_) {}
  broadcastFmsEvent('sagamu-fms-updated', target);
  return target;
}

export function getPowerGridStatus() {
  try {
    const stored = localStorage.getItem('sagamu_power_grid_status');
    return stored ? JSON.parse(stored) : SAGAMU_QUARTERS;
  } catch (_) {
    return SAGAMU_QUARTERS;
  }
}

export function toggleQuarterPower(quarterId) {
  const current = getPowerGridStatus();
  const updated = current.map((q) => {
    if (q.id === quarterId) {
      const isNowOn = q.powerStatus === 'OFF';
      return {
        ...q,
        powerStatus: isNowOn ? 'ON' : 'OFF',
        lastPowerChange: 'Just now',
        loadRating: isNowOn ? '75%' : '0%',
      };
    }
    return q;
  });

  try {
    localStorage.setItem('sagamu_power_grid_status', JSON.stringify(updated));
  } catch (_) {}

  broadcastFmsEvent('sagamu-power-grid-updated', updated);
  return updated;
}

function broadcastFmsEvent(eventName, detail) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
}
