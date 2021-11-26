import { prisma } from '../../../database';

function parseRelationArray(array, entityName) {
    return array.map(item => ({
        [entityName]: {
            connect: {
                id: item.id
            }
        }
    }));
}

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { body } = req;

        if(!body.name) {
            return res.status(400).json({ error: 'Name not set' });
        }

        const attributes = await prisma.attribute.findMany();
        const skills = await prisma.skill.findMany();

        const character = await prisma.character.create({
            data: {
                ...body,

                // Create Character With Many to Many Relations Set
                attributes: {
                    create: parseRelationArray(attributes, 'attribute')
                },
                skills: {
                    create: parseRelationArray(skills, 'skill')
                }
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

        return res.status(200).json(characters);
    }
    else {
        return res.status(404);
    }
}