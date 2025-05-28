
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

const AadhaarVerification = () => {
  const [aadhaar, setAadhaar] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [workerName, setWorkerName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Only workers can access this page
    const userType = localStorage.getItem('userType');
    if (userType !== 'worker') {
      navigate('/');
    }

    // Get worker name from registration data (optional)
    try {
      const userAuth = localStorage.getItem('userAuth');
      const parsed = userAuth ? JSON.parse(userAuth) : null;
      setWorkerName(parsed?.name || "");
    } catch (e) {}
  }, [navigate]);

  const handleSendOtp = () => {
    if (!/^\d{12}$/.test(aadhaar)) {
      toast({
        title: "Invalid Aadhaar Number",
        description: "Please enter a valid 12-digit Aadhaar number.",
        variant: "destructive",
      });
      return;
    }
    setOtpSent(true);
    toast({
      title: "OTP Sent",
      description: "A 6-digit OTP has been sent to your registered mobile.",
    });
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Aadhaar Verified",
        description: "Your Aadhaar has been successfully verified.",
      });
      // Navigate to worker dashboard or next screen
      navigate('/worker-dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6 flex items-center">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Aadhaar Verification</h1>
          <p className="text-amber-600">आधार सत्यापन</p>
        </div>
        <Card className="p-6 bg-white shadow-lg">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Number / आधार संख्या *
              </label>
              <Input
                type="text"
                placeholder="Enter 12-digit Aadhaar"
                value={aadhaar}
                maxLength={12}
                pattern="\d{12}"
                disabled={otpSent}
                onChange={e => setAadhaar(e.target.value.replace(/\D/, ""))}
              />
            </div>
            {!otpSent && (
              <Button
                onClick={handleSendOtp}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base py-4 rounded-xl"
                disabled={aadhaar.length !== 12}
              >
                Send OTP / ओटीपी भेजें
              </Button>
            )}
            {otpSent && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP / ओटीपी *
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/, ""))}
                    maxLength={6}
                  />
                </div>
                <Button
                  onClick={handleVerifyOtp}
                  loading={loading ? "true" : undefined}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold text-base py-4 rounded-xl"
                >
                  {loading ? "Verifying..." : "Verify Aadhaar / आधार सत्यापित करें"}
                </Button>
              </>
            )}
          </div>
        </Card>
        <div className="mt-6 text-center text-gray-500 text-sm">
          {workerName && <>Welcome, <span className="font-bold">{workerName}</span></>}
        </div>
      </div>
    </div>
  );
};

export default AadhaarVerification;
