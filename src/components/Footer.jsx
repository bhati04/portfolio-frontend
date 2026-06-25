import React from "react";

export default function Footer() {
  return (
    <footer className="bg-night-950 border-t border-white/5 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-iris-500 to-electric flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <div>
              <div className="text-white/80 font-semibold text-sm">Shelu Singh</div>
              <div className="text-white/30 text-xs">Cloud & DevOps Engineer</div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-white/40 text-sm">
            {["About", "Skills", "Projects", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-white/70 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="text-white/30 text-xs text-center">
            Built with React + Tailwind + Node.js
            <br />
            <span className="text-iris-500/60">© {new Date().getFullYear()} Shelu Singh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
