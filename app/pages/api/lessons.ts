import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    // Admin: create or update lesson
    const { title, description, objectives, content, criteria, cohort } = req.body;
    if (!title || !description || !objectives || !content || !criteria) return res.status(400).json({ error: 'Missing fields' });
    await db.collection('lessons').insertOne({ title, description, objectives, content, criteria, cohort, published: false });
    return res.status(201).json({ success: true });
  }

  if (req.method === 'GET') {
    // Get all lessons
    const lessons = await db.collection('lessons').find({ published: true }).toArray();
    return res.status(200).json({ lessons });
  }

  if (req.method === 'PATCH') {
    // Admin: publish lesson
    const { lessonId } = req.body;
    if (!lessonId) return res.status(400).json({ error: 'Missing lessonId' });
    await db.collection('lessons').updateOne({ _id: lessonId }, { $set: { published: true } });
    return res.status(200).json({ success: true });
  }

  return res.status(405).end();
}
