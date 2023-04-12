import { Entry } from "@prisma/client";
import { prisma } from "../../../server/db/client";

export default async function handler(req: any, res: any) {
  let { method } = req;
  switch (method) {
    case "POST":
      const allTableData: Entry[][] = [];
      const selectedData = req.body;
      await Promise.all(
        selectedData.map(async (m: any) => {
          const thisIdData = await prisma.entry.findMany({
            where: {
              entryFileId: m,
            },
          });
          thisIdData?.map((m: any) => {
            allTableData.push(m);
          });
        })
      );
      console.log(allTableData);
      res.status(200).json(allTableData);
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
