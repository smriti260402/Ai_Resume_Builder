import React from 'react';
import { useResume } from '../../context/ResumeContext';

const Education = () => {
    const { resumeData, addSectionItem, removeSectionItem, updateSectionItem } = useResume();
    const { education } = resumeData;

    const handleAdd = () => {
        addSectionItem('education', {
            degree: '',
            school: '',
            location: '',
            startDate: '',
            endDate: '',
            current: false,
            description: ''
        });
    };

    const handleChange = (id, e) => {
        const { name, value, type, checked } = e.target;
        updateSectionItem('education', id, name, type === 'checkbox' ? checked : value);
    };

    return (
        <div className="section-container" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-md)' }}>
                <h3 style={{ color: 'var(--text-primary)' }}>Education</h3>
                <button
                    onClick={handleAdd}
                    style={{
                        backgroundColor: 'var(--primary-color)',
                        color: 'white',
                        padding: 'var(--spacing-xs) var(--spacing-sm)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: 'var(--font-size-sm)'
                    }}
                >
                    + Add Education
                </button>
            </div>

            {education.map(item => (
                <div key={item.id} style={{
                    border: '1px solid var(--border-color)',
                    padding: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--background-color)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                        <h4 style={{ fontSize: 'var(--font-size-base)', color: 'var(--text-secondary)' }}>{item.degree || '(New Education)'}</h4>
                        <button
                            onClick={() => removeSectionItem('education', item.id)}
                            style={{ color: 'var(--error-color)', fontSize: 'var(--font-size-sm)' }}
                        >
                            Remove
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-sm)' }}>
                        <input
                            type="text" name="school" placeholder="School / University"
                            value={item.school} onChange={(e) => handleChange(item.id, e)}
                        />
                        <input
                            type="text" name="degree" placeholder="Degree"
                            value={item.degree} onChange={(e) => handleChange(item.id, e)}
                        />
                        <input
                            type="text" name="startDate" placeholder="Start Date"
                            value={item.startDate} onChange={(e) => handleChange(item.id, e)}
                        />
                        <input
                            type="text" name="endDate" placeholder="End Date"
                            value={item.endDate} onChange={(e) => handleChange(item.id, e)}
                            disabled={item.current}
                        />
                        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                            <input
                                type="checkbox" name="current" id={`edu-current-${item.id}`}
                                checked={item.current} onChange={(e) => handleChange(item.id, e)}
                                style={{ width: 'auto' }}
                            />
                            <label htmlFor={`edu-current-${item.id}`} style={{ fontSize: 'var(--font-size-sm)' }}>I currently study here</label>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Education;
