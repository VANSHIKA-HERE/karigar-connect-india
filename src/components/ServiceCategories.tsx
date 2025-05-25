
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';

// Sub-service selection modal component
const SubServiceModal = ({
  subServices,
  show,
  onClose,
  onSelect,
  parentService,
}: {
  subServices: string[];
  show: boolean;
  onClose: () => void;
  onSelect: (subService: string) => void;
  parentService: string;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 shadow-xl w-80 relative">
        <button
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-lg mb-4 font-semibold text-amber-700">Choose a type of {parentService} work</h2>
        <div className="space-y-2">
          {subServices.map((sub, idx) => (
            <button
              key={idx}
              className="w-full py-2 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-left text-gray-800 font-medium border border-amber-100 transition"
              onClick={() => onSelect(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const services = [
  { 
    id: 'electrician', 
    name: 'Electrician', 
    hindi: 'इलेक्ट्रीशियन', 
    icon: '⚡',
    subServices: [
      'Light Fitting & Repairing',
      'Switch/Sockets',
      'Fan Installation',
      'TV Repair',
      'Appliance Repair',
      'Circuit Breaker / Fuse',
      'Geyser Installation',
      'Other'
    ]
  },
  { 
    id: 'plumber', 
    name: 'Plumber', 
    hindi: 'प्लंबर', 
    icon: '🔧',
    subServices: [
      'Tap Repair',
      'Leakage Repair',
      'Bathroom Fitting',
      'Blockage Removal',
      'Pipe Fitting',
      'Water Tank Cleaning',
      'Other'
    ]
  },
  { 
    id: 'carpenter', 
    name: 'Carpenter', 
    hindi: 'बढ़ई', 
    icon: '🔨',
    subServices: [
      'Furniture Assembly',
      'Door/Window Repair',
      'Custom Woodwork',
      'Kitchen Cabinets',
      'Locks & Hinges',
      'Other'
    ]
  },
  { 
    id: 'maid', 
    name: 'House Cleaning', 
    hindi: 'घर की सफाई', 
    icon: '🧹',
    subServices: [
      'General Cleaning',
      'Deep Cleaning',
      'Kitchen Cleaning',
      'Bathroom Cleaning',
      'Sofa/Carpet Cleaning',
      'Move-in/Move-out Cleaning',
      'Other'
    ]
  },
  { 
    id: 'mechanic', 
    name: 'Mechanic', 
    hindi: 'मैकेनिक', 
    icon: '🛠️',
    subServices: [
      'Bike Repair',
      'Car Service',
      'AC Service',
      'Refrigerator Repair',
      'Washing Machine Repair',
      'Other'
    ]
  },
  { 
    id: 'gardener', 
    name: 'Gardener', 
    hindi: 'माली', 
    icon: '🌱',
    subServices: [
      'Garden Maintenance',
      'Lawn Mowing',
      'Planting',
      'Hedge Trimming',
      'Other'
    ]
  },
  { 
    id: 'driver', 
    name: 'Driver', 
    hindi: 'ड्राइवर', 
    icon: '🚗',
    subServices: [
      'Chauffeur',
      'Outstation Trip',
      'Local Drop/Pickup',
      'School Pickup/Drop',
      'Other'
    ]
  },
  { 
    id: 'security', 
    name: 'Security Guard', 
    hindi: 'सिक्योरिटी गार्ड', 
    icon: '🛡️',
    subServices: [
      'Night Guard',
      'Event Security',
      'Resident Security',
      'Office Security',
      'Other'
    ]
  },
  { 
    id: 'labour', 
    name: 'Labour', 
    hindi: 'मजदूर', 
    icon: '👷',
    subServices: [
      'Loader',
      'Construction Labour',
      'House Shifting',
      'Painter',
      'Other'
    ]
  },
  { 
    id: 'ragman', 
    name: 'Waste Collector', 
    hindi: 'कचरा संग्रहकर्ता', 
    icon: '♻️',
    subServices: [
      'Daily Pickup',
      'Bulk Waste',
      'Electronic Waste',
      'Recycling',
      'Other'
    ]
  },
];

const ServiceCategories = () => {
  const navigate = useNavigate();
  const [modalInfo, setModalInfo] = useState<{show: boolean; subServices: string[]; parentService: string; parentServiceId: string}>({
    show: false,
    subServices: [],
    parentService: '',
    parentServiceId: ''
  });

  const handleServiceSelect = (serviceId: string, serviceName: string, subServices: string[]) => {
    if (subServices && subServices.length > 0) {
      setModalInfo({
        show: true,
        subServices,
        parentService: serviceName,
        parentServiceId: serviceId,
      });
    } else {
      // If no sub-services, navigate directly
      navigate(`/map/${serviceId}`);
    }
  };

  const handleSubServiceSelect = (subService: string) => {
    // Navigate to map page with sub-service as search param
    navigate(`/map/${modalInfo.parentServiceId}?subservice=${encodeURIComponent(subService)}`);
    setModalInfo({ ...modalInfo, show: false });
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
              onClick={() => handleServiceSelect(service.id, service.name, service.subServices ?? [])}
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

      <SubServiceModal
        subServices={modalInfo.subServices}
        show={modalInfo.show}
        onClose={() => setModalInfo({ ...modalInfo, show: false })}
        onSelect={handleSubServiceSelect}
        parentService={modalInfo.parentService}
      />
    </div>
  );
};

export default ServiceCategories;

