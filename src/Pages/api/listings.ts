// pages/api/listings.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch('https://api.idxhome.com/listings', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer 22eff937-efc9-41a9-aa43-4ac2751a215f',
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}