import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, Award, Settings, Users, BarChart3, Filter, Search,
    Edit, ToggleRight, ToggleLeft, Eye, Trash2, X, Plus
} from 'lucide-react';

const AdminInternshipManager = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const [internships, setInternships] = useState([
        {
            id: 1,
            title: 'Frontend Development Internship',
            company: 'Google',
            duration: '3 months',
            stipend: '₹50,000/month',
            employer: 'John Smith',
            applicants: 45,
            accepted: 2,
            status: 'active',
            createdDate: '2024-02-01',
            startDate: '2024-02-15',
            skills: ['React', 'JavaScript', 'TypeScript']
        },
        {
            id: 2,
            title: 'Backend Engineering Internship',
            company: 'Microsoft',
            duration: '4 months',
            stipend: '₹55,000/month',
            employer: 'Alice Johnson',
            applicants: 32,
            accepted: 1,
            status: 'active',
            createdDate: '2024-01-28',
            startDate: '2024-02-20',
            skills: ['Node.js', 'MongoDB', 'AWS']
        },
        {
            id: 3,
            title: 'Data Analytics Internship',
            company: 'IBM',
            duration: '3 months',
            stipend: '₹45,000/month',
            employer: 'Mike Chen',
            applicants: 28,
            accepted: 3,
            status: 'inactive',
            createdDate: '2024-01-15',
            startDate: '2024-02-01',
            skills: ['Python', 'SQL', 'Power BI']
        }
    ]);

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState(null);

    const handleViewDetails = (internship) => {
        setSelectedInternship(internship);
        setShowDetailModal(true);
    };

    const handleToggleStatus = (id) => {
        setInternships(internships.map(internship =>
            internship.id === id
                ? { ...internship, status: internship.status === 'active' ? 'inactive' : 'active' }
                : internship
        ));
    };

    const handleOpenEditModal = (internship) => {
        setEditForm({ ...internship });
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        if (editForm) {
            setInternships(internships.map(internship =>
                internship.id === editForm.id ? editForm : internship
            ));
            setShowEditModal(false);
        }
    };

    const handleDeleteInternship = (id) => {
        if (window.confirm('Are you sure you want to delete this internship?')) {
            setInternships(internships.filter(i => i.id !== id));
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const filteredInternships = internships.filter(internship => {
        const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            internship.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || internship.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-darker)' }}>
            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', display: 'flex', flexDirection: 'column', padding: '2rem', height: 'fit-content', position: 'sticky', top: '1rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', cursor: 'pointer', fontWeight: 700 }} onClick={() => navigate('/dashboard')}>
                    CareerMatch
                </h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    {[
                        { icon: Award, label: 'Internships', path: '#', active: true },
                        { icon: Users, label: 'Employers', path: '#' },
                        { icon: BarChart3, label: 'Analytics', path: '#' },
                        { icon: Settings, label: 'Settings', path: '#' }
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
                                Internship Management
                            </h1>
                            <p style={{ color: 'var(--text-gray)' }}>Manage all internships and approve/reject applications</p>
                        </div>
                        <button className="btn btn-primary" style={{ gap: '0.5rem' }}>
                            <Plus size={20} /> New Internship
                        </button>
                    </div>

                    {/* Statistics */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Total Internships
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF6B35' }}>
                                {internships.length}
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Active
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#22c55e' }}>
                                {internships.filter(i => i.status === 'active').length}
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Total Applicants
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#FF6B35' }}>
                                {internships.reduce((sum, i) => sum + i.applicants, 0)}
                            </p>
                        </div>
                        <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                                Accepted
                            </p>
                            <p style={{ fontSize: '1.8rem', fontWeight: 700, color: '#22c55e' }}>
                                {internships.reduce((sum, i) => sum + i.accepted, 0)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search and Filter */}
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
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        style={{
                            padding: '0.8rem 1rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255, 107, 53, 0.3)',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            outline: 'none'
                        }}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                {/* Internship List */}
                <div>
                    {filteredInternships.length > 0 ? (
                        filteredInternships.map((internship) => (
                            <div key={internship.id} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                                                    {internship.title}
                                                </h3>
                                                <p style={{ color: '#FF6B35', fontWeight: 600, marginBottom: '0.5rem' }}>
                                                    {internship.company}
                                                </p>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                                                    Posted by: {internship.employer}
                                                </p>
                                            </div>
                                        </div>

                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
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
                                                <p style={{ fontWeight: 600, color: '#FF6B35' }}>{internship.applicants}</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Accepted</p>
                                                <p style={{ fontWeight: 600, color: '#22c55e' }}>{internship.accepted}</p>
                                            </div>
                                            <div>
                                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem' }}>Status</p>
                                                <p style={{ 
                                                    fontWeight: 600, 
                                                    color: internship.status === 'active' ? '#22c55e' : '#ef4444'
                                                }}>
                                                    {internship.status === 'active' ? 'Active' : 'Inactive'}
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
                                            onClick={() => handleViewDetails(internship)}
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
                                            onClick={() => handleOpenEditModal(internship)}
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
                                            onClick={() => handleToggleStatus(internship.id)}
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                background: internship.status === 'active' 
                                                    ? 'rgba(239, 68, 68, 0.1)' 
                                                    : 'rgba(34, 197, 94, 0.1)',
                                                color: internship.status === 'active' ? '#ef4444' : '#22c55e',
                                                border: internship.status === 'active' 
                                                    ? '1px solid rgba(239, 68, 68, 0.3)' 
                                                    : '1px solid rgba(34, 197, 94, 0.3)',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '0.5rem'
                                            }}
                                        >
                                            {internship.status === 'active' ? (
                                                <>
                                                    <ToggleRight size={18} /> Deactivate
                                                </>
                                            ) : (
                                                <>
                                                    <ToggleLeft size={18} /> Activate
                                                </>
                                            )}
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
                                No internships found
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            {showDetailModal && selectedInternship && (
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
                    <div className="glass" style={{ padding: '2.5rem', borderRadius: '20px', maxWidth: '700px', width: '90%', maxHeight: '80vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>{selectedInternship.title}</h2>
                            <button 
                                onClick={() => setShowDetailModal(false)}
                                style={{ background: 'none', border: 'none', color: 'var(--text-gray)', cursor: 'pointer', fontSize: '1.5rem' }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Company</p>
                                <p style={{ fontWeight: 600 }}>{selectedInternship.company}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Duration</p>
                                <p style={{ fontWeight: 600 }}>{selectedInternship.duration}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Stipend</p>
                                <p style={{ fontWeight: 600 }}>{selectedInternship.stipend}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Employer</p>
                                <p style={{ fontWeight: 600 }}>{selectedInternship.employer}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Applicants</p>
                                <p style={{ fontWeight: 600, color: '#FF6B35' }}>{selectedInternship.applicants}</p>
                            </div>
                            <div>
                                <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>Accepted</p>
                                <p style={{ fontWeight: 600, color: '#22c55e' }}>{selectedInternship.accepted}</p>
                            </div>
                        </div>

                        <div>
                            <p style={{ color: 'var(--text-gray)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Skills</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                {selectedInternship.skills.map((skill, i) => (
                                    <span 
                                        key={i}
                                        style={{
                                            padding: '0.4rem 0.8rem',
                                            background: 'rgba(255, 107, 53, 0.15)',
                                            borderRadius: '6px',
                                            color: '#FF6B35',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => setShowDetailModal(false)}
                            className="btn btn-primary"
                            style={{ width: '100%', justifyContent: 'center' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editForm && (
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
                            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Edit Internship</h2>
                            <button 
                                onClick={() => setShowEditModal(false)}
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
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                                    style={{
                                        width: '100%',
                                        padding: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        border: '1px solid rgba(255, 107, 53, 0.3)',
                                        borderRadius: '8px',
                                        color: 'white',
                                        outline: 'none'
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Duration</label>
                                    <input
                                        type="text"
                                        value={editForm.duration}
                                        onChange={(e) => setEditForm({...editForm, duration: e.target.value})}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 107, 53, 0.3)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                </div>

                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Stipend</label>
                                    <input
                                        type="text"
                                        value={editForm.stipend}
                                        onChange={(e) => setEditForm({...editForm, stipend: e.target.value})}
                                        style={{
                                            width: '100%',
                                            padding: '0.8rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(255, 107, 53, 0.3)',
                                            borderRadius: '8px',
                                            color: 'white',
                                            outline: 'none'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={handleSaveEdit}
                                    className="btn btn-primary"
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    Save Changes
                                </button>
                                <button
                                    onClick={() => setShowEditModal(false)}
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

export default AdminInternshipManager;
