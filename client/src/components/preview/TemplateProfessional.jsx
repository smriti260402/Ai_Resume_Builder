import React from 'react';
import { useResume } from '../../context/ResumeContext';

const MultiLineText = ({ text }) => {
    if (!text) return null;
    return text.split('\n').map((str, index) => (
        <React.Fragment key={index}>
            {str}
            <br />
        </React.Fragment>
    ));
};

const TemplateProfessional = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize } = resumeData;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: 1.6, fontSize: `${fontSize}pt` }}>
            {/* Header / Personal Info */}
            <header style={{
                borderBottom: `2px solid ${themeColor}`,
                paddingBottom: '20px',
                marginBottom: '20px',
                textAlign: 'center'
            }}>
                <h1 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px', color: themeColor }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <div style={{ fontSize: '0.9em', marginTop: '10px' }}>
                    {personalInfo.email && <span>{personalInfo.email} | </span>}
                    {personalInfo.phone && <span>{personalInfo.phone} | </span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
                <div style={{ fontSize: '0.9em', marginTop: '5px' }}>
                    {personalInfo.linkedin && <span style={{ marginRight: '10px' }}>{personalInfo.linkedin}</span>}
                    {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                </div>
            </header>

            {/* Summary */}
            {personalInfo.summary && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, color: themeColor }}>Summary</h3>
                    <p style={{ fontSize: '0.95em', margin: 0 }}><MultiLineText text={personalInfo.summary} /></p>
                </section>
            )}

            {/* Experience */}
            {experience && experience.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, color: themeColor }}>Experience</h3>
                    {experience.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.95em' }}>
                                <span>{item.title}</span>
                                <span>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                            </div>
                            <div style={{ fontStyle: 'italic', fontSize: '0.9em', marginBottom: '5px' }}>{item.company}, {item.location}</div>
                            <p style={{ fontSize: '0.9em', margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, color: themeColor }}>Education</h3>
                    {education.map(item => (
                        <div key={item.id} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.95em' }}>
                                <span>{item.school}</span>
                                <span>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                            </div>
                            <div style={{ fontSize: '0.9em' }}>{item.degree}</div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, color: themeColor }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {skills.map(item => (
                            <span key={item.id} style={{
                                background: '#f0f0f0',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '0.85em'
                            }}>
                                {item.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, color: themeColor }}>Projects</h3>
                    {projects.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.95em' }}>
                                <span>{item.name}</span>
                                {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em', color: themeColor }}>Link</a>}
                            </div>
                            <p style={{ fontSize: '0.9em', margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            )}
            {resumeData.customSections && resumeData.customSections.map(section => (
                <section key={section.id} style={{ marginBottom: '20px' }}>
                    <h3 style={{ borderBottom: '1px solid #ccc', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, color: themeColor }}>{section.title}</h3>
                    {section.items.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.95em' }}>
                                <span>{item.title}</span>
                                <span>{item.subtitle}</span>
                            </div>
                            <p style={{ fontSize: '0.9em', margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default TemplateProfessional;
