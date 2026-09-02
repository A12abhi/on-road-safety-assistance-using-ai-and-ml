import { Navigate, Route, Routes } from 'react-router-dom';
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
import MapPage from './pages/MapPage';
import MaintenancePage from './pages/MaintenancePage';
import InsurancePage from './pages/InsurancePage';
import EmissionPage from './pages/EmissionPage';
import ChatbotPage from './pages/ChatbotPage';
import HistoryPage from './pages/HistoryPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    <Route path="/emergency" element={<ProtectedRoute><EmergencyPage /></ProtectedRoute>} />
    <Route path="/driving-analysis" element={<ProtectedRoute><DrivingAnalysisPage /></ProtectedRoute>} />
    <Route path="/vehicle-health" element={<ProtectedRoute><VehicleHealthPage /></ProtectedRoute>} />
    <Route path="/audio-diagnostics" element={<ProtectedRoute><AudioDiagnosticsPage /></ProtectedRoute>} />
    <Route path="/fuel" element={<ProtectedRoute><FuelPage /></ProtectedRoute>} />
    <Route path="/mechanics" element={<ProtectedRoute><MechanicsPage /></ProtectedRoute>} />
    <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
    <Route path="/maintenance" element={<ProtectedRoute><MaintenancePage /></ProtectedRoute>} />
    <Route path="/insurance" element={<ProtectedRoute><InsurancePage /></ProtectedRoute>} />
    <Route path="/emission" element={<ProtectedRoute><EmissionPage /></ProtectedRoute>} />
    <Route path="/chatbot" element={<ProtectedRoute><ChatbotPage /></ProtectedRoute>} />
    <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
    <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminPage /></ProtectedRoute>} />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default App;
