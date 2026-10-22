import { useState, useMemo, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { MAP_LOCATIONS, CAT_COLORS } from '../data/mapLocations';
import {
  acquirePreciseGpsLocation,
  reverseGeocodeLocation,
  searchAddressInRealtime,
  getStandardMapUrls,
} from '../services/liveLocationEngine';

const KEY_PLACES = [
  {
    id: 'akarigbo_palace',
    name: 'Aafin Akarigbo Palace & Ita Oba',
    cat: 'Heritage',
    icon: '👑',
    color: '#C9963A',
    address: 'Ita Oba, Offin, Sagamu, Ogun State',
    lat: 6.8485,
    lng: 3.6465,
    zoom: 17,
    note: 'The sovereign palace of HRM Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), The Akarigbo and Paramount Ruler of Remoland. Houses royal chambers, council halls, and amphitheatre.',
    hours: 'Palace Secretariat: Mon–Fri 9 AM – 5 PM',
    phone: '+234 803 000 0001',
    googleQuery: 'Akarigbo+Palace+Sagamu+Ogun+State',
    highlight: 'Sovereign Royal Palace',
  },
  {
    id: 'oouth_hospital',
    name: 'Olabisi Onabanjo University Teaching Hospital (OOUTH)',
    cat: 'Emergency',
    icon: '🏥',
    color: '#dc2626',
    address: 'Hospital Road, Sagamu, Ogun State',
    lat: 6.8372,
    lng: 3.6420,
    zoom: 17,
    note: 'Premier tertiary teaching and referral hospital in Ogun State, featuring 24/7 trauma care, specialized surgery, radiology, and medical residency training.',
    hours: '24 Hours Emergency Response',
    phone: '+234 802 345 6789',
    googleQuery: 'OOUTH+Sagamu+Ogun+State',
    highlight: 'Tertiary Teaching Hospital',
  },
  {
    id: 'sabo_market',
    name: 'Sabo International Kolanut Market',
    cat: 'Commerce',
    icon: '🛖',
    color: '#8B6914',
    address: 'Sabo Commercial District, Sagamu 121101, Ogun State',
    lat: 6.8550,
    lng: 3.6490,
    zoom: 16,
    note: 'West Africa\'s largest kolanut wholesale trading hub, connecting South-West farmers to merchants across Niger, Chad, Mali, and northern Nigeria for over a century.',
    hours: 'Daily: 6:00 AM – 8:00 PM',
    phone: '+234 803 765 4321',
    rating: '4.6★ (International Trade Hub)',
    googleQuery: 'Sabo+Market+Sagamu+Ogun+State',
    highlight: 'International Trade Hub',
  },
  {
    id: 'police_hq',
    name: 'Sagamu Divisional Police HQ & Area Command',
    cat: 'Emergency',
    icon: '🚔',
    color: '#dc2626',
    address: 'Ewusi Street / Akarigbo Road, Sagamu, Ogun State',
    lat: 6.8450,
    lng: 3.6440,
    zoom: 17,
    note: 'Nigeria Police Force Sagamu Area Command coordinating public security, expressway intercepts, and 24/7 tactical patrols across all 13 quarters.',
    hours: '24 Hours Emergency Response',
    phone: '112 / +234 808 176 2371',
    googleQuery: 'Sagamu+Police+Station+Ogun+State',
    highlight: 'Security Area Command',
  },
  {
    id: 'rss_college',
    name: 'Remo Secondary School (RSS Sagamu)',
    cat: 'Education',
    icon: '🏫',
    color: '#1a2e5e',
    address: 'Akarigbo Street, Sagamu, Ogun State',
    lat: 6.8410,
    lng: 3.6390,
    zoom: 16,
    note: 'Founded in 1946 as the first secondary school in Remoland. Has educated generations of Nigerian governors, jurists, physicians, and business leaders.',
    hours: 'Mon–Fri: 7:30 AM – 4:00 PM',
    phone: '+234 802 111 2233',
    googleQuery: 'Remo+Secondary+School+Sagamu',
    highlight: 'Pioneer Academic Institution',
  },
  {
    id: 'stadium',
    name: 'Gateway International Stadium',
    cat: 'Governance',
    icon: '🏟️',
    color: '#2D4A22',
    address: 'Stadium Road, Sagamu, Ogun State',
    lat: 6.8320,
    lng: 3.6310,
    zoom: 16,
    note: 'Modern 20,000-seater multi-purpose arena hosting national football championships, cultural carnivals, and the annual Sagamu Day festival grand finale.',
    hours: 'Daily: 7:00 AM – 7:00 PM',
    phone: '+234 803 444 5566',
    rating: '4.3★ (Sports & Events Arena)',
    googleQuery: 'Gateway+International+Stadium+Sagamu',
    highlight: 'Civic & Sports Stadium',
  },
  {
    id: 'interchange',
    name: 'Sagamu Interchange & Logistics Corridor',
    cat: 'Transport',
    icon: '🚛',
    color: '#5C3317',
    address: 'Lagos–Ibadan & Sagamu–Benin Expressway Junction, Sagamu',
    lat: 6.8843,
    lng: 3.5817,
    zoom: 15,
    note: 'Critical arterial transport gateway linking the South-West to eastern, southern, and northern Nigeria. Major interstate logistics and transit zone.',
    hours: '24 Hours',
    phone: '122 (FRSC Corridor Command)',
    rating: '4.5★ (National Transport Hub)',
    googleQuery: 'Sagamu+Interchange+Ogun+State',
    highlight: 'National Arterial Gateway',
  },
  {
    id: 'townhall',
    name: 'Sagamu Local Government Secretariat & Civic Centre',
    cat: 'Governance',
    icon: '🏛️',
    color: '#2D4A22',
    address: 'Ita Oba, Sagamu, Ogun State',
    lat: 6.8475,
    lng: 3.6450,
    zoom: 17,
    note: 'Administrative headquarters of Sagamu Local Government Area and civic liaison chambers for the Sagamu Development Association (SDA).',
    hours: 'Mon–Fri: 8:00 AM – 4:00 PM',
    phone: '+234 803 555 1234',
    googleQuery: 'Sagamu+Local+Government+Secretariat',
    highlight: 'Civic Administration',
  },
  {
    id: 'lafarge',
    name: 'Lafarge Africa (Elephant Cement Plant)',
    cat: 'Commerce',
    icon: '🏭',
    color: '#1E3A8A',
    address: 'Sagamu–Ikorodu Road, Sagamu, Ogun State',
    lat: 6.8290,
    lng: 3.6620,
    zoom: 15,
    note: 'Historic manufacturing complex of Elephant Cement, a pillar of Nigerian infrastructure and industrial employer of thousands of Sagamu indigenes.',
    hours: '24 Hours',
    phone: '+234 1 271 8700',
    rating: '4.5★ (Industrial Titan)',
    googleQuery: 'Lafarge+Elephant+Cement+Sagamu',
    highlight: 'Industrial Anchor',
  },
  {
    id: 'ewusi_palace',
    name: 'Aafin Ewusi of Makun-Sagamu',
    cat: 'Heritage',
    icon: '👑',
    color: '#C9963A',
    address: 'Ewusi Street, Makun, Sagamu, Ogun State',
    lat: 6.8420,
    lng: 3.6520,
    zoom: 17,
    note: 'The royal palace of the Ewusi of Makun, traditional sovereign of the Makun confederate quarter of Sagamu.',
    hours: 'Mon–Fri: 9:00 AM – 5:00 PM',
    phone: '+234 802 888 9900',
    googleQuery: 'Ewusi+Palace+Makun+Sagamu',
    highlight: 'Makun Royal Court',
  },
];

const CATEGORIES = ['All', 'Heritage', 'Governance', 'Hospitality', 'Commerce', 'Education', 'Emergency', 'Transport'];

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] = useState(KEY_PLACES[0]);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [mapType, setMapType] = useState('m'); // 'm' for Roadmap, 'k' for Satellite
  
  // Real-Time Address Lookup & GPS State
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [isLocatingGps, setIsLocatingGps] = useState(false);
  const [gpsStatus, setGpsStatus] = useState(null); // { accuracy, address, isPrecise }
  const searchTimerRef = useRef(null);

  // Debounced real-time address lookup as the user types
  useEffect(() => {
    if (!search.trim() || search.trim().length < 2) {
      setAddressSuggestions([]);
      return;
    }

    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(async () => {
      setIsSearchingAddress(true);
      try {
        const results = await searchAddressInRealtime(search.trim());
        setAddressSuggestions(results);
      } catch (_) {
        setAddressSuggestions([]);
      } finally {
        setIsSearchingAddress(false);
      }
    }, 320);

    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    };
  }, [search]);

  // Acquire exact device GPS with progressive satellite lock and real-time reverse geocode
  const handleLocateExactPosition = async () => {
    setIsLocatingGps(true);
    setGpsStatus({ message: 'Locking onto GPS satellites...' });

    try {
      const fix = await acquirePreciseGpsLocation({ timeoutMs: 12000, targetAccuracyMeters: 15 });
      const rev = await reverseGeocodeLocation(fix.latitude, fix.longitude);

      const customPin = {
        id: 'user_exact_gps',
        name: 'My Exact GPS Location',
        cat: 'Emergency',
        icon: '🎯',
        color: '#ef4444',
        address: rev.fullAddress,
        lat: fix.latitude,
        lng: fix.longitude,
        zoom: 18,
        note: `Precision Satellite Lock (±${fix.accuracy ? Math.round(fix.accuracy) : '?'}m). Nearest Sagamu landmark: ${rev.landmarkFormatted}.`,
        googleQuery: `${fix.latitude},${fix.longitude}`,
        googleMapsUrl: fix.googleMapsUrl,
        directionsUrl: fix.directionsUrl,
        satelliteMapsUrl: fix.satelliteMapsUrl,
        highlight: 'Live Real-Time User Coordinate',
      };

      setSelectedPlace(customPin);
      setGpsStatus({
        accuracy: fix.accuracy,
        address: rev.fullAddress,
        isPrecise: fix.isGpsPrecise,
        message: fix.isGpsPrecise
          ? `🛰️ Exact GPS Locked: ±${Math.round(fix.accuracy)}m accuracy`
          : `📶 Position Acquired: ±${Math.round(fix.accuracy || 100)}m (Refining...)`,
      });
    } catch (err) {
      setGpsStatus({
        error: true,
        message: 'Could not acquire GPS. Please verify location permissions.',
      });
    } finally {
      setIsLocatingGps(false);
    }
  };

  const filteredPlaces = useMemo(() => {
    return KEY_PLACES.filter(p => {
      if (filter !== 'All' && p.cat !== filter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.note.toLowerCase().includes(q) ||
          p.cat.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filter, search]);

  // Automatically locate user's current live GPS position on page load
  useEffect(() => {
    handleLocateExactPosition();
  }, []);

  // Construct dynamic Google Maps iframe URL centered solely on exact coordinates (NO text address lookups)
  const getGoogleMapsUrl = () => {
    if (selectedPlace?.lat && selectedPlace?.lng) {
      return `https://maps.google.com/maps?q=${selectedPlace.lat},${selectedPlace.lng}&t=${mapType}&z=${selectedPlace.zoom || 18}&ie=UTF8&iwloc=&output=embed`;
    }
    return `https://maps.google.com/maps?q=6.8485,3.6465&t=${mapType}&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  const getDirectDirectionsUrl = (place) => {
    const lat = place?.lat || 6.8485;
    const lng = place?.lng || 3.6465;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
  };

  return (
    <div>
      <SEO
        title="Interactive Google Map & Landmarks of Sagamu"
        description="Explore Sagamu on Google Maps — find Aafin Akarigbo Palace, OOUTH Teaching Hospital, Sabo Kolanut Market, Remo Secondary School, stadiums, and 13 confederate quarters."
      />
      <Hero
        ey="Geography & Landmarks"
        ti="Sagamu on Google Maps"
        sub="Interactive high-resolution Google Maps exploration highlighting the palaces, hospitals, markets, institutions, and heritage citadels of Sagamu Remoland."
        dark
      />

      <div style={{ background: '#f8fafc', padding: '0.65rem 2rem', textAlign: 'center', borderBottom: '1px solid #e2e8f0' }}>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.08em', color: '#1e40af', textTransform: 'uppercase', fontWeight: 700 }}>
          📍 SAGAMU · SAGAMU LOCAL GOVERNMENT AREA · 6°50′N, 3°38′E · CAPITAL OF REMOLAND
        </span>
      </div>

      <Section bg="#050811" py="3rem">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Filter and Search Bar */}
          <div
            className="glass"
            style={{
              padding: '1.2rem 1.5rem',
              borderRadius: '14px',
              marginBottom: '2rem',
              border: '1px solid rgba(201,150,58,0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Search bar with Real-Time Address Lookup */}
              <div style={{ flex: 1, minWidth: 'min(280px, 100%)', position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                <input
                  className="inp"
                  style={{ paddingLeft: '2.5rem', borderRadius: '30px' }}
                  placeholder="Type any address, street, landmark, or coordinates..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />

                {/* Real-time Address Lookup Autocomplete Dropdown */}
                {addressSuggestions.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: 'calc(100% + 4px)',
                    left: 0,
                    right: 0,
                    background: '#160b08',
                    border: '1px solid var(--gold)',
                    borderRadius: '10px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.8)',
                    zIndex: 9999,
                    maxHeight: '240px',
                    overflowY: 'auto',
                  }}>
                    <div style={{ padding: '0.4rem 0.8rem', background: 'rgba(201,150,58,0.15)', fontSize: '0.62rem', fontWeight: 800, color: 'var(--gold)' }}>
                      📍 REAL-TIME ADDRESS MATCHES (CLICK TO DROP PIN):
                    </div>
                    {addressSuggestions.map(item => (
                      <div
                        key={item.id}
                        onClick={() => {
                          setSelectedPlace({
                            id: item.id,
                            name: item.name,
                            address: item.address,
                            lat: item.latitude,
                            lng: item.longitude,
                            zoom: 18,
                            googleQuery: `${item.latitude},${item.longitude}`,
                            directionsUrl: item.directionsUrl,
                            googleMapsUrl: item.googleMapsUrl,
                            satelliteMapsUrl: item.satelliteMapsUrl,
                            color: '#38bdf8',
                            icon: '📍',
                            highlight: item.isLocal ? 'Sagamu Remo Landmark' : 'Live Geocoded Address',
                            note: `Address: ${item.address}. Coordinates: ${item.latitude.toFixed(6)}°N, ${item.longitude.toFixed(6)}°E.`,
                          });
                          setAddressSuggestions([]);
                        }}
                        style={{
                          padding: '0.6rem 0.8rem',
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,150,58,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f8fafc' }}>
                          {item.isLocal ? '👑 ' : '📍 '} {item.name}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(245,237,216,0.6)', marginTop: '2px' }}>
                          {item.address}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Real-Time GPS "Locate My Exact Position" Button */}
              <button
                type="button"
                onClick={handleLocateExactPosition}
                disabled={isLocatingGps}
                className="btn-p"
                style={{
                  fontSize: '0.68rem',
                  padding: '0.5rem 1rem',
                  borderRadius: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{isLocatingGps ? '🛰️' : '🎯'}</span>
                <span>{isLocatingGps ? 'Locking Satellites...' : 'Get My Exact Location'}</span>
              </button>

              {/* Map View Toggle (Roadmap vs Satellite) */}
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <span className="cinzel" style={{ fontSize: '0.55rem', color: 'var(--gold)', letterSpacing: '0.1em' }}>VIEW:</span>
                <button
                  onClick={() => setMapType('m')}
                  className={`abtn ${mapType === 'm' ? 'abtn-p' : 'abtn-o'}`}
                  style={{ fontSize: '0.55rem', padding: '0.4rem 0.8rem', borderRadius: '20px' }}
                >
                  🗺️ Standard Map
                </button>
                <button
                  onClick={() => setMapType('k')}
                  className={`abtn ${mapType === 'k' ? 'abtn-p' : 'abtn-o'}`}
                  style={{ fontSize: '0.55rem', padding: '0.4rem 0.8rem', borderRadius: '20px' }}
                >
                  🛰️ Satellite / Terrain
                </button>
              </div>
            </div>

            {/* GPS Lock Feedback Ribbon */}
            {gpsStatus && (
              <div style={{
                background: gpsStatus.error ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                border: `1px solid ${gpsStatus.error ? '#ef4444' : '#22c55e'}`,
                borderRadius: '8px',
                padding: '0.5rem 0.8rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '6px',
                fontSize: '0.72rem',
              }}>
                <div style={{ color: gpsStatus.error ? '#fca5a5' : '#86efac', fontWeight: 700 }}>
                  {gpsStatus.message} {gpsStatus.address ? `· ${gpsStatus.address}` : ''}
                </div>
                {selectedPlace?.lat && (
                  <button
                    type="button"
                    onClick={() => {
                      setMapType('m');
                      window.scrollTo({ top: 350, behavior: 'smooth' });
                    }}
                    style={{
                      background: 'rgba(56, 189, 248, 0.2)',
                      border: '1px solid #38bdf8',
                      color: '#38bdf8',
                      fontWeight: 800,
                      borderRadius: '16px',
                      padding: '4px 10px',
                      fontSize: '0.65rem',
                      cursor: 'pointer',
                    }}
                  >
                    🎯 Centered on Exact GPS Pin
                  </button>
                )}
              </div>
            )}

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', paddingTop: '0.8rem', borderTop: '1px solid rgba(201,150,58,0.1)' }}>
              {CATEGORIES.map(c => {
                const active = filter === c;
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      fontFamily: "'Cinzel', serif",
                      fontSize: '0.55rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      transition: 'all 0.2s ease',
                      background: active ? 'var(--gold)' : 'rgba(201,150,58,0.06)',
                      color: active ? 'var(--darker)' : 'rgba(245,237,216,0.7)',
                      border: active ? 'none' : '1px solid rgba(201,150,58,0.2)',
                    }}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Grid: Google Maps Embed + Places Sidebar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: '2rem', alignItems: 'start' }}>
            
            {/* Left Column: Embedded Google Map */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div
                className="glass"
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid var(--gold)',
                  boxShadow: '0 15px 50px rgba(0,0,0,0.8)',
                }}
              >
                {/* Map Sub-Header Bar */}
                <div
                  style={{
                    padding: '0.8rem 1.2rem',
                    background: 'rgba(201,150,58,0.12)',
                    borderBottom: '1px solid rgba(201,150,58,0.2)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>{selectedPlace ? selectedPlace.icon : '📍'}</span>
                    <span className="cinzel" style={{ fontSize: '0.7rem', color: 'var(--cream)', fontWeight: 'bold' }}>
                      {selectedPlace ? selectedPlace.name : 'Sagamu Overview'}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: '0.55rem',
                      background: 'rgba(22,163,74,0.25)',
                      color: '#86efac',
                      border: '1px solid #22c55e',
                      padding: '2px 8px',
                      borderRadius: '10px',
                      fontFamily: "'Cinzel', serif",
                    }}
                  >
                    ● Google Maps Live
                  </span>
                </div>

                {/* Google Map Iframe */}
                <div style={{ width: '100%', height: '440px', background: '#1c1008', position: 'relative' }}>
                  <iframe
                    title="Sagamu Google Map"
                    src={getGoogleMapsUrl()}
                    style={{ width: '100%', height: '100%', border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Map Bottom Controls */}
                <div
                  style={{
                    padding: '0.8rem 1.2rem',
                    background: 'rgba(0,0,0,0.6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.8rem',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'rgba(245,237,216,0.6)' }}>
                    📍 Coordinates: <strong>{selectedPlace ? `${selectedPlace.lat}° N, ${selectedPlace.lng}° E` : '6.8485° N, 3.6465° E'}</strong>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={handleLocateExactPosition}
                      disabled={isLocatingGps}
                      className="btn-p"
                      style={{
                        fontSize: '0.62rem',
                        padding: '0.4rem 0.9rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        borderRadius: '20px',
                      }}
                    >
                      <span>🎯</span>
                      <span>{isLocatingGps ? 'Acquiring GPS...' : 'Locate My Current GPS'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMapType(prev => prev === 'm' ? 'k' : 'm')}
                      className="btn-o"
                      style={{
                        fontSize: '0.62rem',
                        padding: '0.4rem 0.9rem',
                        cursor: 'pointer',
                        borderRadius: '20px',
                      }}
                    >
                      {mapType === 'm' ? '🛰️ Switch to Satellite' : '🗺️ Switch to Standard'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Selected Place Highlight Card */}
              {selectedPlace && (
                <div
                  className="glass card"
                  style={{
                    padding: '1.5rem',
                    borderRadius: '14px',
                    borderLeft: `4px solid ${selectedPlace.color}`,
                    animation: 'fadeUp 0.3s ease both',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                    <span
                      style={{
                        fontSize: '0.52rem',
                        background: selectedPlace.color + '25',
                        color: selectedPlace.color,
                        border: `1px solid ${selectedPlace.color}60`,
                        padding: '2px 8px',
                        borderRadius: '10px',
                        fontFamily: "'Cinzel', serif",
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                      }}
                    >
                      {selectedPlace.cat} · {selectedPlace.highlight}
                    </span>
                    {selectedPlace.rating && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>{selectedPlace.rating}</span>
                    )}
                  </div>

                  <h3 className="playfair" style={{ fontSize: '1.3rem', color: 'var(--cream)', marginBottom: '0.4rem' }}>
                    {selectedPlace.name}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(245,237,216,0.55)', marginBottom: '0.8rem' }}>
                    📍 {selectedPlace.address}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'rgba(245,237,216,0.8)', lineHeight: 1.7, marginBottom: '1rem' }}>
                    {selectedPlace.note}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.6rem', borderTop: '1px solid rgba(201,150,58,0.15)', paddingTop: '0.8rem', fontSize: '0.75rem' }}>
                    {selectedPlace.hours && (
                      <div style={{ color: 'rgba(245,237,216,0.65)' }}>🕐 {selectedPlace.hours}</div>
                    )}
                    {selectedPlace.phone && (
                      <div style={{ color: 'var(--gold)' }}>
                        <a href={`tel:${selectedPlace.phone.split('/')[0].trim()}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          📞 {selectedPlace.phone}
                        </a>
                      </div>
                    )}
                    {selectedPlace.website && (
                      <div>
                        <a href={selectedPlace.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-light)' }}>
                          🌐 Official Website ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Key Places List Navigator */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="cinzel" style={{ fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  ⭐ Featured Key Places ({filteredPlaces.length})
                </h3>
                <span style={{ fontSize: '0.68rem', color: 'rgba(245,237,216,0.45)' }}>Click to view on map</span>
              </div>

              <div style={{ display: 'grid', gap: '0.8rem', maxHeight: '720px', overflowY: 'auto', paddingRight: '4px' }}>
                {filteredPlaces.map(place => {
                  const isSelected = selectedPlace?.id === place.id;
                  return (
                    <div
                      key={place.id}
                      onClick={() => setSelectedPlace(place)}
                      className="glass card"
                      style={{
                        padding: '1rem 1.2rem',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: isSelected ? `2px solid var(--gold)` : '1px solid rgba(201,150,58,0.15)',
                        borderLeft: `4px solid ${place.color}`,
                        background: isSelected ? 'rgba(201,150,58,0.12)' : 'rgba(201,150,58,0.03)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{place.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                            <h4 className="playfair" style={{ fontSize: '1rem', color: isSelected ? 'var(--gold)' : 'var(--cream)', margin: 0 }}>
                              {place.name}
                            </h4>
                            {isSelected && <span style={{ fontSize: '0.65rem', color: 'var(--gold)' }}>📍 Active</span>}
                          </div>
                          <div className="cinzel" style={{ fontSize: '0.52rem', color: place.color, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                            {place.cat} · {place.highlight}
                          </div>
                          <p style={{ fontSize: '0.75rem', color: 'rgba(245,237,216,0.6)', lineHeight: 1.5, margin: 0 }}>
                            {place.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </Section>
      <AdireDivider />
    </div>
  );
}
