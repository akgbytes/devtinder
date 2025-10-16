const generateDOB = () => {
  const now = new Date();
  const minAge = 18;
  const maxAge = 35;

  const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;

  const maxDOB = new Date(
    now.getFullYear() - minAge,
    now.getMonth(),
    now.getDate()
  );
  const minDOB = new Date(
    now.getFullYear() - maxAge,
    now.getMonth(),
    now.getDate()
  );

  const randomDOB = new Date(
    minDOB.getTime() + Math.random() * (maxDOB.getTime() - minDOB.getTime())
  );

  return randomDOB;
};

const names = {
  male: [
    "Arnav Deshmukh",
    "Devraj Sinha",
    "Kiran Reddy",
    "Shivam Ghosh",
    "Madhav Iyer",
    "Ayaan Kapoor",
    "Ishaan Verma",
    "Nitesh Pillai",
    "Rohil Malhotra",
    "Harsh Taneja",
    "Vikram Shetty",
    "Anshul Sharma",
    "Krishna Bhat",
    "Jayant Patel",
    "Ritesh Nambiar",
    "Chaitanya Rao",
    "Saurabh Khanna",
    "Lakshit Mehra",
    "Ronav Joshi",
    "Advik Chatterjee",
    "Tarun Dubey",
    "Anirudh Raina",
    "Vihan Agarwal",
    "Samar Das",
    "Kailash Chauhan",
    "Neel Vora",
    "Om Singh",
    "Kartikeya Goyal",
    "Rajdeep Sharma",
    "Hrishikesh Naidu",
    "Dev Dey",
    "Aryan Paul",
    "Sanket Kulkarni",
    "Vivek Bhardwaj",
    "Naman Gupta",
    "Rajiv Menon",
    "Rudra Tiwari",
    "Piyush Basu",
    "Abhishek Nanda",
    "Harendra Chauhan",
    "Manav Krishnan",
    "Pratik Solanki",
    "Rohin Sethi",
    "Tej Joshi",
    "Amitesh Patel",
    "Dheeraj Raghavan",
    "Soham Pillai",
    "Ranjit Bansal",
    "Vishal Chawla",
    "Akash Mahajan",
    "Arvind Jain",
    "Aarav Sharma",
    "Rohan Mehta",
    "Karthik Reddy",
    "Arjun Nair",
    "Devansh Bansal",
    "Manish Chauhan",
    "Siddharth Malhotra",
    "Rahul Deshmukh",
    "Amit Khanna",
    "Varun Yadav",
    "Aditya Roy",
    "Nikhil Sharma",
    "Vivek Pandey",
    "Rajat Tiwari",
    "Rakesh Kumar",
    "Sahil Kapoor",
    "Harshad Joshi",
    "Parth Bhatia",
    "Abhinav Goyal",
    "Rajeev Raina",
    "Arnav Khurana",
    "Kunal Chatterjee",
    "Ishan Saxena",
    "Yash Chauhan",
    "Omkar Patil",
    "Ritvik Anand",
    "Tushar Jha",
    "Aman Raj",
    "Laksh Mittal",
    "Pranav Sinha",
    "Rohit Chatterjee",
    "Hriday Kulkarni",
    "Deepak Solanki",
    "Keshav Mishra",
    "Ayush Shetty",
    "Gaurav Bhattacharya",
    "Rohan Pathak",
    "Aviral Bhatnagar",
    "Nirav Desai",
    "Chirag Jain",
    "Mohit Arora",
    "Sameer Grover",
    "Viraj Iyer",
    "Dhruv Khatri",
    "Aniket Pillai",
    "Tejas Menon",
    "Harshit Rana",
    "Adarsh Dubey",
    "Kabir Oberoi",
    "Tanuj Chawla",
  ],
  female: [
    "Anushka Nair",
    "Ira Khurana",
    "Tanishka Reddy",
    "Sia Kapoor",
    "Nisha Sinha",
    "Ahana Chatterjee",
    "Krisha Mehra",
    "Meenal Agarwal",
    "Anvi Desai",
    "Avisha Iyer",
    "Reetika Sharma",
    "Kashish Bhatia",
    "Vaidehi Rao",
    "Sanjana Pillai",
    "Mahima Dutta",
    "Ishaani Khanna",
    "Pallavi Joshi",
    "Ritika Nambiar",
    "Suhana Lal",
    "Diya Krishnan",
    "Aarushi Patel",
    "Maitri Ghosh",
    "Chhavi Chauhan",
    "Samaira Das",
    "Nivedita Reddy",
    "Prisha Vora",
    "Bhavya Kapoor",
    "Gauri Malhotra",
    "Anaya Menon",
    "Harini Suresh",
    "Ekta Sharma",
    "Tanisha Mehta",
    "Triveni Deshmukh",
    "Aarini Joshi",
    "Roshika Bansal",
    "Lavina Dey",
    "Misha Krishnan",
    "Snehal Shetty",
    "Vidhi Chopra",
    "Avika Shah",
    "Niyati Pillai",
    "Tara Nambiar",
    "Rhea Kapoor",
    "Vritika Iyer",
    "Poonam Dubey",
    "Manisha Basu",
    "Kavisha Jain",
    "Myra Solanki",
    "Nimisha Goyal",
    "Shaina Fernandes",
    "Amaya Deshpande",
    "Priya Patel",
    "Isha Gupta",
    "Neha Verma",
    "Sanya Singh",
    "Ananya Iyer",
    "Tanya Kapoor",
    "Meera Joshi",
    "Sneha Nair",
    "Kavya Menon",
    "Ritika Agarwal",
    "Pooja Sethi",
    "Simran Kaur",
    "Ayesha Khan",
    "Mitali Rao",
    "Rhea D’Souza",
    "Anjali Bhatt",
    "Divya Sharma",
    "Ira Mahajan",
    "Sneha Pillai",
    "Tanvi Das",
    "Mira Fernandes",
    "Diya Narang",
    "Aarohi Vora",
    "Naina Malhotra",
    "Kiara Kapoor",
    "Aditi Joshi",
    "Ishita Bhatia",
    "Riddhi Shah",
    "Suhani Deshpande",
    "Avni Chopra",
    "Myra Khanna",
    "Tara Dey",
    "Janhvi Ghosh",
    "Nikita Bajaj",
    "Charvi Reddy",
    "Lavanya Krishnan",
    "Manvi Sood",
    "Esha Pillai",
    "Shreya Anand",
    "Roshni Lal",
    "Aaradhya Sharma",
    "Muskan Parekh",
    "Trisha Mehta",
    "Vanya Chawla",
    "Diya Kapoor",
    "Aalia Khan",
    "Kriti Nambiar",
    "Bhavna Iyer",
    "Navya Suri",
    "Niharika Dutta",
  ],
};

