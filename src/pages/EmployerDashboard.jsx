import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, Users, BarChart3,
    Plus, Edit, Trash2, Eye, MapPin, DollarSign, Calendar,
    TrendingUp, Building2, CheckCircle, Sun, Moon, X, Check
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const EmployerDashboard = () => {
    const email = sessionStorage.getItem('userEmail') || 'recruiter@demo.com';
    const userId = sessionStorage.getItem('userId');
    const companyName = sessionStorage.getItem('userCompany') || email.split('@')[0];
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeTab, setActiveTab] = useState('jobs');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [selectedApplication, setSelectedApplication] = useState(null);
    const { theme, toggleTheme } = useTheme();

    const [newJob, setNewJob] = useState({
        title: '', location: '', type: 'Full-time',
        salary: '', description: '', skills: '', deadline: '',
        examDate: '', interviewDetails: '', mode: 'Online'
    });

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    // Load jobs from localStorage
    const [postedJobs, setPostedJobs] = useState([]);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadJobs();
        loadApplications();
        // Listen for storage changes
        window.addEventListener('storage', () => {
            loadJobs();
            loadApplications();
        });
        return () => window.removeEventListener('storage', () => {
            loadJobs();
            loadApplications();
        });
    }, []);

    const loadJobs = () => {
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const myJobs = jobs.filter(job => job.recruiterId === userId);
        setPostedJobs(myJobs);
    };

    const loadApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const myJobIds = jobs.filter(job => job.recruiterId === userId).map(job => job.id);
        const myApplications = allApplications.filter(app => myJobIds.includes(app.jobId));
        setApplications(myApplications);
    };

    const stats = [
        { label: 'Total Applications', value: applications.length.toString(), icon: Users, color: '#6366f1' },
        { label: 'Active Jobs', value: postedJobs.length.toString(), icon: Briefcase, color: '#10b981' },
        { label: 'Hired This Month', value: applications.filter(a => a.status === 'Offer Sent').length.toString(), icon: TrendingUp, color: '#f59e0b' }
    ];

    const statusColor = (status) => {
        if (status === 'Shortlisted' || status === 'Offer Sent') return { bg: 'rgba(16,185,129,0.1)', color: '#10b981' };
        if (status === 'Rejected') return { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' };
        if (status === 'Interview Scheduled') return { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' };
        return { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' };
    };

    const handleCreateJob = (e) => {
        e.preventDefault();
        const companyName = sessionStorage.getItem('userCompany') || email.split('@')[0];
        const job = {
            id: Date.now().toString(),
            title: newJob.title,
            location: newJob.location,
            type: newJob.type,
            salary: newJob.salary,
            description: newJob.description,
            skills: newJob.skills.split(',').map(s => s.trim()).filter(s => s),
            posted: 'Just now',
            postedDate: new Date().toISOString(),
            applications: 0,
            status: 'Active',
            deadline: newJob.deadline,
            examDate: newJob.examDate,
            interviewDetails: newJob.interviewDetails,
            mode: newJob.mode,
            company: companyName,
            logo: '🏢',
            recruiterId: userId,
            recruiterEmail: email
        };
        
        // Save to localStorage
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        jobs.unshift(job);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        
        // Reload jobs
        loadJobs();
        
        setShowCreateModal(false);
        setNewJob({ 
            title: '', location: '', type: 'Full-time', 
            salary: '', description: '', skills: '', deadline: '',
            examDate: '', interviewDetails: '', mode: 'Online'
        });
        
        // Show success message
        setSuccessMessage('Job successfully posted!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleDeleteJob = (jobId) => {
        const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        const updatedJobs = jobs.filter(job => job.id !== jobId);
        localStorage.setItem('jobs', JSON.stringify(updatedJobs));
        loadJobs();
    };

    const handleUpdateApplicationStatus = (applicationId, newStatus) => {
        const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
        const updatedApplications = allApplications.map(app => {
            if (app.id === applicationId) {
                return { ...app, status: newStatus, statusColor: newStatus === 'Interview Scheduled' ? '#3b82f6' : newStatus === 'Rejected' ? '#ef4444' : app.statusColor };
            }
            return app;
        });
        localStorage.setItem('applications', JSON.stringify(updatedApplications));
        loadApplications();
        
        // Show success message
        setSuccessMessage(`Application ${newStatus.toLowerCase()}!`);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const navItems = [
        { key: 'jobs', icon: Briefcase, label: 'My Job Posts' },
        { key: 'applications', icon: Users, label: 'Applications' },
        { key: 'analytics', icon: BarChart3, label: 'Analytics' },
        { key: 'company', icon: Building2, label: 'Company Profile' },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>

            {/* Success Notification */}
            {showSuccess && (
                <div style={{
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    zIndex: 1000,
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '12px',
                    boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    animation: 'slideInRight 0.3s ease'
                }}>
                    <CheckCircle size={24} />
                    <span style={{ fontWeight: 600, fontSize: '1rem' }}>{successMessage}</span>
                </div>
            )}

            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem' }}>NexStep</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    {navItems.map(({ key, icon: Icon, label }) => (
                        <div
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className="glass-card"
                            style={{
                                padding: '0.8rem 1.2rem',
                                background: activeTab === key ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
                                border: activeTab === key ? '1px solid var(--primary)' : '1px solid transparent',
                                cursor: 'pointer'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: activeTab === key ? 'var(--primary)' : 'var(--text-gray)' }}>
                                <Icon size={20} />
                                <span style={{ fontWeight: activeTab === key ? 600 : 400 }}>{label}</span>
                            </div>
                        </div>
                    ))}
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
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Hello, {email.split('@')[0]}</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Manage your job postings and find top talent</p>
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
                            <span style={{ fontSize: '0.9rem' }}>Recruiter</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="glass animate-fade-in" style={{ padding: '1.5rem', animationDelay: `${i * 0.1}s` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{ padding: '0.8rem', borderRadius: '12px', background: `${stat.color}15`, color: stat.color }}>
                                    <stat.icon size={20} />
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{stat.value}</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'jobs' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Your Job Postings</h2>
                            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
                                <Plus size={18} /> Post New Job
                            </button>
                        </div>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            {postedJobs.map((job, i) => (
                                <div key={job.id} className="glass animate-fade-in" style={{ padding: '2rem', animationDelay: `${i * 0.05}s` }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                                <h3 style={{ fontSize: '1.3rem' }}>{job.title}</h3>
                                                <span className="glass-card" style={{ padding: '0.3rem 1rem', fontSize: '0.85rem', background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>{job.status}</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem', flexWrap: 'wrap', color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} />{job.location}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><DollarSign size={16} />{job.salary}</div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} />Deadline: {job.deadline}</div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '2rem' }}>
                                                <div><p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Posted</p><p style={{ fontWeight: 500 }}>{job.posted}</p></div>
                                                <div><p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Applications</p><p style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--primary)' }}>{job.applications}</p></div>
                                                <div><p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Type</p><p style={{ fontWeight: 500 }}>{job.type}</p></div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.8rem', marginLeft: '2rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.6rem', borderRadius: '8px' }} onClick={() => setActiveTab('applications')}><Eye size={18} /></button>
                                            <button className="btn btn-outline" style={{ padding: '0.6rem', borderRadius: '8px' }}><Edit size={18} /></button>
                                            <button 
                                                className="btn btn-outline" 
                                                style={{ padding: '0.6rem', borderRadius: '8px', color: '#ef4444', borderColor: '#ef4444' }}
                                                onClick={() => handleDeleteJob(job.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === 'applications' && (
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Applications Overview</h2>
                        {applications.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                                <Users size={48} style={{ color: 'var(--text-gray)', marginBottom: '1rem' }} />
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-gray)' }}>No Applications Yet</h3>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>Applications will appear here once students apply to your jobs.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {applications.map(app => {
                                    const sc = statusColor(app.status);
                                    return (
                                        <div key={app.id} className="glass-card" style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: 1 }}>
                                                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1.2rem' }}>
                                                        {app.studentName ? app.studentName.charAt(0).toUpperCase() : 'S'}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                                            <h4 style={{ fontSize: '1.1rem' }}>{app.studentName || 'Student'}</h4>
                                                            <span className="glass-card" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', background: sc.bg, color: sc.color }}>{app.status}</span>
                                                        </div>
                                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', marginBottom: '0.3rem' }}>Applied for: {app.jobTitle}</p>
                                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Email: {app.studentEmail} · Applied: {new Date(app.appliedDate).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.8rem' }}>
                                                    <button 
                                                        className="btn btn-outline" 
                                                        style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                                                        onClick={() => setSelectedApplication(app)}
                                                        title="View Profile"
                                                    >
                                                        <Eye size={16} /> View
                                                    </button>
                                                    {app.status === 'Under Review' && (
                                                        <>
                                                            <button 
                                                                className="btn" 
                                                                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', background: '#10b981', color: 'white' }}
                                                                onClick={() => handleUpdateApplicationStatus(app.id, 'Interview Scheduled')}
                                                                title="Accept Application"
                                                            >
                                                                <Check size={16} /> Accept
                                                            </button>
                                                            <button 
                                                                className="btn" 
                                                                style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', background: '#ef4444', color: 'white' }}
                                                                onClick={() => handleUpdateApplicationStatus(app.id, 'Rejected')}
                                                                title="Reject Application"
                                                            >
                                                                <X size={16} /> Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'analytics' && (
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Platform Analytics</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>Job Views</h4>
                                <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>1,240</p>
                                <p style={{ color: '#10b981', fontSize: '0.85rem' }}>+12% vs last week</p>
                            </div>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>Applications</h4>
                                <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>246</p>
                                <p style={{ color: '#10b981', fontSize: '0.85rem' }}>+5% vs last week</p>
                            </div>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>Hires This Month</h4>
                                <p style={{ fontSize: '1.8rem', fontWeight: 700 }}>8</p>
                                <p style={{ color: '#f59e0b', fontSize: '0.85rem' }}>Stable</p>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1.2rem' }}>Application Status Breakdown</h4>
                                {[
                                    { label: 'Under Review', count: 2, pct: 40, color: '#f59e0b' },
                                    { label: 'Shortlisted', count: 1, pct: 20, color: '#6366f1' },
                                    { label: 'Offer Sent', count: 1, pct: 20, color: '#10b981' },
                                    { label: 'Rejected', count: 1, pct: 20, color: '#ef4444' },
                                ].map((item, i) => (
                                    <div key={i} style={{ marginBottom: '1rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                                            <span style={{ fontSize: '0.9rem' }}>{item.label}</span>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>{item.count}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                            <div style={{ width: `${item.pct}%`, height: '100%', background: item.color, borderRadius: '10px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ marginBottom: '1.2rem' }}>Top Performing Jobs</h4>
                                {postedJobs.map((job, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 0', borderBottom: i < postedJobs.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                                        <div>
                                            <p style={{ fontWeight: 500, fontSize: '0.9rem' }}>{job.title}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{job.type}</p>
                                        </div>
                                        <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{job.applications} apps</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'company' && (
                    <div className="glass" style={{ padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Company Profile</h2>
                        <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
                            <div className="form-group">
                                <label className="form-label">Company Name</label>
                                <input className="form-input" defaultValue={companyName} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Industry</label>
                                <input className="form-input" defaultValue="Software & IT" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Website</label>
                                <input className="form-input" defaultValue="https://techsolutions.com" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input className="form-input" defaultValue="Bangalore, India" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Company Size</label>
                                <select className="form-input">
                                    <option>1-50 employees</option>
                                    <option selected>51-200 employees</option>
                                    <option>201-1000 employees</option>
                                    <option>1000+ employees</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">About</label>
                                <textarea className="form-input" rows="4" defaultValue="A leading provider of innovative software solutions." style={{ resize: 'vertical' }} />
                            </div>
                            <button className="btn btn-primary" style={{ width: 'fit-content' }}>
                                <CheckCircle size={18} /> Save Profile
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* Create Job Modal */}
            {showCreateModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, padding: '2rem'
                }}>
                    <div className="glass" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Post New Job</h2>
                        <form onSubmit={handleCreateJob}>
                            <div className="form-group">
                                <label className="form-label">Job Title *</label>
                                <input type="text" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} className="form-input" placeholder="e.g., Senior Software Engineer" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Location *</label>
                                <input type="text" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} className="form-input" placeholder="e.g., Bangalore, India or Remote" required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Job Type *</label>
                                    <select value={newJob.type} onChange={(e) => setNewJob({ ...newJob, type: e.target.value })} className="form-input" required>
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Internship">Internship</option>
                                        <option value="Contract">Contract</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Salary Range *</label>
                                    <input type="text" value={newJob.salary} onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })} className="form-input" placeholder="e.g., ₹10-15 LPA" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Application Deadline *</label>
                                <input type="date" value={newJob.deadline} onChange={(e) => setNewJob({ ...newJob, deadline: e.target.value })} className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Exam Date</label>
                                <input type="date" value={newJob.examDate} onChange={(e) => setNewJob({ ...newJob, examDate: e.target.value })} className="form-input" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Interview Mode *</label>
                                <select value={newJob.mode} onChange={(e) => setNewJob({ ...newJob, mode: e.target.value })} className="form-input" required>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Interview Details (Rounds, Process, etc.)</label>
                                <textarea 
                                    value={newJob.interviewDetails} 
                                    onChange={(e) => setNewJob({ ...newJob, interviewDetails: e.target.value })} 
                                    className="form-input" 
                                    placeholder="Round 1: Technical Test&#10;Round 2: HR Interview&#10;Round 3: Final Interview" 
                                    rows="4"
                                    style={{ resize: 'vertical' }}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Required Skills</label>
                                <input type="text" value={newJob.skills} onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })} className="form-input" placeholder="e.g., React, Node.js, Python (comma-separated)" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Job Description *</label>
                                <textarea value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="form-input" placeholder="Describe the role, responsibilities, and requirements..." rows="5" required style={{ resize: 'vertical' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                                    <Plus size={18} /> Post Job
                                </button>
                                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Student Profile Modal */}
            {selectedApplication && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 1000, padding: '2rem'
                }} onClick={() => setSelectedApplication(null)}>
                    <div className="glass" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>Student Profile</h2>
                            <button 
                                onClick={() => setSelectedApplication(null)} 
                                className="glass-card" 
                                style={{ padding: '0.5rem', cursor: 'pointer', background: 'transparent', border: '1px solid var(--glass-border)' }}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '2rem' }}>
                                    {selectedApplication.studentName ? selectedApplication.studentName.charAt(0).toUpperCase() : 'S'}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{selectedApplication.studentName || 'Student'}</h3>
                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>{selectedApplication.studentEmail}</p>
                                </div>
                            </div>

                            <div className="glass-card" style={{ padding: '1.5rem' }}>
                                <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Application Details</h4>
                                <div style={{ display: 'grid', gap: '0.8rem' }}>
                                    <div><span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Applied For:</span> <span style={{ fontWeight: 500 }}>{selectedApplication.jobTitle}</span></div>
                                    <div><span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Applied On:</span> <span style={{ fontWeight: 500 }}>{new Date(selectedApplication.appliedDate).toLocaleDateString()}</span></div>
                                    <div><span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Status:</span> <span style={{ fontWeight: 500 }}>{selectedApplication.status}</span></div>
                                    {selectedApplication.examDate && (
                                        <div><span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Exam Date:</span> <span style={{ fontWeight: 500 }}>{new Date(selectedApplication.examDate).toLocaleDateString()}</span></div>
                                    )}
                                    {selectedApplication.mode && (
                                        <div><span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Interview Mode:</span> <span style={{ fontWeight: 500 }}>{selectedApplication.mode}</span></div>
                                    )}
                                </div>
                            </div>

                            {selectedApplication.interviewDetails && (
                                <div className="glass-card" style={{ padding: '1.5rem' }}>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.8rem' }}>Interview Process</h4>
                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{selectedApplication.interviewDetails}</p>
                                </div>
                            )}

                            {selectedApplication.status === 'Under Review' && (
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button 
                                        className="btn" 
                                        style={{ flex: 1, justifyContent: 'center', background: '#10b981', color: 'white' }}
                                        onClick={() => {
                                            handleUpdateApplicationStatus(selectedApplication.id, 'Interview Scheduled');
                                            setSelectedApplication(null);
                                        }}
                                    >
                                        <Check size={18} /> Accept Application
                                    </button>
                                    <button 
                                        className="btn" 
                                        style={{ flex: 1, justifyContent: 'center', background: '#ef4444', color: 'white' }}
                                        onClick={() => {
                                            handleUpdateApplicationStatus(selectedApplication.id, 'Rejected');
                                            setSelectedApplication(null);
                                        }}
                                    >
                                        <X size={18} /> Reject Application
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployerDashboard;
