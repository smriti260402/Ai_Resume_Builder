import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import api from '../services/api';
import Loader from './common/Loader';
import './dashboard.css';

const Dashboard = () => {
    const { user, token, setSavedResumes, savedResumes, setResumeData, setCurrentResumeId, logoutUser } = useResume();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchResumes = async () => {
            try {
                const res = await api.get('/resumes');
                setSavedResumes(res.data);
            } catch (error) {
                console.error('Failed to fetch resumes', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResumes();
    }, [token, navigate, setSavedResumes]);

    const handleCreateNew = () => {
        setResumeData({
            personalInfo: { fullName: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '', summary: '' },
            experience: [], education: [], skills: [], projects: [], certifications: [], languages: [],
            themeColor: '#2563eb', template: 'professional', fontSize: 11, customSections: []
        });
        setCurrentResumeId(null);
        navigate('/editor');
    };

    const handleEdit = (resume) => {
        setResumeData(resume.content);
        setCurrentResumeId(resume.id);
        navigate('/editor');
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this resume?')) {
            try {
                await api.delete(`/resumes/${id}`);
                setSavedResumes(prev => prev.filter(r => r.id !== id));
            } catch (error) {
                console.error('Failed to delete resume', error);
            }
        }
    };

    if (isLoading) {
        return <Loader text="Loading your resumes..." />;
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1 className="dashboard-title">My Resumes</h1>
                <div className="dashboard-actions">
                    <button onClick={handleCreateNew} className="btn-primary">
                        + Create New
                    </button>
                    <button onClick={logoutUser} className="btn-danger">
                        Logout
                    </button>
                </div>
            </header>

            {savedResumes.length === 0 ? (
                <div className="empty-state">
                    <span className="empty-icon">📄</span>
                    <h3 className="empty-text">You haven't created any resumes yet.</h3>
                    <button onClick={handleCreateNew} className="btn-primary">
                        Start Building Your First Resume
                    </button>
                </div>
            ) : (
                <div className="resume-grid">
                    {savedResumes.map(resume => (
                        <div key={resume.id} className="resume-card">
                            <div className="resume-preview-placeholder">
                                📝
                            </div>
                            <div className="resume-info">
                                <h3 className="resume-title">{resume.title}</h3>
                                <p className="resume-date">Last updated: {new Date(resume.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <div className="card-actions">
                                <button onClick={() => handleEdit(resume)} className="btn-card">Edit</button>
                                <button onClick={() => handleDelete(resume.id)} className="btn-card" style={{ color: '#dc2626' }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
