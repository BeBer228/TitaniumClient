"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Сохраняем пользователя в localStorage (без хеширования)
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u: any) => u.email === email)) {
      setError("Пользователь с таким email уже существует");
      setLoading(false);
      return;
    }

    users.push({
      email,
      username,
      password, // сохраняем пароль как есть (небезопасно, но для демо пойдёт)
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ email, username }));

    router.push("/dashboard");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen w-full text-white relative overflow-hidden bg-black flex items-center justify-center px-6 pt-32">
        <GridBackground className="absolute inset-0 z-0 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/60 to-black/80 pointer-events-none" />

        <div className="relative z-20 w-full max-w-lg bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-3">Register</h1>
          <p className="text-center text-white/60 mb-10">
            Create your new account
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-purple-500 outline-none"
            />

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-purple-500 outline-none"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-purple-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 py-4 rounded-xl font-semibold transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center mt-3 text-white/50">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:text-purple-300"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}