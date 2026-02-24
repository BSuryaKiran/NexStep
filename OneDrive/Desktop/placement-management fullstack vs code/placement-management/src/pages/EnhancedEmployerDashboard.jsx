import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, FileText, BarChart3, 
    Users, TrendingUp, MessageSquare, Settings, Trash2,
    Plus, Search, Filter, MapPin, DollarSign, Clock, Star, Award
} from 'lucide-react';
import ImageUploadField from '../components/ImageUploadField';

const EnhancedEmployerDashboard = () => {
    const email = sessionStorage.getItem('userEmail') || 'employer@demo.com';
    const navigate = useNavigate();
    const [companyImage, setCompanyImage] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('jobs');
    const [jobApplications, setJobApplications] = useState(() => {
        // Load real students from localStorage as applicants
        const allStudents = JSON.parse(localStorage.getItem('students') || '{}');
        const realApplicants = Object.entries(allStudents).map(([studentEmail, studentData]) => ({
            id: Math.random(),
            candidateName: studentData.name || 'Unknown',
            candidateEmail: studentEmail,
            position: 'Senior Frontend Engineer',
            appliedDate: '2 days ago',
            status: 'under-review',
            rating: 4.5,
            matchScore: 85,
            skills: studentData.skills || ['Technology'],
            resume: studentData.resume || null
        }));
        
        // Add demo applicants if no real students exist
        return realApplicants.length > 0 ? realApplicants : [
            {
                id: 1,
                candidateName: 'Rahul Kumar',
                candidateEmail: 'rahul@example.com',
                position: 'Senior Frontend Engineer',
                appliedDate: '2 days ago',
                status: 'under-review',
                rating: 4.8,
                matchScore: 95,
                skills: ['React', 'TypeScript', 'Node.js'],
                resume: 'rahul_kumar_resume.pdf'
            },
            {
                id: 2,
                candidateName: 'Priya Sharma',
                candidateEmail: 'priya@example.com',
                position: 'Frontend Developer',
                appliedDate: '5 days ago',
                status: 'shortlisted',
                rating: 4.6,
                matchScore: 88,
                skills: ['React', 'JavaScript', 'CSS'],
                resume: 'priya_sharma_resume.pdf'
            }
        ];
    });

    const [postedJobs] = useState([
        {
            id: 1,
            title: 'Senior Frontend Engineer',
            location: 'Bangalore',
            salary: '₹15-20 LPA',
            applications: 342,
            status: 'active',
            shortlisted: 15,
            views: 2340
        },
        {
            id: 2,
            title: 'Full Stack Developer',
            location: 'Mumbai',
            salary: '₹12-18 LPA',
            applications: 256,
            status: 'active',
            shortlisted: 12,
            views: 1820
        },
        {
            id: 3,
            title: 'UI/UX Designer',
            location: 'Remote',
            salary: '₹10-14 LPA',
            applications: 189,
            status: 'active',
            shortlisted: 8,
            views: 1456
        }
    ]);

    const [companyInfo] = useState({
        name: 'Google India',
        founded: 2004,
        employees: '10,000+',
        industry: 'Technology',
        headquarters: 'Bangalore, India',
        website: 'google.com',
        about: 'Building tools that organize and democratize information, making it accessible and useful to everyone.'
    });

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'under-review': return '#FF6B35';
            case 'shortlisted': return '#10b981';
            case 'rejected': return '#ef4444';
            default: return '#6b7280';
        }
    };

    const getStatusLabel = (status) => {
        switch(status) {
            case 'under-review': return 'Under Review';
            case 'shortlisted': return 'Shortlisted';
            case 'rejected': return 'Rejected';
            default: return status;
        }
    };

    const handleViewResume = (resumeName, candidateName) => {
        if (!resumeName) {
            alert(`No resume uploaded for ${candidateName} yet`);
            return;
        }
        // In a real scenario, this would open the resume from a server
        alert(`Opening resume for ${candidateName}: ${resumeName}`);
        // You can implement actual PDF viewing here
    };

    const filteredApplications = jobApplications.filter(app => 
        app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.position.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', display: 'flex', flexDirection: 'column', padding: '2rem', height: 'fit-content', position: 'sticky', top: '1rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/dashboard')}>
                    CareerMatch
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1, marginBottom: '2rem' }}>
                    {[
                        { icon: Briefcase, label: 'Job Postings', id: 'jobs', active: activeTab === 'jobs' },
                        { icon: Award, label: 'Internships', path: '/employer-internships' },
                        { icon: Users, label: 'Applications', id: 'applications', active: activeTab === 'applications' },
                        { icon: FileText, label: 'Company Profile', id: 'profile', active: activeTab === 'profile' },
                        { icon: BarChart3, label: 'Analytics', id: 'analytics', active: activeTab === 'analytics' }
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
                            onClick={() => item.path ? navigate(item.path) : setActiveTab(item.id)}
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
                        Employer Dashboard
                    </h1>
                    <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>
                        Manage jobs, applications, and company profile
                    </p>
                </div>

                {/* Company Profile Section */}
                {activeTab === 'profile' && (
                    <div>
                        <div className="glass" style={{ padding: '3rem', borderRadius: '16px', marginBottom: '2rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '3rem', alignItems: 'start' }}>
                                {/* Company Logo */}
                                <div>
                                    <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--text-gray)', fontWeight: 600 }}>Company Logo</label>
                                    <ImageUploadField 
                                        image={companyImage}
                                        onImageChange={setCompanyImage}
                                        label="Add Logo"
                                        size="180px"
                                        shape="rounded"
                                    />
                                </div>

                                {/* Company Info */}
                                <div>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>{companyInfo.name}</h2>
                                    <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', lineHeight: 1.6 }}>
                                        {companyInfo.about}
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                        {[
                                            { label: 'Founded', value: companyInfo.founded },
                                            { label: 'Employees', value: companyInfo.employees },
                                            { label: 'Industry', value: companyInfo.industry },
                                            { label: 'Headquarters', value: companyInfo.headquarters }
                                        ].map((info, i) => (
                                            <div key={i}>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>{info.label}</p>
                                                <p style={{ fontWeight: 600, fontSize: '1.1rem', color: '#FF6B35' }}>{info.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Job Postings Section */}
                {activeTab === 'jobs' && (
                    <div>
                        <button className="btn btn-primary" style={{ marginBottom: '2rem' }}>
                            <Plus size={18} /> Post New Job
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                            {postedJobs.map(job => (
                                <div key={job.id} className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                                    <div style={{ marginBottom: '1rem' }}>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>{job.title}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                            <MapPin size={16} /> {job.location}
                                        </div>
                                    </div>

                                    <div style={{ background: 'rgba(255, 107, 53, 0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Monthly Salary</p>
                                        <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#FF6B35' }}>{job.salary}</p>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                        <div style={{ flex: 1, minWidth: '100px' }}>
                                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Applications</p>
                                            <p style={{ fontSize: '1.3rem', fontWeight: 700 }}>{job.applications}</p>
                                        </div>
                                        <div style={{ flex: 1, minWidth: '100px' }}>
                                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Shortlisted</p>
                                            <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#10b981' }}>{job.shortlisted}</p>
                                        </div>
                                    </div>

                                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }}>
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Applications Section */}
                {activeTab === 'applications' && (
                    <div>
                        <div className="glass" style={{ padding: '1.5rem', marginBottom: '2rem', borderRadius: '16px' }}>
                            <div style={{ position: 'relative' }}>
                                <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by candidate name or position..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {filteredApplications.map(app => (
                                <div key={app.id} className="glass" style={{ padding: '1.5rem', borderRadius: '16px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
                                        <div>
                                            <div style={{ marginBottom: '1rem' }}>
                                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' }}>{app.candidateName}</h3>
                                                <p style={{ color: '#FF6B35', fontWeight: 600, marginBottom: '0.5rem' }}>{app.position}</p>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Applied {app.appliedDate}</p>
                                            </div>

                                            <div style={{ marginBottom: '1rem' }}>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>SKILLS</p>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                                    {app.skills.map((skill, i) => (
                                                        <span key={i} style={{
                                                            padding: '0.4rem 0.8rem',
                                                            background: 'rgba(255, 107, 53, 0.15)',
                                                            color: '#FF6B35',
                                                            borderRadius: '6px',
                                                            fontSize: '0.8rem'
                                                        }}>
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem' }}>
                                                <div>
                                                    <p style={{ color: 'var(--text-gray)', marginBottom: '0.3rem' }}>Rating</p>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                                                        <Star size={16} style={{ color: '#FFD700' }} />
                                                        <span style={{ fontWeight: 600 }}>{app.rating}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p style={{ color: 'var(--text-gray)', marginBottom: '0.3rem' }}>Match Score</p>
                                                    <p style={{ fontWeight: 600, color: '#10b981' }}>{app.matchScore}%</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', minWidth: '150px' }}>
                                            <div style={{
                                                padding: '0.8rem 1.2rem',
                                                background: `${getStatusColor(app.status)}20`,
                                                color: getStatusColor(app.status),
                                                borderRadius: '8px',
                                                textAlign: 'center',
                                                fontWeight: 600,
                                                fontSize: '0.9rem'
                                            }}>
                                                {getStatusLabel(app.status)}
                                            </div>
                                            <button 
                                                onClick={() => handleViewResume(app.resume, app.candidateName)}
                                                className="btn btn-outline" 
                                                style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', fontSize: '0.9rem' }}
                                            >
                                                📄 View Resume
                                            </button>
                                            <button className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', fontSize: '0.9rem' }}>
                                                <MessageSquare size={16} /> Message
                                            </button>
                                            {app.status === 'under-review' && (
                                                <button className="btn btn-outline" style={{ width: '100%', padding: '0.8rem', justifyContent: 'center', fontSize: '0.9rem' }}>
                                                    Shortlist
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Analytics Section */}
                {activeTab === 'analytics' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { label: 'Total Applications', value: '787', change: '+12%', icon: Users },
                            { label: 'Active Job Posts', value: '3', change: '+1', icon: Briefcase },
                            { label: 'Shortlisted', value: '35', change: '+8', icon: TrendingUp },
                            { label: 'Total Views', value: '5.6K', change: '+24%', icon: BarChart3 }
                        ].map((stat, i) => (
                            <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        background: 'rgba(255, 107, 53, 0.15)',
                                        borderRadius: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FF6B35'
                                    }}>
                                        <stat.icon size={26} />
                                    </div>
                                    <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.9rem' }}>{stat.change}</span>
                                </div>
                                <p style={{ color: 'var(--text-gray)', marginBottom: '0.5rem' }}>{stat.label}</p>
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#FF6B35' }}>{stat.value}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EnhancedEmployerDashboard;
