import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const id = Number(req.query.id);
    
        await prisma.character.delete({
            where: {
                id
            }
        });

        return res.status(200).json({ success: true });
    }
    else if(req.method === 'GET') {
        const id = Number(req.query.id);
    
        const character = await prisma.character.findUnique({
            where: {
                id
            },
            include: {
                attributes: {
                    include: {
                        attribute: true
                    }
                },
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });

        return res.status(200).json(character);
    }
    else {
        return res.status(404);
    }
}