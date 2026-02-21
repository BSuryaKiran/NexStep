import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, LayoutDashboard, Search, Bell, User, Briefcase,
    MapPin, Clock, DollarSign, Building2, TrendingUp, FileText,
    Calendar, BookmarkPlus, ExternalLink, Filter, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const StudentDashboard = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    // Mock job data
    const jobs = [
        {
            id: 1,
            title: 'Software Engineer',
            company: 'Google',
            location: 'Bangalore, India',
            type: 'Full-time',
            salary: '₹15-20 LPA',
            posted: '2 days ago',
            logo: '🔍',
            skills: ['React', 'Node.js', 'Python'],
            description: 'Join our engineering team to build next-generation products.'
        },
        {
            id: 2,
            title: 'Frontend Developer',
            company: 'Microsoft',
            location: 'Hyderabad, India',
            type: 'Full-time',
            salary: '₹12-18 LPA',
            posted: '1 week ago',
            logo: '🪟',
            skills: ['JavaScript', 'React', 'TypeScript'],
            description: 'Build amazing user experiences for millions of users worldwide.'
        },
        {
            id: 3,
            title: 'Data Analyst Intern',
            company: 'Amazon',
            location: 'Mumbai, India',
            type: 'Internship',
            salary: '₹50k/month',
            posted: '3 days ago',
            logo: '📦',
            skills: ['Python', 'SQL', 'Tableau'],
            description: 'Work with large datasets to derive business insights.'
        },
        {
            id: 4,
            title: 'Full Stack Developer',
            company: 'Flipkart',
            location: 'Bangalore, India',
            type: 'Full-time',
            salary: '₹10-15 LPA',
            posted: '5 days ago',
            logo: '🛒',
            skills: ['MERN Stack', 'Docker', 'AWS'],
            description: 'Build scalable e-commerce solutions for millions of customers.'
        },
        {
            id: 5,
            title: 'UI/UX Designer',
            company: 'Adobe',
            location: 'Remote',
            type: 'Full-time',
            salary: '₹12-16 LPA',
            posted: '1 day ago',
            logo: '🎨',
            skills: ['Figma', 'Adobe XD', 'Sketch'],
            description: 'Design beautiful and intuitive user interfaces.'
        },
        {
            id: 6,
            title: 'Backend Engineer',
            company: 'Netflix',
            location: 'Bangalore, India',
            type: 'Full-time',
            salary: '₹18-25 LPA',
            posted: '4 days ago',
            logo: '🎬',
            skills: ['Java', 'Spring Boot', 'Microservices'],
            description: 'Build highly scalable streaming infrastructure.'
        }
    ];

    const stats = [
        { label: 'Jobs Applied', value: '12', icon: FileText, color: '#10b981' },
        { label: 'Interviews', value: '3', icon: Calendar, color: '#3b82f6' },
        { label: 'Saved Jobs', value: '8', icon: BookmarkPlus, color: '#f59e0b' }
    ];

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            job.location.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilter = selectedFilter === 'all' || 
                             (selectedFilter === 'fulltime' && job.type === 'Full-time') ||
                             (selectedFilter === 'internship' && job.type === 'Internship');
        
        return matchesSearch && matchesFilter;
    });

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>

            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem' }}>NexStep</h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)' }}>
                            <Briefcase size={20} /> <span style={{ fontWeight: 600 }}>Browse Jobs</span>
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
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Hello, {email.split('@')[0]}</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Find your dream job today</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div 
                            className="glass-card" 
                            style={{ padding: '0.6rem', borderRadius: '50%', cursor: 'pointer' }}
                            onClick={toggleTheme}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </div>
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

                {/* Search and Filter */}
                <div className="glass" style={{ padding: '2rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div style={{ position: 'relative', flex: 1 }}>
                            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-input"
                                placeholder="Search jobs, companies, or locations..."
                                style={{ paddingLeft: '3rem' }}
                            />
                        </div>
                        <button className="btn btn-primary" style={{ padding: '0 2rem' }}>
                            <Search size={18} /> Search
                        </button>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Filter size={18} style={{ color: 'var(--text-gray)' }} />
                        <div style={{ display: 'flex', gap: '0.8rem' }}>
                            {[
                                { id: 'all', label: 'All Jobs' },
                                { id: 'fulltime', label: 'Full-time' },
                                { id: 'internship', label: 'Internships' }
                            ].map(filter => (
                                <button
                                    key={filter.id}
                                    onClick={() => setSelectedFilter(filter.id)}
                                    className={selectedFilter === filter.id ? 'btn btn-primary' : 'btn btn-outline'}
                                    style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Job Listings */}
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                        Available Jobs ({filteredJobs.length})
                    </h2>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        {filteredJobs.map((job, i) => (
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
                                                    <span style={{ fontSize: '0.95rem' }}>{job.posted}</span>
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
                                            <button className="btn btn-outline" style={{ padding: '0.6rem', borderRadius: '8px' }}>
                                                <BookmarkPlus size={18} />
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
        </div>
    );
};

export default StudentDashboard;
