import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'PUT') {
        const { character_id, skill_id, value } = req.body;

        if(!character_id || !skill_id || (value === undefined || value === null )) {
            return res.status(400).json({ error: 'Missing Required Data' });
        }

        const result = await prisma.characterSkills.update({
            data: {
                value: value.toString()
            },
            where: {
                character_id_skill_id: {
                    skill_id,
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