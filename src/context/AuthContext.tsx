"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  id: string;
  name: string;
  badgeId: string;
  rank: string;
  department: string;
  role: "DGP" | "SP_COMMAND" | "TRAFFIC_INSPECTOR" | "RTO_OFFICER" | "ADMIN";
  email: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const defaultAdminUser: UserProfile = {
  id: "OFFICER-001",
  name: "Dr. Vikas Sahay, IPS",
  badgeId: "GP-DGP-01",
  rank: "Director General of Police (DGP)",
  department: "State Crime Record Bureau (SCRB), Gandhinagar",
  role: "DGP",
  email: "dgp.police@gujarat.gov.in"
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("sentinel_user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(defaultAdminUser);
      }
    } else {
      // Default to logged-in DGP for seamless demo testing
      setUser(defaultAdminUser);
      localStorage.setItem("sentinel_user", JSON.stringify(defaultAdminUser));
    }
  }, []);

  const login = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem("sentinel_user", JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sentinel_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
