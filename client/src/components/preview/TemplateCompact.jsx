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

const TemplateCompact = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize, customSections } = resumeData;

    return (
        <div style={{ fontFamily: 'Tahoma, sans-serif', color: '#111', lineHeight: 1.4, fontSize: `${fontSize - 1}pt` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '15px', borderBottom: '2px solid #000', paddingBottom: '10px' }}>
                <div>
                    <h1 style={{ fontSize: '2.2em', margin: 0, textTransform: 'uppercase', color: themeColor }}>{personalInfo.fullName}</h1>
                    <div style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{personalInfo.summary ? personalInfo.summary.substring(0, 50) + "..." : "Professional"}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.9em' }}>
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                    <div>{personalInfo.address}</div>
                    {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>

                {/* Left Column */}
                <div>
                    <section style={{ marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '1em', textTransform: 'uppercase', backgroundColor: '#eee', padding: '3px 5px', margin: '0 0 10px 0' }}>Experience</h3>
                        {experience.map(exp => (
                            <div key={exp.id} style={{ marginBottom: '10px' }}>
                                <div style={{ fontWeight: 'bold' }}>{exp.title}</div>
                                <div style={{ fontSize: '0.85em', display: 'flex', justifyContent: 'space-between', color: '#555' }}>
                                    <span>{exp.company}</span>
                                    <span>{exp.startDate}-{exp.current ? 'Now' : exp.endDate}</span>
                                </div>
                                <p style={{ margin: '2px 0 0 0', fontSize: '0.95em' }}><MultiLineText text={exp.description} /></p>
                            </div>
                        ))}
                    </section>
                </div>

                {/* Right Column */}
                <div>
                    <section style={{ marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '1em', textTransform: 'uppercase', backgroundColor: '#eee', padding: '3px 5px', margin: '0 0 10px 0' }}>Education</h3>
                        {education.map(edu => (
                            <div key={edu.id} style={{ marginBottom: '8px' }}>
                                <div style={{ fontWeight: 'bold' }}>{edu.school}</div>
                                <div>{edu.degree}</div>
                                <div style={{ fontSize: '0.85em', color: '#555' }}>{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </section>

                    <section style={{ marginBottom: '15px' }}>
                        <h3 style={{ fontSize: '1em', textTransform: 'uppercase', backgroundColor: '#eee', padding: '3px 5px', margin: '0 0 10px 0' }}>Skills</h3>
                        <div style={{ fontSize: '0.95em' }}>{skills.map(s => s.name).join(', ')}</div>
                    </section>

                    {projects && projects.length > 0 && (
                        <section style={{ marginBottom: '15px' }}>
                            <h3 style={{ fontSize: '1em', textTransform: 'uppercase', backgroundColor: '#eee', padding: '3px 5px', margin: '0 0 10px 0' }}>Projects</h3>
                            {projects.map(proj => (
                                <div key={proj.id} style={{ marginBottom: '8px' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.95em' }}>{proj.name}</div>
                                    <p style={{ margin: 0, fontSize: '0.9em' }}><MultiLineText text={proj.description} /></p>
                                </div>
                            ))}
                        </section>
                    )}

                    {customSections && customSections.map(section => (
                        <section key={section.id} style={{ marginBottom: '15px' }}>
                            <h3 style={{ fontSize: '1em', textTransform: 'uppercase', backgroundColor: '#eee', padding: '3px 5px', margin: '0 0 10px 0' }}>{section.title}</h3>
                            {section.items.map(item => (
                                <div key={item.id} style={{ marginBottom: '8px' }}>
                                    <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                                    <div style={{ fontSize: '0.85em' }}>{item.subtitle}</div>
                                </div>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TemplateCompact;
