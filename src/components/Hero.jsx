import React, { useEffect, useState } from "react";

const ROLES = [
  "Cloud & DevOps Engineer",
  "AWS Solutions Architect",
  "Kubernetes Specialist",
  "MERN Stack Developer",
  "Infrastructure Automation Expert",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const role = ROLES[roleIndex];

    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-night-950"
    >
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] bg-iris-600/20 top-[-200px] left-[-200px]" />
      <div className="orb w-[400px] h-[400px] bg-electric/10 bottom-[-100px] right-[-100px]" />
      <div className="orb w-[300px] h-[300px] bg-iris-400/10 top-[40%] right-[20%]" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-tech-grid bg-tech-grid opacity-100 pointer-events-none" />

      {/* Noise */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-iris-500/20 text-iris-400 text-xs font-medium tracking-wider uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-electric animate-pulse-slow" />
              Available for opportunities
            </div>

            {/* Name */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-none">
              Hi, I'm{" "}
              <span className="gradient-text">Shelu Singh</span>
            </h1>

            {/* Animated role */}
            <div className="h-10 mb-6 flex items-center justify-center lg:justify-start">
              <span className="text-xl sm:text-2xl text-white/70 font-light font-mono">
                {displayed}
                <span className="inline-block w-0.5 h-6 bg-iris-400 ml-0.5 animate-pulse" />
              </span>
            </div>

            {/* Bio */}
            <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
              Building resilient cloud infrastructure and developer pipelines at scale.
              Passionate about automation, Kubernetes, and making systems that just{" "}
              <em className="text-white/70 not-italic font-medium">work</em>.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start gap-8 mb-10">
              {[
                { value: "3+", label: "Years Exp." },
                { value: "20+", label: "Projects" },
                { value: "99.9%", label: "Uptime SLA" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
              <button
                onClick={scrollToContact}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-iris-600 to-iris-500 text-white font-semibold text-sm hover:shadow-xl hover:shadow-iris-600/40 hover:scale-105 transition-all duration-300"
              >
                Get in Touch
              </button>
              <button
                onClick={scrollToProjects}
                className="px-8 py-3.5 rounded-full glass border border-white/10 text-white/80 font-semibold text-sm hover:border-iris-500/40 hover:text-white transition-all duration-300"
              >
                View Projects
              </button>
              <a
                href={`${process.env.PUBLIC_URL}/resume.pdf`}
                download
                className="px-8 py-3.5 rounded-full text-white/60 font-semibold text-sm hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mt-8">
              {[
                {
                  name: "GitHub",
                  href: "https://github.com/bhati04",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                    </svg>
                  ),
                },
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/in/shelu-singh-656a86291/",
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
                {
                  name: "Email",
                  href: "mailto:shelu16singh@gmail.com",
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl glass border border-white/5 text-white/40 hover:text-iris-400 hover:border-iris-500/30 transition-all duration-200 hover:scale-110"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex-shrink-0 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-iris-600/30 to-electric/20 blur-xl animate-pulse-slow" />

              {/* Spinning border */}
              <div
                className="absolute -inset-1 rounded-full border-glow"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent, #8b5cf6, transparent, #00d4ff, transparent)",
                  borderRadius: "50%",
                  padding: "2px",
                }}
              >
                <div className="w-full h-full rounded-full bg-night-950" />
              </div>

              {/* Photo container */}
              <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-iris-500/20">
                <img
                  src={`${process.env.PUBLIC_URL}/profile.JPG`}
                  alt="Shelu Singh"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 glass border border-iris-500/20 rounded-2xl px-3 py-2 animate-float">
                <div className="flex items-center gap-2">
                  <span className="text-lg">☁️</span>
                  <div>
                    <div className="text-white text-xs font-semibold">AWS Certified</div>
                    <div className="text-white/40 text-[10px]">Solutions Architect</div>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-4 glass border border-electric/20 rounded-2xl px-3 py-2"
                style={{ animation: "float 6s ease-in-out 2s infinite" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚙️</span>
                  <div>
                    <div className="text-white text-xs font-semibold">Kubernetes</div>
                    <div className="text-white/40 text-[10px]">CKA Certified</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs animate-bounce">
          <span>Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
