import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, FileText, BookmarkPlus, Calendar,
    MapPin, Clock, DollarSign, Building2, ExternalLink, Trash2, Sun, Moon, CheckCircle, Bookmark
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SavedJobs = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [savedJobs, setSavedJobs] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        loadSavedJobs();
        window.addEventListener('storage', loadSavedJobs);
        return () => window.removeEventListener('storage', loadSavedJobs);
    }, []);

    const loadSavedJobs = () => {
        // Load saved jobs for this user from localStorage
        const allSavedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const mySavedJobs = allSavedJobs.filter(job => job.studentId === userId);
        setSavedJobs(mySavedJobs);
    };

    const handleApply = (job) => {
        // Check if already applied
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        const alreadyApplied = applications.some(app => 
            app.jobId === job.id && app.studentId === userId
        );

        if (alreadyApplied) {
            setSuccessMessage('You have already applied to this job!');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            return;
        }

        const application = {
            id: Date.now().toString(),
            jobId: job.id,
            jobTitle: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            logo: job.logo,
            studentId: userId,
            studentEmail: email,
            studentName: sessionStorage.getItem('userName') || email.split('@')[0],
            appliedDate: new Date().toISOString(),
            status: 'Under Review',
            statusColor: '#f59e0b'
        };

        // Save to localStorage
        applications.push(application);
        localStorage.setItem('applications', JSON.stringify(applications));

        // Show success message
        setSuccessMessage('Job applied successfully!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>

            {/* Success Notification */}
            {showSuccess && (
                <div style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    zIndex: 1000,
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    <div className="glass" style={{
                        padding: '1rem 1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid #10b981'
                    }}>
                        <CheckCircle size={20} style={{ color: '#10b981' }} />
                        <span style={{ color: '#10b981', fontWeight: 500 }}>{successMessage}</span>
                    </div>
                </div>
            )}

            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>NexStep</h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
                            <Briefcase size={20} /> <span>Browse Jobs</span>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', cursor: 'pointer' }} onClick={() => navigate('/applications')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
                            <FileText size={20} /> <span>My Applications</span>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)' }}>
                            <BookmarkPlus size={20} /> <span style={{ fontWeight: 600 }}>Saved Jobs</span>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', cursor: 'pointer' }} onClick={() => navigate('/interviews')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
                            <Calendar size={20} /> <span>Interviews</span>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
                            <User size={20} /> <span>Profile</span>
                        </div>
                    </div>
                </nav>

                <button onClick={handleLogout} className="btn btn-outline" style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Saved Jobs</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Jobs you've bookmarked for later</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <button 
                            onClick={toggleTheme}
                            className="glass-card"
                            style={{ 
                                padding: '0.6rem', 
                                borderRadius: '50%', 
                                cursor: 'pointer',
                                background: 'transparent',
                                border: '1px solid var(--glass-border)'
                            }}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <div className="glass-card" style={{ padding: '0.6rem', borderRadius: '50%', cursor: 'pointer' }}>
                            <Bell size={20} />
                        </div>
                        <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={18} />
                            </div>
                            <span style={{ fontSize: '0.9rem' }}>Student</span>
                        </div>
                    </div>
                </div>

                <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--text-gray)' }}>
                    {savedJobs.length} jobs saved
                </h2>

                {/* Empty State */}
                {savedJobs.length === 0 ? (
                    <div className="glass animate-fade-in" style={{ 
                        padding: '3rem', 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <Bookmark size={64} style={{ color: 'var(--primary)', opacity: 0.5 }} />
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Saved Jobs Yet</h3>
                        <p style={{ color: 'var(--text-gray)', maxWidth: '500px', lineHeight: 1.6 }}>
                            Browse available jobs and click the bookmark icon to save them for later. Your saved jobs will appear here.
                        </p>
                    </div>
                ) : (
                    /* Job Listings */
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {savedJobs.map((job, i) => (
                        <div key={job.id} className="glass animate-fade-in" style={{ padding: '2rem', animationDelay: `${i * 0.05}s` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div style={{ display: 'flex', gap: '1.5rem', flex: 1 }}>
                                    <div style={{ 
                                        width: '64px', 
                                        height: '64px', 
                                        borderRadius: '12px', 
                                        background: 'rgba(99, 102, 241, 0.1)', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        fontSize: '2rem'
                                    }}>
                                        {job.logo}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{job.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <Building2 size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>{job.company}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <MapPin size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>{job.location}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <Clock size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>Saved: {job.savedDate}</span>
                                            </div>
                                        </div>
                                        <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', lineHeight: 1.6 }}>
                                            {job.description}
                                        </p>
                                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                            {job.skills.map(skill => (
                                                <span key={skill} className="glass-card" style={{ 
                                                    padding: '0.4rem 1rem', 
                                                    fontSize: '0.85rem',
                                                    background: 'rgba(99, 102, 241, 0.1)',
                                                    color: 'var(--primary)'
                                                }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end', minWidth: '200px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontSize: '1.2rem', fontWeight: 600, justifyContent: 'flex-end' }}>
                                            <DollarSign size={20} />
                                            <span>{job.salary}</span>
                                        </div>
                                        <span className="glass-card" style={{ 
                                            padding: '0.3rem 0.8rem', 
                                            fontSize: '0.8rem',
                                            display: 'inline-block',
                                            marginTop: '0.5rem'
                                        }}>
                                            {job.type}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button className="btn btn-outline" style={{ padding: '0.6rem', borderRadius: '8px', color: '#ef4444', borderColor: '#ef4444' }}>
                                            <Trash2 size={18} />
                                        </button>
                                        <button 
                                            className="btn btn-primary" 
                                            style={{ padding: '0.6rem 1.5rem' }}
                                            onClick={() => handleApply(job)}
                                        >
                                            <ExternalLink size={18} /> Apply
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SavedJobs;
