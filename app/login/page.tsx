"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export default function LoginPage() {
  const router = useRouter();
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Проверяем, не залогинен ли уже пользователь
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Получаем список пользователей
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // Ищем пользователя по email или username
      const user = users.find(
        (u: any) =>
          u.email === emailOrUsername ||
          u.username === emailOrUsername
      );

      if (!user) {
        setError("Пользователь не найден");
        setLoading(false);
        return;
      }

      // Проверяем пароль
      if (user.password !== password) {
        setError("Неверный пароль");
        setLoading(false);
        return;
      }

      // Сохраняем текущего пользователя
      localStorage.setItem("currentUser", JSON.stringify({
        email: user.email,
        username: user.username
      }));

      // Перенаправляем в дашборд
      router.push("/dashboard");
    } catch (err) {
      setError("Произошла ошибка при входе");
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen w-full text-white relative overflow-hidden bg-black flex items-center justify-center px-6 pt-32">
        <GridBackground className="absolute inset-0 z-0 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/70 to-black/90 pointer-events-none" />

        <div className="relative z-20 w-full max-w-lg bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-3 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Login
          </h1>
          <p className="text-center text-white/60 mb-10">Access your account</p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Email or Username"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
              className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-green-500 outline-none transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-black/40 px-5 py-4 rounded-xl border border-white/10 focus:border-green-500 outline-none transition"
            />

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 py-4 rounded-xl font-semibold transition ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center mt-3 text-white/50">
              No account?{" "}
              <Link
                href="/register"
                className="text-green-400 hover:text-green-300 transition"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}