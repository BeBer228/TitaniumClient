"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = "Email or username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setServerError("");

    // Simulate API call - replace with your actual authentication endpoint
    try {
      // Mock API request - replace with real endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock successful login (in real app, check credentials with your backend)
      if (formData.emailOrUsername === "demo@example.com" && formData.password === "password123") {
        // Store auth token/session
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({
          email: formData.emailOrUsername,
          name: "Demo User"
        }));

        // Redirect to dashboard or home page
        router.push("/dashboard");
      } else {
        setServerError("Invalid email/username or password");
      }
    } catch (error) {
      setServerError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen w-full text-white relative overflow-hidden bg-black flex items-center justify-center px-6 pt-32">
        <GridBackground className="absolute inset-0 z-0 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-black/70 to-black/90 pointer-events-none" />

        <div className="relative z-20 w-full max-w-lg bg-black/30 backdrop-blur-xl rounded-3xl border border-white/10 p-10 shadow-2xl">
          <h1 className="text-4xl font-bold text-center mb-3">Login</h1>
          <p className="text-center text-white/60 mb-10">Access your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <input
                type="text"
                name="emailOrUsername"
                placeholder="Email or Username"
                value={formData.emailOrUsername}
                onChange={handleChange}
                className={`w-full bg-black/40 px-5 py-4 rounded-xl border ${
                  errors.emailOrUsername ? "border-red-500" : "border-white/10"
                } focus:border-purple-500 outline-none transition`}
              />
              {errors.emailOrUsername && (
                <p className="text-red-400 text-sm mt-1 ml-2">{errors.emailOrUsername}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-black/40 px-5 py-4 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-white/10"
                } focus:border-purple-500 outline-none transition`}
              />
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 ml-2">{errors.password}</p>
              )}
            </div>

            {serverError && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-center">
                <p className="text-red-400 text-sm">{serverError}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 py-4 rounded-xl font-semibold transition bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-center mt-3 text-white/50">
              No account?{" "}
              <Link
                href="/register"
                className="text-purple-400 hover:text-purple-300 transition"
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