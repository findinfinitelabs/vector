import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    // Log activity completion
    const { email, activityId } = req.body;
    if (!email || !activityId) return res.status(400).json({ error: 'Missing fields' });
    await db.collection('activities').insertOne({ email, activityId, date: new Date() });
    await db.collection('users').updateOne({ email }, { $addToSet: { activities: activityId }, $inc: { points: 10 } });
    return res.status(200).json({ success: true });
  }

  if (req.method === 'GET') {
    // Get all activities
    const activities = await db.collection('lessons').find({}).toArray();
    return res.status(200).json({ activities });
  }

  return res.status(405).end();
}
