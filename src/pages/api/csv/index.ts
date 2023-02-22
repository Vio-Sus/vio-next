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
    const {fileName, sheetData} = req.body
    console.log(fileName)
    const jsonFakeData = await prisma.testingData.create({
      data: {
        name: fileName,
        jsonArray: sheetData
      }
    })
    console.log(jsonFakeData.jsonArray)
    res.status(200).json({ name: req.body })
}