const abouts = [
  "Full-stack developer who loves building tools that make life easier.",
  "Turning coffee into clean code and complex APIs ☕💻",
  "Passionate about frontend architecture and great UX.",
  "Backend engineer obsessed with scalability and clean design.",
  "Exploring AI integrations and NLP for next-gen products.",
  "I build web apps that are fast, secure, and beautiful.",
  "Code, design, and debugging — in that exact order.",
  "Constantly learning new tech and pushing code to production 🚀",
  "Frontend wizard with a knack for animations and interactivity.",
  "Building digital products that solve real-world problems.",
  "Love simplifying complex systems and mentoring junior devs.",
  "Working on cloud-native apps and open-source projects.",
  "I’m a lifelong learner with a passion for elegant code.",
  "Creating scalable APIs and contributing to open source.",
  "Focused on clean architecture and well-tested codebases.",
  "Lover of TypeScript, Tailwind, and modern frontend stacks.",
  "Experimenting with LangChain and AI-driven chatbots 🤖",
  "Tech explorer passionate about Web3 and blockchain apps.",
  "Mobile developer crafting cross-platform experiences.",
  "From hackathons to production — I just love to build.",
  "Believer in minimalism, testing, and great documentation.",
  "I enjoy solving hard problems and learning from great devs.",
  "Turning product ideas into reality with React and Node.",
  "Open-source contributor and JavaScript nerd 💛",
  "Currently exploring AI-assisted code generation tools.",
  "I love pairing good UI with solid backend logic.",
  "Automating workflows and building internal tools for devs.",
  "Focused on performance optimization and developer experience.",
  "Working on scalable backend systems with microservices.",
  "Frontend engineer with strong eye for design and usability.",
  "Always up for refactoring legacy code into something elegant.",
  "Passionate about AI, chatbots, and next-gen tech stacks.",
  "DevOps enthusiast bringing stability to fast-moving startups.",
  "Full-stack problem solver with a product-first mindset.",
  "MERN stack developer who loves fast-paced projects.",
  "Currently exploring Next.js, server actions, and React 19.",
  "I code, I learn, I teach — and repeat every single day.",
  "Focused on accessibility, speed, and user happiness.",
  "I build apps that scale and code that reads like poetry.",
  "Backend-focused engineer who loves debugging challenges.",
  "I believe clean code and good design are two sides of the same coin.",
  "Developer by profession, builder by passion.",
  "Exploring AI agents and real-time collaboration tools.",
  "Frontend dev turning design ideas into pixel-perfect reality.",
  "Machine learning hobbyist, web developer by day.",
  "Building modern web apps using the latest JavaScript frameworks.",
  "Passionate about performance, accessibility, and clean UI.",
  "Crafting user experiences that just feel right.",
  "Coding is my art form, and GitHub is my gallery.",
  "Always improving, always shipping 🚀",
];

const cities = [
  {
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    coords: [77.5946, 12.9716],
  },
  {
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    coords: [72.8777, 19.076],
  },
  {
    city: "Delhi",
    state: "Delhi",
    country: "India",
    coords: [77.1025, 28.7041],
  },
  {
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    coords: [78.4867, 17.385],
  },
  {
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    coords: [80.2707, 13.0827],
  },
  {
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    coords: [73.8567, 18.5204],
  },
  {
    city: "Kolkata",
    state: "West Bengal",
    country: "India",
    coords: [88.3639, 22.5726],
  },
  {
    city: "Ahmedabad",
    state: "Gujarat",
    country: "India",
    coords: [72.5714, 23.0225],
  },
  {
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    coords: [75.7873, 26.9124],
  },
  {
    city: "Lucknow",
    state: "Uttar Pradesh",
    country: "India",
    coords: [80.9462, 26.8467],
  },
  {
    city: "Indore",
    state: "Madhya Pradesh",
    country: "India",
    coords: [75.8577, 22.7196],
  },
  {
    city: "Chandigarh",
    state: "Chandigarh",
    country: "India",
    coords: [76.7794, 30.7333],
  },
  {
    city: "Bhopal",
    state: "Madhya Pradesh",
    country: "India",
    coords: [77.4126, 23.2599],
  },
  {
    city: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    coords: [76.9558, 11.0168],
  },
  {
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    country: "India",
    coords: [83.2185, 17.6868],
  },
  {
    city: "Surat",
    state: "Gujarat",
    country: "India",
    coords: [72.8311, 21.1702],
  },
  {
    city: "Nagpur",
    state: "Maharashtra",
    country: "India",
    coords: [79.0882, 21.1458],
  },
  {
    city: "Kanpur",
    state: "Uttar Pradesh",
    country: "India",
    coords: [80.3319, 26.4499],
  },
  {
    city: "Patna",
    state: "Bihar",
    country: "India",
    coords: [85.1376, 25.5941],
  },
  {
    city: "Thiruvananthapuram",
    state: "Kerala",
    country: "India",
    coords: [76.9366, 8.5241],
  },
  {
    city: "Gurugram",
    state: "Haryana",
    country: "India",
    coords: [77.0266, 28.4595],
  },
  {
    city: "Noida",
    state: "Uttar Pradesh",
    country: "India",
    coords: [77.391, 28.5355],
  },
  { city: "Goa", state: "Goa", country: "India", coords: [73.8567, 15.2993] },
  {
    city: "Kochi",
    state: "Kerala",
    country: "India",
    coords: [76.2673, 9.9312],
  },
  {
    city: "Vijayawada",
    state: "Andhra Pradesh",
    country: "India",
    coords: [80.648, 16.5062],
  },
  {
    city: "Guwahati",
    state: "Assam",
    country: "India",
    coords: [91.7362, 26.1445],
  },
  {
    city: "Mysuru",
    state: "Karnataka",
    country: "India",
    coords: [76.6394, 12.2958],
  },
  {
    city: "Ranchi",
    state: "Jharkhand",
    country: "India",
    coords: [85.3096, 23.3441],
  },
  {
    city: "Raipur",
    state: "Chhattisgarh",
    country: "India",
    coords: [81.6296, 21.2514],
  },
  {
    city: "Dehradun",
    state: "Uttarakhand",
    country: "India",
    coords: [78.0322, 30.3165],
  },

  {
    city: "Toronto",
    state: "Ontario",
    country: "Canada",
    coords: [-79.3832, 43.6532],
  },
  {
    city: "New York",
    state: "New York",
    country: "USA",
    coords: [-74.006, 40.7128],
  },
  {
    city: "San Francisco",
    state: "California",
    country: "USA",
    coords: [-122.4194, 37.7749],
  },
  {
    city: "Seattle",
    state: "Washington",
    country: "USA",
    coords: [-122.3321, 47.6062],
  },
  {
    city: "Austin",
    state: "Texas",
    country: "USA",
    coords: [-97.7431, 30.2672],
  },
  {
    city: "Los Angeles",
    state: "California",
    country: "USA",
    coords: [-118.2437, 34.0522],
  },
  {
    city: "Chicago",
    state: "Illinois",
    country: "USA",
    coords: [-87.6298, 41.8781],
  },
  {
    city: "London",
    state: "England",
    country: "UK",
    coords: [-0.1276, 51.5072],
  },
  {
    city: "Berlin",
    state: "Berlin",
    country: "Germany",
    coords: [13.405, 52.52],
  },
  {
    city: "Amsterdam",
    state: "North Holland",
    country: "Netherlands",
    coords: [4.9041, 52.3676],
  },
  {
    city: "Paris",
    state: "Île-de-France",
    country: "France",
    coords: [2.3522, 48.8566],
  },
  {
    city: "Dublin",
    state: "Leinster",
    country: "Ireland",
    coords: [-6.2603, 53.3498],
  },
  {
    city: "Stockholm",
    state: "Stockholm",
    country: "Sweden",
    coords: [18.0686, 59.3293],
  },
  {
    city: "Singapore",
    state: "Central Region",
    country: "Singapore",
    coords: [103.8198, 1.3521],
  },
  {
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    coords: [151.2093, -33.8688],
  },
  {
    city: "Melbourne",
    state: "Victoria",
    country: "Australia",
    coords: [144.9631, -37.8136],
  },
  {
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    coords: [139.6917, 35.6895],
  },
  {
    city: "Seoul",
    state: "Seoul",
    country: "South Korea",
    coords: [126.978, 37.5665],
  },
  { city: "Dubai", state: "Dubai", country: "UAE", coords: [55.2708, 25.2048] },
  {
    city: "Hong Kong",
    state: "Hong Kong",
    country: "China",
    coords: [114.1694, 22.3193],
  },
];

