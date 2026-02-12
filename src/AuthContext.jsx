<<<<<<< HEAD
import React, { createContext, useContext, useState, useEffect } from "react";
=======
import React, { createContext, useContext, useState } from "react";

// Demo: In-memory user store (replace with backend integration for production)
const demoUsers = [
  { id: 1, username: "admin", password: "admin123", role: "admin" },
  { id: 2, username: "user", password: "user123", role: "user" },
];
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
<<<<<<< HEAD
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
=======

  function login(username, password) {
    const found = demoUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ id: found.id, username: found.username, role: found.role });
      return { success: true };
    }
    return { success: false, message: "Invalid credentials" };
  }

  function signup(username, password, name, cnic, phone) {
    if (demoUsers.find((u) => u.username === username)) {
      return { success: false, message: "Username already exists" };
    }
    const newUser = {
      id: demoUsers.length + 1,
      username,
      password,
      name,
      cnic,
      phone,
      role: "user",
    };
    demoUsers.push(newUser);
    setUser({
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
      cnic: newUser.cnic,
      phone: newUser.phone,
      role: newUser.role,
    });
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
<<<<<<< HEAD
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
=======
  return useContext(AuthContext);
}
>>>>>>> b56f2b7001a859163ea53d10d9995b034e4f39a4
