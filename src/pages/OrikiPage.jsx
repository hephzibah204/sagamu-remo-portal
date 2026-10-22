import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';

const KINGS_ORIKI = [
  {
    id: 'ajayi',
    name: 'Oba Babatunde Adewale Ajayi, CFR, FCA',
    title: 'Torungbuwa II (r. 2017–Present)',
    img: '/images/OLsagamu Oba James Coronation.jpg',
    desc: 'The reigning Akarigbo and Paramount Ruler of Remoland. Chartered Accountant, Supreme Court Barrister, and former Chairman of Ogun State Traditional Council, under whose visionary reign Sagamu has witnessed historic modern palace development, industrial expansion, and youth digital empowerment.',
    oriki: [
      { yr: 'Kabiyeesi Oba Babatunde Adewale Ajayi, Torungbuwa Keji.', en: 'All hail His Royal Majesty Oba Babatunde Adewale Ajayi, Torungbuwa the Second.', note: 'Torungbuwa: Ancient royal ruling house of the Akarigbo of Remoland.' },
      { yr: 'Akarigbo ati Alaye Luwa ti Ile Remo, Oba to gbe ite ogo ro.', en: 'The Akarigbo and Paramount Ruler of Remoland, the king who exalts the glorious throne.' },
      { yr: 'Omo Oba l’Eko, omo Oba l’Offin, omo Oba ni Sagamu.', en: 'Royal prince in Lagos, royal prince in Offin, sovereign king in Sagamu.' },
      { yr: 'Omo a bi owo nile, a b’oro l’enu, omo a f’owo ola to ilu ro.', en: 'Child of those who inherit wealth and speak wisdom, who builds the kingdom with dignified honor.' },
      { yr: 'Akarigbo Olufiran, omo alagemo merindinlogun abijo wenewene.', en: 'Akarigbo Olufiran, child of the sixteen Alagemo deities who dance with supreme grace.', note: 'Alagemo: The sacred Agemo masquerades representing the 16 traditional custodians of Remoland.' },
      { yr: 'Oba to m’ero, to m’eko, to tun fi ogbon aje dari ilu si rere.', en: 'A king versed in administration, erudite in education, and steering the economy into abundant prosperity.' },
      { yr: 'Ogbomolehin ti n f’owo otun gbe ilu ga, ti n f’osi te gbogbo ota mole.', en: 'Mighty protector who raises the town with his right hand and quells discord with his left.' },
      { yr: 'Kabiyesi Baba wa Torungbuwa II: Ki ade pe lori, ki bata pe lese, ki irukere di okin!', en: 'Kabiyesi our father Torungbuwa II: May the crown rest long on your head, royal sandals on your feet, and horsetail whisk turn to plumes of glory!' }
    ]
  },
  {
    id: 'sonariwo',
    name: 'Oba Dr. Michael Adeniyi Sonariwo, CON',
    title: 'Erinjugbo II (r. 1990–2016)',
    img: '/images/OLSAGAMU-OF-SAGAMU-OBA OGUNBADE.jpg',
    desc: 'The revered paramount monarch who reigned for 26 memorable years. A distinguished chartered accountant and former Chairman of the Ogun State Council of Obas, he cemented Sagamu’s preeminence as an industrial, educational, and commercial giant.',
    oriki: [
      { yr: 'Erinjugbo Omo Akarigbo, Oba to f’ogbon joba.', en: 'Erinjugbo child of Akarigbo, the monarch who reigned with peerless wisdom.' },
      { yr: 'Omo Remo Metalelogbon, omo Alagbafo tii f’omi tutu we.', en: 'Child of the thirty-three Remo settlements, child of the blessed streams who bathes with cool pristine waters.', note: 'Remo Metalelogbon: The historic 33 towns constituting Remoland with Sagamu as the paramount capital.' },
      { yr: 'Sagamu a bi owo nile, a b’oro l’enu.', en: 'Sagamu where prosperity is grounded in ancestral soil and eloquence dwells on every tongue.' },
      { yr: 'Oba Michael Adeniyi Sonariwo, Erinjugbo to mu ilu rewa.', en: 'King Michael Adeniyi Sonariwo, Erinjugbo who made Sagamu beautiful and prosperous.' },
      { yr: 'Omo alagemo abijo fere, omo afidi pote mole nile baba re.', en: 'Child of Agemo who glides with rhythm, child of those who crushed civil rebellions in their ancestral homeland.' },
      { yr: 'Kabiyesi Erinjugbo Keji, didun ni iranti olododo.', en: 'Kabiyesi Erinjugbo the Second, sweet and everlasting is the memory of the righteous.' }
    ]
  },
  {
    id: 'awolesi',
    name: 'Oba Moses Awolesi',
    title: 'Erinwole II (r. 1952–1988)',
    img: '/images/Babington Ashaye The Brave King.jpg',
    desc: 'A titan who reigned for 36 historic years across Nigeria\'s independence era. He unified the 13 confederate quarters, attracted heavy manufacturing like Elephant Cement, and championed OOUTH Teaching Hospital.',
    oriki: [
      { yr: 'Oba Moses Awolesi, Erinwole Keji, Oba nla ti gbadobale oba.', en: 'King Moses Awolesi, Erinwole the Second, a great king to whom other kings pay highest homage.' },
      { yr: 'Omo agbejoro tii feje we, omo Awolesi tii so ibi d’ire.', en: 'Valiant mediator of justice, child of Awolesi who turns trials into divine blessings.' },
      { yr: 'Omo orisagamu ewa, ibi omi tutu ti n sun jade sori ile Remo.', en: 'Child of Orisagamu Ewa, where freshwater springs from the earth to bless the soil of Remo.', note: 'Orisagamu Ewa: The freshwater stream and aperture from which the name \"Sagamu\" is derived.' },
      { yr: 'Oba to ko gbogbo Itun metala papo sori ite alafia.', en: 'The king who gathered all thirteen confederate quarters into one unbreakable throne of peace.' }
    ]
  },
  {
    id: 'adedoyin',
    name: 'Oba William Christopher Adedoyin II',
    title: 'Adedoyin II (r. 1916–1952)',
    img: '/images/Babington Ashaye Greeting Queen Elizabeth.jpg',
    desc: 'The celebrated progressive monarch whose 36-year reign revolutionized education and modern governance. He spearheaded the founding of Remo Secondary School (RSS) in 1946 and was a leader in the Western Region House of Chiefs.',
    oriki: [
      { yr: 'Oba William Christopher Adedoyin Aladesanmi Keji.', en: 'King William Christopher Adedoyin Aladesanmi the Second.' },
      { yr: 'Omo Akarigbo gbayi, omo a bi owo nile t’owo tun wa l’aafin.', en: 'Child of the celebrated Akarigbo, born of wealth at home with royal fortune in the palace.' },
      { yr: 'Oba to gbe eko rere de ilu Remo, to ko ile iwe fun omo alade.', en: 'The monarch who brought quality education to Remoland and built schools for children of the kingdom.', note: 'Historic founder and patron of Remo Secondary School (RSS Sagamu), 1946.' },
      { yr: 'Adedoyin Oba ajila, omo a f’otun k’ara, a f’osi k’ero.', en: 'Adedoyin the prosperous king, whose right hand welcomes kinsmen and whose left hand shelters pilgrims.' }
    ]
  }
];

