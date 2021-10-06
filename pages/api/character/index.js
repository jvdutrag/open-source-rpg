import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { body } = req;

        if(!body.name) {
            return res.status(400).json({ error: 'Name not set' });
        }

        const character = await prisma.character.create({
            data: {
                ...body,
            },
            include: {
                attributes: true,
                skills: true
            }
        });

        return res.status(200).json(character);
    }
    else if(req.method === 'GET') {
        const characters = await prisma.character.findMany({
            include: {
                attributes: true,
                skills: true
            }
        });

        return res.status(200).json(characters);
    }
    else {
        return res.status(404);
    }
}