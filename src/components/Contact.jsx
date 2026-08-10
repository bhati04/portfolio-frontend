import React, { useState } from "react";
import { useInView } from "../hooks/useInView";
import { submitContactForm } from "../services/contact";

const INITIAL_FORM = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

const STATUS = { idle: "idle", loading: "loading", success: "success", error: "error" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(STATUS.idle);
  const [errorMsg, setErrorMsg] = useState("");

  const [titleRef, titleInView] = useInView();
  const [formRef, formInView] = useInView();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== STATUS.idle) setStatus(STATUS.idle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject || !form.message.trim()) {
      setStatus(STATUS.error);
      setErrorMsg("Please complete all required fields before sending your message.");
      return;
    }

    setStatus(STATUS.loading);
    setErrorMsg("");

    try {
      await submitContactForm(form);
      setStatus(STATUS.success);
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus(STATUS.error);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full px-4 py-3.5 rounded-xl glass border border-white/8 text-white placeholder-white/25 text-sm focus:outline-none focus:border-iris-500/50 focus:ring-2 focus:ring-iris-500/10 transition-all duration-200 bg-transparent hover:border-white/12";
  const labelClass = "block text-white/60 text-xs font-medium mb-2 uppercase tracking-wide";

  return (
    <section id="contact" className="py-32 bg-night-900/50 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-iris-600/12 bottom-[-100px] right-[-200px]" />
      <div className="orb w-[300px] h-[300px] bg-electric/8 top-0 left-[-100px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-iris-400 text-sm font-medium tracking-widest uppercase mb-4">
            Let's Work Together
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Looking for a Cloud & DevOps engineer? Let's connect. I read every message personally.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info cards */}
            {[
              {
                icon: "📧",
                label: "Email",
                value: "shelu16singh@gmail.com",
                href: "mailto:shelu16singh@gmail.com",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                value: "www.linkedin.com/in/shelu-singh-656a86291/",
                href: "https://www.linkedin.com/in/shelu-singh-656a86291/",
              },
              {
                icon: "📍",
                label: "Location",
                value: "Jodhpur, Rajasthan, India",
                href: null,
              },
              {
                icon: "⚡",
                label: "Response Time",
                value: "Usually within 24 hours",
                href: null,
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex items-center gap-4 glass border border-white/6 rounded-2xl p-4 hover-lift group"
              >
                <div className="w-12 h-12 rounded-xl bg-iris-500/10 border border-iris-500/20 flex items-center justify-center text-xl flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-white/40 text-xs uppercase tracking-wide mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-white/80 text-sm group-hover:text-iris-400 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-white/80 text-sm">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Availability badge */}
            <div className="glass border border-green-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-medium">Available for Work</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">
                Currently open to full-time roles and select freelance projects in cloud infrastructure,
                DevOps consulting, and backend engineering.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div
            ref={formRef}
            className={`lg:col-span-3 glass border border-white/6 rounded-3xl p-8 transition-all duration-700 ${
              formInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {status === STATUS.success ? (
              <div className="text-center py-16" role="status" aria-live="polite">
                <div className="text-6xl mb-6">✅</div>
                <h3 className="text-white text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-white/50 text-sm mb-8">
                  Thanks for reaching out! I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setStatus(STATUS.idle)}
                  className="px-6 py-3 rounded-full bg-iris-600 text-white text-sm font-medium hover:bg-iris-500 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-white font-semibold text-xl mb-6">Send a Message</h3>

                {/* Honeypot field: Lambda should silently accept and discard submissions when populated. */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    type="text"
                    name="website"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Full Name <span className="text-iris-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      autoComplete="name"
                      placeholder="Shelu Singh"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Email Address <span className="text-iris-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      maxLength={254}
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="contact-subject" className={labelClass}>
                    What would you like to discuss? <span className="text-iris-400">*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={inputClass + " cursor-pointer"}
                  >
                    <option value="" disabled className="bg-night-800">
                      Choose a topic
                    </option>
                    {[
                      "Job Opportunity",
                      "Cloud & DevOps",
                      "Data Engineering",
                      "Freelance Project",
                      "General Message",
                    ].map((topic) => (
                      <option key={topic} value={topic} className="bg-night-800">
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message <span className="text-iris-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={2000}
                    rows={5}
                    placeholder="Tell me about your project, infrastructure challenges, or what you're looking to build..."
                    className={inputClass + " resize-none"}
                  />
                  <div className="mt-2 flex justify-end text-white/25 text-xs font-mono">
                    {form.message.length}/2000
                  </div>
                </div>

                {/* Error */}
                {status === STATUS.error && (
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                    role="alert"
                    aria-live="assertive"
                  >
                    <span aria-hidden="true">⚠️</span>
                    {errorMsg}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === STATUS.loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-iris-600 to-iris-500 text-white font-semibold text-sm hover:shadow-xl hover:shadow-iris-600/30 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
                >
                  {status === STATUS.loading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-white/25 text-xs text-center">
                  No spam—just a direct reply to your message.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
