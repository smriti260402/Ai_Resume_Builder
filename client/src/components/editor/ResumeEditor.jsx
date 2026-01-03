import React from 'react';
import TemplateSelector from './TemplateSelector';
import PersonalDetails from './PersonalDetails';
import Experience from './Experience';
import Education from './Education';
import Skills from './Skills';
import Projects from './Projects';
import CustomSectionManager from './CustomSectionManager';

const ResumeEditor = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <TemplateSelector />
            <PersonalDetails />
            <Experience />
            <Education />
            <Skills />
            <Projects />
            <div style={{ borderTop: '2px solid #eee', paddingTop: '20px' }}>
                <CustomSectionManager />
            </div>
        </div>
    );
};

export default ResumeEditor;
