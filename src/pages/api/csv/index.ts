// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from "../../../../server/db/client"


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    console.log(req.body)
    const jsonFakeData = await prisma.testingData.create({
      data: {
        jsonArray: req.body
      }
    })
    console.log(jsonFakeData.jsonArray)
    res.status(200).json({ name: req.body })
}
