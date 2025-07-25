"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // email or mobile
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState("");
  const [toasterType, setToasterType] = useState("success");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [identifierError, setIdentifierError] = useState("");
  const [identifierStatus, setIdentifierStatus] = useState(""); // '', 'exists', 'not-exist'
  const [identifierStatusMsg, setIdentifierStatusMsg] = useState("");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isLoggedIn") &&
      localStorage.getItem("isOtpVerified")
    ) {
      window.location.replace("/dashboard");
    }
  }, []);

  const showToast = (msg, type) => {
    setToasterMsg(msg);
    setToasterType(type);
    setShowToaster(true);
    setTimeout(() => setShowToaster(false), 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIdentifierError("");
    let payload = {};
    if (/^\d{10}$/.test(identifier)) {
      payload.mobile = identifier;
    } else {
      payload.email = identifier;
    }
    payload.password = password;
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setUserId(data.userId);
        setShowOtp(true);
        showToast("OTP sent to your email!", "success");
      } else {
        if (data.error && (data.error.includes("Email does not exist") || data.error.includes("Mobile number does not exist"))) {
          setIdentifierError(data.error);
        } else {
          showToast(data.error || "Login failed", "error");
        }
      }
    } catch (err) {
      showToast("Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp }),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('isOtpVerified', 'true');
          document.cookie = `isLoggedIn=true; path=/`;
          document.cookie = `isOtpVerified=true; path=/`;
        }
        showToast("Login successful!", "success");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1200);
      } else {
        showToast(data.error || "Invalid OTP", "error");
      }
    } catch (err) {
      showToast("Something went wrong!", "error");
    } finally {
      setOtpLoading(false);
    }
  };

  async function checkIdentifierExists(value) {
    if (!value) {
      setIdentifierStatus("");
      setIdentifierStatusMsg("");
      return;
    }
    let payload = {};
    if (/^\d{10}$/.test(value)) {
      payload.mobile = value;
    } else {
      payload.email = value;
    }
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, password: "__dummy__" }),
    });
    const data = await res.json();
    if (data.error && (data.error.includes("does not exist"))) {
      setIdentifierStatus("not-exist");
      setIdentifierStatusMsg(payload.email ? "Email does not exist" : "Mobile number does not exist");
    } else if (data.error && data.error.includes("Incorrect password")) {
      setIdentifierStatus("exists");
      setIdentifierStatusMsg(payload.email ? "Email exists" : "Mobile number exists");
    } else if (data.success) {
      setIdentifierStatus("exists");
      setIdentifierStatusMsg(payload.email ? "Email exists" : "Mobile number exists");
    } else {
      setIdentifierStatus("");
      setIdentifierStatusMsg("");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181c24] via-[#232526] to-[#414345] px-4 py-10">
      {/* Toaster */}
      {showToaster && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 text-lg font-semibold transition-all duration-300 ${toasterType === "success" ? "bg-black/80 text-green-400 border border-green-500" : "bg-black/80 text-red-400 border border-red-500"}`}>
          <span>{toasterType === "success" ? "✔️" : "❌"}</span>
          <span>{toasterMsg}</span>
        </div>
      )}
      {!showOtp ? (
        <form className="w-full max-w-md bg-[#23272f] rounded-2xl shadow-2xl p-8 flex flex-col gap-5 border border-gray-800 animate-fade-in-up" onSubmit={handleLogin}>
          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Login to your account</h2>
          <input
            type="text"
            placeholder="Email or Mobile Number"
            required
            value={identifier}
            onChange={e => { setIdentifier(e.target.value); setIdentifierStatus(""); setIdentifierStatusMsg(""); }}
            onBlur={e => checkIdentifierExists(e.target.value)}
            className="input"
          />
          {identifierStatusMsg && (
            <div className={identifierStatus === "exists" ? "text-green-400 text-sm mt-[-12px] mb-2 ml-1" : "text-red-400 text-sm mt-[-12px] mb-2 ml-1"}>{identifierStatusMsg}</div>
          )}
          {identifierError && (
            <div className="text-red-400 text-sm mt-[-12px] mb-2 ml-1">{identifierError}</div>
          )}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none outline-none cursor-pointer text-xl select-none flex items-center justify-center"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-gray-400 mt-2">
            Don't have an account? <Link href="/register" className="text-cyan-300 hover:underline">Register here</Link>
          </p>
        </form>
      ) : (
        <form className="w-full max-w-md bg-[#23272f] rounded-2xl shadow-2xl p-8 flex flex-col gap-5 border border-gray-800 animate-fade-in-up" onSubmit={handleOtpSubmit}>
          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            required
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="input"
            maxLength={6}
          />
          <button
            type="submit"
            disabled={otpLoading}
            className="mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {otpLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      )}
      <style jsx global>{`
        .input {
          padding: 12px;
          border-radius: 8px;
          border: 1.5px solid #333;
          background: #181c24;
          color: #fff;
          font-size: 1rem;
          outline: none;
          transition: border 0.2s;
        }
        .input:focus {
          border-color: #00b4db;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
      `}</style>
    </div>
  );
} 