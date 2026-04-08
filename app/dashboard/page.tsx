"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

// Иконки (замените на свои или используйте @phosphor-icons/react)
import {
  UserCircle,
  Gear,
  Key,
  Shield,
  ArrowRight,
  Clock,
  Star,
  GameController,
  Code,
  MagicWand,
  Rocket,
  Fire,
  Lock,
  Eye,
  EyeSlash,
  CheckCircle,
  Warning,
  Download,
  Users,
  ChatCircle,
  Palette,
  Sliders,
  CaretDown,
  CaretUp,
  Plus,
  Trash,
  Pencil,
} from "@phosphor-icons/react";

export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<{ email: string; username: string } | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);

  // Состояния для настроек
  const [settings, setSettings] = useState({
    theme: "dark",
    animations: true,
    notifications: true,
    autoLaunch: false,
    fpsDisplay: true,
    soundEnabled: true,
  });

  // Состояния для скриптов/конфигов
  const [scripts, setScripts] = useState([
    { id: 1, name: "Aim Assist Pro", enabled: true, type: "aimbot", downloads: 1234 },
    { id: 2, name: "ESP Visuals", enabled: true, type: "visual", downloads: 987 },
    { id: 3, name: "Trigger Bot", enabled: false, type: "trigger", downloads: 567 },
    { id: 4, name: "Bunny Hop", enabled: true, type: "movement", downloads: 2345 },
  ]);

  // Статистика
  const stats = {
    hoursPlayed: 247,
    kills: 15342,
    deaths: 8921,
    kd: 1.72,
    winRate: 68,
    rank: "Legendary",
    exp: 8472,
    nextLevelExp: 10000,
  };

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (!currentUser) {
      router.push("/login");
      return;
    }
    try {
      setUser(JSON.parse(currentUser));
    } catch (e) {
      localStorage.removeItem("currentUser");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match!" });
      return;
    }
    if (newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters!" });
      return;
    }

    // В реальном приложении здесь был бы запрос к API
    setMessage({ type: "success", text: "Password changed successfully!" });
    setTimeout(() => {
      setShowPasswordModal(false);
      setMessage(null);
    }, 2000);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const toggleScript = (id: number) => {
    setScripts(scripts.map(script =>
      script.id === id ? { ...script, enabled: !script.enabled } : script
    ));
  };

  const tabs = [
    { id: "overview", label: "Overview", icon: <UserCircle size={20} /> },
    { id: "scripts", label: "Scripts", icon: <Code size={20} /> },
    { id: "settings", label: "Settings", icon: <Sliders size={20} /> },
    { id: "security", label: "Security", icon: <Shield size={20} /> },
  ];

  if (!user) {
    return <Loader onFinished={() => {}} />;
  }

  return (
    <>
      <Loader onFinished={() => setReady(true)} />
      {ready && (
        <>
          <Header />

          <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
            {/* Hero Section с приветствием */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-transparent to-purple-600/20"></div>
              <div className="relative px-4 md:px-12 lg:px-24 pt-32 pb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-3">
                      Welcome back,{" "}
                      <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                        {user.username}
                      </span>
                    </h1>
                    <p className="text-white/50 text-lg">
                      Ready to dominate? Your Titanium Client is optimized and ready.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2"
                  >
                    <ArrowRight size={18} />
                    Logout
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Табы навигации */}
            <div className="px-4 md:px-12 lg:px-24 border-b border-white/10">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ y: -2 }}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-t-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                      activeTab === tab.id
                        ? "bg-gradient-to-t from-green-600/20 to-transparent border-b-2 border-green-500 text-green-400"
                        : "text-white/50 hover:text-white/80"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Контент */}
            <div className="px-4 md:px-12 lg:px-24 py-8">
              <AnimatePresence mode="wait">
                {/* OVERVIEW TAB */}
                {activeTab === "overview" && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-8"
                  >
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <StatCard icon={<GameController size={28} />} label="Hours Played" value={stats.hoursPlayed} unit="hrs" color="green" />
                      <StatCard icon={<Fire size={28} />} label="K/D Ratio" value={stats.kd} unit="KD" color="purple" />
                      <StatCard icon={<Star size={28} />} label="Win Rate" value={stats.winRate} unit="%" color="yellow" />
                      <StatCard icon={<Rocket size={28} />} label="Rank" value={stats.rank} color="blue" />
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                      <div className="flex justify-between mb-3">
                        <span className="text-white/70">Experience Progress</span>
                        <span className="text-green-400 font-semibold">{stats.exp} / {stats.nextLevelExp} XP</span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(stats.exp / stats.nextLevelExp) * 100}%` }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Active Scripts */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <MagicWand size={22} className="text-green-400" />
                        Active Scripts
                      </h3>
                      <div className="space-y-3">
                        {scripts.filter(s => s.enabled).map(script => (
                          <div key={script.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <div>
                              <p className="font-medium">{script.name}</p>
                              <p className="text-sm text-white/40">{script.downloads} downloads</p>
                            </div>
                            <CheckCircle size={20} className="text-green-400" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <QuickActionCard
                        icon={<Download size={24} />}
                        title="Download Client"
                        description="Get the latest version"
                        color="green"
                      />
                      <QuickActionCard
                        icon={<Users size={24} />}
                        title="Join Discord"
                        description="Community & Support"
                        color="purple"
                      />
                      <QuickActionCard
                        icon={<ChatCircle size={24} />}
                        title="Contact Support"
                        description="24/7 assistance"
                        color="blue"
                      />
                    </div>
                  </motion.div>
                )}

                {/* SCRIPTS TAB */}
                {activeTab === "scripts" && (
                  <motion.div
                    key="scripts"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold">Script Manager</h2>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-green-600 rounded-xl font-semibold flex items-center gap-2"
                      >
                        <Plus size={18} />
                        Add Script
                      </motion.button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {scripts.map((script) => (
                        <ScriptCard
                          key={script.id}
                          script={script}
                          onToggle={() => toggleScript(script.id)}
                        />
                      ))}
                    </div>

                    {/* Featured Scripts */}
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">🔥 Featured Community Scripts</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FeaturedScriptCard
                          name="Silent Aim"
                          downloads="15.2k"
                          rating={4.8}
                          author="Nursultan"
                        />
                        <FeaturedScriptCard
                          name="Wallhack Pro"
                          downloads="12.7k"
                          rating={4.9}
                          author="TitaniumTeam"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SETTINGS TAB */}
                {activeTab === "settings" && (
                  <motion.div
                    key="settings"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Palette size={22} className="text-green-400" />
                        Client Settings
                      </h3>
                      <div className="space-y-4">
                        <SettingToggle
                          label="Enable Animations"
                          description="Smooth UI transitions"
                          enabled={settings.animations}
                          onChange={() => setSettings({...settings, animations: !settings.animations})}
                        />
                        <SettingToggle
                          label="Show FPS Display"
                          description="Display frames per second in-game"
                          enabled={settings.fpsDisplay}
                          onChange={() => setSettings({...settings, fpsDisplay: !settings.fpsDisplay})}
                        />
                        <SettingToggle
                          label="Sound Effects"
                          description="Enable client sound effects"
                          enabled={settings.soundEnabled}
                          onChange={() => setSettings({...settings, soundEnabled: !settings.soundEnabled})}
                        />
                        <SettingToggle
                          label="Auto Launch"
                          description="Launch client on system startup"
                          enabled={settings.autoLaunch}
                          onChange={() => setSettings({...settings, autoLaunch: !settings.autoLaunch})}
                        />
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Sliders size={22} className="text-green-400" />
                        Performance Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-white/70 mb-2 block">RAM Allocation</label>
                          <input type="range" min="2" max="16" step="1" defaultValue="8" className="w-full" />
                          <p className="text-sm text-white/40 mt-1">Current: 8 GB (Recommended: 8-12 GB)</p>
                        </div>
                        <div>
                          <label className="text-white/70 mb-2 block">Render Distance</label>
                          <input type="range" min="50" max="300" step="10" defaultValue="150" className="w-full" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* SECURITY TAB */}
                {activeTab === "security" && (
                  <motion.div
                    key="security"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <Lock size={22} className="text-green-400" />
                        Account Security
                      </h3>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                          <div>
                            <p className="font-medium">Email Address</p>
                            <p className="text-sm text-white/40">{user.email}</p>
                          </div>
                          <button className="text-green-400 hover:text-green-300">Change</button>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                          <div>
                            <p className="font-medium">Password</p>
                            <p className="text-sm text-white/40">••••••••</p>
                          </div>
                          <button
                            onClick={() => setShowPasswordModal(true)}
                            className="text-green-400 hover:text-green-300"
                          >
                            Change
                          </button>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-white/40">Add an extra layer of security</p>
                          </div>
                          <button className="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-lg text-green-400">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <Warning size={24} className="text-yellow-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-semibold text-yellow-400 mb-1">Security Notice</h4>
                          <p className="text-sm text-white/60">
                            Never share your password with anyone. Titanium Client staff will never ask for your credentials.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>

          <Footer />

          {/* Password Change Modal */}
          {showPasswordModal && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 p-8 max-w-md w-full"
              >
                <h2 className="text-2xl font-bold mb-4">Change Password</h2>

                {message && (
                  <div className={`mb-4 p-3 rounded-xl text-sm ${
                    message.type === "error"
                      ? "bg-red-500/20 border border-red-500/30 text-red-400"
                      : "bg-green-500/20 border border-green-500/30 text-green-400"
                  }`}>
                    {message.text}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-white/70 mb-2">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPass ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full bg-white/10 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPass(!showCurrentPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                      >
                        {showCurrentPass ? <EyeSlash size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-2">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPass ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full bg-white/10 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50"
                      >
                        {showNewPass ? <EyeSlash size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold transition"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordModal(false);
                        setMessage(null);
                      }}
                      className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </>
      )}
    </>
  );
}

// Компонент статистики
function StatCard({ icon, label, value, unit, color }: any) {
  const colors = {
    green: "from-green-500 to-green-400",
    purple: "from-purple-500 to-purple-400",
    yellow: "from-yellow-500 to-yellow-400",
    blue: "from-blue-500 to-blue-400",
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`text-${color === "green" ? "green" : color}-400`}>{icon}</div>
        {unit && <span className="text-2xl font-bold">{value}</span>}
      </div>
      <p className="text-white/50 text-sm">{label}</p>
      {!unit && <p className="text-2xl font-bold mt-1">{value}</p>}
      {unit && <p className="text-xs text-white/30 mt-1">{unit}</p>}
    </motion.div>
  );
}

// Компонент быстрых действий
function QuickActionCard({ icon, title, description, color }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-left group transition-all hover:border-white/20"
    >
      <div className={`text-${color}-400 mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-white/40">{description}</p>
    </motion.button>
  );
}

