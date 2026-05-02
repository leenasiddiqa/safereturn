import { Routes, Route, Navigate, useLocation,Link,useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext";
import { StoreProvider } from "./StoreContext"; 
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
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminContacts from "./pages/admin/AdminContacts";
//  Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth(); 
  const location = useLocation();


  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  //  PUBLIC ROUTES - No login required
  const publicRoutes = ['/', '/login', '/signup', '/about'];
  
  // if it is publicRoutes, then allow wothout login
  if (publicRoutes.includes(location.pathname)) {
    return children;
  }

  // if user is not logged in then redirect to login page
  if (!user) {
    console.log("🚫 No user found, redirecting to login");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // if logged in then allow access
  return children;
};
const hideFooterRoutes = ['/', '/login', '/signup', '/about'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname) && !isAdminRoute;
function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideFooterRoutes = ['/', '/login', '/signup', '/about'];
  const isAdminRoute = location.pathname.startsWith('/admin');
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname) && !isAdminRoute;
  return (
    <div className="container">
      <NavBar />
      <main className="main-content">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          {/* Protected routes (require login) */}
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
          <Route path="/admin/feedback" element={
  <ProtectedRoute>
    <AdminFeedback />
  </ProtectedRoute>
  
} />
<Route path="/admin/contacts" element={
  <ProtectedRoute>
    <AdminContacts />
  </ProtectedRoute>
} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {shouldShowFooter && (
        <footer style={{ background: "#011838", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "40px 5vw 25px", width: "100%", marginTop: "auto" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "32px", marginBottom: "36px" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#E68A62,#c96d44)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🎒</div>
                  <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>SafeReturn</span>
                </div>
                <p style={{ color: "#5a7a9a", fontSize: 13, lineHeight: 1.65, maxWidth: 250 }}>
                  Making lost and found management simple and effective for university communities.
                </p>
              </div>

              <div>
                <h4 style={{ color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Quick Links</h4>
                <Link to="/lost" style={{ color: "#5a7a9a", fontSize: 14, textDecoration: "none", display: "block", marginBottom: 10 }}>Report Lost</Link>
                <Link to="/found" style={{ color: "#5a7a9a", fontSize: 14, textDecoration: "none", display: "block", marginBottom: 10 }}>Report Found</Link>
                <Link to="/matches" style={{ color: "#5a7a9a", fontSize: 14, textDecoration: "none", display: "block", marginBottom: 10 }}>Matched Items</Link>
              </div>

              <div>
                <h4 style={{ color: "#fff", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Platform</h4>
                <span onClick={() => navigate("/about")} style={{ color: "#5a7a9a", fontSize: 14, display: "block", marginBottom: 10, cursor: "pointer" }}>About Us</span>
                <span onClick={() => navigate("/contact")} style={{ color: "#5a7a9a", fontSize: 14, display: "block", marginBottom: 10, cursor: "pointer" }}>Contact Us</span>
                <span onClick={() => navigate("/feedback")} style={{ color: "#5a7a9a", fontSize: 14, display: "block", marginBottom: 10, cursor: "pointer" }}>Feedback</span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 18, textAlign: "center" }}>
              <p style={{ color: "#5a7a9a", fontSize: 15 }}>© {new Date().getFullYear()} SafeReturn — University Campus</p>
            </div>
          </div>
        </footer>
      )}
        
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider> 
        <AppContent />
      </StoreProvider>
    </AuthProvider>
  );
}