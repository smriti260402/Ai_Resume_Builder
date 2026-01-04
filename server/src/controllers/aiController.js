const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Extensive list of models to try (Free/Fast > Stable > Latest)
const MODELS = [
    "gemini-flash-latest",
    "gemini-pro-latest"
];




const generateWithFallback = async (prompt) => {
    let lastError = null;
    for (const modelName of MODELS) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            lastError = error;
        }
    }
    throw new Error(`All AI models failed. Last error: ${lastError?.message || 'Unknown'}`);
};

const generateSummary = async (req, res) => {
    try {
        const { jobTitle, experience } = req.body;

        let prompt = `Write a professional resume summary for a ${jobTitle}.`;
        if (experience && experience.length > 0) {
            const expText = experience.map(e => `${e.title} at ${e.company}`).join(', ');
            prompt += ` Based on this experience: ${expText}.`;
        }
        prompt += ` Keep it concise (2-3 sentences) and impactful. Do not include any introductory text like 'Here is a summary'.`;

        const text = await generateWithFallback(prompt);
        res.json({ summary: text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate summary', details: error.message });
    }
};

const improveText = async (req, res) => {
    try {
        const { text, type } = req.body;

        const prompt = `Rewrite the following ${type || 'text'} for a resume to be more professional, action-oriented, and impactful using strong verbs. Keep the same meaning but make it sound better. Text: "${text}". Output only the improved text without quotes.`;

        const improvedText = await generateWithFallback(prompt);
        res.json({ improvedText });
    } catch (error) {
        res.status(500).json({ error: 'Failed to improve text', details: error.message });
    }
};

const suggestSkills = async (req, res) => {
    try {
        const { jobTitle } = req.body;

        const prompt = `List 10 relevant hard and soft skills for a ${jobTitle} resume. Return them as a comma-separated list only.`;

        const text = await generateWithFallback(prompt);
        const skills = text.split(',').map(s => s.trim()).filter(s => s.length > 0);
        res.json({ skills });
    } catch (error) {
        res.status(500).json({ error: 'Failed to suggest skills', details: error.message });
    }
};

module.exports = { generateSummary, improveText, suggestSkills };