// Компонент карточки скрипта
function ScriptCard({ script, onToggle }: any) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-5 flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${script.enabled ? "bg-green-500/20" : "bg-white/10"}`}>
          <Code size={24} className={script.enabled ? "text-green-400" : "text-white/40"} />
        </div>
        <div>
          <p className="font-semibold">{script.name}</p>
          <div className="flex gap-3 text-sm text-white/40">
            <span>{script.type}</span>
            <span>•</span>
            <span>{script.downloads} downloads</span>
          </div>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`px-4 py-2 rounded-xl font-semibold transition ${
          script.enabled
            ? "bg-green-600 hover:bg-green-700"
            : "bg-white/10 hover:bg-white/20"
        }`}
      >
        {script.enabled ? "Enabled" : "Disabled"}
      </button>
    </motion.div>
  );
}

// Компонент фичанутого скрипта
function FeaturedScriptCard({ name, downloads, rating, author }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl rounded-2xl border border-white/10 p-5 cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-lg">{name}</h4>
        <div className="flex items-center gap-1 text-yellow-400">
          <Star size={16} weight="fill" />
          <span className="text-sm">{rating}</span>
        </div>
      </div>
      <p className="text-sm text-white/40 mb-2">by {author}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-white/30">{downloads} downloads</span>
        <button className="px-3 py-1 bg-green-600 rounded-lg text-sm">Install</button>
      </div>
    </motion.div>
  );
}

// Компонент переключателя настроек
function SettingToggle({ label, description, enabled, onChange }: any) {
  return (
    <div className="flex justify-between items-center p-3 rounded-xl hover:bg-white/5 transition">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-white/40">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-12 h-6 rounded-full transition ${
          enabled ? "bg-green-500" : "bg-white/20"
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
            enabled ? "right-1" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}