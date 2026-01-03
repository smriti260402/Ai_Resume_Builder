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

const TemplateModern = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize, customSections } = resumeData;

    return (
        <div style={{ fontFamily: 'Roboto, Arial, sans-serif', color: '#333', lineHeight: 1.5, fontSize: `${fontSize}pt`, display: 'flex', minHeight: '100%' }}>
            {/* Sidebar */}
            <div style={{ width: '30%', backgroundColor: themeColor, color: 'white', padding: '30px 20px', textAlign: 'left' }}>
                <div style={{ marginBottom: '30px' }}>
                    <h1 style={{ margin: '0 0 10px 0', fontSize: '2em', textTransform: 'uppercase', lineHeight: 1.1 }}>{personalInfo.fullName}</h1>
                    <p style={{ margin: 0, opacity: 0.9 }}>{personalInfo.email}</p>
                    <p style={{ margin: 0, opacity: 0.9 }}>{personalInfo.phone}</p>
                    <p style={{ margin: 0, opacity: 0.9 }}>{personalInfo.address}</p>
                    {personalInfo.linkedin && <p style={{ margin: 0, opacity: 0.9 }}>LinkedIn: {personalInfo.linkedin}</p>}
                    {personalInfo.website && <p style={{ margin: 0, opacity: 0.9 }}>Web: {personalInfo.website}</p>}
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.5)', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.1em', marginBottom: '15px' }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {skills.map(skill => (
                            <span key={skill.id} style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '3px 8px', borderRadius: '4px', fontSize: '0.9em' }}>
                                {skill.name} {skill.level ? `(${skill.level})` : ''}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ width: '70%', padding: '30px', backgroundColor: 'white' }}>
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ fontStyle: 'italic', fontSize: '1.1em', color: '#555' }}>
                        <MultiLineText text={personalInfo.summary} />
                    </p>
                </div>

                {experience && experience.length > 0 && (
                    <section style={{ marginBottom: '25px' }}>
                        <h3 style={{ color: themeColor, textTransform: 'uppercase', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', fontSize: '1.2em' }}>Experience</h3>
                        {experience.map(exp => (
                            <div key={exp.id} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h4 style={{ margin: 0, fontSize: '1.1em' }}>{exp.title}</h4>
                                    <span style={{ fontSize: '0.9em', color: '#777' }}>
                                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.95em', fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>
                                    {exp.company}, {exp.location}
                                </div>
                                <p style={{ margin: 0, fontSize: '0.95em' }}><MultiLineText text={exp.description} /></p>
                            </div>
                        ))}
                    </section>
                )}

                {education && education.length > 0 && (
                    <section style={{ marginBottom: '25px' }}>
                        <h3 style={{ color: themeColor, textTransform: 'uppercase', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', fontSize: '1.2em' }}>Education</h3>
                        {education.map(edu => (
                            <div key={edu.id} style={{ marginBottom: '10px' }}>
                                <h4 style={{ margin: 0, fontSize: '1.1em' }}>{edu.school}</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span>{edu.degree}</span>
                                    <span style={{ fontSize: '0.9em', color: '#777' }}>
                                        {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {projects && projects.length > 0 && (
                    <section style={{ marginBottom: '25px' }}>
                        <h3 style={{ color: themeColor, textTransform: 'uppercase', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', fontSize: '1.2em' }}>Projects</h3>
                        {projects.map(item => (
                            <div key={item.id} style={{ marginBottom: '15px' }}>
                                <div style={{ fontWeight: 'bold' }}>
                                    {item.name}
                                    {item.link && <a href={item.link} style={{ marginLeft: '10px', fontSize: '0.8em', color: themeColor }}>Link</a>}
                                </div>
                                <p style={{ margin: 0, fontSize: '0.95em' }}><MultiLineText text={item.description} /></p>
                            </div>
                        ))}
                    </section>
                )}

                {customSections && customSections.map(section => (
                    <section key={section.id} style={{ marginBottom: '25px' }}>
                        <h3 style={{ color: themeColor, textTransform: 'uppercase', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', fontSize: '1.2em' }}>{section.title}</h3>
                        {section.items.map(item => (
                            <div key={item.id} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.05em' }}>
                                    <span>{item.title}</span>
                                    <span style={{ fontSize: '0.9em', color: '#666' }}>{item.subtitle}</span>
                                </div>
                                <p style={{ fontSize: '0.95em', margin: 0 }}><MultiLineText text={item.description} /></p>
                            </div>
                        ))}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default TemplateModern;
