import { prisma } from "../../../server/db/client"
import bcrypt from "bcrypt";

export default async function handler(req: any, res: any) {
    let { method } = req
    switch (method) {
        case "POST":
            try {
                const { firstName, lastName, email, password } = req.body
                console.log("req.body", req.body)

                const userCheck = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })
                if (userCheck) {
                    res.status(400).json({ success: false, error: "User already exists" })
                    return
                } else {
                    console.log("user not exist", firstName, lastName, email, password)

                    const hash = await bcrypt.hash(password, 10);

                    const user = await prisma.user.create({
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            password: hash,
                        }
                    })
                    res.status(201).json(user);
                }

            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, error: error })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;

    }
}