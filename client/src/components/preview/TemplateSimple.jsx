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

const TemplateSimple = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize, customSections } = resumeData;

    return (
        <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#000', lineHeight: 1.4, fontSize: `${fontSize}pt`, maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '5px' }}>{personalInfo.fullName}</h1>
                <p style={{ margin: 0 }}>
                    {personalInfo.address} | {personalInfo.phone} | {personalInfo.email}
                    {personalInfo.linkedin && ` | ${personalInfo.linkedin}`}
                </p>
            </header>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1em', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Summary</h3>
                <p style={{ margin: 0 }}><MultiLineText text={personalInfo.summary} /></p>
            </section>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1em', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Experience</h3>
                {experience.map(exp => (
                    <div key={exp.id} style={{ marginBottom: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>{exp.company}</span>
                            <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                        </div>
                        <div style={{ fontStyle: 'italic', marginBottom: '5px' }}>{exp.title}, {exp.location}</div>
                        <ul style={{ margin: '0 0 0 20px', padding: 0 }}>
                            <MultiLineText text={exp.description} />
                        </ul>
                    </div>
                ))}
            </section>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1em', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Education</h3>
                {education.map(edu => (
                    <div key={edu.id} style={{ marginBottom: '5px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                            <span>{edu.school}</span>
                            <span>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
                        </div>
                        <div>{edu.degree}</div>
                    </div>
                ))}
            </section>

            <section style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1em', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Skills</h3>
                <p style={{ margin: 0 }}>
                    {skills.map(s => s.name).join(', ')}
                </p>
            </section>

            {projects && projects.length > 0 && (
                <section style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1em', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>Projects</h3>
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '10px' }}>
                            <div style={{ fontWeight: 'bold' }}>{proj.name}</div>
                            <p style={{ margin: 0 }}><MultiLineText text={proj.description} /></p>
                        </div>
                    ))}
                </section>
            )}

            {customSections && customSections.map(section => (
                <section key={section.id} style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1em', textTransform: 'uppercase', borderBottom: '1px solid #000', paddingBottom: '3px', marginBottom: '10px' }}>{section.title}</h3>
                    {section.items.map(item => (
                        <div key={item.id} style={{ marginBottom: '10px' }}>
                            <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                            {item.subtitle && <div style={{ fontSize: '0.9em' }}>{item.subtitle}</div>}
                            <p style={{ margin: 0 }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default TemplateSimple;
