import { p } from "maath/dist/misc-19a3ec46.esm.js";
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
    ecommerce,
    todo,
    anime,
    threejs,
    vtravel,
    weather,
    dashboard,
    promtopia,
    advice,
    x,
    leetcode,
    linkedin,
    instegram,
    github1
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Next JS Developer",
      icon: backend,
    },
    {
      title: "React JS Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "React Native Developer",
      icon: mobile,
    },
    {
      title: "Problem Solver",
      icon: creator,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
     {
       name: "TypeScript",
      icon: typescript,
     },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },{
       name : "Bootstrap",
       icon: bootstrap,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    // {
    //   name: "Three JS",
    //   icon: threejs,
    // },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "Python",
      icon:python
    }
    // {
    //   name: "docker",
    //   icon: docker,
    // },
  ];
  

  const projects = [
    {
      name: "Anime Explorer",
      description:
        "Anime Vault is a sleek and snazzy anime movie explorer powered by Next.js, TypeScript, and Framer Motion. Dive into a universe of endless anime adventures with seamless server-side rendering, server actions, infinite scroll, and slick animations!",
      tags: [
        {
          name: "next.js",
          color: "blue-text-gradient",
        },
        {
          name: "tailwindcss",
          color: "green-text-gradient",
        },
        {
          name: "typescript",
          color: "pink-text-gradient",
        },
      ],
      image: anime,
      source_code_link: "https://github.com/razannael/Anime-Explorer",
    },
    {
      name: "E-commerce",
      description:
        "Web-based platform that allows users to shop conveniently online. Explore a diverse range of products and enjoy seamless transactions for an effortless shopping experience.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        // {
        //   name: "",
        //   color: "green-text-gradient",
        // },
        {
          name: "Bootstrap",
          color: "pink-text-gradient",
        },
      ],
      image: ecommerce,
      source_code_link: "https://github.com/razannael/Ecommerce-React",
    },
    {
      name: "Todo App",
      description:
        "This app is a ToDo List web app with React and Redux. Users can add, edit, delete, and categorize tasks, and see their progress. The app has a user-friendly design with a purple theme and icons.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        // {
        //   name: "restapi",
        //   color: "green-text-gradient",
        // },
        {
          name: "redux",
          color: "pink-text-gradient",
        },
      ],
      image: todo,
      source_code_link: "https://github.com/razannael/TodoList-React",
    },
    {
      name: "V-Travel",
      description:
        "V-Travel is a website that offers tours to scenic destinations around the world. It features a clean and attractive interface, a stunning background image, and a prominent button to book a tour.",
      tags: [
        // {
        //   name: "html",
        //   color: "blue-text-gradient",
        // },{
        //   name: "css",
        //   color: "pink-text-gradient"
        // },
        {
          name: "Bootstrap",
          color: "green-text-gradient",
        },
        {
          name: "JavaScript",
          color: "pink-text-gradient",
        },{
          name: "JQuery",
          color: "blue-text-gradient",
        }
      ],
      image: vtravel,
      source_code_link: "https://github.com/razannael/V-Travel",
    },
    {
      name: "Weather App",
      description:
        "weather app made with JavaScript, CSS, and HTML,  JQuery and bootstarp, showing current forecasts instantly. Its easy design makes it simple to check the weather quickly, helping you plan your day with accurate updates.",
      tags: [
        {
          name: "html",
          color: "blue-text-gradient",
        },{
          name: "css",
          color: "pink-text-gradient"
        },
        {
          name: "Bootstrap",
          color: "green-text-gradient",
        },
        {
          name: "JavaScript",
          color: "pink-text-gradient",
        }
      ],
      image: weather,
      source_code_link: "https://github.com/razannael/Weather-App",
    },
    {
      name: "Admin Dashoard",
      description:
        "A feature-rich admin dashboard using React, integrating Syncfusion for dynamic charts and components, and incorporating functionalities like dark mode, theme customization, and seamless navigation.",
      tags: [
        {
          name: "react",
          color: "green-text-gradient",
        },
        {
          name: "tailwind CSS",
          color: "blue-text-gradient",
        },
        {
          name: "JavaScript",
          color: "pink-text-gradient",
        },{
          name: "Syncfusion",
          color: "blue-text-gradient",
        }
      ],
      image: dashboard,
      source_code_link: "https://github.com/razannael/React-Admin-Dashboard",
    },
    {
      name: "FullStack Promtopia",
      description:
        "An innovative full-stack application utilizing Next.js, Node.js, MongoDB, and Tailwind CSS, offering Google authentication, personalized prompt management, and a collaborative platform for users to discover and edit a diverse array of prompts.",
      tags: [
        {
          name: "Next js",
          color: "green-text-gradient",
        },
        {
          name: "tailwind CSS",
          color: "blue-text-gradient",
        },
        {
          name: "Mongo DB",
          color: "pink-text-gradient",
        },{
          name: "Node js",
          color: "blue-text-gradient",
        }
      ],
      image: promtopia,
      source_code_link: "https://github.com/razannael/FullStack-Promptopia",
    },
    {
      name: "Advice App",
      description:
        "A sleek quotes generator crafted with React, featuring a minimalist design powered by Tailwind CSS for a seamless, aesthetic experience.",
      tags: [
        {
          name: "react",
          color: "green-text-gradient",
        },
        {
          name: "tailwind CSS",
          color: "blue-text-gradient",
        },
        {
          name: "JavaScript",
          color: "pink-text-gradient",
        }
      ],
      image: advice,
      source_code_link: "https://github.com/razannael/Advice-App",
    },
  ];
  
const platforms =[
  {
    name: "Github",
    icon: github1,
    link: "https://github.com/razannael"
  },
  {
    name: "x",
    icon: x,
    link: "https://twitter.com/eng_rozzah"
  },
  {
    name: "instegram",
    icon: instegram,
    link: "https://www.instagram.com/razan.n.t/"
  },
  {
    name: "leetcode",
    icon: leetcode,
    link: "https://leetcode.com/ra_zan/"
  },
  {
    name: "linkedin",
    icon: linkedin,
    link: "https://www.linkedin.com/in/razan-tuhaimer/"
  },
]
  export { services, technologies, projects ,platforms};