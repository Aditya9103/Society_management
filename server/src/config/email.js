import nodemailer from 'nodemailer';
import config from './env.js';

export const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465, // true for 465, false for other ports (587 uses STARTTLS)
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

console.log(`📧 SMTP Configured: Host=${config.smtp.host} | Port=${config.smtp.port} | Secure=${config.smtp.port === 465}`);

export const sendEmail = async (to, subject, html) => {
  try {
    // Only send if credentials are provided, otherwise just log (useful for dev)
    if (!config.smtp.user || !config.smtp.pass) {
      console.log('--- Email Simulation (Missing SMTP Credentials) ---');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log('---------------------------------------------------');
      return { success: true, simulated: true };
    }

    const info = await transporter.sendMail({
      from: `"${config.smtp.fromName}" <${config.smtp.fromEmail}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent successfully to ${to} [MessageId: ${info.messageId}]`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    // Depending on requirements, we can throw error or handle gracefully
    // throw error; 
    return { success: false, error };
  }
};
