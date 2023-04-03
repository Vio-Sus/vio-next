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
        // console.log('sheetData: ', sheetData.data)

        let userFromDb = await prisma.user.findUnique({
          where: {
            email: sheetData.user.data.user.email,
          },
        });
        //   Number(data.id.split('VAPST-')[1].trim()), will return 15153 which
        //   should be used as the id but we cant here becasuse they are not unique in the data set provided by enzo
        //  id: 'VAPST- 15153'
        // console.log(ExcelDateToJSDate(data[1]["Transaction Date"]))

        const entries = await prisma.entry.createMany({
          data: sheetData.data.map((data: any) => ({
            collaborator: "company_1", //data.collaborator,
            weight: data.weight,
            user_id: userFromDb?.id,
            company_id: 1,
            site: data.site,
            waste: data.waste,
            date: ExcelDateToJSDate(data.transactionDate),
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

// model Waste {
//     id         Int       @id @default(autoincrement())
//     waste      String
//     waste_type WasteType
//     entries    Entry[]
//   }

// get user from session , just need user id
//   model Entry {
//     id                       Int                   @id @default(autoincrement())
//     collaborator             String
//     created_at               DateTime              @default(now())
//     updated_at               DateTime              @updatedAt
//     date                     string add this line
//     weight                   Float
//     waste                    Waste                connect or create
//     waste_id                 Int
//     user                     User                  @relation(fields: [user_id], references: [id])
//     user_id                  String
//     site                     Site                  connect or create
//     site_id                  Int
//   }

// model Site {
//     id      Int     @id @default(autoincrement())
//     site    String
//     entries Entry[]
//   }`

// export default async function handler(req: any, res: any) {
//     let {method} = req
//         switch (method) {
//             case "POST":
//                 try {
//                     const sheetData = req.body
//                   // create Many Entries
//                     console.log("sheetData", sheetData)

//                     const entries = await prisma.entry.createMany({
//                         data: sheetData,
//                     })

//                     // res.status(200).json({success: true, data: entries})

//                 } catch (error) {
//                     console.log(error)
//                     res.status(400).json({success: false, error: error})
//                 }
//                 break;
//             default:
//                 res.status(400).json({success: false})
//                 break;

//         }
// }

// waste: { connect: { id: data.waste_id } },
// const entry = await prisma.entry.create({
//     data: {
//         collaborator: sheetData.collaborator,
//         weight: sheetData.weight,
//         waste: { connect: { id: sheetData.waste_id } },
//         waste_id: sheetData.waste_id,
//         user_id: "clfnpvkmj0000zij63kq73996",
//         // user: { connect: { id: data.user_id } },
//         // site: { connect: { id: data.site_id } },
//         // company: { connect: { id: data.company_id } },
//     }
// })
