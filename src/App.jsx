import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { StoreProvider } from "./StoreContext"; // ✅ ADD THIS IMPORT
import NavBar from "./components/NavBar";
import Home from "./pages/user/Home";
import Landing from "./pages/user/Landing";
import Lost from "./pages/user/Lost";
import Found from "./pages/user/Found";
import Claim from "./pages/user/Claim";
import AdminClaims from "./pages/admin/AdminClaims";
import Donation from "./pages/admin/Donation";
import Login from "./pages/user/Login";
import Signup from "./pages/user/Signup";
import About from "./pages/user/About";
import Contact from "./pages/user/Contact";
import ProfilePage from "./pages/user/ProfilePage";
import History from "./pages/user/History";
import Feedback from "./pages/user/Feedback";
import Matches from "./pages/user/Matches";
import Notifications from "./pages/user/Notifications";
import Admin from "./pages/admin/Admin";

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); // ✅ ADD loading
  const location = useLocation();

  // ✅ Agar still loading hai, to loading show karo
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // ✅ PUBLIC ROUTES - No login required
  const publicRoutes = ['/', '/login', '/signup', '/about'];
  
  // ✅ Agar route public hai, allow without login
  if (publicRoutes.includes(location.pathname)) {
    return children;
  }

  // ✅ Agar user logged in nahi hai to login par redirect karo
  if (!user) {
    console.log("🚫 No user found, redirecting to login");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ✅ User logged in hai, allow access
  return children;
};

function AppContent() {
  return (
    <div className="container">
      <NavBar />
      <main>
        <Routes>
          {/* ✅ Public routes (without protection) */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          {/* ✅ Protected routes (require login) */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/lost" element={
            <ProtectedRoute>
              <Lost />
            </ProtectedRoute>
          } />
          <Route path="/found" element={
            <ProtectedRoute>
              <Found />
            </ProtectedRoute>
          } />
          <Route path="/claim" element={
            <ProtectedRoute>
              <Claim />
            </ProtectedRoute>
          } />
          <Route path="/admin/donation" element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/admin/claims" element={
            <ProtectedRoute>
              <AdminClaims />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          } />
          <Route path="/feedback" element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          } />
          <Route path="/matches" element={
            <ProtectedRoute>
              <Matches />
            </ProtectedRoute>
          } />
          <Route path="/history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/view" element={
            <ProtectedRoute>
              <Found />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider> {/* ✅ ADD StoreProvider HERE */}
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
}