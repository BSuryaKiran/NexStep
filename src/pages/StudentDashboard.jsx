import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, LayoutDashboard, Search, User, Briefcase,
    MapPin, Clock, DollarSign, Building2, TrendingUp, FileText,
    Calendar, BookmarkPlus, ExternalLink, Filter, Sun, Moon, CheckCircle
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import NotificationBell from '../components/NotificationBell';
import { useNotifications } from '../contexts/NotificationContext';

const StudentDashboard = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName') || email.split('@')[0];
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { theme, toggleTheme } = useTheme();
    const { sendNotification } = useNotifications();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    // Load jobs and applications from localStorage
    const [jobs, setJobs] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        loadJobs();
        loadMyApplications();
        loadSavedJobs();
        // Listen for storage changes
        window.addEventListener('storage', () => {
            loadJobs();
            loadMyApplications();
            loadSavedJobs();
        });
        return () => window.removeEventListener('storage', () => {
            loadJobs();
            loadMyApplications();
            loadSavedJobs();
        });
    }, []);

    const loadJobs = () => {
        const allJobs = JSON.parse(localStorage.getItem('jobs') || '[]');
        setJobs(allJobs);
    };

    const loadMyApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications') || '[]');
        const myApps = allApplications.filter(app => app.studentId === userId);
        setMyApplications(myApps);
    };

    const loadSavedJobs = () => {
        const allSavedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        const mySavedJobs = allSavedJobs.filter(job => job.studentId === userId);
        setSavedJobs(mySavedJobs);
    };

    const handleSaveJob = (job) => {
        const allSavedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        
        // Check if already saved
        const alreadySaved = allSavedJobs.some(saved => 
            saved.jobId === job.id && saved.studentId === userId
        );

        if (alreadySaved) {
            setSuccessMessage('Job already saved!');
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
            return;
        }

        const savedJob = {
            id: Date.now().toString(),
            jobId: job.id,
            studentId: userId,
            studentEmail: email,
            savedDate: new Date().toISOString(),
            ...job
        };

        allSavedJobs.push(savedJob);
        localStorage.setItem('savedJobs', JSON.stringify(allSavedJobs));
        loadSavedJobs();

        // Send notification to recruiter
        if (job.recruiterId) {
            sendNotification({
                recipientId: job.recruiterId,
                title: 'Job Saved',
                message: `${userName} saved your job posting: ${job.title}`,
                type: 'info',
                actionUrl: '/dashboard'
            });
        }

        setSuccessMessage('Job saved successfully!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleApply = (job) => {
        // Check if already applied
        const alreadyApplied = myApplications.some(app => app.jobId === job.id);
        if (alreadyApplied) {
            setSuccessMessage('You have already applied for this job!');
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
            statusColor: '#f59e0b',
            examDate: job.examDate,
            interviewDetails: job.interviewDetails,
            mode: job.mode
        };

        // Save to localStorage
        const applications = JSON.parse(localStorage.getItem('applications') || '[]');
        applications.push(application);
        localStorage.setItem('applications', JSON.stringify(applications));

        // Reload applications
        loadMyApplications();

        // Send notification to recruiter
        if (job.recruiterId) {
            sendNotification({
                recipientId: job.recruiterId,
                title: 'New Application Received',
                message: `${userName} applied for: ${job.title}`,
                type: 'success',
                actionUrl: '/dashboard'
            });
        }

        // Show success message
        setSuccessMessage('Job applied successfully!');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const stats = [
        { label: 'Jobs Applied', value: myApplications.length.toString(), icon: FileText, color: '#10b981' },
        { label: 'Interviews', value: myApplications.filter(a => a.status === 'Interview Scheduled').length.toString(), icon: Calendar, color: '#3b82f6' },
        { label: 'Saved Jobs', value: savedJobs.length.toString(), icon: BookmarkPlus, color: '#f59e0b' }
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
                        <NotificationBell />
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
                                                {job.skills && Array.isArray(job.skills) && job.skills.map(skill => (
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
                                            <button 
                                                className="btn btn-outline" 
                                                style={{ padding: '0.6rem', borderRadius: '8px' }}
                                                onClick={() => handleSaveJob(job)}
                                                title="Save Job"
                                            >
                                                <BookmarkPlus size={18} />
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
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;
