import { prisma } from "../../../server/db/client";

function ExcelDateToJSDate(serial: number) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
}

export default async function handler(req: any, res: any) {
  let { method } = req;
  switch (method) {
    case "POST":
      try {
        const sheetData = req.body;
        console.log("sheetData: ", sheetData);

        let userFromDb = await prisma.user.findUniqueOrThrow({
          where: {
            email: sheetData.user.data.user.email,
          },
        });
        //   Number(data.id.split('VAPST-')[1].trim()), will return 15153 which
        //   should be used as the id but we cant here becasuse they are not unique in the data set provided by enzo
        //  id: 'VAPST- 15153'
        // console.log(ExcelDateToJSDate(data[1]["Transaction Date"]))

        const fileEntry = await prisma.entryFile.create({
          data: {
            name: req.body.fileName,
            user_id: userFromDb.id,
          },
        });

        console.log(fileEntry);
        console.log("SHEET DATA: ", sheetData.data);

        const entries = await prisma.entry.createMany({
          data: sheetData.data.map((data: any) => ({
            collaborator: "company_1", //data.collaborator,
            weight: data.weight,
            user_id: userFromDb?.id,
            company_id: 1,
            site: data.site,
            waste: data.waste,
            date: ExcelDateToJSDate(data.transactionDate),
            entryFileId: fileEntry.id,
          })),
        });

        res.status(200).json({ success: true, data: entries });
      } catch (error) {
        console.log("ERROR", error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
