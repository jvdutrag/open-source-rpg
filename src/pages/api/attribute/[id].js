import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const id = Number(req.query.id);

        const deleteFromCharacterAttributes = prisma.characterAttributes.deleteMany({
            where: {
                attribute_id: id
            }
        });

        const deleteAttribute = prisma.attribute.delete({
            where: {
                id
            }
        });

        await prisma.$transaction([deleteFromCharacterAttributes, deleteAttribute]);

        return res.status(200).json({ success: true });
    }
    else if(req.method === 'PUT') {
        const { body } = req;

        if(!body.name) {
            return res.status(400).json({ error: 'Name not set' });
        }
        
        const id = Number(req.query.id);
    
        const attribute = await prisma.attribute.update({
            where: {
                id
            },
            data: body
        });

        return res.status(200).json(attribute);
    }
    else {
        return res.status(404);
    }
}