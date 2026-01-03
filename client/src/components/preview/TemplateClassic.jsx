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

const TemplateClassic = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize } = resumeData;

    return (
        <div style={{ fontFamily: '"Times New Roman", Times, serif', color: '#000', lineHeight: 1.5, fontSize: `${fontSize}pt` }}>
            <header style={{ marginBottom: '20px', borderBottom: '1px solid #000', paddingBottom: '20px' }}>
                <h1 style={{ margin: '0', fontSize: '2.8em', textTransform: 'uppercase', textAlign: 'left' }}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <div style={{ fontSize: '1em', marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
                    {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
                </div>
            </header>

            {personalInfo.summary && (
                <section style={{ marginBottom: '20px' }}>
                    <p style={{ fontSize: '1em', margin: 0 }}><MultiLineText text={personalInfo.summary} /></p>
                </section>
            )}

            {experience && experience.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2em', marginTop: 0, marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '2px', textTransform: 'uppercase' }}>Experience</h3>
                    {experience.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <h4 style={{ margin: 0, fontSize: '1.1em', fontWeight: 'bold' }}>{item.company}</h4>
                                <span style={{ fontSize: '1em' }}>{item.location}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                                <div style={{ fontSize: '1em', fontStyle: 'italic' }}>{item.title}</div>
                                <span style={{ fontSize: '1em' }}>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                            </div>
                            <p style={{ fontSize: '1em', margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            )}

            {education && education.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2em', marginTop: 0, marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '2px', textTransform: 'uppercase' }}>Education</h3>
                    {education.map(item => (
                        <div key={item.id} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1em' }}>
                                <span>{item.school}</span>
                                <span>{item.startDate} - {item.current ? 'Present' : item.endDate}</span>
                            </div>
                            <div style={{ fontSize: '1em' }}>{item.degree}</div>
                        </div>
                    ))}
                </section>
            )}

            {skills && skills.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2em', marginTop: 0, marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '2px', textTransform: 'uppercase' }}>Skills</h3>
                    <p style={{ fontSize: '1em', margin: 0 }}>
                        {skills.map(item => item.name).join(' • ')}
                    </p>
                </section>
            )}

            {projects && projects.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2em', marginTop: 0, marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '2px', textTransform: 'uppercase' }}>Projects</h3>
                    {projects.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1em' }}>
                                <span>{item.name}</span>
                                {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '1em', color: 'black', textDecoration: 'underline' }}>Link</a>}
                            </div>
                            <p style={{ fontSize: '1em', margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            )}
            {resumeData.customSections && resumeData.customSections.map(section => (
                <section key={section.id} style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2em', marginTop: 0, marginBottom: '10px', borderBottom: '1px solid #000', paddingBottom: '2px', textTransform: 'uppercase' }}>{section.title}</h3>
                    {section.items.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1em' }}>
                                <span>{item.title}</span>
                                <span>{item.subtitle}</span>
                            </div>
                            <p style={{ fontSize: '1em', margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default TemplateClassic;
