
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Phone, MessageCircle, MapIcon, Star, Check, Navigation } from 'lucide-react';

const TrackingScreen = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [workStatus, setWorkStatus] = useState('accepted');
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const mapContainer = useRef<HTMLDivElement>(null);

  const booking = {
    id: bookingId,
    worker: {
      name: 'राजेश कुमार',
      phone: '+91 9876543210'
    },
    customer: {
      name: 'Priya Sharma',
      location: { lat: 28.6139, lng: 77.2090 },
      address: '123 Main Street, New Delhi'
    },
    service: 'Electrician',
    date: '2024-01-15',
    time: '10:00 AM',
    address: '123 Main Street, New Delhi',
    totalAmount: 650
  };

  // Worker's current location (simulated)
  const workerLocation = { lat: 28.6129, lng: 77.2080 };

  const statusSteps = [
    { key: 'accepted', label: 'Booking Accepted', hindi: 'बुकिंग स्वीकार' },
    { key: 'on_way', label: 'Worker on the way', hindi: 'कामगार रास्ते में' },
    { key: 'arrived', label: 'Worker arrived', hindi: 'कामगार पहुंच गया' },
    { key: 'in_progress', label: 'Work in progress', hindi: 'काम चल रहा है' },
    { key: 'completed', label: 'Work completed', hindi: 'काम पूरा हुआ' }
  ];

  const currentStepIndex = statusSteps.findIndex(step => step.key === workStatus);

  // Initialize map with customer location
  useEffect(() => {
    if (mapContainer.current && workStatus !== 'completed') {
      // In a real app, you would initialize Google Maps or Mapbox here
      console.log('Map initialized with customer location:', booking.customer.location);
    }
  }, [workStatus, booking.customer.location]);

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

  const handleStartNavigation = () => {
    const { lat, lng } = booking.customer.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const updateStatus = (newStatus: string) => {
    setWorkStatus(newStatus);
    toast({
      title: "Status Updated",
      description: `Status changed to: ${statusSteps.find(s => s.key === newStatus)?.label}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-amber-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/worker-dashboard')}
            className="text-white hover:bg-amber-700"
          >
            ← Dashboard
          </Button>
          <h1 className="text-lg font-semibold">Job Details</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Customer & Job Info */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Job Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Customer:</span>
              <span className="font-medium">{booking.customer.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service:</span>
              <span className="font-medium">{booking.service}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date & Time:</span>
              <span className="font-medium">{booking.date} at {booking.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium text-green-600">₹{booking.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Address:</span>
              <span className="font-medium text-right flex-1 ml-2">{booking.customer.address}</span>
            </div>
          </div>
        </Card>

        {/* Customer Location Map */}
        {workStatus !== 'completed' && (
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Customer Location</h3>
              <Button
                onClick={handleStartNavigation}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Navigation className="w-4 h-4 mr-1" />
                Navigate
              </Button>
            </div>
            <div 
              ref={mapContainer}
              className="h-48 bg-green-100 rounded-lg flex items-center justify-center relative overflow-hidden"
            >
              {/* Map placeholder with customer location marker */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-200 to-blue-200">
                <div className="absolute top-6 left-6 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white">
                  C
                </div>
                <div className="absolute bottom-6 right-6 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white">
                  W
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-700 bg-white/80 p-3 rounded-lg">
                    <MapIcon className="w-8 h-8 mx-auto mb-2" />
                    <p className="font-medium">Customer Location Map</p>
                    <p className="text-sm">C = Customer, W = Worker</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

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

        {/* Status Update Buttons for Worker */}
        {workStatus !== 'completed' && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Update Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {workStatus === 'accepted' && (
                <Button
                  onClick={() => updateStatus('on_way')}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Start Journey
                </Button>
              )}
              {workStatus === 'on_way' && (
                <Button
                  onClick={() => updateStatus('arrived')}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Mark Arrived
                </Button>
              )}
              {workStatus === 'arrived' && (
                <Button
                  onClick={() => updateStatus('in_progress')}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Start Work
                </Button>
              )}
              {workStatus === 'in_progress' && (
                <Button
                  onClick={handleWorkCompleted}
                  className="bg-green-600 hover:bg-green-700 text-white col-span-2"
                >
                  Complete Work
                </Button>
              )}
            </div>
          </Card>
        )}

        {/* Contact Options */}
        {workStatus !== 'completed' && (
          <Card className="p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Contact Customer</h3>
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
            <h3 className="font-semibold text-green-800 mb-2">Work Completed!</h3>
            <p className="text-green-700 mb-3">
              Amount Earned: ₹{booking.totalAmount}
            </p>
            <p className="text-sm text-green-600">
              Payment will be processed within 24 hours
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackingScreen;
