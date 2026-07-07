import Lead from '../models/Lead.js';
import { sendEmail } from '../config/email.js';
import { leadNotificationTemplate, leadConfirmationTemplate } from '../emails/emailTemplates.js';
import config from '../config/env.js';

export const createLead = async (req, res, next) => {
  try {
    const newLead = await Lead.create(req.body);

    // Fire & forget email notifications (do not block the response)
    const salesEmail = config.notifications.sales;

    // Notify internal sales team
    sendEmail(
      salesEmail,
      `New Demo Request from ${newLead.societyName}`,
      leadNotificationTemplate(newLead)
    ).catch(err => console.error('Failed to send sales notification:', err));

    // Send confirmation to the prospect
    sendEmail(
      newLead.workEmail,
      'Your Demo Request - Parapet',
      leadConfirmationTemplate(newLead.name)
    ).catch(err => console.error('Failed to send lead confirmation:', err));

    res.status(201).json({
      success: true,
      data: newLead
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const { status, source } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (source) filter.source = source;

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    next(error);
  }
};

export const updateLeadStatus = async (req, res, next) => {
  try {
    console.log('Hitting updateLeadStatus:', req.params.id, req.body);
    const { status } = req.body;
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};
