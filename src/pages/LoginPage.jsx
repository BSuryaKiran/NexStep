import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ChevronRight, GraduationCap, Briefcase, Building2, ShieldCheck, AlertCircle, ArrowLeft, Sun, Moon, CheckCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import CustomCaptcha from '../components/CustomCaptcha';

// Initialize demo users in localStorage (only if no users exist)
const initializeDemoUsers = () => {
  const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
  
  // Only initialize if there are no users
  if (existingUsers.length === 0) {
    const demoUsers = [
      { id: '1', email: 'student@demo.com', password: 'student123', role: 'Student', name: 'Demo Student' },
      { id: '2', email: 'recruiter@demo.com', password: 'recruiter123', role: 'Recruiter', name: 'Demo Recruiter' },
      { id: '3', email: 'officer@demo.com', password: 'officer123', role: 'Placement Officer', name: 'Demo Officer' },
      { id: '4', email: 'admin@demo.com', password: 'admin123', role: 'Admin', name: 'Demo Admin' }
    ];
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeRole, setActiveRole] = useState('Student');
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    initializeDemoUsers();
  }, []);

  // Reset captcha state when role changes
  useEffect(() => {
    setIsRobot(false);
    setCaptchaVerified(false);
  }, [activeRole]);

  const handleRobotCheckbox = () => {
    if (activeRole === 'Student') {
      // For Student role, show CAPTCHA popup
      if (!isRobot) {
        setShowCaptcha(true);
      } else {
        setIsRobot(false);
        setCaptchaVerified(false);
      }
    } else {
      // For other roles, simple checkbox toggle
      setIsRobot(!isRobot);
    }
  };

  const handleCaptchaVerify = (success) => {
    if (success) {
      setIsRobot(true);
      setCaptchaVerified(true);
      setShowCaptcha(false);
    }
  };

  const handleCaptchaClose = () => {
    setShowCaptcha(false);
    setIsRobot(false);
    setCaptchaVerified(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check if "I am not a robot" is verified
    if (!isRobot) {
      setError('Please verify that you are not a robot.');
      return;
    }

    // For Student role, ensure CAPTCHA was verified
    if (activeRole === 'Student' && !captchaVerified) {
      setError('Please complete the CAPTCHA verification.');
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching email and password (email is case-insensitive)
    const user = users.find(u => u.email === email.toLowerCase().trim() && u.password === password);
    
    if (user) {
      // Check if role matches (if you want strict role checking)
      if (user.role !== activeRole) {
        setError(`This account is registered as ${user.role}, not ${activeRole}. Please select the correct role.`);
        return;
      }
      
      // Store user session
      sessionStorage.setItem('userRole', user.role);
      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('userName', user.name);
      sessionStorage.setItem('userId', user.id);
      if (user.company) {
        sessionStorage.setItem('userCompany', user.company);
      }
      
      // Navigate to dashboard
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  const roles = [
    { id: 'Student', icon: GraduationCap, label: 'Student', desc: 'Apply for your dream jobs' },
    { id: 'Recruiter', icon: Building2, label: 'Recruiter', desc: 'Find top talent for your company' },
    { id: 'Placement Officer', icon: Briefcase, label: 'Officer', desc: 'Manage placements & reports' },
    { id: 'Admin', icon: ShieldCheck, label: 'Admin', desc: 'System control & settings' }
  ];

  const demoCredentials = {
    'Student': { email: 'student@demo.com', pass: 'student123' },
    'Recruiter': { email: 'recruiter@demo.com', pass: 'recruiter123' },
    'Placement Officer': { email: 'officer@demo.com', pass: 'officer123' },
    'Admin': { email: 'admin@demo.com', pass: 'admin123' }
  };

  const fillDemo = (roleId) => {
    setActiveRole(roleId);
    setEmail(demoCredentials[roleId].email);
    setPassword(demoCredentials[roleId].pass);
    setError('');
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--bg-primary)', position: 'relative' }}>
      <button 
        onClick={toggleTheme}
        className="theme-toggle"
        style={{ position: 'absolute', top: '2rem', right: '2rem' }}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <div className="glass animate-fade-in" style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', overflow: 'hidden' }}>
        
        {/* Left Side - Hero Info */}
        <div style={{ padding: '3rem', background: 'rgba(99, 102, 241, 0.05)', borderRight: '1px solid var(--glass-border)' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>NexStep</h1>
          <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            The ultimate placement interaction system for modern institutions. Bridging the gap between talent and opportunity.
          </p>
          
          <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>
            Select your role:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {roles.map(role => (
              <div 
                key={role.id}
                onClick={() => { setActiveRole(role.id); setError(''); }}
                className={`glass-card ${activeRole === role.id ? 'active' : ''}`}
                style={{ 
                  padding: '1.2rem', 
                  cursor: 'pointer',
                  border: activeRole === role.id ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                  background: activeRole === role.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--card-bg)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    padding: '0.8rem', 
                    borderRadius: '12px', 
                    background: activeRole === role.id ? 'var(--primary)' : 'var(--card-bg)',
                    color: activeRole === role.id ? 'white' : 'var(--text-primary)'
                  }}>
                    <role.icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{role.label}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-gray)' }}>{role.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <button 
              onClick={() => setShowDemo(!showDemo)}
              className="demo-button"
              style={{
                color: 'var(--warning)',
                padding: '0.8rem 1rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer',
                width: '100%',
                transition: 'all 0.3s ease'
              }}
            >
              {showDemo ? 'Hide' : 'Show'} Demo Credentials
            </button>
            
            {showDemo && (
              <div className="demo-content" style={{ marginTop: '1rem', padding: '1rem', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--warning)', marginBottom: '0.8rem' }}>
                  <strong>Click a role above to auto-fill:</strong>
                </p>
                {Object.entries(demoCredentials).map(([role, creds]) => (
                  <div key={role} style={{ fontSize: '0.7rem', color: 'var(--text-gray)', marginBottom: '0.3rem' }}>
                    <strong>{role}:</strong> {creds.email}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={{ padding: '4rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Welcome Back</h2>
            <p style={{ color: 'var(--text-gray)' }}>Login as <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{activeRole}</span> to continue</p>
          </div>

          {error && (
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(239, 68, 68, 0.1)', 
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
              <span style={{ color: '#ef4444', fontSize: '0.9rem' }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
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
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="form-input" 
                  placeholder="••••••••" 
                  style={{ paddingLeft: '3rem' }}
                  required
                />
              </div>
            </div>

            {/* I am not a robot checkbox */}
            <div style={{ 
              padding: '1rem', 
              border: '2px solid var(--glass-border)', 
              borderRadius: '8px', 
              marginBottom: '1.5rem',
              background: 'var(--card-bg)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <input 
                type="checkbox" 
                id="robotCheck"
                checked={isRobot}
                onChange={handleRobotCheckbox}
                style={{ 
                  accentColor: 'var(--primary)',
                  width: '20px',
                  height: '20px',
                  cursor: 'pointer'
                }} 
              />
              <label 
                htmlFor="robotCheck" 
                style={{ 
                  fontSize: '1rem', 
                  color: 'var(--text-primary)', 
                  cursor: 'pointer',
                  fontWeight: 500,
                  userSelect: 'none'
                }}
              >
                I am not a robot
              </label>
              {activeRole === 'Student' && isRobot && (
                <CheckCircle size={20} style={{ color: '#10b981', marginLeft: 'auto' }} />
              )}
            </div>

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
            Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Create one</Link>
          </p>
        </div>

      </div>

      {/* Custom CAPTCHA Modal */}
      {showCaptcha && (
        <CustomCaptcha 
          onVerify={handleCaptchaVerify}
          onClose={handleCaptchaClose}
        />
      )}
    </div>
  );
};

export default LoginPage;
