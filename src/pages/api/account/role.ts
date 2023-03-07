
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../../server/db/client';
import { getSession } from 'next-auth/react'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const crypto = require('crypto');
    function generateHex() {
        return crypto.randomBytes(4).toString('hex');
    }

    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ message: "Unauthorized" })
    }
    const email = session?.user?.email as string
    console.log(email)

    const code = await req.body.companyCode

    const company = await prisma.company.findMany({
        where: {
            OR: [
                { admin_code: code },
                { user_code: code }
            ]
        }
    });

    if (!company) {
        throw new Error("Company not found");
    }
    console.log("++========================", company)

    // check code = admin code or user code
    if (company[0].admin_code === code) {
        // update user role to admin
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                company_id: company[0].id,
                role: "ADMIN"
            }
        }) 
    } else if (company[0].user_code === code) {
        // update user role to user
        const user = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                company_id: company[0].id,
                role: "USER"
            }
        })
    }

    if (req.method === "POST") {
        res.status(200).json("success");
    }
}
