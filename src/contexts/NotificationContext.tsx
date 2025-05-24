
import React, { createContext, useContext, useState, useCallback } from 'react';

interface BookingNotification {
  id: string;
  customerName: string;
  service: string;
  location: string;
  price: number;
  timeAgo: string;
  urgency: 'urgent' | 'normal';
}

interface NotificationContextType {
  notifications: BookingNotification[];
  addNotification: (notification: BookingNotification) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<BookingNotification[]>([]);

  const addNotification = useCallback((notification: BookingNotification) => {
    setNotifications(prev => [notification, ...prev]);
    
    // Auto-remove notification after 10 seconds if not interacted with
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 10000);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification,
      clearAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
