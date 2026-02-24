import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const currentUserId = sessionStorage.getItem('userId');
  const currentUserRole = sessionStorage.getItem('userRole');

  // Load notifications from localStorage
  useEffect(() => {
    loadNotifications();
    
    // Listen for storage changes (for real-time updates across tabs)
    const handleStorageChange = (e) => {
      if (e.key === 'notifications') {
        loadNotifications();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also poll for changes every 2 seconds (for same-tab updates)
    const interval = setInterval(loadNotifications, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [currentUserId]);

  const loadNotifications = () => {
    if (!currentUserId) return;
    
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const userNotifications = allNotifications
      .filter(notif => notif.recipientId === currentUserId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    setNotifications(userNotifications);
  };

  const addNotification = (notification) => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const newNotification = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    allNotifications.push(newNotification);
    localStorage.setItem('notifications', JSON.stringify(allNotifications));
    
    // Trigger storage event for same tab
    window.dispatchEvent(new Event('storage'));
    loadNotifications();
  };

  const markAsRead = (notificationId) => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updated = allNotifications.map(notif => 
      notif.id === notificationId ? { ...notif, read: true } : notif
    );
    
    localStorage.setItem('notifications', JSON.stringify(updated));
    loadNotifications();
  };

  const markAllAsRead = () => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updated = allNotifications.map(notif => 
      notif.recipientId === currentUserId ? { ...notif, read: true } : notif
    );
    
    localStorage.setItem('notifications', JSON.stringify(updated));
    loadNotifications();
  };

  const deleteNotification = (notificationId) => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updated = allNotifications.filter(notif => notif.id !== notificationId);
    
    localStorage.setItem('notifications', JSON.stringify(updated));
    loadNotifications();
  };

  const clearAllNotifications = () => {
    const allNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    const updated = allNotifications.filter(notif => notif.recipientId !== currentUserId);
    
    localStorage.setItem('notifications', JSON.stringify(updated));
    loadNotifications();
  };

  // Helper function to send notification to a user
  const sendNotification = ({ recipientId, title, message, type, actionUrl }) => {
    addNotification({
      recipientId,
      title,
      message,
      type, // 'success', 'info', 'warning', 'error'
      actionUrl
    });
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      deleteNotification,
      clearAllNotifications,
      sendNotification,
      loadNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
