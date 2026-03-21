"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Blogs" },
  { href: "/committee", label: "Committee" },
  { href: "/activities", label: "Activities" },
];

const socialLinks = [
  { href: "https://discord.gg/zxHk5u85wN", label: "Discord" },
  { href: "https://www.instagram.com/nyalalabs/", label: "Instagram" },
  { href: "https://www.linkedin.com/company/nyalalabs", label: "Linkedin" },
  { href: "https://github.com/Nyala-Labs", label: "Github" },
];

export default function Footer() {
  return (
    <footer className="border-t border-nyala-gray-light bg-nyala-black">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* brand */}
          <div>
            <motion.h3
              className="font-mono text-xl font-bold tracking-tighter"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-nyala-red">n</span>
              <span className="text-nyala-yellow">y</span>
              <span className="text-nyala-white">ala</span>
            </motion.h3>
            <p className="mt-3 font-mono text-xs leading-relaxed text-nyala-gray-muted">
              Blaze the trail. A youth-led club for builders, creators, and
              innovators who are passionate about technology and innovation especially in the field of AI.
            </p>
          </div>

          {/* links */}
          <div className="flex gap-16">
            <div>
              <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-nyala-gray-muted">
                Pages
              </h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-mono text-sm text-nyala-gray-muted transition-colors hover:text-nyala-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-nyala-gray-muted">
                Social
              </h4>
              <ul className="space-y-2">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-nyala-gray-muted transition-colors hover:text-nyala-red"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* cta */}
          <div className="flex flex-col justify-between">
            <p className="font-mono text-xs text-nyala-gray-muted">
              Want to join?
            </p>
            <a
              href="https://forms.gle/f3g69MxUrquDFWQZ9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block w-fit border border-nyala-red px-5 py-2 font-mono text-xs uppercase tracking-widest text-nyala-red transition-all duration-300 hover:bg-nyala-red hover:text-nyala-white"
            >
              Apply now →
            </a>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-nyala-gray-light pt-6 md:flex-row">
          <p className="font-mono text-[10px] text-nyala-gray-muted">
            © {new Date().getFullYear()} Nyala. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
