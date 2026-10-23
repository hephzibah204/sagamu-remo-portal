// mobile/src/constants/quarters.ts
// Canonical 13 Ancestral Quarters of Sagamu, Ogun State

export interface SagamuQuarter {
  id: string;
  name: string;
  ward: string;
  zone?: string;
}

export const SAGAMU_ANCESTRAL_QUARTERS: SagamuQuarter[] = [
  { id: 'offin', name: 'Offin (Aafin Akarigbo)', ward: 'Offin Ward', zone: 'Central' },
  { id: 'makun', name: 'Makun (Ewusi Palace)', ward: 'Makun Ward', zone: 'South-Central' },
  { id: 'sonyindo', name: 'Sonyindo', ward: 'Sonyindo Ward', zone: 'North' },
  { id: 'epe', name: 'Epe-Sagamu', ward: 'Epe Ward', zone: 'East' },
  { id: 'ibido', name: 'Ibido', ward: 'Ibido Ward', zone: 'Central' },
  { id: 'igbepa', name: 'Igbepa', ward: 'Igbepa Ward', zone: 'North-East' },
  { id: 'ado', name: 'Ado-Sagamu', ward: 'Ado Ward', zone: 'South' },
  { id: 'oko', name: 'Oko', ward: 'Oko Ward', zone: 'West' },
  { id: 'ipoji', name: 'Ipoji', ward: 'Ipoji Ward', zone: 'Central' },
  { id: 'batoro', name: 'Batoro', ward: 'Batoro Ward', zone: 'West' },
  { id: 'ijoku', name: 'Ijoku', ward: 'Ijoku Ward', zone: 'Central-East' },
  { id: 'latawa', name: 'Latawa', ward: 'Latawa Ward', zone: 'North-West' },
  { id: 'ijagba', name: 'Ijagba', ward: 'Ijagba Ward', zone: 'South-East' },
  { id: 'sabo_market', name: 'Sabo (Kolanut Hub)', ward: 'Sabo Ward', zone: 'Commercial' },
  { id: 'ita_oba', name: 'Ita Oba (Palace Square)', ward: 'Offin Ward', zone: 'Royal' },
  { id: 'gra_expressway', name: 'GRA & Expressway Corridor', ward: 'GRA Corridor', zone: 'Metropolitan' },
];

export const SAGAMU_QUARTER_NAMES = SAGAMU_ANCESTRAL_QUARTERS.map(q => q.name);


