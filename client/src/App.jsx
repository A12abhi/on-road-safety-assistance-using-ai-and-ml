import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import EmergencyPage from './pages/EmergencyPage';
import DrivingAnalysisPage from './pages/DrivingAnalysisPage';
import VehicleHealthPage from './pages/VehicleHealthPage';
import AudioDiagnosticsPage from './pages/AudioDiagnosticsPage';
import FuelPage from './pages/FuelPage';
import MechanicsPage from './pages/MechanicsPage';
import MapViewPage from './pages/MapViewPage';
import MaintenancePage from './pages/MaintenancePage';
import InsurancePage from './pages/InsurancePage';
import EmissionPage from './pages/EmissionPage';
import ChatbotPage from './pages/ChatbotPage';
import HistoryPage from './pages/HistoryPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route
      element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }
    >
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/driving-analysis" element={<DrivingAnalysisPage />} />
      <Route path="/vehicle-health" element={<VehicleHealthPage />} />
      <Route path="/audio-diagnostics" element={<AudioDiagnosticsPage />} />
      <Route path="/fuel" element={<FuelPage />} />
      <Route path="/mechanics" element={<MechanicsPage />} />
      <Route path="/map" element={<MapViewPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="/insurance" element={<InsurancePage />} />
      <Route path="/emission" element={<EmissionPage />} />
      <Route path="/chatbot" element={<ChatbotPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <AdminPage />
          </ProtectedRoute>
        }
      />
    </Route>

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
