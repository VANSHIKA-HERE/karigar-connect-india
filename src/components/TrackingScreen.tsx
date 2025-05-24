
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Phone, MessageCircle, MapIcon, Star, Check } from 'lucide-react';

const TrackingScreen = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [workStatus, setWorkStatus] = useState('accepted'); // 'pending', 'accepted', 'on_way', 'arrived', 'in_progress', 'completed'
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);

  const booking = {
    id: bookingId,
    worker: {
      name: 'राजेश कुमार',
      phone: '+91 9876543210'
    },
    service: 'Electrician',
    date: '2024-01-15',
    time: '10:00 AM',
    address: '123 Main Street, New Delhi',
    totalAmount: 650
  };

  const statusSteps = [
    { key: 'accepted', label: 'Booking Accepted', hindi: 'बुकिंग स्वीकार' },
    { key: 'on_way', label: 'Worker on the way', hindi: 'कामगार रास्ते में' },
    { key: 'arrived', label: 'Worker arrived', hindi: 'कामगार पहुंच गया' },
    { key: 'in_progress', label: 'Work in progress', hindi: 'काम चल रहा है' },
    { key: 'completed', label: 'Work completed', hindi: 'काम पूरा हुआ' }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === workStatus);

  const handleCall = () => {
    window.location.href = `tel:${booking.worker.phone}`;
  };

  const handleMessage = () => {
    toast({
      title: "Opening Chat",
      description: "In-app messaging would open here",
    });
  };

  const handleWorkCompleted = () => {
    setWorkStatus('completed');
    setShowRating(true);
  };

  const handleRatingSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please provide a rating",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Thank you!",
      description: "Your rating has been submitted",
    });
    
    setTimeout(() => {
      navigate('/services');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-amber-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/services')}
            className="text-white hover:bg-amber-700"
          >
            ← Home
          </Button>
          <h1 className="text-lg font-semibold">Track Service</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Booking Info */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{booking.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Worker:</span>
              <span className="font-medium">{booking.worker.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">{booking.date} at {booking.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium">#{booking.id}</span>
            </div>
          </div>
        </Card>

        {/* Status Progress */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Service Status</h3>
          <div className="space-y-4">
            {statusSteps.map((step, index) => (
              <div key={step.key} className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStepIndex 
                    ? 'bg-green-500 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {index <= currentStepIndex ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-bold">{index + 1}</span>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${
                    index <= currentStepIndex ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                  <p className={`text-sm ${
                    index <= currentStepIndex ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.hindi}
                  </p>
                </div>
                {index === currentStepIndex && (
                  <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Options */}
        {workStatus !== 'completed' && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Contact Worker</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={handleCall}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call
              </Button>
              <Button
                onClick={handleMessage}
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Message
              </Button>
            </div>
          </Card>
        )}

        {/* Map placeholder */}
        {(workStatus === 'on_way' || workStatus === 'arrived') && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Worker Location</h3>
            <div className="h-40 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-green-800">
                <MapIcon className="w-8 h-8 mx-auto mb-2" />
                <p className="font-medium">Live Tracking</p>
                <p className="text-sm">Worker location on map</p>
              </div>
            </div>
          </Card>
        )}

        {/* Work Done Button (for worker) */}
        {workStatus === 'in_progress' && (
          <Card className="p-4">
            <Button
              onClick={handleWorkCompleted}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            >
              Mark Work as Completed
            </Button>
            <p className="text-xs text-gray-500 text-center mt-2">
              Worker will click this when work is done
            </p>
          </Card>
        )}

        {/* Rating Modal */}
        {showRating && (
          <Card className="p-6 border-amber-200">
            <h3 className="font-semibold text-gray-800 mb-4 text-center">
              Rate Your Experience
            </h3>
            <div className="flex justify-center space-x-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer ${
                    star <= rating
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-300'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <Button
              onClick={handleRatingSubmit}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3"
            >
              Submit Rating
            </Button>
          </Card>
        )}

        {/* Payment Info */}
        {workStatus === 'completed' && !showRating && (
          <Card className="p-4 bg-green-50 border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Payment Due</h3>
            <p className="text-green-700 mb-3">
              Total Amount: ₹{booking.totalAmount}
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Pay Now
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackingScreen;
