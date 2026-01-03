import React from 'react';
import { useResume } from '../../context/ResumeContext';
import TemplateProfessional from './TemplateProfessional';
import TemplateMinimalist from './TemplateMinimalist';
import TemplateExecutive from './TemplateExecutive';
import TemplateClassic from './TemplateClassic';
import TemplateColumn from './TemplateColumn';
import TemplateModern from './TemplateModern';
import TemplateCreative from './TemplateCreative';
import TemplateSimple from './TemplateSimple';
// import TemplateTech from './TemplateTech';
import TemplateElegant from './TemplateElegant';
import TemplateCompact from './TemplateCompact';

const ResumePreview = () => {
    const { resumeData } = useResume();
    const { template } = resumeData;

    switch (template) {
        case 'minimalist':
            return <TemplateMinimalist />;
        case 'executive':
            return <TemplateExecutive />;
        case 'classic':
            return <TemplateClassic />;
        case 'column':
            return <TemplateColumn />;
        case 'modern':
            return <TemplateModern />;
        case 'creative':
            return <TemplateCreative />;
        case 'simple':
            return <TemplateSimple />;
        // case 'tech':
        //     return <TemplateTech />;
        case 'elegant':
            return <TemplateElegant />;
        case 'compact':
            return <TemplateCompact />;
        case 'professional':
        default:
            return <TemplateProfessional />;
    }
};

export default ResumePreview;
