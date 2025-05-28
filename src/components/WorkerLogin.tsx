
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const WorkerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    password: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please enter both phone number and password.",
        variant: "destructive",
      });
      return;
    }

    // Simulate login (can be replaced with real authentication)
    localStorage.setItem("workerLoggedIn", "true");
    toast({
      title: "Login Successful",
      description: "Welcome, worker!",
    });
    navigate("/worker-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="w-full max-w-md">
        <Card className="p-8 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-amber-800 mb-2 text-center">Worker Login</h2>
          <p className="text-amber-600 text-center mb-6">कामगार लॉगिन</p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number / फोन नंबर
              </label>
              <Input
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password / पासवर्ड
              </label>
              <Input
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6 text-lg font-semibold rounded-xl mt-4"
            >
              Login / लॉगिन करें
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default WorkerLogin;
