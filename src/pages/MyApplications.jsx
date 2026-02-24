import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, FileText, BookmarkPlus, Calendar,
    MapPin, Clock, Building2, Eye, Trash2, CheckCircle, XCircle, AlertCircle, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const MyApplications = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const userId = sessionStorage.getItem('userId');
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');
    const [applications, setApplications] = useState([]);
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        loadApplications();
        window.addEventListener('storage', loadApplications);
        return () => window.removeEventListener('storage', loadApplications);
    }, []);

    const loadApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
        const myApps = allApplications.filter(app => app.studentId === userId);
        setApplications(myApps);
    };

    const stats = [
        { label: 'Total Applications', value: applications.length.toString(), color: '#6366f1' },
        { label: 'Under Review', value: applications.filter(a => a.status === 'Under Review').length.toString(), color: '#f59e0b' },
        { label: 'Interviews', value: applications.filter(a => a.status === 'Interview Scheduled').length.toString(), color: '#3b82f6' },
        { label: 'Offers', value: applications.filter(a => a.status === 'Offer Received').length.toString(), color: '#10b981' }
    ];

    const filteredApplications = applications.filter(app => {
        if (filter === 'all') return true;
        if (filter === 'pending') return app.status === 'Under Review';
        if (filter === 'interview') return app.status === 'Interview Scheduled';
        if (filter === 'offer') return app.status === 'Offer Received';
        return true;
    });

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
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)' }}>
                            <FileText size={20} /> <span style={{ fontWeight: 600 }}>My Applications</span>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', cursor: 'pointer' }} onClick={() => navigate('/saved-jobs')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
                            <BookmarkPlus size={20} /> <span>Saved Jobs</span>
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
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>My Applications</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Track all your job applications</p>
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

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="glass animate-fade-in" style={{ padding: '1.5rem', animationDelay: `${i * 0.1}s` }}>
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: stat.color }}>{stat.value}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { id: 'all', label: 'All Applications' },
                        { id: 'pending', label: 'Under Review' },
                        { id: 'interview', label: 'Interviews' },
                        { id: 'offer', label: 'Offers' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id)}
                            className={filter === tab.id ? 'btn btn-primary' : 'btn btn-outline'}
                            style={{ padding: '0.6rem 1.5rem' }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Applications List */}
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {filteredApplications.map((app, i) => (
                        <div key={app.id} className="glass animate-fade-in" style={{ padding: '2rem', animationDelay: `${i * 0.05}s` }}>
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
                                        {app.logo}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.3rem' }}>{app.jobTitle}</h3>
                                            <span className="glass-card" style={{ 
                                                padding: '0.3rem 1rem', 
                                                fontSize: '0.85rem',
                                                background: `${app.statusColor}15`,
                                                color: app.statusColor
                                            }}>
                                                {app.status}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <Building2 size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>{app.company}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <MapPin size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>{app.location}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <Clock size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                        
                                        {/* Exam Date and Mode */}
                                        {app.examDate && (
                                            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.8rem', flexWrap: 'wrap' }}>
                                                <div className="glass-card" style={{ 
                                                    padding: '0.6rem 1rem', 
                                                    background: 'rgba(245, 158, 11, 0.1)',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}>
                                                    <Calendar size={16} style={{ color: '#f59e0b' }} />
                                                    <span style={{ color: '#f59e0b', fontSize: '0.9rem' }}>Exam: {new Date(app.examDate).toLocaleDateString()}</span>
                                                </div>
                                                {app.mode && (
                                                    <div className="glass-card" style={{ 
                                                        padding: '0.6rem 1rem', 
                                                        background: 'rgba(99, 102, 241, 0.1)',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}>
                                                        <span style={{ color: '#6366f1', fontSize: '0.9rem' }}>Mode: {app.mode}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        
                                        {/* Interview Details */}
                                        {app.interviewDetails && (
                                            <div className="glass-card" style={{ 
                                                padding: '0.8rem 1rem', 
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                marginBottom: '0.5rem'
                                            }}>
                                                <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                                                    <Calendar size={16} style={{ color: '#3b82f6', marginTop: '2px' }} />
                                                    <div style={{ flex: 1 }}>
                                                        <span style={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>Interview Details:</span>
                                                        <span style={{ color: '#3b82f6', fontSize: '0.9rem' }}>{app.interviewDetails}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end', minWidth: '150px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--primary)' }}>{app.salary}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button className="btn btn-outline" style={{ padding: '0.6rem', borderRadius: '8px' }}>
                                            <Eye size={18} />
                                        </button>
                                        <button className="btn btn-outline" style={{ padding: '0.6rem', borderRadius: '8px', color: '#ef4444', borderColor: '#ef4444' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyApplications;
