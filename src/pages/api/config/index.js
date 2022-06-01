import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const { body } = req;

        if(!body.name || !body.value) {
            return res.status(400).json({ error: 'Values Not Set' });
        }

        const config = await prisma.config.create({
            data: {
                name: body.name,
                value: body.value
            }
        });

        return res.status(200).json(config);
    }
    else {
        return res.status(404);
    }
}