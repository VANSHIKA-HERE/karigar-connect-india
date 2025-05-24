
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const languages = [
  { code: 'hi', name: 'हिंदी', english: 'Hindi' },
  { code: 'en', name: 'English', english: 'English' },
  { code: 'bn', name: 'বাংলা', english: 'Bengali' },
  { code: 'te', name: 'తెలుగు', english: 'Telugu' },
  { code: 'mr', name: 'मराठी', english: 'Marathi' },
  { code: 'ta', name: 'தமிழ்', english: 'Tamil' },
  { code: 'gu', name: 'ગુજરાતી', english: 'Gujarati' },
  { code: 'kn', name: 'ಕನ್ನಡ', english: 'Kannada' },
  { code: 'ml', name: 'മലയാളം', english: 'Malayalam' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', english: 'Punjabi' },
];

const LanguageSelection = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('hi');
  const navigate = useNavigate();

  const handleContinue = () => {
    localStorage.setItem('selectedLanguage', selectedLanguage);
    navigate('/user-type');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-md mx-auto pt-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Choose Your Language</h1>
          <p className="text-amber-600">अपनी भाषा चुनें</p>
        </div>

        <div className="space-y-3 mb-8">
          {languages.map((lang) => (
            <Card
              key={lang.code}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedLanguage === lang.code
                  ? 'bg-amber-100 border-amber-500 border-2'
                  : 'bg-white border-gray-200 hover:bg-amber-50'
              }`}
              onClick={() => setSelectedLanguage(lang.code)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{lang.name}</p>
                  <p className="text-sm text-gray-600">{lang.english}</p>
                </div>
                {selectedLanguage === lang.code && (
                  <Check className="w-6 h-6 text-amber-600" />
                )}
              </div>
            </Card>
          ))}
        </div>

        <Button
          onClick={handleContinue}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-semibold rounded-xl"
        >
          Continue / जारी रखें
        </Button>
      </div>
    </div>
  );
};

export default LanguageSelection;