const skills = [
  {
    name: "React",
    _id: "68ebe9eee56be7d4db6a1e64",
  },
  {
    name: "Next.js",
    _id: "68ebe9eee56be7d4db6a1e65",
  },
  {
    name: "Vue.js",
    _id: "68ebe9eee56be7d4db6a1e66",
  },
  {
    name: "Nuxt.js",
    _id: "68ebe9eee56be7d4db6a1e67",
  },
  {
    name: "Angular",
    _id: "68ebe9eee56be7d4db6a1e68",
  },
  {
    name: "Svelte",
    _id: "68ebe9eee56be7d4db6a1e69",
  },
  {
    name: "SvelteKit",
    _id: "68ebe9eee56be7d4db6a1e6a",
  },
  {
    name: "Solid.js",
    _id: "68ebe9eee56be7d4db6a1e6b",
  },
  {
    name: "Qwik",
    _id: "68ebe9eee56be7d4db6a1e6c",
  },
  {
    name: "Astro",
    _id: "68ebe9eee56be7d4db6a1e6d",
  },
  {
    name: "Remix",
    _id: "68ebe9eee56be7d4db6a1e6e",
  },
  {
    name: "Gatsby",
    _id: "68ebe9eee56be7d4db6a1e6f",
  },
  {
    name: "Ember.js",
    _id: "68ebe9eee56be7d4db6a1e70",
  },
  {
    name: "Backbone.js",
    _id: "68ebe9eee56be7d4db6a1e71",
  },
  {
    name: "Alpine.js",
    _id: "68ebe9eee56be7d4db6a1e72",
  },
  {
    name: "Preact",
    _id: "68ebe9eee56be7d4db6a1e73",
  },
  {
    name: "Lit",
    _id: "68ebe9eee56be7d4db6a1e74",
  },
  {
    name: "HTML",
    _id: "68ebe9eee56be7d4db6a1e75",
  },
  {
    name: "CSS",
    _id: "68ebe9eee56be7d4db6a1e76",
  },
  {
    name: "JavaScript",
    _id: "68ebe9eee56be7d4db6a1e77",
  },
  {
    name: "TypeScript",
    _id: "68ebe9eee56be7d4db6a1e78",
  },
  {
    name: "WebAssembly",
    _id: "68ebe9eee56be7d4db6a1e79",
  },
  {
    name: "jQuery",
    _id: "68ebe9eee56be7d4db6a1e7a",
  },
  {
    name: "Tailwind CSS",
    _id: "68ebe9eee56be7d4db6a1e7b",
  },
  {
    name: "Bootstrap",
    _id: "68ebe9eee56be7d4db6a1e7c",
  },
  {
    name: "Material UI",
    _id: "68ebe9eee56be7d4db6a1e7d",
  },
  {
    name: "Chakra UI",
    _id: "68ebe9eee56be7d4db6a1e7e",
  },
  {
    name: "Ant Design",
    _id: "68ebe9eee56be7d4db6a1e7f",
  },
  {
    name: "Shadcn/ui",
    _id: "68ebe9eee56be7d4db6a1e80",
  },
  {
    name: "Radix UI",
    _id: "68ebe9eee56be7d4db6a1e81",
  },
  {
    name: "Mantine",
    _id: "68ebe9eee56be7d4db6a1e82",
  },
  {
    name: "Styled Components",
    _id: "68ebe9eee56be7d4db6a1e83",
  },
  {
    name: "CSS Modules",
    _id: "68ebe9eee56be7d4db6a1e84",
  },
  {
    name: "Sass",
    _id: "68ebe9eee56be7d4db6a1e85",
  },
  {
    name: "SCSS",
    _id: "68ebe9eee56be7d4db6a1e86",
  },
  {
    name: "Less",
    _id: "68ebe9eee56be7d4db6a1e87",
  },
  {
    name: "PostCSS",
    _id: "68ebe9eee56be7d4db6a1e88",
  },
  {
    name: "Emotion",
    _id: "68ebe9eee56be7d4db6a1e89",
  },
  {
    name: "Vanilla Extract",
    _id: "68ebe9eee56be7d4db6a1e8a",
  },
  {
    name: "Node.js",
    _id: "68ebe9eee56be7d4db6a1e8b",
  },
  {
    name: "Express.js",
    _id: "68ebe9eee56be7d4db6a1e8c",
  },
  {
    name: "Nest.js",
    _id: "68ebe9eee56be7d4db6a1e8d",
  },
  {
    name: "Fastify",
    _id: "68ebe9eee56be7d4db6a1e8e",
  },
  {
    name: "Koa",
    _id: "68ebe9eee56be7d4db6a1e8f",
  },
  {
    name: "Hapi",
    _id: "68ebe9eee56be7d4db6a1e90",
  },
  {
    name: "Adonis.js",
    _id: "68ebe9eee56be7d4db6a1e91",
  },
  {
    name: "Deno",
    _id: "68ebe9eee56be7d4db6a1e92",
  },
  {
    name: "Bun",
    _id: "68ebe9eee56be7d4db6a1e93",
  },
  {
    name: "Django",
    _id: "68ebe9eee56be7d4db6a1e94",
  },
  {
    name: "Flask",
    _id: "68ebe9eee56be7d4db6a1e95",
  },
  {
    name: "FastAPI",
    _id: "68ebe9eee56be7d4db6a1e96",
  },
  {
    name: "Pyramid",
    _id: "68ebe9eee56be7d4db6a1e97",
  },
  {
    name: "Tornado",
    _id: "68ebe9eee56be7d4db6a1e98",
  },
  {
    name: "Bottle",
    _id: "68ebe9eee56be7d4db6a1e99",
  },
  {
    name: "Spring Boot",
    _id: "68ebe9eee56be7d4db6a1e9a",
  },
  {
    name: "Spring Framework",
    _id: "68ebe9eee56be7d4db6a1e9b",
  },
  {
    name: "Hibernate",
    _id: "68ebe9eee56be7d4db6a1e9c",
  },
  {
    name: "Micronaut",
    _id: "68ebe9eee56be7d4db6a1e9d",
  },
  {
    name: "Quarkus",
    _id: "68ebe9eee56be7d4db6a1e9e",
  },
  {
    name: "Play Framework",
    _id: "68ebe9eee56be7d4db6a1e9f",
  },
  {
    name: "Vert.x",
    _id: "68ebe9eee56be7d4db6a1ea0",
  },
  {
    name: ".NET",
    _id: "68ebe9eee56be7d4db6a1ea1",
  },
  {
    name: ".NET Core",
    _id: "68ebe9eee56be7d4db6a1ea2",
  },
  {
    name: "ASP.NET",
    _id: "68ebe9eee56be7d4db6a1ea3",
  },
  {
    name: "ASP.NET Core",
    _id: "68ebe9eee56be7d4db6a1ea4",
  },
  {
    name: "Blazor",
    _id: "68ebe9eee56be7d4db6a1ea5",
  },
  {
    name: "Entity Framework",
    _id: "68ebe9eee56be7d4db6a1ea6",
  },
  {
    name: "C#",
    _id: "68ebe9eee56be7d4db6a1ea7",
  },
  {
    name: "Laravel",
    _id: "68ebe9eee56be7d4db6a1ea8",
  },
  {
    name: "Symfony",
    _id: "68ebe9eee56be7d4db6a1ea9",
  },
  {
    name: "CodeIgniter",
    _id: "68ebe9eee56be7d4db6a1eaa",
  },
  {
    name: "CakePHP",
    _id: "68ebe9eee56be7d4db6a1eab",
  },
  {
    name: "Yii",
    _id: "68ebe9eee56be7d4db6a1eac",
  },
  {
    name: "Slim",
    _id: "68ebe9eee56be7d4db6a1ead",
  },
  {
    name: "Phalcon",
    _id: "68ebe9eee56be7d4db6a1eae",
  },
  {
    name: "Ruby on Rails",
    _id: "68ebe9eee56be7d4db6a1eaf",
  },
  {
    name: "Sinatra",
    _id: "68ebe9eee56be7d4db6a1eb0",
  },
  {
    name: "Hanami",
    _id: "68ebe9eee56be7d4db6a1eb1",
  },
  {
    name: "Gin",
    _id: "68ebe9eee56be7d4db6a1eb2",
  },
  {
    name: "Echo",
    _id: "68ebe9eee56be7d4db6a1eb3",
  },
  {
    name: "Fiber",
    _id: "68ebe9eee56be7d4db6a1eb4",
  },
  {
    name: "Beego",
    _id: "68ebe9eee56be7d4db6a1eb5",
  },
  {
    name: "Revel",
    _id: "68ebe9eee56be7d4db6a1eb6",
  },
  {
    name: "Actix",
    _id: "68ebe9eee56be7d4db6a1eb7",
  },
  {
    name: "Rocket",
    _id: "68ebe9eee56be7d4db6a1eb8",
  },
  {
    name: "Axum",
    _id: "68ebe9eee56be7d4db6a1eb9",
  },
  {
    name: "Warp",
    _id: "68ebe9eee56be7d4db6a1eba",
  },
  {
    name: "React Native",
    _id: "68ebe9eee56be7d4db6a1ebb",
  },
  {
    name: "Flutter",
    _id: "68ebe9eee56be7d4db6a1ebc",
  },
  {
    name: "Swift",
    _id: "68ebe9eee56be7d4db6a1ebd",
  },
  {
    name: "SwiftUI",
    _id: "68ebe9eee56be7d4db6a1ebe",
  },
  {
    name: "Kotlin",
    _id: "68ebe9eee56be7d4db6a1ebf",
  },
  {
    name: "Jetpack Compose",
    _id: "68ebe9eee56be7d4db6a1ec0",
  },
  {
    name: "Ionic",
    _id: "68ebe9eee56be7d4db6a1ec1",
  },
  {
    name: "Xamarin",
    _id: "68ebe9eee56be7d4db6a1ec2",
  },
  {
    name: "Cordova",
    _id: "68ebe9eee56be7d4db6a1ec3",
  },
  {
    name: "Capacitor",
    _id: "68ebe9eee56be7d4db6a1ec4",
  },
  {
    name: "Expo",
    _id: "68ebe9eee56be7d4db6a1ec5",
  },
  {
    name: "PostgreSQL",
    _id: "68ebe9eee56be7d4db6a1ec6",
  },
  {
    name: "MySQL",
    _id: "68ebe9eee56be7d4db6a1ec7",
  },
  {
    name: "MariaDB",
    _id: "68ebe9eee56be7d4db6a1ec8",
  },
  {
    name: "SQLite",
    _id: "68ebe9eee56be7d4db6a1ec9",
  },
  {
    name: "Microsoft SQL Server",
    _id: "68ebe9eee56be7d4db6a1eca",
  },
  {
    name: "Oracle Database",
    _id: "68ebe9eee56be7d4db6a1ecb",
  },
  {
    name: "CockroachDB",
    _id: "68ebe9eee56be7d4db6a1ecc",
  },
  {
    name: "MongoDB",
    _id: "68ebe9eee56be7d4db6a1ecd",
  },
  {
    name: "Redis",
    _id: "68ebe9eee56be7d4db6a1ece",
  },
  {
    name: "Cassandra",
    _id: "68ebe9eee56be7d4db6a1ecf",
  },
  {
    name: "DynamoDB",
    _id: "68ebe9eee56be7d4db6a1ed0",
  },
  {
    name: "Couchbase",
    _id: "68ebe9eee56be7d4db6a1ed1",
  },
  {
    name: "CouchDB",
    _id: "68ebe9eee56be7d4db6a1ed2",
  },
  {
    name: "Neo4j",
    _id: "68ebe9eee56be7d4db6a1ed3",
  },
  {
    name: "ArangoDB",
    _id: "68ebe9eee56be7d4db6a1ed4",
  },
  {
    name: "Firebase Realtime Database",
    _id: "68ebe9eee56be7d4db6a1ed5",
  },
  {
    name: "Firestore",
    _id: "68ebe9eee56be7d4db6a1ed6",
  },
  {
    name: "Prisma",
    _id: "68ebe9eee56be7d4db6a1ed7",
  },
  {
    name: "TypeORM",
    _id: "68ebe9eee56be7d4db6a1ed8",
  },
  {
    name: "Sequelize",
    _id: "68ebe9eee56be7d4db6a1ed9",
  },
  {
    name: "Drizzle",
    _id: "68ebe9eee56be7d4db6a1eda",
  },
  {
    name: "Mongoose",
    _id: "68ebe9eee56be7d4db6a1edb",
  },
  {
    name: "Knex.js",
    _id: "68ebe9eee56be7d4db6a1edc",
  },
  {
    name: "SQLAlchemy",
    _id: "68ebe9eee56be7d4db6a1edd",
  },
  {
    name: "Eloquent",
    _id: "68ebe9eee56be7d4db6a1ede",
  },
  {
    name: "AWS",
    _id: "68ebe9eee56be7d4db6a1edf",
  },
  {
    name: "Google Cloud Platform",
    _id: "68ebe9eee56be7d4db6a1ee0",
  },
  {
    name: "Microsoft Azure",
    _id: "68ebe9eee56be7d4db6a1ee1",
  },
  {
    name: "DigitalOcean",
    _id: "68ebe9eee56be7d4db6a1ee2",
  },
  {
    name: "Heroku",
    _id: "68ebe9eee56be7d4db6a1ee3",
  },
  {
    name: "Vercel",
    _id: "68ebe9eee56be7d4db6a1ee4",
  },
  {
    name: "Netlify",
    _id: "68ebe9eee56be7d4db6a1ee5",
  },
  {
    name: "Railway",
    _id: "68ebe9eee56be7d4db6a1ee6",
  },
  {
    name: "Render",
    _id: "68ebe9eee56be7d4db6a1ee7",
  },
  {
    name: "Fly.io",
    _id: "68ebe9eee56be7d4db6a1ee8",
  },
  {
    name: "Cloudflare",
    _id: "68ebe9eee56be7d4db6a1ee9",
  },
  {
    name: "Linode",
    _id: "68ebe9eee56be7d4db6a1eea",
  },
  {
    name: "Vultr",
    _id: "68ebe9eee56be7d4db6a1eeb",
  },
  {
    name: "AWS Lambda",
    _id: "68ebe9eee56be7d4db6a1eec",
  },
  {
    name: "AWS EC2",
    _id: "68ebe9eee56be7d4db6a1eed",
  },
  {
    name: "AWS S3",
    _id: "68ebe9eee56be7d4db6a1eee",
  },
  {
    name: "AWS RDS",
    _id: "68ebe9eee56be7d4db6a1eef",
  },
  {
    name: "AWS DynamoDB",
    _id: "68ebe9eee56be7d4db6a1ef0",
  },
  {
    name: "AWS CloudFront",
    _id: "68ebe9eee56be7d4db6a1ef1",
  },
  {
    name: "AWS API Gateway",
    _id: "68ebe9eee56be7d4db6a1ef2",
  },
  {
    name: "AWS Cognito",
    _id: "68ebe9eee56be7d4db6a1ef3",
  },
  {
    name: "AWS ECS",
    _id: "68ebe9eee56be7d4db6a1ef4",
  },
  {
    name: "AWS EKS",
    _id: "68ebe9eee56be7d4db6a1ef5",
  },
  {
    name: "Docker",
    _id: "68ebe9eee56be7d4db6a1ef6",
  },
  {
    name: "Kubernetes",
    _id: "68ebe9eee56be7d4db6a1ef7",
  },
  {
    name: "Jenkins",
    _id: "68ebe9eee56be7d4db6a1ef8",
  },
  {
    name: "GitHub Actions",
    _id: "68ebe9eee56be7d4db6a1ef9",
  },
  {
    name: "GitLab CI",
    _id: "68ebe9eee56be7d4db6a1efa",
  },
  {
    name: "CircleCI",
    _id: "68ebe9eee56be7d4db6a1efb",
  },
  {
    name: "Travis CI",
    _id: "68ebe9eee56be7d4db6a1efc",
  },
  {
    name: "ArgoCD",
    _id: "68ebe9eee56be7d4db6a1efd",
  },
  {
    name: "Terraform",
    _id: "68ebe9eee56be7d4db6a1efe",
  },
  {
    name: "Ansible",
    _id: "68ebe9eee56be7d4db6a1eff",
  },
  {
    name: "Chef",
    _id: "68ebe9eee56be7d4db6a1f00",
  },
  {
    name: "Puppet",
    _id: "68ebe9eee56be7d4db6a1f01",
  },
  {
    name: "Vagrant",
    _id: "68ebe9eee56be7d4db6a1f02",
  },
  {
    name: "Helm",
    _id: "68ebe9eee56be7d4db6a1f03",
  },
  {
    name: "Prometheus",
    _id: "68ebe9eee56be7d4db6a1f04",
  },
  {
    name: "Grafana",
    _id: "68ebe9eee56be7d4db6a1f05",
  },
  {
    name: "Nginx",
    _id: "68ebe9eee56be7d4db6a1f06",
  },
  {
    name: "Apache",
    _id: "68ebe9eee56be7d4db6a1f07",
  },
  {
    name: "Caddy",
    _id: "68ebe9eee56be7d4db6a1f08",
  },
  {
    name: "Git",
    _id: "68ebe9eee56be7d4db6a1f09",
  },
  {
    name: "GitHub",
    _id: "68ebe9eee56be7d4db6a1f0a",
  },
  {
    name: "GitLab",
    _id: "68ebe9eee56be7d4db6a1f0b",
  },
  {
    name: "Bitbucket",
    _id: "68ebe9eee56be7d4db6a1f0c",
  },
  {
    name: "Mercurial",
    _id: "68ebe9eee56be7d4db6a1f0d",
  },
  {
    name: "SVN",
    _id: "68ebe9eee56be7d4db6a1f0e",
  },
  {
    name: "Jest",
    _id: "68ebe9eee56be7d4db6a1f0f",
  },
  {
    name: "Vitest",
    _id: "68ebe9eee56be7d4db6a1f10",
  },
  {
    name: "Mocha",
    _id: "68ebe9eee56be7d4db6a1f11",
  },
  {
    name: "Chai",
    _id: "68ebe9eee56be7d4db6a1f12",
  },
  {
    name: "Jasmine",
    _id: "68ebe9eee56be7d4db6a1f13",
  },
  {
    name: "Cypress",
    _id: "68ebe9eee56be7d4db6a1f14",
  },
  {
    name: "Playwright",
    _id: "68ebe9eee56be7d4db6a1f15",
  },
  {
    name: "Selenium",
    _id: "68ebe9eee56be7d4db6a1f16",
  },
  {
    name: "Puppeteer",
    _id: "68ebe9eee56be7d4db6a1f17",
  },
  {
    name: "Testing Library",
    _id: "68ebe9eee56be7d4db6a1f18",
  },
  {
    name: "Enzyme",
    _id: "68ebe9eee56be7d4db6a1f19",
  },
  {
    name: "JUnit",
    _id: "68ebe9eee56be7d4db6a1f1a",
  },
  {
    name: "PyTest",
    _id: "68ebe9eee56be7d4db6a1f1b",
  },
  {
    name: "PHPUnit",
    _id: "68ebe9eee56be7d4db6a1f1c",
  },
  {
    name: "RSpec",
    _id: "68ebe9eee56be7d4db6a1f1d",
  },
  {
    name: "Postman",
    _id: "68ebe9eee56be7d4db6a1f1e",
  },
  {
    name: "Insomnia",
    _id: "68ebe9eee56be7d4db6a1f1f",
  },
  {
    name: "Redux",
    _id: "68ebe9eee56be7d4db6a1f20",
  },
  {
    name: "Redux Toolkit",
    _id: "68ebe9eee56be7d4db6a1f21",
  },
  {
    name: "MobX",
    _id: "68ebe9eee56be7d4db6a1f22",
  },
  {
    name: "Zustand",
    _id: "68ebe9eee56be7d4db6a1f23",
  },
  {
    name: "Recoil",
    _id: "68ebe9eee56be7d4db6a1f24",
  },
  {
    name: "Jotai",
    _id: "68ebe9eee56be7d4db6a1f25",
  },
  {
    name: "XState",
    _id: "68ebe9eee56be7d4db6a1f26",
  },
  {
    name: "Context API",
    _id: "68ebe9eee56be7d4db6a1f27",
  },
  {
    name: "Pinia",
    _id: "68ebe9eee56be7d4db6a1f28",
  },
  {
    name: "Vuex",
    _id: "68ebe9eee56be7d4db6a1f29",
  },
  {
    name: "NgRx",
    _id: "68ebe9eee56be7d4db6a1f2a",
  },
  {
    name: "REST API",
    _id: "68ebe9eee56be7d4db6a1f2b",
  },
  {
    name: "GraphQL",
    _id: "68ebe9eee56be7d4db6a1f2c",
  },
  {
    name: "Apollo",
    _id: "68ebe9eee56be7d4db6a1f2d",
  },
  {
    name: "tRPC",
    _id: "68ebe9eee56be7d4db6a1f2e",
  },
  {
    name: "gRPC",
    _id: "68ebe9eee56be7d4db6a1f2f",
  },
  {
    name: "WebSockets",
    _id: "68ebe9eee56be7d4db6a1f30",
  },
  {
    name: "Socket.io",
    _id: "68ebe9eee56be7d4db6a1f31",
  },
  {
    name: "JSON",
    _id: "68ebe9eee56be7d4db6a1f32",
  },
  {
    name: "XML",
    _id: "68ebe9eee56be7d4db6a1f33",
  },
  {
    name: "OpenAPI",
    _id: "68ebe9eee56be7d4db6a1f34",
  },
  {
    name: "Swagger",
    _id: "68ebe9eee56be7d4db6a1f35",
  },
  {
    name: "OAuth",
    _id: "68ebe9eee56be7d4db6a1f36",
  },
  {
    name: "JWT",
    _id: "68ebe9eee56be7d4db6a1f37",
  },
  {
    name: "Auth0",
    _id: "68ebe9eee56be7d4db6a1f38",
  },
  {
    name: "Firebase Auth",
    _id: "68ebe9eee56be7d4db6a1f39",
  },
  {
    name: "NextAuth",
    _id: "68ebe9eee56be7d4db6a1f3a",
  },
  {
    name: "Passport.js",
    _id: "68ebe9eee56be7d4db6a1f3b",
  },
  {
    name: "Keycloak",
    _id: "68ebe9eee56be7d4db6a1f3c",
  },
  {
    name: "Okta",
    _id: "68ebe9eee56be7d4db6a1f3d",
  },
  {
    name: "Kafka",
    _id: "68ebe9eee56be7d4db6a1f3e",
  },
  {
    name: "RabbitMQ",
    _id: "68ebe9eee56be7d4db6a1f3f",
  },
  {
    name: "MQTT",
    _id: "68ebe9eee56be7d4db6a1f40",
  },
  {
    name: "Apache Pulsar",
    _id: "68ebe9eee56be7d4db6a1f41",
  },
  {
    name: "Redis Pub/Sub",
    _id: "68ebe9eee56be7d4db6a1f42",
  },
  {
    name: "AWS SQS",
    _id: "68ebe9eee56be7d4db6a1f43",
  },
  {
    name: "AWS SNS",
    _id: "68ebe9eee56be7d4db6a1f44",
  },
  {
    name: "Elasticsearch",
    _id: "68ebe9eee56be7d4db6a1f45",
  },
  {
    name: "Algolia",
    _id: "68ebe9eee56be7d4db6a1f46",
  },
  {
    name: "Meilisearch",
    _id: "68ebe9eee56be7d4db6a1f47",
  },
  {
    name: "Typesense",
    _id: "68ebe9eee56be7d4db6a1f48",
  },
  {
    name: "Solr",
    _id: "68ebe9eee56be7d4db6a1f49",
  },
  {
    name: "WordPress",
    _id: "68ebe9eee56be7d4db6a1f4a",
  },
  {
    name: "Contentful",
    _id: "68ebe9eee56be7d4db6a1f4b",
  },
  {
    name: "Strapi",
    _id: "68ebe9eee56be7d4db6a1f4c",
  },
  {
    name: "Sanity",
    _id: "68ebe9eee56be7d4db6a1f4d",
  },
  {
    name: "Ghost",
    _id: "68ebe9eee56be7d4db6a1f4e",
  },
  {
    name: "Prismic",
    _id: "68ebe9eee56be7d4db6a1f4f",
  },
  {
    name: "Directus",
    _id: "68ebe9eee56be7d4db6a1f50",
  },
  {
    name: "Payload CMS",
    _id: "68ebe9eee56be7d4db6a1f51",
  },
  {
    name: "Webpack",
    _id: "68ebe9eee56be7d4db6a1f52",
  },
  {
    name: "Vite",
    _id: "68ebe9eee56be7d4db6a1f53",
  },
  {
    name: "Rollup",
    _id: "68ebe9eee56be7d4db6a1f54",
  },
  {
    name: "Parcel",
    _id: "68ebe9eee56be7d4db6a1f55",
  },
  {
    name: "esbuild",
    _id: "68ebe9eee56be7d4db6a1f56",
  },
  {
    name: "Turbopack",
    _id: "68ebe9eee56be7d4db6a1f57",
  },
  {
    name: "SWC",
    _id: "68ebe9eee56be7d4db6a1f58",
  },
  {
    name: "Babel",
    _id: "68ebe9eee56be7d4db6a1f59",
  },
  {
    name: "Gulp",
    _id: "68ebe9eee56be7d4db6a1f5a",
  },
  {
    name: "Grunt",
    _id: "68ebe9eee56be7d4db6a1f5b",
  },
  {
    name: "npm",
    _id: "68ebe9eee56be7d4db6a1f5c",
  },
  {
    name: "Yarn",
    _id: "68ebe9eee56be7d4db6a1f5d",
  },
  {
    name: "pnpm",
    _id: "68ebe9eee56be7d4db6a1f5e",
  },
  {
    name: "pip",
    _id: "68ebe9eee56be7d4db6a1f5f",
  },
  {
    name: "Composer",
    _id: "68ebe9eee56be7d4db6a1f60",
  },
  {
    name: "Maven",
    _id: "68ebe9eee56be7d4db6a1f61",
  },
  {
    name: "Gradle",
    _id: "68ebe9eee56be7d4db6a1f62",
  },
  {
    name: "NuGet",
    _id: "68ebe9eee56be7d4db6a1f63",
  },
  {
    name: "Python",
    _id: "68ebe9eee56be7d4db6a1f64",
  },
  {
    name: "Java",
    _id: "68ebe9eee56be7d4db6a1f65",
  },
  {
    name: "Go",
    _id: "68ebe9eee56be7d4db6a1f66",
  },
  {
    name: "Rust",
    _id: "68ebe9eee56be7d4db6a1f67",
  },
  {
    name: "C",
    _id: "68ebe9eee56be7d4db6a1f68",
  },
  {
    name: "C++",
    _id: "68ebe9eee56be7d4db6a1f69",
  },
  {
    name: "PHP",
    _id: "68ebe9eee56be7d4db6a1f6a",
  },
  {
    name: "Ruby",
    _id: "68ebe9eee56be7d4db6a1f6b",
  },
  {
    name: "Scala",
    _id: "68ebe9eee56be7d4db6a1f6c",
  },
  {
    name: "Elixir",
    _id: "68ebe9eee56be7d4db6a1f6d",
  },
  {
    name: "Clojure",
    _id: "68ebe9eee56be7d4db6a1f6e",
  },
  {
    name: "Haskell",
    _id: "68ebe9eee56be7d4db6a1f6f",
  },
  {
    name: "Dart",
    _id: "68ebe9eee56be7d4db6a1f70",
  },
  {
    name: "Objective-C",
    _id: "68ebe9eee56be7d4db6a1f71",
  },
  {
    name: "R",
    _id: "68ebe9eee56be7d4db6a1f72",
  },
  {
    name: "Julia",
    _id: "68ebe9eee56be7d4db6a1f73",
  },
  {
    name: "Lua",
    _id: "68ebe9eee56be7d4db6a1f74",
  },
  {
    name: "Perl",
    _id: "68ebe9eee56be7d4db6a1f75",
  },
  {
    name: "TensorFlow",
    _id: "68ebe9eee56be7d4db6a1f76",
  },
  {
    name: "PyTorch",
    _id: "68ebe9eee56be7d4db6a1f77",
  },
  {
    name: "Keras",
    _id: "68ebe9eee56be7d4db6a1f78",
  },
  {
    name: "scikit-learn",
    _id: "68ebe9eee56be7d4db6a1f79",
  },
  {
    name: "Pandas",
    _id: "68ebe9eee56be7d4db6a1f7a",
  },
  {
    name: "NumPy",
    _id: "68ebe9eee56be7d4db6a1f7b",
  },
  {
    name: "Jupyter",
    _id: "68ebe9eee56be7d4db6a1f7c",
  },
  {
    name: "OpenAI API",
    _id: "68ebe9eee56be7d4db6a1f7d",
  },
  {
    name: "Langchain",
    _id: "68ebe9eee56be7d4db6a1f7e",
  },
  {
    name: "Langgraph",
    _id: "68ebe9eee56be7d4db6a1f7f",
  },
  {
    name: "Langfuse",
    _id: "68ebe9eee56be7d4db6a1f80",
  },
  {
    name: "Machine Learning",
    _id: "68ebe9eee56be7d4db6a1f81",
  },
  {
    name: "Deep Learning",
    _id: "68ebe9eee56be7d4db6a1f82",
  },
  {
    name: "Natural Language Processing",
    _id: "68ebe9eee56be7d4db6a1f83",
  },
  {
    name: "Computer Vision",
    _id: "68ebe9eee56be7d4db6a1f84",
  },
  {
    name: "Data Analysis",
    _id: "68ebe9eee56be7d4db6a1f85",
  },
  {
    name: "Qdrant",
    _id: "68ebe9eee56be7d4db6a1f86",
  },
  {
    name: "Solidity",
    _id: "68ebe9eee56be7d4db6a1f87",
  },
  {
    name: "Ethereum",
    _id: "68ebe9eee56be7d4db6a1f88",
  },
  {
    name: "Web3.js",
    _id: "68ebe9eee56be7d4db6a1f89",
  },
  {
    name: "Ethers.js",
    _id: "68ebe9eee56be7d4db6a1f8a",
  },
  {
    name: "Smart Contracts",
    _id: "68ebe9eee56be7d4db6a1f8b",
  },
  {
    name: "Hardhat",
    _id: "68ebe9eee56be7d4db6a1f8c",
  },
  {
    name: "Truffle",
    _id: "68ebe9eee56be7d4db6a1f8d",
  },
  {
    name: "Unity",
    _id: "68ebe9eee56be7d4db6a1f8e",
  },
  {
    name: "Unreal Engine",
    _id: "68ebe9eee56be7d4db6a1f8f",
  },
  {
    name: "Godot",
    _id: "68ebe9eee56be7d4db6a1f90",
  },
  {
    name: "Phaser",
    _id: "68ebe9eee56be7d4db6a1f91",
  },
  {
    name: "Three.js",
    _id: "68ebe9eee56be7d4db6a1f92",
  },
  {
    name: "Babylon.js",
    _id: "68ebe9eee56be7d4db6a1f93",
  },
  {
    name: "PixiJS",
    _id: "68ebe9eee56be7d4db6a1f94",
  },
  {
    name: "Electron",
    _id: "68ebe9eee56be7d4db6a1f95",
  },
  {
    name: "Tauri",
    _id: "68ebe9eee56be7d4db6a1f96",
  },
  {
    name: "Qt",
    _id: "68ebe9eee56be7d4db6a1f97",
  },
  {
    name: "WPF",
    _id: "68ebe9eee56be7d4db6a1f98",
  },
  {
    name: "WinForms",
    _id: "68ebe9eee56be7d4db6a1f99",
  },
  {
    name: "GTK",
    _id: "68ebe9eee56be7d4db6a1f9a",
  },
  {
    name: "Linux",
    _id: "68ebe9eee56be7d4db6a1f9b",
  },
  {
    name: "Bash",
    _id: "68ebe9eee56be7d4db6a1f9c",
  },
  {
    name: "PowerShell",
    _id: "68ebe9eee56be7d4db6a1f9d",
  },
  {
    name: "Vim",
    _id: "68ebe9eee56be7d4db6a1f9e",
  },
  {
    name: "VS Code",
    _id: "68ebe9eee56be7d4db6a1f9f",
  },
  {
    name: "IntelliJ IDEA",
    _id: "68ebe9eee56be7d4db6a1fa0",
  },
  {
    name: "Eclipse",
    _id: "68ebe9eee56be7d4db6a1fa1",
  },
  {
    name: "Xcode",
    _id: "68ebe9eee56be7d4db6a1fa2",
  },
  {
    name: "Android Studio",
    _id: "68ebe9eee56be7d4db6a1fa3",
  },
  {
    name: "Figma",
    _id: "68ebe9eee56be7d4db6a1fa4",
  },
  {
    name: "Adobe XD",
    _id: "68ebe9eee56be7d4db6a1fa5",
  },
  {
    name: "Sketch",
    _id: "68ebe9eee56be7d4db6a1fa6",
  },
  {
    name: "Jira",
    _id: "68ebe9eee56be7d4db6a1fa7",
  },
  {
    name: "Confluence",
    _id: "68ebe9eee56be7d4db6a1fa8",
  },
  {
    name: "Notion",
    _id: "68ebe9eee56be7d4db6a1fa9",
  },
  {
    name: "Slack",
    _id: "68ebe9eee56be7d4db6a1faa",
  },
  {
    name: "Discord",
    _id: "68ebe9eee56be7d4db6a1fab",
  },
  {
    name: "Agile",
    _id: "68ebe9eee56be7d4db6a1fac",
  },
  {
    name: "Scrum",
    _id: "68ebe9eee56be7d4db6a1fad",
  },
  {
    name: "Kanban",
    _id: "68ebe9eee56be7d4db6a1fae",
  },
  {
    name: "Microservices",
    _id: "68ebe9eee56be7d4db6a1faf",
  },
  {
    name: "Monorepo",
    _id: "68ebe9eee56be7d4db6a1fb0",
  },
  {
    name: "Serverless",
    _id: "68ebe9eee56be7d4db6a1fb1",
  },
  {
    name: "JAMstack",
    _id: "68ebe9eee56be7d4db6a1fb2",
  },
  {
    name: "Progressive Web Apps",
    _id: "68ebe9eee56be7d4db6a1fb3",
  },
  {
    name: "Responsive Design",
    _id: "68ebe9eee56be7d4db6a1fb4",
  },
  {
    name: "Accessibility",
    _id: "68ebe9eee56be7d4db6a1fb5",
  },
  {
    name: "SEO",
    _id: "68ebe9eee56be7d4db6a1fb6",
  },
  {
    name: "Performance Optimization",
    _id: "68ebe9eee56be7d4db6a1fb7",
  },
  {
    name: "Code Review",
    _id: "68ebe9eee56be7d4db6a1fb8",
  },
  {
    name: "Technical Writing",
    _id: "68ebe9eee56be7d4db6a1fb9",
  },
  {
    name: "System Design",
    _id: "68ebe9eee56be7d4db6a1fba",
  },
  {
    name: "Design Patterns",
    _id: "68ebe9eee56be7d4db6a1fbb",
  },
  {
    name: "Data Structures",
    _id: "68ebe9eee56be7d4db6a1fbc",
  },
  {
    name: "Algorithms",
    _id: "68ebe9eee56be7d4db6a1fbd",
  },
];

