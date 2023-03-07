
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

    if (req.method === "POST") {
        const companyType = req.body.companyType
        const companyAddress = req.body.companyAddress
        const company = await prisma.company.create({
            data: {
                company: companyType.companyName,
                admin_code: generateHex(),
                user_code: generateHex(),
                address_line_1: companyAddress.address_line_1,
                address_line_2: companyAddress.address_line_2,
                phone: companyType.phone,
                email: companyType.email,
                city: {
                    connectOrCreate: {
                        where: { city: companyAddress.city },
                        create: {
                            city: companyAddress.city,
                            province: {
                                connectOrCreate: {
                                    where: { province: companyAddress.province },
                                    create: { province: companyAddress.province }
                                }
                            }
                        }
                    }
                },
                zip_code: companyAddress.zip,
                company_type: companyType.companyType,           
            }
        })

        const updateUser = await prisma.user.update({
            where: { email: email },
            data: {
                company: {
                    connect: {
                        id: company.id
                    }
                },
                role: "ROOT"
            }
        })

    
        res.status(200).json("success");
    }
}
