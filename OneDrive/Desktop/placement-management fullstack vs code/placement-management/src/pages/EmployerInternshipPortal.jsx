import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, Plus, Edit, Trash2, Eye, Users, Clock, DollarSign, 
    FileText, X, Award, TrendingUp
} from 'lucide-react';

const EmployerInternshipPortal = ({ internships = [], applications = [], onPostInternship }) => {
    const navigate = useNavigate();
    const employerEmail = sessionStorage.getItem('userEmail') || 'employer@demo.com';
    const [activeTab, setActiveTab] = useState('internships');
    const [showModal, setShowModal] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewingInternship, setViewingInternship] = useState(null);
    const [localInternships, setLocalInternships] = useState(internships);

    const [projects, setProjects] = useState([
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'Build a real-time e-commerce platform',
            duration: '2 months',
            internshipId: 1,
            team: 2,
            status: 'ongoing',
            createdDate: '2024-02-05'
        },
        {
            id: 2,
            title: 'Real-time Chat Application',
            description: 'Develop a chat application using WebSockets',
            duration: '1.5 months',
            internshipId: 1,
            team: 3,
            status: 'completed',
            createdDate: '2024-01-20'
        }
    ]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        duration: '',
        stipend: '',
        skills: ''
    });

    const handleOpenModal = (internship = null) => {
        if (internship) {
            setFormData({
                title: internship.title,
                description: internship.description,
                duration: internship.duration,
                stipend: internship.stipend,
                skills: internship.skills.join(', ')
            });
            setEditingId(internship.id);
        } else {
            setFormData({
                title: '',
                description: '',
                duration: '',
                stipend: '',
                skills: ''
            });
            setEditingId(null);
        }
        setShowModal(true);
    };

    const handleSaveInternship = () => {
        if (!formData.title.trim() || !formData.description.trim()) {
            alert('Please fill in all required fields');
            return;
        }

        if (editingId) {
            setLocalInternships(localInternships.map(internship =>
                internship.id === editingId
                    ? {
                        ...internship,
                        title: formData.title,
                        description: formData.description,
                        duration: formData.duration,
                        stipend: formData.stipend,
                        skills: formData.skills.split(',').map(s => s.trim())
                    }
                    : internship
            ));
        } else {
            const newInternship = {
                title: formData.title,
                description: formData.description,
                duration: formData.duration,
                stipend: formData.stipend,
                skills: formData.skills.split(',').map(s => s.trim()),
                company: 'Your Company',
                companyEmail: employerEmail,
                location: 'Location',
                posted: 'just now',
                company_rating: 4.5,
                applicants: 0,
                status: 'active'
            };
            onPostInternship(newInternship);
        }
        setShowModal(false);
    };

    const handleDeleteInternship = (id) => {
        if (window.confirm('Are you sure you want to delete this internship?')) {
            setInternships(internships.filter(i => i.id !== id));
        }
    };

    const handleViewInternship = (internship) => {
        setViewingInternship(internship);
        setShowViewModal(true);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
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
                        { icon: Award, label: 'Internships', path: '#', tab: 'internships' },
                        { icon: FileText, label: 'Real-time Projects', path: '#', tab: 'projects' },
                        { icon: TrendingUp, label: 'Analytics', path: '#', tab: 'analytics' }
                    ].map((item, i) => (
                        <div 
                            key={i}
                            className="glass-card" 
                            onClick={() => setActiveTab(item.tab)}
                            style={{ 
                                padding: '0.8rem 1.2rem', 
                                cursor: 'pointer',
                                background: activeTab === item.tab ? 'rgba(255, 107, 53, 0.15)' : 'rgba(255,255,255,0.02)',
                                borderColor: activeTab === item.tab ? 'rgba(255, 107, 53, 0.3)' : 'rgba(255,255,255,0.05)'
                            }} 
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: activeTab === item.tab ? '#FF6B35' : 'var(--text-gray)' }}>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                {activeTab === 'internships' ? 'Internship Portal' : 'Real-time Projects'}
                            </h1>
                            <p style={{ color: 'var(--text-gray)' }}>
                                {activeTab === 'internships' 
                                    ? 'Post and manage internship opportunities' 
                                    : 'Create and assign real-time projects'}
                            </p>
                        </div>
                        {(activeTab === 'internships' || activeTab === 'projects') && (
                            <button
                                onClick={() => handleOpenModal()}
                                className="btn btn-primary"
                                style={{ gap: '0.5rem' }}
                            >
                                <Plus size={20} /> 
                                {activeTab === 'internships' ? 'Post Internship' : 'Create Project'}
                            </button>
                        )}
                    </div>
                </div>

                {/* Internships Tab */}
                {activeTab === 'internships' && (
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    Active Internships
                                </p>
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#FF6B35' }}>
                                    {internships && internships.length}
                                </p>
                            </div>
                            <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    Total Applicants
                                </p>
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#FF6B35' }}>
                                    {internships && applications
                                        ? applications.filter(app => internships.some(i => i.id === app.internshipId)).length
                                        : 0
                                    }
                                </p>
                            </div>
                            <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', textAlign: 'center' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                    Accepted
                                </p>
                                <p style={{ fontSize: '2rem', fontWeight: 700, color: '#22c55e' }}>
                                    {internships && applications
                                        ? applications.filter(app => app.status === 'accepted' && internships.some(i => i.id === app.internshipId)).length
                                        : 0
                                    }
                                </p>
                            </div>
                        </div>

                        {internships && internships.length > 0 ? (
                            internships.map((internship) => (
                                <div key={internship.id} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                                {internship.title}
                                            </h3>
                                            <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', lineHeight: '1.5' }}>
                                                {internship.description}
                                            </p>

                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
                                                <div>
                                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Duration</p>
                                                    <p style={{ fontWeight: 600 }}>{internship.duration}</p>
                                                </div>
                                                <div>
                                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Stipend</p>
                                                    <p style={{ fontWeight: 600 }}>{internship.stipend}</p>
                                                </div>
                                                <div>
                                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Applicants</p>
                                                    <p style={{ fontWeight: 600, color: '#FF6B35' }}>
                                                        {applications ? applications.filter(app => app.internshipId === internship.id).length : 0}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Accepted</p>
                                                    <p style={{ fontWeight: 600, color: '#22c55e' }}>
                                                        {applications ? applications.filter(app => app.internshipId === internship.id && app.status === 'accepted').length : 0}
                                                    </p>
                                                </div>
                                            </div>

                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                                                    Skills
                                                </p>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                                {internship.skills.map((skill, i) => (
                                                    <span 
                                                        key={i}
                                                        style={{
                                                            padding: '0.3rem 0.8rem',
                                                            background: 'rgba(255, 107, 53, 0.15)',
                                                            borderRadius: '6px',
                                                            color: '#FF6B35',
                                                            fontSize: '0.8rem'
                                                        }}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'start' }}>
                                        <button
                                            onClick={() => handleViewInternship(internship)}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: 'rgba(255, 107, 53, 0.1)',
                                                color: '#FF6B35',
                                                border: '1px solid rgba(255, 107, 53, 0.3)',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Eye size={18} /> View
                                        </button>
                                        <button
                                            onClick={() => handleOpenModal(internship)}
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
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Edit size={18} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteInternship(internship.id)}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                color: '#ef4444',
                                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            <Trash2 size={18} /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ))
                        ) : (
                            <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderRadius: '16px' }}>
                                <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>
                                    No internships posted yet
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Projects Tab */}
                {activeTab === 'projects' && (
                    <div>
                        {projects.map((project) => (
                            <div key={project.id} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                            {project.title}
                                        </h3>
                                        <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', lineHeight: '1.5' }}>
                                            {project.description}
                                        </p>

                                        <div style={{ display: 'flex', gap: '2rem' }}>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Duration</p>
                                                <p style={{ fontWeight: 600 }}>{project.duration}</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Team Size</p>
                                                <p style={{ fontWeight: 600 }}>{project.team} members</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Status</p>
                                                <p style={{ 
                                                    fontWeight: 600, 
                                                    color: project.status === 'ongoing' ? '#FF6B35' : '#22c55e'
                                                }}>
                                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                                        <button style={{
                                            padding: '0.6rem 1.2rem',
                                            background: 'rgba(255, 107, 53, 0.1)',
                                            color: '#FF6B35',
                                            border: '1px solid rgba(255, 107, 53, 0.3)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}>
                                            <Edit size={18} />
                                        </button>
                                        <button style={{
                                            padding: '0.6rem 1.2rem',
                                            background: 'rgba(239, 68, 68, 0.1)',
                                            color: '#ef4444',
                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                    <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem' }}>
                            Analytics dashboard coming soon
                        </p>
                    </div>
                )}
            </div>

            {/* Modal for creating/editing internships */}
            {showModal && (
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
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                                {editingId ? 'Edit Internship' : 'Post New Internship'}
                            </h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="Internship title"
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 107, 53, 0.3)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    placeholder="Describe the internship"
                                    rows="4"
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 107, 53, 0.3)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        fontFamily: 'inherit',
                                        resize: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Duration</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({...formData, duration: e.target.value})}
                                        placeholder="e.g., 3 months"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 107, 53, 0.3)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Stipend</label>
                                    <input
                                        type="text"
                                        value={formData.stipend}
                                        onChange={(e) => setFormData({...formData, stipend: e.target.value})}
                                        placeholder="e.g., ₹50,000/month"
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 107, 53, 0.3)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            fontSize: '1rem',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Skills (comma-separated)</label>
                                <input
                                    type="text"
                                    value={formData.skills}
                                    onChange={(e) => setFormData({...formData, skills: e.target.value})}
                                    placeholder="React, JavaScript, CSS"
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 107, 53, 0.3)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handleSaveInternship}
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    {editingId ? 'Update' : 'Post'} Internship
                                </button>
                                <button
                                    onClick={() => setShowModal(false)}
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

            {/* View Internship Modal */}
            {showViewModal && viewingInternship && (
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
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Applicants</h2>
                            <button 
                                onClick={() => setShowViewModal(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
                                {viewingInternship.title}
                            </h3>
                            <p style={{ color: 'var(--text-gray)', marginBottom: '1.5rem' }}>
                                {viewingInternship.applicants} total applicants, {viewingInternship.accepted} accepted
                            </p>

                            {/* Mock applicants list */}
                            {[
                                { name: 'John Doe', email: 'john@uni.edu', status: 'accepted', score: 85 },
                                { name: 'Jane Smith', email: 'jane@uni.edu', status: 'pending', score: null },
                                { name: 'Mike Johnson', email: 'mike@uni.edu', status: 'rejected', score: 65 }
                            ].map((applicant, i) => (
                                <div key={i} className="glass-card" style={{ padding: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: 600 }}>{applicant.name}</p>
                                            <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{applicant.email}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{
                                                display: 'inline-block',
                                                padding: '0.3rem 0.8rem',
                                                background: applicant.status === 'accepted' ? 'rgba(34, 197, 94, 0.2)' : 
                                                           applicant.status === 'pending' ? 'rgba(225, 29, 72, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                                                color: applicant.status === 'accepted' ? '#22c55e' : 
                                                       applicant.status === 'pending' ? '#e11d48' : '#6b7280',
                                                borderRadius: '4px',
                                                fontSize: '0.8rem',
                                                fontWeight: 600
                                            }}>
                                                {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                                            </p>
                                            {applicant.score && (
                                                <p style={{ color: '#FF6B35', fontWeight: 600, marginTop: '0.5rem' }}>
                                                    Score: {applicant.score}%
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployerInternshipPortal;
