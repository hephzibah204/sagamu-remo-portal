/**
 * liveLocationEngine.js
 * High-Precision GPS Acquisition, Real-Time Reverse/Forward Geocoding, and Google Maps Navigation Engine for Sagamu
 */

import {
  SAGAMU_LANDMARKS,
  resolveSagamuLocation
} from './sagamuGeoEngine';

/**
 * Standard Universal Google Maps URLs (Guaranteed exact pin drop without text-search interference)
 */
export function getStandardMapUrls(lat, lng, label = 'Emergency Location') {
  const safeLat = Number(lat || 6.8485).toFixed(6);
  const safeLng = Number(lng || 3.6465).toFixed(6);

  return {
    // Official Google Maps Search Pinpoint (Exact Coordinate Drop on Android, iOS, Desktop)
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${safeLat},${safeLng}`,
    // Satellite Hybrid View with High Zoom (19)
    satelliteMapsUrl: `https://www.google.com/maps?q=${safeLat},${safeLng}&ll=${safeLat},${safeLng}&z=19&t=k`,
    // Turn-by-Turn Driving Navigation directly to the venue / doorstep
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${safeLat},${safeLng}&travelmode=driving`,
    // Embed iframe url
    embedUrl: `https://maps.google.com/maps?q=${safeLat},${safeLng}&z=17&ie=UTF8&output=embed`,
  };
}

/**
 * Rapid IP-Based Geolocation Fallback
 */
export async function getIpGeolocationFast(timeoutMs = 3000) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });
    clearTimeout(timer);
    if (res.ok) {
      const d = await res.json();
      if (typeof d.latitude === 'number' && typeof d.longitude === 'number') {
        return {
          latitude: d.latitude,
          longitude: d.longitude,
          accuracy: 1000,
          city: d.city || 'Sagamu',
          region: d.region || 'Ogun State',
          ip: d.ip,
        };
      }
    }
  } catch (_) {}

  // Fallback 2: ip-api.com
  try {
    const ctrl2 = new AbortController();
    const timer2 = setTimeout(() => ctrl2.abort(), timeoutMs);
    const res2 = await fetch('https://api.ipify.org?format=json', { signal: ctrl2.signal });
    clearTimeout(timer2);
    if (res2.ok) {
      const d2 = await res2.json();
      if (d2.ip) {
        const geoRes = await fetch(`https://ipwho.is/${d2.ip}`);
        if (geoRes.ok) {
          const gd = await geoRes.json();
          if (gd.success && typeof gd.latitude === 'number' && typeof gd.longitude === 'number') {
            return {
              latitude: gd.latitude,
              longitude: gd.longitude,
              accuracy: 800,
              city: gd.city || 'Sagamu Corridor',
              region: gd.region || 'Ogun State',
              ip: d2.ip,
            };
          }
        }
      }
    }
  } catch (_) {}

  return null;
}

/**
 * Acquire High-Precision GPS with progressive satellite refinement & instant IP fallback
 */
