import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Building2, Briefcase, ShieldCheck, CheckCircle2, TrendingUp, Users, Award, ArrowRight, Target, Zap, Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: GraduationCap,
      title: 'For Students',
      description: 'Access hundreds of placement opportunities, track applications, and prepare for interviews all in one place.',
      color: '#6366f1'
    },
    {
      icon: Building2,
      title: 'For Employers',
      description: 'Find the perfect candidates, manage recruitment drives, and connect with talented students efficiently.',
      color: '#8b5cf6'
    },
    {
      icon: Briefcase,
      title: 'For Officers',
      description: 'Oversee placement activities, generate reports, and coordinate between students and employers seamlessly.',
      color: '#ec4899'
    },
    {
      icon: ShieldCheck,
      title: 'Admin Control',
      description: 'Complete system management, user administration, and advanced analytics at your fingertips.',
      color: '#f59e0b'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Active Users' },
    { icon: Building2, value: '500+', label: 'Partner Companies' },
    { icon: Award, value: '95%', label: 'Placement Rate' },
    { icon: TrendingUp, value: '15K+', label: 'Jobs Posted' }
  ];

  const benefits = [
    'Real-time application tracking',
    'Interview scheduling & reminders',
    'Resume builder & optimization',
    'Company insights & reviews',
    'Personalized job recommendations',
    'Secure data management'
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Navigation */}
      <nav style={{ 
        padding: '1.5rem 3rem', 
        position: 'sticky', 
        top: 0, 
        background: theme === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--glass-border)',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={24} color="white" />
            </div>
            <span className="text-gradient" style={{ fontSize: '1.8rem', fontWeight: 700 }}>NexStep</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              onClick={toggleTheme}
              className="theme-toggle"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="btn" 
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)' }}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="btn btn-primary"
            >
              Get Started <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ padding: '5rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div className="animate-fade-in" style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1.5rem', 
            background: 'rgba(99, 102, 241, 0.1)', 
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '50px',
            marginBottom: '2rem'
          }}>
            <span style={{ color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600 }}>
              <Zap size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
              Smart Placement Management Platform
            </span>
          </div>
          
          <h1 className="animate-fade-in" style={{ 
            fontSize: '4rem', 
            fontWeight: 800, 
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            background: theme === 'dark' 
              ? 'linear-gradient(135deg, #fff, #a5b4fc)'
              : 'linear-gradient(135deg, #1e293b, #6366f1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Your Gateway to Career Success
          </h1>
          
          <p className="animate-fade-in" style={{ 
            fontSize: '1.3rem', 
            color: 'var(--text-gray)', 
            marginBottom: '3rem',
            lineHeight: 1.8
          }}>
            NexStep bridges the gap between talent and opportunity. A comprehensive platform connecting students, employers, and placement officers for seamless recruitment management.
          </p>

          <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => navigate('/signup')}
              className="btn btn-primary" 
              style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}
            >
              Start Your Journey <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="btn" 
              style={{ 
                fontSize: '1.1rem', 
                padding: '1rem 2.5rem',
                background: 'rgba(255,255,255,0.05)',
                border: '2px solid var(--glass-border)',
                color: 'var(--text-primary)'
              }}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="animate-fade-in" style={{ 
          marginTop: '5rem', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '2rem' 
        }}>
          {stats.map((stat, index) => (
            <div key={index} className="glass" style={{ padding: '2rem', textAlign: 'center' }}>
              <stat.icon size={32} style={{ color: 'var(--primary)', margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{stat.value}</h3>
              <p style={{ color: 'var(--text-gray)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '5rem 3rem', 
        background: theme === 'dark' ? 'rgba(99, 102, 241, 0.03)' : 'rgba(99, 102, 241, 0.06)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Built for <span className="text-gradient">Everyone</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)' }}>
              Tailored solutions for every stakeholder in the placement ecosystem
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {features.map((feature, index) => (
              <div key={index} className="glass hover-lift" style={{ padding: '2.5rem' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '15px',
                  background: `linear-gradient(135deg, ${feature.color}, ${feature.color}dd)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <feature.icon size={28} color="white" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-gray)', lineHeight: 1.8 }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '5rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              Why Choose <span className="text-gradient">NexStep?</span>
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-gray)', marginBottom: '2rem', lineHeight: 1.8 }}>
              Experience the most advanced and user-friendly placement management system designed with cutting-edge technology and best practices.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {benefits.map((benefit, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <CheckCircle2 size={24} style={{ color: '#10b981', flexShrink: 0 }} />
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-primary)' }}>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
            <Shield size={80} style={{ color: 'var(--primary)', margin: '0 auto 2rem' }} />
            <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Secure & Reliable
            </h3>
            <p style={{ color: 'var(--text-gray)', lineHeight: 1.8, marginBottom: '2rem' }}>
              Your data is protected with industry-standard security measures. We prioritize privacy and compliance to ensure a safe experience for all users.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <div className="badge">256-bit Encryption</div>
              <div className="badge">GDPR Compliant</div>
              <div className="badge">24/7 Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '5rem 3rem', 
        background: theme === 'dark' 
          ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))'
          : 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Ready to Transform Your Placement Experience?
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)', marginBottom: '3rem' }}>
            Join thousands of students, employers, and institutions already using NexStep
          </p>
          <button 
            onClick={() => navigate('/signup')}
            className="btn btn-primary" 
            style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}
          >
            Create Free Account <ArrowRight size={22} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '3rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ 
              width: '35px', 
              height: '35px', 
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={20} color="white" />
            </div>
            <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 700 }}>NexStep</span>
          </div>
          <p style={{ color: 'var(--text-gray)', marginBottom: '1rem' }}>
            Empowering careers, one connection at a time.
          </p>
          <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>
            © 2026 NexStep. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
