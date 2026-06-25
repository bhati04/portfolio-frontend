import React from "react";
import { useInView } from "../hooks/useInView";

const EXPERIENCES = [
  {
    role: "Senior Cloud & DevOps Engineer",
    company: "TechCorp Solutions",
    period: "2023 – Present",
    type: "Full-time",
    highlights: [
      "Architected multi-region AWS infrastructure serving 2M+ daily active users with 99.99% uptime",
      "Built GitOps pipelines using ArgoCD + GitHub Actions cutting deploy time by 70%",
      "Led Kubernetes migration of 40+ microservices from bare-metal to EKS",
      "Reduced infrastructure costs by $120K/year through rightsizing and spot instance strategies",
    ],
    stack: ["AWS", "Kubernetes", "Terraform", "ArgoCD", "Prometheus"],
  },
  {
    role: "DevOps Engineer",
    company: "CloudNative Labs",
    period: "2022 – 2023",
    type: "Full-time",
    highlights: [
      "Designed CI/CD pipelines across 15+ product teams using Jenkins and GitHub Actions",
      "Implemented centralized observability stack (Prometheus + Grafana + Loki) from scratch",
      "Automated infrastructure provisioning with Terraform, eliminating manual server setup",
      "Built container registry and image scanning workflow integrated with security team",
    ],
    stack: ["Docker", "Jenkins", "Terraform", "Grafana", "GCP"],
  },
  {
    role: "Backend Developer (Node.js + DevOps)",
    company: "StartupHub Pvt Ltd",
    period: "2021 – 2022",
    type: "Full-time",
    highlights: [
      "Developed RESTful APIs with Node.js + Express serving 50K+ concurrent users",
      "Containerized all backend services with Docker and wrote Kubernetes manifests",
      "Set up MongoDB Atlas clusters with automated backups and monitoring",
      "Introduced Git branching strategy and automated testing gates in CI",
    ],
    stack: ["Node.js", "MongoDB", "Docker", "AWS EC2", "Nginx"],
  },
];

function ExperienceCard({ exp, i }) {
  const [ref, inView] = useInView();
  const isLeft = i % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-8 md:gap-0 transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
      style={{ transitionDelay: `${i * 120}ms` }}
    >
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-iris-500 border-4 border-night-950 z-10 mt-6 ring-4 ring-iris-500/20" />

      <div
        className={`w-full md:w-5/12 ml-16 md:ml-0 glass border border-white/6 rounded-2xl p-6 hover-lift group ${
          isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-white font-semibold text-lg leading-tight">
              {exp.role}
            </h3>
            <p className="text-iris-400 font-medium text-sm mt-1">
              {exp.company}
            </p>
          </div>

          <div className="text-right">
            <div className="text-white/40 text-xs font-mono">
              {exp.period}
            </div>

            <div className="mt-1 px-2 py-0.5 rounded-full bg-iris-500/10 border border-iris-500/20 text-iris-400 text-xs inline-block">
              {exp.type}
            </div>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {exp.highlights.map((h, hi) => (
            <li
              key={hi}
              className="flex items-start gap-2 text-white/60 text-sm"
            >
              <span className="text-electric mt-0.5 flex-shrink-0">›</span>
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.stack.map((s) => (
            <span
              key={s}
              className="px-2.5 py-1 rounded-lg bg-iris-500/8 border border-iris-500/15 text-iris-400/80 text-xs font-mono"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const [titleRef, titleInView] = useInView();

  return (
    <section id="experience" className="py-32 bg-night-900/50 relative">
      <div className="orb w-[400px] h-[400px] bg-electric/8 bottom-0 left-[-150px]" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-700 ${
            titleInView
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-iris-400 text-sm font-medium tracking-widest uppercase mb-4">
            Career Journey
          </p>

          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>

          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Building production systems and shipping infrastructure that scales
            — here's the journey so far.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-iris-500/50 via-electric/30 to-transparent" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard
                key={i}
                exp={exp}
                i={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}