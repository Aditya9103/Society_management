export const navigation = {
  departments: [
    {
      id: 'security',
      label: 'Security',
      features: [
        { name: 'Visitor Management', slug: 'visitor-management' },
        { name: 'QR Vehicle & Gate Pass', slug: 'qr-vehicle-gate-pass' },
        { name: 'Pre-Approved Visitors', slug: 'pre-approved-visitors' },
        { name: 'Delivery & Staff Entry', slug: 'delivery-staff-entry' },
        { name: 'Emergency SOS', slug: 'emergency-sos' },
        { name: 'Digital Gate Register', slug: 'digital-gate-register' },
      ],
    },
    {
      id: 'residents',
      label: 'Residents',
      features: [
        { name: 'Resident Directory', slug: 'resident-directory' },
        { name: 'Tenant Management', slug: 'tenant-management' },
        { name: 'Vehicle Records', slug: 'vehicle-records' },
        { name: 'Document Vault', slug: 'document-vault' },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      features: [
        { name: 'Notices & Announcements', slug: 'notices-announcements' },
        { name: 'Community Feed & Events', slug: 'community-feed-events' },
      ],
    },
    {
      id: 'finance',
      label: 'Finance',
      features: [
        { name: 'Maintenance Billing', slug: 'maintenance-billing' },
        { name: 'Online Payments', slug: 'online-payments' },
        { name: 'Auto Receipts & Due Tracking', slug: 'auto-receipts-due-tracking' },
        { name: 'Expense Tracking', slug: 'expense-tracking' },
        { name: 'Financial Reports & Audit', slug: 'financial-reports-audit' },
      ],
    },
    {
      id: 'maintenance',
      label: 'Maintenance',
      features: [
        { name: 'Complaint Helpdesk', slug: 'complaint-helpdesk' },
        { name: 'Vendor & SLA Management', slug: 'vendor-sla-management' },
      ],
    },
    {
      id: 'amenities',
      label: 'Amenities',
      features: [
        { name: 'Amenities Booking', slug: 'amenities-booking' },
      ],
    },
    {
      id: 'administration',
      label: 'Administration',
      features: [
        { name: 'Multi-Society Management', slug: 'multi-society-management' },
        { name: 'Role-Based Access Control', slug: 'role-based-access-control' },
        { name: 'Approval Workflows', slug: 'approval-workflows' },
        { name: 'Analytics & Reports', slug: 'analytics-reports' },
        { name: 'Polls & Society Voting', slug: 'polls-voting' },
      ],
    },
  ],

  main: [
    { label: 'Pricing', href: '/pricing' },
    { label: 'Industries', href: '/industries' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],

  footer: {
    brand: {
      description: 'The complete operating system for gated communities and housing societies.',
    },
    columns: [
      {
        heading: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
          { label: 'Industries', href: '/industries' },
          { label: 'Book a Demo', href: '/book-demo' },
        ],
      },
      {
        heading: 'Security',
        links: [
          { label: 'Visitor Management', href: '/features/visitor-management' },
          { label: 'QR Gate Pass', href: '/features/qr-vehicle-gate-pass' },
          { label: 'Emergency SOS', href: '/features/emergency-sos' },
          { label: 'Digital Gate Register', href: '/features/digital-gate-register' },
        ],
      },
      {
        heading: 'Finance',
        links: [
          { label: 'Maintenance Billing', href: '/features/maintenance-billing' },
          { label: 'Online Payments', href: '/features/online-payments' },
          { label: 'Financial Reports', href: '/features/financial-reports-audit' },
          { label: 'Expense Tracking', href: '/features/expense-tracking' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Blog', href: '/blog' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        heading: 'Legal',
        links: [
          { label: 'Privacy Policy', href: '/privacy' },
          { label: 'Terms of Service', href: '/terms' },
        ],
      },
    ],
  },
};