export async function acquirePreciseGpsLocation(options = {}) {
  const {
    timeoutMs = 6000,
    targetAccuracyMeters = 20,
    onProgress = null,
  } = options;

  if (typeof window === 'undefined' || !navigator.geolocation) {
    const ipFallback = await getIpGeolocationFast(2000);
    const lat = ipFallback?.latitude || 6.8485;
    const lng = ipFallback?.longitude || 3.6465;
    return {
      latitude: lat,
      longitude: lng,
      accuracy: ipFallback?.accuracy || 500,
      source: ipFallback ? 'ip_geolocation' : 'unsupported',
      isGpsPrecise: false,
      timestamp: new Date().toISOString(),
      ...getStandardMapUrls(lat, lng),
    };
  }

  return new Promise((resolve) => {
    let bestFix = null;
    let isFinished = false;
    let watchId = null;

    const cleanup = () => {
      if (watchId !== null) {
        try {
          navigator.geolocation.clearWatch(watchId);
        } catch (_) {}
      }
    };

    const finish = async (errorMsg = null) => {
      if (isFinished) return;
      isFinished = true;
      cleanup();

      if (bestFix) {
        resolve({
          latitude: bestFix.lat,
          longitude: bestFix.lng,
          accuracy: bestFix.accuracy,
          altitude: bestFix.altitude,
          heading: bestFix.heading,
          speed: bestFix.speed,
          source: 'hardware_gps',
          isGpsPrecise: (bestFix.accuracy || 999) <= 40,
          timestamp: new Date().toISOString(),
          ...getStandardMapUrls(bestFix.lat, bestFix.lng),
        });
        return;
      }

      // Fast IP fallback if satellite GPS timed out or permission was denied
      try {
        const ipLoc = await getIpGeolocationFast(2500);
        if (ipLoc && ipLoc.latitude && ipLoc.longitude) {
          resolve({
            latitude: ipLoc.latitude,
            longitude: ipLoc.longitude,
            accuracy: ipLoc.accuracy,
            altitude: null,
            heading: null,
            speed: null,
            source: 'ip_geolocation',
            isGpsPrecise: false,
            timestamp: new Date().toISOString(),
            ...getStandardMapUrls(ipLoc.latitude, ipLoc.longitude),
          });
          return;
        }
      } catch (_) {}

      // Reliable default anchor: Sagamu Ita Oba Central Palace
      resolve({
        latitude: 6.8485,
        longitude: 3.6465,
        accuracy: 150,
        source: 'sagamu_center_anchor',
        isGpsPrecise: false,
        error: errorMsg || 'Satellite GPS timed out; resolved to Sagamu central coordinates.',
        timestamp: new Date().toISOString(),
        ...getStandardMapUrls(6.8485, 3.6465),
      });
    };

    const timer = setTimeout(() => finish('Satellite lock timed out.'), timeoutMs);

    const onFix = (pos) => {
      const fix = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy ? Math.round(pos.coords.accuracy) : null,
        altitude: pos.coords.altitude || null,
        heading: pos.coords.heading || null,
        speed: pos.coords.speed ? Math.round(pos.coords.speed * 3.6) : null,
      };

      const curAcc = fix.accuracy || 9999;
      const bestAcc = bestFix ? (bestFix.accuracy || 9999) : 9999;

      if (!bestFix || curAcc < bestAcc) {
        bestFix = fix;
        if (typeof onProgress === 'function') {
          onProgress(fix);
        }
      }

      if (curAcc <= targetAccuracyMeters) {
        clearTimeout(timer);
        finish();
      }
    };

    const onError = (err) => {
      console.warn('[LiveLocationEngine] GPS acquisition notice:', err.message);
      if (err.code === 1) {
        clearTimeout(timer);
        finish('Location permission denied by user.');
      }
    };

    try {
      navigator.geolocation.getCurrentPosition(
        (pos) => onFix(pos),
        (err) => { if (err.code === 1) onError(err); },
        { enableHighAccuracy: true, timeout: 3500, maximumAge: 10000 }
      );
    } catch (_) {}

    try {
      watchId = navigator.geolocation.watchPosition(onFix, onError, {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: timeoutMs,
      });
    } catch (_) {
      finish('Exception starting GPS watchPosition.');
    }
  });
}

/**
 * Real-Time Reverse Geocoding: Coordinates -> Exact Full Street Address & Sector
 */
export async function reverseGeocodeLocation(lat, lng) {
  const safeLat = parseFloat(lat);
  const safeLng = parseFloat(lng);

  if (isNaN(safeLat) || isNaN(safeLng)) {
    return {
      fullAddress: 'Unknown Location',
      nearestLandmark: 'Sagamu Remoland',
      sector: 'General Sector',
      ...getStandardMapUrls(6.8485, 3.6465),
    };
  }

  try {
    const res = await fetch(`/api/geocode?lat=${safeLat}&lng=${safeLng}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        return {
          fullAddress: data.address,
          nearestLandmark: data.nearestLandmark,
          sector: data.landmarkSector,
          distanceToLandmarkMeters: data.distanceToLandmarkMeters,
          landmarkFormatted: data.landmarkFormatted,
          googleMapsUrl: data.googleMapsUrl,
          satelliteMapsUrl: data.satelliteMapsUrl,
          directionsUrl: data.directionsUrl,
          embedUrl: data.embedUrl,
        };
      }
    }
  } catch (_) {}

  // Fallback to local landmark math
  const localResolution = resolveSagamuLocation(safeLat, safeLng);
  const standardUrls = getStandardMapUrls(safeLat, safeLng, localResolution.landmark);

  return {
    fullAddress: localResolution.formattedText,
    nearestLandmark: localResolution.landmark,
    sector: localResolution.sector,
    distanceToLandmarkMeters: localResolution.nearestLandmarkDistance,
    landmarkFormatted: localResolution.formattedText,
    ...standardUrls,
  };
}

/**
 * Real-time address search with forward geocoding
 */
export async function searchAddressInRealtime(query) {
  if (!query || query.trim().length < 2) return [];

  const q = query.toLowerCase().trim();
  const matchedLandmarks = SAGAMU_LANDMARKS.filter(
    (lm) =>
      lm.name.toLowerCase().includes(q) ||
      lm.sector.toLowerCase().includes(q) ||
      lm.note.toLowerCase().includes(q)
  );

  return matchedLandmarks.map((lm) => ({
    name: lm.name,
    address: `${lm.name}, ${lm.sector}, Sagamu, Ogun State`,
    latitude: lm.lat,
    longitude: lm.lng,
    category: lm.type,
    sector: lm.sector,
    ...getStandardMapUrls(lm.lat, lm.lng, lm.name),
  }));
}
