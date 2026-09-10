"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PoliceLogo from "@/components/common/PoliceLogo";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Check,
  ShieldCheck,
  Shield,
  Smartphone,
  KeyRound,
  X,
  Loader2,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, isAuthenticated } = useAuth();

  // Authentication method: "password" vs "otp"
  const [credentialMethod, setCredentialMethod] = useState<"password" | "otp">("password");

  // Form states
  const [email, setEmail] = useState("dgp.police@gujarat.gov.in");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP states
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpNotification, setOtpNotification] = useState<string | null>(null);

  // Interaction feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    if (otpTimer <= 0) return;
    const timer = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [otpTimer]);

  const handleSendOtp = () => {
    if (!email) {
      alert("Please enter your registered email address or mobile number.");
      return;
    }
    setOtpSent(true);
    setOtpTimer(30);
    setOtpNotification("OTP sent successfully to authorized terminal!");
  };

  const handleQuickFillOtp = () => {
    setOtpCode("9420");
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (credentialMethod === "otp") {
      if (!otpSent) {
        handleSendOtp();
        return;
      }
      if (!otpCode) {
        alert("Please enter the 4-digit or 6-digit OTP.");
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      // Authenticate as official DGP / Command officer
      login({
        id: "OFFICER-001",
        name: "Dr. Vikas Sahay, IPS",
        badgeId: "GP-DGP-01",
        rank: "Director General of Police (DGP)",
        department: "State Crime Record Bureau (SCRB), Gandhinagar",
        role: "DGP",
        email: email || "dgp.police@gujarat.gov.in"
      });
      setIsLoading(false);
      router.push("/");
    }, 500);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotSubmitted(true);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-3 sm:p-6">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 transition-all relative">
        
        {/* Left Column: Official Gujarat Police Portal Sidebar (Pixel-Matched to Reference) */}
        <div className="md:col-span-5 bg-[#002347] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            {/* Gujarat Police Official Badge */}
            <div className="flex items-center space-x-3">
              <PoliceLogo size={54} />
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Gujarat Police<br />
                SENTINEL Platform
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-normal">
                Sign in to access your dashboard, view live surveillance feeds, and manage field operations.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/15"></div>

            {/* Bullet Highlights */}
            <div className="space-y-3.5 text-xs sm:text-sm text-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium">OTP-verified secure login</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium">Track application status in real-time</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium">Role-based SCRB encrypted access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium">Real-time command feeds & dispatch</span>
              </div>
            </div>
          </div>

          {/* Bottom Official Government Accreditation */}
          <div className="mt-8 pt-5 border-t border-white/10 relative z-10 flex items-center space-x-2.5 text-xs text-slate-300">
            <Shield className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-[11px] text-slate-300 tracking-wide font-medium">
              Home Department • Government of Gujarat
            </span>
          </div>
        </div>

        {/* Right Column: Clean Login Form */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 p-7 sm:p-9 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Header Title */}
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Welcome Back
                </h2>
                <Link
                  href="/"
                  className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Dashboard View →
                </Link>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Currently Logged In Notice Banner (if applicable) */}
            {isAuthenticated && user && (
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-slate-700 dark:text-slate-300">
                    Active: <strong className="text-blue-700 dark:text-blue-300">{user.name}</strong>
                  </span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <Link
                    href="/"
                    className="px-2.5 py-1 bg-blue-600 text-white rounded font-bold text-[11px] hover:bg-blue-500"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/logout"
                    className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-[11px] hover:bg-slate-300"
                  >
                    Sign Out
                  </Link>
                </div>
              </div>
            )}

            {/* Auth Method Switch: Password vs OTP */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800/90 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <button
                type="button"
                onClick={() => setCredentialMethod("password")}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  credentialMethod === "password"
                    ? "bg-white dark:bg-slate-900 text-[#002347] dark:text-sky-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Password Auth</span>
              </button>
              <button
                type="button"
                onClick={() => setCredentialMethod("otp")}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  credentialMethod === "otp"
                    ? "bg-white dark:bg-slate-900 text-[#002347] dark:text-sky-400 shadow-sm border border-slate-200/80 dark:border-slate-700"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>OTP Fast Login</span>
              </button>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
              {/* Email Address / ID Field */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {credentialMethod === "password" ? "Email Address" : "Email or Registered Mobile"}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={credentialMethod === "password" ? "your@email.com" : "officer@gujarat.gov.in or 9876543210"}
                    className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Password Auth Fields */}
              {credentialMethod === "password" && (
                <>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm transition-all shadow-sm font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password Row */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-[#002347] focus:ring-blue-500 accent-[#002347]"
                      />
                      <span>Remember me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setForgotModalOpen(true);
                        setForgotSubmitted(false);
                        setForgotEmail(email);
                      }}
                      className="text-slate-600 dark:text-slate-400 hover:text-[#002347] dark:hover:text-blue-400 font-medium transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                </>
              )}

              {/* OTP Auth Fields */}
              {credentialMethod === "otp" && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      One-Time Password (OTP)
                    </label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <KeyRound className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          maxLength={6}
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          placeholder="Enter 4 or 6-digit OTP"
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpTimer > 0}
                        className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg text-xs font-semibold shrink-0 cursor-pointer shadow transition-all flex items-center space-x-1.5"
                      >
                        {otpTimer > 0 ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Resend ({otpTimer}s)</span>
                          </>
                        ) : (
                          <span>{otpSent ? "Resend OTP" : "Send OTP"}</span>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* OTP Notification / Auto-Fill Hint */}
                  {otpNotification && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs flex items-center justify-between animate-fadeIn">
                      <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span>{otpNotification}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleQuickFillOtp}
                        className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-mono font-bold text-[11px] transition-colors shrink-0 cursor-pointer shadow-sm ml-2"
                      >
                        Fill Demo OTP (9420)
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-[#002347] hover:bg-[#001830] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm cursor-pointer disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                    <span>
                      {credentialMethod === "password" ? "Verifying Credentials..." : "Validating OTP..."}
                    </span>
                  </>
                ) : (
                  <>
                    {credentialMethod === "password" ? (
                      <>
                        <LogIn className="w-4 h-4 stroke-[2.5]" />
                        <span>Login to Portal</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
                        <span>Verify OTP &amp; Enter Portal</span>
                      </>
                    )}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Security Notice */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center text-[11px] text-slate-400">
            🔒 State Crime Record Bureau (SCRB) • Authorized Law Enforcement Portal
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Officer Password Recovery
              </h3>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {!forgotSubmitted ? (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Enter your registered police email address. A one-time verification token will be dispatched to your authorized mobile device.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Registered Email
                  </label>
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="officer@police.gujarat.gov.in"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#002347] hover:bg-[#001830] text-white font-semibold rounded-lg text-xs transition-all cursor-pointer"
                >
                  Send Recovery Link
                </button>
              </form>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Recovery Request Submitted
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  A verification link has been sent to <strong>{forgotEmail}</strong>. Follow the instructions to reset your access code.
                </p>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-bold transition-all"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

