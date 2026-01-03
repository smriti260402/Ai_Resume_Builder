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

const TemplateElegant = () => {
    const { resumeData } = useResume();
    const { personalInfo, experience, education, skills, projects, themeColor, fontSize, customSections } = resumeData;

    return (
        <div style={{ fontFamily: '"Garamond", "Georgia", serif', color: '#2c2c2c', lineHeight: 1.6, fontSize: `${fontSize}pt` }}>
            <header style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '1px double #ccc', paddingBottom: '30px' }}>
                <h1 style={{ fontSize: '3em', margin: '0 0 10px 0', fontWeight: 'normal', color: themeColor }}>{personalInfo.fullName}</h1>
                <div style={{ fontSize: '1em', fontStyle: 'italic', color: '#666' }}>
                    {personalInfo.email} &diams; {personalInfo.phone} &diams; {personalInfo.address}
                </div>
            </header>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ textAlign: 'center', fontSize: '1.2em', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: themeColor }}>Professional Profile</h3>
                <p style={{ textAlign: 'center', margin: '0 auto', maxWidth: '80%' }}><MultiLineText text={personalInfo.summary} /></p>
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ textAlign: 'center', fontSize: '1.2em', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: themeColor }}>Experience</h3>
                {experience.map(exp => (
                    <div key={exp.id} style={{ marginBottom: '25px', display: 'flex' }}>
                        <div style={{ width: '25%', fontStyle: 'italic', textAlign: 'right', paddingRight: '20px', color: '#555' }}>
                            {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                        </div>
                        <div style={{ width: '75%', borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1em' }}>{exp.title}</div>
                            <div style={{ marginBottom: '5px' }}>{exp.company}, {exp.location}</div>
                            <p style={{ margin: 0 }}><MultiLineText text={exp.description} /></p>
                        </div>
                    </div>
                ))}
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ textAlign: 'center', fontSize: '1.2em', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: themeColor }}>Education</h3>
                {education.map(edu => (
                    <div key={edu.id} style={{ marginBottom: '15px', display: 'flex' }}>
                        <div style={{ width: '25%', fontStyle: 'italic', textAlign: 'right', paddingRight: '20px', color: '#555' }}>
                            {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                        </div>
                        <div style={{ width: '75%', borderLeft: '1px solid #eee', paddingLeft: '20px' }}>
                            <div style={{ fontWeight: 'bold' }}>{edu.school}</div>
                            <div>{edu.degree}</div>
                        </div>
                    </div>
                ))}
            </section>

            <section style={{ marginBottom: '30px' }}>
                <h3 style={{ textAlign: 'center', fontSize: '1.2em', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: themeColor }}>Skills</h3>
                <div style={{ textAlign: 'center' }}>
                    {skills.map(s => s.name).join(' • ')}
                </div>
            </section>

            {projects && projects.length > 0 && (
                <section style={{ marginBottom: '30px' }}>
                    <h3 style={{ textAlign: 'center', fontSize: '1.2em', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: themeColor }}>Key Projects</h3>
                    {projects.map(proj => (
                        <div key={proj.id} style={{ marginBottom: '15px', textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold' }}>{proj.name}</div>
                            <p style={{ margin: '0 auto', maxWidth: '90%' }}><MultiLineText text={proj.description} /></p>
                        </div>
                    ))}
                </section>
            )}

            {customSections && customSections.map(section => (
                <section key={section.id} style={{ marginBottom: '30px' }}>
                    <h3 style={{ textAlign: 'center', fontSize: '1.2em', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '20px', color: themeColor }}>{section.title}</h3>
                    {section.items.map(item => (
                        <div key={item.id} style={{ marginBottom: '15px', textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold' }}>{item.title}</div>
                            {item.subtitle && <div style={{ fontSize: '0.9em', fontStyle: 'italic' }}>{item.subtitle}</div>}
                            <p style={{ margin: '0 auto', maxWidth: '90%' }}><MultiLineText text={item.description} /></p>
                        </div>
                    ))}
                </section>
            ))}
        </div>
    );
};

export default TemplateElegant;
