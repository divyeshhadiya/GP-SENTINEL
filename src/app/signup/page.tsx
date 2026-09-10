"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import PoliceLogo from "@/components/common/PoliceLogo";
import { User, Mail, Lock, Eye, EyeOff, UserPlus, Check, Shield } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("DPIIT Recognized Startup");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please verify.");
      return;
    }

    login({
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: fullName || "Registered Officer",
      badgeId: `GP-OFF-${Date.now().toString().slice(-4)}`,
      rank: role,
      department: "Gujarat Police State Command",
      role: "SP_COMMAND",
      email: email || "officer@sentinel.gov.in"
    });
    router.push("/");
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center p-3 sm:p-6">
      <div className="max-w-5xl w-full bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 transition-all">
        {/* Left Column: Official Gujarat Police Portal Sidebar */}
        <div className="md:col-span-4 bg-[#002347] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            {/* Gujarat Police Official Badge */}
            <div className="flex items-center space-x-3">
              <PoliceLogo size={50} />
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Officer Access<br />
                Registration
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed font-normal">
                Register for authorized law enforcement credentials and multi-department SCRB system access.
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
                <span className="font-medium">SCRB Authorized Access</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium">Multi-Department Video Feeds</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="font-medium">Official Mobile & Email OTP</span>
              </div>
            </div>
          </div>

          {/* Bottom Official Government Accreditation */}
          <div className="mt-8 pt-5 border-t border-white/10 relative z-10 flex items-center space-x-2 text-xs text-slate-300">
            <Shield className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-[11px] text-slate-300 tracking-wide font-medium">
              Home Department • Government of Gujarat
            </span>
          </div>
        </div>

        {/* Right Column: Registration Form */}
        <div className="md:col-span-8 bg-white dark:bg-slate-900 p-7 sm:p-9 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                Create Officer Profile
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1.5">
                Fill in the details below to request authorized terminal access
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex rounded-lg border border-slate-300 dark:border-slate-700 overflow-hidden focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-transparent">
                    <span className="inline-flex items-center px-3.5 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-r border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="10-digit mobile"
                      required
                      className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Register As */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Register As <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all cursor-pointer"
                  >
                    <option value="Student / Academic Team">— Student / Academic Team —</option>
                    <option value="DPIIT Recognized Startup">DPIIT Recognized Startup</option>
                    <option value="Registered IT / AI Enterprise">Registered IT / AI Enterprise</option>
                    <option value="Law Enforcement Tech Partner">Law Enforcement Tech Partner</option>
                    <option value="Individual Security Researcher">Individual Security Researcher</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      required
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#002347] hover:bg-[#001830] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 text-sm mt-5"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register &amp; Get OTP</span>
              </button>
            </form>

            {/* Bottom link */}
            <div className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 pt-3">
              Already registered?{" "}
              <Link href="/login" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
                Login to your account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
