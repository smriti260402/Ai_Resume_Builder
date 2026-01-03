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

const TemplateCreative = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize, customSections } = resumeData;

    return (
        <div style={{ fontFamily: 'Trebuchet MS, sans-serif', color: '#444', lineHeight: 1.5, fontSize: `${fontSize}pt`, borderTop: `10px solid ${themeColor}` }}>
            <div style={{ padding: '40px' }}>
                <header style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '3em', color: themeColor, margin: 0, letterSpacing: '-1px' }}>{personalInfo.fullName}</h1>
                    <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#888', textTransform: 'uppercase', letterSpacing: '2px' }}>
                        {personalInfo.email} • {personalInfo.phone} • {personalInfo.address}
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
                    <div>
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: themeColor, borderLeft: `4px solid ${themeColor}`, paddingLeft: '10px', textTransform: 'uppercase', fontSize: '1.1em' }}>Education</h3>
                            {education.map(edu => (
                                <div key={edu.id} style={{ marginBottom: '15px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{edu.school}</div>
                                    <div style={{ fontSize: '0.9em' }}>{edu.degree}</div>
                                    <div style={{ fontSize: '0.85em', color: '#888' }}>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</div>
                                </div>
                            ))}
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: themeColor, borderLeft: `4px solid ${themeColor}`, paddingLeft: '10px', textTransform: 'uppercase', fontSize: '1.1em' }}>Skills</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                {skills.map(skill => (
                                    <span key={skill.id} style={{ fontSize: '0.95em' }}>• {skill.name}</span>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div>
                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: themeColor, borderBottom: `1px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.1em' }}>Profile</h3>
                            <p style={{ marginTop: '10px' }}><MultiLineText text={personalInfo.summary} /></p>
                        </section>

                        <section style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: themeColor, borderBottom: `1px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.1em' }}>Experience</h3>
                            {experience.map(exp => (
                                <div key={exp.id} style={{ marginBottom: '20px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{exp.title}</div>
                                        <div style={{ fontSize: '0.85em', backgroundColor: themeColor, color: 'white', padding: '2px 6px', borderRadius: '3px' }}>
                                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                        </div>
                                    </div>
                                    <div style={{ fontStyle: 'italic', marginBottom: '5px', color: '#666' }}>{exp.company}, {exp.location}</div>
                                    <p style={{ margin: 0 }}><MultiLineText text={exp.description} /></p>
                                </div>
                            ))}
                        </section>

                        {projects && projects.length > 0 && (
                            <section style={{ marginBottom: '30px' }}>
                                <h3 style={{ color: themeColor, borderBottom: `1px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.1em' }}>Projects</h3>
                                {projects.map(item => (
                                    <div key={item.id} style={{ marginBottom: '15px' }}>
                                        <div style={{ fontWeight: 'bold' }}>{item.name}</div>
                                        <p style={{ margin: 0 }}><MultiLineText text={item.description} /></p>
                                    </div>
                                ))}
                            </section>
                        )}

                        {customSections && customSections.map(section => (
                            <section key={section.id} style={{ marginBottom: '30px' }}>
                                <h3 style={{ color: themeColor, borderBottom: `1px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.1em' }}>{section.title}</h3>
                                {section.items.map(item => (
                                    <div key={item.id} style={{ marginBottom: '15px' }}>
                                        <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                                        {item.subtitle && <div style={{ fontSize: '0.9em', color: '#666' }}>{item.subtitle}</div>}
                                        <p style={{ margin: 0 }}><MultiLineText text={item.description} /></p>
                                    </div>
                                ))}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateCreative;
