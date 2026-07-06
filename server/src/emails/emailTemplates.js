export const leadNotificationTemplate = (lead) => `
  <h2>New Demo Request</h2>
  <p>A new demo request has been submitted on the website.</p>
  <ul>
    <li><strong>Name:</strong> ${lead.name}</li>
    <li><strong>Work Email:</strong> ${lead.workEmail}</li>
    <li><strong>Phone:</strong> ${lead.phone || 'N/A'}</li>
    <li><strong>Society Name:</strong> ${lead.societyName}</li>
    <li><strong>Units:</strong> ${lead.unitCount || 'N/A'}</li>
    <li><strong>Preferred Date:</strong> ${lead.preferredDate ? new Date(lead.preferredDate).toLocaleDateString() : 'N/A'}</li>
    <li><strong>Source:</strong> ${lead.source}</li>
  </ul>
`;

export const leadConfirmationTemplate = (name) => `
  <h2>Thank you for your interest in Parapet!</h2>
  <p>Hi ${name},</p>
  <p>We have received your demo request. One of our product specialists will review your details and reach out within 1 business day to schedule your personalized product tour.</p>
  <p>We look forward to showing you how Parapet can transform your society operations.</p>
  <br/>
  <p>Best regards,</p>
  <p><strong>The Parapet Team</strong></p>
`;

export const contactNotificationTemplate = (msg) => `
  <h2>New Contact Message</h2>
  <p>A new contact form has been submitted.</p>
  <ul>
    <li><strong>Name:</strong> ${msg.name}</li>
    <li><strong>Email:</strong> ${msg.email}</li>
    <li><strong>Phone:</strong> ${msg.phone || 'N/A'}</li>
    <li><strong>Society:</strong> ${msg.societyName || 'N/A'}</li>
  </ul>
  <h3>Message:</h3>
  <p>${msg.message.replace(/\n/g, '<br/>')}</p>
`;

export const contactConfirmationTemplate = (name) => `
  <h2>Message Received</h2>
  <p>Hi ${name},</p>
  <p>Thanks for getting in touch. We have received your message and our support team will get back to you shortly.</p>
  <br/>
  <p>Best regards,</p>
  <p><strong>The Parapet Team</strong></p>
`;
