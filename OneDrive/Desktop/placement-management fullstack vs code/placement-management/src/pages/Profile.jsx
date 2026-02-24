import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, FileText, BookmarkPlus, Calendar,
    Mail, Phone, MapPin, Edit, Save, GraduationCap, Award, FileDown, Upload, X
} from 'lucide-react';

const Profile = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [resume, setResume] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const handleResumeUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            setResumeFile(file);
            const fileName = file.name;
            setResume(fileName);
            const updatedProfile = {...profile, resume: fileName};
            setProfile(updatedProfile);
            // Save to localStorage
            const students = JSON.parse(localStorage.getItem('students') || '{}');
            students[email] = updatedProfile;
            localStorage.setItem('students', JSON.stringify(students));
            alert('Resume uploaded successfully!');
        } else {
            alert('Please upload a PDF file');
        }
        e.target.value = '';
    };

    const handleDownloadResume = () => {
        if (resumeFile) {
            const url = URL.createObjectURL(resumeFile);
            const link = document.createElement('a');
            link.href = url;
            link.download = resumeFile.name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    };

    const handleRemoveResume = () => {
        setResume(null);
        setResumeFile(null);
        const updatedProfile = {...profile, resume: null};
        setProfile(updatedProfile);
        // Save to localStorage
        const students = JSON.parse(localStorage.getItem('students') || '{}');
        students[email] = updatedProfile;
        localStorage.setItem('students', JSON.stringify(students));
    };

    // Get profile from localStorage or use defaults based on email
    const getInitialProfile = () => {
        const students = JSON.parse(localStorage.getItem('students') || '{}');
        if (students[email]) {
            return students[email];
        }
        // For new users, generate name from email
        const nameFromEmail = email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
        return {
            name: nameFromEmail,
            email: email,
            phone: '+91 98765 43210',
            location: 'Bangalore, India',
            college: 'ABC University',
            degree: 'B.Tech in Computer Science',
            graduationYear: '2026',
            cgpa: '8.5',
            skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'MongoDB'],
            resume: null
        };
    };

    const [profile, setProfile] = useState(getInitialProfile());

    const handleSaveProfile = () => {
        // Save to localStorage
        const students = JSON.parse(localStorage.getItem('students') || '{}');
        students[email] = profile;
        localStorage.setItem('students', JSON.stringify(students));
        setIsEditing(false);
        alert('Profile saved successfully!');
    };

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
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', cursor: 'pointer' }} onClick={() => navigate('/interviews')}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
                            <Calendar size={20} /> <span>Interviews</span>
                        </div>
                    </div>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', cursor: 'pointer' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)' }}>
                            <User size={20} /> <span style={{ fontWeight: 600 }}>Profile</span>
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
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>My Profile</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Manage your personal information</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <button 
                            onClick={() => {
                                if (isEditing) {
                                    handleSaveProfile();
                                } else {
                                    setIsEditing(true);
                                }
                            }}
                            className={isEditing ? 'btn btn-primary' : 'btn btn-outline'}
                            style={{ padding: '0.6rem 1.5rem' }}
                        >
                            {isEditing ? <><Save size={18} /> Save Changes</> : <><Edit size={18} /> Edit Profile</>}
                        </button>
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

                {/* Profile Content */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
                    
                    {/* Left Column - Profile Card */}
                    <div>
                        <div className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
                            <div style={{ 
                                width: '120px', 
                                height: '120px', 
                                borderRadius: '50%', 
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '3rem',
                                color: 'white',
                                margin: '0 auto 1.5rem'
                            }}>
                                {profile.name.charAt(0)}
                            </div>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{profile.name}</h2>
                            <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>{profile.degree}</p>
                            
                            <div style={{ padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', marginBottom: '1rem' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '0.3rem' }}>CGPA</p>
                                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)' }}>{profile.cgpa}</p>
                            </div>

                            <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }} onClick={() => document.getElementById('resumeInput').click()}>
                                <Upload size={18} /> {resume ? 'Update Resume' : 'Upload Resume'}
                            </button>
                            <input type="file" id="resumeInput" onChange={handleResumeUpload} style={{ display: 'none' }} accept=".pdf" />

                            {resume && (
                                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <div style={{ padding: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#6366f1' }}>{resume}</span>
                                        <button onClick={handleRemoveResume} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}>
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleDownloadResume}>
                                        <FileDown size={18} /> Download Resume
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="glass" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Quick Stats</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div className="glass-card" style={{ padding: '1rem' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '0.3rem' }}>Applications</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>12</p>
                                </div>
                                <div className="glass-card" style={{ padding: '1rem' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '0.3rem' }}>Interviews</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>3</p>
                                </div>
                                <div className="glass-card" style={{ padding: '1rem' }}>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '0.3rem' }}>Offers</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#10b981' }}>1</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Details */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        
                        {/* Personal Information */}
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Personal Information</h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                                        <input 
                                            type="text" 
                                            value={profile.name}
                                            disabled={!isEditing}
                                            className="form-input" 
                                            style={{ paddingLeft: '3rem' }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                                        <input 
                                            type="email" 
                                            value={profile.email}
                                            disabled={!isEditing}
                                            className="form-input" 
                                            style={{ paddingLeft: '3rem' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Phone Number</label>
                                        <div style={{ position: 'relative' }}>
                                            <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                                            <input 
                                                type="tel" 
                                                value={profile.phone}
                                                disabled={!isEditing}
                                                className="form-input" 
                                                style={{ paddingLeft: '3rem' }}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Location</label>
                                        <div style={{ position: 'relative' }}>
                                            <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                                            <input 
                                                type="text" 
                                                value={profile.location}
                                                disabled={!isEditing}
                                                className="form-input" 
                                                style={{ paddingLeft: '3rem' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Educational Information */}
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Education</h3>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">College/University</label>
                                    <div style={{ position: 'relative' }}>
                                        <GraduationCap size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                                        <input 
                                            type="text" 
                                            value={profile.college}
                                            disabled={!isEditing}
                                            className="form-input" 
                                            style={{ paddingLeft: '3rem' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label className="form-label">Degree</label>
                                        <input 
                                            type="text" 
                                            value={profile.degree}
                                            disabled={!isEditing}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Graduation Year</label>
                                        <input 
                                            type="text" 
                                            value={profile.graduationYear}
                                            disabled={!isEditing}
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">CGPA</label>
                                        <input 
                                            type="text" 
                                            value={profile.cgpa}
                                            disabled={!isEditing}
                                            className="form-input"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Skills</h3>
                            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                {profile.skills.map(skill => (
                                    <span key={skill} className="glass-card" style={{ 
                                        padding: '0.6rem 1.2rem', 
                                        fontSize: '0.95rem',
                                        background: 'rgba(99, 102, 241, 0.1)',
                                        color: 'var(--primary)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        {skill}
                                        {isEditing && <span style={{ cursor: 'pointer', opacity: 0.6 }}>×</span>}
                                    </span>
                                ))}
                                {isEditing && (
                                    <button className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.95rem' }}>
                                        + Add Skill
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
