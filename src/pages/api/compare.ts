import { prisma } from "../../../server/db/client"


export default async function handler(req: any, res: any) {
    let { method } = req
    let obj;
    switch (method) {
        case "POST":
            try {

                const {yearOne, yearTwo, material} = req.body
                console.log("req.body", req.body)
                obj = req.body
                res.status(201).json({yearOne, yearTwo, material});

             

            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, error: error })
            }

            break;

            case "GET":
                try {
                    console.log("req.body", req.body)
                    console.log("obj", obj)
                    res.status(201).json(obj);

                }
                catch (error) {
                    console.log(error)
                    res.status(400).json({ success: false, error: error })
                }

        default:
            res.status(400).json({ success: false })
            break;

    }
}