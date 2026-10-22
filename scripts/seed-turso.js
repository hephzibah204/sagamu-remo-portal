import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@libsql/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}

const HASH = 'a1b2c3d4e5f60718:b920824b5f5b276c0ce73a4b033f16f60e0a9c2d550ce6fcb7ffe2243dfb14b1215f9de7a1aa464994c607b8c9f0c229f98b09f4052b4948ff1f20a9bc9fd8d9';

const SEED = {
  users: [
    { id: 'usr_admin_001', full_name: 'Engr. Olufemi Balogun (Admin)', email: 'admin@sagamuremo.org', phone: '08033334455', password_hash: HASH, citizen_type: 'indigene', quarter: 'Offin', compound: 'SDA Central Command', id_card_number: 'SGM-ADM-101', role: 'ocda_admin', agency_name: 'Sagamu Development Association (SDA)', badge_number: 'SDA-ADM-101', is_officer_verified: 1, is_verified: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 'usr_sec_001', full_name: 'Insp. Kayode Adeleke', email: 'police@sagamuremo.org', phone: '08031112233', password_hash: HASH, citizen_type: 'officer', quarter: 'Expressway Axis', compound: 'Nigeria Police Force Area Command', id_card_number: 'NPF-OG-4891', role: 'security_officer', agency_name: 'Nigeria Police Force (NPF)', badge_number: 'NPF-OG-4891', is_officer_verified: 1, is_verified: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 'usr_pal_001', full_name: 'Prince Olawale Babatunde', email: 'protocol@sagamuremo.org', phone: '08032223344', password_hash: HASH, citizen_type: 'indigene', quarter: 'Offin', compound: 'Aafin Akarigbo', id_card_number: 'PAL-PRO-002', role: 'palace_protocol', agency_name: 'Aafin Akarigbo Palace Secretariat', badge_number: 'PAL-PRO-002', is_officer_verified: 1, is_verified: 1, created_at: '2024-01-01T00:00:00Z' },
    { id: 'usr_cit_001', full_name: 'Adewale Babatunde Ogunleke', email: 'adewale.ogunleke@gmail.com', phone: '08034512345', password_hash: HASH, citizen_type: 'indigene', quarter: 'Offin', compound: 'Torungbuwa Royal Court', id_card_number: 'SGM-782910', role: 'citizen', is_officer_verified: 0, is_verified: 1, created_at: '2024-01-10T10:00:00Z' },
  ],
  id_cards: [
    { id: 'SGM-782910', full_name: 'Adewale Babatunde Ogunleke', card_type: 'indigene', dob: '1992-06-14', compound: 'Torungbuwa Royal Court', quarter: 'Offin', phone: '08034512345', email: 'adewale.ogunleke@gmail.com', address: '14 Palace Way, Ita Oba, Offin, Sagamu Remo', occupation: 'Civil Engineer', status: 'approved', issued_date: '2024-01-15', expiry_date: '2027-01-15', photo_url: '', verified_by: 'HRM Akarigbo Palace Office', created_at: '2024-01-10T10:00:00Z' },
    { id: 'SGM-D-492019', full_name: 'Dr. Folashade Adeyemi-Clark', card_type: 'diaspora', dob: '1985-11-22', compound: 'Ewusi', quarter: 'Makun', phone: '+44 7911 123456', email: 'f.adeyemi@nhs.net', address: 'London, United Kingdom (Home: 3 Ewusi St, Makun)', occupation: 'Consultant Surgeon', status: 'approved', issued_date: '2024-03-01', expiry_date: '2027-03-01', photo_url: '', verified_by: 'SDA Diaspora Secretariat', created_at: '2024-02-28T14:30:00Z' },
    { id: 'SGM-R-839201', full_name: 'Chief Emeka Okafor', card_type: 'resident', dob: '1978-04-09', compound: 'Other', quarter: 'GRA & Expressway Corridor', phone: '08023456789', email: 'okafor.holdings@gmail.com', address: 'Plot 5 Expressway Corridor, Sagamu', occupation: 'Logistics Director', status: 'approved', issued_date: '2023-11-12', expiry_date: '2026-11-12', photo_url: '', verified_by: 'Sagamu Central Community Council', created_at: '2023-11-05T09:15:00Z' },
  ],
  royal_audiences: [
    { id: 'AUD-2026-001', full_name: 'Chief Olumide Sobukonla', purpose: 'Community Project Briefing (Youth Skills Hub)', booking_date: '2026-09-04', time_slot: '11:00 AM', phone: '08031122334', email: 'olumide.sob@sagamuyouths.ng', group_size: '3', id_card: 'SGM-892102', message: 'Briefing HRM on the proposed Sagamu Tech Corridor ICT empowerment initiative supported by diaspora alumni.', status: 'confirmed', palace_chamber: 'State Reception Hall', confirmed_date: '2026-09-04', confirmed_time: '11:00 AM', palace_notes: 'Palace Secretary cleared: Room 2 Aafin.', created_at: '2026-08-20T11:00:00Z' },
    { id: 'AUD-2026-002', full_name: 'Mrs. Titilayo Awobajo', purpose: 'Chieftaincy & Ancestral Compound Inquiry', booking_date: '2026-09-11', time_slot: '02:00 PM', phone: '08055544332', email: 'titi.awobajo@yahoo.com', group_size: '2', id_card: 'SGM-782910', message: 'Documentation and royal recognition of the renovated Orowa ancestral lineage quarters.', status: 'pending', palace_chamber: 'Palace Secretariat Court', confirmed_date: '2026-09-11', confirmed_time: '02:00 PM', palace_notes: 'Pending verification of compound elder signature.', created_at: '2026-08-25T16:20:00Z' },
  ],
  land_registry: [
    { id: 'SGM-LND-001', area_quarter: 'Interchange Corridor', owner_name: 'Sagamu Logistics Trust', size_description: '12 Acres', land_use: 'Industrial / Commercial', status: 'Verified', registration_date: '2023-04-12', coordinates: '6.8843° N, 3.5817° E', disputes_count: 0, documents_ref: 'Gazette No. OG/2023/44, Survey Plan No. OG/LND/891' },
    { id: 'SGM-LND-002', area_quarter: 'Offin Corridor', owner_name: 'Torungbuwa Family Estate', size_description: '2 Plots', land_use: 'Residential', status: 'Verified', registration_date: '2024-01-05', coordinates: '6.8485° N, 3.6465° E', disputes_count: 0, documents_ref: 'Approved Family Conveyance Deed 2024' },
    { id: 'SGM-LND-003', area_quarter: 'Expressway Bypass', owner_name: 'Conference Hospitality Group', size_description: '4 Acres', land_use: 'Commercial / Hospitality', status: 'Verified', registration_date: '2024-05-20', coordinates: '6.8520° N, 3.6480° E', disputes_count: 0, documents_ref: 'Interim Survey Filing #492' },
    { id: 'SGM-LND-004', area_quarter: 'Makun Sector', owner_name: 'Baba Tunde Afolabi', size_description: '1 Plot (600sqm)', land_use: 'Residential', status: 'Verified', registration_date: '2019-11-08', coordinates: '6.8410° N, 3.6450° E', disputes_count: 0, documents_ref: 'Deed of Gift & Allocation Certificate' },
    { id: 'SGM-LND-005', area_quarter: 'Lafarge Industrial Belt', owner_name: 'Torungbuwa Royal Family Holding', size_description: '20 Acres', land_use: 'Mixed Use / Cultural Heritage', status: 'Verified', registration_date: '2015-08-30', coordinates: '6.8390° N, 3.6610° E', disputes_count: 0, documents_ref: 'Crown Demarcation Certificate 2015' },
  ],
  marketplace_listings: [
    { id: 'MKT-000', category: 'Services', title: 'Hephzibah Edutech — Software Dev, AI & Cloud Bootcamp', description: '12-week intensive digital bootcamp for Sagamu youth & professionals. Learn Fullstack Web, Python AI, and Cloud Architecture. Certificate & internship placement included.', price: '₦35,000 / Cohort', seller_name: 'Hephzibah Edutech & Innovation Hub', quarter: 'Offin', phone: '08038920110', whatsapp: '2348038920110', icon: '🚀', badge: 'featured', is_verified: 1, status: 'active', created_at: '2026-08-26T10:00:00Z' },
    { id: 'MKT-KOLA', category: 'Farm Produce', title: 'Wholesale Export-Grade Kolanut (Gbanja & Abata - 50kg Bags)', description: 'Top grade cured kolanut direct from Sabo International Market. Packaged for trans-Saharan merchants, interstate distributors, and diaspora exports.', price: '₦95,000 / 50kg Bag', seller_name: 'Sabo Kolanut Exporters Syndicate', quarter: 'Sabo Commercial District', phone: '07049570510', whatsapp: '2347049570510', icon: '🌰', badge: 'fresh', is_verified: 1, status: 'active', created_at: '2026-08-25T07:00:00Z' },
    { id: 'MKT-001', category: 'Farm Produce', title: 'Fresh Sagamu Yam — Grade A (Tuber & Bulk Bags)', description: 'Premium white yam harvested from fertile Makun farm belts. Free delivery within Sagamu central confederation. 50kg bags available for diaspora and Lagos orders.', price: '₦4,500 / tuber', seller_name: 'Makun Farmers Agricultural Union', quarter: 'Makun', phone: '08034512345', whatsapp: '2348034512345', icon: '🌾', badge: 'organic', is_verified: 1, status: 'active', created_at: '2026-08-01T08:00:00Z' },
    { id: 'MKT-CEMENT', category: 'Trade & Retail', title: 'Certified Lafarge Elephant Cement (Classic 32.5 & Supaset 42.5R)', description: 'Factory-direct Lafarge Elephant Cement delivered directly to construction sites across Sagamu, GRA, and the Interchange Corridor.', price: '₦8,200 / 50kg Bag', seller_name: 'Sagamu Elephant Cement Works Depot', quarter: 'Lafarge Industrial Belt', phone: '08028876655', whatsapp: '2348028876655', icon: '🏗️', badge: 'certified', is_verified: 1, status: 'active', created_at: '2026-08-22T08:00:00Z' },
    { id: 'MKT-002', category: 'Crafts & Adire', title: 'Handcrafted Adire Eleko & Royal Aso-Oke Ceremony Set (6 Yards)', description: 'Authentic hand-dyed Adire fabric sets made by master artisans using traditional indigo technique. Ideal for weddings and Sagamu Day.', price: '₦22,000 / set', seller_name: 'Offin Heritage Crafts & Fabrics', quarter: 'Offin', phone: '08056781234', whatsapp: '2348056781234', icon: '🪡', badge: 'handmade', is_verified: 1, status: 'active', created_at: '2026-08-05T09:30:00Z' },
    { id: 'MKT-003', category: 'Food & Catering', title: 'Sagamu Traditional Event Catering (Yoruba Delicacies)', description: 'Full catering for ceremonies, funerals, and coronations. Remo jollof, amala, egusi, and fresh palm wine. Minimum 50 guests.', price: 'From ₦2,500 / head', seller_name: 'Aafin Royal Kitchen', quarter: 'Ita Oba (Palace Square)', phone: '08067893456', whatsapp: '2348067893456', icon: '🍲', badge: 'popular', is_verified: 1, status: 'active', created_at: '2026-08-10T12:00:00Z' },
  ],
  project_donations: [
    { id: 'DON-INIT-01', project_id: 'civic_centre', project_title: 'Sagamu Remo Modern Civic & ICT Innovation Centre', donor_name: 'UK Diaspora Alumni Chapter', donor_email: 'uk-alumni@sagamuremo.org', amount_naira: 2500000, paystack_reference: 'SGM-DON-INIT-01', status: 'success', created_at: '2026-08-01T12:00:00Z' },
    { id: 'DON-INIT-02', project_id: 'health_centre', project_title: 'Sagamu Primary Health Solar & Cold Chain Facility', donor_name: 'Engr. Dapo Saliu', donor_email: 'dapo.saliu@gmail.com', amount_naira: 1000000, paystack_reference: 'SGM-DON-INIT-02', status: 'success', created_at: '2026-08-15T09:30:00Z' },
  ],
  incident_reports: [
    { id: 'INC-2026-901', category: '🚨 Highway Incident / Traffic Alert', severity: 'High', threat_level: 'CODE_AMBER', is_silent_panic: 0, is_live_tracking: 1, assigned_agency: 'FRSC & Nigeria Police Force', responding_unit: 'Sagamu Interchange Patrol', agency_notes: 'Patrol dispatched to Sagamu Interchange corridor.', location: 'Sagamu Interchange, Lagos-Ibadan Expressway', latitude: 6.8843, longitude: 3.5817, description: 'Traffic obstruction and vehicle clearance operation along expressway interchange.', reporter_name: 'Concerned Motorist', reporter_phone: '08033221144', status: 'dispatched', created_at: '2026-10-06T10:00:00Z' },
  ],
  scholarship_applications: [
    { id: 'SCH-2026-001', program_id: '1', program_title: 'Sagamu Kingdom Academic Excellence Grant', applicant_name: 'Oluwaseun Adedamola', compound: 'Torungbuwa Royal Court', institution: 'Olabisi Onabanjo University (Engineering, 400L)', cgpa: '4.62', email: 'seun.adedamola@student.oouagoiwoye.edu.ng', phone: '08039871234', statement: 'Dedicated to bringing sustainable solar mini-grid engineering to Sagamu Remo agricultural corridors.', status: 'shortlisted', created_at: '2026-08-10T14:00:00Z' },
  ],
  forum_posts: [
    { id: 1, author_name: 'Chief Olatunji Orowa', category: 'heritage', topic: 'Preserving the Historic Confederation Monuments of the 13 Quarters', body: 'Fellow citizens, let us deliberate on modern protective reinforcement for our 1872 confederation monuments before the next Sagamu Day celebration.', created_at: '2026-08-12T10:00:00Z' },
  ],
  customary_disputes: [
    { id: 'DISP-2026-001', title: 'Ancestral Farmland Boundary Demarcation along Agbele Axis', category: 'land_boundary', complainant_name: 'Pa Johnson Adeleke', complainant_phone: '08033221199', complainant_compound: 'Adeleke Royal Compound', complainant_quarter: 'Offin', respondent_name: 'Chief Olatunji Sobowale', respondent_phone: '08055443322', respondent_compound: 'Sobowale Family House', respondent_quarter: 'Agbele Corridor', location: 'Agbele Boundary Marker 4', assigned_arbitrator_id: 'arb-01', assigned_arbitrator_name: 'High Chief Rasheed Adeleke (The Oliwo)', status: 'HEARING_SCHEDULED', hearing_date: '2026-10-15', hearing_time: '10:00 AM', hearing_venue: 'Inner Royal Council Chamber, Aafin Akarigbo', description: 'Historical survey beacon disputed following road expansion near Agbele boundary.', arbitrator_notes: 'Both family heads formally summoned for physical sitting.', filed_at: '2026-09-10T10:00:00Z' },
  ],
  diaspora_escrow_projects: [
    { id: 'ESC-PRJ-01', title: 'Solar Streetlight Grid Phase II (Town Core & Oja Oba)', category: 'INFRASTRUCTURE', location: 'Palace Way to Makun Hospital Axis (4.2km)', target_budget_ngn: 18500000, target_budget_usd: 12500, raised_ngn: 14800000, escrow_locked_ngn: 8880000, released_ngn: 5920000, status: 'IN_EXECUTION', lead_contractor: 'Solaris Energy Africa Ltd & SDA Works', lead_supervisor: 'Engr. Folake Sobukonla (SDA)', donors_count: 42, completion_percentage: 65, created_at: '2026-08-01T12:00:00Z' },
  ],
  civic_infrastructure_issues: [
    { id: 'FMS-2026-104', title: 'Severe Asphalt Potholes on Palace Way near Town Hall', category: 'pothole_road', quarter: 'Offin', location: 'Palace Way, directly opposite SDA Secretariat', latitude: 6.9368, longitude: 3.6330, severity: 'HIGH', status: 'CONTRACTOR_ASSIGNED', upvotes: 28, reporter_name: 'Segun Ogunsanya', description: 'Deep pothole damaging low vehicle suspensions and slowing emergency ambulances from Tollgate.', assigned_contractor: 'Remo North Works Dept & SDA Paving Unit', contractor_eta: 'Paving team mobilized for Friday 26th Sep', reported_at: '2026-09-20T14:00:00Z' },
  ],
};

