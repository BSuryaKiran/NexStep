import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, User, LayoutDashboard, Users, Briefcase,
    Building2, TrendingUp, Settings, Shield, Activity,
    Database, Lock, CheckCircle, AlertCircle, Edit, Trash2,
    Plus, Search, Download, RefreshCw, Sun, Moon
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import NotificationBell from '../components/NotificationBell';

const AdminDashboard = () => {
    const email = sessionStorage.getItem('userEmail') || 'admin@system.com';
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const { theme, toggleTheme } = useTheme();

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const stats = [
        { label: 'Total Users', value: '2,450', icon: Users, color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)', change: '+12%' },
        { label: 'Active Companies', value: '156', icon: Building2, color: '#10b981', gradient: 'linear-gradient(135deg, #10b981, #34d399)', change: '+8%' },
        { label: 'Total Jobs Posted', value: '428', icon: Briefcase, color: '#f59e0b', gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)', change: '+20%' },
        { label: 'Platform Growth', value: '+15%', icon: TrendingUp, color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)', change: '+3%' }
    ];

    const userBreakdown = [
        { role: 'Students', count: 1850, percentage: 75, color: '#06b6d4' },
        { role: 'Recruiters', count: 156, percentage: 6, color: '#10b981' },
        { role: 'Officers', count: 420, percentage: 17, color: '#8b5cf6' },
        { role: 'Admins', count: 24, percentage: 2, color: '#ec4899' }
    ];

    const recentActivities = [
        { type: 'user', action: 'New student registered', user: 'Rahul Kumar', time: '2 mins ago', status: 'success' },
        { type: 'company', action: 'Google posted new job', user: 'Google Inc.', time: '15 mins ago', status: 'success' },
        { type: 'placement', action: 'Successful placement', user: 'Priya Sharma @ Microsoft', time: '1 hour ago', status: 'success' },
        { type: 'system', action: 'System backup completed', user: 'System', time: '2 hours ago', status: 'success' },
        { type: 'alert', action: 'High server load detected', user: 'Monitoring', time: '3 hours ago', status: 'warning' }
    ];

    const systemHealth = [
        { name: 'API Services', status: 'Healthy', uptime: '99.9%', color: '#10b981' },
        { name: 'Database', status: 'Healthy', uptime: '99.8%', color: '#10b981' },
        { name: 'Email Service', status: 'Degraded', uptime: '95.2%', color: '#f59e0b' },
        { name: 'Storage', status: 'Healthy', uptime: '100%', color: '#10b981' }
    ];

    const allUsers = [
        { id: 1, name: 'Rahul Kumar', email: 'rahul@stu.edu', role: 'Student', status: 'Active', joined: '2026-01-10' },
        { id: 2, name: 'Tech Corp HR', email: 'hr@techcorp.com', role: 'Recruiter', status: 'Active', joined: '2026-01-15' },
        { id: 3, name: 'Dr. Meera Nair', email: 'meera@univ.edu', role: 'Officer', status: 'Active', joined: '2025-12-01' },
        { id: 4, name: 'Sneha Patel', email: 'sneha@stu.edu', role: 'Student', status: 'Inactive', joined: '2026-01-20' },
        { id: 5, name: 'Infosys Recruiter', email: 'recruit@infosys.com', role: 'Recruiter', status: 'Active', joined: '2026-02-01' },
    ];

    const analyticsData = [
        { month: 'Oct', placements: 45, applications: 320 },
        { month: 'Nov', placements: 62, applications: 450 },
        { month: 'Dec', placements: 38, applications: 280 },
        { month: 'Jan', placements: 78, applications: 560 },
        { month: 'Feb', placements: 91, applications: 620 },
    ];

    const navItems = [
        { key: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { key: 'users', icon: Users, label: 'User Management' },
        { key: 'data', icon: Database, label: 'Data Analytics' },
        { key: 'health', icon: Activity, label: 'System Health' },
        { key: 'security', icon: Shield, label: 'Security' },
        { key: 'settings', icon: Settings, label: 'Settings' },
    ];

    const roleColor = (role) => {
        if (role === 'Student') return { bg: 'rgba(99,102,241,0.1)', color: '#6366f1' };
        if (role === 'Recruiter') return { bg: 'rgba(16,185,129,0.1)', color: '#10b981' };
        if (role === 'Officer') return { bg: 'rgba(245,158,11,0.1)', color: '#f59e0b' };
        return { bg: 'rgba(236,72,153,0.1)', color: '#ec4899' };
    };

    return (
        <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>

            {/* Sidebar */}
            <div className="glass" style={{ width: '280px', margin: '1rem', borderRight: '2px solid var(--glass-border)', display: 'flex', flexDirection: 'column', padding: '2rem', background: 'linear-gradient(180deg, rgba(236, 72, 153, 0.08) 0%, rgba(139, 92, 246, 0.05) 100%)' }}>
                <h2 className="text-gradient" style={{ marginBottom: '3rem', fontSize: '1.8rem', fontWeight: 700 }}>NexStep</h2>
                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                    {navItems.map(({ key, icon: Icon, label }) => (
                        <div
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className="glass-card"
                            style={{
                                padding: '0.8rem 1.2rem',
                                background: activeTab === key ? 'linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(244, 114, 182, 0.15))' : 'transparent',
                                border: activeTab === key ? '2px solid #ec4899' : '1px solid transparent',
                                cursor: 'pointer',
                                boxShadow: activeTab === key ? '0 4px 15px rgba(236, 72, 153, 0.3)' : 'none'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: activeTab === key ? '#ec4899' : 'var(--text-gray)' }}>
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
                        <h1 style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>Admin Control Panel</h1>
                        <p style={{ color: 'var(--text-gray)' }}>Monitor and manage the entire platform</p>
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
                        <NotificationBell />
                        <div className="glass-card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Shield size={18} />
                            </div>
                            <span style={{ fontSize: '0.9rem' }}>Admin</span>
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
                                <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.15)', padding: '0.3rem 0.7rem', borderRadius: '8px' }}>{stat.change}</span>
                            </div>
                            <h3 style={{ fontSize: '2rem', marginBottom: '0.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</h3>
                            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: 500 }}>{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                            <div className="glass" style={{ padding: '2rem' }}>
                                <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Recent Activity</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {recentActivities.map((activity, i) => (
                                        <div key={i} className="glass-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{ padding: '0.8rem', borderRadius: '10px', background: activity.status === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: activity.status === 'success' ? '#10b981' : '#f59e0b' }}>
                                                {activity.status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>{activity.action}</h4>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{activity.user}</p>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{activity.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass" style={{ padding: '2rem' }}>
                                <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>User Distribution</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                    {userBreakdown.map((user, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{user.role}</span>
                                                <span style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>{user.count}</span>
                                            </div>
                                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                                <div style={{ width: `${user.percentage}%`, height: '100%', background: user.color, borderRadius: '10px', transition: 'width 1s ease' }}></div>
                                            </div>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)', marginTop: '0.3rem', display: 'block' }}>{user.percentage}% of total users</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>System Health</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                                {systemHealth.map((system, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: system.color }}></div>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{system.name}</span>
                                        </div>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>{system.status}</p>
                                        <p style={{ fontSize: '1.2rem', fontWeight: 600, color: system.color }}>↑ {system.uptime}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {/* User Management Tab */}
                {activeTab === 'users' && (
                    <div className="glass" style={{ padding: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.3rem' }}>User Management</h2>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                    <Download size={16} /> Export
                                </button>
                                <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                    <Plus size={16} /> Add User
                                </button>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <Search size={18} style={{ color: 'var(--text-gray)' }} />
                            <input style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', flex: 1, fontSize: '0.95rem' }} placeholder="Search users by name, email, or role..." />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {/* Table Header */}
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr', gap: '1rem', padding: '0.8rem 1.2rem', color: 'var(--text-gray)', fontSize: '0.85rem', fontWeight: 600 }}>
                                <span>Name</span><span>Email</span><span>Role</span><span>Status</span><span>Joined</span><span>Actions</span>
                            </div>
                            {allUsers.map((user) => {
                                const rc = roleColor(user.role);
                                return (
                                    <div key={user.id} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 1fr', gap: '1rem', padding: '1rem 1.2rem', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: rc.bg, color: rc.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '0.9rem', flexShrink: 0 }}>
                                                {user.name.charAt(0)}
                                            </div>
                                            <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{user.name}</span>
                                        </div>
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>{user.email}</span>
                                        <span className="glass-card" style={{ padding: '0.25rem 0.7rem', fontSize: '0.8rem', background: rc.bg, color: rc.color, width: 'fit-content' }}>{user.role}</span>
                                        <span style={{ fontSize: '0.9rem', color: user.status === 'Active' ? '#10b981' : '#ef4444' }}>{user.status}</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{user.joined}</span>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px' }}><Edit size={15} /></button>
                                            <button className="btn btn-outline" style={{ padding: '0.4rem', borderRadius: '6px', color: '#ef4444', borderColor: '#ef4444' }}><Trash2 size={15} /></button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Data Analytics Tab */}
                {activeTab === 'data' && (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Platform Analytics</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                                {[
                                    { label: 'Monthly Placements', value: '91', change: '+17%', color: '#6366f1' },
                                    { label: 'Monthly Applications', value: '620', change: '+10%', color: '#10b981' },
                                    { label: 'Avg. Package', value: '₹14.2 LPA', change: '+8%', color: '#f59e0b' },
                                ].map((item, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)', marginBottom: '0.5rem' }}>{item.label}</p>
                                        <p style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>{item.value}</p>
                                        <p style={{ fontSize: '0.85rem', color: '#10b981' }}>{item.change} this month</p>
                                    </div>
                                ))}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}>Monthly Trend (Last 5 Months)</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {analyticsData.map((row, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1rem 1.5rem', display: 'grid', gridTemplateColumns: '60px 1fr 80px 1fr 80px', gap: '1rem', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 600 }}>{row.month}</span>
                                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(row.placements / 100) * 100}%`, height: '100%', background: '#6366f1', borderRadius: '10px' }}></div>
                                        </div>
                                        <span style={{ fontSize: '0.9rem', color: '#6366f1', textAlign: 'right' }}>{row.placements} placed</span>
                                        <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                            <div style={{ width: `${(row.applications / 700) * 100}%`, height: '100%', background: '#10b981', borderRadius: '10px' }}></div>
                                        </div>
                                        <span style={{ fontSize: '0.9rem', color: '#10b981', textAlign: 'right' }}>{row.applications} apps</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>User Growth Breakdown</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                                {userBreakdown.map((user, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                            <span style={{ fontWeight: 500 }}>{user.role}</span>
                                            <span style={{ color: 'var(--text-gray)' }}>{user.count} users ({user.percentage}%)</span>
                                        </div>
                                        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                            <div style={{ width: `${user.percentage}%`, height: '100%', background: user.color, borderRadius: '10px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* System Health Tab */}
                {activeTab === 'health' && (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.3rem' }}>System Health Monitor</h2>
                                <button className="btn btn-outline" style={{ padding: '0.6rem 1.2rem', fontSize: '0.9rem' }}>
                                    <RefreshCw size={16} /> Refresh
                                </button>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                                {systemHealth.map((system, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '2rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{system.name}</h3>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>Last checked: just now</p>
                                            </div>
                                            <span style={{ padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: system.color === '#10b981' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: system.color }}>
                                                {system.status}
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>Uptime</span>
                                            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: system.color }}>{system.uptime}</span>
                                        </div>
                                        <div style={{ marginTop: '1rem', width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                                            <div style={{ width: system.uptime, height: '100%', background: system.color, borderRadius: '10px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Recent System Events</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {recentActivities.map((activity, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <div style={{ padding: '0.8rem', borderRadius: '10px', background: activity.status === 'success' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)', color: activity.status === 'success' ? '#10b981' : '#f59e0b' }}>
                                            {activity.status === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.2rem' }}>{activity.action}</h4>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{activity.user}</p>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Security Overview</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                                {[
                                    { label: 'Failed Login Attempts', value: '23', color: '#ef4444', icon: Lock },
                                    { label: 'Active Sessions', value: '148', color: '#6366f1', icon: Users },
                                    { label: 'Security Score', value: '94/100', color: '#10b981', icon: Shield },
                                ].map((item, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
                                        <div style={{ padding: '0.8rem', borderRadius: '12px', background: `${item.color}15`, color: item.color, width: 'fit-content', marginBottom: '1rem' }}>
                                            <item.icon size={20} />
                                        </div>
                                        <p style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.3rem' }}>{item.value}</p>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-gray)' }}>{item.label}</p>
                                    </div>
                                ))}
                            </div>
                            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.2rem' }}>Security Policies</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    { policy: 'Two-Factor Authentication', status: 'Enabled', color: '#10b981' },
                                    { policy: 'Password Complexity Requirements', status: 'Enabled', color: '#10b981' },
                                    { policy: 'Session Timeout (30 min)', status: 'Enabled', color: '#10b981' },
                                    { policy: 'IP Whitelisting', status: 'Disabled', color: '#ef4444' },
                                    { policy: 'Audit Logging', status: 'Enabled', color: '#10b981' },
                                ].map((item, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.95rem' }}>{item.policy}</span>
                                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: item.color }}>{item.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Platform Settings</h2>
                            <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '600px' }}>
                                <div className="form-group">
                                    <label className="form-label">Platform Name</label>
                                    <input className="form-input" defaultValue="NexStep Placement Portal" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Support Email</label>
                                    <input className="form-input" defaultValue="support@nexstep.edu" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Max File Upload Size</label>
                                    <select className="form-input">
                                        <option>5 MB</option>
                                        <option selected>10 MB</option>
                                        <option>20 MB</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Default Session Timeout</label>
                                    <select className="form-input">
                                        <option>15 minutes</option>
                                        <option selected>30 minutes</option>
                                        <option>60 minutes</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Maintenance Mode</label>
                                    <select className="form-input">
                                        <option selected>Off</option>
                                        <option>On</option>
                                    </select>
                                </div>
                                <button className="btn btn-primary" style={{ width: 'fit-content' }}>
                                    <CheckCircle size={18} /> Save Settings
                                </button>
                            </div>
                        </div>
                        <div className="glass" style={{ padding: '2rem' }}>
                            <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Notification Settings</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {[
                                    'Email notifications for new registrations',
                                    'SMS alerts for critical system errors',
                                    'Weekly summary reports',
                                    'Placement milestone notifications',
                                    'Security alert emails',
                                ].map((item, i) => (
                                    <div key={i} className="glass-card" style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '0.95rem' }}>{item}</span>
                                        <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: i < 3 ? 'var(--primary)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative' }}>
                                            <div style={{ position: 'absolute', top: '2px', left: i < 3 ? '22px' : '2px', width: '20px', height: '20px', borderRadius: '50%', background: 'white', transition: 'left 0.3s ease' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default AdminDashboard;
