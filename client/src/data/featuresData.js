import { Shield, Users, Globe, IndianRupee, Wrench, Dumbbell, LayoutDashboard } from 'lucide-react';
import { diagrams } from './diagrams';

export const featuresData = {
  security: {
    title: 'Security',
    icon: Shield,
    description: 'Enterprise-grade security and access control for modern gated communities.',
    items: {
      'visitor-management': {
        diagram: diagrams.visitorManagement,
        title: 'Visitor Management',
        // previewImage: '/features/security/visitor-management.png',
        description: 'Digitize gate entries with a lightning-fast process. Pre-approve guests, track in-app, and maintain full digital logs.',
        benefits: [
          { title: 'Zero Wait Time', desc: 'Pre-approved QR codes reduce gate entry to 3 seconds.' },
          { title: 'OTP Verification', desc: 'Secure phone number verification for unknown walk-ins.' },
          { title: 'Real-time Alerts', desc: 'Instant push notifications to residents upon arrival.' }
        ],
        steps: [
          'Resident creates an invite in the app',
          'Visitor shows QR code at the gate',
          'Guard scans and logs entry instantly'
        ]
      },
      'qr-vehicle-gate-pass': {
        diagram: diagrams.qrVehicleGatePass,
        title: 'QR Vehicle & Gate Pass',
        previewImage: '/features/security/qr-vehicle-gate-pass.png',
        description: 'Seamless vehicle tracking and automated boom barrier integration.',
        benefits: [
          { title: 'Fast Lanes', desc: 'Dedicated fast lanes for residents with RFID/QR.' },
          { title: 'Unauthorized Alerts', desc: 'Flag unknown vehicles instantly.' },
          { title: 'Parking Management', desc: 'Track visitor parking slot availability.' }
        ],
        steps: [
          'Issue digital passes for vehicles',
          'Scan at entry/exit',
          'Maintain complete digital logs'
        ]
      },
      'pre-approved-visitors': {
        diagram: diagrams.preApprovedVisitors,
        title: 'Pre-Approved Visitors',
        previewImage: '/features/security/pre-approved-visitors.png',
        description: 'Send digital invites via WhatsApp for seamless guest entry.',
        benefits: [
          { title: 'WhatsApp Integration', desc: 'Guests receive passes directly on WhatsApp.' },
          { title: 'Validity Controls', desc: 'Set expiry times for digital passes.' },
          { title: 'Event Invites', desc: 'Bulk generate passes for parties and events.' }
        ],
        steps: [
          'Select contacts',
          'Set date and time',
          'Share link'
        ]
      },
      'delivery-staff-entry': {
        diagram: diagrams.deliveryStaffEntry,
        title: 'Delivery & Staff Entry',
        previewImage: '/features/security/delivery-staff-entry.png',
        description: 'Streamlined verification for Swiggy, Zomato, Amazon, and daily help.',
        benefits: [
          { title: 'Company Verification', desc: 'Auto-verify delivery partners via API.' },
          { title: 'Daily Staff Attendance', desc: 'Track entry/exit of maids, drivers, and cooks.' },
          { title: 'Leave Management', desc: 'Notify residents if staff takes leave.' }
        ],
        steps: [
          'Register daily staff',
          'Biometric or passcode entry',
          'Auto-notify residents'
        ]
      },
      'emergency-sos': {
        diagram: diagrams.emergencySos,
        title: 'Emergency SOS',
        previewImage: '/features/security/emergency-sos.png',
        description: 'One-tap emergency alerts to guards and committee members.',
        benefits: [
          { title: 'Instant Broadcast', desc: 'Alerts sound loudly on guard devices.' },
          { title: 'Location Pin', desc: 'Shares exact flat number and map pin.' },
          { title: 'Audit Trail', desc: 'Logs response times for compliance.' }
        ],
        steps: [
          'Resident presses SOS button',
          'Nearest guards notified',
          'Incident report filed'
        ]
      },
      'digital-gate-register': {
        diagram: diagrams.digitalGateRegister,
        title: 'Digital Gate Register',
        previewImage: '/features/security/digital-gate-register.png',
        description: 'Replace paper registers with a secure, searchable cloud database.',
        benefits: [
          { title: 'Cloud Backup', desc: 'Data never lost, damaged, or stolen.' },
          { title: 'Easy Search', desc: 'Find records from months ago in seconds.' },
          { title: 'Export Reports', desc: 'Generate compliance reports easily.' }
        ],
        steps: [
          'Data entered digitally',
          'Synced to cloud',
          'Available for committee audit'
        ]
      }
    }
  },
  residents: {
    title: 'Residents',
    icon: Users,
    description: 'Digital tools for a connected and harmonious neighborhood.',
    items: {
      // 'resident-directory': {
      //   diagram: diagrams.residentDirectory,
      //   title: 'Resident Directory',
      //   previewImage: '/features/residents/resident-directory.png',
      //   description: 'A secure, privacy-first contact list for your entire society.',
      //   benefits: [
      //     { title: 'Privacy Controls', desc: 'Residents choose what to share.' },
      //     { title: 'Intercom Free', desc: 'Call neighbors directly through the app.' },
      //     { title: 'Blood Group DB', desc: 'Critical info available for emergencies.' }
      //   ],
      //   steps: ['Update profile', 'Set privacy', 'Connect with neighbors']
      // },
      // 'tenant-management': {
      //   diagram: diagrams.tenantManagement,
      //   title: 'Tenant Management',
      //   previewImage: '/features/residents/tenant-management.png',
      //   description: 'Streamline the move-in process, police verification, and NOCs.',
      //   benefits: [
      //     { title: 'Digital NOCs', desc: 'Automated clearance workflows.' },
      //     { title: 'Lease Tracking', desc: 'Alerts before lease expiry.' },
      //     { title: 'Document Vault', desc: 'Store ID proofs securely.' }
      //   ],
      //   steps: ['Owner initiates request', 'Tenant uploads docs', 'Committee approves']
      // },
      'vehicle-records': {
        diagram: diagrams.vehicleRecords,
        title: 'Vehicle Records',
        previewImage: '/features/residents/vehicle-records.png',
        description: 'Maintain a central database of all resident vehicles and parking slots.',
        benefits: [
          { title: 'QR Sticker Management', desc: 'Track physical vehicle QR stickers.' },
          { title: 'Wrong Parking', desc: 'Report wrongly parked vehicles easily.' },
          { title: 'Slot Linking', desc: 'Link cars to specific purchased slots.' }
        ],
        steps: ['Add vehicle details', 'Upload RC copy', 'Receive approval']
      },
      'document-vault': {
        diagram: diagrams.documentVault,
        title: 'Document Vault',
        previewImage: '/features/residents/document-vault.png',
        description: 'Secure cloud storage for society bylaws, meeting minutes, and flat papers.',
        benefits: [
          { title: 'Role-based Access', desc: 'Only owners see specific financial docs.' },
          { title: 'Version Control', desc: 'Keep track of updated bylaws.' },
          { title: 'Easy Sharing', desc: 'Share docs with auditors in one click.' }
        ],
        steps: ['Upload document', 'Set visibility', 'Publish']
      }
    }
  },
  community: {
    title: 'Community',
    icon: Globe,
    description: 'Fostering communication and engagement among residents.',
    items: {
      'notices-announcements': {
        diagram: diagrams.noticesAnnouncements,
        title: 'Notices & Announcements',
        previewImage: '/features/community/notices-announcements.png',
        description: 'Broadcast important updates instantly to all residents.',
        benefits: [
          { title: 'Read Receipts', desc: 'Know exactly who has read the notice.' },
          { title: 'Rich Media', desc: 'Attach PDFs, images, and links.' },
          { title: 'Targeted Broadcast', desc: 'Send only to specific blocks or owners.' }
        ],
        steps: ['Draft notice', 'Select audience', 'Publish instantly']
      },
      // 'community-feed-events': {
      //   diagram: diagrams.communityFeedEvents,
      //   title: 'Community Feed & Events',
      //   previewImage: '/features/community/community-feed-events.png',
      //   description: 'A private social network for your housing society.',
      //   benefits: [
      //     { title: 'RSVP Tracking', desc: 'Manage event attendance easily.' },
      //     { title: 'Classifieds', desc: 'Buy, sell, or rent within the society.' },
      //     { title: 'Moderation', desc: 'Committee can moderate discussions.' }
      //   ],
      //   steps: ['Create post', 'Engage in comments', 'Build community']
      // }
    }
  },
  finance: {
    title: 'Finance',
    icon: IndianRupee,
    description: 'Automated billing, accounting, and expense tracking.',
    items: {
      'maintenance-billing': {
        diagram: diagrams.maintenanceBilling,
        title: 'Maintenance Billing',
        previewImage: '/features/finance/maintenance-billing.png',
        description: 'Automate invoice generation with complex calculation rules.',
        benefits: [
          { title: 'Flexible Formulas', desc: 'By sq.ft, fixed, or hybrid billing.' },
          { title: 'Auto-Invoicing', desc: 'Invoices generated on the 1st of every month.' },
          { title: 'Defaulter Tracking', desc: 'Automatic late fee calculations.' }
        ],
        steps: ['Set billing formula', 'Auto-generate invoices', 'Track dues']
      },
      'online-payments': {
        diagram: diagrams.onlinePayments,
        title: 'Online Payments',
        previewImage: '/features/finance/online-payments.png',
        description: 'UPI, Credit Cards, and Net Banking integrated directly.',
        benefits: [
          { title: 'Zero Setup', desc: 'Pre-integrated payment gateway.' },
          { title: 'Lowest MDR', desc: 'Special rates for housing societies.' },
          { title: 'Instant Settlement', desc: 'Funds hit the society account T+1.' }
        ],
        steps: ['Resident clicks pay', 'Completes transaction', 'Ledger updated automatically']
      },
      'auto-receipts-due-tracking': {
        diagram: diagrams.autoReceiptsDueTracking,
        title: 'Auto Receipts & Due Tracking',
        previewImage: '/features/finance/auto-receipts-due-tracking.png',
        description: 'Eliminate manual reconciliation with automated ledgers.',
        benefits: [
          { title: 'Instant Receipts', desc: 'Generated immediately upon payment.' },
          { title: 'Bank Sync', desc: 'Reconcile NEFT/RTGS payments easily.' },
          { title: 'Reminders', desc: 'Automated SMS/Email reminders for dues.' }
        ],
        steps: ['Payment received', 'Receipt generated', 'Ledger balanced']
      },
      'expense-tracking': {
        diagram: diagrams.expenseTracking,
        title: 'Expense Tracking',
        previewImage: '/features/finance/expense-tracking.png',
        description: 'Track vendor payments, petty cash, and staff salaries.',
        benefits: [
          { title: 'Budget vs Actuals', desc: 'Monitor society spending in real-time.' },
          { title: 'Approval Chains', desc: 'Multi-level approvals for large payments.' },
          { title: 'Vendor Ledgers', desc: 'Complete history of all vendor payouts.' }
        ],
        steps: ['Upload bill', 'Committee approves', 'Payment processed']
      },
      'financial-reports-audit': {
        diagram: diagrams.financialReportsAudit,
        title: 'Financial Reports & Audit',
        previewImage: '/features/finance/financial-reports-audit.png',
        description: 'Ready-to-export balance sheets, P&L, and trial balances.',
        benefits: [
          { title: 'Auditor Ready', desc: 'Tally-compatible exports.' },
          { title: 'Real-time Dashboards', desc: 'Visual graphs of society financial health.' },
          { title: 'Compliance', desc: 'GST reports and TDS tracking.' }
        ],
        steps: ['Select date range', 'Choose report type', 'Export to PDF/Excel']
      }
    }
  },
  maintenance: {
    title: 'Maintenance',
    icon: Wrench,
    description: 'Keep your society running smoothly with automated helpdesks.',
    items: {
      'complaint-helpdesk': {
        diagram: diagrams.complaintHelpdesk,
        title: 'Complaint Helpdesk',
        previewImage: '/features/maintenance/complaint-helpdesk.png',
        description: 'Track resident complaints from ticket creation to resolution.',
        benefits: [
          { title: 'Photo Attachments', desc: 'Residents can upload photos of the issue.' },
          { title: 'Auto-Assignment', desc: 'Plumbing issues go to the plumber.' },
          { title: 'Feedback Loop', desc: 'Residents rate the service after closure.' }
        ],
        steps: ['Raise ticket', 'Staff assigned', 'Issue resolved & rated']
      },
      'vendor-sla-management': {
        diagram: diagrams.vendorSlaManagement,
        title: 'Vendor & SLA Management',
        previewImage: '/features/maintenance/vendor-sla-management.png',
        description: 'Track AMC contracts, lift maintenance schedules, and SLA breaches.',
        benefits: [
          { title: 'AMC Reminders', desc: 'Never miss a service date.' },
          { title: 'Performance Tracking', desc: 'Evaluate vendors based on SLA.' },
          { title: 'Document Storage', desc: 'Keep all contracts in one place.' }
        ],
        steps: ['Add contract details', 'Set schedule', 'Monitor compliance']
      }
    }
  },
  amenities: {
    title: 'Amenities',
    icon: Dumbbell,
    description: 'Fair and transparent booking of society facilities.',
    items: {
      'amenities-booking': {
        diagram: diagrams.amenitiesBooking,
        title: 'Amenities Booking',
        previewImage: '/features/amenities/amenities-booking.png',
        description: 'Book the clubhouse, tennis court, or party hall digitally.',
        benefits: [
          { title: 'Slot Management', desc: 'Prevent double bookings.' },
          { title: 'Paid Amenities', desc: 'Integrate payments for premium facilities.' },
          { title: 'Rules Engine', desc: 'Limit bookings per flat per month.' }
        ],
        steps: ['Select facility', 'Choose time slot', 'Pay & confirm']
      }
    }
  },
  administration: {
    title: 'Administration',
    icon: LayoutDashboard,
    description: 'Powerful tools for the managing committee.',
    items: {
      'multi-society-management': {
        diagram: diagrams.multiSocietyManagement,
        title: 'Multi-Society Management',
        previewImage: '/features/administration/multi-society-management.png',
        description: 'Manage multiple phases or entirely different societies from one login.',
        benefits: [
          { title: 'Single Sign-On', desc: 'Toggle between societies instantly.' },
          { title: 'Consolidated Reports', desc: 'View analytics across all properties.' },
          { title: 'Builder Dashboards', desc: 'Perfect for property developers.' }
        ],
        steps: ['Login once', 'Select property', 'Manage seamlessly']
      },
      'role-based-access-control': {
        diagram: diagrams.roleBasedAccessControl,
        title: 'Role-Based Access Control',
        previewImage: '/features/administration/role-based-access-control.png',
        description: 'Granular permissions for committee members, accountants, and guards.',
        benefits: [
          { title: 'Custom Roles', desc: 'Create a specific "Auditor" role.' },
          { title: 'Data Privacy', desc: 'Guards only see what they need to.' },
          { title: 'Activity Logs', desc: 'Track who changed what and when.' }
        ],
        steps: ['Create role', 'Assign permissions', 'Add users']
      },
      // 'approval-workflows': {
      //   diagram: diagrams.approvalWorkflows,
      //   title: 'Approval Workflows',
      //   previewImage: '/features/administration/approval-workflows.png',
      //   description: 'Digitize committee decisions and invoice approvals.',
      //   benefits: [
      //     { title: 'Multi-Step', desc: 'Treasurer -> Secretary -> President approvals.' },
      //     { title: 'Mobile Approvals', desc: 'Approve requests on the go.' },
      //     { title: 'Digital Signatures', desc: 'Maintain compliance.' }
      //   ],
      //   steps: ['Request submitted', 'Notifies approvers', 'Action taken']
      // },
      'analytics-reports': {
        diagram: diagrams.analyticsReports,
        title: 'Analytics & Reports',
        previewImage: '/features/administration/analytics-reports.png',
        description: 'Data-driven insights into society operations.',
        benefits: [
          { title: 'Visitor Trends', desc: 'Peak hours for gate traffic.' },
          { title: 'Helpdesk SLA', desc: 'Average time to resolve complaints.' },
          { title: 'Financial Health', desc: 'Collection efficiency metrics.' }
        ],
        steps: ['Open dashboard', 'Select metric', 'Generate insight']
      },
      'polls-voting': {
        diagram: diagrams.pollsVoting,
        title: 'Polls & Society Voting',
        previewImage: '/features/administration/polls-voting.png',
        description: 'Conduct democratic, transparent elections and opinion polls.',
        benefits: [
          { title: 'Secret Ballot', desc: 'Maintain voting privacy.' },
          { title: 'Weighted Votes', desc: 'Voting power based on sq.ft area.' },
          { title: 'Audit Trail', desc: 'Export certified election results.' }
        ],
        steps: ['Create poll', 'Residents vote securely', 'Publish results']
      }
    }
  }
};
