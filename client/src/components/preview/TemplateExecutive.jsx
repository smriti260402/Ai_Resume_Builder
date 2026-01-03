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

const TemplateExecutive = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize } = resumeData;

    return (
        <div style={{ fontFamily: 'Georgia, serif', color: '#333', lineHeight: 1.6, fontSize: `${fontSize}pt` }}>
            <header style={{ backgroundColor: themeColor, padding: '30px', color: 'white', marginBottom: '30px' }}>
                <h1 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '2.5em' }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <div style={{ fontSize: '0.9em', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    {personalInfo.email && <span style={{ display: 'flex', alignItems: 'center' }}>✉ {personalInfo.email}</span>}
                    {personalInfo.phone && <span style={{ display: 'flex', alignItems: 'center' }}>📞 {personalInfo.phone}</span>}
                    {personalInfo.location && <span style={{ display: 'flex', alignItems: 'center' }}>📍 {personalInfo.location}</span>}
                </div>
                <div style={{ fontSize: '0.9em', marginTop: '10px' }}>
                    {personalInfo.linkedin && <span style={{ marginRight: '15px', color: 'white' }}>🔗 {personalInfo.linkedin}</span>}
                    {personalInfo.portfolio && <span style={{ color: 'white' }}>🌐 {personalInfo.portfolio}</span>}
                </div>
            </header>

            <div style={{ padding: '0 30px' }}>
                {personalInfo.summary && (
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: themeColor, textTransform: 'uppercase', fontSize: '1.1em', marginTop: 0, borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>Executive Summary</h3>
                        <p style={{ fontSize: '1em', margin: 0 }}><MultiLineText text={personalInfo.summary} /></p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: themeColor, textTransform: 'uppercase', fontSize: '1.1em', marginTop: 0, borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>Professional Experience</h3>
                        {experience.map(item => (
                            <div key={item.id} style={{ marginBottom: '20px', borderLeft: `3px solid #eee`, paddingLeft: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h4 style={{ margin: 0, fontSize: '1.1em', color: '#000' }}>{item.title}</h4>
                                    <span style={{ fontSize: '0.9em', fontWeight: 'bold' }}>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                                </div>
                                <div style={{ fontStyle: 'italic', fontSize: '0.95em', marginBottom: '8px', color: '#555' }}>{item.company}, {item.location}</div>
                                <p style={{ fontSize: '0.95em', margin: 0 }}><MultiLineText text={item.description} /></p>
                            </div>
                        ))}
                    </section>
                )}

                <div style={{ display: 'flex', gap: '30px' }}>
                    <div style={{ flex: 1 }}>
                        {education && education.length > 0 && (
                            <section style={{ marginBottom: '30px' }}>
                                <h3 style={{ color: themeColor, textTransform: 'uppercase', fontSize: '1.1em', marginTop: 0, borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>Education</h3>
                                {education.map(item => (
                                    <div key={item.id} style={{ marginBottom: '15px' }}>
                                        <div style={{ fontWeight: 'bold', fontSize: '1em' }}>{item.school}</div>
                                        <div style={{ fontSize: '0.95em' }}>{item.degree}</div>
                                        <div style={{ fontSize: '0.9em', color: '#777' }}>{item.startDate} - {item.current ? 'Present' : item.endDate}</div>
                                    </div>
                                ))}
                            </section>
                        )}
                    </div>

                    <div style={{ flex: 1 }}>
                        {skills && skills.length > 0 && (
                            <section style={{ marginBottom: '30px' }}>
                                <h3 style={{ color: themeColor, textTransform: 'uppercase', fontSize: '1.1em', marginTop: 0, borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>Core Competencies</h3>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {skills.map(item => (
                                        <div key={item.id} style={{ fontSize: '0.95em', width: '45%' }}>
                                            • {item.name}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>

                {projects && projects.length > 0 && (
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: themeColor, textTransform: 'uppercase', fontSize: '1.1em', marginTop: 0, borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>Key Projects</h3>
                        {projects.map(item => (
                            <div key={item.id} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1em' }}>
                                    <span>{item.name}</span>
                                    {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9em', color: themeColor }}>Link</a>}
                                </div>
                                <p style={{ fontSize: '0.95em', margin: 0 }}><MultiLineText text={item.description} /></p>
                            </div>
                        ))}
                    </section>
                )}
                {resumeData.customSections && resumeData.customSections.map(section => (
                    <section key={section.id} style={{ marginBottom: '30px' }}>
                        <h3 style={{ color: themeColor, textTransform: 'uppercase', fontSize: '1.1em', marginTop: 0, borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>{section.title}</h3>
                        {section.items.map(item => (
                            <div key={item.id} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1em' }}>
                                    <span>{item.title}</span>
                                    <span style={{ fontSize: '0.9em', color: '#777' }}>{item.subtitle}</span>
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

export default TemplateExecutive;
