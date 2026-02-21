import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ChevronRight, GraduationCap, Briefcase, Building2, ShieldCheck, AlertCircle, User, CheckCircle2, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Student'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const roles = [
    { id: 'Student', icon: GraduationCap, label: 'Student', desc: 'Apply for your dream jobs' },
    { id: 'Employer', icon: Building2, label: 'Employer', desc: 'Find top talent for your company' },
    { id: 'Placement Officer', icon: Briefcase, label: 'Officer', desc: 'Manage placements & reports' },
    { id: 'Admin', icon: ShieldCheck, label: 'Admin', desc: 'System control & settings' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if email already exists
    const existingUser = users.find(u => u.email.toLowerCase() === formData.email.toLowerCase());
    if (existingUser) {
      setError('An account with this email already exists. Please login instead.');
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      role: formData.role,
      createdAt: new Date().toISOString()
    };

    // Add user to localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    setSuccess(true);

    // Auto-login and redirect after 1.5 seconds
    setTimeout(() => {
      sessionStorage.setItem('userRole', newUser.role);
      sessionStorage.setItem('userEmail', newUser.email);
      sessionStorage.setItem('userName', newUser.name);
      sessionStorage.setItem('userId', newUser.id);
      navigate('/dashboard');
    }, 1500);
  };

  if (success) {
    return (
      <div className="flex-center" style={{ minHeight: '100vh', padding: '2rem', background: 'var(--bg-primary)' }}>
        <div className="glass animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: 'rgba(16, 185, 129, 0.2)', 
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <CheckCircle2 size={40} style={{ color: '#10b981' }} />
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Account Created!</h2>
          <p style={{ color: 'var(--text-gray)', marginBottom: '2rem' }}>
            Welcome aboard! Redirecting you to your dashboard...
          </p>
          <div className="spinner" style={{ margin: '0 auto' }}></div>
        </div>
      </div>
    );
  }

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
        
        {/* Left Side - Role Selection */}
        <div style={{ padding: '3rem', background: 'rgba(99, 102, 241, 0.05)', borderRight: '1px solid var(--glass-border)' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 700 }}>NexStep</h1>
          <p style={{ color: 'var(--text-gray)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Join thousands of users already using NexStep to transform their placement experience.
          </p>
          
          <p style={{ color: 'var(--text-gray)', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>
            I want to sign up as:
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {roles.map(role => (
              <div 
                key={role.id}
                onClick={() => { setFormData({...formData, role: role.id}); setError(''); }}
                className={`glass-card ${formData.role === role.id ? 'active' : ''}`}
                style={{ 
                  padding: '1.2rem', 
                  cursor: 'pointer',
                  border: formData.role === role.id ? '1px solid var(--primary)' : '1px solid var(--card-border)',
                  background: formData.role === role.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--card-bg)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ 
                    padding: '0.8rem', 
                    borderRadius: '12px', 
                    background: formData.role === role.id ? 'var(--primary)' : 'var(--card-bg)',
                    color: formData.role === role.id ? 'white' : 'var(--text-primary)'
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

          <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <p style={{ fontSize: '0.8rem', color: '#10b981', lineHeight: 1.6 }}>
              <strong>✓ Free forever</strong><br />
              <strong>✓ No credit card required</strong><br />
              <strong>✓ Instant access</strong>
            </p>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div style={{ padding: '4rem' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Create Account</h2>
            <p style={{ color: 'var(--text-gray)' }}>Sign up as <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{formData.role}</span></p>
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

          <form onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="John Doe" 
                  style={{ paddingLeft: '3rem' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="Minimum 6 characters" 
                  style={{ paddingLeft: '3rem' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input" 
                  placeholder="Re-enter password" 
                  style={{ paddingLeft: '3rem' }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-gray)', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--primary)', marginTop: '0.2rem' }} required />
                <span>I agree to the Terms of Service and Privacy Policy</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}>
              Create Account <ChevronRight size={20} />
            </button>
          </form>

          <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignupPage;
