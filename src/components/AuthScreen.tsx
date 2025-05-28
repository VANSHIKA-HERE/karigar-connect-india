import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const AuthScreen = () => {
  const [step, setStep] = useState('details'); // 'details' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmitDetails = () => {
    if (!formData.name || !formData.phone || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP sending
    toast({
      title: "OTP Sent",
      description: `Verification code sent to ${formData.phone}`,
    });
    setStep('otp');
  };

  const handleVerifyOTP = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    // Simulate successful verification
    localStorage.setItem('userAuth', JSON.stringify(formData));
    toast({
      title: "Welcome to Karigar!",
      description: "Account verified successfully",
    });

    // Decide the next page based on userType
    const userType = localStorage.getItem('userType');
    if (userType === 'worker') {
      navigate('/aadhaar-verification');
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">
            {step === 'details' ? 'Create Account' : 'Verify Phone'}
          </h1>
          <p className="text-amber-600">
            {step === 'details' ? 'खाता बनाएं' : 'फोन सत्यापित करें'}
          </p>
        </div>

        <Card className="p-6 bg-white shadow-lg">
          {step === 'details' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name / पूरा नाम *
                </label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number / फोन नंबर *
                </label>
                <Input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email / ईमेल *
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleSubmitDetails}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-semibold rounded-xl mt-6"
              >
                Send OTP / OTP भेजें
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <p className="text-gray-600">
                  Enter 6-digit code sent to<br />
                  <span className="font-semibold">{formData.phone}</span>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Verification Code / सत्यापन कोड
                </label>
                <Input
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-semibold rounded-xl mt-6"
              >
                Verify / सत्यापित करें
              </Button>

              <Button
                onClick={() => setStep('details')}
                variant="ghost"
                className="w-full text-amber-600"
              >
                Change Phone Number
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
