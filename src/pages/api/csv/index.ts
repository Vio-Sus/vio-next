// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import csv from "csvtojson"
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const jsonArray= await csv().fromFile();
    console.log(req.body)


// csv().
  // res.status(200).json({ name: req.body })
}
