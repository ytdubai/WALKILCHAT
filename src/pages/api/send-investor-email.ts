import type { NextApiRequest, NextApiResponse } from 'next';
import { sendInvestorEmail } from '../../lib/email';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, investorName, companyName } = req.body;

  if (!to || !investorName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await sendInvestorEmail(to, investorName, companyName);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: error.message || 'Failed to send email' });
  }
}