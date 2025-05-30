
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Calendar, Clock, MapIcon, User } from 'lucide-react';

const BookingScreen = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    address: '',
    description: '',
    estimatedHours: '2'
  });

  const worker = {
    name: 'राजेश कुमार',
    price: 300,
    serviceCharge: 50
  };

  const bookingFee = 49;
  const totalAmount = (worker.price * parseInt(bookingData.estimatedHours)) + worker.serviceCharge;

  const handleBooking = () => {
    if (!bookingData.date || !bookingData.time || !bookingData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate booking fee payment
    const bookingId = Math.random().toString(36).substr(2, 9);
    toast({
      title: "Booking Fee Paid!",
      description: "Proceeding to worker assignment",
    });
    
    navigate(`/tracking/${bookingId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-amber-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-amber-700"
          >
            ← Back
          </Button>
          <h1 className="text-lg font-semibold">Book Service</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Worker Info */}
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-amber-700" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{worker.name}</h3>
              <p className="text-amber-600">₹{worker.price}/hour</p>
            </div>
          </div>
        </Card>

        {/* Booking Form */}
        <Card className="p-4 space-y-4">
          <h3 className="font-semibold text-gray-800">Booking Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date / तारीख
              </label>
              <Input
                type="date"
                value={bookingData.date}
                onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Time / समय
              </label>
              <Input
                type="time"
                value={bookingData.time}
                onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Hours / अनुमानित घंटे
            </label>
            <select
              value={bookingData.estimatedHours}
              onChange={(e) => setBookingData({ ...bookingData, estimatedHours: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
              <option value="6">6 hours</option>
              <option value="8">8 hours (Full day)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapIcon className="w-4 h-4 inline mr-1" />
              Service Address / सेवा का पता
            </label>
            <Textarea
              placeholder="Enter complete address where service is required"
              value={bookingData.address}
              onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Description / काम का विवरण (Optional)
            </label>
            <Textarea
              placeholder="Describe the work needed..."
              value={bookingData.description}
              onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
              rows={3}
            />
          </div>
        </Card>

        {/* Booking Fee Card */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-3">Booking Fee</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-blue-700">Pay to confirm booking</span>
              <span className="font-semibold text-blue-800">₹{bookingFee}</span>
            </div>
            <p className="text-xs text-blue-600">
              This fee secures your booking and will be adjusted in final payment
            </p>
          </div>
        </Card>

        {/* Pricing Breakdown */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Estimated Total Cost</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Service ({bookingData.estimatedHours} hours)</span>
              <span>₹{worker.price * parseInt(bookingData.estimatedHours)}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform fee</span>
              <span>₹{worker.serviceCharge}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-semibold text-lg">
              <span>Total (after service)</span>
              <span className="text-amber-600">₹{totalAmount}</span>
            </div>
            <p className="text-xs text-gray-500">
              Full payment will be collected after work completion
            </p>
          </div>
        </Card>

        {/* Book Button */}
        <div className="pb-6">
          <Button
            onClick={handleBooking}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold rounded-xl"
          >
            Pay Booking Fee • ₹{bookingFee}
          </Button>
          <p className="text-xs text-gray-500 text-center mt-2">
            Secure your booking with advance payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingScreen;
