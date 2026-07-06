export const faqs = [
  {
    question: 'How quickly can Parapet be set up for our society?',
    answer: 'Most societies are fully live within 2–3 business days. We import your existing resident data, configure your billing rules, and train your team on-site. No hardware installation is required.',
  },
  {
    question: 'Can we import our existing resident and payment data?',
    answer: 'Yes. We support bulk import from Excel, CSV, and most common society management tools. Your data is migrated securely before go-live so there is no disruption to ongoing operations.',
  },
  {
    question: 'Does Parapet support multiple towers or phases in one society?',
    answer: 'Yes. The platform supports unlimited blocks, towers, and phases within a single society account, each with their own gate registers, amenity calendars, and unit directories.',
  },
  {
    question: 'Can tenants and owners have separate accounts?',
    answer: 'Absolutely. Tenants get their own app login scoped by the committee — they can pay dues, raise complaints, and book amenities, but owners retain control of unit documents and financial history.',
  },
  {
    question: 'How does the QR visitor system work without internet at the gate?',
    answer: 'The guard app caches pre-approved passes locally. Residents can generate offline-compatible QR passes that work even when the gate device has no signal. All logs sync automatically when connectivity resumes.',
  },
  {
    question: 'Is resident data encrypted and where is it stored?',
    answer: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We host on AWS Mumbai for data residency compliance. Daily backups, no third-party data sharing, and DPDP-ready access controls.',
  },
  {
    question: 'What happens during the Emergency SOS — who gets notified?',
    answer: 'One tap from the resident app sends an instant push notification to all on-duty guards and committee admins simultaneously. The guard nearest the unit sees the floor and unit number. An incident report is auto-generated when the alert is acknowledged.',
  },
  {
    question: 'Can the committee see financial reports without the accountant?',
    answer: 'Yes. The committee admin role has read access to income/expense summaries, collections dashboards, and outstanding dues — without edit rights. Accountants retain full ledger access. Access levels are fully configurable via RBAC.',
  },
];

export const homeFaqs = faqs.slice(0, 6);
