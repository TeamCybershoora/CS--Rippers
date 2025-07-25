"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function RegisterPage() {
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianMobile, setGuardianMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMsg, setToasterMsg] = useState("");
  const [toasterType, setToasterType] = useState("success");
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isLoggedIn") &&
      localStorage.getItem("isOtpVerified")
    ) {
      window.location.replace("/dashboard");
    }
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  async function uploadToCloudinary(file) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "cs_ripper/profile-photo");
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);
    if (data.secure_url) return data.secure_url;
    throw new Error(data.error?.message || "Cloudinary upload failed");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }
    setLoading(true);
    let photoUrl = "";
    try {
      if (photoFile) {
        photoUrl = await uploadToCloudinary(photoFile);
      }
    } catch (err) {
      showToast("Photo upload failed!", "error");
      setLoading(false);
      return;
    }
    const payload = {
      name,
      email,
      mobile,
      role,
      guardianName: role === "student" ? guardianName : undefined,
      guardianMobile: role === "student" ? guardianMobile : undefined,
      password,
      photo: photoUrl,
    };
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setUserId(data.id);
        setShowOtp(true);
        showToast("OTP sent to your email!", "success");
      } else {
        showToast(data.error || "Registration failed", "error");
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
        }
        showToast("Registration complete!", "success");
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

  function showToast(msg, type) {
    setToasterMsg(msg);
    setToasterType(type);
    setShowToaster(true);
    setTimeout(() => setShowToaster(false), 2000);
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
        <form className="w-full max-w-md bg-[#23272f] rounded-2xl shadow-2xl p-8 flex flex-col gap-5 border border-gray-800 animate-fade-in-up" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Create your account</h2>
          {/* Profile Photo Upload */}
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="photo-upload" className="w-24 h-24 rounded-full border-2 border-dashed border-cyan-400 flex items-center justify-center cursor-pointer overflow-hidden bg-[#181c24] hover:border-blue-400 transition-all">
              {photo ? (
                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Add Photo</span>
              )}
            </label>
            <input id="photo-upload" type="file" accept="image/*" onChange={handlePhotoChange} hidden />
          </div>
          {uploading && <div className="text-cyan-300 text-center text-sm">Uploading photo...</div>}
          <input type="text" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} className="input" />
          <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} className="input" />
          <input type="text" placeholder="Mobile Number" required value={mobile} onChange={e => setMobile(e.target.value)} className="input" />
          <select value={role} onChange={e => setRole(e.target.value)} required className="input">
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="member">Member</option>
          </select>
          {role === "student" && (
            <>
              <input type="text" placeholder="Guardian's Name" required value={guardianName} onChange={e => setGuardianName(e.target.value)} className="input" />
              <input type="text" placeholder="Guardian's Mobile Number" required value={guardianMobile} onChange={e => setGuardianMobile(e.target.value)} className="input" />
            </>
          )}
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)} className="input pr-10" />
            <button type="button" tabIndex={-1} onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none outline-none cursor-pointer text-xl select-none flex items-center justify-center">
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="relative">
            <input type={showConfirm ? 'text' : 'password'} placeholder="Confirm Password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="input pr-10" />
            <button type="button" tabIndex={-1} onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none outline-none cursor-pointer text-xl select-none flex items-center justify-center">
              {showConfirm ? '🙈' : '👁️'}
            </button>
          </div>
          <button type="submit" disabled={loading || uploading} className="mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Registering..." : uploading ? "Uploading photo..." : "Register"}
          </button>
          <p className="text-center text-gray-400 mt-2">
            Already have an account? <Link href="/login" className="text-cyan-300 hover:underline">Login here</Link>
          </p>
        </form>
      ) : (
        <form className="w-full max-w-md bg-[#23272f] rounded-2xl shadow-2xl p-8 flex flex-col gap-5 border border-gray-800 animate-fade-in-up" onSubmit={handleOtpSubmit}>
          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Enter OTP</h2>
          <input type="text" placeholder="Enter OTP" required value={otp} onChange={e => setOtp(e.target.value)} className="input" maxLength={6} />
          <button type="submit" disabled={otpLoading} className="mt-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold text-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed">
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