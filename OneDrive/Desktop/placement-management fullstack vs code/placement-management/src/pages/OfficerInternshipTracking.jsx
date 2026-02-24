import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, Award, Users, TrendingUp, Upload, X, CheckCircle, 
    AlertCircle, Clock, Download, FileText, Play, Folder, Eye
} from 'lucide-react';

const OfficerInternshipTracking = ({ internships = [], applications = [], onUpdateScore, onUpdateStatus, onAddMaterials }) => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('pending');
    const [showScoreModal, setShowScoreModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [certificateFile, setCertificateFile] = useState(null);
    const [uploadedVideos, setUploadedVideos] = useState({});
    const [uploadedProjects, setUploadedProjects] = useState({});
    const [videoLink, setVideoLink] = useState('');
    const [projectFile, setProjectFile] = useState(null);
    const [scoreData, setScoreData] = useState({
        coreSkills: 85,
        projectQuality: 80,
        communication: 85,
        teamwork: 82
    });

    const handleOpenScoreModal = (student) => {
        setSelectedStudent(student);
        if (student.score) {
            // This would be fetched from the student's actual scores
            setScoreData({
                coreSkills: 85,
                projectQuality: 87,
                communication: 83,
                teamwork: 85
            });
        } else {
            setScoreData({
                coreSkills: 0,
                projectQuality: 0,
                communication: 0,
                teamwork: 0
            });
        }
        setShowScoreModal(true);
    };

    const handleSaveScore = () => {
        if (selectedStudent) {
            const overallScore = Math.round(
                (scoreData.coreSkills + scoreData.projectQuality + 
                 scoreData.communication + scoreData.teamwork) / 4
            );
            alert(`Score saved for ${selectedStudent.name}\nOverall: ${overallScore}%`);
            setShowScoreModal(false);
        }
    };

    const handleDownloadCertificate = (student) => {
        alert(`Downloading certificate for ${student.name}`);
    };

    const handleOpenCertificateModal = (student) => {
        setSelectedStudent(student);
        setCertificateFile(null);
        setShowCertificateModal(true);
    };

    const handleUploadCertificate = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setCertificateFile({
                    name: file.name,
                    data: event.target.result,
                    type: file.type
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveCertificate = () => {
        if (selectedStudent && certificateFile) {
            // Save certificate to localStorage with student email
            const certificates = JSON.parse(localStorage.getItem('internshipCertificates') || '{}');
            if (!certificates[selectedStudent.email]) {
                certificates[selectedStudent.email] = [];
            }
            
            certificates[selectedStudent.email].push({
                internshipId: selectedStudent.internshipId,
                internshipTitle: selectedStudent.internshipTitle,
                company: selectedStudent.company,
                certificateName: certificateFile.name,
                certificateData: certificateFile.data,
                uploadedDate: new Date().toISOString(),
                score: selectedStudent.score || 0
            });
            
            localStorage.setItem('internshipCertificates', JSON.stringify(certificates));
            
            // Also update the applications to mark as completed
            const applications = JSON.parse(localStorage.getItem('internshipApplications') || '{}');
            if (!applications[selectedStudent.email]) {
                applications[selectedStudent.email] = [];
            }
            
            const appIndex = applications[selectedStudent.email].findIndex(
                app => app.internshipId === selectedStudent.internshipId
            );
            
            if (appIndex !== -1) {
                applications[selectedStudent.email][appIndex].status = 'completed';
                applications[selectedStudent.email][appIndex].certificateUrl = certificateFile.data;
                applications[selectedStudent.email][appIndex].certificateIssueDate = new Date().toISOString();
                applications[selectedStudent.email][appIndex].score = selectedStudent.score || 0;
                applications[selectedStudent.email][appIndex].completedDate = new Date().toISOString();
            } else {
                applications[selectedStudent.email].push({
                    id: Math.random(),
                    internshipId: selectedStudent.internshipId,
                    internshipTitle: selectedStudent.internshipTitle,
                    company: selectedStudent.company,
                    studentEmail: selectedStudent.email,
                    status: 'completed',
                    appliedDate: new Date().toISOString(),
                    completedDate: new Date().toISOString(),
                    score: selectedStudent.score || 0,
                    certificateUrl: certificateFile.data,
                    certificateIssueDate: new Date().toISOString()
                });
            }
            
            localStorage.setItem('internshipApplications', JSON.stringify(applications));
            
            alert(`Certificate uploaded for ${selectedStudent.name}\nFile: ${certificateFile.name}\nThis will now appear in the student's Completed section!`);
            setShowCertificateModal(false);
            setCertificateFile(null);
        } else {
            alert('Please select a file to upload');
        }
    };

    const handleOpenUploadModal = (student) => {
        setSelectedStudent(student);
        setVideoLink('');
        setProjectFile(null);
        setShowUploadModal(true);
    };

    const handleUploadProjectFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProjectFile({
                    name: file.name,
                    data: event.target.result,
                    type: file.type
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveUpload = () => {
        if (selectedStudent && (videoLink || projectFile)) {
            const videos = videoLink ? [{ link: videoLink, title: 'Video - ' + new Date().toLocaleDateString() }] : [];
            const projects = projectFile ? [{ name: projectFile.name, data: projectFile.data }] : [];
            
            // Save to global state via callback
            if (onAddMaterials) {
                onAddMaterials(selectedStudent.id, videos, projects);
            }
            
            // Also save to local state for display
            const studentId = selectedStudent.id;
            
            if (videoLink) {
                setUploadedVideos({
                    ...uploadedVideos,
                    [studentId]: [
                        ...(uploadedVideos[studentId] || []),
                        { link: videoLink, title: 'Video ' + ((uploadedVideos[studentId]?.length || 0) + 1) }
                    ]
                });
            }
            
            if (projectFile) {
                setUploadedProjects({
                    ...uploadedProjects,
                    [studentId]: [
                        ...(uploadedProjects[studentId] || []),
                        { name: projectFile.name, data: projectFile.data }
                    ]
                });
            }
            
            alert(`Videos and projects uploaded for ${selectedStudent.name}`);
            setShowUploadModal(false);
            setVideoLink('');
            setProjectFile(null);
        } else {
            alert('Please provide at least a video link or project file');
        }
    };

    const handleApproveApplication = (student) => {
        if (onUpdateStatus) {
            onUpdateStatus(student.id, 'accepted');
            alert(`Application approved for ${student.name}. Moved to ongoing internships.`);
        } else {
            alert(`Application approved for ${student.name}. Moving to ongoing internships.`);
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const getPendingStudents = () => {
        // Get from localStorage
        const storedApplications = JSON.parse(localStorage.getItem('internshipApplications') || '{}');
        const pendingApps = [];
        
        Object.entries(storedApplications).forEach(([email, apps]) => {
            apps.filter(app => app.status !== 'completed').forEach(app => {
                pendingApps.push({
                    id: app.id,
                    name: app.studentName || email.split('@')[0].replace('.', ' '),
                    email: email,
                    internshipId: app.internshipId,
                    appliedDate: app.appliedDate,
                    status: 'accepted',
                    score: app.score || null,
                    projects: app.uploadedProjects || [],
                    attendance: 0,
                    reviews: 'In Progress',
                    internshipTitle: app.internshipTitle,
                    company: app.company
                });
            });
        });
        
        // Also include from props for demo data if no stored applications
        if (applications && pendingApps.length === 0) {
            return applications
                .filter(app => app.status === 'pending')
                .map(app => ({
                    id: app.id,
                    name: app.studentName,
                    email: app.studentEmail,
                    internshipId: app.internshipId,
                    appliedDate: app.appliedDate,
                    status: 'pending',
                    score: null,
                    projects: app.projects || [],
                    attendance: 0,
                    reviews: 'Awaiting approval',
                    internshipTitle: app.title,
                    company: app.company
                }));
        }
        return pendingApps;
    };

    const getOngoingStudents = () => {
        // Get from localStorage
        const storedApplications = JSON.parse(localStorage.getItem('internshipApplications') || '{}');
        const ongoingApps = [];
        
        Object.entries(storedApplications).forEach(([email, apps]) => {
            apps.filter(app => app.status === 'accepted').forEach(app => {
                ongoingApps.push({
                    id: app.id,
                    name: app.studentName || email.split('@')[0].replace('.', ' '),
                    email: email,
                    internshipId: app.internshipId,
                    appliedDate: app.appliedDate,
                    status: 'accepted',
                    score: app.score || null,
                    projects: app.uploadedProjects || [],
                    attendance: Math.floor(Math.random() * 20) + 80,
                    reviews: 'In Progress',
                    internshipTitle: app.internshipTitle,
                    company: app.company
                });
            });
        });
        
        // Also include from props for demo data if no stored applications
        if (applications && ongoingApps.length === 0) {
            return applications
                .filter(app => app.status === 'accepted')
                .map(app => ({
                    id: app.id,
                    name: app.studentName,
                    email: app.studentEmail,
                    internshipId: app.internshipId,
                    appliedDate: app.appliedDate,
                    status: 'accepted',
                    score: app.score,
                    projects: app.projects || [],
                    attendance: Math.floor(Math.random() * 20) + 80,
                    reviews: 'In Progress',
                    internshipTitle: app.title,
                    company: app.company
                }));
        }
        return ongoingApps;
    };

    const getCompletedStudents = () => {
        // Get from localStorage
        const storedApplications = JSON.parse(localStorage.getItem('internshipApplications') || '{}');
        const completedApps = [];
        
        Object.entries(storedApplications).forEach(([email, apps]) => {
            apps.filter(app => app.status === 'completed').forEach(app => {
                completedApps.push({
                    id: app.id,
                    name: app.studentName || email.split('@')[0].replace('.', ' '),
                    email: email,
                    internshipId: app.internshipId,
                    appliedDate: app.appliedDate,
                    status: 'completed',
                    score: app.score || 0,
                    projects: app.uploadedProjects || [],
                    attendance: Math.floor(Math.random() * 15) + 85,
                    reviews: 'Completed successfully',
                    internshipTitle: app.internshipTitle,
                    company: app.company
                });
            });
        });
        
        // Also include from props for demo data if no stored applications
        if (applications && completedApps.length === 0) {
            return applications
                .filter(app => app.status === 'completed')
                .map(app => ({
                    id: app.id,
                    name: app.studentName,
                    email: app.studentEmail,
                    internshipId: app.internshipId,
                    appliedDate: app.appliedDate,
                    status: 'completed',
                    score: app.score,
                    projects: app.projects || [],
                    attendance: Math.floor(Math.random() * 15) + 85,
                    reviews: 'Completed successfully',
                    internshipTitle: app.title,
                    company: app.company
                }));
        }
        return completedApps;
    };

    const displayStudents = activeTab === 'pending' ? getPendingStudents() : activeTab === 'ongoing' ? getOngoingStudents() : getCompletedStudents();

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', display: 'flex', flexDirection: 'column', padding: '2rem', height: 'fit-content', position: 'sticky', top: '1rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/dashboard')}>
                    CareerMatch
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    {[
                        { icon: Award, label: 'Internship Tracking', path: '#', active: true },
                        { icon: Users, label: 'Students', path: '#' },
                        { icon: TrendingUp, label: 'Reports', path: '#' }
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
                                Internship & Project Tracking
                            </h1>
                            <p style={{ color: 'var(--text-gray)' }}>Monitor student progress and upload scores</p>
                        </div>
                        <Award size={60} style={{ color: '#FF6B35', opacity: 0.3 }} />
                    </div>

                    {/* Statistics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Total Internships
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF6B35' }}>
                                {internships && internships.length}
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Pending Approvals
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#e11d48' }}>
                                {getPendingStudents().length}
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Ongoing
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF6B35' }}>
                                {getOngoingStudents().length}
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Completed
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#22c55e' }}>
                                {getCompletedStudents().length}
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Average Score
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF6B35' }}>
                                {applications && applications.filter(a => a.score).length > 0
                                    ? Math.round(applications.filter(a => a.score).reduce((sum, a) => sum + a.score, 0) / applications.filter(a => a.score).length)
                                    : 0
                                }%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255, 107, 53, 0.2)', paddingBottom: '1rem' }}>
                    {['pending', 'ongoing', 'completed'].map((tab) => (
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

                {/* Student List */}
                <div>
                    {displayStudents.length > 0 ? (
                        displayStudents.map((student) => (
                            <div key={student.id} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{
                                                width: '50px',
                                                height: '50px',
                                                background: 'rgba(255, 107, 53, 0.2)',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#FF6B35',
                                                fontWeight: 700,
                                                fontSize: '1.2rem',
                                                flexShrink: 0
                                            }}>
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                                                    {student.name}
                                                </h3>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                                    {student.email}
                                                </p>
                                                <p style={{ color: '#FF6B35', fontWeight: 600, fontSize: '0.9rem' }}>
                                                    {student.internshipTitle}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                                    Start Date
                                                </p>
                                                <p style={{ fontWeight: 600 }}>
                                                    {new Date(student.startDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                                    Attendance
                                                </p>
                                                <p style={{ fontWeight: 600, color: student.attendance >= 90 ? '#22c55e' : '#FF6B35' }}>
                                                    {student.attendance}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                                                Projects
                                            </p>
                                            {student.projects.map((project) => (
                                                <div key={project.id} className="glass-card" style={{ padding: '0.8rem', marginBottom: '0.5rem' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                                        <div>
                                                            <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>
                                                                {project.title}
                                                            </p>
                                                            <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem' }}>
                                                                Submissions: {project.submissions}
                                                            </p>
                                                        </div>
                                                        <div style={{
                                                            padding: '0.2rem 0.6rem',
                                                            background: project.status === 'completed' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 107, 53, 0.2)',
                                                            color: project.status === 'completed' ? '#22c55e' : '#FF6B35',
                                                            borderRadius: '4px',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 600
                                                        }}>
                                                            {project.status === 'completed' ? 'Done' : 'In Progress'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                                            Officer Notes
                                        </p>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '1rem', fontStyle: 'italic' }}>
                                            "{student.reviews}"
                                        </p>
                                    </div>
                                </div>

                                {/* Pending Approval Actions */}
                                {activeTab === 'pending' && (
                                    <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 107, 53, 0.2)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                        <button
                                            onClick={() => handleOpenUploadModal(student)}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                color: '#3b82f6',
                                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Folder size={16} /> Upload Videos/Projects
                                        </button>
                                        <button
                                            onClick={() => handleApproveApplication(student)}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: 'rgba(34, 197, 94, 0.1)',
                                                color: '#22c55e',
                                                border: '1px solid rgba(34, 197, 94, 0.3)',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            Approve Application
                                        </button>
                                    </div>
                                )}

                                {/* Score Display / Upload Section */}
                                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 107, 53, 0.2)' }}>
                                    {student.score ? (
                                        <div style={{
                                            background: 'rgba(255, 107, 53, 0.1)',
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255, 107, 53, 0.2)',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.3rem' }}>
                                                    Overall Score
                                                </p>
                                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#FF6B35' }}>
                                                    {student.score}%
                                                </p>
                                            </div>
                                            <div style={{ display: 'flex', gap: '1rem' }}>
                                                <button
                                                    onClick={() => handleOpenScoreModal(student)}
                                                    style={{
                                                        padding: '0.6rem 1.2rem',
                                                        background: 'rgba(100, 200, 255, 0.1)',
                                                        color: '#64c8ff',
                                                        border: '1px solid rgba(100, 200, 255, 0.3)',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <Upload size={16} /> Update Score
                                                </button>
                                                {student.status === 'completed' && (
                                                    <button
                                                        onClick={() => handleOpenCertificateModal(student)}
                                                        style={{
                                                            padding: '0.6rem 1.2rem',
                                                            background: 'rgba(184, 134, 11, 0.1)',
                                                            color: '#b8860b',
                                                            border: '1px solid rgba(184, 134, 11, 0.3)',
                                                            borderRadius: '8px',
                                                            cursor: 'pointer',
                                                            fontWeight: 600,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem'
                                                        }}
                                                    >
                                                        <Upload size={16} /> Upload Certificate
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => handleDownloadCertificate(student)}
                                                    style={{
                                                        padding: '0.6rem 1.2rem',
                                                        background: 'rgba(34, 197, 94, 0.1)',
                                                        color: '#22c55e',
                                                        border: '1px solid rgba(34, 197, 94, 0.3)',
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        fontWeight: 600,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.5rem'
                                                    }}
                                                >
                                                    <Download size={16} /> Certificate
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleOpenScoreModal(student)}
                                            className="btn btn-primary"
                                            style={{ gap: '0.5rem' }}
                                        >
                                            <Upload size={18} /> Upload Score
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px' }}>
                            <AlertCircle size={60} style={{ color: 'var(--text-gray)', margin: '0 auto 1rem', opacity: 0.5 }} />
                            <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>
                                No {activeTab} internships at the moment
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Score Modal */}
            {showScoreModal && selectedStudent && (
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
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', maxWidth: '600px', width: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                                    Upload Score
                                </h2>
                                <p style={{ color: 'var(--text-gray)' }}>{selectedStudent.name}</p>
                            </div>
                            <button 
                                onClick={() => setShowScoreModal(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {Object.entries(scoreData).map(([key, value]) => (
                                <div key={key}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'capitalize' }}>
                                        {key.replace(/([A-Z])/g, ' $1')}
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={value}
                                            onChange={(e) => setScoreData({...scoreData, [key]: parseInt(e.target.value)})}
                                            style={{ flex: 1, cursor: 'pointer' }}
                                        />
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={value}
                                            onChange={(e) => setScoreData({...scoreData, [key]: Math.min(100, Math.max(0, parseInt(e.target.value) || 0))})}
                                            style={{
                                                width: '70px',
                                                padding: '0.5rem',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 107, 53, 0.3)',
                                                borderRadius: '6px',
                                                color: 'white',
                                                textAlign: 'center',
                                                outline: 'none'
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}

                            <div style={{
                                background: 'rgba(255, 107, 53, 0.1)',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 107, 53, 0.2)',
                                textAlign: 'center'
                            }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    Overall Score
                                </p>
                                <p style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FF6B35' }}>
                                    {Math.round((scoreData.coreSkills + scoreData.projectQuality + scoreData.communication + scoreData.teamwork) / 4)}%
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handleSaveScore}
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    Save Score
                                </button>
                                <button
                                    onClick={() => setShowScoreModal(false)}
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
                </div>
            )}

            {/* Certificate Upload Modal */}
            {showCertificateModal && selectedStudent && (
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
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', maxWidth: '600px', width: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                                    Upload Certificate
                                </h2>
                                <p style={{ color: 'var(--text-gray)' }}>{selectedStudent.name}</p>
                            </div>
                            <button 
                                onClick={() => setShowCertificateModal(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{
                                background: 'rgba(184, 134, 11, 0.1)',
                                padding: '2rem',
                                borderRadius: '12px',
                                border: '2px dashed rgba(184, 134, 11, 0.3)',
                                cursor: 'pointer',
                                textAlign: 'center',
                                transition: 'all 0.3s'
                            }}>
                                <input
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={handleUploadCertificate}
                                    style={{ display: 'none' }}
                                    id="certificateInput"
                                />
                                <label htmlFor="certificateInput" style={{ cursor: 'pointer', display: 'block' }}>
                                    <FileText size={40} style={{ color: '#b8860b', margin: '0 auto 1rem' }} />
                                    <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                                        Click to upload certificate
                                    </p>
                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                                        PDF, JPG, or PNG (Max 10MB)
                                    </p>
                                </label>
                            </div>

                            {certificateFile && (
                                <div style={{
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    padding: '1.5rem',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(34, 197, 94, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <FileText size={24} style={{ color: '#22c55e' }} />
                                        <div>
                                            <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>
                                                {certificateFile.name}
                                            </p>
                                            <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem' }}>
                                                Ready to upload
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setCertificateFile(null)}
                                        style={{
                                            background: 'rgba(255, 107, 53, 0.1)',
                                            border: 'none',
                                            color: '#FF6B35',
                                            cursor: 'pointer',
                                            borderRadius: '50%',
                                            width: '30px',
                                            height: '30px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handleSaveCertificate}
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                    disabled={!certificateFile}
                                >
                                    Save Certificate
                                </button>
                                <button
                                    onClick={() => setShowCertificateModal(false)}
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
                </div>
            )}

            {/* Upload Videos/Projects Modal */}
            {showUploadModal && selectedStudent && (
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
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', maxWidth: '600px', width: '90%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                                    Upload Materials
                                </h2>
                                <p style={{ color: 'var(--text-gray)' }}>{selectedStudent.name}</p>
                            </div>
                            <button 
                                onClick={() => setShowUploadModal(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Video Link Input */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Video Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://youtube.com/watch?v=... or any video link"
                                    value={videoLink}
                                    onChange={(e) => setVideoLink(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 107, 53, 0.3)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none',
                                        fontSize: '0.95rem'
                                    }}
                                />
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                                    Add a video link from YouTube, Vimeo, or any streaming platform
                                </p>
                            </div>

                            {/* Project File Upload */}
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                    Project File
                                </label>
                                <div style={{
                                    background: 'rgba(100, 200, 255, 0.1)',
                                    padding: '2rem',
                                    borderRadius: '12px',
                                    border: '2px dashed rgba(100, 200, 255, 0.3)',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.3s'
                                }}>
                                    <input
                                        type="file"
                                        accept=".pdf,.zip,.rar,.docx,.xlsx,.pptx"
                                        onChange={handleUploadProjectFile}
                                        style={{ display: 'none' }}
                                        id="projectInput"
                                    />
                                    <label htmlFor="projectInput" style={{ cursor: 'pointer', display: 'block' }}>
                                        <Folder size={40} style={{ color: '#3b82f6', margin: '0 auto 1rem' }} />
                                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
                                            Click to upload project
                                        </p>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                                            PDF, ZIP, DOCX, XLSX, PPTX (Max 50MB)
                                        </p>
                                    </label>
                                </div>
                                {projectFile && (
                                    <div style={{
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        marginTop: '1rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <Folder size={20} style={{ color: '#22c55e' }} />
                                            <p style={{ fontWeight: 600, color: '#22c55e', fontSize: '0.9rem' }}>
                                                {projectFile.name}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setProjectFile(null)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#FF6B35',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            <X size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* User Feedback */}
                            <div style={{
                                background: 'rgba(59, 130, 246, 0.1)',
                                padding: '1rem',
                                borderRadius: '12px',
                                border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                                    ℹ️ Add video link and/or project file. After saving, the student will see these materials once approved.
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handleSaveUpload}
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                    disabled={!videoLink && !projectFile}
                                >
                                    Save Materials
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
                </div>
            )}
        </div>
    );
};

export default OfficerInternshipTracking;
