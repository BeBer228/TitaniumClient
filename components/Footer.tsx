"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="
        w-full
        relative
        bg-black
        overflow-hidden
      "
    >
      <div className="absolute left-0 top-0 h-full opacity-30 pointer-events-none">
        <Image
          src="/fluid3.png"
          alt="Fluid"
          width={400}
          height={800}
          className="h-full w-auto object-cover"
        />
      </div>

      <div
        className="
          relative
          z-10
          px-48
          py-20
          flex
          justify-between
          items-start
          text-white/70
        "
      >
        <div className="flex flex-col gap-3 max-w-xs">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Titanium Client
          </h3>
          <p className="text-sm text-white/50 leading-relaxed">
            © {new Date().getFullYear()} Titanium Client.
            <br />
            All rights reserved.
          </p>
          <p className="text-white/50 text-sm">
            Made by{" "}
            <a
              href="https://finikov.one"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent transition"
            >
              finikov
            </a>
          </p>
        </div>

        <div className="flex gap-20">
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Platform</h4>
            <Link href="/" className="hover:text-green-400 transition">
              Home
            </Link>
            <Link href="/pricing" className="hover:text-green-400 transition">
              Purchase
            </Link>
            <Link href="/faq" className="hover:text-green-400 transition">
              FAQ
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Account</h4>
            <Link href="/login" className="hover:text-green-400 transition">
              Login
            </Link>
            <Link href="/register" className="hover:text-green-400 transition">
              Register
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Contacts</h4>
            <a href="#" className="hover:text-green-400 transition">
              Telegram
            </a>
            <a href="#" className="hover:text-green-400 transition">
              Discord
            </a>
            <a href="#" className="hover:text-green-400 transition">
              VK
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <a href="#" className="hover:text-green-400 transition">
              License Agreement
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}