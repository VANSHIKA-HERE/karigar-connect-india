
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/language');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex flex-col items-center justify-center p-6">
      <div className="animate-pulse">
        <img 
          src="/lovable-uploads/b33ca17c-f744-41e9-bd50-250e417a8782.png" 
          alt="Karigar Logo" 
          className="w-48 h-48 object-contain mb-8"
        />
      </div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-800 mb-2">KARIGAR</h1>
        <p className="text-lg text-amber-600">Find Skilled Workers Near You</p>
        <div className="mt-8">
          <div className="w-12 h-1 bg-amber-500 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
