import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { body } = req;

        if(!body.name) {
            return res.status(400).json({ error: 'Name not set' });
        }

        const attribute = await prisma.attribute.create({
            data: body
        });

        // Assign Created Attribute to All Characters
        const characters = await prisma.character.findMany();

        characters.forEach(async character => {
            await prisma.characterAttributes.create({
                data: {
                    character_id: character.id,
                    attribute_id: attribute.id
                }
            });
        });

        return res.status(200).json(attribute);
    }
    else if(req.method === 'GET') {
        const attributes = await prisma.attribute.findMany({
            orderBy: [
                {
                    name: 'asc',
                }
            ]
        });

        return res.status(200).json(attributes);
    }
    else {
        return res.status(404);
    }
}