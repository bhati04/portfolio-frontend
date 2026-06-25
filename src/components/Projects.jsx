import React, { useState } from "react";
import { useInView } from "../hooks/useInView";

const PROJECTS = [
  {
    title: "Multi-Cloud K8s Platform",
    category: "Infrastructure",
    description:
      "Production-grade Kubernetes platform spanning AWS EKS and GKE with unified GitOps workflows, auto-scaling, and zero-downtime deployments for 200+ microservices.",
    stack: ["Kubernetes", "Terraform", "ArgoCD", "Prometheus", "AWS EKS"],
    links: { github: "#", live: "#" },
    featured: true,
    gradient: "from-iris-500/20 to-blue-500/20",
    border: "border-iris-500/20",
    stats: { uptime: "99.99%", services: "200+", regions: "3" },
  },
  {
    title: "DevSecOps Pipeline",
    category: "CI/CD",
    description:
      "End-to-end secure CI/CD pipeline with automated SAST/DAST scanning, secret management via HashiCorp Vault, and policy enforcement using OPA Gatekeeper.",
    stack: ["GitHub Actions", "Vault", "OPA", "Trivy", "Docker"],
    links: { github: "#", live: null },
    featured: true,
    gradient: "from-green-500/20 to-teal-500/20",
    border: "border-green-500/20",
    stats: { scanTime: "<5min", coverage: "100%", vulns: "0 critical" },
  },
  {
    title: "Cloud Cost Optimizer",
    category: "FinOps",
    description:
      "Automated FinOps tool that analyzes AWS spend, identifies wasteful resources, and applies rightsizing recommendations. Saved $120K annually across 3 accounts.",
    stack: ["Python", "AWS Lambda", "DynamoDB", "Boto3", "Grafana"],
    links: { github: "#", live: null },
    featured: false,
    gradient: "from-yellow-500/20 to-orange-500/20",
    border: "border-yellow-500/20",
    stats: { saved: "$120K/yr", accounts: "3", automations: "45+" },
  },
  {
    title: "MERN Portfolio Platform",
    category: "Full Stack",
    description:
      "This very website — a production MERN stack application with MongoDB contact storage, Nodemailer alerts, and a React + Tailwind frontend deployed via CI/CD.",
    stack: ["React", "Node.js", "MongoDB", "Express", "Tailwind"],
    links: { github: "#", live: "#" },
    featured: false,
    gradient: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    stats: { performance: "98/100", uptime: "100%", loadTime: "<1s" },
  },
  {
    title: "Observability Stack",
    category: "Monitoring",
    description:
      "Self-hosted observability platform with Prometheus metrics, Grafana dashboards, Loki log aggregation, and Tempo distributed tracing — deployed via Helm on K8s.",
    stack: ["Prometheus", "Grafana", "Loki", "Tempo", "Helm"],
    links: { github: "#", live: null },
    featured: false,
    gradient: "from-electric/20 to-cyan-500/20",
    border: "border-cyan-500/20",
    stats: { metrics: "2M+/min", retention: "90 days", alerts: "150+" },
  },
  {
    title: "Microservices on EKS",
    category: "Cloud",
    description:
      "Migrated a monolithic Node.js app into 12 microservices deployed on AWS EKS with service mesh (Istio), horizontal pod autoscaling, and Canary deployments.",
    stack: ["Node.js", "Istio", "AWS EKS", "HPA", "Flagger"],
    links: { github: "#", live: null },
    featured: false,
    gradient: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/20",
    stats: { services: "12", latency: "-40%", throughput: "+3x" },
  },
];

const FILTER_CATS = ["All", "Infrastructure", "CI/CD", "FinOps", "Full Stack", "Monitoring", "Cloud"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [titleRef, titleInView] = useInView();

  const filtered = PROJECTS.filter(
    (p) => activeFilter === "All" || p.category === activeFilter
  );

  return (
    <section id="projects" className="py-32 bg-night-950 relative overflow-hidden">
      <div className="orb w-[600px] h-[300px] bg-iris-600/10 top-0 right-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-iris-400 text-sm font-medium tracking-widest uppercase mb-4">
            Work Showcase
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Production systems, infrastructure tools, and full-stack applications built at scale.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {FILTER_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-iris-600 text-white shadow-lg shadow-iris-600/30"
                  : "glass border border-white/5 text-white/50 hover:text-white hover:border-iris-500/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [cardRef, cardInView] = useInView();

  return (
    <div
      ref={cardRef}
      className={`relative glass border ${project.border} rounded-2xl overflow-hidden hover-lift group transition-all duration-700 ${
        cardInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${project.featured ? "md:col-span-1" : ""}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`} />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/40 text-xs font-medium">
            {project.category}
          </span>
          {project.featured && (
            <span className="px-2.5 py-1 rounded-full bg-iris-500/10 border border-iris-500/20 text-iris-400 text-xs font-medium">
              ⭐ Featured
            </span>
          )}
        </div>

        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-iris-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4">{project.description}</p>

        <div className="flex gap-4 mb-4">
          {Object.entries(project.stats).map(([k, v]) => (
            <div key={k}>
              <div className="text-white/80 text-sm font-semibold">{v}</div>
              <div className="text-white/30 text-xs capitalize">{k}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-md bg-white/5 text-white/50 text-xs font-mono"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <a
            href={project.links.github}
            className="flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
            </svg>
            Code
          </a>
          {project.links.live && (
            <a
              href={project.links.live}
              className="flex items-center gap-1.5 text-iris-400 hover:text-iris-300 text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
