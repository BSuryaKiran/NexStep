import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, FileText, BookmarkPlus, Calendar,
    MapPin, Clock, DollarSign, Building2, ExternalLink, Trash2
} from 'lucide-react';

const SavedJobs = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const savedJobs = [
        {
            id: 1,
            title: 'UI/UX Designer',
            company: 'Adobe',
            location: 'Remote',
            type: 'Full-time',
            salary: '₹12-16 LPA',
            savedDate: '2 days ago',
            logo: '🎨',
            skills: ['Figma', 'Adobe XD', 'Sketch'],
            description: 'Design beautiful and intuitive user interfaces.'
        },
        {
            id: 2,
            title: 'Backend Engineer',
            company: 'Netflix',
            location: 'Bangalore, India',
            type: 'Full-time',
            salary: '₹18-25 LPA',
            savedDate: '4 days ago',
            logo: '🎬',
            skills: ['Java', 'Spring Boot', 'Microservices'],
            description: 'Build highly scalable streaming infrastructure.'
        },
        {
            id: 3,
            title: 'Mobile Developer',
            company: 'Uber',
            location: 'Hyderabad, India',
            type: 'Full-time',
            salary: '₹14-20 LPA',
            savedDate: '1 week ago',
            logo: '🚗',
            skills: ['React Native', 'iOS', 'Android'],
            description: 'Create seamless mobile experiences for millions of users.'
        },
        {
            id: 4,
            title: 'DevOps Engineer',
            company: 'AWS',
            location: 'Mumbai, India',
            type: 'Full-time',
            salary: '₹16-22 LPA',
            savedDate: '1 week ago',
            logo: '☁️',
            skills: ['Docker', 'Kubernetes', 'AWS'],
            description: 'Build and maintain cloud infrastructure.'
        }
    ];

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

                {/* Job Listings */}
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
                                        <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                                            <ExternalLink size={18} /> Apply
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

export default SavedJobs;
