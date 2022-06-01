import { prisma } from '../../../database';

export default async function handler(req, res) {
    if(req.method === 'DELETE') {
        const id = Number(req.query.id);

        const deleteFromCharacterSkills = prisma.characterSkills.deleteMany({
            where: {
                skill_id: id
            }
        });

        const deleteSkill = prisma.skill.delete({
            where: {
                id
            }
        });

        await prisma.$transaction([deleteFromCharacterSkills, deleteSkill]);

        return res.status(200).json({ success: true });
    }
    else if(req.method === 'PUT') {
        const { body } = req;

        if(!body.name) {
            return res.status(400).json({ error: 'Name not set' });
        }
        
        const id = Number(req.query.id);
    
        const skill = await prisma.skill.update({
            where: {
                id
            },
            data: body
        });

        return res.status(200).json(skill);
    }
    else {
        return res.status(404);
    }
}