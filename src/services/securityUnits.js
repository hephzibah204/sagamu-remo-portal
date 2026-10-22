// src/services/securityUnits.js
// Catalog of Security Stations & Units in Sagamu, Ogun State with Onboarded Personnel

export const SAGAMU_STATIONS = [
  {
    id: 'station-npf-div',
    name: 'Sagamu Divisional Police HQ & Area Command',
    code: 'NPF-SGM-01',
    agency: 'Nigeria Police Force',
    category: 'POLICE',
    address: 'Ewusi Street / Akarigbo Road, Sagamu',
    coordinates: { lat: 6.8450, lng: 3.6440 },
    phone: '+234 808 176 2371',
    radioFreq: '144.825 MHz (Tactical 1)',
    readiness: 'HIGH',
    jurisdiction: ['Offin', 'Makun', 'Ita Oba', 'Sabo Commercial District', 'Expressway Axis'],
    activeUnitsCount: 5,
    color: '#3b82f6'
  },
  {
    id: 'station-palace-guard',
    name: 'Aafin Akarigbo Royal Security Command',
    code: 'AKARIGBO-SEC-01',
    agency: 'Palace Royal Security & Town Marshals',
    category: 'COMMUNITY',
    address: 'Aakarigbo Palace Compound, Ita Oba, Offin-Sagamu',
    coordinates: { lat: 6.8485, lng: 3.6465 },
    phone: '+234 802 987 6543',
    radioFreq: '144.900 MHz (Palace Net)',
    readiness: 'HIGH',
    jurisdiction: ['Ita Oba Royal Square', 'Offin Traditional Quarter', 'Palace Environs'],
    activeUnitsCount: 4,
    color: '#eab308'
  },
  {
    id: 'station-sosafe-outpost',
    name: 'Ogun State So-Safe Corps Sagamu Zonal Command',
    code: 'SOSAFE-SGM-02',
    agency: 'Ogun State So-Safe Corps',
    category: 'VIGILANTE',
    address: 'Makun-Sabo Link Road, Sagamu',
    coordinates: { lat: 6.8520, lng: 3.6480 },
    phone: '+234 805 444 3322',
    radioFreq: '145.100 MHz (Sector 2)',
    readiness: 'HIGH',
    jurisdiction: ['Sabo Market', 'Sonyindo', 'Makun', 'Epe-Sagamu', 'Residential Wards'],
    activeUnitsCount: 4,
    color: '#10b981'
  },
  {
    id: 'station-frsc-base',
    name: 'FRSC Sagamu Corridor Command',
    code: 'FRSC-SGM-01',
    agency: 'Federal Road Safety Corps',
    category: 'TRAFFIC',
    address: 'Sagamu Interchange, Lagos-Ibadan & Benin Expressway',
    coordinates: { lat: 6.8843, lng: 3.5817 },
    phone: '122 / +234 807 555 7788',
    radioFreq: '145.350 MHz (Interchange Rescue)',
    readiness: 'HIGH',
    jurisdiction: ['Interchange Overpass', 'Sagamu-Benin Highway', 'Expressway Truck Terminal'],
    activeUnitsCount: 3,
    color: '#f97316'
  },
  {
    id: 'station-amotekun-post',
    name: 'Amotekun Corps Sagamu Sector Command',
    code: 'AMOTEKUN-SGM-03',
    agency: 'Ogun State Amotekun Corps',
    category: 'VIGILANTE',
    address: 'Batoro / Ijagba Perimeter Station, Sagamu',
    coordinates: { lat: 6.8400, lng: 3.6350 },
    phone: '+234 818 222 9900',
    radioFreq: '144.750 MHz (Perimeter Net)',
    readiness: 'HIGH',
    jurisdiction: ['Batoro', 'Ijagba', 'Oko', 'Latawa', 'Outlying Farmlands & Borders'],
    activeUnitsCount: 3,
    color: '#a855f7'
  }
];

