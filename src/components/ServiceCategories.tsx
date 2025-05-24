
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const services = [
  { id: 'electrician', name: 'Electrician', hindi: 'इलेक्ट्रीशियन', icon: '⚡' },
  { id: 'plumber', name: 'Plumber', hindi: 'प्लंबर', icon: '🔧' },
  { id: 'carpenter', name: 'Carpenter', hindi: 'बढ़ई', icon: '🔨' },
  { id: 'maid', name: 'House Cleaning', hindi: 'घर की सफाई', icon: '🧹' },
  { id: 'mechanic', name: 'Mechanic', hindi: 'मैकेनिक', icon: '🛠️' },
  { id: 'gardener', name: 'Gardener', hindi: 'माली', icon: '🌱' },
  { id: 'driver', name: 'Driver', hindi: 'ड्राइवर', icon: '🚗' },
  { id: 'security', name: 'Security Guard', hindi: 'सिक्योरिटी गार्ड', icon: '🛡️' },
  { id: 'labour', name: 'Labour', hindi: 'मजदूर', icon: '👷' },
  { id: 'ragman', name: 'Waste Collector', hindi: 'कचरा संग्रहकर्ता', icon: '♻️' },
];

const ServiceCategories = () => {
  const navigate = useNavigate();

  const handleServiceSelect = (serviceId: string) => {
    navigate(`/map/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-2">Select Service</h1>
          <p className="text-amber-600">सेवा चुनें</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-white border-gray-200 hover:bg-amber-50"
              onClick={() => handleServiceSelect(service.id)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-600">{service.hindi}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Can't find what you're looking for?<br />
            Contact support for more services
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCategories;
