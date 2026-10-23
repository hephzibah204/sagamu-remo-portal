/**
 * sagamuGeoEngine.js
 * Sagamu (Shagamu) Hyper-Local Geocoding & High-Precision Location Engine
 * 
 * Provides street-level landmark resolution, distance calculation, compass bearings,
 * and high-accuracy satellite map URLs specifically tuned for Sagamu, Ogun State.
 */

// Bounding Box for Sagamu Urban & Metropolitan Interchange Corridor
export const SAGAMU_BOUNDS = {
  minLat: 6.8000,
  maxLat: 6.9000,
  minLng: 3.5700,
  maxLng: 3.7100,
};

// Sagamu High-Precision Landmark Registry
export const SAGAMU_LANDMARKS = [
  {
    id: 'palace',
    name: 'Aafin Akarigbo Palace & Ita Oba Royal Square',
    sector: 'Sector 1 — Royal & Administrative Core (Offin)',
    lat: 6.8485,
    lng: 3.6465,
    type: 'royal',
    note: 'Ita Oba, Offin · Seat of HRM The Akarigbo & Paramount Ruler of Remoland',
  },
  {
    id: 'makun_palace',
    name: 'Ewusi of Makun Palace & Cultural Square',
    sector: 'Sector 2 — Makun Historic Quarter',
    lat: 6.8420,
    lng: 3.6520,
    type: 'royal',
    note: 'Ewusi Street, Makun · Palace of the Ewusi of Makun',
  },
  {
    id: 'police_hq',
    name: 'Sagamu Divisional Police Headquarters & Area Command',
    sector: 'Sector 3 — Security & Emergency',
    lat: 6.8450,
    lng: 3.6440,
    type: 'security',
    note: 'Ewusi Road / Akarigbo Street · DPO & Area Commander HQ',
  },
  {
    id: 'oouth',
    name: 'Olabisi Onabanjo University Teaching Hospital (OOUTH)',
    sector: 'Sector 4 — Tertiary Healthcare & Medical Belt',
    lat: 6.8372,
    lng: 3.6420,
    type: 'medical',
    note: 'Hospital Road, Sagamu · Premier Tertiary Teaching Hospital & Trauma Centre',
  },
  {
    id: 'sabo_market',
    name: 'Sabo International Kolanut Market',
    sector: 'Sector 5 — Trans-West African Trade Hub',
    lat: 6.8550,
    lng: 3.6490,
    type: 'commerce',
    note: 'Sabo Quarter · West Africa\'s Largest Kolanut Exchange & Livestock Market',
  },
  {
    id: 'stadium',
    name: 'Gateway International Stadium Sagamu',
    sector: 'Sector 6 — Sports & Civic Arena',
    lat: 6.8320,
    lng: 3.6310,
    type: 'civic',
    note: 'Stadium Road · 20,000 Capacity Premier Sports and Event Arena',
  },
  {
    id: 'interchange',
    name: 'Sagamu Interchange & Tollgate Overpass',
    sector: 'Sector 7 — Arterial Expressway Gateway',
    lat: 6.8843,
    lng: 3.5817,
    type: 'transit',
    note: 'Lagos-Ibadan & Sagamu-Benin Expressway Interchange Junction',
  },
  {
    id: 'rss_college',
    name: 'Remo Secondary School (RSS Sagamu)',
    sector: 'Sector 8 — Historic Academic Belt',
    lat: 6.8410,
    lng: 3.6390,
    type: 'education',
    note: 'Akarigbo Street · Founded 1946, First Secondary School in Remoland',
  },
  {
    id: 'fggc',
    name: 'Federal Government Girls\' College (FGGC) Sagamu',
    sector: 'Sector 8 — Historic Academic Belt',
    lat: 6.8520,
    lng: 3.6380,
    type: 'education',
    note: 'Offin Quarter · Premier Federal Unity College for Girls',
  },
  {
    id: 'lafarge_cement',
    name: 'Lafarge Africa (Elephant Cement Plant)',
    sector: 'Sector 9 — Heavy Industrial Belt',
    lat: 6.8290,
    lng: 3.6620,
    type: 'industry',
    note: 'Sagamu-Ikorodu Road · Landmark Cement Manufacturing Hub',
  },
  {
    id: 'lg_secretariat',
    name: 'Sagamu Local Government Secretariat',
    sector: 'Sector 1 — Royal & Administrative Core',
    lat: 6.8475,
    lng: 3.6450,
    type: 'civic',
    note: 'Ita Oba / Secretariat Road · Sagamu LGA Administrative Headquarters',
  },
  {
    id: 'sonyindo_junction',
    name: 'Sonyindo Quarter & Cultural Centre',
    sector: 'Sector 10 — Northern Quarters',
    lat: 6.8590,
    lng: 3.6430,
    type: 'residential',
    note: 'Sonyindo Confederate Town Civic Square',
  },
  {
    id: 'epe_square',
    name: 'Epe-Sagamu Ancestral Square',
    sector: 'Sector 11 — Eastern Quarters',
    lat: 6.8510,
    lng: 3.6540,
    type: 'residential',
    note: 'Epe Quarter · Traditional Seat of the Elepe of Epe-Sagamu',
  },
  {
    id: 'batoro_civic',
    name: 'Batoro Historic Civic Axis',
    sector: 'Sector 12 — Western Quarters',
    lat: 6.8430,
    lng: 3.6350,
    type: 'residential',
    note: 'Batoro Confederate Quarter Civic Center',
  },
  {
    id: 'mosimi_corridor',
    name: 'NNPC Mosimi Depot Corridor',
    sector: 'Sector 13 — Energy & Logistics Axis',
    lat: 6.7950,
    lng: 3.6150,
    type: 'transit',
    note: 'Sagamu-Ikorodu Highway · Major South-West Petroleum Depot Axis',
  },
];

