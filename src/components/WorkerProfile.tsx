
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, User, MapIcon, Check } from 'lucide-react';

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock worker data - in real app, fetch based on id
  const worker = {
    id: id,
    name: 'राजेश कुमार',
    rating: 4.8,
    totalReviews: 156,
    experience: '5 years',
    skills: ['Electrical Wiring', 'Appliance Repair', 'Motor Installation', 'Panel Setup'],
    price: '₹300/hour',
    distance: '0.5 km',
    verified: true,
    completedJobs: 234,
    languages: ['Hindi', 'English'],
    availability: 'Available Now',
    reviews: [
      { name: 'अमित शर्मा', rating: 5, comment: 'बहुत अच्छा काम किया। समय पर आए और काम भी बेहतरीन।' },
      { name: 'प्रिया गुप्ता', rating: 4, comment: 'Good work quality. Professional approach.' },
      { name: 'रमेश कुमार', rating: 5, comment: 'Excellent service. Highly recommended!' }
    ]
  };

  const handleBookNow = () => {
    navigate(`/booking/${worker.id}`);
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
          <h1 className="text-lg font-semibold">Worker Profile</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 bg-amber-200 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-amber-700" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-xl font-bold text-gray-800">{worker.name}</h2>
                {worker.verified && (
                  <Check className="w-5 h-5 text-green-500 bg-green-100 rounded-full p-1" />
                )}
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{worker.rating}</span>
                <span className="text-gray-500">({worker.totalReviews} reviews)</span>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <MapIcon className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">{worker.distance} away</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span>{worker.experience} experience</span>
                <span>•</span>
                <span>{worker.completedJobs} jobs completed</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Pricing & Availability */}
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Pricing</h3>
              <p className="text-2xl font-bold text-amber-600">{worker.price}</p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-gray-800">Status</h3>
              <p className="text-green-600 font-medium">{worker.availability}</p>
            </div>
          </div>
        </Card>

        {/* Skills */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Skills & Services</h3>
          <div className="flex flex-wrap gap-2">
            {worker.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>

        {/* Languages */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Languages</h3>
          <p className="text-gray-600">{worker.languages.join(', ')}</p>
        </Card>

        {/* Reviews */}
        <Card className="p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Recent Reviews</h3>
          <div className="space-y-4">
            {worker.reviews.slice(0, 3).map((review, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="font-medium text-gray-800">{review.name}</span>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Book Now Button */}
        <div className="fixed bottom-6 left-6 right-6">
          <Button
            onClick={handleBookNow}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg"
          >
            Book Now / अभी बुक करें
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
