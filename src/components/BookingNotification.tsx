
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, Clock, MapPin, User, X } from 'lucide-react';

interface BookingNotificationProps {
  notification: {
    id: string;
    customerName: string;
    service: string;
    location: string;
    price: number;
    timeAgo: string;
    urgency: 'urgent' | 'normal';
  };
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
}

const BookingNotification: React.FC<BookingNotificationProps> = ({
  notification,
  onAccept,
  onDismiss
}) => {
  return (
    <Card className="fixed top-4 right-4 z-50 w-80 p-4 bg-white shadow-lg border-l-4 border-l-amber-500 animate-in slide-in-from-right">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-amber-600" />
          <span className="font-semibold text-gray-800">New Booking Request!</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDismiss(notification.id)}
          className="h-auto p-1"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="font-medium">{notification.customerName}</span>
          {notification.urgency === 'urgent' && (
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
              Urgent
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{notification.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Clock className="w-4 h-4" />
          <span>{notification.timeAgo}</span>
        </div>
        
        <div className="text-lg font-bold text-green-600">
          ₹{notification.price}
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={() => onAccept(notification.id)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2"
        >
          Accept
        </Button>
        <Button
          onClick={() => onDismiss(notification.id)}
          variant="outline"
          className="flex-1 text-sm py-2"
        >
          Dismiss
        </Button>
      </div>
    </Card>
  );
};

export default BookingNotification;
