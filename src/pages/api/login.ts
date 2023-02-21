import {prisma} from "../../../server/db/client"
import bcrypt from "bcrypt";
import axios from "axios"

export default async function handler(req: any, res: any) {
 let {method} = req
    switch (method) {
        case "POST":
            try {
                const {email, password} = req.body
                console.log("req.body", req.body)

                const userCheck = await prisma.user.findUnique({
                    where: {
                        email: email
                    }
                })

                let passwordCheck;
                if (userCheck && userCheck.password) {
                    passwordCheck  = await bcrypt.compare(password, userCheck.password)
                }
                console.log("Valid Password: ", passwordCheck)

                console.log("userCheck", userCheck)
    
                if (passwordCheck) {
                    res.status(200).json({ userCheck })
                    return
                } else {
                    res.status(400).json({success: false, error: "Invalid Password"})
                    return
                }


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