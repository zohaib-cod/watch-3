"use client";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FaTiktok, FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    label: "TikTok",
    href: "https://www.tiktok.com",
    icon: FaTiktok,
    hover: "hover:bg-black hover:text-white",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/",
    icon: FaWhatsapp,
    hover: "hover:bg-[#25D366] hover:text-white",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: FaFacebook,
    hover: "hover:bg-[#1877F2] hover:text-white",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: FaInstagram,
    hover: "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-800">
      <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Logo & description */}
          <div className="space-y-4">
            <a href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white">
                M
              </span>
              <span className="text-xl font-semibold tracking-tight text-white">
                M A
              </span>
            </a>
            <p className="text-sm leading-relaxed text-neutral-400">
              We craft thoughtful digital experiences that help brands grow.
              Partner with us to build products people love.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-400 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-400">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
                <a
                  href="mailto:hello@yourcompany.com"
                  className="transition-colors duration-200 hover:text-white"
                >
                  alimubasharali732@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
                <a
                  href="tel:+92 (324) 857-1076"
                  className="transition-colors duration-200 hover:text-white"
                >
                  +92 (314) 043-4545
                  +92 (324) 857-1076
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
                <span>Kasur Punjad Pakistan </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Newsletter
            </h3>
            <p className="mt-4 text-sm text-neutral-400">
              Subscribe to get the latest news and updates delivered to your
              inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-sm text-white placeholder-neutral-500 outline-none transition-colors duration-200 focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-indigo-500 active:scale-95"
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Subscribe</span>
                </button>
              </div>
              {subscribed && (
                <p className="mt-2 text-xs text-emerald-400">
                  Thanks for subscribing!
                </p>
              )}
            </form>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon, hover }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 transition-all duration-300 hover:-translate-y-1 hover:border-transparent ${hover}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-neutral-800" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-neutral-500">
            © 2026 Your Company. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <a href="/privacy" className="transition-colors duration-200 hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="transition-colors duration-200 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}