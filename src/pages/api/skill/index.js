import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { body } = req;

        if(!body.name) {
            return res.status(400).json({ error: 'Name not set' });
        }

        const skill = await prisma.skill.create({
            data: body
        });

        // Assign Created Skill to All Characters
        const characters = await prisma.character.findMany();

        characters.forEach(async character => {
            await prisma.characterSkills.create({
                data: {
                    character_id: character.id,
                    skill_id: skill.id
                }
            });
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