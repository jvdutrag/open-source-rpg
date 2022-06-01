import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const id = Number(req.query.id);

        const deleteRolls = prisma.roll.deleteMany({
            where: { 
                character_id: id
            }
        })

        const deleteAttributes = prisma.characterAttributes.deleteMany({
            where: {
                character_id: id
            }
        });

        const deleteSkills = prisma.characterSkills.deleteMany({
            where: {
                character_id: id
            }
        });

        const deleteCharacter = prisma.character.delete({
            where: {
                id
            }
        });

        await prisma.$transaction([deleteRolls, deleteAttributes, deleteSkills, deleteCharacter]);

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
    else if(req.method === 'PUT') {
        const { body } = req;
        
        const id = Number(req.query.id);
    
        const character = await prisma.character.update({
            where: {
                id
            },
            data: body
        });

        return res.status(200).json(character);
    }
    else {
        return res.status(404);
    }
}