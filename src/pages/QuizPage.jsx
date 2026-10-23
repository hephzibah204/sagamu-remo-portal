import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { dbGetAll, dbInsert } from '../services/db';

const QUESTIONS = [
  {
    question: "In what historic year was modern Sagamu founded through the mutual defense confederation of 13 Remo settlements?",
    options: ["1872 A.D.", "1804 A.D.", "1914 A.D.", "1960 A.D."],
    answer: 0,
    insight: "In 1872, driven by the need for survival and mutual defense during the 19th-century Yoruba Civil Wars, thirteen independent Remo settlements confederated to establish modern Sagamu."
  },
  {
    question: "What is the historical origin of the name 'Sagamu'?",
    options: ["A sacred hill fortress", "Orisagamu Ewa — a freshwater spring", "An ancient warrior sword", "A sacred palm tree"],
    answer: 1,
    insight: "The name Sagamu is derived from 'Orisagamu Ewa', a natural spring and aperture where fresh water bubbled from the earth, sustaining the founding confederate ancestors."
  },
  {
    question: "On whose fertile farmland did the 13 confederate communities gather to establish unified Sagamu?",
    options: ["Oduduwa", "Obanta", "Bammowu", "Lisabi"],
    answer: 2,
    insight: "The founding confederates assembled and settled on the elevated, fertile farmlands of a nobleman named Bammowu, which offered strategic high ground for defensive vigilance."
  },
  {
    question: "What is the traditional title of the sovereign paramount monarch of Sagamu and all of Remoland?",
    options: ["The Awujale", "The Akarigbo of Remoland", "The Alake", "The Ooni"],
    answer: 1,
    insight: "The Akarigbo of Remoland is the paramount sovereign and supreme traditional ruler over all 33 towns of Remoland (Remo Metalelogbon), with his royal seat in Sagamu (Aafin Akarigbo, Ita Oba)."
  },
  {
    question: "How many historic settlements united to form the confederation of Sagamu?",
    options: ["7 Settlements", "10 Settlements", "13 Settlements", "33 Settlements"],
    answer: 2,
    insight: "Thirteen distinct settlements confederated in 1872: Offin, Makun, Sonyindo, Epe, Ibido, Igbepa, Ado, Oko, Ipoji, Batoro, Ijoku, Latawa, and Ijagba."
  },
  {
    question: "Which market in Sagamu is internationally renowned as the largest kolanut trading hub in West Africa?",
    options: ["Mile 12 Market", "Sabo Kolanut Market", "Bodija Market", "Dugbe Market"],
    answer: 1,
    insight: "Sabo Market in Sagamu has operated for over a century as West Africa's preeminent wholesale exchange for Gbanja and Abata kolanuts, trading with Niger, Chad, Mali, and northern Nigeria."
  },
  {
    question: "Which institution, founded in 1946 in Sagamu, was the first secondary school established in Remoland?",
    options: ["Wesley High School", "Remo Secondary School (RSS Sagamu)", "Abeokuta Grammar School", "Ijebu Ode Grammar School"],
    answer: 1,
    insight: "Remo Secondary School (RSS) was established on Akarigbo Street in 1946 under the patronage of Oba William Christopher Adedoyin II as the pioneer secondary academy of Remoland."
  },
  {
    question: "Who is the reigning Akarigbo and Paramount Ruler of Remoland, crowned in December 2017?",
    options: ["Oba Moses Awolesi", "Oba Dr. Michael Sonariwo", "Oba Babatunde Adewale Ajayi, CFR, FCA", "Oba William Adedoyin"],
    answer: 2,
    insight: "His Royal Majesty Oba Babatunde Adewale Ajayi, CFR, FCA (Torungbuwa II), a distinguished Chartered Accountant and Barrister-at-Law, reigns as The Akarigbo of Remoland."
  },
  {
    question: "Which world-renowned two-time unified World Heavyweight Boxing Champion proudly hails from Sagamu?",
    options: ["Israel Adesanya", "Anthony Joshua, OBE", "Kamaru Usman", "Efe Ajagba"],
    answer: 1,
    insight: "Anthony Oluwafemi Olaseni Joshua, OBE, the two-time Unified World Heavyweight Champion, proudly traces his family roots and heritage to Sagamu."
  },
  {
    question: "What is the royal Yoruba salute uttered to pay supreme homage to the Akarigbo of Remoland?",
    options: ["Ẹ káàrọ̀!", "Kábíyèsí!", "Báwo ni!", "Ó dàábọ̀!"],
    answer: 1,
    insight: "\"Kábíyèsí!\" is the supreme royal salute for Yoruba monarchs, meaning 'The sovereign whose authority is unquestionable.'"
  }
];