const generateSkills = () => {
  const shuffled = skills.sort(() => 0.5 - Math.random());
  const count = Math.floor(Math.random() * 5) + 3;
  const maxCount = count > 10 ? count : 10;
  return shuffled
    .slice(0, maxCount)
    .map((skill) => ({ _id: skill._id, name: skill.name }));
};

const maleWithPic = names.male.map((name, index) => ({
  name,
  profilePicture: `https://randomuser.me/api/portraits/men/${index}.jpg`,
  gender: "male",
}));

const femaleWithPic = names.female.map((name, index) => ({
  name,
  profilePicture: `https://randomuser.me/api/portraits/women/${index}.jpg`,
  gender: "female",
}));

export const dummyUsersData = [...maleWithPic, ...femaleWithPic].map(
  (user, index) => {
    const aboutIndex = Math.floor(Math.random() * 50); // Always 0–49
    // ensure cityIndex never exceeds cities.length - 1
    const cityIndex = index % cities.length;

    return {
      name: user.name,
      email: `${user.name.replace(" ", "")!.toLowerCase()}@devtinder.com`,
      password: "$2b$12$l28iPzQcY2rfzxCwTH4JUON1nt4e6j9DHkXTWLgLCFW8q5aCn7sGu",
      gender: user.gender,
      isEmailVerified: true,
      onboardingCompleted: true,
      about: abouts[aboutIndex],
      location: {
        city: cities[cityIndex]?.city,
        state: cities[cityIndex]?.state,
        country: cities[cityIndex]?.country,
        coords: {
          type: "Point",
          coordinates: cities[cityIndex]?.coords,
        },
      },
      dateOfBirth: generateDOB(),
      profilePicture: user.profilePicture,
      skills: generateSkills(),
    };
  }
);
