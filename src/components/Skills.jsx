import React from "react";
import { useInView } from "../hooks/useInView";

const SKILL_CATEGORIES = [
  {
    category: "Cloud Platforms",
    icon: "☁️",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
    accent: "text-blue-400",
    skills: [
      { name: "AWS", level: 92, icon: "🟠" },
      { name: "Google Cloud", level: 80, icon: "🔵" },
      { name: "Azure", level: 75, icon: "🔷" },
      { name: "Cloudflare", level: 85, icon: "🟡" },
    ],
  },
  {
    category: "Container & Orchestration",
    icon: "🐳",
    color: "from-iris-500/20 to-purple-500/20",
    border: "border-iris-500/20",
    accent: "text-iris-400",
    skills: [
      { name: "Docker", level: 95, icon: "🐳" },
      { name: "Kubernetes", level: 90, icon: "⎈" },
      { name: "Helm", level: 85, icon: "⛵" },
      { name: "Istio", level: 75, icon: "🌐" },
    ],
  },
  {
    category: "CI/CD & Automation",
    icon: "⚡",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/20",
    accent: "text-green-400",
    skills: [
      { name: "GitHub Actions", level: 92, icon: "🔄" },
      { name: "Jenkins", level: 80, icon: "🔧" },
      { name: "ArgoCD", level: 85, icon: "🚀" },
      { name: "Terraform", level: 88, icon: "🏗️" },
    ],
  },
  {
    category: "Infrastructure as Code",
    icon: "🏗️",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/20",
    accent: "text-orange-400",
    skills: [
      { name: "Terraform", level: 90, icon: "🔷" },
      { name: "Ansible", level: 85, icon: "🔴" },
      { name: "Pulumi", level: 70, icon: "🌊" },
      { name: "CloudFormation", level: 80, icon: "📦" },
    ],
  },
  {
    category: "Monitoring & Observability",
    icon: "📊",
    color: "from-yellow-500/20 to-amber-500/20",
    border: "border-yellow-500/20",
    accent: "text-yellow-400",
    skills: [
      { name: "Prometheus", level: 88, icon: "🔥" },
      { name: "Grafana", level: 90, icon: "📈" },
      { name: "ELK Stack", level: 82, icon: "🔍" },
      { name: "Datadog", level: 78, icon: "🐕" },
    ],
  },
  {
    category: "Backend & Databases",
    icon: "⚙️",
    color: "from-teal-500/20 to-cyan-500/20",
    border: "border-teal-500/20",
    accent: "text-teal-400",
    skills: [
      { name: "Node.js", level: 92, icon: "💚" },
      { name: "MongoDB", level: 88, icon: "🍃" },
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "Redis", level: 80, icon: "🔴" },
    ],
  },
  {
    category: "Networking & Security",
    icon: "🔐",
    color: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/20",
    accent: "text-pink-400",
    skills: [
      { name: "VPC / Subnets", level: 90, icon: "🌐" },
      { name: "SSL/TLS", level: 88, icon: "🔒" },
      { name: "IAM / RBAC", level: 92, icon: "🛡️" },
      { name: "Nginx", level: 85, icon: "🟢" },
    ],
  },
  {
    category: "Programming & Scripting",
    icon: "💻",
    color: "from-indigo-500/20 to-blue-500/20",
    border: "border-indigo-500/20",
    accent: "text-indigo-400",
    skills: [
      { name: "Python", level: 88, icon: "🐍" },
      { name: "Bash/Shell", level: 90, icon: "📟" },
      { name: "JavaScript", level: 92, icon: "🟡" },
      { name: "Go (basics)", level: 65, icon: "🔵" },
    ],
  },
];

function SkillBar({ name, level, icon, accent, delay }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-white/80 text-sm font-medium">{name}</span>
        </div>
        <span className={`text-xs font-mono font-semibold ${accent}`}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r"
          style={{
            width: inView ? `${level}%` : "0%",
            transitionDelay: `${delay}ms`,
            background: `linear-gradient(90deg, currentColor, currentColor)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [titleRef, titleInView] = useInView();

  return (
    <section id="skills" className="py-32 bg-night-950 relative overflow-hidden">
      <div className="orb w-[500px] h-[500px] bg-iris-600/10 top-0 right-[-200px]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-700 ${
            titleInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-iris-400 text-sm font-medium tracking-widest uppercase mb-4">
            Technical Expertise
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Cloud & DevOps <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            End-to-end expertise across the modern cloud infrastructure lifecycle — from code to cluster to production.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <SkillCard key={cat.category} cat={cat} index={ci} />
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-white/30 text-sm mb-8">Also worked with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Linux", "Git", "Vault", "Consul", "Packer", "GitHub",
              "GitLab", "Jira", "Confluence", "Slack", "Notion", "VS Code",
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full glass border border-white/5 text-white/50 text-sm hover:text-white/80 hover:border-iris-500/20 transition-all duration-200 cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ cat, index }) {
  const [cardRef, cardInView] = useInView();

  return (
    <div
      ref={cardRef}
      className={`glass border ${cat.border} rounded-2xl p-6 hover-lift transition-all duration-700 ${
        cardInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-xl`}
        >
          {cat.icon}
        </div>
        <h3 className={`font-semibold ${cat.accent} text-sm uppercase tracking-wide`}>
          {cat.category}
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {cat.skills.map((skill, si) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-base">{skill.icon}</span>
                <span className="text-white/80 text-sm font-medium">{skill.name}</span>
              </div>
              <span className={`text-xs font-mono font-semibold ${cat.accent}`}>
                {skill.level}%
              </span>
            </div>
            <SkillBarInner level={skill.level} accent={cat.accent} delay={si * 100} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillBarInner({ level, accent, delay }) {
  const [ref, inView] = useInView();

  const colorMap = {
    "text-blue-400": "#60a5fa",
    "text-iris-400": "#a78bfa",
    "text-green-400": "#4ade80",
    "text-orange-400": "#fb923c",
    "text-yellow-400": "#facc15",
    "text-teal-400": "#2dd4bf",
    "text-pink-400": "#f472b6",
    "text-indigo-400": "#818cf8",
  };
  const color = colorMap[accent] || "#a78bfa";

  return (
    <div ref={ref} className="h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-[1200ms] ease-out"
        style={{
          width: inView ? `${level}%` : "0%",
          transitionDelay: `${delay}ms`,
          background: `linear-gradient(90deg, ${color}80, ${color})`,
        }}
      />
    </div>
  );
}
