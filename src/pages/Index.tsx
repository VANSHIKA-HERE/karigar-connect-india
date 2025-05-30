
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    // Redirect to splash screen on app load
    navigate('/');
  }, [navigate]);

  return null;
};

export default Index;
