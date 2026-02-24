import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    LogOut, ArrowLeft, MapPin, Clock, DollarSign, Star, Upload, X,
    Calendar, Award, Download, Eye, FileText
} from 'lucide-react';

const StudentInternshipDetail = ({ internships = [], applications = [], internshipMaterials = {} }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [projectFiles, setProjectFiles] = useState([]);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectLink, setProjectLink] = useState('');

    // Get internship details from props or use mock data
    const internshipId = parseInt(id);
    const foundInternship = internships && internships.find(i => i.id === internshipId);
    
    // Get student email from session
    const studentEmail = sessionStorage.getItem('userEmail') || 'student@demo.com';
    
    // Find the real application for this student and internship
    const foundApplication = applications && applications.find(
        app => app.internshipId === internshipId && app.studentEmail === studentEmail
    );
    
    const [internship] = useState(foundInternship || {
        id: id,
        title: 'Frontend Development Internship',
        company: 'Google',
        logo: '🔍',
        location: 'Bangalore, India',
        duration: '3 months',
        stipend: '₹50,000/month',
        posted: '2 days ago',
        skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'REST APIs'],
        description: 'Work on cutting-edge web technologies and contribute to real products used by millions. You will be working with the frontend team to build responsive and performant web applications.',
        company_rating: 4.8,
        applicants: 342,
        status: 'open',
        aboutCompany: 'Google is a multinational technology company that specializes in Internet-related services and products.',
        responsibilities: [
            'Develop and maintain React components',
            'Write unit and integration tests',
            'Collaborate with product and design teams',
            'Participate in code reviews'
        ],
        requirements: [
            'Strong understanding of JavaScript and React',
            'Knowledge of HTML5 and CSS3',
            'Experience with REST APIs',
            'Good communication skills'
        ]
    });

    // Use real application data if found, otherwise use mock data
    const [applicationData] = useState(foundApplication ? {
        ...foundApplication,
        uploadedProjects: foundApplication.uploadedProjects || [],
        certificateUrl: foundApplication.certificateUrl || null,
        certificateIssueDate: foundApplication.certificateIssueDate || new Date().toISOString(),
        scoreBreakdown: foundApplication.scoreBreakdown || {},
        completedDate: foundApplication.completedDate || null
    } : {
        id: 1,
        status: 'accepted',
        appliedDate: new Date().toISOString().split('T')[0],
        completedDate: null,
        score: null,
        scoreBreakdown: {},
        certificateUrl: null,
        certificateIssueDate: new Date().toISOString(),
        uploadedProjects: []
    });

    const handleDownloadCertificate = () => {
        // Generate a simple text-based certificate if no URL exists
        if (!applicationData.certificateUrl) {
            const certificateContent = `
================================================================================
                    CERTIFICATE OF COMPLETION
================================================================================

This is to certify that

${sessionStorage.getItem('userName') || 'Student Name'}

has successfully completed the internship program at

${internship.company}

for the position of

${internship.title}

Duration: ${internship.duration}
Period: ${new Date(applicationData.appliedDate).toLocaleDateString()} to ${new Date(applicationData.completedDate || new Date()).toLocaleDateString()}

Issued on: ${new Date(applicationData.certificateIssueDate || new Date()).toLocaleDateString()}

================================================================================
This certificate is a token of successful completion of the internship program.
================================================================================
            `;

            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(certificateContent));
            element.setAttribute('download', `${internship.company}-Certificate-${Date.now()}.txt`);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        } else {
            // Download from URL if it exists
            const link = document.createElement('a');
            link.href = applicationData.certificateUrl;
            link.download = `${internship.company}-Certificate.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleProjectUpload = (e) => {
        const files = e.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileSize = (file.size / (1024 * 1024)).toFixed(2); // Convert to MB
                setProjectFiles([...projectFiles, {
                    name: file.name,
                    size: fileSize,
                    type: file.type,
                    file: file
                }]);
            }
        }
        // Reset input
        e.target.value = '';
    };

    const handleAddProject = () => {
        if (!projectTitle.trim() || !projectDescription.trim()) {
            alert('Please fill in all fields');
            return;
        }
        alert(`Project "${projectTitle}" uploaded successfully!`);
        setProjectTitle('');
        setProjectDescription('');
        setProjectLink('');
        setProjectFiles([]);
        setShowUploadModal(false);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', position: 'fixed', left: '1rem', top: '1rem', bottom: '1rem', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/dashboard')}>
                    CareerMatch
                </h2>
                <nav style={{ flex: 1 }}>
                    <button 
                        onClick={() => navigate('/internships')}
                        style={{
                            width: '100%',
                            padding: '0.8rem 1.2rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '8px',
                            color: 'var(--text-gray)',
                            cursor: 'pointer',
                            marginBottom: '0.8rem',
                            fontWeight: 600
                        }}
                    >
                        <ArrowLeft size={20} /> Back to Internships
                    </button>
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
            <div style={{ marginLeft: '320px', flex: 1, padding: '2rem', overflowY: 'auto' }}>
                
                {/* Internship Header */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{ fontSize: '3rem' }}>{internship.logo}</div>
                                <div>
                                    <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                                        {internship.title}
                                    </h1>
                                    <p style={{ color: '#FF6B35', fontSize: '1.1rem', fontWeight: 600 }}>
                                        {internship.company}
                                    </p>
                                </div>
                            </div>

                            <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                                {internship.description}
                            </p>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ padding: '0.8rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '8px', color: '#FF6B35' }}>
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Location</p>
                                        <p style={{ fontWeight: 600 }}>{internship.location}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ padding: '0.8rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '8px', color: '#FF6B35' }}>
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Duration</p>
                                        <p style={{ fontWeight: 600 }}>{internship.duration}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ padding: '0.8rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '8px', color: '#FF6B35' }}>
                                        <DollarSign size={20} />
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Stipend</p>
                                        <p style={{ fontWeight: 600 }}>{internship.stipend}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                    <div style={{ padding: '0.8rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '8px', color: '#FF6B35' }}>
                                        <Star size={20} />
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Rating</p>
                                        <p style={{ fontWeight: 600 }}>{internship.company_rating}/5.0</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Application Status Card */}
                        <div className="glass-card" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                                Application Status
                            </h3>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    Status
                                </p>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '0.6rem 1.2rem',
                                    background: applicationData.status === 'completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                                    color: applicationData.status === 'completed' ? '#22c55e' : '#22c55e',
                                    borderRadius: '8px',
                                    fontWeight: 600
                                }}>
                                    {applicationData.status === 'completed' ? 'Completed' : 'Active'}
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    {applicationData.status === 'completed' ? 'Completed Date' : 'Applied Date'}
                                </p>
                                <p style={{ fontWeight: 600 }}>
                                    {applicationData.status === 'completed' 
                                        ? new Date(applicationData.completedDate).toLocaleDateString()
                                        : new Date(applicationData.appliedDate).toLocaleDateString()}
                                </p>
                            </div>

                            {applicationData.status === 'completed' && (
                                <div style={{ 
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    marginBottom: '1.5rem'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <Award size={32} style={{ color: '#22c55e' }} />
                                        <div>
                                            <p style={{ fontWeight: 700, color: '#22c55e', marginBottom: '0.3rem' }}>
                                                Certificate of Completion
                                            </p>
                                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                                                Issued on {new Date(applicationData.certificateIssueDate || new Date()).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleDownloadCertificate}
                                        style={{
                                            display: 'inline-block',
                                            padding: '0.8rem 1.5rem',
                                            background: '#22c55e',
                                            color: 'white',
                                            textDecoration: 'none',
                                            borderRadius: '8px',
                                            fontWeight: 600,
                                            transition: 'all 0.3s',
                                            cursor: 'pointer',
                                            width: '100%',
                                            textAlign: 'center',
                                            border: 'none',
                                            fontSize: '1rem'
                                        }}
                                        onMouseEnter={(e) => e.target.style.background = '#16a34a'}
                                        onMouseLeave={(e) => e.target.style.background = '#22c55e'}
                                    >
                                        <Download size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                                        Download Certificate
                                    </button>
                                </div>
                            )}

                            {applicationData.score && (
                                <div style={{ 
                                    background: 'rgba(255, 107, 53, 0.1)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 107, 53, 0.2)',
                                    marginBottom: '1.5rem'
                                }}>
                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                        Overall Score
                                    </p>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FF6B35', marginBottom: '1rem' }}>
                                        {applicationData.score}%
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                        {Object.entries(applicationData.scoreBreakdown).map(([key, value]) => (
                                            <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', textTransform: 'capitalize' }}>
                                                    {key.replace(/([A-Z])/g, ' $1')}
                                                </p>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <div style={{
                                                        width: '80px',
                                                        height: '6px',
                                                        background: 'rgba(255, 107, 53, 0.2)',
                                                        borderRadius: '3px',
                                                        overflow: 'hidden'
                                                    }}>
                                                        <div style={{
                                                            width: `${value}%`,
                                                            height: '100%',
                                                            background: '#FF6B35'
                                                        }}></div>
                                                    </div>
                                                    <span style={{ color: '#FF6B35', fontWeight: 600, minWidth: '30px' }}>
                                                        {value}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {applicationData.status !== 'completed' && (
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="btn btn-primary"
                                    style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}
                                >
                                    <Upload size={18} /> Upload Project
                                </button>
                            )}
                        </div>

                        {/* Internship Materials Section */}
                        {(applicationData.status === 'accepted' || applicationData.status === 'completed') && internshipMaterials[applicationData.id] && (
                            <div className="glass-card" style={{ padding: '2rem', marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                                    📚 Internship Materials
                                </h3>

                                {/* Videos Section */}
                                {internshipMaterials[applicationData.id].videos && internshipMaterials[applicationData.id].videos.length > 0 && (
                                    <div style={{ marginBottom: '1.5rem' }}>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#FF6B35' }}>
                                            Videos
                                        </h4>
                                        {internshipMaterials[applicationData.id].videos.map((video, idx) => (
                                            <div key={idx} style={{
                                                background: 'rgba(100, 200, 255, 0.1)',
                                                padding: '1rem',
                                                borderRadius: '8px',
                                                marginBottom: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                border: '1px solid rgba(100, 200, 255, 0.2)'
                                            }}>
                                                <Eye size={24} style={{ color: '#3b82f6', flexShrink: 0 }} />
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>
                                                        {video.title}
                                                    </p>
                                                    <a 
                                                        href={video.link} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        style={{ color: '#3b82f6', fontSize: '0.85rem', textDecoration: 'none' }}
                                                    >
                                                        Open Video →
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Projects Section */}
                                {internshipMaterials[applicationData.id].projects && internshipMaterials[applicationData.id].projects.length > 0 && (
                                    <div>
                                        <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', color: '#FF6B35' }}>
                                            Project Files
                                        </h4>
                                        {internshipMaterials[applicationData.id].projects.map((project, idx) => (
                                            <div key={idx} style={{
                                                background: 'rgba(34, 197, 94, 0.1)',
                                                padding: '1rem',
                                                borderRadius: '8px',
                                                marginBottom: '0.8rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '1rem',
                                                border: '1px solid rgba(34, 197, 94, 0.2)'
                                            }}>
                                                <FileText size={24} style={{ color: '#22c55e', flexShrink: 0 }} />
                                                <div style={{ flex: 1 }}>
                                                    <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>
                                                        {project.name}
                                                    </p>
                                                    <a 
                                                        href={project.data} 
                                                        download={project.name}
                                                        style={{ color: '#22c55e', fontSize: '0.85rem', textDecoration: 'none' }}
                                                    >
                                                        Download File →
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* About Company & Details */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    {/* About Company */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>About Company</h3>
                        <p style={{ color: 'var(--text-gray)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            {internship.aboutCompany}
                        </p>
                        <button className="btn btn-primary" style={{ gap: '0.5rem' }}>
                            <Eye size={18} /> Visit Company
                        </button>
                    </div>

                    {/* Required Skills */}
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Required Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            {internship.skills.map((skill, i) => (
                                <div 
                                    key={i}
                                    style={{
                                        padding: '0.6rem 1.2rem',
                                        background: 'rgba(255, 107, 53, 0.15)',
                                        borderRadius: '20px',
                                        color: '#FF6B35',
                                        fontWeight: 500,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Responsibilities & Requirements */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Responsibilities</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {internship.responsibilities.map((responsibility, i) => (
                                <li key={i} style={{ color: 'var(--text-gray)', marginLeft: '1.5rem' }}>
                                    • {responsibility}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Requirements</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {internship.requirements.map((requirement, i) => (
                                <li key={i} style={{ color: 'var(--text-gray)', marginLeft: '1.5rem' }}>
                                    • {requirement}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Uploaded Projects */}
                {applicationData.uploadedProjects.length > 0 && (
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                            <Award size={24} style={{ display: 'inline-block', marginRight: '0.5rem', color: '#FF6B35' }} />
                            Your Uploaded Projects
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                            {applicationData.uploadedProjects.map((project) => (
                                <div key={project.id} className="glass-card" style={{ padding: '1.5rem', borderRadius: '12px' }}>
                                    <div style={{
                                        width: '100%',
                                        height: '150px',
                                        background: `url(${project.screenshot})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        borderRadius: '8px',
                                        marginBottom: '1rem'
                                    }}></div>
                                    <h4 style={{ fontWeight: 700, marginBottom: '0.5rem' }}>{project.title}</h4>
                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                                        {project.description}
                                    </p>
                                    <a 
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: 'inline-block',
                                            color: '#FF6B35',
                                            textDecoration: 'none',
                                            fontWeight: 600
                                        }}
                                    >
                                        View Project →
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Upload Project Modal */}
            {showUploadModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'white' }}>Upload Project</h2>
                            <button 
                                onClick={() => setShowUploadModal(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', padding: 0 }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'white' }}>
                                Project Title
                            </label>
                            <input
                                type="text"
                                value={projectTitle}
                                onChange={(e) => setProjectTitle(e.target.value)}
                                placeholder="Enter project title"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 107, 53, 0.5)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
                                onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'white' }}>
                                Project Description
                            </label>
                            <textarea
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                placeholder="Describe your project..."
                                rows="4"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 107, 53, 0.5)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    fontFamily: 'inherit',
                                    resize: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
                                onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'white' }}>
                                Project Link (GitHub, Deployment, etc.)
                            </label>
                            <input
                                type="url"
                                value={projectLink}
                                onChange={(e) => setProjectLink(e.target.value)}
                                placeholder="https://github.com/your-project"
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    border: '1px solid rgba(255, 107, 53, 0.5)',
                                    borderRadius: '8px',
                                    color: 'white',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    boxSizing: 'border-box',
                                    transition: 'all 0.3s'
                                }}
                                onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
                                onBlur={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'white' }}>
                                Upload Project Files
                            </label>
                            <div style={{
                                border: '2px dashed rgba(255, 107, 53, 0.5)',
                                borderRadius: '8px',
                                padding: '2rem',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.3s',
                                background: 'rgba(255, 107, 53, 0.05)'
                            }} 
                            onClick={() => document.getElementById('fileInput').click()}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.8)';
                                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.5)';
                                e.currentTarget.style.background = 'rgba(255, 107, 53, 0.05)';
                            }}
                            >
                                <Upload size={32} style={{ color: '#FF6B35', margin: '0 auto 0.5rem' }} />
                                <p style={{ fontWeight: 600, color: 'white' }}>Click to upload or drag and drop</p>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>ZIP, PDF, Documents, Code files - up to 50MB</p>
                                <input type="file" id="fileInput" onChange={handleProjectUpload} style={{ display: 'none' }} multiple accept=".zip,.rar,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.java,.py,.js,.jsx,.cpp,.c,.html,.css,.json,.txt,.md" />
                            </div>

                            {projectFiles.length > 0 && (
                                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    {projectFiles.map((file, i) => (
                                        <div key={i} style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '1rem',
                                            background: 'rgba(255, 107, 53, 0.1)',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255, 107, 53, 0.3)'
                                        }}>
                                            <div style={{ flex: 1, textAlign: 'left' }}>
                                                <p style={{ fontWeight: 600, color: 'white', margin: '0 0 0.25rem 0' }}>{file.name}</p>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', margin: 0 }}>{file.size} MB</p>
                                            </div>
                                            <button 
                                                onClick={() => setProjectFiles(projectFiles.filter((_, idx) => idx !== i))}
                                                style={{
                                                    background: 'rgba(255, 107, 53, 0.2)',
                                                    border: '1px solid rgba(255, 107, 53, 0.5)',
                                                    color: '#FF6B35',
                                                    borderRadius: '4px',
                                                    padding: '0.4rem 0.8rem',
                                                    cursor: 'pointer',
                                                    marginLeft: '1rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    fontWeight: 500
                                                }}
                                            >
                                                <X size={16} /> Remove
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={handleAddProject}
                                className="btn btn-primary"
                                style={{ flex: 1, justifyContent: 'center' }}
                            >
                                Upload Project
                            </button>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                style={{
                                    flex: 1,
                                    padding: '0.8rem',
                                    background: 'rgba(255, 107, 53, 0.1)',
                                    color: '#FF6B35',
                                    border: '1px solid rgba(255, 107, 53, 0.3)',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentInternshipDetail;
