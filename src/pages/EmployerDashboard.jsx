import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, Users, BarChart3,
    Plus, Edit, Trash2, Eye, MapPin, DollarSign, Calendar,
    TrendingUp, Building2, CheckCircle
} from 'lucide-react';

const EmployerDashboard = () => {
    const email = sessionStorage.getItem('userEmail') || 'employer@demo.com';
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [activeTab, setActiveTab] = useState('jobs');

    const [newJob, setNewJob] = useState({
        title: '', location: '', type: 'Full-time',
        salary: '', description: '', skills: '', deadline: ''
    });

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const [postedJobs, setPostedJobs] = useState([
        { id: 1, title: 'Senior Frontend Developer', location: 'Bangalore, India', type: 'Full-time', salary: '₹15-20 LPA', posted: '2 days ago', applications: 45, status: 'Active', deadline: '2026-03-15' },
        { id: 2, title: 'Product Manager', location: 'Mumbai, India', type: 'Full-time', salary: '₹20-25 LPA', posted: '1 week ago', applications: 78, status: 'Active', deadline: '2026-03-20' },
        { id: 3, title: 'Data Science Intern', location: 'Remote', type: 'Internship', salary: '₹40k/month', posted: '5 days ago', applications: 123, status: 'Active', deadline: '2026-03-10' }
    ]);

    const stats = [
        { label: 'Total Applications', value: '246', icon: Users, color: '#6366f1' },
        { label: 'Active Jobs', value: '3', icon: Briefcase, color: '#10b981' },
        { label: 'Hired This Month', value: '8', icon: TrendingUp, color: '#f59e0b' }
    ];

    const applications = [
        { id: 1, name: 'Rahul Sharma', role: 'Senior Frontend Developer', college: 'IIT Bombay', cgpa: '8.9', appliedDate: '2026-02-16', status: 'Under Review' },
        { id: 2, name: 'Priya Patel', role: 'Senior Frontend Developer', college: 'NIT Trichy', cgpa: '9.1', appliedDate: '2026-02-15', status: 'Shortlisted' },
        { id: 3, name: 'Amit Kumar', role: 'Product Manager', college: 'IIM Ahmedabad', cgpa: '8.5', appliedDate: '2026-02-14', status: 'Interview Scheduled' },
        { id: 4, name: 'Sneha Reddy', role: 'Data Science Intern', college: 'BITS Pilani', cgpa: '8.7', appliedDate: '2026-02-13', status: 'Offer Sent' },
        { id: 5, name: 'Ravi Singh', role: 'Product Manager', college: 'VIT Vellore', cgpa: '7.8', appliedDate: '2026-02-12', status: 'Rejected' },
    ];

    const statusColor = (status) => {
        if (status === 'Shortlisted' || status === 'Offer Sent') return { bg: 'rgba(16,185,129,0.1)', color: '#10b981' };
        if (status === 'Rejected') return { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' };
        if (status === 'Interview Scheduled') return { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' };
        return { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' };
    };

    const handleCreateJob = (e) => {
        e.preventDefault();
        const job = {
            id: postedJobs.length + 1,
            title: newJob.title, location: newJob.location,
            type: newJob.type, salary: newJob.salary,
            posted: 'Just now', applications: 0,
            status: 'Active', deadline: newJob.deadline
        };
        setPostedJobs([job, ...postedJobs]);
        setShowCreateModal(false);
        setNewJob({ title: '', location: '', type: 'Full-time', salary: '', description: '', skills: '', deadline: '' });
    };

    const navItems = [
        { key: 'jobs', icon: Briefcase, label: 'My Job Posts' },
        { key: 'applications', icon: Users, label: 'Applications' },
        { key: 'analytics', icon: BarChart3, label: 'Analytics' },
        { key: 'company', icon: Building2, label: 'Company Profile' },
    ];

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>

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
                        <div className="glass-card" style={{ padding: '0.6rem', borderRadius: '50%', cursor: 'pointer' }}>
                            <Bell size={20} />
                        </div>
                        <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={18} />
                            </div>
                            <span style={{ fontSize: '0.9rem' }}>Employer</span>
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
                                            <button className="btn btn-outline" style={{ padding: '0.6rem', borderRadius: '8px', color: '#ef4444', borderColor: '#ef4444' }}><Trash2 size={18} /></button>
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {applications.map(app => {
                                const sc = statusColor(app.status);
                                return (
                                    <div key={app.id} className="glass-card" style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>{app.name.charAt(0)}</div>
                                            <div>
                                                <h4 style={{ fontSize: '1.1rem' }}>{app.name}</h4>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Applied for {app.role}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{app.college} · CGPA: {app.cgpa}</p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span className="glass-card" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem', background: sc.bg, color: sc.color }}>{app.status}</span>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.3rem' }}>{app.appliedDate}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
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
                                <input className="form-input" defaultValue="Tech Solutions Ltd" />
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
        </div>
    );
};

export default EmployerDashboard;
