import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { aiService } from '../../services/api';

const Projects = () => {
    const { resumeData, addSectionItem, removeSectionItem, updateSectionItem } = useResume();
    const { projects } = resumeData;
    const [loadingIds, setLoadingIds] = useState({});

    const handleAdd = () => {
        addSectionItem('projects');
    };

    const handleRemove = (id) => {
        removeSectionItem('projects', id);
    };

    const handleChange = (id, field, value) => {
        updateSectionItem('projects', id, field, value);
    };

    const handleImprove = async (id, text) => {
        if (!text || text.length < 10) return;
        setLoadingIds(prev => ({ ...prev, [id]: true }));
        try {
            const improved = await aiService.improveText(text, 'project');
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
            <h3>Projects</h3>
            {projects.map(item => (
                <div key={item.id} className="section-item">
                    <div className="form-grid">
                        <div className="form-group main-col">
                            <label>Project Name</label>
                            <input type="text" value={item.name} onChange={(e) => handleChange(item.id, 'name', e.target.value)} placeholder="e.g. E-commerce App" />
                        </div>
                        <div className="form-group">
                            <label>Link (Optional)</label>
                            <input type="text" value={item.link} onChange={(e) => handleChange(item.id, 'link', e.target.value)} placeholder="URL" />
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
                                        backgroundColor: '#10b981',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {loadingIds[item.id] ? 'Improving...' : '✨ Improve'}
                                </button>
                            </div>
                            <textarea value={item.description} onChange={(e) => handleChange(item.id, 'description', e.target.value)} rows="3" placeholder="Description of the project..."></textarea>
                        </div>
                    </div>
                    <button type="button" onClick={() => handleRemove(item.id)} className="remove-btn">Remove</button>
                </div>
            ))}
            <button type="button" onClick={handleAdd} className="add-btn">Add Project</button>
        </section>
    );
};

export default Projects;
