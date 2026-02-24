import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, Bell, Briefcase, FileText, BookmarkPlus, Calendar,
    Mail, Phone, MapPin, Edit, Save, GraduationCap, Award, FileDown,
    Upload, X, Star, Zap, Trophy, Target, Linkedin, Github, Twitter, Globe
} from 'lucide-react';
import ImageUploadField from '../components/ImageUploadField';

const EnhancedProfile = () => {
    const email = sessionStorage.getItem('userEmail') || 'student@demo.com';
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [portfolioImages, setPortfolioImages] = useState([]);
    const [resume, setResume] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const handlePortfolioUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.match(/^image\//)) {
                alert('Please select a valid image file');
                return;
            }
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setPortfolioImages([...portfolioImages, reader.result]);
            };
            reader.readAsDataURL(file);
        }
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

    // Initialize profile from localStorage or use defaults
    const getInitialProfile = () => {
        const students = JSON.parse(localStorage.getItem('students') || '{}');
        if (students[email]) {
            return students[email];
        }
        // Extract name from email for new users
        const nameFromEmail = email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' ');
        return {
            name: nameFromEmail,
            bio: 'Passionate developer looking for opportunities',
            email: email,
            phone: '+91 98765 43210',
            location: 'Bangalore, India',
            college: 'ABC University',
            degree: 'B.Tech in Computer Science',
            graduationYear: '2026',
            cgpa: '8.5',
            skills: ['JavaScript', 'React', 'Node.js'],
            resume: null,
            experience: '0 years',
            projects: [],
            socialLinks: {
                linkedin: '',
                github: '',
                twitter: '',
                portfolio: ''
            }
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

    const [achievements] = useState([
        { icon: Trophy, title: 'Interview Master', desc: 'Completed 10+ mock interviews' },
        { icon: Star, title: 'Skill Badge', desc: 'Advanced React Developer' },
        { icon: Zap, title: 'Speed Demon', desc: 'Applied to 15 jobs in a day' },
        { icon: Award, title: 'Top Performer', desc: '85% profile completeness' }
    ]);

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
                        { icon: FileText, label: 'My Applications', path: '/applications' },
                        { icon: BookmarkPlus, label: 'Saved Jobs', path: '/saved-jobs' },
                        { icon: Calendar, label: 'Interviews', path: '/interviews' },
                        { icon: User, label: 'Profile', path: '/profile', active: true }
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
                
                {/* Profile Header with Image */}
                <div className="glass" style={{ padding: '3rem', marginBottom: '2rem', borderRadius: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '3rem', alignItems: 'start' }}>
                        {/* Profile Image Using Reusable Component */}
                        <ImageUploadField 
                            image={profileImage}
                            onImageChange={setProfileImage}
                            label="Add Photo"
                            size="200px"
                            shape="rounded"
                        />

                        {/* Profile Info */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                <div>
                                    <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>{profile.name}</h1>
                                    <p style={{ color: '#FF6B35', fontSize: '1.1rem', marginBottom: '1rem' }}>Full Stack Developer</p>
                                    <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem', maxWidth: '500px' }}>
                                        {profile.bio}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => {
                                        if (isEditing) {
                                            handleSaveProfile();
                                        } else {
                                            setIsEditing(true);
                                        }
                                    }}
                                    className="btn btn-primary"
                                    style={{ gap: '0.5rem' }}
                                >
                                    {isEditing ? <Save size={18} /> : <Edit size={18} />}
                                    {isEditing ? 'Save' : 'Edit'}
                                </button>
                            </div>

                            {/* Quick Stats */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
                                {[
                                    { label: 'Experience', value: profile.experience },
                                    { label: 'Projects', value: profile.projects.length },
                                    { label: 'CGPA', value: profile.cgpa },
                                    { label: 'Completeness', value: '85%' }
                                ].map((stat, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{stat.label}</p>
                                        <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF6B35' }}>{stat.value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Profile Content Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    
                    {/* Left Column */}
                    <div>
                        {/* Contact Information */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 700 }}>Contact Information</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { icon: Mail, label: email, value: 'email' },
                                    { icon: Phone, label: profile.phone, value: 'phone' },
                                    { icon: MapPin, label: profile.location, value: 'location' }
                                ].map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                        <div style={{ padding: '0.8rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '12px', color: '#FF6B35' }}>
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                                                {item.value === 'email' ? 'Email' : item.value === 'phone' ? 'Phone' : 'Location'}
                                            </p>
                                            <p style={{ fontWeight: 500 }}>{item.label}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Social Links</h3>
                            </div>
                            {!isEditing ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {[
                                        { icon: Linkedin, label: 'LinkedIn', url: profile.socialLinks.linkedin, color: '#0A66C2' },
                                        { icon: Github, label: 'GitHub', url: profile.socialLinks.github, color: '#ffffff' },
                                        { icon: Twitter, label: 'Twitter', url: profile.socialLinks.twitter, color: '#1DA1F2' },
                                        { icon: Globe, label: 'Portfolio', url: profile.socialLinks.portfolio, color: '#FF6B35' }
                                    ].map((social, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <div style={{ padding: '0.8rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '12px', color: social.color }}>
                                                <social.icon size={20} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{social.label}</p>
                                                {social.url ? (
                                                    <a 
                                                        href={social.url} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        style={{ 
                                                            fontWeight: 500, 
                                                            color: '#FF6B35', 
                                                            textDecoration: 'none',
                                                            wordBreak: 'break-all'
                                                        }}
                                                    >
                                                        {social.url}
                                                    </a>
                                                ) : (
                                                    <p style={{ fontWeight: 500, color: 'var(--text-gray)' }}>Not added</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {[
                                        { icon: Linkedin, label: 'LinkedIn', key: 'linkedin', color: '#0A66C2' },
                                        { icon: Github, label: 'GitHub', key: 'github', color: '#ffffff' },
                                        { icon: Twitter, label: 'Twitter', key: 'twitter', color: '#1DA1F2' },
                                        { icon: Globe, label: 'Portfolio', key: 'portfolio', color: '#FF6B35' }
                                    ].map((social, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                            <div style={{ padding: '0.8rem', background: 'rgba(255, 107, 53, 0.1)', borderRadius: '12px', color: social.color, marginTop: '0.4rem' }}>
                                                <social.icon size={20} />
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <label style={{ display: 'block', color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem', fontWeight: 600 }}>
                                                    {social.label}
                                                </label>
                                                <input
                                                    type="url"
                                                    placeholder={`https://${social.key}.com/yourprofile`}
                                                    value={profile.socialLinks[social.key] || ''}
                                                    onChange={(e) => setProfile({
                                                        ...profile,
                                                        socialLinks: {
                                                            ...profile.socialLinks,
                                                            [social.key]: e.target.value
                                                        }
                                                    })}
                                                    style={{
                                                        width: '100%',
                                                        padding: '0.8rem',
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        border: '1px solid rgba(255, 107, 53, 0.3)',
                                                        borderRadius: '8px',
                                                        color: 'white',
                                                        fontSize: '0.9rem',
                                                        outline: 'none',
                                                        transition: 'all 0.3s'
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = '#FF6B35';
                                                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = 'rgba(255, 107, 53, 0.3)';
                                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Education */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <GraduationCap size={24} style={{ color: '#FF6B35' }} />
                                Education
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <div>
                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Degree</p>
                                    <p style={{ fontWeight: 600 }}>{profile.degree}</p>
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>College</p>
                                    <p style={{ fontWeight: 600 }}>{profile.college}</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Graduation Year</p>
                                        <p style={{ fontWeight: 600 }}>{profile.graduationYear}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>CGPA</p>
                                        <p style={{ fontWeight: 600, color: '#FF6B35' }}>{profile.cgpa}/10</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        {/* Resume */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <FileDown size={24} style={{ color: '#FF6B35' }} />
                                Resume
                            </h3>
                            <button 
                                onClick={() => document.getElementById('resumeInput').click()}
                                className="btn btn-primary"
                                style={{ width: '100%', justifyContent: 'center', padding: '0.8rem', marginBottom: resume ? '1rem' : 0 }}
                            >
                                <Upload size={18} /> {resume ? 'Update Resume' : 'Upload Resume'}
                            </button>
                            <input type="file" id="resumeInput" onChange={handleResumeUpload} style={{ display: 'none' }} accept=".pdf" />
                            
                            {resume && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <div style={{ padding: '1rem', background: 'rgba(255, 107, 53, 0.15)', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <FileText size={20} style={{ color: '#FF6B35' }} />
                                            <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#FF6B35' }}>{resume}</span>
                                        </div>
                                        <button onClick={handleRemoveResume} style={{ background: 'none', border: 'none', color: '#FF6B35', cursor: 'pointer', padding: '0.4rem' }}>
                                            <X size={18} />
                                        </button>
                                    </div>
                                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.8rem' }} onClick={handleDownloadResume}>
                                        <FileDown size={18} /> Download Resume
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Skills */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 700 }}>Skills</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                                {profile.skills.map((skill, i) => (
                                    <div 
                                        key={i}
                                        style={{
                                            padding: '0.6rem 1.2rem',
                                            background: 'rgba(255, 107, 53, 0.15)',
                                            border: '1px solid rgba(255, 107, 53, 0.3)',
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

                        {/* Projects */}
                        <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 700 }}>Projects</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {profile.projects.map((project, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1.2rem' }}>
                                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{project}</p>
                                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Click to view project details</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '16px', marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Trophy size={24} style={{ color: '#FF6B35' }} />
                        Achievements & Badges
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {achievements.map((achievement, i) => (
                            <div key={i} style={{
                                padding: '1.5rem',
                                background: 'rgba(255, 107, 53, 0.05)',
                                borderRadius: '16px',
                                textAlign: 'center',
                                border: '1px solid rgba(255, 107, 53, 0.1)'
                            }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    background: 'rgba(255, 107, 53, 0.15)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem',
                                    color: '#FF6B35'
                                }}>
                                    <achievement.icon size={26} />
                                </div>
                                <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>{achievement.title}</p>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>{achievement.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Portfolio Images */}
                <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', fontWeight: 700 }}>Portfolio & Certificates</h3>
                    <div style={{
                        border: '2px dashed rgba(255, 107, 53, 0.3)',
                        borderRadius: '12px',
                        padding: '2rem',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginBottom: '2rem',
                        transition: 'all 0.3s'
                    }} onClick={() => document.getElementById('portfolioInput').click()}>
                        <Upload size={40} style={{ color: '#FF6B35', margin: '0 auto 1rem' }} />
                        <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Upload Portfolio Images or Certificates</p>
                        <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Drag and drop or click to browse</p>
                        <input type="file" id="portfolioInput" onChange={handlePortfolioUpload} style={{ display: 'none' }} accept="image/*" />
                    </div>

                    {portfolioImages.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                            {portfolioImages.map((img, i) => (
                                <div key={i} style={{
                                    width: '100%',
                                    height: '150px',
                                    background: `url(${img})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(255, 107, 53, 0.2)',
                                    position: 'relative'
                                }}>
                                    <button 
                                        onClick={() => setPortfolioImages(portfolioImages.filter((_, idx) => idx !== i))}
                                        style={{
                                            position: 'absolute',
                                            top: '0.5rem',
                                            right: '0.5rem',
                                            background: 'rgba(0,0,0,0.6)',
                                            border: 'none',
                                            color: 'white',
                                            borderRadius: '6px',
                                            padding: '0.4rem',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .hover-upload:hover {
                    opacity: 1 !important;
                }
            `}</style>
        </div>
    );
};

export default EnhancedProfile;
