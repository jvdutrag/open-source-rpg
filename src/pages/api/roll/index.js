import { prisma } from '../../../database';

import { generateRandomNumber } from '../../../utils';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { body } = req;

        if(!body.character_id || !body.max_number) {
            return res.status(400).json({ error: 'Data not Set' });
        }

        const character = await prisma.character.findUnique({
            where: {
                id: Number(body.character_id)
            }
        });

        if(!character) {
            return res.status(400).json({ error: 'Character not found' });
        }

        // If times not set, times is one (will roll only once)
        body.times = body.times ? Number(body.times) : 1;

        const rolls = [];

        for(let i = 0; i < body.times; i++) {
            const number = generateRandomNumber(body.max_number);

            const rollObject = {
                max_number: body.max_number,
                rolled_number: number,
                character_id: Number(body.character_id)
            }

            rolls.push(rollObject);
        }

        await prisma.roll.createMany({
            data: rolls
        });

        return res.status(200).json(rolls);
    }
    else {
        return res.status(404);
    }
}