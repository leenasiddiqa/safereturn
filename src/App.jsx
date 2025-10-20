import { Routes, Route, Navigate } from "react-router-dom";
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

export default function App() {
  return (
    <div className="container">
      <NavBar />
      <main>
        <Routes>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} SafeReturn
      </footer>
    </div>
  );
}
