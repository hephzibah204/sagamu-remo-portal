// mobile/src/services/sagamuGeoEngine.ts
// Sagamu Hyper-Local Geocoding & High-Precision Location Engine

export interface SagamuLandmark {
  id: string;
  name: string;
  sector: string;
  lat: number;
  lng: number;
  type: string;
  note: string;
}

export const SAGAMU_BOUNDS = {
  minLat: 6.8000,
  maxLat: 6.9000,
  minLng: 3.5700,
  maxLng: 3.7100,
};

export const SAGAMU_LANDMARKS: SagamuLandmark[] = [
  {
    id: 'palace',
    name: 'Aafin Akarigbo Palace & Ita Oba',
    sector: 'Sector 1 — Royal & Administrative Core',
    lat: 6.8485,
    lng: 3.6465,
    type: 'royal',
    note: 'Ita Oba, Offin · Seat of HRM The Akarigbo of Remoland',
  },
  {
    id: 'makun_palace',
    name: 'Ewusi of Makun Palace',
    sector: 'Sector 2 — Makun Quarter',
    lat: 6.8420,
    lng: 3.6520,
    type: 'royal',
    note: 'Ewusi Street, Makun',
  },
  {
    id: 'police_hq',
    name: 'Sagamu Divisional Police HQ',
    sector: 'Sector 3 — Security Command',
    lat: 6.8450,
    lng: 3.6440,
    type: 'security',
    note: 'Ewusi / Akarigbo Road',
  },
  {
    id: 'oouth',
    name: 'OOUTH Teaching Hospital',
    sector: 'Sector 4 — Medical Belt',
    lat: 6.8372,
    lng: 3.6420,
    type: 'medical',
    note: 'Hospital Road, Sagamu',
  },
  {
    id: 'sabo_market',
    name: 'Sabo Kolanut International Market',
    sector: 'Sector 5 — Trade Hub',
    lat: 6.8550,
    lng: 3.6490,
    type: 'commerce',
    note: 'Sabo Quarter, Sagamu',
  },
  {
    id: 'stadium',
    name: 'Gateway International Stadium',
    sector: 'Sector 6 — Civic Arena',
    lat: 6.8320,
    lng: 3.6310,
    type: 'civic',
    note: 'Stadium Road, Sagamu',
  },
  {
    id: 'interchange',
    name: 'Sagamu Interchange',
    sector: 'Sector 7 — Expressway Gateway',
    lat: 6.8843,
    lng: 3.5817,
    type: 'transit',
    note: 'Lagos-Ibadan & Benin Expressway Junction',
  },
];

export function calculateDistanceMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export function isInsideSagamu(lat: number, lng: number): boolean {
  return (
    lat >= SAGAMU_BOUNDS.minLat &&
    lat <= SAGAMU_BOUNDS.maxLat &&
    lng >= SAGAMU_BOUNDS.minLng &&
    lng <= SAGAMU_BOUNDS.maxLng
  );
}

export function resolveSagamuLocation(lat: number, lng: number) {
  const inside = isInsideSagamu(lat, lng);
  let closest = SAGAMU_LANDMARKS[0];
  let minDistance = Infinity;

  for (const lm of SAGAMU_LANDMARKS) {
    const dist = calculateDistanceMeters(lat, lng, lm.lat, lm.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = lm;
    }
  }

  return {
    isSagamu: inside,
    landmark: closest.name,
    sector: closest.sector,
    distanceMeters: minDistance,
    formattedText: inside
      ? `~${minDistance}m from ${closest.name}, Sagamu`
      : `⚠️ ${Math.round(minDistance / 1000)}km outside Sagamu (${closest.name})`,
  };
}


