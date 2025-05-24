import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, User, Star } from 'lucide-react';
import SearchBar from './SearchBar';

// Mock worker data
const mockWorkers = [
  {
    id: '1',
    name: 'राजेश कुमार',
    rating: 4.8,
    experience: '5 years',
    location: { lat: 28.6139, lng: 77.2090 },
    skills: ['Electrical Wiring', 'Appliance Repair'],
    price: '₹300/hour',
    distance: '0.5 km'
  },
  {
    id: '2',
    name: 'सुनील शर्मा',
    rating: 4.6,
    experience: '3 years',
    location: { lat: 28.6129, lng: 77.2080 },
    skills: ['House Wiring', 'Motor Repair'],
    price: '₹250/hour',
    distance: '0.8 km'
  },
  {
    id: '3',
    name: 'विकास यादव',
    rating: 4.9,
    experience: '7 years',
    location: { lat: 28.6149, lng: 77.2100 },
    skills: ['Industrial Wiring', 'Panel Installation'],
    price: '₹400/hour',
    distance: '1.2 km'
  }
];

const WorkerMap = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const mapContainer = useRef<HTMLDivElement>(null);
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredWorkers, setFilteredWorkers] = useState(mockWorkers);

  useEffect(() => {
    // In a real app, you would initialize Google Maps here
    // For demo purposes, we'll show a placeholder
    console.log('Map would be initialized here for category:', category);
  }, [category]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredWorkers(mockWorkers);
      return;
    }

    const filtered = mockWorkers.filter(worker => {
      const query = searchQuery.toLowerCase();
      return (
        worker.name.toLowerCase().includes(query) ||
        worker.skills.some(skill => skill.toLowerCase().includes(query)) ||
        worker.experience.toLowerCase().includes(query)
      );
    });

    setFilteredWorkers(filtered);
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleWorkerSelect = (workerId: string) => {
    navigate(`/worker/${workerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
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
          <h1 className="text-lg font-semibold capitalize">{category} Near You</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 bg-white border-b">
        <SearchBar
          onSearch={handleSearch}
          placeholder={`Search ${category} by name or skills...`}
        />
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-green-100">
        <div
          ref={mapContainer}
          className="w-full h-full bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center"
        >
          <div className="text-center text-green-800">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="font-semibold">Google Maps Integration</p>
            <p className="text-sm">Workers will be shown here</p>
          </div>
        </div>
        
        {/* Map Markers Simulation */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
          1
        </div>
        <div className="absolute top-32 left-32 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
          2
        </div>
        <div className="absolute top-28 left-48 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
          3
        </div>
      </div>

      {/* Worker List */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {searchQuery ? `Search Results (${filteredWorkers.length})` : `Available Workers (${filteredWorkers.length})`}
          </h2>
          {searchQuery && (
            <p className="text-sm text-gray-500">
              Searching for: "{searchQuery}"
            </p>
          )}
        </div>
        
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No workers found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your search terms
            </p>
          </div>
        ) : (
          filteredWorkers.map((worker) => (
            <Card
              key={worker.id}
              className="p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-amber-50"
              onClick={() => handleWorkerSelect(worker.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-amber-700" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{worker.name}</h3>
                    <span className="text-sm font-medium text-amber-600">{worker.price}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{worker.rating}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{worker.experience}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{worker.distance}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {worker.skills.slice(0, 2).map((skill, index) => (
                      <span
                        key={index}
                        className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <ArrowUp className="w-5 h-5 text-gray-400 rotate-45" />
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkerMap;
