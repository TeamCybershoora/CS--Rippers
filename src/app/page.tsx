"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("isLoggedIn") &&
      localStorage.getItem("isOtpVerified")
    ) {
      window.location.replace("/dashboard");
    }
  }, []);

  return (
    <main className="home-main">
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">CS RIPPERS</h1>
        <h2 className="hero-subtitle">The Next-Gen Hackathon & Competition Platform</h2>
        <p className="hero-desc">Host, join, and win hackathons and coding competitions. Compete for real prize pools, solve exciting tasks, and showcase your skills to the world. Built for developers, by developers.</p>
        <div className="hero-btns">
          <Link href="/register" className="hero-btn primary">Get Started</Link>
          <Link href="/login" className="hero-btn secondary">Log In</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl grid md:grid-cols-3 gap-8 py-16 animate-fade-in-up">
        <div className="bg-[#23272f] rounded-2xl p-8 shadow-xl border border-cyan-900/30 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold mb-2 text-cyan-300">Exciting Tasks</h3>
          <p className="text-gray-400">Solve real-world coding challenges, puzzles, and project-based tasks designed by industry experts.</p>
        </div>
        <div className="bg-[#23272f] rounded-2xl p-8 shadow-xl border border-blue-900/30 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold mb-2 text-blue-300">Hackathons & Competitions</h3>
          <p className="text-gray-400">Participate in regular hackathons and coding competitions. Compete solo or as a team, climb the leaderboard, and win big!</p>
        </div>
        <div className="bg-[#23272f] rounded-2xl p-8 shadow-xl border border-purple-900/30 hover:scale-105 transition-transform">
          <h3 className="text-xl font-bold mb-2 text-purple-300">Prize Pools</h3>
          <p className="text-gray-400">Win cash prizes, swags, and exclusive opportunities. The more you win, the higher you rank!</p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-3xl text-center py-12 animate-fade-in-up">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-cyan-200">Ready to join the next big hackathon?</h3>
        <p className="text-gray-400 mb-6">Sign up now and be part of the most exciting coding community. Compete, learn, and win!</p>
        <Link href="/register" className="inline-block px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 transition-transform">
          Register Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="w-full text-center py-6 text-gray-500 text-sm border-t border-gray-800 mt-8 animate-fade-in-up">
        &copy; {new Date().getFullYear()} CS RIPPERS | Empowering Developers | Powered By <a href="https://www.shooratech.space/" target="_blank" rel="noopener noreferrer" className="underline text-cyan-300 hover:text-cyan-400">Cybershoora</a>
      </footer>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        .bg-gradient-to-br {
          background: linear-gradient(135deg, #181c24, #232526 60%, #414345 100%);
        }
        .bg-gradient-to-r {
          background: linear-gradient(to right, #06b6d4, #3b82f6, #a21caf);
        }
        .from-cyan-400 {
          --tw-gradient-from: #22d3ee;
        }
        .via-blue-400 {
          --tw-gradient-via: #60a5fa;
        }
        .to-purple-500 {
          --tw-gradient-to: #a21caf;
        }
        .text-transparent {
          color: transparent;
        }
        .bg-clip-text {
          -webkit-background-clip: text;
          background-clip: text;
        }
        .drop-shadow-lg {
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.25));
        }
        .text-gray-200 {
          color: #e5e7eb;
        }
        .text-gray-400 {
          color: #9ca3af;
        }
        .text-cyan-300 {
          color: #67e8f9;
        }
        .border-cyan-400 {
          border-color: #22d3ee;
        }
        .hover\:bg-cyan-900\/30:hover {
          background: rgba(22, 78, 99, 0.3);
        }
        .rounded-lg {
          border-radius: 0.5rem;
        }
        .font-bold {
          font-weight: 700;
        }
        .font-extrabold {
          font-weight: 800;
        }
        .tracking-tight {
          letter-spacing: -0.02em;
        }
        .mb-4 {
          margin-bottom: 1rem;
        }
        .mb-6 {
          margin-bottom: 1.5rem;
        }
        .mb-8 {
          margin-bottom: 2rem;
        }
        .mb-10 {
          margin-bottom: 2.5rem;
        }
        .py-20 {
          padding-top: 5rem;
          padding-bottom: 5rem;
        }
        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .px-8 {
          padding-left: 2rem;
          padding-right: 2rem;
        }
        .py-3 {
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }
        .max-w-2xl {
          max-width: 42rem;
        }
        .max-w-4xl {
          max-width: 56rem;
        }
        .flex {
          display: flex;
        }
        .flex-col {
          flex-direction: column;
        }
        .items-center {
          align-items: center;
        }
        .justify-center {
          justify-content: center;
        }
        .gap-4 {
          gap: 1rem;
        }
        .text-4xl {
          font-size: 2.25rem;
        }
        .md\:text-6xl {
          font-size: 3.75rem;
        }
        .text-2xl {
          font-size: 1.5rem;
        }
        .md\:text-3xl {
          font-size: 1.875rem;
        }
        .text-lg {
          font-size: 1.125rem;
        }
        .md\:text-xl {
          font-size: 1.25rem;
        }
        .shadow-lg {
          box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        }
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        .transition-transform {
          transition: transform 0.2s;
        }
        .transition-colors {
          transition: background 0.2s, color 0.2s;
        }
      `}</style>
      <style jsx>{`
        .home-main {
          min-height: 100vh;
          background: #0A0A0A;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 1rem;
        }
        .hero-section {
          width: 100%;
          max-width: 64rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 5rem 0 0 0;
          animation: fade-in 1.2s cubic-bezier(0.4,0,0.2,1) both;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #a21caf);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.25));
        }
        .hero-subtitle {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #e5e7eb;
        }
        .hero-desc {
          font-size: 1.25rem;
          color: #bdbdbd;
          margin-bottom: 2rem;
          max-width: 36rem;
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 2.5rem;
        }
        .hero-btn {
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          font-weight: 700;
          font-size: 1.1rem;
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s, color 0.2s;
        }
        .hero-btn.primary {
          background: linear-gradient(90deg, #06b6d4, #3b82f6, #a21caf);
          color: #fff;
          box-shadow: 0 2px 12px rgba(6,182,212,0.10);
        }
        .hero-btn.primary:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 24px rgba(58,131,246,0.15);
        }
        .hero-btn.secondary {
          border: 2px solid #06b6d4;
          color: #06b6d4;
          background: transparent;
        }
        .hero-btn.secondary:hover {
          background: #06b6d422;
          color: #fff;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
