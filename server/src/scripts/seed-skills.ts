import { env } from "@/config/env";
import mongoose from "mongoose";
import { Skill } from "@/models/skill.model";

export const developerSkills = [
  // Frontend Frameworks & Libraries
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "Angular",
  "Svelte",
  "SvelteKit",
  "Solid.js",
  "Qwik",
  "Astro",
  "Remix",
  "Gatsby",
  "Ember.js",
  "Backbone.js",
  "Alpine.js",
  "Preact",
  "Lit",

  // Frontend Core Technologies
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "WebAssembly",
  "jQuery",

  // CSS Frameworks & Tools
  "Tailwind CSS",
  "Bootstrap",
  "Material UI",
  "Chakra UI",
  "Ant Design",
  "Shadcn/ui",
  "Radix UI",
  "Mantine",
  "Styled Components",
  "CSS Modules",
  "Sass",
  "SCSS",
  "Less",
  "PostCSS",
  "Emotion",
  "Vanilla Extract",

  // Backend Frameworks & Runtime
  "Node.js",
  "Express.js",
  "Nest.js",
  "Fastify",
  "Koa",
  "Hapi",
  "Adonis.js",
  "Deno",
  "Bun",

  // Python Frameworks
  "Django",
  "Flask",
  "FastAPI",
  "Pyramid",
  "Tornado",
  "Bottle",

  // Java/JVM Frameworks
  "Spring Boot",
  "Spring Framework",
  "Hibernate",
  "Micronaut",
  "Quarkus",
  "Play Framework",
  "Vert.x",

  // .NET Technologies
  ".NET",
  ".NET Core",
  "ASP.NET",
  "ASP.NET Core",
  "Blazor",
  "Entity Framework",
  "C#",

  // PHP Frameworks
  "Laravel",
  "Symfony",
  "CodeIgniter",
  "CakePHP",
  "Yii",
  "Slim",
  "Phalcon",

  // Ruby Frameworks
  "Ruby on Rails",
  "Sinatra",
  "Hanami",

  // Go Frameworks
  "Gin",
  "Echo",
  "Fiber",
  "Beego",
  "Revel",

  // Rust Frameworks
  "Actix",
  "Rocket",
  "Axum",
  "Warp",

  // Mobile Development
  "React Native",
  "Flutter",
  "Swift",
  "SwiftUI",
  "Kotlin",
  "Jetpack Compose",
  "Ionic",
  "Xamarin",
  "Cordova",
  "Capacitor",
  "Expo",

  // Databases - SQL
  "PostgreSQL",
  "MySQL",
  "MariaDB",
  "SQLite",
  "Microsoft SQL Server",
  "Oracle Database",
  "CockroachDB",

  // Databases - NoSQL
  "MongoDB",
  "Redis",
  "Cassandra",
  "DynamoDB",
  "Couchbase",
  "CouchDB",
  "Neo4j",
  "ArangoDB",
  "Firebase Realtime Database",
  "Firestore",

  // ORMs & Query Builders
  "Prisma",
  "TypeORM",
  "Sequelize",
  "Drizzle",
  "Mongoose",
  "Knex.js",
  "SQLAlchemy",
  "Eloquent",

  // Cloud Platforms
  "AWS",
  "Google Cloud Platform",
  "Microsoft Azure",
  "DigitalOcean",
  "Heroku",
  "Vercel",
  "Netlify",
  "Railway",
  "Render",
  "Fly.io",
  "Cloudflare",
  "Linode",
  "Vultr",

  // AWS Services
  "AWS Lambda",
  "AWS EC2",
  "AWS S3",
  "AWS RDS",
  "AWS DynamoDB",
  "AWS CloudFront",
  "AWS API Gateway",
  "AWS Cognito",
  "AWS ECS",
  "AWS EKS",

  // DevOps & CI/CD
  "Docker",
  "Kubernetes",
  "Jenkins",
  "GitHub Actions",
  "GitLab CI",
  "CircleCI",
  "Travis CI",
  "ArgoCD",
  "Terraform",
  "Ansible",
  "Chef",
  "Puppet",
  "Vagrant",
  "Helm",
  "Prometheus",
  "Grafana",
  "Nginx",
  "Apache",
  "Caddy",

  // Version Control
  "Git",
  "GitHub",
  "GitLab",
  "Bitbucket",
  "Mercurial",
  "SVN",

  // Testing Frameworks & Tools
  "Jest",
  "Vitest",
  "Mocha",
  "Chai",
  "Jasmine",
  "Cypress",
  "Playwright",
  "Selenium",
  "Puppeteer",
  "Testing Library",
  "Enzyme",
  "JUnit",
  "PyTest",
  "PHPUnit",
  "RSpec",
  "Postman",
  "Insomnia",

  // State Management
  "Redux",
  "Redux Toolkit",
  "MobX",
  "Zustand",
  "Recoil",
  "Jotai",
  "XState",
  "Context API",
  "Pinia",
  "Vuex",
  "NgRx",

  // API Technologies
  "REST API",
  "GraphQL",
  "Apollo",
  "tRPC",
  "gRPC",
  "WebSockets",
  "Socket.io",
  "JSON",
  "XML",
  "OpenAPI",
  "Swagger",

  // Authentication & Security
  "OAuth",
  "JWT",
  "Auth0",
  "Firebase Auth",
  "NextAuth",
  "Passport.js",
  "Keycloak",
  "Okta",

  // Real-time & Message Queues
  "Kafka",
  "RabbitMQ",
  "MQTT",
  "Apache Pulsar",
  "Redis Pub/Sub",
  "AWS SQS",
  "AWS SNS",

  // Search & Analytics
  "Elasticsearch",
  "Algolia",
  "Meilisearch",
  "Typesense",
  "Solr",

  // CMS & Headless CMS
  "WordPress",
  "Contentful",
  "Strapi",
  "Sanity",
  "Ghost",
  "Prismic",
  "Directus",
  "Payload CMS",

  // Build Tools & Bundlers
  "Webpack",
  "Vite",
  "Rollup",
  "Parcel",
  "esbuild",
  "Turbopack",
  "SWC",
  "Babel",
  "Gulp",
  "Grunt",

  // Package Managers
  "npm",
  "Yarn",
  "pnpm",
  "Bun",
  "pip",
  "Composer",
  "Maven",
  "Gradle",
  "NuGet",

  // Programming Languages
  "Python",
  "Java",
  "Kotlin",
  "Go",
  "Rust",
  "C",
  "C++",
  "PHP",
  "Ruby",
  "Scala",
  "Elixir",
  "Clojure",
  "Haskell",
  "Dart",
  "Swift",
  "Objective-C",
  "R",
  "Julia",
  "Lua",
  "Perl",

  // AI/ML & Data Science
  "TensorFlow",
  "PyTorch",
  "Keras",
  "scikit-learn",
  "Pandas",
  "NumPy",
  "Jupyter",
  "OpenAI API",
  "Langchain",
  "Langgraph",
  "Langfuse",
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Data Analysis",
  "Qdrant",

  // Blockchain & Web3
  "Solidity",
  "Ethereum",
  "Web3.js",
  "Ethers.js",
  "Smart Contracts",
  "Hardhat",
  "Truffle",

  // Game Development
  "Unity",
  "Unreal Engine",
  "Godot",
  "Phaser",
  "Three.js",
  "Babylon.js",
  "PixiJS",

  // Desktop Development
  "Electron",
  "Tauri",
  "Qt",
  "WPF",
  "WinForms",
  "GTK",

  // Other Tools & Technologies
  "Linux",
  "Bash",
  "PowerShell",
  "Vim",
  "VS Code",
  "IntelliJ IDEA",
  "Eclipse",
  "Xcode",
  "Android Studio",
  "Figma",
  "Adobe XD",
  "Sketch",
  "Jira",
  "Confluence",
  "Notion",
  "Slack",
  "Discord",
  "Agile",
  "Scrum",
  "Kanban",
  "Microservices",
  "Monorepo",
  "Serverless",
  "JAMstack",
  "Progressive Web Apps",
  "Responsive Design",
  "Accessibility",
  "SEO",
  "Performance Optimization",
  "Code Review",
  "Technical Writing",
  "System Design",
  "Design Patterns",
  "Data Structures",
  "Algorithms",
];

async function seedSkills() {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("MongoDB connected");

    const uniqueSkills = Array.from(new Set([...developerSkills]));
    const skillDocs = uniqueSkills.map((name) => ({ name }));
    const inserted = await Skill.insertMany(skillDocs);

    console.log(`Inserted ${inserted.length} skills`);

    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
  }
}

seedSkills();

// npx tsx .\src\scripts\seed-skills.ts
