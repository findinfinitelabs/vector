import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

  const client = await clientPromise;
  const db = client.db();
  const user = await db.collection('users').findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

  // Log login event
  await db.collection('logins').insertOne({ email, date: new Date() });

  // For now, just return user info (no JWT/session yet)
  return res.status(200).json({ success: true, user: { name: user.name, email: user.email, points: user.points, badges: user.badges, activities: user.activities } });
}
