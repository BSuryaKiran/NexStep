import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ChevronRight, GraduationCap, Briefcase, Building2, ShieldCheck } from 'lucide-react';
import NotRobotCheckbox from '../components/NotRobotCheckbox';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeRole, setActiveRole] = useState('Student');
  const [isVerified, setIsVerified] = useState(false);
  const [showVerificationError, setShowVerificationError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check verification for all roles
    if (!isVerified) {
      setShowVerificationError(true);
      return;
    }

    // In a real app, logic would go here
    // For demo, we just navigate to dashboard with role info
    sessionStorage.setItem('userRole', activeRole);
    sessionStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  const roles = [
    { id: 'Student', icon: GraduationCap, label: 'Student', desc: 'Apply for your dream jobs' },
    { id: 'Employer', icon: Building2, label: 'Employer', desc: 'Find top talent for your company' },
    { id: 'Placement Officer', icon: Briefcase, label: 'Officer', desc: 'Manage placements & reports' },
    { id: 'Admin', icon: ShieldCheck, label: 'Admin', desc: 'System control & settings' }
  ];

  const demoCredentials = {
    'Student': { email: 'student@demo.com', pass: 'student123' },
    'Employer': { email: 'jobs@google.com', pass: 'employer123' },
    'Placement Officer': { email: 'officer@univ.edu', pass: 'officer123' },
    'Admin': { email: 'admin@system.com', pass: 'admin123' }
  };

  const fillDemo = (roleId) => {
    if (activeRole !== roleId) {
      setActiveRole(roleId);
      setEmail(demoCredentials[roleId].email);
      setPassword(demoCredentials[roleId].pass);
      setIsVerified(false);
      setShowVerificationError(false);
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', padding: '2rem' }}>
      <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', overflow: 'hidden' }}>

        {/* Left Side - Hero Info */}
        <div style={{ padding: '3rem', background: 'rgba(99, 102, 241, 0.05)', borderRight: '1px solid var(--glass-border)' }}>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>NexStep</h1>
          <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            The ultimate placement interaction system for modern institutions. Bridging the gap between talent and opportunity.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {roles.map(role => (
              <div
                key={role.id}
                onClick={() => fillDemo(role.id)}
                className={`glass-card ${activeRole === role.id ? 'active' : ''}`}
                style={{
                  padding: '1.2rem',
                  cursor: 'pointer',
                  border: activeRole === role.id ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,0.05)',
                  background: activeRole === role.id ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    padding: '0.8rem',
                    borderRadius: '12px',
                    background: activeRole === role.id ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    color: 'white'
                  }}>
                    <role.icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{role.label}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{role.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{ padding: '4rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-gray)' }}>
              Login as <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{activeRole}</span> to continue.
              <span style={{ marginLeft: '0.5rem', opacity: 0.7, fontSize: '0.8rem' }}>(Select role on the left)</span>
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="name@company.com"
                  style={{ paddingLeft: '3rem' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                  style={{ paddingLeft: '3rem' }}
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
                marginBottom: '1.5rem',
                border: '1px solid rgba(239, 68, 68, 0.3)'
              }}>
                Please verify that you are not a robot to continue.
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-gray)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> Remember me
              </label>
              <a href="#" style={{ fontSize: '0.9rem', color: 'var(--primary)', textDecoration: 'none' }}>Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
              Sign In <ChevronRight size={20} />
            </button>
          </form>

          <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
            Don't have an account? <a href="#" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Create one</a>
          </p>

          <div style={{ marginTop: '2.5rem', padding: '1rem', background: 'rgba(255, 193, 7, 0.05)', borderRadius: '12px', border: '1px dashed rgba(255, 193, 7, 0.3)' }}>
            <p style={{ fontSize: '0.8rem', color: '#ffc107', textAlign: 'center' }}>
              <strong>Demo Hint:</strong> Select a role on the left to auto-fill credentials
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
