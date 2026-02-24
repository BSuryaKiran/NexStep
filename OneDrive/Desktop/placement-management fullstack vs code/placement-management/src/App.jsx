import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EnhancedLoginPage from './pages/EnhancedLoginPage';
import EnhancedStudentDashboard from './pages/EnhancedStudentDashboard';
import EnhancedEmployerDashboard from './pages/EnhancedEmployerDashboard';
import PlacementOfficerDashboard from './pages/PlacementOfficerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyApplications from './pages/MyApplications';
import SavedJobs from './pages/SavedJobs';
import Interviews from './pages/Interviews';
import EnhancedProfile from './pages/EnhancedProfile';
import StudentInternships from './pages/StudentInternships';
import StudentInternshipDetail from './pages/StudentInternshipDetail';
import EmployerInternshipPortal from './pages/EmployerInternshipPortal';
import OfficerInternshipTracking from './pages/OfficerInternshipTracking';
import AdminInternshipManager from './pages/AdminInternshipManager';
import './index.css';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = sessionStorage.getItem('userRole');
  
  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Role-based Dashboard Router
const RoleBasedDashboard = () => {
  const userRole = sessionStorage.getItem('userRole');
  
  switch(userRole) {
    case 'Student':
      return <EnhancedStudentDashboard />;
    case 'Employer':
      return <EnhancedEmployerDashboard />;
    case 'Placement Officer':
      return <PlacementOfficerDashboard />;
    case 'Admin':
      return <AdminDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

function App() {
  const [internships, setInternships] = useState([
    {
      id: 1,
      title: 'Frontend Development Internship',
      company: 'Google',
      companyEmail: 'employer@google.com',
      logo: '🔍',
      location: 'Bangalore, India',
      duration: '3 months',
      stipend: '₹50,000/month',
      posted: '2 days ago',
      skills: ['React', 'JavaScript', 'TypeScript'],
      description: 'Work on cutting-edge web technologies and contribute to real products used by millions.',
      company_rating: 4.8,
      applicants: 342,
      status: 'open'
    },
    {
      id: 2,
      title: 'Full Stack Development',
      company: 'Microsoft',
      companyEmail: 'employer@microsoft.com',
      logo: '🪟',
      location: 'Hyderabad, India',
      duration: '4 months',
      stipend: '₹45,000/month',
      posted: '1 week ago',
      skills: ['Node.js', 'React', 'MongoDB'],
      description: 'Build scalable applications and work with modern development practices.',
      company_rating: 4.7,
      applicants: 256,
      status: 'open'
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      internshipId: 1,
      studentEmail: 'student1@university.edu',
      studentName: 'Rahul Kumar',
      title: 'Frontend Development Internship',
      company: 'Google',
      appliedDate: '2024-02-15',
      status: 'accepted',
      score: 85,
      projects: []
    }
  ]);

  const [internshipMaterials, setInternshipMaterials] = useState({
    // Structure: { applicationId: { videos: [...], projects: [...] } }
  });

  const addInternship = (newInternship) => {
    const id = Math.max(...internships.map(i => i.id), 0) + 1;
    setInternships([...internships, { ...newInternship, id }]);
  };

  const addApplication = (studentEmail, internshipId, internshipTitle, company) => {
    const existingApp = applications.find(app => app.studentEmail === studentEmail && app.internshipId === internshipId);
    if (existingApp) {
      alert('You have already applied for this internship');
      return false;
    }
    
    const newApp = {
      id: Math.max(...applications.map(a => a.id), 0) + 1,
      internshipId,
      studentEmail,
      studentName: 'Student Name',
      title: internshipTitle,
      company,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      score: null,
      projects: []
    };
    setApplications([...applications, newApp]);
    return true;
  };

  const updateApplicationScore = (applicationId, score, scoreBreakdown) => {
    setApplications(applications.map(app => 
      app.id === applicationId 
        ? { ...app, status: 'accepted', score, scoreBreakdown }
        : app
    ));
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app =>
      app.id === applicationId
        ? { ...app, status: newStatus }
        : app
    ));
  };

  const addInternshipMaterials = (applicationId, videos, projects) => {
    setInternshipMaterials({
      ...internshipMaterials,
      [applicationId]: {
        videos: [...(internshipMaterials[applicationId]?.videos || []), ...videos],
        projects: [...(internshipMaterials[applicationId]?.projects || []), ...projects]
      }
    });
  };

  return (
    <Router>
      <div className="app-container" style={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<EnhancedLoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <RoleBasedDashboard />
              </ProtectedRoute>
            } 
          />
          {/* Student Routes */}
          <Route 
            path="/applications" 
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <MyApplications />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/saved-jobs" 
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <SavedJobs />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/interviews" 
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <Interviews />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <EnhancedProfile />
              </ProtectedRoute>
            } 
          />
          {/* Internship Routes - Student */}
          <Route 
            path="/internships" 
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentInternships internships={internships} applications={applications} onApply={addApplication} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/internship-detail/:id" 
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentInternshipDetail internships={internships} applications={applications} internshipMaterials={internshipMaterials} />
              </ProtectedRoute>
            } 
          />
          {/* Internship Routes - Employer */}
          <Route 
            path="/employer-internships" 
            element={
              <ProtectedRoute allowedRoles={['Employer']}>
                <EmployerInternshipPortal internships={internships} onPostInternship={addInternship} applications={applications} />
              </ProtectedRoute>
            } 
          />
          {/* Internship Routes - Officer */}
          <Route 
            path="/officer-internship-tracking" 
            element={
              <ProtectedRoute allowedRoles={['Placement Officer']}>
                <OfficerInternshipTracking internships={internships} applications={applications} onUpdateScore={updateApplicationScore} onUpdateStatus={updateApplicationStatus} onAddMaterials={addInternshipMaterials} />
              </ProtectedRoute>
            } 
          />
          {/* Internship Routes - Admin */}
          <Route 
            path="/admin-internship-manager" 
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminInternshipManager />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
