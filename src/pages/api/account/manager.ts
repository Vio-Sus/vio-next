import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../server/db/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {

    const siteData = req.body.site
    const companyData = req.body.company

    const { siteName, siteAddress_line_1, siteAddress_line_2, siteCity, siteZip, province, sitePhone, siteEmail } = siteData;
    const { companyType, companyName } = companyData;

    const userId = await prisma.user.findUnique({
      where: {
        email: req.body.email
      },
      select: {
        id: true
      }
    });

    await prisma.user_Role.create({
      data: {
        user: {
          connect: {
            id: userId?.id
          }
        },
        role: {
          connect: {
            role: 'manager'
          }
        }
      }
    });


    const siteCreate = await prisma.site.create({
      data: {
        site_name: siteName,
        address_line_1: siteAddress_line_1,
        address_line_2: siteAddress_line_2,
        city: {
          connectOrCreate: {
            where: { city: siteCity },
            create: {
              city: siteCity,
              province: {
                connectOrCreate: {
                  where: { province: province },
                  create: {
                    province: province
                  }
                }
              }
            }
          }
        },
        company: {
          connectOrCreate: {
            where: { company: companyName },
            create: {
              company: companyName,
              Company_type: {
                connect: {
                  companyType: companyType
                }
              }
            }
          }
        },
        zip_code: siteZip
      }
    });

    // send back suscess

    res.status(200).json("success");

    // res.status(200).json(siteCreate);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
