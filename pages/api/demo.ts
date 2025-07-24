import { NextApiRequest, NextApiResponse } from 'next';
import { DemoResponse } from '@shared/api';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DemoResponse>
) {
  res.status(200).json({ message: 'Hello from Next.js API' });
}
