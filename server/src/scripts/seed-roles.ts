import { env } from "@/config/env";
import mongoose from "mongoose";
import { Role } from "@/models/role.schema";

export const developerRoles = [
  // Frontend Roles
  "Frontend Developer",
  "Frontend Engineer",
  "UI Developer",
  "React Developer",
  "Vue Developer",
  "Angular Developer",

  // Backend Roles
  "Backend Developer",
  "Backend Engineer",
  "Node.js Developer",
  "Python Developer",
  "Java Developer",
  "PHP Developer",
  "Ruby Developer",
  "Go Developer",
  ".NET Developer",

  // Full Stack
  "Full Stack Developer",
  "Full Stack Engineer",
  "MERN Stack Developer",
  "MEAN Stack Developer",
  "Full Stack GenAI Developer",

  // Mobile
  "Mobile Developer",
  "iOS Developer",
  "Android Developer",
  "React Native Developer",
  "Flutter Developer",
  "Mobile App Developer",

  // DevOps & Infrastructure
  "DevOps Engineer",
  "Site Reliability Engineer (SRE)",
  "Platform Engineer",
  "Cloud Engineer",
  "Infrastructure Engineer",
  "Systems Engineer",
  "Build & Release Engineer",

  // Data & AI/ML
  "Data Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "ML Ops Engineer",
  "Data Analyst",
  "Big Data Engineer",

  // Specialized Engineering
  "Software Engineer",
  "Software Developer",
  "Application Developer",
  "Solutions Engineer",
  "Systems Developer",
  "Embedded Systems Engineer",
  "Firmware Engineer",

  // Architecture & Leadership
  "Software Architect",
  "Solutions Architect",
  "Cloud Architect",
  "Enterprise Architect",
  "Technical Architect",
  "Principal Engineer",
  "Staff Engineer",
  "Distinguished Engineer",

  // QA & Testing
  "QA Engineer",
  "Test Engineer",
  "Automation Engineer",
  "SDET (Software Development Engineer in Test)",
  "Quality Assurance Developer",
  "Performance Engineer",

  // Security
  "Security Engineer",
  "Application Security Engineer",
  "DevSecOps Engineer",
  "Cybersecurity Engineer",
  "Penetration Tester",
  "Security Analyst",

  // Game Development
  "Game Developer",
  "Unity Developer",
  "Unreal Engine Developer",
  "Game Engine Developer",
  "Graphics Programmer",

  // Web3 & Blockchain
  "Blockchain Developer",
  "Smart Contract Developer",
  "Web3 Developer",
  "Solidity Developer",
  "Crypto Developer",

  // Design & UI/UX
  "UI/UX Engineer",
  "Design Engineer",
  "Creative Technologist",
  "Frontend Designer",

  // Database & Data
  "Database Developer",
  "Database Administrator (DBA)",
  "Database Engineer",
  "SQL Developer",

  // API & Integration
  "API Developer",
  "Integration Engineer",
  "Middleware Developer",
  "Backend API Developer",

  // Emerging Tech
  "AR/VR Developer",
  "IoT Developer",
  "Robotics Engineer",
  "Quantum Computing Engineer",

  // Management & Leadership
  "Engineering Manager",
  "Technical Lead",
  "Team Lead",
  "CTO",
  "VP of Engineering",
  "Director of Engineering",

  // Other Specialized
  "WordPress Developer",
  "Shopify Developer",
  "Salesforce Developer",
  "SAP Developer",
  "Workday Developer",
  "Low-Code Developer",
  "No-Code Developer",
  "Freelance Developer",
  "Indie Developer",
  "Open Source Developer",
];

async function seedRoles() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");

    const uniqueRoles = Array.from(new Set([...developerRoles]));
    const skillDocs = uniqueRoles.map((name) => ({ name }));
    const inserted = await Role.insertMany(skillDocs);

    console.log(`Inserted ${inserted.length} roles`);

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
  }
}

seedRoles();

// npx tsx .\src\scripts\seed-roles.ts
