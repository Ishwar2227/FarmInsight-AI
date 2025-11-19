import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import Home from './pages/Home';
import WeatherDashboard from './pages/WeatherDashboard';
import CropAdvisory from './pages/CropAdvisory';
import PestDetection from './pages/PestDetection';
import IrrigationGuidance from './pages/IrrigationGuidance';
import MarketPrices from './pages/MarketPrices';
import FertilizerRecommendations from './pages/FertilizerRecommendations';
import AlertsNotifications from './pages/AlertsNotifications';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FarmerProfile from './pages/FarmerProfile';
import { useAuth } from './context/AuthContext';

function App() {
  const { initializing } = useAuth();

  if (initializing) return <Loader />;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Navbar />
      <main className="mx-auto w-full flex-1 max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute>
                <WeatherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/advisory"
            element={
              <ProtectedRoute>
                <CropAdvisory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pest-detection"
            element={
              <ProtectedRoute>
                <PestDetection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/irrigation"
            element={
              <ProtectedRoute>
                <IrrigationGuidance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/market"
            element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fertilizer"
            element={
              <ProtectedRoute>
                <FertilizerRecommendations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <AlertsNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <FarmerProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
