import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { aiService } from '../../services/api';

const Skills = () => {
    const { resumeData, addSectionItem, removeSectionItem, updateSectionItem, updateSection } = useResume();
    const { skills, experience } = resumeData;
    const [isSuggesting, setIsSuggesting] = useState(false);

    const handleAdd = () => {
        addSectionItem('skills');
    };

    const handleRemove = (id) => {
        removeSectionItem('skills', id);
    };

    const handleChange = (id, field, value) => {
        updateSectionItem('skills', id, field, value);
    };

    const handleSuggest = async () => {
        const currentRole = experience[0]?.title || 'Professional';
        setIsSuggesting(true);
        try {
            const suggestedSkills = await aiService.suggestSkills(currentRole);
            const newSkills = [...skills];
            suggestedSkills.forEach(skillName => {
                if (!newSkills.some(s => s.name.toLowerCase() === skillName.toLowerCase())) {
                    newSkills.push({ id: Date.now() + Math.random(), name: skillName, level: '' });
                }
            });
            updateSection('skills', newSkills);
        } catch (error) {
            console.error(error);
            alert('Failed to suggest skills');
        } finally {
            setIsSuggesting(false);
        }
    };

    return (
        <section className="editor-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3>Skills</h3>
                <button
                    type="button"
                    onClick={handleSuggest}
                    disabled={isSuggesting}
                    style={{
                        fontSize: '0.85em',
                        padding: '5px 10px',
                        backgroundColor: isSuggesting ? '#ccc' : '#ef4444', // Red/Rose
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: isSuggesting ? 'wait' : 'pointer'
                    }}
                >
                    {isSuggesting ? 'Thinking...' : '💡 Suggest Skills'}
                </button>
            </div>

            <div className="skills-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {skills.map(item => (
                    <div key={item.id} className="skill-input-group" style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleChange(item.id, 'name', e.target.value)}
                            placeholder="Skill"
                            style={{ width: '150px' }}
                        />
                        <button type="button" onClick={() => handleRemove(item.id)} className="remove-btn">&times;</button>
                    </div>
                ))}
                <button type="button" onClick={handleAdd} className="add-btn" style={{ height: '38px', padding: '0 15px' }}>+</button>
            </div>
        </section>
    );
};

export default Skills;
