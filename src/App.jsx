<<<<<<< HEAD
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { StoreProvider } from "./StoreContext"; // ✅ ADD THIS IMPORT
=======
import { Routes, Route, Navigate } from "react-router-dom";
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
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

<<<<<<< HEAD
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
=======
export default function App() {
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
  return (
    <div className="container">
      <NavBar />
      <main>
        <Routes>
<<<<<<< HEAD
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
=======
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lost" element={<Lost />} />
          <Route path="/found" element={<Found />} />
          <Route path="/claim" element={<Claim />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/claims" element={<AdminClaims />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/history" element={<History />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/view" element={<Found />} />
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} SafeReturn
      </footer>
    </div>
  );
}
<<<<<<< HEAD

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider> {/* ✅ ADD StoreProvider HERE */}
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
}
=======
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
