import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'PUT') {
        const { character_id, attribute_id, value } = req.body;

        if(!character_id || !attribute_id || (value === undefined || value === null )) {
            return res.status(400).json({ error: 'Missing Required Data' });
        }

        const result = await prisma.characterAttributes.update({
            data: {
                value: value.toString()
            },
            where: {
                character_id_attribute_id: {
                    attribute_id,
                    character_id
                }
            }
        });

        return res.json(result);
    }
    else {
        return res.status(404);
    }
}