export const diagrams = {
  // SECURITY
  visitorManagement: `sequenceDiagram
    participant R as Resident
    participant S as System
    participant V as Visitor
    participant G as Guard App

    R->>S: Create visitor invite
    S->>S: Generate QR code
    S->>V: Send QR via WhatsApp
    S->>G: Pre-approve notification
    V->>G: Arrives at gate, shows QR
    G->>S: Scan QR
    S->>G: Show visitor details + photo
    G->>G: Log entry time
    S->>R: Push notification: "John has arrived"
    G->>V: Grant entry
    Note over V,G: During visit...
    G->>G: Log exit time
    S->>R: Push notification: "John has exited"`,

  qrVehicleGatePass: `flowchart TD
    A[Vehicle Approaches Gate] --> B[Boom Barrier Camera Scans RFID or QR]
    B --> C{Tag Valid and Authorized?}
    C -->|Yes| D[Log Entry or Exit Time]
    D --> E[Boom Barrier Opens]
    C -->|No| F[Flag to Security Guard]
    F --> G{Guard Verification}
    G -->|Authorized Visitor| D
    G -->|Unauthorized| H[Deny Entry]
    D --> I[Sync with Parking Slot DB]
    I --> J{Wrong Parking slot?}
    J -->|Yes| K[Send Alert to Resident]
    J -->|No| L[Process Complete]`,

  preApprovedVisitors: `sequenceDiagram
    participant R as Resident
    participant A as Parapet App
    participant WA as WhatsApp API
    participant V as Guest
    
    R->>A: Select Guest from Contacts
    A->>A: Generate secure deep link & QR
    A->>WA: Trigger WhatsApp message
    WA->>V: Deliver Invite with Location & QR
    V->>A: Clicks link to get driving directions
    Note over V,A: Invite valid only for specified date/time`,

  deliveryStaffEntry: `flowchart TD
    A[Delivery Agent or Staff Arrives] --> B{Entry Type?}
    B -->|Swiggy Zomato Amazon| C[Enter phone or company ID]
    C --> D[API checks active order for society]
    D --> E{Order Verified?}
    E -->|Yes| F[Auto-approve Entry]
    E -->|No| G[Trigger Intercom App approval to Resident]
    B -->|Daily Staff Maid Driver| H[Biometric or Passcode Scan]
    H --> I{Matched?}
    I -->|Yes| J[Mark Attendance Present]
    I -->|No| K[Escalate to Guard]
    J --> L[Push notification to employers]
    F --> M[Log Entry]
    G --> M`,

  emergencySos: `sequenceDiagram
    participant R as Resident
    participant S as System
    participant G as Guard Devices
    participant C as Committee Members
    
    R->>S: Long press SOS button in App
    S->>S: Capture Flat No & Location Ping
    S->>G: 🚨 LOUD SIREN ALARM on Guard Phones
    S->>C: SMS/Push Alert to Committee
    G->>S: Guard acknowledges alert
    Note over S,G: Guard dispatched to Flat
    G->>S: Guard resolves incident on App
    S->>S: Log response time for Audit Trail`,

  digitalGateRegister: `flowchart TD
    A[Physical entry at gate] --> B[Guard inputs via App/Tablet]
    B --> C{Data Type?}
    C -->|Photo| D[Cloud Storage]
    C -->|Text/ID| E[Encrypted Database]
    D --> F[Index by Date/Flat/Name]
    E --> F
    F --> G[Committee Dashboard]
    G --> H[Search Records (1 second)]
    G --> I[Export Compliance Reports]
    G --> J[Analyze Peak Traffic Times]`,

  // RESIDENTS
  residentDirectory: `stateDiagram-v2
    [*] --> IncompleteProfile: Joins Parapet
    IncompleteProfile --> UpdateProfile: Fills details
    UpdateProfile --> SetPrivacy: Chooses what to share (Phone, Blood Group, etc.)
    SetPrivacy --> DirectoryActive: Listed in Society Directory
    DirectoryActive --> Searchable: Neighbors can find by Name/Flat
    Searchable --> InAppCall: Neighbor initiates VoIP call (No phone number revealed)
    InAppCall --> [*]`,

  tenantManagement: `stateDiagram-v2
    [*] --> Registered: Self-register / Admin creates
    Registered --> PendingVerification: Submits documents (ID, Lease)
    PendingVerification --> Approved: Admin approves
    PendingVerification --> Rejected: Admin rejects
    Rejected --> PendingVerification: Resubmits
    Approved --> Active: Completes profile
    Active --> Inactive: Move-out
    Active --> Suspended: Payment default / Policy violation
    Suspended --> Active: Issue resolved
    Inactive --> [*]`,

  vehicleRecords: `flowchart TD
    A[Resident buys new vehicle] --> B[Submits RC & details in App]
    B --> C[Committee reviews documents]
    C --> D{Approved?}
    D -->|Yes| E[Assign Society Parking QRSticker / RFID]
    E --> F[Link to Resident's purchased Parking Slot]
    D -->|No| G[Reject with reason]
    F --> H[Guard App updated in real-time]
    H --> I[If parked in wrong slot -> Instant notification sent]`,

  documentVault: `flowchart LR
    A[Upload Document] --> B[Select Category (Bylaws, Financials, Personal)]
    B --> C[Set Role-based Access]
    C --> D{Access Level}
    D -->|Public| E[All Residents]
    D -->|Restricted| F[Committee Only]
    D -->|Private| G[Flat Owner Only]
    E --> H[Secure Cloud Storage]
    F --> H
    G --> H
    H --> I[Version Control (Track changes)]
    I --> J[Shareable Secure Link generation]`,

  // COMMUNITY
  noticesAnnouncements: `flowchart TD
    A[Admin Drafts Notice] --> B[Attach Rich Media PDF or Images]
    B --> C[Select Target Audience]
    C --> D{Audience?}
    D -->|All| E[Send to entire Society]
    D -->|Specific| F[Select Blocks Floors Owners only]
    E --> G[Publish and Broadcast]
    F --> G
    G --> H[Push Notification and Email sent]
    H --> I[Track Read Receipts in real-time]
    I --> J[Follow-up with unread users]`,

  communityFeedEvents: `sequenceDiagram
    participant A as Admin
    participant S as System
    participant R as Community
    
    A->>S: Create Event or Classified Post
    S->>S: Auto-moderate Profanity check
    S->>R: Notify Community
    R->>S: Residents RSVP Yes No Maybe
    R->>S: Residents comment or ask questions
    S->>A: Real-time RSVP headcount updated
    A->>S: Send reminder 24hr before event
    S->>R: Event Reminder Push`,

  // FINANCE
  maintenanceBilling: `flowchart TD
    A[Billing Date Reached Scheduled Job 1st of month] --> B[Fetch all active units]
    B --> C[For each unit Calculate charges]
    C --> D{Special charges applicable?}
    D -->|Yes| E[Add special charges]
    D -->|No| F[Apply standard charges]
    E --> F
    F --> G[Apply any credits or adjustments]
    G --> H[Generate invoice record]
    H --> I[Set due date = billing date + grace days]
    I --> J[Send invoice via Email WhatsApp Push]
    J --> K[Monitor payment]
    K --> L{Paid before due date?}
    L -->|Yes| M[Mark paid, send receipt]
    L -->|No| N[Due date passes]
    N --> O[Apply late fee]
    O --> P[Send overdue reminder]
    P --> Q{Paid?}
    Q -->|Yes| M
    Q -->|No| R[Day 7 overdue: Second reminder]
    R --> S[Day 15 overdue: Escalate to admin]
    S --> T[Day 30 overdue: Tag as defaulter]`,

  onlinePayments: `sequenceDiagram
    participant R as Resident
    participant P as Parapet App
    participant PG as Payment Gateway
    participant B as Society Bank
    
    R->>P: Clicks 'Pay Maintenance'
    P->>PG: Initialize transaction (UPI/CC/DC)
    PG->>R: Prompt for authorization
    R->>PG: Authorizes payment
    PG->>P: Success Callback
    P->>P: Auto-generate receipt
    P->>P: Zero-out resident ledger balance
    PG->>B: Funds settled (T+1 days)
    B->>P: Webhook: Settlement Complete`,

  autoReceiptsDueTracking: `flowchart TD
    A[Payment Received (Online or Offline)] --> B[System logs transaction]
    B --> C[Match against outstanding invoices]
    C --> D[Generate PDF Receipt automatically]
    D --> E[Email / WhatsApp receipt to Resident]
    E --> F[Update Master Society Ledger]
    F --> G{Any balance remaining?}
    G -->|Yes| H[Carry forward to next billing cycle]
    G -->|No| I[Mark unit as fully paid]`,

  expenseTracking: `flowchart TD
    A[Upload Vendor Bill / Petty Cash receipt] --> B[Digitize amount and category]
    B --> C{Amount > Threshold?}
    C -->|Yes| D[Trigger Multi-level Approval]
    C -->|No| E[Trigger Single Approval]
    D --> F[Treasurer Approves]
    F --> G[Secretary Approves]
    E --> H[Approved]
    G --> H
    H --> I[Process Payout]
    I --> J[Update Expense Ledger vs Budget]`,

  financialReportsAudit: `flowchart TD
    A[Admin requests Financial Report] --> B[Select Date Range and Parameters]
    B --> C[System aggregates millions of ledger entries]
    C --> D{Report Type?}
    D -->|PandL| E[Generate Profit and Loss Statement]
    D -->|Balance Sheet| F[Generate Balance Sheet]
    D -->|Tax| G[Filter GST or TDS data]
    E --> H[Format data for Tally export]
    F --> H
    G --> H
    H --> I[Download PDF CSV XML]
    I --> J[Share directly with Auditor via secure link]`,

  // MAINTENANCE
  complaintHelpdesk: `stateDiagram-v2
    [*] --> DRAFT: Resident starts writing
    DRAFT --> OPEN: Resident submits
    OPEN --> ASSIGNED: Facility Manager assigns to handler/vendor
    ASSIGNED --> IN_PROGRESS: Handler accepts and starts work
    IN_PROGRESS --> PENDING_RESIDENT: Handler needs resident input/access
    PENDING_RESIDENT --> IN_PROGRESS: Resident responds
    IN_PROGRESS --> RESOLVED: Handler marks resolved
    RESOLVED --> CLOSED: Resident confirms OR auto-close after 48h
    RESOLVED --> REOPENED: Resident rejects resolution
    REOPENED --> ASSIGNED: Re-assigned for rework
    CLOSED --> [*]

    OPEN --> ESCALATED: SLA breach (24h without assignment)
    ASSIGNED --> ESCALATED: SLA breach (7 days without resolution)
    ESCALATED --> ASSIGNED: Admin intervenes`,

  vendorSlaManagement: `flowchart TD
    A[Add AMC Contract Lifts Generators] --> B[Define SLA Metrics and Service Dates]
    B --> C[System schedules calendar events]
    C --> D[1 Week Before Auto-email reminder to Vendor]
    D --> E[Service Date arrives]
    E --> F{Did vendor attend?}
    F -->|Yes| G[Log service report and photos]
    G --> H[Update SLA compliance score up]
    F -->|No| I[Trigger SLA Breach Alert to Committee]
    I --> J[Calculate penalty deduction for next payout]
    J --> K[Update SLA compliance score down]`,

  // AMENITIES
  amenitiesBooking: `flowchart TD
    A[Resident selects facility] --> B[View availability calendar]
    B --> C[Select date + time slot]
    C --> D{Slot available?}
    D -->|No| E[Show next available]
    D -->|Yes| F{Auto-approval?}
    F -->|Yes| G[Create booking - PENDING_PAYMENT]
    F -->|No| H[Create booking - PENDING_APPROVAL]
    H --> I[Admin reviews]
    I --> J{Approved?}
    J -->|No| K[Notify resident with reason]
    J -->|Yes| G
    G --> L{Is paid facility?}
    L -->|No| M[Booking CONFIRMED]
    L -->|Yes| N[Payment initiated]
    N --> O{Payment successful?}
    O -->|No| P[Booking cancelled, slot released]
    O -->|Yes| M
    M --> Q[Send confirmation + calendar invite]
    Q --> R[Day before: reminder]
    R --> S[Booking time arrives]
    S --> T[Post-booking: Resident rates facility]`,

  // ADMINISTRATION
  roleBasedAccessControl: `graph TD
    SA[SUPER_ADMIN Platform-wide]
    SADM[SOCIETY_ADMIN Full society control]
    ACC[SOCIETY_ACCOUNTANT Finance only]
    FM[FACILITY_MANAGER Maintenance and amenities]
    CM[COMMITTEE_MEMBER Governance]
    HE[HELPDESK_EXECUTIVE Complaint handling]
    SG[SECURITY_GUARD Gate operations]
    RES[RESIDENT Self-service]

    SA --> SADM
    SADM --> ACC
    SADM --> FM
    SADM --> CM
    SADM --> HE
    SADM --> SG
    SADM --> RES`,

  multiSocietyManagement: `erDiagram
    TENANTS ||--o{ SOCIETIES : "has"
    SOCIETIES ||--o{ TOWERS : "has"
    TOWERS ||--o{ FLOORS : "has"
    FLOORS ||--o{ UNITS : "has"
    UNITS ||--o{ RESIDENTS : "occupied by"
    RESIDENTS ||--o{ FAMILY_MEMBERS : "has"
    RESIDENTS ||--o{ VISITORS : "invites"
    RESIDENTS ||--o{ VEHICLES : "owns"
    RESIDENTS ||--o{ COMPLAINTS : "raises"
    RESIDENTS ||--o{ BOOKINGS : "makes"
    RESIDENTS ||--o{ INVOICES : "billed"
    SOCIETIES ||--o{ USERS : "has staff"
    USERS ||--o{ ROLES : "assigned"
    COMPLAINTS ||--o{ COMPLAINT_COMMENTS : "has"
    AMENITIES ||--o{ BOOKINGS : "booked as"
    INVOICES ||--o{ PAYMENTS : "paid by"
    VISITORS ||--o{ VISITOR_LOGS : "logs"`,

  approvalWorkflows: `sequenceDiagram
    participant M as Manager (Initiator)
    participant T as Treasurer (Level 1)
    participant S as Secretary (Level 2)
    participant P as President (Level 3)
    
    M->>T: Submit 5 Lakh Invoice for approval
    Note over T: Receives Push Notification
    T->>S: Approves. Forwards to Level 2
    Note over S: Receives Push Notification
    S->>P: Approves. Forwards to Level 3
    Note over P: Receives Push Notification
    P->>M: Final Approval Granted
    M->>M: System auto-queues bank payout`,

  analyticsReports: `flowchart TD
    A[Admin opens Analytics Dashboard] --> B[Load real-time data warehouse]
    B --> C{Select Module}
    C -->|Security| D[Render gate traffic heatmaps]
    C -->|Finance| E[Render collection efficiency graphs]
    C -->|Maintenance| F[Render SLA breach pie charts]
    D --> G[Export Visuals for AGM Meeting]
    E --> G
    F --> G`,

  pollsVoting: `flowchart TD
    A[Committee creates a Poll/Election] --> B[Define Question & Options]
    B --> C[Set voting window and eligibility]
    C --> D{Weighted Voting?}
    D -->|Yes| E[Vote power = Flat Sq.Ft Area]
    D -->|No| F[Vote power = 1 per Flat]
    E --> G[Publish Poll via App Notification]
    F --> G
    G --> H[Residents cast Secret Ballots]
    H --> I[Voting Window Closes]
    I --> J[Tally results instantly]
    J --> K[Generate legally compliant Audit Report]
    K --> L[Announce results to Society]`
};
