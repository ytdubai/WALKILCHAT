import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';

// Encrypt message content
const encryptMessage = (content: string): string => {
  return createHash('sha256').update(content).digest('hex');
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const supabase = createClient(supabaseUrl, supabaseKey);

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.replace('Bearer ', '');
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  switch (req.method) {
    case 'GET':
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
        .order('created_at', { ascending: false });

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(messages);

    case 'POST':
      const { receiver_id, content } = req.body;

      if (!receiver_id || !content) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const { data: newMessage, error: createError } = await supabase
        .from('messages')
        .insert({
          sender_id: user.id,
          receiver_id,
          content,
          encrypted_content: encryptMessage(content),
        })
        .select()
        .single();

      if (createError) {
        return res.status(500).json({ error: createError.message });
      }

      return res.status(201).json(newMessage);

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}