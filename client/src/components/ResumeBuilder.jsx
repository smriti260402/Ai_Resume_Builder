import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2pdf from 'html2pdf.js';
import ResumeEditor from './editor/ResumeEditor';
import ResumePreview from './preview/ResumePreview';
import { useResume } from '../context/ResumeContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const ResumeBuilder = () => {
  const componentRef = useRef();
  const { resumeData, currentResumeId, setCurrentResumeId } = useResume();
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const title = resumeData.personalInfo.fullName ? `${resumeData.personalInfo.fullName}'s Resume` : 'My Resume';

      if (currentResumeId) {
        // Update
        await api.put(`/resumes/${currentResumeId}`, { title, content: resumeData });
      } else {
        // Create
        const res = await api.post('/resumes', { title, content: resumeData });
        setCurrentResumeId(res.data.id);
      }
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Save failed', error);
      alert('Failed to save resume.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (window.confirm('Did you save your changes? Unsaved changes will be lost.')) {
      navigate('/dashboard');
    }
  }

  const downloadPDF = () => {
    const element = componentRef.current;
    const opt = {
      margin: 0,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 'var(--spacing-md)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
        <button onClick={handleBack} style={{ padding: '8px 15px', backgroundColor: '#64748b', color: 'white', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
          &larr; Back to Dashboard
        </button>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{
              padding: '8px 20px',
              backgroundColor: isSaving ? '#93c5fd' : '#2563eb',
              color: 'white',
              borderRadius: '5px',
              border: 'none',
              cursor: isSaving ? 'wait' : 'pointer',
              fontWeight: 'bold'
            }}
          >
            {isSaving ? 'Saving...' : 'Save Resume'}
          </button>
          <button
            onClick={downloadPDF}
            style={{
              backgroundColor: 'var(--success-color)',
              color: 'white',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--radius-md)',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-lg)',
        flex: 1,
        minHeight: 0 // Important for nested scrolling
      }}>
        <div className="editor-panel" style={{
          overflowY: 'auto',
          padding: 'var(--spacing-md)',
          backgroundColor: 'var(--surface-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <ResumeEditor />
        </div>

        <div className="preview-panel" style={{
          overflowY: 'auto',
          padding: 'var(--spacing-md)',
          backgroundColor: '#525659', // Dark background for PDF preview like feel
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <div ref={componentRef} style={{
            width: '210mm',
            minHeight: '297mm',
            backgroundColor: 'white',
            padding: '20mm',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
