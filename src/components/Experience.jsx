import React from "react";
import { useInView } from "../hooks/useInView";

const EXPERIENCES = [
  {
    role: "Cloud & DevOps Intern",
    company: "Spanidea",
    period: "June 2026 – Present",
    type: "Internship",
    projects: [
      {
        title: "Automated AWS Cost Reporting Pipeline",
        year: "2026",
        overview:
          "Automated AWS cost analysis using Cost and Usage Report data to identify high-cost services and deliver summarized insights by email.",
        contributions: [
          "Configured CUR storage in S3, the Glue Data Catalog, and Athena queries for cost analysis.",
          "Automated report generation with Lambda, Step Functions, and EventBridge scheduling.",
          "Prepared SES email summaries with report attachments and applied least-privilege IAM access.",
        ],
      },
      {
        title: "Containerized Cloud Deployment & CI/CD",
        year: "2026",
        overview:
          "Deployed containerized applications on AWS with CI/CD, Nginx routing, environment management, health checks, and production troubleshooting.",
        contributions: [
          "Containerized frontend, backend, and database services using Docker Compose.",
          "Built Jenkins pipelines for deployment, S3 synchronization, and CloudFront invalidation.",
          "Configured Nginx and diagnosed CORS, routing, 502, IAM, Linux, container, and networking issues using logs and tests.",
        ],
      },
    ],
    stack: [
      "AWS",
      "EC2",
      "S3",
      "Lambda",
      "CloudFront",
      "CloudWatch",
      "Athena",
      "Glue",
      "CUR",
      "EventBridge",
      "Step Functions",
      "SES",
      "IAM",
      "Docker",
      "Docker Compose",
      "Jenkins",
      "GitHub",
      "Nginx",
      "Linux",
    ],
  },
  {
    role: "Data Engineering & Big Data Analytics Intern",
    company: "Regex Softwares, Jaipur",
    period: "2 months",
    type: "Internship",
    highlights: [
      "Built ETL workflows to ingest, clean, transform, and prepare structured and semi-structured data for analysis.",
      "Worked with the Hadoop ecosystem, including HDFS, Hive, and MapReduce concepts for distributed data storage and processing.",
      "Practiced real-time data ingestion and event-stream processing using Apache Kafka.",
      "Used Python, SQL, Pandas, NumPy, and PySpark for data transformation, exploration, and analytical workflows.",
      "Created interactive Power BI dashboards and reports to communicate trends and business insights.",
    ],
    stack: [
      "ETL Pipelines",
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Apache Spark",
      "PySpark",
      "Hadoop",
      "HDFS",
      "Hive",
      "Kafka",
      "Power BI",
    ],
  },
];

function ExperienceCard({ exp, i }) {
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={`relative flex items-start transition-all duration-700 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${i * 120}ms` }}
    >
      <div className="absolute left-4 md:left-6 -translate-x-1/2 w-4 h-4 rounded-full bg-iris-500 border-4 border-night-950 z-10 mt-6 ring-4 ring-iris-500/20" />

      <div
        className="w-full ml-10 md:ml-14 glass border border-white/6 rounded-2xl p-6 md:p-8 hover-lift group"
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

        {exp.projects && (
          <div className="space-y-4 mb-5">
            {exp.projects.map((project) => (
              <article
                key={project.title}
                className="rounded-xl bg-white/[0.025] border border-white/5 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h4 className="text-white/90 text-sm font-semibold">{project.title}</h4>
                  <span className="text-white/30 text-xs font-mono">{project.year}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-3">{project.overview}</p>
                <ul className="space-y-1.5">
                  {project.contributions.map((contribution) => (
                    <li
                      key={contribution}
                      className="flex items-start gap-2 text-white/55 text-sm"
                    >
                      <span className="text-electric mt-0.5 flex-shrink-0">›</span>
                      {contribution}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

        {exp.highlights && (
          <ul className="space-y-2 mb-5">
            {exp.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-white/60 text-sm"
              >
                <span className="text-electric mt-0.5 flex-shrink-0">›</span>
                {highlight}
              </li>
            ))}
          </ul>
        )}

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
            Hands-on experience across cloud operations, DevOps automation,
            data engineering, and analytics.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-iris-500/50 via-electric/30 to-transparent" />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard
                key={`${exp.company}-${exp.role}`}
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