async function seedTable(client, table, records) {
  let inserted = 0;
  for (const rec of records) {
    const cols = Object.keys(rec);
    const placeholders = cols.map(() => '?').join(', ');
    const sql = `INSERT OR IGNORE INTO ${table} (${cols.join(', ')}) VALUES (${placeholders})`;
    const args = cols.map((c) => {
      const v = rec[c];
      if (typeof v === 'boolean') return v ? 1 : 0;
      if (v === null || v === undefined) return null;
      if (typeof v === 'object') return JSON.stringify(v);
      return v;
    });
    const r = await client.execute({ sql, args });
    inserted += Number(r.rowsAffected ?? 0);
  }
  return inserted;
}

async function run() {
  await loadEnvFile();
  const url = process.env.TURSO_DATABASE_URL || process.env.LIBSQL_URL || process.argv[2];
  const token = process.env.TURSO_AUTH_TOKEN || process.env.LIBSQL_AUTH_TOKEN || process.argv[3];
  if (!url || !token) {
    console.log('Usage: node scripts/seed-turso.js "libsql://..." "auth-token"');
    process.exit(1);
  }
  const client = createClient({ url, authToken: token });
  console.log(`🔗 Seeding Turso: ${url}\n`);
  for (const [table, records] of Object.entries(SEED)) {
    const n = await seedTable(client, table, records);
    console.log(`  - ${table}: ${n} inserted (${records.length} provided)`);
  }
  console.log('\n✅ Turso seed data restored.');
}

run().catch((e) => { console.error('❌ Seed failed:', e.message); process.exit(1); });
