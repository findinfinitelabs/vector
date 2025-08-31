import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

  const client = await clientPromise;
  const db = client.db();
  const existing = await db.collection('users').findOne({ email });
  if (existing) return res.status(409).json({ error: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  await db.collection('users').insertOne({ name, email, password: hash, points: 0, badges: [], activities: [] });
  return res.status(201).json({ success: true });
}
