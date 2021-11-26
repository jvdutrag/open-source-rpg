import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'PUT') {
        const { body } = req;
        
        const name = req.query.name;
    
        const config = await prisma.config.update({
            where: {
                name
            },
            data: body
        });

        return res.status(200).json(config);
    }
    else {
        return res.status(404);
    }
}