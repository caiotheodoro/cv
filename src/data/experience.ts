export interface Bullet {
  title: string;
  text: string;
}

export interface Experience {
  company: string;
  logo?: string;
  title: string;
  type: string;
  start: string;
  end: string;
  duration: string;
  location?: string;
  intro?: string;
  bullets?: Bullet[];
  skills?: string[];
  note?: string;
}

export const experiences: Experience[] = [
  {
    company: "Adopt AI",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHoor2zup6kOw/company-logo_100_100/B4DZbESVBgHAAU-/0/1747049861656/getadoptai_logo?e=1776297600&v=beta&t=4dkxM2of2G8JFY0TrNrlKd-chVehALl-Qx-LQIzqKlE",
    title: "Senior AI Engineer",
    type: "Full-time",
    start: "Mar 2026",
    end: "Present",
    duration: "1 mo",
    location: "California, United States · Remote",
    intro:
      "Building production-grade AI workflow infrastructure across HITL pipelines, orchestration layers, and developer platform standards for Adopt's multi-service architecture.",
    bullets: [
      {
        title: "HITL Workflow Architecture",
        text: "Designed and refined Human-in-the-Loop flows with explicit pause/resume contracts, structured event payloads, and conflict-aware review paths for low-confidence AI outputs.",
      },
      {
        title: "Temporal & Service Orchestration",
        text: "Improved orchestration patterns across backend, workflow workers, and execution services, enforcing clear service boundaries and reliable long-running workflow behavior.",
      },
      {
        title: "Reliability and Delivery Standards",
        text: "Introduced delivery guardrails (verification gates, diagnostics requirements, and completion contracts) to improve consistency, reduce regressions, and harden AI feature rollouts.",
      },
      {
        title: "Developer Platform Enablement",
        text: "Authored architecture docs, runbooks, and operational guidelines for HITL execution, route layering, and end-to-end debugging to accelerate onboarding and incident response.",
      },
      {
        title: "Dashboard & Product Foundation",
        text: "Contributed to dashboard and UX revamp efforts, aligning technical implementation with product workflows and observability needs for AI-assisted operations.",
      },
    ],
    skills: [
      "Human-in-the-Loop (HITL)",
      "Temporal Workflows",
      "AI Orchestration",
      "LLM Reliability",
      "Solution Architecture",
      "System Design",
    ],
  },
  {
    company: "Avenza",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHcRWxBb9-d1w/company-logo_100_100/B4DZeadOiVGkAQ-/0/1750643042830?e=1776297600&v=beta&t=cGVyxvJyX_zVrgoYySshhnXDn66Dcub1d7SHpA321_4",
    title: "CEO & Principal Engineer",
    type: "Self-employed",
    start: "Feb 2025",
    end: "Present",
    duration: "1 yr 2 mos",
    location: "Remote",
    intro:
      "Software consulting and product studio turning ideas into digital solutions. Lead client discovery, technical strategy, and hands-on development; head a team of four delivering AI-driven agents, computer vision systems, and scalable web platforms.",
    bullets: [
      {
        title: "AI & Computer Vision Agents",
        text: "Developed autonomous agents for computer vision analysis and delivery chatbots, streamlining logistics and operational workflows.",
      },
      {
        title: "AgTech Platform",
        text: "Architected a mission-control platform for agricultural drone pilots, integrating real-time telemetry and flight planning.",
      },
      {
        title: "Revenue & Scale",
        text: "Drove ~$2.8M USD in client revenue in 8 months through custom systems, analytics, and paid-traffic optimization.",
      },
    ],
  },
  {
    company: "Acorns",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQFPCL6sas4iAQ/company-logo_100_100/company-logo_100_100/0/1646339254391/acorns_grow_inc__logo?e=1776297600&v=beta&t=-YnzXB9QZrFCMPcRYzQ471Ry8YK2OapC7mJdGYHSN1Q",
    title: "Senior Software Engineer",
    type: "Full-time",
    start: "Jul 2025",
    end: "Mar 2026",
    duration: "9 mos",
    location: "California, United States · Remote",
    intro:
      "On the Servicing team, contributing to the migration from a Ruby on Rails monolith to Node.js microservices and React/Next.js microfrontends behind a GraphQL API gateway.",
    bullets: [
      {
        title: "Full-Stack Delivery",
        text: "Ship features and fixes across legacy (Ruby on Rails) and modern stacks (Node.js, React, Next.js), ensuring continuity during the platform migration.",
      },
      {
        title: "Internal Tooling & UI",
        text: "Build and maintain shared React components and GraphQL-driven admin tooling for support and operational workflows, improving consistency and developer efficiency.",
      },
      {
        title: "Technical Leadership",
        text: "Led spikes on ephemeral environments for PR testing and automated regression, enabling pre-merge validation and local development parity with CI/CD.",
      },
    ],
    note: "Worked as a contractor from ScrumLaunch",
  },
  {
    company: "MB Labs",
    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQEbg178hS_5cg/company-logo_100_100/B4DZvc.rwFHgAQ-/0/1768938978721/mblabs_logo?e=1776297600&v=beta&t=2umh1qVXiXS0pBdwqUfQ3GF7nWYLRb5JxXKziO7mBeQ",
    title: "Software Engineer",
    type: "Full-time",
    start: "Aug 2022",
    end: "Jul 2025",
    duration: "3 yrs",
    intro:
      "Led the architecture and development of scalable, high-performance products, optimizing cost-efficiency and driving innovation. Delivered cloud-native solutions, microservices, and system optimizations across content consumption, fintech, education, and supply chain industries.",
    bullets: [
      {
        title: "Cloud Infrastructure & Performance",
        text: "Developed robust AWS-based cloud infrastructure, leveraging Cloudflare Workers, CDNs, Redis caching, and scalable solutions to ensure low-latency, high-performance applications.",
      },
      {
        title: "Microservices & High-Availability",
        text: "Designed and implemented microservices architectures to power mission-critical applications, ensuring fault tolerance, scalability, and resilience.",
      },
      {
        title: "System Efficiency & Optimization",
        text: "Led optimization initiatives to minimize latency, reduce infrastructure costs, and streamline resource utilization.",
      },
      {
        title: "Technical Leadership",
        text: "Advised on technology stack selection, architectural best practices, and scalable design patterns to future-proof applications.",
      },
      {
        title: "Cross-Functional Collaboration",
        text: "Partnered with product teams, designers, and stakeholders to assess and incorporate emerging technologies into business solutions.",
      },
    ],
  },
  {
    company: "Mactus Informatica",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQGCs3fKdaM1uw/company-logo_100_100/company-logo_100_100/0/1639425407127/mactus_informatica_logo?e=1776297600&v=beta&t=vj2pu5EsDqTRnTqo_Ndbjwbz7RMha1haW_JZq_naytg",
    title: "Analyst / Software Engineer",
    type: "Full-time",
    start: "Jun 2021",
    end: "Jul 2022",
    duration: "1 yr 2 mos",
    location: "Campo Mourão, Paraná, Brazil",
    intro:
      "Full-stack software engineer specializing in architecting and delivering high-value software solutions. Focused on optimizing system performance, modernizing legacy systems, and driving product innovation.",
    bullets: [
      {
        title: "Cloud-Native Architecture",
        text: "Designed and deployed scalable cloud-native solutions, improving performance, maintainability, and cost-efficiency.",
      },
      {
        title: "Legacy System Modernization",
        text: "Led system overhauls, boosting efficiency and reliability while ensuring smooth transitions for critical applications.",
      },
      {
        title: "New Product Development",
        text: "Spearheaded high-impact software solutions, tackling complex technical challenges with cutting-edge architectures.",
      },
      {
        title: "System Stabilization",
        text: "Revitalized legacy applications, reinforcing stability, performance, and long-term sustainability.",
      },
    ],
  },
  {
    company: "ATLA Ensino",
    logo: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/7f/4e/a8/7f4ea8f2-f36a-0481-fb1c-55ce50f709e5/AppIcon-0-1x_U007epad-0-1-85-220-0.png/200x200ia-75.webp",
    title: "Intern / Full-Stack Developer",
    type: "Internship",
    start: "Dec 2020",
    end: "Jun 2021",
    duration: "7 mos",
    location: "Campo Mourão, Paraná, Brazil",
    intro:
      "Developed scalable back-office solutions and automated data extraction systems, reducing manual work and enhancing operational efficiency.",
    bullets: [
      {
        title: "Automated Data Processing",
        text: "Designed and implemented Python-based web scrapers that collected, processed, and structured 5,000+ records daily, significantly reducing manual intervention.",
      },
      {
        title: "API Development",
        text: "Developed and deployed RESTful APIs to optimize data workflows, improving data retrieval speed.",
      },
      {
        title: "Technical Documentation",
        text: "Authored detailed technical documentation, improving knowledge transfer, onboarding efficiency, and maintainability of internal systems.",
      },
      {
        title: "System Performance",
        text: "Collaborated with cross-functional teams to enhance software performance and ensure seamless integration of new features.",
      },
    ],
  },
  {
    company: "Haken — Empresa Júnior",
    title: "Fullstack Developer",
    type: "Contract",
    start: "Jul 2019",
    end: "Jan 2021",
    duration: "1 yr 7 mos",
    location: "Campo Mourão, Paraná, Brazil",
    intro:
      "Led cross-functional teams in delivering scalable web and mobile applications, driving high-quality development and on-time project execution.",
    bullets: [
      {
        title: "Project Management",
        text: "Successfully managed multiple projects, aligning technical roadmaps with business goals to maximize efficiency and impact.",
      },
      {
        title: "Cloud-Native Architecture",
        text: "Architected and deployed secure, high-performance cloud-native applications, optimizing for scalability, security, and cost-effectiveness.",
      },
      {
        title: "Agile & DevOps",
        text: "Spearheaded Agile methodologies and CI/CD practices, reducing deployment time by 50% and improving team collaboration.",
      },
      {
        title: "Custom CMS & Automation",
        text: "Designed and built custom content management solutions, increasing automation and reducing manual workload.",
      },
    ],
  },
];
