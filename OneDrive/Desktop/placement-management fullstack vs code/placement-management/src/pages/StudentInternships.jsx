import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Briefcase, BookmarkPlus, Calendar, MapPin, DollarSign,
    Building2, Filter, Search, ExternalLink, Star, Clock, Award, Upload, Download
} from 'lucide-react';

const StudentInternships = ({ internships = [], applications = [], onApply }) => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [activeTab, setActiveTab] = useState('browse'); // browse, applied, completed

    // Load completed internships from localStorage
    const getCompletedInternships = () => {
        const storedApplications = JSON.parse(localStorage.getItem('internshipApplications') || '{}');
        const userApplications = storedApplications[email] || [];
        return userApplications.filter(app => app.status === 'completed');
    };

    // Load real user applications
    const getUserApplications = () => {
        const storedApplications = JSON.parse(localStorage.getItem('internshipApplications') || '{}');
        const userApplications = storedApplications[email] || [];
        return userApplications.filter(app => app.status !== 'completed');
    };

    const handleApplyInternship = (internship) => {
        // Save application to localStorage
        const applications = JSON.parse(localStorage.getItem('internshipApplications') || '{}');
        if (!applications[email]) {
            applications[email] = [];
        }
        
        const newApplication = {
            id: Math.random(),
            internshipId: internship.id,
            internshipTitle: internship.title,
            company: internship.company,
            studentEmail: email,
            status: 'accepted',
            appliedDate: new Date().toISOString(),
            completedDate: null,
            score: null,
            certificateUrl: null,
            certificateIssueDate: null
        };
        
        // Check if already applied
        const alreadyApplied = applications[email].some(app => app.internshipId === internship.id);
        if (!alreadyApplied) {
            applications[email].push(newApplication);
            localStorage.setItem('internshipApplications', JSON.stringify(applications));
            alert(`Applied for ${internship.title} at ${internship.company}`);
        } else {
            alert('You have already applied for this internship');
        }
    };

    const handleViewDetails = (internship) => {
        navigate(`/internship-detail/${internship.id}`);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const InternshipCard = ({ internship }) => (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ fontSize: '2rem' }}>{internship.logo}</div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                                {internship.title}
                            </h3>
                            <p style={{ color: '#FF6B35', fontWeight: 600 }}>{internship.company}</p>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', lineHeight: '1.6' }}>
                        {internship.description}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                            <MapPin size={16} /> {internship.location}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                            <Clock size={16} /> {internship.duration}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                            <DollarSign size={16} /> {internship.stipend}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}>
                            <Star size={16} /> {internship.company_rating}/5.0
                        </div>
                    </div>
                </div>

                <div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Required Skills
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {internship.skills.map((skill, i) => (
                                <span 
                                    key={i}
                                    style={{
                                        padding: '0.4rem 0.8rem',
                                        background: 'rgba(255, 107, 53, 0.15)',
                                        borderRadius: '6px',
                                        color: '#FF6B35',
                                        fontSize: '0.85rem',
                                        fontWeight: 500
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            Applicants: <span style={{ color: '#FF6B35', fontWeight: 700 }}>{internship.applicants}</span>
                        </p>
                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                            Posted: {internship.posted}
                        </p>
                    </div>

                    <button
                        onClick={() => handleApplyInternship(internship)}
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center', marginBottom: '0.5rem' }}
                    >
                        Apply Now
                    </button>
                    <button
                        onClick={() => handleViewDetails(internship)}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            background: 'rgba(255, 107, 53, 0.1)',
                            color: '#FF6B35',
                            border: '1px solid rgba(255, 107, 53, 0.3)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            transition: 'all 0.3s'
                        }}
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );

    const ApplicationCard = ({ application }) => (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                        {application.title}
                    </h3>
                    <p style={{ color: '#FF6B35', marginBottom: '1rem' }}>{application.company}</p>
                    <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>
                        Applied on {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: application.status === 'accepted' ? 'rgba(34, 197, 94, 0.2)' : 
                                   application.status === 'pending' ? 'rgba(225, 29, 72, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                        color: application.status === 'accepted' ? '#22c55e' : 
                               application.status === 'pending' ? '#e11d48' : '#6366f1',
                        borderRadius: '6px',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </div>
                    {application.score && (
                        <div style={{ color: '#FF6B35', fontSize: '1.5rem', fontWeight: 700 }}>
                            Score: {application.score}%
                        </div>
                    )}
                </div>
            </div>

            {application.status === 'accepted' && (
                <button
                    onClick={() => navigate(`/internship-detail/${application.internshipId}`)}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
                >
                    <Upload size={18} /> Upload Projects
                </button>
            )}
        </div>
    );

    const CompletedCard = ({ internship }) => (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                            {internship.internshipTitle || internship.title}
                        </h3>
                        <div style={{
                            background: 'rgba(34, 197, 94, 0.15)',
                            color: '#22c55e',
                            padding: '0.3rem 0.8rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                        }}>
                            Completed
                        </div>
                    </div>
                    <p style={{ color: '#FF6B35', marginBottom: '0.8rem', fontWeight: 600 }}>{internship.company}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Completed Date
                            </p>
                            <p style={{ fontWeight: 600 }}>
                                {internship.completedDate ? new Date(internship.completedDate).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                        <div>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Certificate Issued
                            </p>
                            <p style={{ fontWeight: 600 }}>
                                {internship.certificateIssueDate ? new Date(internship.certificateIssueDate).toLocaleDateString() : 'Pending'}
                            </p>
                        </div>
                    </div>
                    <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', borderLeft: '3px solid #22c55e' }}>
                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', margin: '0 0 0.3rem 0' }}>
                            📋 Certificate uploaded by Placement Officer
                        </p>
                        <p style={{ color: '#22c55e', fontSize: '0.9rem', fontWeight: 500, margin: 0 }}>
                            Your achievement has been recognized!
                        </p>
                    </div>
                </div>

                <div style={{ textAlign: 'center', minWidth: '180px' }}>
                    <div style={{ 
                        background: 'rgba(255, 107, 53, 0.1)',
                        padding: '1.5rem',
                        borderRadius: '12px',
                        marginBottom: '1rem',
                        border: '1px solid rgba(255, 107, 53, 0.2)'
                    }}>
                        <Award size={32} style={{ color: '#FF6B35', margin: '0 auto 0.5rem' }} />
                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                            Final Score
                        </p>
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#FF6B35' }}>
                            {internship.score || 0}%
                        </p>
                    </div>
                    <button 
                        onClick={() => {
                            if (internship.certificateUrl) {
                                // Download certificate
                                const link = document.createElement('a');
                                link.href = internship.certificateUrl;
                                link.download = internship.certificateName || 'certificate.pdf';
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            } else {
                                alert('Certificate not yet uploaded by officer');
                            }
                        }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            padding: '0.8rem 1.2rem',
                            background: internship.certificateUrl ? '#22c55e' : '#9ca3af',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            transition: 'all 0.3s',
                            width: '100%',
                            cursor: 'pointer',
                            border: 'none',
                            fontSize: '1rem'
                        }}
                        onMouseEnter={(e) => e.target.style.background = internship.certificateUrl ? '#16a34a' : '#9ca3af'}
                        onMouseLeave={(e) => e.target.style.background = internship.certificateUrl ? '#22c55e' : '#9ca3af'}
                    >
                        <Download size={16} /> {internship.certificateUrl ? 'Download Certificate' : 'Pending'}
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', display: 'flex', flexDirection: 'column', padding: '2rem', height: 'fit-content', position: 'sticky', top: '1rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/dashboard')}>
                    CareerMatch
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    {[
                        { icon: Briefcase, label: 'Browse Jobs', path: '/dashboard' },
                        { icon: BookmarkPlus, label: 'Internships', path: '/internships', active: true },
                        { icon: Calendar, label: 'Applications', path: '/applications' },
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

                <button 
                    onClick={handleLogout}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '2rem', justifyContent: 'center' }}
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                
                {/* Header */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                Internship Portal
                            </h1>
                            <p style={{ color: 'var(--text-gray)' }}>Find and apply for internships & real-time projects</p>
                        </div>
                        <Award size={60} style={{ color: '#FF6B35', opacity: 0.3 }} />
                    </div>

                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid rgba(255, 107, 53, 0.2)', paddingBottom: '1rem' }}>
                        {['browse', 'applied', 'completed'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.8rem 1.5rem',
                                    background: activeTab === tab ? 'rgba(255, 107, 53, 0.2)' : 'transparent',
                                    color: activeTab === tab ? '#FF6B35' : 'var(--text-gray)',
                                    border: 'none',
                                    borderBottom: activeTab === tab ? '2px solid #FF6B35' : 'none',
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    transition: 'all 0.3s'
                                }}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search and Filter */}
                {activeTab === 'browse' && (
                    <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem', display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1rem', borderRadius: '8px' }}>
                            <Search size={20} style={{ color: '#FF6B35' }} />
                            <input
                                type="text"
                                placeholder="Search internships..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', width: '100%', fontSize: '1rem' }}
                            />
                        </div>
                        <button className="btn btn-primary" style={{ gap: '0.5rem' }}>
                            <Filter size={18} /> Filter
                        </button>
                    </div>
                )}

                {/* Content based on active tab */}
                {activeTab === 'browse' && (
                    <div>
                        {internships && internships.length > 0 ? (
                            internships.map((internship) => (
                                <InternshipCard key={internship.id} internship={internship} />
                            ))
                        ) : (
                            <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>No internships available</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'applied' && (
                    <div>
                        {getUserApplications && getUserApplications().length > 0 ? (
                            getUserApplications()
                                .map((application) => (
                                    <ApplicationCard key={application.id} application={application} />
                                ))
                        ) : (
                            <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>No applications yet</p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'completed' && (
                    <div>
                        {getCompletedInternships && getCompletedInternships().length > 0 ? (
                            getCompletedInternships()
                                .map((internship) => (
                                    <CompletedCard key={internship.id} internship={internship} />
                                ))
                        ) : (
                            <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>No completed internships</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentInternships;
