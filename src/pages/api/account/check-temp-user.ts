import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { prisma } from "../../../../server/db/client"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ message: "Unauthorized" })
    } else {
        const email = session?.user?.email as string
        const user = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                company_id: true,
            }
    
        })
      
        if (req.method === "GET") {
             res.status(200).json( user)
        }
    }
}

