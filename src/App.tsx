
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NotificationProvider } from "./contexts/NotificationContext";
import SplashScreen from "./components/SplashScreen";
import LanguageSelection from "./components/LanguageSelection";
import UserTypeSelection from "./components/UserTypeSelection";
import AuthScreen from "./components/AuthScreen";
import ServiceCategories from "./components/ServiceCategories";
import WorkerMap from "./components/WorkerMap";
import WorkerProfile from "./components/WorkerProfile";
import BookingScreen from "./components/BookingScreen";
import TrackingScreen from "./components/TrackingScreen";
import NotFound from "./pages/NotFound";
import WorkerDashboard from "./components/WorkerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <NotificationProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/language" element={<LanguageSelection />} />
            <Route path="/user-type" element={<UserTypeSelection />} />
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/services" element={<ServiceCategories />} />
            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
            <Route path="/map/:category" element={<WorkerMap />} />
            <Route path="/worker/:id" element={<WorkerProfile />} />
            <Route path="/booking/:workerId" element={<BookingScreen />} />
            <Route path="/tracking/:bookingId" element={<TrackingScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