export default function OrikiPage() {
  const [selectedKing, setSelectedKing] = useState(KINGS_ORIKI[0]);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [hoveredNote, setHoveredNote] = useState(null);
  const lyricsEndRef = useRef(null);
  const playIntervalRef = useRef(null);
  const audioCtxRef = useRef(null);

  const [waveHeights, setWaveHeights] = useState(Array(24).fill(10));

  const speakLine = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.SpeechSynthesisUtterance) {
      window.speechSynthesis.cancel();
      const u = new window.SpeechSynthesisUtterance(text);
      u.rate = 0.95;
      u.pitch = 1.05;
      window.speechSynthesis.speak(u);
    }
  };

  const playDrumPulse = (freq = 160) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state === 'suspended') {
        ctx.resume();
      }
      if (ctx) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.65, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch (_) {}
  };

  useEffect(() => {
    if (playing) {
      if (selectedKing.oriki[time]) {
        speakLine(selectedKing.oriki[time].yr);
        playDrumPulse(180);
      }

      playIntervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const nextTime = prevTime + 1;
          if (nextTime >= selectedKing.oriki.length) {
            setPlaying(false);
            clearInterval(playIntervalRef.current);
            if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
            return 0;
          }
          if (selectedKing.oriki[nextTime]) {
            speakLine(selectedKing.oriki[nextTime].yr);
            playDrumPulse(nextTime % 2 === 0 ? 190 : 140);
          }
          return nextTime;
        });
      }, 4200);

      const animInterval = setInterval(() => {
        setWaveHeights(Array.from({ length: 24 }, () => Math.floor(Math.random() * 45) + 10));
      }, 150);

      return () => {
        clearInterval(playIntervalRef.current);
        clearInterval(animInterval);
      };
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current);
      setWaveHeights(Array(24).fill(10));
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [playing, selectedKing]);

  const togglePlay = () => {
    if (!playing) {
      setTime(0);
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  };

  const handleLineClick = (idx) => {
    setTime(idx);
    speakLine(selectedKing.oriki[idx].yr);
    playDrumPulse(200);
  };

  return (
    <div>
      <SEO
        title="Royal Oriki of Sagamu"
        description="Authentic praise poetry (Oriki) of the Akarigbos of Remoland and the 13 confederate quarters of Sagamu."
      />
      <Hero
        ey="Praise Poetry"
        ti="Royal Oriki of Sagamu"
        sub="Sacred praise chants of the Akarigbos of Remoland, the 13 confederate quarters, and the glory of Remo Metalelogbon."
      />
      <AdireDivider />

      <Section bg="#1a0d06">
        <p className="sl">Ancestral Anthem</p>
        <h2 className="st">Oriki Sagamu Remo (Ilu Alafia)</h2>
        <div style={{ maxWidth: '780px', margin: '0 auto', background: 'rgba(201,150,58,.06)', border: '1px solid rgba(201,150,58,.25)', borderLeft: '4px solid #C9963A', padding: '1.8rem', borderRadius: 4 }}>
          <p style={{ fontStyle: 'italic', fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', lineHeight: 1.9, color: '#F5EDD8' }}>
            "Sagamu Ilu Alafia, omo Remo Metalelogbon!<br />
            Omo Alagbafo tii f’omi tutu we.<br />
            Sagamu a bi owo nile, a b’oro l’enu.<br />
            Omo Orisagamu Ewa, ibi ti omi alafia ti n sun jade.<br />
            Omo Itun metala to para po di okan sori oke Bammowu:<br />
            Offin, Makun, Sonyindo, Epe, Ibido, Igbepa,<br />
            Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, ati Ijagba!<br />
            Omo Akarigbo tii f’owo r’epo, tii f’owo r’ata, tii f’owo ra gbogbo ohun rere.<br />
            A kii gbo oruko re l’ode ko ma dun mọ wa ninu.<br />
            Sagamu a gbe wa o!"
          </p>
          <div style={{ marginTop: '1rem', fontSize: '.8rem', color: '#C9963A', fontFamily: "'Cinzel', serif" }}>
            — Canonical Praise Cognomen of the 13 Confederate Quarters of Sagamu
          </div>
        </div>
      </Section>

      <AdireDivider thin />

      <Section bg="#2c1a0e">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: '2.5rem', alignItems: 'start' }}>
          
          {/* LEFT: Monarch Selector & Information */}
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(201,150,58,.04)', border: '1px solid rgba(201,150,58,.2)', padding: '1.5rem', borderTop: '4px solid #C9963A', borderRadius: 4 }}>
              <p className="sl">Royal Lineage Chants</p>
              <h3 className="playfair" style={{ fontSize: '1.35rem', color: '#F5EDD8', marginBottom: '1rem' }}>Select Monarch of Remoland</h3>
              <div style={{ display: 'grid', gap: '.8rem' }}>
                {KINGS_ORIKI.map((k) => {
                  const isSel = selectedKing.id === k.id;
                  return (
                    <button
                      key={k.id}
                      onClick={() => { setSelectedKing(k); setTime(0); setPlaying(false); }}
                      style={{
                        padding: '1rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        background: isSel ? 'rgba(201,150,58,.12)' : 'rgba(201,150,58,.03)',
                        border: `1px solid ${isSel ? 'rgba(201,150,58,.5)' : 'rgba(201,150,58,.15)'}`,
                        color: 'inherit',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.25s',
                        borderRadius: 3
                      }}
                    >
                      <div style={{ width: 45, height: 45, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${isSel ? '#C9963A' : 'rgba(201,150,58,.3)'}`, flexShrink: 0 }}>
                        <img src={k.img} alt={k.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div className="playfair" style={{ fontSize: '0.85rem', color: isSel ? '#F5EDD8' : 'rgba(245,237,216,.7)', fontWeight: isSel ? 600 : 400 }}>{k.name}</div>
                        <div className="cinzel" style={{ fontSize: '0.48rem', letterSpacing: '.06em', color: 'rgba(201,150,58,.6)', marginTop: '.15rem' }}>{k.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Monarch Info Card */}
            <div style={{ background: 'rgba(44,26,14,.5)', border: '1px solid rgba(201,150,58,.15)', padding: '1.5rem', borderRadius: 4 }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '.8rem' }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', border: '2px solid #C9963A' }}>
                  <img src={selectedKing.img} alt={selectedKing.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 className="playfair" style={{ fontSize: '1rem', color: '#F5EDD8', margin: 0 }}>{selectedKing.name}</h4>
                  <span className="tag tag-gold" style={{ margin: '.2rem 0 0', fontSize: '.42rem' }}>{selectedKing.title}</span>
                </div>
              </div>
              <p style={{ fontSize: '0.8rem', lineHeight: 1.7, color: 'rgba(245,237,216,.65)', margin: 0 }}>{selectedKing.desc}</p>
            </div>
          </div>

          {/* RIGHT: Glowing Audio Console & synchronized chanting */}
          <div style={{ background: 'rgba(13,7,4,.85)', border: '1px solid rgba(201,150,58,.3)', borderTop: '4px solid #C9963A', padding: '2rem', borderRadius: 4, position: 'relative' }}>
            
            <div style={{ padding: '1rem', background: '#0d0704', border: '1px solid rgba(201,150,58,.15)', borderRadius: 4, marginBottom: '1.5rem', textAlign: 'center', boxShadow: 'inset 0 4px 30px rgba(0,0,0,0.8)' }}>
              <div className="cinzel" style={{ fontSize: '0.55rem', letterSpacing: '.2em', color: 'rgba(201,150,58,.8)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {playing ? '🎙️ Royal Lineage Chants Playing — Synchronized Yoruba Audio' : '🔇 Audio Visualizer (Click Play or Any Line to Hear)'}
              </div>
              
              <div style={{ display: 'flex', gap: '4px', height: '60px', alignItems: 'center', justifyContent: 'center', margin: '0.8rem 0' }}>
                {waveHeights.map((h, wi) => (
                  <div
                    key={wi}
                    style={{
                      width: '6px',
                      height: `${h}px`,
                      background: playing ? 'linear-gradient(to top, #7A2E0E, #C9963A)' : 'rgba(201,150,58,.2)',
                      borderRadius: '2px',
                      transition: 'height 0.15s ease'
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '1.2rem' }}>
                <button
                  onClick={togglePlay}
                  style={{
                    background: '#B5451B',
                    border: 'none',
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F5EDD8',
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 15px rgba(181,69,27,0.4)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  {playing ? '⏸' : '▶'}
                </button>
                <div style={{ textAlign: 'left' }}>
                  <div className="cinzel" style={{ fontSize: '.5rem', letterSpacing: '.12em', color: 'rgba(245,237,216,.45)' }}>Progress Timeline</div>
                  <div style={{ fontFamily: 'monospace', fontSize: '.78rem', color: '#F0D080', marginTop: '.1rem' }}>
                    {String(time + 1).padStart(2, '0')} / {String(selectedKing.oriki.length).padStart(2, '0')} verses
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: '#0d0704', padding: '1rem', border: '1px solid rgba(201,150,58,.1)', borderRadius: 4, maxHeight: '350px', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gap: '1.2rem' }}>
                {selectedKing.oriki.map((item, index) => {
                  const isCurrent = time === index;
                  return (
                    <div
                      key={index}
                      onClick={() => handleLineClick(index)}
                      style={{
                        padding: '.6rem .8rem',
                        background: isCurrent ? 'rgba(201,150,58,.08)' : 'transparent',
                        borderLeft: `3px solid ${isCurrent ? '#C9963A' : 'transparent'}`,
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        borderRadius: 3
                      }}
                      onMouseEnter={e => { if (!isCurrent) e.currentTarget.style.background = 'rgba(201,150,58,.03)'; }}
                      onMouseLeave={e => { if (!isCurrent) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div
                        style={{
                          fontSize: '0.92rem',
                          color: isCurrent ? '#F0D080' : 'rgba(245,237,216,.65)',
                          fontFamily: "'Playfair Display', serif",
                          fontStyle: 'italic',
                          fontWeight: isCurrent ? 600 : 400,
                          lineHeight: 1.45
                        }}
                      >
                        {item.yr}
                      </div>

                      <div
                        style={{
                          fontSize: '0.74rem',
                          color: isCurrent ? '#a4c4f5' : 'rgba(245,237,216,.38)',
                          marginTop: '.28rem',
                          lineHeight: 1.4
                        }}
                      >
                        {item.en}
                      </div>

                      {item.note && isCurrent && (
                        <div
                          onMouseEnter={() => setHoveredNote(item.note)}
                          onMouseLeave={() => setHoveredNote(null)}
                          style={{
                            display: 'inline-block',
                            marginTop: '.4rem',
                            fontSize: '.56rem',
                            fontFamily: "'Cinzel',serif",
                            color: '#C9963A',
                            borderBottom: '1px dotted #C9963A',
                            cursor: 'help'
                          }}
                        >
                          📜 View Translation Footnote
                        </div>
                      )}
                    </div>
                  );
                })}
                <div ref={lyricsEndRef} />
              </div>
            </div>

            {hoveredNote && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  right: '2rem',
                  padding: '1rem',
                  background: 'rgba(44,26,14,.98)',
                  border: '1px solid #C9963A',
                  borderLeft: '4px solid #C9963A',
                  borderRadius: 4,
                  fontSize: '.75rem',
                  lineHeight: 1.6,
                  color: '#F5EDD8',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
                  zIndex: 20,
                  animation: 'fadeUp 0.2s ease both'
                }}
              >
                <div className="cinzel" style={{ fontSize: '.52rem', letterSpacing: '.12em', color: '#C9963A', textTransform: 'uppercase', marginBottom: '.3rem' }}>Cultural Glossary</div>
                {hoveredNote}
              </div>
            )}

          </div>

        </div>
      </Section>
      <AdireDivider />
    </div>
  );
}
