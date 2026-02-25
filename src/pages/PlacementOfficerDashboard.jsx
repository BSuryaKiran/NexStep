import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, LayoutDashboard, Users, Briefcase,
    Building2, FileText, TrendingUp, Calendar, CheckCircle,
    Clock, AlertCircle, BarChart3, Download, Plus, Search,
    MapPin, Mail, Phone, Edit, Trash2, Eye, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import NotificationBell from '../components/NotificationBell';

const PlacementOfficerDashboard = () => {
    const email = sessionStorage.getItem('userEmail') || 'officer@univ.edu';
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const stats = [
        { label: 'Total Students', value: '1,250', icon: Users, color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' },
        { label: 'Placed Students', value: '820', icon: CheckCircle, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)' },
        { label: 'Active Companies', value: '45', icon: Building2, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)' },
        { label: 'Placement Rate', value: '65.6%', icon: TrendingUp, color: '#06b6d4', gradient: 'linear-gradient(135deg, #06b6d4, #22d3ee)' }
    ];

    const recentPlacements = [
        { id: 1, studentName: 'Rahul Sharma', company: 'Google', position: 'Software Engineer', package: '₹22 LPA', date: '2026-02-15', status: 'Confirmed' },
        { id: 2, studentName: 'Priya Patel', company: 'Microsoft', position: 'Frontend Developer', package: '₹18 LPA', date: '2026-02-14', status: 'Confirmed' },
        { id: 3, studentName: 'Amit Kumar', company: 'Amazon', position: 'Data Analyst', package: '₹15 LPA', date: '2026-02-13', status: 'Pending' },
        { id: 4, studentName: 'Sneha Reddy', company: 'Flipkart', position: 'Full Stack Developer', package: '₹12 LPA', date: '2026-02-12', status: 'Confirmed' }
    ];

    const upcomingDrives = [
        { id: 1, company: 'TCS', date: '2026-02-25', time: '10:00 AM', venue: 'Main Auditorium', eligibility: 'All Branches', registered: 145 },
        { id: 2, company: 'Infosys', date: '2026-02-28', time: '2:00 PM', venue: 'Conference Hall', eligibility: 'CS, IT, ECE', registered: 98 },
        { id: 3, company: 'Wipro', date: '2026-03-05', time: '9:00 AM', venue: 'Virtual', eligibility: 'All Branches', registered: 210 }
    ];

    const students = [
        { id: 1, name: 'Rahul Sharma', branch: 'CS', cgpa: '8.9', status: 'Placed', company: 'Google', package: '₹22 LPA' },
        { id: 2, name: 'Priya Patel', branch: 'IT', cgpa: '9.1', status: 'Placed', company: 'Microsoft', package: '₹18 LPA' },
        { id: 3, name: 'Amit Kumar', branch: 'CS', cgpa: '8.5', status: 'Process', company: 'Amazon', package: '—' },
        { id: 4, name: 'Sneha Reddy', branch: 'ECE', cgpa: '8.7', status: 'Placed', company: 'Flipkart', package: '₹12 LPA' },
        { id: 5, name: 'Ravi Singh', branch: 'ME', cgpa: '7.8', status: 'Unplaced', company: '—', package: '—' },
        { id: 6, name: 'Ananya Mishra', branch: 'CS', cgpa: '9.3', status: 'Placed', company: 'Salesforce', package: '₹20 LPA' },
    ];

    const companies = [
        { id: 1, name: 'Google', sector: 'Technology', contact: 'hr@google.com', drives: 2, hired: 5, avgPkg: '₹22 LPA', status: 'Active' },
        { id: 2, name: 'Microsoft', sector: 'Technology', contact: 'campus@microsoft.com', drives: 1, hired: 3, avgPkg: '₹18 LPA', status: 'Active' },
        { id: 3, name: 'Amazon', sector: 'E-Commerce', contact: 'recruit@amazon.com', drives: 3, hired: 8, avgPkg: '₹15 LPA', status: 'Active' },
        { id: 4, name: 'TCS', sector: 'IT Services', contact: 'campus@tcs.com', drives: 5, hired: 45, avgPkg: '₹7 LPA', status: 'Active' },
        { id: 5, name: 'Wipro', sector: 'IT Services', contact: 'talent@wipro.com', drives: 4, hired: 30, avgPkg: '₹6.5 LPA', status: 'Active' },
    ];

    const navItems = [
        { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { key: 'students', icon: Users, label: 'Students' },
        { key: 'companies', icon: Building2, label: 'Companies' },
        { key: 'drives', icon: Calendar, label: 'Drive Schedule' },
        { key: 'reports', icon: BarChart3, label: 'Reports' },
        { key: 'documents', icon: FileText, label: 'Documents' },
    ];

    const statusStyle = (status) => {
        if (status === 'Placed' || status === 'Confirmed') return { bg: 'rgba(16,185,129,0.1)', color: '#10b981' };
        if (status === 'Unplaced') return { bg: 'rgba(239,68,68,0.1)', color: '#ef4444' };
        if (status === 'Pending' || status === 'Process') return { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' };
        return { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' };
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>

            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', borderRight: '2px solid var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '2rem', background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.08) 0%, rgba(124, 58, 237, 0.05) 100%)' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', fontWeight: 700 }}>NexStep</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    {navItems.map(({ key, icon: Icon, label }) => (
                        <div
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className="glass-card"
                            style={{
                                padding: '0.8rem 1.2rem',
                                background: activeTab === key ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(167, 139, 250, 0.15))' : 'transparent',
                                border: activeTab === key ? '2px solid #8b5cf6' : '1px solid transparent',
                                cursor: 'pointer',
                                boxShadow: activeTab === key ? '0 4px 15px rgba(139, 92, 246, 0.3)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: activeTab === key ? '#8b5cf6' : 'var(--text-gray)' }}>
                                <Icon size={20} />
                                <span style={{ fontWeight: activeTab === key ? 700 : 400 }}>{label}</span>
                            </div>
                        </div>
                    ))}
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
                        <p style={{ color: 'var(--text-gray)' }}>Manage campus placements and track student progress</p>
                    </div>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <button 
                            onClick={toggleTheme}
                            className="glass-card"
                            style={{ 
                                padding: '0.6rem', 
                                borderRadius: '50%', 
                                cursor: 'pointer',
                                background: 'transparent',
                                border: '1px solid var(--glass-border)'
                            }}
                            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>
                            <Download size={18} /> Generate Report
                        </button>
                        <NotificationBell />
                        <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={18} />
                            </div>
                            <span style={{ fontSize: '0.9rem' }}>Officer</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                    {stats.map((stat, i) => (
                        <div key={i} className="glass animate-fade-in" style={{ padding: '1.8rem', animationDelay: `${i * 0.1}s`, background: stat.gradient, border: '2px solid rgba(255,255,255,0.2)', boxShadow: '0 8px 25px rgba(0,0,0,0.3)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.2)', color: '#ffffff', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500 }}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div className="glass" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.3rem' }}>Recent Placements</h2>
                                    <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => setActiveTab('students')}>View All</button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {recentPlacements.map((placement) => {
                                        const sc = statusStyle(placement.status);
                                        return (
                                            <div key={placement.id} className="glass-card" style={{ padding: '1.2rem' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>
                                                    <div>
                                                        <h4 style={{ fontSize: '1.05rem', marginBottom: '0.3rem' }}>{placement.studentName}</h4>
                                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>{placement.position} at {placement.company}</p>
                                                    </div>
                                                    <span className="glass-card" style={{ padding: '0.3rem 0.8rem', fontSize: '0.75rem', background: sc.bg, color: sc.color }}>{placement.status}</span>
                                                </div>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '1.1rem' }}>{placement.package}</span>
                                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{placement.date}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="glass" style={{ padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h2 style={{ fontSize: '1.3rem' }}>Upcoming Drives</h2>
                                    <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} onClick={() => setActiveTab('drives')}>Schedule New</button>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {upcomingDrives.map((drive) => (
                                        <div key={drive.id} className="glass-card" style={{ padding: '1.2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 600 }}>
                                                    {drive.company.charAt(0)}
                                                </div>
                                                <div style={{ flex: 1 }}>
                                                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{drive.company}</h4>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{drive.eligibility}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', fontSize: '0.85rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}><Calendar size={14} /><span>{drive.date}</span></div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}><Clock size={14} /><span>{drive.time}</span></div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-gray)' }}><Building2 size={14} /><span>{drive.venue}</span></div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)' }}><Users size={14} /><span>{drive.registered} registered</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Quick Actions</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                                {[
                                    { icon: Users, label: 'Add Student', color: '#6366f1', tab: 'students' },
                                    { icon: Building2, label: 'Register Company', color: '#10b981', tab: 'companies' },
                                    { icon: Calendar, label: 'Schedule Drive', color: '#f59e0b', tab: 'drives' },
                                    { icon: FileText, label: 'Generate Report', color: '#ec4899', tab: 'reports' }
                                ].map((action, i) => (
                                    <div key={i} className="glass-card" onClick={() => setActiveTab(action.tab)} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                                        <div style={{ padding: '1rem', borderRadius: '12px', background: `${action.color}15`, color: action.color }}>
                                            <action.icon size={24} />
                                        </div>
                                        <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{action.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* Students Tab */}
                {activeTab === 'students' && (
                    <div className="glass" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.3rem' }}>Student Records</h2>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}><Download size={16} /> Export</button>
                                <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}><Plus size={16} /> Add Student</button>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <Search size={18} style={{ color: 'var(--text-gray)' }} />
                            <input style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', flex: 1, fontSize: '0.95rem' }} placeholder="Search students by name, branch, or status..." />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: '1rem', padding: '0.8rem 1.2rem', color: 'var(--text-gray)', fontSize: '0.85rem', fontWeight: 600 }}>
                                <span>Name</span><span>Branch</span><span>CGPA</span><span>Status</span><span>Company / Package</span><span>Actions</span>
                            </div>
                            {students.map((student) => {
                                const sc = statusStyle(student.status);
                                return (
                                    <div key={student.id} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', gap: '1rem', padding: '1rem 1.2rem', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(99,102,241,0.1)', color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, flexShrink: 0 }}>
                                                {student.name.charAt(0)}
                                            </div>
                                            <span style={{ fontWeight: 500 }}>{student.name}</span>
                                        </div>
                                        <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{student.branch}</span>
                                        <span style={{ fontWeight: 600, color: 'var(--primary)' }}>{student.cgpa}</span>
                                        <span className="glass-card" style={{ padding: '0.25rem 0.7rem', fontSize: '0.8rem', background: sc.bg, color: sc.color, width: 'fit-content' }}>{student.status}</span>
                                        <div>
                                            <p style={{ fontSize: '0.9rem', fontWeight: 500 }}>{student.company}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{student.package}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px' }}><Eye size={15} /></button>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px' }}><Edit size={15} /></button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Companies Tab */}
                {activeTab === 'companies' && (
                    <div className="glass" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.3rem' }}>Registered Companies</h2>
                            <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}><Plus size={16} /> Register Company</button>
                        </div>
                        <div style={{ display: 'grid', gap: '1.2rem' }}>
                            {companies.map((company) => (
                                <div key={company.id} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                        <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700, fontSize: '1.1rem' }}>
                                            {company.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{company.name}</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{company.sector}</p>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.3rem', color: 'var(--text-gray)', fontSize: '0.8rem' }}>
                                                <Mail size={12} />
                                                <span>{company.contact}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Drives</p>
                                            <p style={{ fontSize: '1.3rem', fontWeight: 600 }}>{company.drives}</p>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Hired</p>
                                            <p style={{ fontSize: '1.3rem', fontWeight: 600, color: '#10b981' }}>{company.hired}</p>
                                        </div>
                                        <div style={{ textAlign: 'center' }}>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Avg Package</p>
                                            <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)' }}>{company.avgPkg}</p>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '6px' }}><Edit size={16} /></button>
                                            <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '6px', color: '#ef4444', borderColor: '#ef4444' }}><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Drives Tab */}
                {activeTab === 'drives' && (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.3rem' }}>Placement Drive Schedule</h2>
                                <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                    <Plus size={16} /> Schedule Drive
                                </button>
                            </div>
                            <div style={{ display: 'grid', gap: '1.2rem' }}>
                                {upcomingDrives.map((drive) => (
                                    <div key={drive.id} className="glass-card" style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.2rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 700, fontSize: '1.2rem' }}>
                                                    {drive.company.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{drive.company}</h3>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Eligibility: {drive.eligibility}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '6px' }}><Edit size={16} /></button>
                                                <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '6px', color: '#ef4444', borderColor: '#ef4444' }}><Trash2 size={16} /></button>
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                                            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                                                <Calendar size={18} style={{ color: 'var(--primary)', marginBottom: '0.4rem' }} />
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Date</p>
                                                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{drive.date}</p>
                                            </div>
                                            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                                                <Clock size={18} style={{ color: '#f59e0b', marginBottom: '0.4rem' }} />
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Time</p>
                                                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{drive.time}</p>
                                            </div>
                                            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                                                <MapPin size={18} style={{ color: '#10b981', marginBottom: '0.4rem' }} />
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Venue</p>
                                                <p style={{ fontWeight: 600, fontSize: '0.95rem' }}>{drive.venue}</p>
                                            </div>
                                            <div className="glass-card" style={{ padding: '1rem', textAlign: 'center' }}>
                                                <Users size={18} style={{ color: '#ec4899', marginBottom: '0.4rem' }} />
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>Registered</p>
                                                <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--primary)' }}>{drive.registered}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Reports Tab */}
                {activeTab === 'reports' && (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Placement Reports</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                                {[
                                    { title: 'Annual Placement Report 2025-26', date: '2026-02-01', type: 'PDF', size: '2.4 MB' },
                                    { title: 'Company-wise Placement Summary', date: '2026-02-10', type: 'Excel', size: '1.1 MB' },
                                    { title: 'Branch-wise Statistics Report', date: '2026-01-28', type: 'PDF', size: '1.8 MB' },
                                    { title: 'Package Distribution Analysis', date: '2026-01-20', type: 'PDF', size: '0.9 MB' },
                                ].map((report, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ padding: '0.8rem', borderRadius: '10px', background: 'rgba(99,102,241,0.1)', color: 'var(--primary)' }}>
                                                <FileText size={20} />
                                            </div>
                                            <div>
                                                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>{report.title}</h4>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{report.date} · {report.type} · {report.size}</p>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline" style={{ padding: '0.5rem', borderRadius: '6px' }}><Download size={16} /></button>
                                    </div>
                                ))}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}>Placement Statistics</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                {[
                                    { label: 'Placed Students', value: 820, total: 1250, color: '#10b981' },
                                    { label: 'Students in Process', value: 210, total: 1250, color: '#f59e0b' },
                                    { label: 'Unplaced Students', value: 220, total: 1250, color: '#ef4444' },
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.label}</span>
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>{item.value} / {item.total}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(item.value / item.total) * 100}%`, height: '100%', background: item.color, borderRadius: '10px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.3rem' }}>Generate Custom Report</h2>
                                <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                    <Download size={16} /> Export
                                </button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Report Type</label>
                                    <select className="form-input">
                                        <option>Overall Placement Summary</option>
                                        <option>Branch-wise Report</option>
                                        <option>Company-wise Report</option>
                                        <option>Package Analysis</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Format</label>
                                    <select className="form-input">
                                        <option>PDF</option>
                                        <option>Excel</option>
                                        <option>CSV</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">From Date</label>
                                    <input type="date" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">To Date</label>
                                    <input type="date" className="form-input" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                    <div className="glass" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.3rem' }}>Document Management</h2>
                            <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                <Plus size={16} /> Upload Document
                            </button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                            {[
                                { name: 'Placement Policy 2025-26.pdf', type: 'Policy', size: '1.2 MB', date: '2025-08-01', color: '#6366f1' },
                                { name: 'Student Consent Form.docx', type: 'Form', size: '0.3 MB', date: '2025-09-10', color: '#10b981' },
                                { name: 'Company MoU Template.pdf', type: 'Template', size: '0.8 MB', date: '2025-10-05', color: '#f59e0b' },
                                { name: 'Offer Letter Format.docx', type: 'Template', size: '0.2 MB', date: '2025-11-15', color: '#ec4899' },
                                { name: 'Pre-Placement Talk Schedule.xlsx', type: 'Schedule', size: '0.5 MB', date: '2026-01-10', color: '#6366f1' },
                                { name: 'Campus Recruitment Brochure.pdf', type: 'Brochure', size: '3.5 MB', date: '2026-01-20', color: '#10b981' },
                            ].map((doc, i) => (
                                <div key={i} className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ padding: '0.8rem', borderRadius: '10px', background: `${doc.color}15`, color: doc.color }}>
                                            <FileText size={20} />
                                        </div>
                                        <div>
                                            <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem' }}>{doc.name}</h4>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{doc.type} · {doc.size} · {doc.date}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px' }}><Eye size={15} /></button>
                                        <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px' }}><Download size={15} /></button>
                                        <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px', color: '#ef4444', borderColor: '#ef4444' }}><Trash2 size={15} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default PlacementOfficerDashboard;
