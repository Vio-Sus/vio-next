import {prisma} from "../../../server/db/client"
import bcrypt from "bcrypt";

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
//   }
  
export default async function handler(req: any, res: any) {
    let {method} = req
        switch (method) {
            case "POST":
                try {
                    console.log("req.body", req.body)
                    const sheetData = req.body
                  // create Many Entries
                    // const entries = await prisma.entry.createMany({

                 
                    
                } catch (error) {
                    console.log(error)
                    res.status(400).json({success: false, error: error})
                }
                break;
            default:
                res.status(400).json({success: false})
                break;

        }    
}