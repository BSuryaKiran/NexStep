import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, LayoutDashboard, Search, Bell, User, Briefcase,
    MapPin, Clock, DollarSign, Building2, TrendingUp, FileText,
    Calendar, BookmarkPlus, ExternalLink, Filter, Star, Zap, Target, Award
} from 'lucide-react';

const EnhancedStudentDashboard = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [savedJobs, setSavedJobs] = useState([]);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    // Enhanced job data with matching scores and company info
    const jobs = [
        {
            id: 1,
            title: 'Senior Frontend Engineer',
            company: 'Google',
            logo: '🔍',
            location: 'Bangalore, India',
            type: 'Full-time',
            salary: '₹15-20 LPA',
            posted: '2 days ago',
            skills: ['React', 'Node.js', 'TypeScript'],
            required_skills: ['React', 'JavaScript', 'CSS'],
            description: 'Join our engineering team to build next-generation products for millions of users.',
            match_score: 95,
            company_rating: 4.8,
            applicants: 342,
            company_image: null
        },
        {
            id: 2,
            title: 'Full Stack Developer',
            company: 'Microsoft',
            logo: '🪟',
            location: 'Hyderabad, India',
            type: 'Full-time',
            salary: '₹12-18 LPA',
            posted: '1 week ago',
            skills: ['JavaScript', 'React', 'Node.js'],
            required_skills: ['JavaScript', 'React', 'TypeScript'],
            description: 'Build amazing user experiences for millions of users worldwide.',
            match_score: 88,
            company_rating: 4.7,
            applicants: 256,
            company_image: null
        },
        {
            id: 3,
            title: 'React Developer Internship',
            company: 'Amazon',
            logo: '📦',
            location: 'Mumbai, India',
            type: 'Internship',
            salary: '₹50k/month',
            posted: '3 days ago',
            skills: ['React', 'JavaScript', 'HTML/CSS'],
            required_skills: ['React', 'JavaScript'],
            description: 'Work with large datasets to derive business insights and build scalable solutions.',
            match_score: 92,
            company_rating: 4.6,
            applicants: 189,
            company_image: null
        },
        {
            id: 4,
            title: 'Full Stack Engineer',
            company: 'Flipkart',
            logo: '🛒',
            location: 'Bangalore, India',
            type: 'Full-time',
            salary: '₹10-15 LPA',
            posted: '5 days ago',
            skills: ['MERN Stack', 'Docker', 'AWS'],
            required_skills: ['React', 'Node.js', 'MongoDB'],
            description: 'Build scalable e-commerce solutions for millions of customers.',
            match_score: 75,
            company_rating: 4.5,
            applicants: 421,
            company_image: null
        },
        {
            id: 5,
            title: 'Backend Developer',
            company: 'Adobe',
            logo: '🎨',
            location: 'Remote',
            type: 'Full-time',
            salary: '₹12-16 LPA',
            posted: '1 day ago',
            skills: ['Node.js', 'Python', 'SQL'],
            required_skills: ['Node.js', 'JavaScript', 'Database Design'],
            description: 'Design beautiful and innovative solutions for global users.',
            match_score: 85,
            company_rating: 4.9,
            applicants: 267,
            company_image: null
        }
    ];

    const userSkills = ['React', 'JavaScript', 'TypeScript', 'Node.js', 'MongoDB', 'CSS', 'Python'];

    // Calculate match percentage
    const calculateMatchScore = (jobSkills) => {
        const matches = jobSkills.filter(skill => userSkills.includes(skill)).length;
        return Math.round((matches / jobSkills.length) * 100);
    };

    // Get color based on match score
    const getMatchColor = (score) => {
        if (score >= 90) return '#10b981'; // green
        if (score >= 75) return '#FF6B35'; // orange
        if (score >= 60) return '#f59e0b'; // yellow
        return '#ef4444'; // red
    };

    const filteredJobs = jobs.filter(job => {
        if (selectedFilter !== 'all' && job.type !== selectedFilter) return false;
        if (searchQuery) {
            return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   job.company.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return true;
    }).sort((a, b) => calculateMatchScore(b.required_skills) - calculateMatchScore(a.required_skills));

    const toggleSaveJob = (jobId) => {
        if (savedJobs.includes(jobId)) {
            setSavedJobs(savedJobs.filter(id => id !== jobId));
        } else {
            setSavedJobs([...savedJobs, jobId]);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', display: 'flex', flexDirection: 'column', padding: '2rem', height: 'fit-content', position: 'sticky', top: '1rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/dashboard')}>
                    CareerMatch
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    {[
                        { icon: Briefcase, label: 'Browse Jobs', path: '/dashboard', active: true },
                        { icon: FileText, label: 'My Applications', path: '/applications' },
                        { icon: BookmarkPlus, label: 'Saved Jobs', path: '/saved-jobs' },
                        { icon: Award, label: 'Internships', path: '/internships' },
                        { icon: Calendar, label: 'Interviews', path: '/interviews' },
                        { icon: User, label: 'Profile', path: '/profile' }
                    ].map((item, i) => (
                        <div 
                            key={i}
                            className="glass-card" 
                            style={{ 
                                padding: '0.8rem 1.2rem', 
                                cursor: 'pointer',
                                background: item.active ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255,255,255,0.02)',
                                borderColor: item.active ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255,255,255,0.05)'
                            }} 
                            onClick={() => navigate(item.path)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: item.active ? '#FF6B35' : 'var(--text-gray)' }}>
                                <item.icon size={20} /> <span>{item.label}</span>
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Your Skills */}
                <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.8rem', fontWeight: 600 }}>YOUR SKILLS</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {userSkills.slice(0, 4).map((skill, i) => (
                            <span key={i} style={{
                                padding: '0.4rem 0.8rem',
                                background: 'rgba(255, 107, 53, 0.15)',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                color: '#FF6B35'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        Find Your Perfect Job
                    </h1>
                    <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>
                        Intelligent matching based on your skills and preferences
                    </p>
                </div>

                {/* Search and Filters */}
                <div className="glass" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '1.5rem' }}>
                        <div style={{ position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} size={20} />
                            <input
                                type="text"
                                placeholder="Search jobs by title, company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>
                        <select 
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="form-input"
                            style={{ width: '180px' }}
                        >
                            <option value="all">All Types</option>
                            <option value="Full-time">Full-time</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                    {[
                        { icon: Briefcase, label: 'Jobs Available', value: jobs.length },
                        { icon: BookmarkPlus, label: 'Saved', value: savedJobs.length },
                        { icon: TrendingUp, label: 'Applications', value: 5 },
                        { icon: Target, label: 'Match Avg', value: '87%' }
                    ].map((stat, i) => (
                        <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                            <div style={{ color: '#FF6B35', marginBottom: '0.5rem' }}>
                                <stat.icon size={24} style={{ margin: '0 auto' }} />
                            </div>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{stat.label}</p>
                            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#FF6B35' }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Jobs List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {filteredJobs.map(job => {
                        const matchScore = calculateMatchScore(job.required_skills);
                        const isSaved = savedJobs.includes(job.id);
                        
                        return (
                            <div key={job.id} className="glass" style={{ padding: '2rem', borderRadius: '16px', borderLeft: `5px solid ${getMatchColor(matchScore)}` }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem' }}>
                                    <div>
                                        <div style={{ marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
                                                <div style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    background: 'rgba(255, 107, 53, 0.1)',
                                                    borderRadius: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    fontSize: '1.8rem'
                                                }}>
                                                    {job.logo}
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.3rem' }}>{job.title}</h3>
                                                    <p style={{ color: '#FF6B35', fontWeight: 600, marginBottom: '0.5rem' }}>{job.company}</p>
                                                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <MapPin size={16} /> {job.location}
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <Clock size={16} /> {job.posted}
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                            <DollarSign size={16} /> {job.salary}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                                            {job.description}
                                        </p>

                                        {/* Skills */}
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', marginBottom: '0.8rem', fontWeight: 600 }}>REQUIRED SKILLS</p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                                {job.required_skills.map((skill, i) => (
                                                    <span 
                                                        key={i}
                                                        style={{
                                                            padding: '0.5rem 1rem',
                                                            background: userSkills.includes(skill) ? 'rgba(16, 185, 129, 0.15)' : 'rgba(100,116,139,0.1)',
                                                            color: userSkills.includes(skill) ? '#10b981' : 'var(--text-gray)',
                                                            borderRadius: '20px',
                                                            fontSize: '0.85rem',
                                                            fontWeight: 500,
                                                            border: userSkills.includes(skill) ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(100,116,139,0.2)'
                                                        }}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Company Stats */}
                                        <div style={{ display: 'flex', gap: '2rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', marginBottom: '0.3rem' }}>Rating</p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                    <Star size={16} style={{ color: '#FFD700' }} />
                                                    <span style={{ color: 'white', fontWeight: 600 }}>{job.company_rating}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', marginBottom: '0.3rem' }}>Applicants</p>
                                                <p style={{ color: 'white', fontWeight: 600 }}>{job.applicants}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Side - Match Score and Actions */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minWidth: '150px' }}>
                                        {/* Match Score Circular */}
                                        <div style={{
                                            width: '140px',
                                            height: '140px',
                                            borderRadius: '50%',
                                            background: `conic-gradient(${getMatchColor(matchScore)} 0deg ${(matchScore / 100) * 360}deg, rgba(255,255,255,0.05) ${(matchScore / 100) * 360}deg)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginBottom: '1rem'
                                        }}>
                                            <div style={{
                                                width: '130px',
                                                height: '130px',
                                                borderRadius: '50%',
                                                background: 'var(--bg-darker)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flexDirection: 'column'
                                            }}>
                                                <p style={{ fontSize: '2.5rem', fontWeight: 700, color: getMatchColor(matchScore) }}>
                                                    {matchScore}%
                                                </p>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem' }}>Match</p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '100%' }}>
                                            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}>
                                                <TrendingUp size={18} /> Apply Now
                                            </button>
                                            <button 
                                                onClick={() => toggleSaveJob(job.id)}
                                                className="btn btn-outline"
                                                style={{ 
                                                    width: '100%', 
                                                    justifyContent: 'center',
                                                    padding: '0.8rem',
                                                    background: isSaved ? 'rgba(255, 107, 53, 0.15)' : 'transparent',
                                                    borderColor: isSaved ? '#FF6B35' : 'var(--glass-border)',
                                                    color: isSaved ? '#FF6B35' : 'var(--text-white)'
                                                }}
                                            >
                                                <BookmarkPlus size={18} /> {isSaved ? 'Saved' : 'Save'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default EnhancedStudentDashboard;
