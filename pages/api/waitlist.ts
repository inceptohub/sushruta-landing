import { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../lib/supabaseServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, userType, specialty, institution, yearsExperience, phone } = req.body;

  // Validate required fields
  if (!email || !name || !userType) {
    return res.status(400).json({ error: 'Email, name, and user type are required' });
  }

  if (!['doctor', 'student'].includes(userType)) {
    return res.status(400).json({ error: 'User type must be either doctor or student' });
  }

  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) {
      return res.status(500).json({ error: 'Database connection failed' });
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email,
          name,
          user_type: userType,
          specialty: specialty || null,
          institution: institution || null,
          years_experience: yearsExperience || null,
          phone: phone || null,
        }
      ])
      .select();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'Email already registered' });
      }
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to save to waitlist' });
    }

    return res.status(201).json({ 
      message: 'Successfully added to waitlist',
      data: data[0]
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
