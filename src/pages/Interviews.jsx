import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, FileText, BookmarkPlus, Calendar,
    MapPin, Clock, Building2, Video, Phone, Users, CheckCircle
} from 'lucide-react';

const Interviews = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const upcomingInterviews = [
        {
            id: 1,
            title: 'Frontend Developer',
            company: 'Microsoft',
            date: '2026-02-25',
            time: '10:00 AM',
            type: 'Video Call',
            interviewer: 'Sarah Johnson',
            round: 'Technical Round 1',
            logo: '🪟',
            meetingLink: 'https://teams.microsoft.com/meet'
        },
        {
            id: 2,
            title: 'Software Engineer',
            company: 'Google',
            date: '2026-02-28',
            time: '2:00 PM',
            type: 'On-site',
            interviewer: 'Rahul Mehta',
            round: 'HR Round',
            logo: '🔍',
            location: 'Google Office, Bangalore'
        },
        {
            id: 3,
            title: 'Data Scientist',
            company: 'Meta',
            date: '2026-03-02',
            time: '11:30 AM',
            type: 'Phone Call',
            interviewer: 'Emily Chen',
            round: 'Technical Round 2',
            logo: '👥',
            phone: '+91-XXX-XXX-XXXX'
        }
    ];

    const pastInterviews = [
        {
            id: 4,
            title: 'Full Stack Developer',
            company: 'Flipkart',
            date: '2026-02-10',
            result: 'Selected',
            round: 'Final Round',
            logo: '🛒'
        },
        {
            id: 5,
            title: 'Backend Engineer',
            company: 'Amazon',
            date: '2026-02-05',
            result: 'Rejected',
            round: 'Technical Round 1',
            logo: '📦'
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
                                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem' }}>{interview.title}</h3>
                                                <p style={{ fontSize: '1.05rem', color: 'var(--text-gray)' }}>{interview.company}</p>
                                            </div>
                                            <span className="glass-card" style={{ 
                                                padding: '0.4rem 1rem', 
                                                fontSize: '0.85rem',
                                                background: 'rgba(99, 102, 241, 0.1)',
                                                color: 'var(--primary)'
                                            }}>
                                                {interview.round}
                                            </span>
                                        </div>
                                        
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <Calendar size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>{interview.date}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <Clock size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>{interview.time}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                {interview.type === 'Video Call' && <Video size={16} />}
                                                {interview.type === 'Phone Call' && <Phone size={16} />}
                                                {interview.type === 'On-site' && <MapPin size={16} />}
                                                <span style={{ fontSize: '0.95rem' }}>{interview.type}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                                                <Users size={16} />
                                                <span style={{ fontSize: '0.95rem' }}>{interview.interviewer}</span>
                                            </div>
                                        </div>

                                        {interview.meetingLink && (
                                            <div className="glass-card" style={{ 
                                                padding: '0.8rem 1rem', 
                                                background: 'rgba(16, 185, 129, 0.05)',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                marginBottom: '1rem'
                                            }}>
                                                <Video size={16} style={{ color: '#10b981' }} />
                                                <a href={interview.meetingLink} style={{ color: '#10b981', fontSize: '0.9rem', textDecoration: 'none' }}>
                                                    Join Meeting
                                                </a>
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
