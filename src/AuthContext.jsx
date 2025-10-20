import React, { createContext, useContext, useState } from "react";

// Demo: In-memory user store (replace with backend integration for production)
const demoUsers = [
  { id: 1, username: "admin", password: "admin123", role: "admin" },
  { id: 2, username: "user", password: "user123", role: "user" },
];

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

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
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
