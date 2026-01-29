const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createResume = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId;

        const resume = await prisma.resume.create({
            data: {
                title,
                content, // JSON object
                userId
            }
        });

        res.status(201).json(resume);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create resume' });
    }
};

const getResumes = async (req, res) => {
    try {
        const userId = req.user.userId;
        const resumes = await prisma.resume.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' }
        });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
};

const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const resume = await prisma.resume.findFirst({
            where: { id: parseInt(id), userId }
        });

        if (!resume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        res.json(resume);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resume' });
    }
};

const updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user.userId;

        const existingResume = await prisma.resume.findFirst({
            where: { id: parseInt(id), userId }
        });

        if (!existingResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        const updatedResume = await prisma.resume.update({
            where: { id: parseInt(id) },
            data: {
                title,
                content
            }
        });

        res.json(updatedResume);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update resume' });
    }
};

const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const existingResume = await prisma.resume.findFirst({
            where: { id: parseInt(id), userId }
        });

        if (!existingResume) {
            return res.status(404).json({ error: 'Resume not found' });
        }

        await prisma.resume.delete({ where: { id: parseInt(id) } });

        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete resume' });
    }
};

module.exports = { createResume, getResumes, getResumeById, updateResume, deleteResume };
