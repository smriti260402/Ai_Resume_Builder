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

const TemplateColumn = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize } = resumeData;

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: 1.5, fontSize: `${fontSize}pt`, display: 'flex', minHeight: '100%' }}>
            {/* Left Column */}
            <div style={{ width: '35%', backgroundColor: '#f0f0f0', padding: '30px 20px', borderRight: '1px solid #ddd' }}>
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '2em', color: themeColor, lineHeight: 1.2 }}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <div style={{ fontSize: '0.9em', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {personalInfo.email && <span style={{ wordBreak: 'break-all' }}>✉ {personalInfo.email}</span>}
                        {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
                        {personalInfo.location && <span>📍 {personalInfo.location}</span>}
                        {personalInfo.linkedin && <span style={{ wordBreak: 'break-all' }}>🔗 {personalInfo.linkedin}</span>}
                        {personalInfo.portfolio && <span style={{ wordBreak: 'break-all' }}>🌐 {personalInfo.portfolio}</span>}
                    </div>
                </div>

                {skills && skills.length > 0 && (
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, marginBottom: '15px', color: themeColor }}>Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {skills.map(item => (
                                <div key={item.id} style={{ fontSize: '0.9em', width: '100%' }}>
                                    • {item.name}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {education && education.length > 0 && (
                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, marginBottom: '15px', color: themeColor }}>Education</h3>
                        {education.map(item => (
                            <div key={item.id} style={{ marginBottom: '20px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '0.95em' }}>{item.degree}</div>
                                <div style={{ fontSize: '0.9em' }}>{item.school}</div>
                                <div style={{ fontSize: '0.85em', color: '#666' }}>{item.startDate} - {item.current ? 'Present' : item.endDate}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Column */}
            <div style={{ width: '65%', padding: '30px' }}>
                {personalInfo.summary && (
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.2em', marginTop: 0, marginBottom: '15px', color: themeColor }}>Profile</h3>
                        <p style={{ fontSize: '1em', margin: 0 }}><MultiLineText text={personalInfo.summary} /></p>
                    </section>
                )}

                {experience && experience.length > 0 && (
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.2em', marginTop: 0, marginBottom: '15px', color: themeColor }}>Professional Experience</h3>
                        {experience.map(item => (
                            <div key={item.id} style={{ marginBottom: '25px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                    <h4 style={{ margin: 0, fontSize: '1.1em', fontWeight: 'bold' }}>{item.title}</h4>
                                    <span style={{ fontSize: '0.9em', color: '#666' }}>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                                </div>
                                <div style={{ fontStyle: 'italic', fontSize: '0.95em', marginBottom: '8px', color: themeColor }}>{item.company}, {item.location}</div>
                                <p style={{ fontSize: '0.95em', margin: 0 }}><MultiLineText text={item.description} /></p>
                            </div>
                        ))}
                    </section>
                )}

                {projects && projects.length > 0 && (
                    <section style={{ marginBottom: '30px' }}>
                        <h3 style={{ borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.2em', marginTop: 0, marginBottom: '15px', color: themeColor }}>Projects</h3>
                        {projects.map(item => (
                            <div key={item.id} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.05em' }}>
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
                        <h3 style={{ borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1.2em', marginTop: 0, marginBottom: '15px', color: themeColor }}>{section.title}</h3>
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

export default TemplateColumn;
