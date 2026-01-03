import React from 'react';
import { useResume } from '../../context/ResumeContext';

const TemplateSelector = () => {
    const { resumeData, updateTheme, updateTemplate, updateFontSize } = useResume();
    const { themeColor, template } = resumeData;

    const colors = [
        '#2563eb', // Blue
        '#0f766e', // Teal
        '#10b981', // Emerald
        '#65a30d', // Lime
        '#f59e0b', // Amber
        '#ea580c', // Orange
        '#ef4444', // Red
        '#be123c', // Rose
        '#8b5cf6', // Violet
        '#6d28d9', // Purple
        '#ec4899', // Pink
        '#374151', // Gray
        '#1c1917', // Stone
        '#000000'  // Black
    ];

    return (
        <div style={{ padding: 'var(--spacing-md)', borderBottom: '1px solid var(--border-color)', marginBottom: 'var(--spacing-md)' }}>
            <div style={{ marginBottom: 'var(--spacing-md)' }}>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>Template</label>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                    {[
                        { id: 'professional', label: 'Professional' },
                        { id: 'modern', label: 'Modern' }, // New Modern
                        { id: 'minimalist', label: 'Minimalist' },
                        { id: 'executive', label: 'Executive' },
                        { id: 'classic', label: 'Classic' },
                        { id: 'column', label: 'Two Column' },
                        { id: 'creative', label: 'Creative' },
                        { id: 'simple', label: 'Simple' },
                        // { id: 'tech', label: 'Tech' },
                        { id: 'elegant', label: 'Elegant' },
                        { id: 'compact', label: 'Compact' }
                    ].map(tmpl => (
                        <button
                            key={tmpl.id}
                            onClick={() => updateTemplate(tmpl.id)}
                            style={{
                                padding: 'var(--spacing-xs) var(--spacing-sm)',
                                border: `2px solid ${template === tmpl.id ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                borderRadius: 'var(--radius-sm)',
                                backgroundColor: template === tmpl.id ? '#eff6ff' : 'white',
                                color: template === tmpl.id ? 'var(--primary-color)' : 'inherit',
                                fontSize: '0.9rem'
                            }}
                        >
                            {tmpl.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>Theme Color</label>
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                    {colors.map(color => (
                        <button
                            key={color}
                            onClick={() => updateTheme(color)}
                            style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: color,
                                border: `2px solid ${themeColor === color ? 'var(--text-primary)' : 'transparent'}`,
                                cursor: 'pointer',
                                transition: 'transform 0.1s',
                            }}
                            title={color}
                        />
                    ))}
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-xs)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>Font Size (pt)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <input
                        type="range"
                        min="9"
                        max="16"
                        step="0.5"
                        value={resumeData.fontSize}
                        onChange={(e) => updateFontSize(Number(e.target.value))}
                        style={{ width: '150px', cursor: 'pointer' }}
                    />
                    <span style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        minWidth: '30px',
                        textAlign: 'center',
                        border: '1px solid var(--border-color)',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: 'white'
                    }}>
                        {resumeData.fontSize}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TemplateSelector;
