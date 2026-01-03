import { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

const initialResumeState = {
    personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        portfolio: '',
        summary: ''
    },
    experience: [], // { id, title, company, location, startDate, endDate, current, description }
    education: [], // { id, degree, school, location, startDate, endDate, current, description }
    skills: [], // { id, name, level }
    projects: [], // { id, name, description, link }
    certifications: [],
    languages: [],
    themeColor: '#2563eb', // Default blue
    template: 'professional', // professional | modern
    fontSize: 11, // Font size in pt
    customSections: [] // Array of { id, title, items: [] }
};

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState(initialResumeState);

    const updatePersonalInfo = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [field]: value
            }
        }));
    };

    const addSectionItem = (section) => {
        const newItem = {
            id: Date.now(),
            // Default fields based on section
            ...(section === 'experience' && { title: '', company: '', location: '', startDate: '', endDate: '', current: false, description: '' }),
            ...(section === 'education' && { school: '', degree: '', startDate: '', endDate: '', current: false }),
            ...(section === 'skills' && { name: '', level: '' }),
            ...(section === 'projects' && { name: '', description: '', link: '' }),
            ...(section === 'languages' && { name: '', proficiency: '' }),
        };

        setResumeData(prev => ({
            ...prev,
            [section]: [...(prev[section] || []), newItem]
        }));
    };

    const removeSectionItem = (section, id) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].filter(item => item.id !== id)
        }));
    };

    const updateSectionItem = (section, id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            [section]: prev[section].map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        }));
    };

    const updateSection = (section, data) => {
        setResumeData(prev => ({
            ...prev,
            [section]: data
        }));
    };

    const updateTheme = (color) => {
        setResumeData(prev => ({ ...prev, themeColor: color }));
    };

    const updateTemplate = (templateId) => {
        setResumeData(prev => ({ ...prev, template: templateId }));
    };

    const updateFontSize = (size) => {
        setResumeData(prev => ({ ...prev, fontSize: size }));
    };

    // --- Custom Sections Logic ---

    const addCustomSection = (title = 'Custom Section') => {
        const newSection = {
            id: Date.now(),
            title,
            items: []
        };
        setResumeData(prev => ({
            ...prev,
            customSections: [...prev.customSections, newSection]
        }));
    };

    const removeCustomSection = (sectionId) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.filter(s => s.id !== sectionId)
        }));
    };

    const updateCustomSectionTitle = (sectionId, title) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s =>
                s.id === sectionId ? { ...s, title } : s
            )
        }));
    };

    const addCustomItem = (sectionId) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        items: [...s.items, { id: Date.now(), title: '', subtitle: '', description: '' }]
                    };
                }
                return s;
            })
        }));
    };

    const removeCustomItem = (sectionId, itemId) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        items: s.items.filter(item => item.id !== itemId)
                    };
                }
                return s;
            })
        }));
    };

    const updateCustomItem = (sectionId, itemId, field, value) => {
        setResumeData(prev => ({
            ...prev,
            customSections: prev.customSections.map(s => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        items: s.items.map(item =>
                            item.id === itemId ? { ...item, [field]: value } : item
                        )
                    };
                }
                return s;
            })
        }));
    };

    // --- Auth & Backend Integration ---
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [savedResumes, setSavedResumes] = useState([]);
    const [currentResumeId, setCurrentResumeId] = useState(null);

    const loginUser = (userData, tokenData) => {
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem('token', tokenData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logoutUser = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setResumeData(initialResumeState);
        setCurrentResumeId(null);
    };

    // Initialize user from local storage
    useState(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    return (
        <ResumeContext.Provider value={{
            resumeData,
            setResumeData,
            updatePersonalInfo,
            addSectionItem,
            removeSectionItem,
            updateSectionItem,
            updateSection,
            updateTheme,
            updateTemplate,
            updateFontSize,
            addCustomSection,
            removeCustomSection,
            updateCustomSectionTitle,
            addCustomItem,
            removeCustomItem,
            updateCustomItem,
            // Auth & Backend
            user,
            token,
            savedResumes,
            setSavedResumes,
            loginUser,
            logoutUser,
            currentResumeId,
            setCurrentResumeId
        }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
