import { useState } from 'react';
import Hero from '../components/Hero';
import AdireDivider from '../components/AdireDivider';
import Section from '../components/Section';
import SEO from '../components/SEO';
import { dbInsert } from '../services/db';

const FACILITIES = [
  {
    name: 'Olabisi Onabanjo University Teaching Hospital (OOUTH)',
    type: 'Tertiary Teaching Hospital & Trauma Centre',
    address: 'Hospital Road, Sagamu, Ogun State',
    phone: '08023456789',
    hours: '24 Hours Emergency & Specialized Wards',
    services: 'Accident & Emergency, Neurosurgery, Cardiology, MRI Diagnostics, Dialysis, Central Blood Bank'
  },
  {
    name: 'Sagamu State General Hospital',
    type: 'Secondary State Hospital',
    address: 'Akarigbo Street, Offin-Sagamu',
    phone: '08034567890',
    hours: '24 Hours',
    services: 'General Medicine, Maternity, Immunization, Surgery, Laboratory Diagnostics'
  },
  {
    name: 'Sabo Comprehensive Primary Health Centre',
    type: 'Public Primary Health Centre',
    address: 'Sabo Commercial District, Sagamu',
    phone: '08045678901',
    hours: '24 Hours',
    services: 'Antenatal, Pediatric Care, Immunization, Malaria Prophylaxis, First Aid'
  },
  {
    name: 'St. Jude Specialist Hospital & Diagnostic Centre',
    type: 'Private Specialist Clinic',
    address: 'Ewusi Road, Makun-Sagamu',
    phone: '08056789012',
    hours: '24 Hours',
    services: 'Pediatrics, Obstetrics, Advanced Ultrasonography, Pharmacy'
  },
];

export default function HealthPage() {
  const [showBloodForm, setShowBloodForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', bloodGroup: '', phone: '', location: 'Offin' });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleBloodSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newDonor = {
      id: `BLD-${Math.floor(100 + Math.random() * 900)}`,
      name: form.name,
      bloodGroup: form.bloodGroup,
      phone: form.phone,
      location: form.location,
      available: true,
      registeredAt: new Date().toISOString(),
    };
    await dbInsert('blood_donors', newDonor);
    setSubmitted(true);
    setLoading(false);
    setForm({ name: '', bloodGroup: '', phone: '', location: 'Offin' });
    setTimeout(() => { setSubmitted(false); setShowBloodForm(false); }, 4000);
  };

  return (
    <div>
      <SEO
        title="Community Health & Medical Directory"
        description="Sagamu medical facilities, OOUTH tertiary healthcare, and emergency blood donor registry."
      />
      <Hero
        ey="Health & Wellness"
        ti="Healthcare & Medical Directory"
        sub="Access medical centers, trauma facilities at OOUTH Sagamu, and join the life-saving community blood donor network."
        dark
      />

      <Section bg="#0d0704" py="4rem">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="cinzel" style={{ color: 'var(--gold)', letterSpacing: '0.3em', fontSize: '0.7rem', marginBottom: '1rem' }}>MEDICAL FACILITIES</p>
          <h2 className="playfair" style={{ fontSize: '2.5rem', color: 'var(--cream)' }}>Healthcare Directory</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '1.5rem' }}>
          {FACILITIES.map(f => (
            <div key={f.name} className="glass card" style={{ padding: 'clamp(1.2rem, 3vw, 2rem)', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 className="playfair" style={{ fontSize: '1.3rem', color: 'var(--cream)' }}>{f.name}</h3>
                <span style={{ fontSize: '0.6rem', background: 'rgba(201,150,58,0.1)', color: 'var(--gold)', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>{f.type}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(245,237,216,0.6)', marginBottom: '0.5rem' }}>📍 {f.address}</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(245,237,216,0.6)', marginBottom: '0.5rem' }}>⏰ {f.hours}</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(245,237,216,0.6)', marginBottom: '1.5rem' }}>🩺 {f.services}</p>
              <a href={`tel:${f.phone}`} className="btn-o" style={{ display: 'inline-block', fontSize: '0.75rem', padding: '0.4rem 1rem', textDecoration: 'none' }}>
                📞 Call Facility ({f.phone})
              </a>
            </div>
          ))}
        </div>

        {/* Emergency Blood Donor Registry Section */}
        <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🩸</div>
          <h3 className="playfair" style={{ fontSize: '2rem', color: '#fca5a5', marginBottom: '0.5rem' }}>
            Emergency Voluntary Blood Donor Registry
          </h3>
          <p style={{ maxWidth: '640px', margin: '0 auto 1.5rem', fontSize: '0.9rem', color: 'rgba(245,237,216,0.7)', lineHeight: 1.6 }}>
            Rapid blood availability at OOUTH and local hospitals saves victims of road emergencies and maternity complications. Register your blood group to receive emergency SMS requests when a compatible life is at risk in Sagamu.
          </p>

          {!showBloodForm ? (
            <button onClick={() => setShowBloodForm(true)} className="btn-p" style={{ background: '#dc2626' }}>
              Register as Volunteer Blood Donor →
            </button>
          ) : (
            <form onSubmit={handleBloodSubmit} style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'left', background: 'rgba(0,0,0,0.5)', padding: '2rem', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.4)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', color: '#86efac', padding: '1rem' }}>
                  ✓ Thank you! You have been successfully enrolled in the Sagamu Community Blood Donor Registry.
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--gold)', display: 'block', marginBottom: '0.3rem' }}>Full Name *</label>
                    <input required className="inp" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Tayo Olumide" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--gold)', display: 'block', marginBottom: '0.3rem' }}>Blood Group *</label>
                      <select required className="inp" value={form.bloodGroup} onChange={e => set('bloodGroup', e.target.value)}>
                        <option value="">Select</option>
                        {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(b => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: 'var(--gold)', display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                      <input required className="inp" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="08012345678" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ fontSize: '0.75rem', color: 'var(--gold)', display: 'block', marginBottom: '0.3rem' }}>Sagamu Quarter / Location</label>
                    <select className="inp" value={form.location} onChange={e => set('location', e.target.value)}>
                      {['Offin', 'Makun', 'Sabo', 'Sonyindo', 'Epe', 'Ibido', 'Igbepa', 'Ado', 'Oko', 'Ipoji', 'Batoro', 'Ijoku', 'Latawa', 'Ijagba'].map(q => (
                        <option key={q} value={q}>{q}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" disabled={loading} className="btn-p" style={{ flex: 1, background: '#dc2626' }}>
                      {loading ? 'Submitting...' : 'Confirm Registration'}
                    </button>
                    <button type="button" onClick={() => setShowBloodForm(false)} className="btn-o">
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
