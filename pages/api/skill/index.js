import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { body } = req;

        if(!body.name) {
            return res.status(400).json({ error: 'Name not set' });
        }

        const skill = await prisma.skill.create({
            data: body
        });

        return res.status(200).json(skill);
    }
    else if(req.method === 'GET') {
        const skills = await prisma.skill.findMany({
            orderBy: [
                {
                    name: 'asc',
                }
            ]
        });

        return res.status(200).json(skills);
    }
    else {
        return res.status(404);
    }
}