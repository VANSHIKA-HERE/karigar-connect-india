import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, UserCheck } from 'lucide-react';

const UserTypeSelection = () => {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (userType) {
      localStorage.setItem('userType', userType);
      if (userType === 'worker') {
        navigate('/worker-dashboard');
      } else {
        navigate('/auth');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">I am here to...</h1>
          <p className="text-amber-600">मैं यहाँ हूँ...</p>
        </div>

        <div className="space-y-6 mb-12">
          <Card
            className={`p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              userType === 'customer'
                ? 'bg-amber-100 border-amber-500 border-2 shadow-lg'
                : 'bg-white border-gray-200 hover:bg-amber-50'
            }`}
            onClick={() => setUserType('customer')}
          >
            <div className="text-center">
              <User className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Find Workers</h3>
              <p className="text-gray-600">कामगार खोजें</p>
              <p className="text-sm text-gray-500 mt-2">I need help with services</p>
            </div>
          </Card>

          <Card
            className={`p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
              userType === 'worker'
                ? 'bg-amber-100 border-amber-500 border-2 shadow-lg'
                : 'bg-white border-gray-200 hover:bg-amber-50'
            }`}
            onClick={() => setUserType('worker')}
          >
            <div className="text-center">
              <UserCheck className="w-16 h-16 text-amber-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Looking for Work</h3>
              <p className="text-gray-600">काम की तलाश में</p>
              <p className="text-sm text-gray-500 mt-2">I want to offer my services</p>
            </div>
          </Card>
        </div>

        <Button
          onClick={handleContinue}
          disabled={!userType}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 text-white py-6 text-lg font-semibold rounded-xl"
        >
          Continue / जारी रखें
        </Button>
      </div>
    </div>
  );
};

export default UserTypeSelection;