/**
 * Calculate distance in meters between two GPS coordinates using Haversine formula
 */
export function calculateDistanceMeters(lat1, lng1, lat2, lng2) {
  const R = 6371000; // Earth radius in meters
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

/**
 * Calculate compass bearing from point 1 to point 2 (e.g. 'NE', 'SW')
 */
export function calculateBearing(lat1, lng1, lat2, lng2) {
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const y = Math.sin(dLng) * Math.cos((lat2 * Math.PI) / 180);
  const x =
    Math.cos((lat1 * Math.PI) / 180) * Math.sin((lat2 * Math.PI) / 180) -
    Math.sin((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.cos(dLng);
  let brng = (Math.atan2(y, x) * 180) / Math.PI;
  brng = (brng + 360) % 360;

  const bearings = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(brng / 22.5) % 16;
  return bearings[index];
}

/**
 * Check if coordinates are inside Sagamu geographic boundary
 */
export function isInsideSagamu(lat, lng) {
  if (typeof lat !== 'number' || typeof lng !== 'number') return false;
  return (
    lat >= SAGAMU_BOUNDS.minLat &&
    lat <= SAGAMU_BOUNDS.maxLat &&
    lng >= SAGAMU_BOUNDS.minLng &&
    lng <= SAGAMU_BOUNDS.maxLng
  );
}

/**
 * Resolve hyper-local Sagamu landmark and street context from coordinates
 */
export function resolveSagamuLocation(lat, lng, accuracy = null) {
  if (typeof lat !== 'number' || typeof lng !== 'number') {
    return {
      isSagamu: false,
      landmark: 'Unknown Location',
      sector: 'General Sector',
      formattedText: 'Location coordinates unavailable',
      distanceToPolice: null,
      policeEtaMinutes: null,
      nearestLandmarkDistance: null,
    };
  }

  const insideSagamu = isInsideSagamu(lat, lng);

  // Find closest landmark
  let closest = SAGAMU_LANDMARKS[0];
  let minDistance = Infinity;

  for (const lm of SAGAMU_LANDMARKS) {
    const dist = calculateDistanceMeters(lat, lng, lm.lat, lm.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closest = lm;
    }
  }

  // Calculate distance & ETA from Sagamu Police Station / Area Command
  const police = SAGAMU_LANDMARKS.find((l) => l.id === 'police_hq') || SAGAMU_LANDMARKS[0];
  const distanceToPolice = calculateDistanceMeters(lat, lng, police.lat, police.lng);
  // Assume tactical patrol car speed 40 km/h in town (~667 meters/minute)
  const policeEtaMinutes = Math.max(1, Math.round(distanceToPolice / 650));

  const bearing = calculateBearing(closest.lat, closest.lng, lat, lng);

  let formattedText = '';
  if (minDistance <= 45) {
    formattedText = `Directly at ${closest.name}, Sagamu`;
  } else if (minDistance <= 300) {
    formattedText = `~${minDistance}m ${bearing} of ${closest.name}, Sagamu`;
  } else if (minDistance <= 1500) {
    formattedText = `~${(minDistance / 1000).toFixed(1)}km from ${closest.name} (${closest.sector})`;
  } else {
    formattedText = insideSagamu
      ? `${(minDistance / 1000).toFixed(1)}km ${bearing} of ${closest.name} (Sagamu)`
      : `⚠️ ${Math.round(minDistance / 1000)}km outside Sagamu (${closest.name} corridor)`;
  }

  return {
    isSagamu: insideSagamu,
    landmark: closest.name,
    sector: closest.sector,
    landmarkType: closest.type,
    nearestLandmarkDistance: minDistance,
    bearingFromLandmark: bearing,
    formattedText,
    distanceToPolice,
    policeEtaMinutes,
    accuracyRating:
      accuracy === null
        ? 'unknown'
        : accuracy <= 8
        ? 'pinpoint_satellite'
        : accuracy <= 25
        ? 'good_gps'
        : accuracy <= 100
        ? 'moderate_gps'
        : 'coarse_cell_ip',
  };
}

/**
 * Generate Google Maps URLs with high-precision satellite & street zooms
 */
export function getSagamuMapUrls(lat, lng, label = 'Sagamu Tactical Target') {
  const safeLat = Number(lat || 6.8485).toFixed(6);
  const safeLng = Number(lng || 3.6465).toFixed(6);

  return {
    satellitePin: `https://www.google.com/maps?q=${safeLat},${safeLng}+(${encodeURIComponent(label)})&ll=${safeLat},${safeLng}&z=19&t=k`,
    streetPin: `https://www.google.com/maps?q=loc:${safeLat},${safeLng}&z=18&t=m`,
    turnByTurnNavigation: `https://www.google.com/maps/dir/?api=1&destination=${safeLat},${safeLng}&travelmode=driving`,
    embedHybrid: `https://maps.google.com/maps?q=${safeLat},${safeLng}&t=k&z=18&output=embed`,
    embedRoadmap: `https://maps.google.com/maps?q=${safeLat},${safeLng}&t=m&z=17&output=embed`,
  };
}