export default function QuizPage() {
  const [userName, setUserName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [hoveredOpt, setHoveredOpt] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const certRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await dbGetAll('quiz_leaderboard');
      if (data && Array.isArray(data)) {
        setLeaderboard(data.sort((a, b) => b.score - a.score).slice(0, 5));
      }
    })();
  }, []);

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (!userName.trim()) {
      setErrorMsg('Please enter your name to claim your digital certificate.');
      return;
    }
    setErrorMsg('');
    setQuizStarted(true);
    setCurrentIdx(0);
    setScore(0);
    setSelectedOpt(null);
    setShowExplanation(false);
    setQuizCompleted(false);
  };

  const handleOptionSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    setShowExplanation(true);

    if (idx === QUESTIONS[currentIdx].answer) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      const finalScore = score + (selectedOpt === QUESTIONS[currentIdx].answer ? 10 : 0);
      dbInsert('quiz_leaderboard', {
        id: `LB-${Date.now()}`,
        name: userName.trim(),
        score: finalScore,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      }).then(() => {
        dbGetAll('quiz_leaderboard').then((data) => {
          if (data && Array.isArray(data)) {
            setLeaderboard(data.sort((a, b) => b.score - a.score).slice(0, 5));
          }
        });
      });
    }
  };

  const currentQ = QUESTIONS[currentIdx];
  const totalPossible = QUESTIONS.length * 10;
  const percentage = Math.round((score / totalPossible) * 100);

  const getRankTitle = (pct) => {
    if (pct >= 90) return 'Royal Sagamu Scholar · Arole Ogbon';
    if (pct >= 70) return 'Distinguished Heritage Ambassador';
    if (pct >= 50) return 'Knowledgeable Sagamu Citizen';
    return 'Aspiring Heritage Student';
  };

  return (
    <div>
      <SEO
        title="Sagamu Heritage Scholar Quiz"
        description="Test your knowledge of Sagamu's 1872 confederation, the Akarigbos of Remoland, Sabo trade, and culture to earn your royal certificate."
      />
      <Hero
        ey="Heritage & Intellect"
        ti="Sagamu Scholar Quiz"
        sub="Test your mastery of the 13 confederate quarters, royal dynasties, and cultural heritage of Sagamu Remoland."
      />
      <AdireDivider />

      <Section bg="#0A0F1D">
        {!quizStarted ? (
          <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📜</div>
            <p className="sl">Official Heritage Challenge</p>
            <h2 className="st">The Sagamu Scholar Examination</h2>
            <p style={{ fontSize: '.9rem', lineHeight: 1.85, color: 'rgba(245,237,216,.75)', marginBottom: '2rem' }}>
              Answer 10 authentic questions covering the 1872 confederation, the sacred spring of Orisagamu Ewa, the Akarigbos of Remoland, Sabo international trade, and Yoruba culture. Score 70% or higher to earn your downloadable Royal Scholar Certificate.
            </p>

            <form onSubmit={handleStartQuiz} style={{ background: 'rgba(44,26,14,.5)', border: '1px solid rgba(201,150,58,.25)', borderTop: '4px solid #C9963A', padding: '2rem', borderRadius: 4 }}>
              <label className="cinzel" style={{ fontSize: '.62rem', color: '#C9963A', display: 'block', marginBottom: '.6rem', letterSpacing: '.1em', textTransform: 'uppercase' }}>
                Your Full Name (As it will appear on your certificate)
              </label>
              <input
                className="inp"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Babatunde Olumide Adeleke"
                style={{ textAlign: 'center', fontSize: '1.05rem', marginBottom: '1rem' }}
              />
              {errorMsg && <div style={{ color: '#ef4444', fontSize: '.8rem', marginBottom: '1rem' }}>{errorMsg}</div>}
              <button type="submit" className="btn-p" style={{ width: '100%', fontSize: '.85rem' }}>
                Begin Heritage Examination →
              </button>
            </form>

            {leaderboard.length > 0 && (
              <div style={{ marginTop: '3rem', textAlign: 'left', background: 'rgba(0,0,0,.3)', border: '1px solid rgba(201,150,58,.15)', padding: '1.5rem', borderRadius: 4 }}>
                <div className="cinzel" style={{ fontSize: '.6rem', color: '#C9963A', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  🏆 Recent Royal Scholar Leaderboard
                </div>
                <div style={{ display: 'grid', gap: '.6rem' }}>
                  {leaderboard.map((lb, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.82rem', padding: '.4rem .6rem', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                      <span style={{ color: '#F5EDD8' }}>{i + 1}. {lb.name}</span>
                      <span style={{ color: '#C9963A', fontWeight: 'bold' }}>{lb.score} pts ({lb.date})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : !quizCompleted ? (
          <div style={{ maxWidth: '720px', margin: '0 auto' }}>
            {/* Progress Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(201,150,58,.2)', paddingBottom: '.8rem' }}>
              <div className="cinzel" style={{ fontSize: '.7rem', color: '#C9963A' }}>
                Question {currentIdx + 1} of {QUESTIONS.length}
              </div>
              <div style={{ fontSize: '.85rem', color: '#F0D080', fontWeight: 'bold' }}>
                Current Score: {score} pts
              </div>
            </div>

            {/* Question Card */}
            <div style={{ background: 'rgba(44,26,14,.55)', border: '1px solid rgba(201,150,58,.25)', borderTop: '4px solid #C9963A', padding: '2rem', borderRadius: 4, marginBottom: '1.5rem' }}>
              <h3 className="playfair" style={{ fontSize: '1.25rem', color: '#F5EDD8', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                {currentQ.question}
              </h3>

              <div style={{ display: 'grid', gap: '.8rem' }}>
                {currentQ.options.map((opt, idx) => {
                  let bg = 'rgba(201,150,58,.04)';
                  let border = '1px solid rgba(201,150,58,.2)';
                  let color = '#F5EDD8';

                  if (selectedOpt !== null) {
                    if (idx === currentQ.answer) {
                      bg = 'rgba(34,197,94,.18)';
                      border = '1px solid #22c55e';
                      color = '#86efac';
                    } else if (idx === selectedOpt) {
                      bg = 'rgba(239,68,68,.18)';
                      border = '1px solid #ef4444';
                      color = '#fca5a5';
                    }
                  } else if (hoveredOpt === idx) {
                    bg = 'rgba(201,150,58,.1)';
                    border = '1px solid #C9963A';
                  }

                  return (
                    <button
                      key={idx}
                      disabled={selectedOpt !== null}
                      onClick={() => handleOptionSelect(idx)}
                      onMouseEnter={() => setHoveredOpt(idx)}
                      onMouseLeave={() => setHoveredOpt(null)}
                      style={{
                        padding: '1rem 1.2rem',
                        textAlign: 'left',
                        background: bg,
                        border: border,
                        color: color,
                        borderRadius: 3,
                        cursor: selectedOpt === null ? 'pointer' : 'default',
                        transition: 'all .2s ease',
                        fontSize: '.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <span className="cinzel" style={{ fontSize: '.75rem', color: '#C9963A', fontWeight: 'bold' }}>
                        {['A', 'B', 'C', 'D'][idx]}.
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <div style={{ marginTop: '1.5rem', padding: '1.2rem', background: 'rgba(0,0,0,.45)', borderLeft: '3px solid #C9963A', borderRadius: 3, animation: 'fadeUp .3s ease' }}>
                  <div className="cinzel" style={{ fontSize: '.55rem', color: '#C9963A', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: '.3rem' }}>
                    Historical Insight & Commentary
                  </div>
                  <p style={{ fontSize: '.85rem', color: 'rgba(245,237,216,.85)', lineHeight: 1.65, margin: 0 }}>
                    {currentQ.insight}
                  </p>
                </div>
              )}
            </div>

            {selectedOpt !== null && (
              <div style={{ textAlign: 'right' }}>
                <button onClick={handleNextQuestion} className="btn-p" style={{ fontSize: '.8rem', padding: '.75rem 1.8rem' }}>
                  {currentIdx + 1 < QUESTIONS.length ? 'Next Question →' : 'Complete & View Certificate →'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion Certificate Screen */
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '.5rem' }}>👑</div>
            <p className="sl">Examination Completed</p>
            <h2 className="st">Royal Scholastic Recognition</h2>
            <p style={{ fontSize: '1.1rem', color: '#F0D080', marginBottom: '2rem' }}>
              Final Score: <strong>{score} / {totalPossible} ({percentage}%)</strong> · {getRankTitle(percentage)}
            </p>

            {/* Rendered Royal Certificate */}
            <div
              ref={certRef}
              style={{
                background: 'linear-gradient(135deg, #1c1008 0%, #2a1608 50%, #150a04 100%)',
                border: '6px double #C9963A',
                borderRadius: '8px',
                padding: '3rem 2.5rem',
                margin: '0 auto 2.5rem',
                boxShadow: '0 12px 40px rgba(0,0,0,0.8), 0 0 30px rgba(201,150,58,0.2)',
                position: 'relative',
              }}
            >
              <div className="cinzel" style={{ fontSize: '.75rem', letterSpacing: '.3em', color: '#C9963A', textTransform: 'uppercase', marginBottom: '.8rem' }}>
                THE PARAMOUNT KINGDOM OF SAGAMU REMOLAND
              </div>
              <h3 className="playfair" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: '#F5EDD8', fontWeight: 700, margin: '0 0 .5rem' }}>
                Certificate of Royal Scholastic Heritage
              </h3>
              <div style={{ width: '80px', height: '2px', background: '#C9963A', margin: '1rem auto' }} />

              <p style={{ fontSize: '.85rem', color: 'rgba(245,237,216,.7)', fontStyle: 'italic', margin: '1.5rem 0 .5rem' }}>
                This is to officially certify that
              </p>
              <div className="playfair" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: '#F0D080', fontWeight: 'bold', margin: '0.5rem 0' }}>
                {userName}
              </div>
              <p style={{ fontSize: '.85rem', color: 'rgba(245,237,216,.75)', maxWidth: '580px', margin: '.8rem auto 1.5rem', lineHeight: 1.7 }}>
                has successfully passed the comprehensive Sagamu Heritage Examination, demonstrating exemplary mastery of the 1872 confederation, the 13 confederate quarters, the royal lineage of the Akarigbos, and the cultural antiquities of Remoland.
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '2.5rem', borderTop: '1px solid rgba(201,150,58,.25)', paddingTop: '1.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <div className="cinzel" style={{ fontSize: '.52rem', color: 'rgba(201,150,58,.7)', textTransform: 'uppercase' }}>Academic Standing</div>
                  <div style={{ color: '#F5EDD8', fontSize: '.9rem', fontWeight: 'bold', marginTop: '.2rem' }}>{percentage}% ({getRankTitle(percentage)})</div>
                </div>
                <div>
                  <div className="cinzel" style={{ fontSize: '.52rem', color: 'rgba(201,150,58,.7)', textTransform: 'uppercase' }}>Seal of Remoland</div>
                  <div style={{ fontSize: '1.8rem', marginTop: '.2rem' }}>👑</div>
                </div>
                <div>
                  <div className="cinzel" style={{ fontSize: '.52rem', color: 'rgba(201,150,58,.7)', textTransform: 'uppercase' }}>Date Conferred</div>
                  <div style={{ color: '#F5EDD8', fontSize: '.9rem', fontWeight: 'bold', marginTop: '.2rem' }}>
                    {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => window.print()} className="btn-p">
                🖨️ Print / Save Certificate
              </button>
              <button onClick={() => { setQuizStarted(false); setQuizCompleted(false); }} className="btn-o">
                Retake Examination
              </button>
              <Link to="/history" className="btn-o">
                Read Sagamu History →
              </Link>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}