export const ONBOARDED_OFFICERS = [
  {
    id: 'off-001',
    name: 'Insp. Babatunde Alabi',
    badge: 'NPF-8842',
    rank: 'Inspector / Sector Commander',
    agency: 'Nigeria Police Force',
    stationId: 'station-npf-div',
    unitName: 'Sagamu Patrol Team Alpha (Car 04)',
    status: 'ONLINE_ACTIVE',
    callsign: 'SAGAMU-EAGLE-1',
    phone: '+234 803 123 4567',
    avatar: '👮‍♂️',
    location: { lat: 6.8465, lng: 3.6450, landmark: 'Ita Oba Roundabout' },
    battery: 92,
    speedKmH: 24,
    lastSeen: 'Just now'
  },
  {
    id: 'off-002',
    name: 'Officer Adekunle Ojo',
    badge: 'NPF-9104',
    rank: 'Sergeant',
    agency: 'Nigeria Police Force',
    stationId: 'station-npf-div',
    unitName: 'Sabo Commercial Rapid Intercept',
    status: 'ONLINE_ACTIVE',
    callsign: 'SAGAMU-EAGLE-2',
    phone: '+234 803 999 1122',
    avatar: '👮‍♂️',
    location: { lat: 6.8540, lng: 3.6485, landmark: 'Sabo Kolanut Market Axis' },
    battery: 78,
    speedKmH: 30,
    lastSeen: '1 min ago'
  },
  {
    id: 'off-003',
    name: 'Chief Guard Rasheed Adeleke',
    badge: 'PAL-007',
    rank: 'High Chief Marshal',
    agency: 'Palace Royal Security & Town Marshals',
    stationId: 'station-palace-guard',
    unitName: 'Aafin Akarigbo Royal Escort Squad',
    status: 'ONLINE_ACTIVE',
    callsign: 'AKARIGBO-LEAD',
    phone: '+234 802 987 6543',
    avatar: '🛡️',
    location: { lat: 6.8485, lng: 3.6465, landmark: 'Aafin Akarigbo Gate' },
    battery: 88,
    speedKmH: 0,
    lastSeen: 'Just now'
  },
  {
    id: 'off-004',
    name: 'Commander Yemi Solaja',
    badge: 'SOS-302',
    rank: 'Area Sector Commander',
    agency: 'Ogun State So-Safe Corps',
    stationId: 'station-sosafe-outpost',
    unitName: 'So-Safe Sagamu Quick Response',
    status: 'ONLINE_ACTIVE',
    callsign: 'PANTHER-1',
    phone: '+234 805 444 3322',
    avatar: '🚨',
    location: { lat: 6.8430, lng: 3.6510, landmark: 'Makun Market Junction' },
    battery: 81,
    speedKmH: 15,
    lastSeen: 'Just now'
  },
  {
    id: 'off-005',
    name: 'DRC Chinedu Okafor',
    badge: 'FRSC-771',
    rank: 'Deputy Route Commander',
    agency: 'Federal Road Safety Corps',
    stationId: 'station-frsc-base',
    unitName: 'Interchange Rescue Ambulance Unit 1',
    status: 'ONLINE_ACTIVE',
    callsign: 'RESCUE-INTERCHANGE',
    phone: '+234 807 555 7788',
    avatar: '🚑',
    location: { lat: 6.8840, lng: 3.5820, landmark: 'Sagamu Tollgate Overpass' },
    battery: 95,
    speedKmH: 0,
    lastSeen: '2 mins ago'
  },
  {
    id: 'off-006',
    name: 'Agbaode Gbadamosi',
    badge: 'AMT-109',
    rank: 'Field Operative',
    agency: 'Amotekun Corps / Local Hunters Guild',
    stationId: 'station-amotekun-post',
    unitName: 'Batoro Border & Forest Patrol Unit',
    status: 'ONLINE_ACTIVE',
    callsign: 'HUNTER-SAGAMU',
    phone: '+234 818 222 9900',
    avatar: '🏹',
    location: { lat: 6.8390, lng: 3.6330, landmark: 'Batoro Border Path' },
    battery: 70,
    speedKmH: 5,
    lastSeen: 'Just now'
  }
];

// Legacy backward-compatibility alias
export const OGERE_STATIONS = SAGAMU_STATIONS;

export function getStationById(stationId) {
  return SAGAMU_STATIONS.find(s => s.id === stationId) || SAGAMU_STATIONS[0];
}

export function getOfficerById(officerId) {
  return ONBOARDED_OFFICERS.find(o => o.id === officerId) || ONBOARDED_OFFICERS[0];
}

export function getStationForOfficer(officerId) {
  const officer = getOfficerById(officerId);
  return getStationById(officer.stationId);
}
