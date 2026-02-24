import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, LayoutDashboard, Search, Bell, User,
    TrendingUp, Users, Calendar, FileText,
    MapPin, Clock, DollarSign, Building2, GraduationCap, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
    const role = sessionStorage.getItem('userRole') || 'Student';
    const email = sessionStorage.getItem('userEmail') || 'demo@user.com';
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const getStats = () => {
        switch (role) {
            case 'Admin': return [
                { label: 'Total Users', value: '2,450', icon: Users, color: '#6366f1' },
                { label: 'Platform Growth', value: '+12%', icon: TrendingUp, color: '#ec4899' },
                { label: 'Active Jobs', value: '428', icon: LayoutDashboard, color: '#8b5cf6' }
            ];
            case 'Student': return [
                { label: 'Jobs Applied', value: '12', icon: FileText, color: '#10b981' },
                { label: 'Interviews', value: '3', icon: Calendar, color: '#3b82f6' },
                { label: 'Success Rate', value: '68%', icon: TrendingUp, color: '#f59e0b' }
            ];
            case 'Recruiter': return [
                { label: 'Applications', value: '1,280', icon: Users, color: '#6366f1' },
                { label: 'Postings', value: '5', icon: LayoutDashboard, color: '#ec4899' },
                { label: 'Hired', value: '14', icon: TrendingUp, color: '#10b981' }
            ];
            default: return [
                { label: 'Placements', value: '820', icon: GraduationCap, color: '#6366f1' },
                { label: 'Company Visits', value: '45', icon: MapPin, color: '#ec4899' },
                { label: 'Reports Gen', value: '12', icon: FileText, color: '#8b5cf6' }
            ];
        }
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>

            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', borderRight: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '2rem' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem' }}>NexStep</h2>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    <div className="glass-card" style={{ padding: '0.8rem 1.2rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)' }}>
                            <LayoutDashboard size={20} /> <span style={{ fontWeight: 600 }}>Dashboard</span>
                        </div>
                    </div>
                    {['Explore', 'Applications', 'Schedule', 'Profile', 'Settings'].map(item => (
                        <div key={item} className="glass-card" style={{ padding: '0.8rem 1.2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-gray)' }}>
                                <Search size={20} /> <span>{item}</span>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Hello, {email.split('@')[0]}</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Welcome to your <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{role}</span> Dashboard</p>
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
                        <div className="glass-card" style={{ padding: '0.6rem', borderRadius: '50%' }}>
                            <Bell size={20} />
                        </div>
                        <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <User size={18} />
                            </div>
                            <span style={{ fontSize: '0.9rem' }}>{role} Profile</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
                    {getStats().map((stat, i) => (
                        <div key={i} className="glass animate-fade-in" style={{ padding: '2rem', animationDelay: `${i * 0.1}s` }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '0.8rem', borderRadius: '12px', background: `${stat.color}15`, color: stat.color }}>
                                    <stat.icon size={24} />
                                </div>
                                <TrendingUp size={16} style={{ color: 'var(--success)' }} />
                            </div>
                            <h4 style={{ color: 'var(--text-gray)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.label}</h4>
                            <p style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Recent Opportunities</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {[
                        { company: 'Google', role: 'Software Engineer', loc: 'Mountain View, CA', salary: '$180k - $220k', type: 'Full-time' },
                        { company: 'Meta', role: 'Product Designer', loc: 'Remote', salary: '$160k - $190k', type: 'Full-time' },
                        { company: 'Amazon', role: 'Cloud Architect', loc: 'Seattle, WA', salary: '$175k - $210k', type: 'Contract' },
                    ].map((job, i) => (
                        <div key={i} className="glass-card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', animationDelay: `${0.3 + i * 0.1}s` }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Building2 size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{job.role}</h4>
                                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {job.loc}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={14} /> {job.type}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><DollarSign size={14} /> {job.salary}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn btn-outline">View Details</button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Dashboard;
