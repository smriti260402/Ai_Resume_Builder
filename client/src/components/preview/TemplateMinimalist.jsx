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

const TemplateMinimalist = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize } = resumeData;

    return (
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#222', lineHeight: 1.6, fontSize: `${fontSize}pt` }}>
            <header style={{ marginBottom: '30px', textAlign: 'center' }}>
                <h1 style={{ margin: '0 0 10px 0', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '2.5em' }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <div style={{ fontSize: '0.9em', color: '#555', display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                    {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                </div>
            </header>

            {personalInfo.summary && (
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, marginBottom: '15px' }}>Summary</h3>
                    <p style={{ fontSize: '0.95em', margin: 0 }}><MultiLineText text={personalInfo.summary} /></p>
                </section>
            )}

            {skills && skills.length > 0 && (
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, marginBottom: '15px' }}>Skills</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {skills.map(item => (
                            <span key={item.id} style={{ fontSize: '0.9em', border: '1px solid #333', padding: '2px 8px', borderRadius: '12px' }}>
                                {item.name}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, marginBottom: '15px' }}>Experience</h3>
                    {experience.map(item => (
                        <div key={item.id} style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <h4 style={{ margin: 0, fontSize: '1.1em' }}>{item.title}</h4>
                                <span style={{ fontSize: '0.9em', whiteSpace: 'nowrap' }}>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                            </div>
                            <div style={{ fontStyle: 'italic', fontSize: '0.95em', marginBottom: '8px', color: '#444' }}>{item.company}, {item.location}</div>
                            <p style={{ fontSize: '0.95em', margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            )}

            {education && education.length > 0 && (
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, marginBottom: '15px' }}>Education</h3>
                    {education.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1em' }}>
                                <span>{item.school}</span>
                                <span>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                            </div>
                            <div style={{ fontSize: '0.95em' }}>{item.degree}</div>
                        </div>
                    ))}
                </section>
            )}

            {projects && projects.length > 0 && (
                <section style={{ marginBottom: '25px' }}>
                    <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, marginBottom: '15px' }}>Projects</h3>
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
                <section key={section.id} style={{ marginBottom: '25px' }}>
                    <h3 style={{ borderBottom: '2px solid #000', paddingBottom: '5px', textTransform: 'uppercase', fontSize: '1em', marginTop: 0, marginBottom: '15px' }}>{section.title}</h3>
                    {section.items.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1em' }}>
                                <span>{item.title}</span>
                                <span>{item.subtitle}</span>
                            </div>
                            <p style={{ fontSize: '0.95em', margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default TemplateMinimalist;
