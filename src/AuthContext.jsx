import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ ADD loading state

  // ✅ Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    console.log("🔄 Loading user from localStorage:", savedUser);
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        console.log("✅ User loaded successfully:", userData);
      } catch (error) {
        console.error("❌ Error parsing saved user:", error);
        localStorage.removeItem('user'); // Clear corrupted data
      }
    }
    setLoading(false);
  }, []);

  async function login(username, password) {
    try {
      console.log("🔄 Login attempt for:", username);
      
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("📨 Login response:", data);
      
      if (data.success) {
        // ✅ PROPERLY SAVE USER DATA
        const userData = {
          id: data.user.id,
          username: data.user.username,
          name: data.user.name,
          role: data.user.role,
          sapid: data.user.sapid,
          cnic: data.user.cnic,
          phone: data.user.phone
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        console.log("✅ User saved to localStorage:", userData);
        
        return { success: true, user: userData };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("❌ Login error:", error);
      return { success: false, message: "Server connection failed!" };
    }
  }

  async function signup(sapid, username, password, name, cnic, phone) {
    try {
      console.log("📤 AUTH CONTEXT DATA:", { sapid, username, name, cnic, phone });
      
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sapid: sapid,
          username: username,
          password: password, 
          name: name,
          cnic: cnic,
          phone: phone,
        }),
      });

      const data = await response.json();
      console.log("📨 Signup response:", data);
      
      if (data.success) {
        const userData = {
          id: data.user.id,
          username: data.user.username,
          name: data.user.name,
          role: data.user.role,
          sapid: data.user.sapid,
          cnic: data.user.cnic,
          phone: data.user.phone
        };
        
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return { success: true, user: userData };
      }
      
      return data;
    } catch (error) {
      console.error("❌ Signup error:", error);
      return { success: false, message: "Server connection failed!" };
    }
  }

  function logout() {
    console.log("🚪 Logging out user...");
    setUser(null);
    localStorage.removeItem('user');
    console.log("✅ User logged out and removed from localStorage");
  }

  // ✅ Return loading state in context value
  const value = {
    user,
    login,
    signup,
    logout,
    loading // ✅ ADD loading to context
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}