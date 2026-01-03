import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';

const CustomSectionManager = () => {
    const {
        resumeData,
        addCustomSection,
        removeCustomSection,
        updateCustomSectionTitle,
        addCustomItem,
        removeCustomItem,
        updateCustomItem
    } = useResume();

    const [newTopLevelSectionTitle, setNewTopLevelSectionTitle] = useState('');
    const [isAddingSection, setIsAddingSection] = useState(false);

    const handleAddSection = () => {
        if (newTopLevelSectionTitle.trim()) {
            addCustomSection(newTopLevelSectionTitle);
            setNewTopLevelSectionTitle('');
            setIsAddingSection(false);
        }
    };

    return (
        <div style={{ marginTop: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-sm)' }}>
                <h3 style={{ margin: 0 }}>Custom Sections</h3>
                {!isAddingSection ? (
                    <button
                        onClick={() => setIsAddingSection(true)}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                        }}
                    >
                        + Add Section
                    </button>
                ) : (
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <input
                            type="text"
                            placeholder="Section Name (e.g. Certifications)"
                            value={newTopLevelSectionTitle}
                            onChange={(e) => setNewTopLevelSectionTitle(e.target.value)}
                            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '0.8rem' }}
                            autoFocus
                        />
                        <button onClick={handleAddSection} style={{ backgroundColor: 'var(--success-color)', color: 'white', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>✓</button>
                        <button onClick={() => setIsAddingSection(false)} style={{ backgroundColor: '#ccc', color: 'black', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
                    </div>
                )}
            </div>

            {resumeData.customSections.map(section => (
                <div key={section.id} style={{
                    marginBottom: 'var(--spacing-lg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--spacing-md)',
                    backgroundColor: '#fff'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <input
                            type="text"
                            value={section.title}
                            onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)}
                            style={{
                                fontWeight: 'bold',
                                border: 'none',
                                borderBottom: '1px solid #ccc',
                                padding: '5px',
                                outline: 'none',
                                flex: 1,
                                marginRight: '10px'
                            }}
                            placeholder="Section Title"
                        />
                        <button
                            onClick={() => removeCustomSection(section.id)}
                            style={{
                                color: 'var(--error-color)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                padding: '5px'
                            }}
                            title="Delete Section"
                        >
                            🗑
                        </button>
                    </div>

                    {section.items.map(item => (
                        <div key={item.id} style={{
                            marginBottom: '10px',
                            padding: '10px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: 'var(--radius-sm)',
                            position: 'relative'
                        }}>
                            <button
                                onClick={() => removeCustomItem(section.id, item.id)}
                                style={{
                                    position: 'absolute',
                                    top: '5px',
                                    right: '5px',
                                    background: 'none',
                                    border: 'none',
                                    color: '#999',
                                    cursor: 'pointer',
                                    fontSize: '0.8rem'
                                }}
                            >
                                ✕
                            </button>
                            <input
                                type="text"
                                placeholder="Title / Item Name"
                                value={item.title}
                                onChange={(e) => updateCustomItem(section.id, item.id, 'title', e.target.value)}
                                style={{ display: 'block', width: '90%', padding: '5px', marginBottom: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                            <input
                                type="text"
                                placeholder="Subtitle / Date / Role (Optional)"
                                value={item.subtitle}
                                onChange={(e) => updateCustomItem(section.id, item.id, 'subtitle', e.target.value)}
                                style={{ display: 'block', width: '90%', padding: '5px', marginBottom: '5px', border: '1px solid #ddd', borderRadius: '4px' }}
                            />
                            <textarea
                                placeholder="Description (Optional)"
                                value={item.description}
                                onChange={(e) => updateCustomItem(section.id, item.id, 'description', e.target.value)}
                                style={{ display: 'block', width: '90%', padding: '5px', border: '1px solid #ddd', borderRadius: '4px', minHeight: '40px', resize: 'vertical' }}
                            />
                        </div>
                    ))}

                    <button
                        onClick={() => addCustomItem(section.id)}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'white',
                            border: '1px dashed var(--primary-color)',
                            color: 'var(--primary-color)',
                            cursor: 'pointer',
                            borderRadius: 'var(--radius-sm)',
                            textAlign: 'center'
                        }}
                    >
                        + Add Item to {section.title}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default CustomSectionManager;
