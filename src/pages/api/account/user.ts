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
    }
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

    const company = await prisma.company.findUnique({
        where: {
            id: user?.company_id as number
        },
        select: {
            id: true,
            company: true,
            address_line_1: true,
            address_line_2: true,
            city: {
                select: {
                    city: true,
                    province: {
                        select: {
                            province: true
                        }
                    }
                }
            },
            zip_code: true,
            phone: true,
            email: true,
            company_type: true,
            admin_code: true,
            user_code: true,
            users: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            }

        }
    })
    if (req.method === "GET") {
        res.status(200).json({ user: user, company: company })
    }
}

