import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { aiService } from '../../services/api';

const PersonalDetails = () => {
    const { resumeData, updatePersonalInfo } = useResume();
    const { personalInfo, experience } = resumeData;
    const [isGenerating, setIsGenerating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        updatePersonalInfo(name, value);
    };

    const handleGenerateSummary = async () => {
        if (!experience || experience.length === 0) {
            alert('Please add some experience first so the AI can write a better summary.');
        }

        const currentRole = experience.find(e => e.current)?.title || experience[0]?.title || 'Professional';

        setIsGenerating(true);
        try {
            const summary = await aiService.generateSummary(currentRole, experience);
            updatePersonalInfo('summary', summary);
        } catch (error) {
            console.error(error);
            alert('Failed to generate summary');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <section className="editor-section">
            <h3>Personal Details</h3>
            <div className="form-grid">
                <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="fullName" value={personalInfo.fullName} onChange={handleChange} placeholder="e.g. John Doe" />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={personalInfo.email} onChange={handleChange} placeholder="e.g. john@example.com" />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" name="phone" value={personalInfo.phone} onChange={handleChange} placeholder="e.g. +1 234 567 8900" />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value={personalInfo.location} onChange={handleChange} placeholder="e.g. New York, NY" />
                </div>
                <div className="form-group">
                    <label>LinkedIn</label>
                    <input type="text" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} placeholder="LinkedIn URL" />
                </div>
                <div className="form-group">
                    <label>GitHub/Portfolio</label>
                    <input type="text" name="portfolio" value={personalInfo.portfolio} onChange={handleChange} placeholder="URL" />
                </div>
                <div className="form-group full-width">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                        <label>Professional Summary</label>
                        <button
                            type="button"
                            onClick={handleGenerateSummary}
                            disabled={isGenerating}
                            style={{
                                fontSize: '0.8em',
                                padding: '4px 8px',
                                backgroundColor: isGenerating ? '#ccc' : '#8b5cf6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: isGenerating ? 'wait' : 'pointer'
                            }}
                        >
                            {isGenerating ? 'Writing...' : '✨ Auto-Write with AI'}
                        </button>
                    </div>
                    <textarea
                        name="summary"
                        value={personalInfo.summary}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Brief overview of your professional background..."
                    ></textarea>
                </div>
            </div>
        </section>
    );
};

export default PersonalDetails;
