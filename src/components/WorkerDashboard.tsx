
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Bell, Settings, Star, Clock, MapPin, Phone, Check, X } from 'lucide-react';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requests');
  const [isOnline, setIsOnline] = useState(true);

  const jobRequests = [
    {
      id: '1',
      customer: 'Priya Sharma',
      service: 'Electrician',
      location: 'Sector 15, Noida',
      distance: '2.3 km',
      price: 650,
      urgency: 'urgent',
      description: 'Fix ceiling fan and 2 switches',
      timeAgo: '5 min ago'
    },
    {
      id: '2',
      customer: 'Raj Kumar',
      service: 'Electrician',
      location: 'Greater Kailash, Delhi',
      distance: '4.1 km',
      price: 450,
      urgency: 'normal',
      description: 'Install new electrical outlet',
      timeAgo: '12 min ago'
    }
  ];

  const activeJobs = [
    {
      id: '3',
      customer: 'Amit Singh',
      service: 'Electrician',
      location: 'Vasant Vihar, Delhi',
      status: 'on_way',
      price: 800,
      customerPhone: '+91 9876543210'
    }
  ];

  const handleAcceptJob = (jobId: string) => {
    toast({
      title: "Job Accepted!",
      description: "Customer has been notified. Start heading to location.",
    });
  };

  const handleRejectJob = (jobId: string) => {
    toast({
      title: "Job Declined",
      description: "Request has been declined.",
    });
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast({
      title: isOnline ? "Going Offline" : "Going Online",
      description: isOnline ? "You won't receive new job requests" : "You can now receive job requests",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-amber-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">राजेश कुमार</h1>
            <p className="text-amber-100 text-sm">Electrician • ⭐ 4.8</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={toggleOnlineStatus}
              variant={isOnline ? "secondary" : "outline"}
              size="sm"
              className={isOnline ? "bg-green-500 hover:bg-green-600 text-white" : "border-white text-white hover:bg-white hover:text-amber-600"}
            >
              {isOnline ? "Online" : "Offline"}
            </Button>
            <Bell className="w-6 h-6" />
            <Settings className="w-6 h-6" onClick={() => navigate('/worker-profile')} />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex">
          {[
            { key: 'requests', label: 'Requests', hindi: 'अनुरोध' },
            { key: 'active', label: 'Active Jobs', hindi: 'सक्रिय काम' },
            { key: 'earnings', label: 'Earnings', hindi: 'कमाई' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 px-4 text-center border-b-2 ${
                activeTab === tab.key
                  ? 'border-amber-600 text-amber-600 bg-amber-50'
                  : 'border-transparent text-gray-600'
              }`}
            >
              <div className="font-medium">{tab.label}</div>
              <div className="text-xs text-gray-500">{tab.hindi}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {/* Job Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">New Job Requests</h2>
              <Badge variant="secondary">{jobRequests.length} pending</Badge>
            </div>
            
            {jobRequests.map((request) => (
              <Card key={request.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{request.customer}</h3>
                    <p className="text-sm text-gray-600">{request.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">₹{request.price}</p>
                    <Badge variant={request.urgency === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">
                      {request.urgency === 'urgent' ? 'Urgent' : 'Normal'}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {request.location} • {request.distance}
                  </div>
                  <p className="text-sm text-gray-700">{request.description}</p>
                  <p className="text-xs text-gray-500">{request.timeAgo}</p>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={() => handleAcceptJob(request.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleRejectJob(request.id)}
                    variant="outline"
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Decline
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Active Jobs Tab */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Current Jobs</h2>
            
            {activeJobs.map((job) => (
              <Card key={job.id} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800">{job.customer}</h3>
                    <p className="text-sm text-gray-600">{job.service}</p>
                  </div>
                  <Badge variant="default" className="bg-blue-600">
                    {job.status === 'on_way' ? 'On the way' : 'In Progress'}
                  </Badge>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {job.location}
                  </div>
                  <p className="font-medium text-green-600">₹{job.price}</p>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    onClick={() => window.location.href = `tel:${job.customerPhone}`}
                    variant="outline"
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button
                    onClick={() => navigate(`/tracking/${job.id}`)}
                    className="flex-1 bg-amber-600 hover:bg-amber-700"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Earnings Overview</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold text-green-600">₹3,240</p>
                <p className="text-sm text-gray-600">Today</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-2xl font-bold text-blue-600">₹18,650</p>
                <p className="text-sm text-gray-600">This Week</p>
              </Card>
            </div>
            
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Recent Completed Jobs</h3>
              <div className="space-y-3">
                {[
                  { customer: 'Sunita Devi', amount: 450, service: 'Fan repair', time: '2 hours ago' },
                  { customer: 'Rohit Sharma', amount: 650, service: 'Wiring work', time: '4 hours ago' },
                  { customer: 'Meera Singh', amount: 800, service: 'Switch installation', time: 'Yesterday' }
                ].map((job, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <div>
                      <p className="font-medium">{job.customer}</p>
                      <p className="text-sm text-gray-600">{job.service}</p>
                      <p className="text-xs text-gray-500">{job.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">₹{job.amount}</p>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-yellow-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboard;
