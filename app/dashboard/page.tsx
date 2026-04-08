"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<{ email: string; username: string } | null>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(currentUser));
  }, [router]);

  return (
    <>
      <Loader onFinished={() => setReady(true)} />
      {ready && (
        <>
          <Header />

          <main className="min-h-screen text-white bg-black px-48 pt-40">
            <h1 className="text-5xl font-bold mb-6">Dashboard</h1>
            <p className="text-xl text-white/70">
              Welcome, <span className="text-green-400">{user?.username || "User"}</span>
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-2xl font-semibold mb-3 text-green-400">Profile Info</h2>
                <p className="text-white/80">Email: {user?.email}</p>
                <p className="text-white/80">Username: {user?.username}</p>
                <button
                  onClick={() => {
                    localStorage.removeItem("currentUser");
                    router.push("/login");
                  }}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition"
                >
                  Logout
                </button>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h2 className="text-2xl font-semibold mb-3 text-green-400">Account Status</h2>
                <p className="text-white/80">Plan: Free</p>
                <p className="text-white/80">Status: Active</p>
              </div>
            </div>
          </main>

          <Footer />
        </>
      )}
    </>
  );
}