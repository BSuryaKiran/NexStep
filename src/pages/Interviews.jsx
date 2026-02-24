import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, FileText, BookmarkPlus, Calendar,
    MapPin, Clock, Building2, Video, Phone, Users, CheckCircle, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Interviews = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const userId = sessionStorage.getItem('userId') || email;
    const navigate = useNavigate();
    const [interviews, setInterviews] = useState([]);
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        loadInterviews();
        window.addEventListener('storage', loadInterviews);
        return () => window.removeEventListener('storage', loadInterviews);
    }, []);

    const loadInterviews = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
        const myInterviews = allApplications.filter(app => 
            app.studentId === userId && app.status === 'Interview Scheduled'
        );
        setInterviews(myInterviews);
    };

    const upcomingInterviews = interviews;

    const pastInterviews = [];

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>

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
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', cursor: 'pointer' }} onClick={() => navigate('/saved-jobs')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
                            <BookmarkPlus size={20} /> <span>Saved Jobs</span>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)' }}>
                            <Calendar size={20} /> <span style={{ fontWeight: 600 }}>Interviews</span>
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
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Interviews</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Manage your interview schedule</p>
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

                {/* Upcoming Interviews */}
                <div style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Upcoming Interviews ({upcomingInterviews.length})</h2>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {upcomingInterviews.map((interview, i) => (
                            <div key={interview.id} className="glass animate-fade-in" style={{ padding: '2rem', animationDelay: `${i * 0.05}s` }}>
                                <div style={{ display: 'flex', gap: '1.5rem' }}>
                                    <div style={{ 
                                        width: '80px', 
                                        height: '80px', 
                                        borderRadius: '12px', 
                                        background: 'rgba(99, 102, 241, 0.1)', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        fontSize: '2.5rem',
                                        flexShrink: 0
                                    }}>
                                        {interview.logo}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{interview.jobTitle}</h3>
                                                <p style={{ fontSize: '1.05rem', color: 'var(--text-gray)' }}>{interview.company}</p>
                                            </div>
                                            <span className="glass-card" style={{ 
                                                padding: '0.4rem 1rem', 
                                                fontSize: '0.85rem',
                                                background: 'rgba(99, 102, 241, 0.1)',
                                                color: 'var(--primary)'
                                            }}>
                                                {interview.status}
                                            </span>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                            {interview.examDate && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                    <Calendar size={16} />
                                                    <span style={{ fontSize: '0.95rem' }}>Exam: {new Date(interview.examDate).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <MapPin size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>{interview.location}</span>
                                            </div>
                                            {interview.mode && (
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                    {interview.mode === 'Online' && <Video size={16} />}
                                                    {interview.mode === 'Offline' && <MapPin size={16} />}
                                                    {interview.mode === 'Hybrid' && <Building2 size={16} />}
                                                    <span style={{ fontSize: '0.95rem' }}>Mode: {interview.mode}</span>
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <Clock size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>Applied: {new Date(interview.appliedDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>

                                        {interview.interviewDetails && (
                                            <div className="glass-card" style={{ 
                                                padding: '0.8rem 1rem', 
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                marginBottom: '1rem'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                                    <Users size={16} style={{ color: '#3b82f6', marginTop: '2px' }} />
                                                    <div style={{ flex: 1 }}>
                                                        <span style={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Interview Details:</span>
                                                        <span style={{ color: '#3b82f6', fontSize: '0.9rem' }}>{interview.interviewDetails}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {interview.location && (
                                            <div className="glass-card" style={{ 
                                                padding: '0.8rem 1rem', 
                                                background: 'rgba(99, 102, 241, 0.05)',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}>
                                                <MapPin size={16} style={{ color: 'var(--primary)' }} />
                                                <span style={{ color: 'var(--primary)', fontSize: '0.9rem' }}>{interview.location}</span>
                                            </div>
                                        )}

                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                            <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                                                View Details
                                            </button>
                                            <button className="btn btn-outline" style={{ padding: '0.6rem 1.5rem' }}>
                                                Reschedule
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Past Interviews */}
                <div>
                    <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Past Interviews</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                        {pastInterviews.map((interview, i) => (
                            <div key={interview.id} className="glass animate-fade-in" style={{ padding: '1.5rem', animationDelay: `${i * 0.05}s` }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'start' }}>
                                    <div style={{ 
                                        width: '60px', 
                                        height: '60px', 
                                        borderRadius: '10px', 
                                        background: 'rgba(99, 102, 241, 0.1)', 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        fontSize: '2rem',
                                        flexShrink: 0
                                    }}>
                                        {interview.logo}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{interview.title}</h3>
                                        <p style={{ fontSize: '0.95rem', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>{interview.company}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                                            <Calendar size={14} style={{ color: 'var(--text-gray)' }} />
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{interview.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                                            <span className="glass-card" style={{ 
                                                padding: '0.3rem 0.8rem', 
                                                fontSize: '0.75rem',
                                                background: interview.result === 'Selected' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: interview.result === 'Selected' ? '#10b981' : '#ef4444'
                                            }}>
                                                {interview.result}
                                            </span>
                                            <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{interview.round}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interviews;
