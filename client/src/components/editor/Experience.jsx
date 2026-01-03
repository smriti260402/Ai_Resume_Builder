import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { aiService } from '../../services/api';

const Experience = () => {
    const { resumeData, addSectionItem, removeSectionItem, updateSectionItem } = useResume();
    const { experience } = resumeData;
    const [loadingIds, setLoadingIds] = useState({});

    const handleAdd = () => {
        addSectionItem('experience');
    };

    const handleRemove = (id) => {
        removeSectionItem('experience', id);
    };

    const handleChange = (id, field, value) => {
        updateSectionItem('experience', id, field, value);
    };

    const handleImprove = async (id, text) => {
        if (!text || text.length < 10) return;
        setLoadingIds(prev => ({ ...prev, [id]: true }));
        try {
            const improved = await aiService.improveText(text, 'experience');
            handleChange(id, 'description', improved);
        } catch (error) {
            console.error(error);
            alert('Failed to improve text');
        } finally {
            setLoadingIds(prev => ({ ...prev, [id]: false }));
        }
    };

    return (
        <section className="editor-section">
            <h3>Work Experience</h3>
            {experience.map(item => (
                <div key={item.id} className="section-item">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" value={item.title} onChange={(e) => handleChange(item.id, 'title', e.target.value)} placeholder="e.g. Software Engineer" />
                        </div>
                        <div className="form-group">
                            <label>Company</label>
                            <input type="text" value={item.company} onChange={(e) => handleChange(item.id, 'company', e.target.value)} placeholder="e.g. Tech Corp" />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" value={item.location} onChange={(e) => handleChange(item.id, 'location', e.target.value)} placeholder="e.g. Remote" />
                        </div>
                        <div className="form-group">
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div>
                                    <label>Start Date</label>
                                    <input type="text" value={item.startDate} onChange={(e) => handleChange(item.id, 'startDate', e.target.value)} placeholder="MM/YYYY" />
                                </div>
                                <div>
                                    <label>End Date</label>
                                    <input type="text" value={item.endDate} onChange={(e) => handleChange(item.id, 'endDate', e.target.value)} placeholder="MM/YYYY" disabled={item.current} />
                                </div>
                            </div>
                            <div style={{ marginTop: '5px' }}>
                                <input type="checkbox" checked={item.current} onChange={(e) => handleChange(item.id, 'current', e.target.checked)} /> Current
                            </div>
                        </div>
                        <div className="form-group full-width">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                                <label>Description</label>
                                <button
                                    type="button"
                                    onClick={() => handleImprove(item.id, item.description)}
                                    disabled={loadingIds[item.id] || !item.description}
                                    style={{
                                        fontSize: '0.8em',
                                        padding: '3px 8px',
                                        backgroundColor: '#10b981', // Emerald
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {loadingIds[item.id] ? 'Improving...' : '✨ Improve'}
                                </button>
                            </div>
                            <textarea value={item.description} onChange={(e) => handleChange(item.id, 'description', e.target.value)} rows="3" placeholder="Bullet points..."></textarea>
                        </div>
                    </div>
                    <button type="button" onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="add-btn">Add Experience</button>
        </section>
    );
};

export default Experience;
