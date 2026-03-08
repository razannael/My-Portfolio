import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    python,
    mongodb,
    git,
    figma,
    docker,
    bootstrap,
    anime,
    threejs,
    promtopia,
    apple,
    zoom,
    x,
    leetcode,
    linkedin,
    instegram,
    github1,
    youtube,
  } from "../assets";

  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "experience",
      title: "Experience",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  const services = [
    {
      title: "Full-Stack Engineer",
      icon: web,
    },
    {
      title: "Front-End Developer",
      icon: mobile,
    },
    {
      title: "Animation & GSAP",
      icon: backend,
    },
    {
      title: "QA & Testing",
      icon: creator,
    },
  ];

  const experiences = [
    {
      title: "Software Engineer",
      company_name: "ITG Software",
      icon: web,
      iconBg: "#383E56",
      date: "Mar 2025 – Present",
      location: "Nablus, Palestine",
      points: [
        "Maintain and enhance enterprise web platforms for US-based luxury hospitality clients (Leading Hotels of the World).",
        "Write and ship code for UI features, content updates, and bug fixes across multiple websites.",
        "Work with Sitecore and Contentful CMS platforms for publishing, QA, and content management.",
        "Communicate directly with US client stakeholders via email and Teams meetings.",
      ],
    },
    {
      title: "Front-End Developer",
      company_name: "STORYME",
      icon: mobile,
      iconBg: "#E6DEDD",
      date: "Jul 2024 – Mar 2025",
      location: "Ramallah, Palestine",
      points: [
        "Built interactive websites and digital experiences using Next.js, TypeScript, React, and Three.js.",
        "Developed the animated front-end for Jawwal (Palestine's largest telecom company).",
        "Implemented complex state management with Redux and Redux Saga.",
        "Delivered reusable component-based architectures for client projects.",
      ],
    },
    {
      title: "Freelance Front-End Developer",
      company_name: "Upwork",
      icon: creator,
      iconBg: "#383E56",
      date: "Aug 2024 – Feb 2025",
      location: "Remote",
      points: [
        "Delivered responsive client projects with React, TypeScript, and Tailwind CSS.",
        "Integrated REST APIs and built scalable component-based UIs.",
      ],
    },
  ];

  const technologies = [
    { name: "JavaScript", icon: javascript },
    { name: "TypeScript", icon: typescript },
    { name: "React JS", icon: reactjs },
    { name: "Next.js" },
    { name: "Angular" },
    { name: "Redux Toolkit", icon: redux },
    { name: "GSAP" },
    { name: "Tailwind CSS", icon: tailwind },
    { name: "Node JS", icon: nodejs },
    { name: "Python", icon: python },
    { name: "PostgreSQL" },
    { name: "MongoDB", icon: mongodb },
    { name: "AWS" },
    { name: "Docker", icon: docker },
    { name: "CI/CD" },
    { name: "CMS" },
    { name: "Three JS", icon: threejs },
    { name: "Git", icon: git },
    { name: "Figma", icon: figma },
    { name: "HTML 5", icon: html },
    { name: "CSS 3", icon: css },
    { name: "Bootstrap", icon: bootstrap },
  ];

  const projects = [
    {
      name: "RazoraAI",
      description:
        "AI-powered GitHub App that automatically reviews pull requests, flags bugs, security issues, and code quality problems with inline comments and fix suggestions. Built with FastAPI, async Python, and Claude AI. 56 tests with full CI/CD.",
      tags: [
        {
          name: "Python",
          color: "blue-text-gradient",
        },
        {
          name: "FastAPI",
          color: "green-text-gradient",
        },
        {
          name: "Claude AI",
          color: "pink-text-gradient",
        },
        {
          name: "GitHub API",
          color: "orange-text-gradient",
        },
      ],
      image: "/razoraAi.png",
      source_code_link: "https://github.com/razannael/RazoraAI",
    },
    {
      name: "Vanta Auto Studio",
      description:
        "Professional business website for a premium automotive detailing studio in Virginia. Features cinematic scroll animations, smooth page transitions, service showcases, and a polished UI built with React, TypeScript, GSAP, and Framer Motion.",
      tags: [
        {
          name: "React",
          color: "blue-text-gradient",
        },
        {
          name: "TypeScript",
          color: "green-text-gradient",
        },
        {
          name: "GSAP",
          color: "pink-text-gradient",
        },
        {
          name: "Framer Motion",
          color: "orange-text-gradient",
        },
      ],
      image: "/Vanta.png",
      source_code_link: "https://vantaautostudio.com/",
    },
    {
      name: "Full Stack Zoom Clone",
      description:
        "A video conferencing platform built with Next.js and TypeScript. Secure, real-time meetings with features like screen sharing and recording. Powered by Clerk, getstream, shadcn, and Tailwind CSS.",
      tags: [
        {
          name: "Next.js",
          color: "blue-text-gradient",
        },
        {
          name: "TypeScript",
          color: "pink-text-gradient",
        },
        {
          name: "Clerk",
          color: "green-text-gradient",
        },
      ],
      image: zoom,
      source_code_link: "https://github.com/razannael/Full-Stack-Zoom-Clone",
    },
    {
      name: "Apple Website Clone",
      description:
        "Combines GSAP for fluid animations, 3D model rendering, and a bespoke video carousel, promising an immersive user journey across devices. Utilizing React.js, Three.js, and GSAP for seamless responsiveness.",
      tags: [
        {
          name: "React.js",
          color: "blue-text-gradient",
        },
        {
          name: "Three.js",
          color: "pink-text-gradient",
        },
        {
          name: "GSAP",
          color: "green-text-gradient",
        },
      ],
      image: apple,
      source_code_link: "https://github.com/razannael/Apple-Website",
    },
    {
      name: "Jawwal Telecom",
      description:
        "Animated front-end experience for Palestine's largest telecom company. Modern web animation techniques, smooth UI interactions, and visual storytelling built with Next.js and React.",
      tags: [
        {
          name: "Next.js",
          color: "blue-text-gradient",
        },
        {
          name: "React",
          color: "green-text-gradient",
        },
        {
          name: "Animations",
          color: "pink-text-gradient",
        },
      ],
      image: "/Jawwal.png",
      source_code_link: "https://github.com/razannael/jawwal",
    },
    {
      name: "Anime Explorer",
      description:
        "A sleek anime movie explorer powered by Next.js, TypeScript, and Framer Motion. Endless anime adventures with seamless server-side rendering, server actions, infinite scroll, and slick animations.",
      tags: [
        {
          name: "Next.js",
          color: "blue-text-gradient",
        },
        {
          name: "TypeScript",
          color: "green-text-gradient",
        },
        {
          name: "Framer Motion",
          color: "pink-text-gradient",
        },
      ],
      image: anime,
      source_code_link: "https://github.com/razannael/Anime-Explorer",
    },
    {
      name: "FullStack Promptopia",
      description:
        "An innovative full-stack application utilizing Next.js, Node.js, MongoDB, and Tailwind CSS, offering Google authentication, personalized prompt management, and a collaborative platform for discovering prompts.",
      tags: [
        {
          name: "Next.js",
          color: "green-text-gradient",
        },
        {
          name: "MongoDB",
          color: "pink-text-gradient",
        },
        {
          name: "Node.js",
          color: "blue-text-gradient",
        },
      ],
      image: promtopia,
      source_code_link: "https://github.com/razannael/FullStack-Promptopia",
    },
  ];

  const platforms = [
    {
      name: "GitHub",
      icon: github1,
      link: "https://github.com/razannael",
    },
    {
      name: "X",
      icon: x,
      link: "https://twitter.com/eng_rozzah",
    },
    {
      name: "Instagram",
      icon: instegram,
      link: "https://www.instagram.com/razan.n.t/",
    },
    {
      name: "LeetCode",
      icon: leetcode,
      link: "https://leetcode.com/ra_zan/",
    },
    {
      name: "LinkedIn",
      icon: linkedin,
      link: "https://www.linkedin.com/in/razan-tohimer/",
    },
    {
      name: "YouTube",
      icon: youtube,
      link: "https://www.youtube.com/@CodewithRazan",
    },
  ];

  export { services, technologies, experiences, projects, platforms };
