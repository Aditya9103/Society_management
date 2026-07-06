import ContactMessage from '../models/ContactMessage.js';
import { sendEmail } from '../config/email.js';
import { contactNotificationTemplate, contactConfirmationTemplate } from '../emails/emailTemplates.js';
import config from '../config/env.js';

export const createContactMessage = async (req, res, next) => {
  try {
    const newMessage = await ContactMessage.create(req.body);

    // Fire & forget emails
    const supportEmail = config.notifications.support;
    
    // Notify internal support team
    sendEmail(
      supportEmail,
      `New Contact Message from ${newMessage.name}`,
      contactNotificationTemplate(newMessage)
    ).catch(err => console.error('Failed to send contact notification:', err));

    // Send confirmation to the sender
    sendEmail(
      newMessage.email,
      'We received your message - Parapet',
      contactConfirmationTemplate(newMessage.name)
    ).catch(err => console.error('Failed to send contact confirmation:', err));

    res.status(201).json({
      success: true,
      data: newMessage
    });
  } catch (error) {
    next(error);
  }
};

export const getContactMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    next(error);
  }
};
