// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const selectedData = req.body;
    console.log(selectedData);
    selectedData.map(async (m: number) => {
      await prisma.entry.deleteMany({
        where: {
          // entryFileId: m,
        },
      });
      await prisma.entryFile.deleteMany({
        where: {
          id: m,
        },
      });
    });
    res.status(200).json(selectedData);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
}
