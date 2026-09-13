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
  isAuthLoading: boolean;
}

export const defaultAdminUser: UserProfile = {
  id: "OFFICER-001",
  name: "Dr. Vikas Sahay, IPS",
  badgeId: "GP-DGP-01",
  rank: "Director General of Police (DGP)",
  department: "State Crime Record Bureau (SCRB), Gandhinagar",
  role: "DGP",
  email: "dgp.police@gujarat.gov.in"
};

export const demoOfficerAccounts: UserProfile[] = [
  defaultAdminUser,
  {
    id: "OFFICER-002",
    name: "Shri Ajay Choudhary, IPS",
    badgeId: "GP-SP-04",
    rank: "Superintendent of Police (Command)",
    department: "Ahmedabad City Police Headquarters",
    role: "SP_COMMAND",
    email: "sp.command@gujarat.gov.in"
  },
  {
    id: "OFFICER-003",
    name: "Inspector R.K. Vaghela",
    badgeId: "GP-TI-12",
    rank: "Police Inspector (Traffic & ANPR)",
    department: "Surat City Traffic Netram",
    role: "TRAFFIC_INSPECTOR",
    email: "traffic.surat@gujarat.gov.in"
  }
];

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
  isAuthLoading: true
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sentinel_user");
      const hasCookie = typeof document !== "undefined" && document.cookie.includes("sentinel_auth=1");
      if (saved && hasCookie) {
        setUser(JSON.parse(saved));
      } else {
        setUser(null);
        localStorage.removeItem("sentinel_user");
      }
    } catch (e) {
      console.warn("Failed to parse saved session", e);
      setUser(null);
    } finally {
      setIsAuthLoading(false);
    }
  }, []);

  const login = (profile: UserProfile) => {
    setUser(profile);
    localStorage.setItem("sentinel_user", JSON.stringify(profile));
    if (typeof document !== "undefined") {
      document.cookie = "sentinel_auth=1; path=/; max-age=86400; SameSite=Lax";
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sentinel_user");
    if (typeof document !== "undefined") {
      document.cookie = "sentinel_auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
