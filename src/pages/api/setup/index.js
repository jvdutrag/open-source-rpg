import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const configs = [
            {
                name: 'DICE_ON_SCREEN_TIMEOUT_IN_MS',
                value: '5000'
            },
            {
                name: 'TIME_BETWEEN_DICES_IN_MS',
                value: '2000'
            }
        ]
        
        await prisma.config.createMany({
            data: configs
        });

        return res.status(200).json({ success: true });
    }
    else {
        return res.status(404);
    }
}