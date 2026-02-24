import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, GraduationCap, Briefcase, Building2, ShieldCheck } from 'lucide-react';
import NotRobotCheckbox from '../components/NotRobotCheckbox';

const EnhancedLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeRole, setActiveRole] = useState('Student');
    const [isVerified, setIsVerified] = useState(false);
    const [showVerificationError, setShowVerificationError] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please enter email and password');
            return;
        }

        // Check verification for all roles
        if (!isVerified) {
            setShowVerificationError(true);
            return;
        }

        sessionStorage.setItem('userRole', activeRole);
        sessionStorage.setItem('userEmail', email);
        navigate('/dashboard');
    };

    const roles = [
        {
            id: 'Student',
            icon: GraduationCap,
            label: 'Student',
            desc: 'Apply for your dream jobs',
            color: '#FF6B35'
        },
        {
            id: 'Employer',
            icon: Building2,
            label: 'Employer',
            desc: 'Find top talent for your company',
            color: '#FF8C42'
        },
        {
            id: 'Placement Officer',
            icon: Briefcase,
            label: 'Officer',
            desc: 'Manage placements & reports',
            color: '#FFAD99'
        },
        {
            id: 'Admin',
            icon: ShieldCheck,
            label: 'Admin',
            desc: 'System control & settings',
            color: '#FF6B35'
        }
    ];

    return (
        <div className="flex-center" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--bg-darker)' }}>
            <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '1200px', display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 1.5fr', overflow: 'hidden', borderRadius: '24px' }}>

                {/* Left Side - Hero Info & Role Selection */}
                <div style={{ padding: '3rem', background: 'rgba(255, 107, 53, 0.03)', borderRight: '1px solid var(--glass-border)', overflowY: 'auto', maxHeight: '90vh' }}>
                    <h1 className="text-gradient" style={{ fontSize: '2.8rem', marginBottom: '1rem', fontWeight: 700 }}>CareerMatch</h1>
                    <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem', lineHeight: 1.6, fontSize: '1.05rem' }}>
                        The ultimate AI-powered placement interaction system. Bridging the gap between talent and opportunity with intelligent matching.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        {roles.map(role => (
                            <div
                                key={role.id}
                                className={`glass-card`}
                                style={{
                                    padding: '1.5rem',
                                    cursor: 'pointer',
                                    border: activeRole === role.id ? `2px solid ${role.color}` : '1px solid rgba(255,255,255,0.05)',
                                    background: activeRole === role.id ? 'rgba(255, 107, 53, 0.12)' : 'rgba(255,255,255,0.02)',
                                    transition: 'all 0.3s',
                                    transform: activeRole === role.id ? 'translateX(8px)' : 'translateX(0)'
                                }}
                                onClick={() => {
                                    if (activeRole !== role.id) {
                                        setActiveRole(role.id);
                                        setIsVerified(false);
                                        setShowVerificationError(false);
                                    }
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                                    <div style={{
                                        padding: '1rem',
                                        borderRadius: '14px',
                                        background: activeRole === role.id ? role.color : 'rgba(255,255,255,0.05)',
                                        color: activeRole === role.id ? 'white' : '#FF6B35',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        minWidth: '50px',
                                        minHeight: '50px'
                                    }}>
                                        <role.icon size={24} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.2rem', color: activeRole === role.id ? role.color : 'white' }}>
                                            {role.label}
                                        </h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>{role.desc}</p>
                                    </div>
                                    {activeRole === role.id && (
                                        <ChevronRight size={20} style={{ color: role.color }} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflowY: 'auto', maxHeight: '90vh' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Welcome Back</h2>
                        <p style={{ color: 'var(--text-gray)', fontSize: '1rem' }}>
                            Login as <span style={{ color: '#FF6B35', fontWeight: 600 }}>{roles.find(r => r.id === activeRole)?.label}</span> to continue.
                            <span style={{ marginLeft: '0.5rem', opacity: 0.7, fontSize: '0.85rem' }}>(Switch roles on the left)</span>
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-gray)'
                                }} />
                                <input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{
                                    position: 'absolute',
                                    left: '1rem',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    color: 'var(--text-gray)'
                                }} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                    style={{ paddingLeft: '2.5rem' }}
                                    required
                                />
                            </div>
                        </div>

                        <NotRobotCheckbox
                            roleType={activeRole}
                            onVerified={(verified) => {
                                setIsVerified(verified);
                                setShowVerificationError(false);
                            }}
                        />

                        {showVerificationError && (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                borderRadius: '8px',
                                color: '#ef4444',
                                fontSize: '0.9rem',
                                border: '1px solid rgba(239, 68, 68, 0.3)'
                            }}>
                                Please verify that you are not a robot to continue.
                            </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                                <input type="checkbox" style={{ cursor: 'pointer' }} />
                                <span style={{ color: 'var(--text-gray)' }}>Remember me</span>
                            </label>
                            <a href="#" style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                padding: '1rem',
                                fontSize: '1rem',
                                fontWeight: 600,
                                gap: '0.8rem'
                            }}
                        >
                            Sign In <ChevronRight size={20} />
                        </button>
                    </form>

                    {/* Demo Hint */}
                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        background: 'rgba(255, 173, 153, 0.1)',
                        borderRadius: '12px',
                        textAlign: 'center'
                    }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>
                            Demo Mode: Use any demo credentials from the roles section
                        </p>
                    </div>

                    <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                        Don't have an account? <a href="#" style={{ color: '#FF6B35', textDecoration: 'none', fontWeight: 600 }}>Create one</a>
                    </p>
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

export default EnhancedLoginPage;
