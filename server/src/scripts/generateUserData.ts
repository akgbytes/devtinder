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
  ],
  female: [
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

const skillsList = [
  {
    _id: "68e6031b7637b7e6d82af2cf",
    name: "React",
  },
  {
    _id: "68e6031b7637b7e6d82af2d0",
    name: "Next.js",
  },
  {
    _id: "68e6031b7637b7e6d82af2d1",
    name: "Vue.js",
  },
  {
    _id: "68e6031b7637b7e6d82af2d3",
    name: "Angular",
  },
  {
    _id: "68e6031b7637b7e6d82af2d4",
    name: "Svelte",
  },
  {
    _id: "68e6031b7637b7e6d82af2e0",
    name: "HTML",
  },
  {
    _id: "68e6031b7637b7e6d82af2e1",
    name: "CSS",
  },
  {
    _id: "68e6031b7637b7e6d82af2e2",
    name: "JavaScript",
  },
  {
    _id: "68e6031b7637b7e6d82af2e3",
    name: "TypeScript",
  },
  {
    _id: "68e6031b7637b7e6d82af2e6",
    name: "Tailwind CSS",
  },
  {
    _id: "68e6031b7637b7e6d82af2eb",
    name: "Shadcn/ui",
  },

  {
    _id: "68e6031b7637b7e6d82af2f6",
    name: "Node.js",
  },
  {
    _id: "68e6031b7637b7e6d82af2f7",
    name: "Express.js",
  },
  {
    _id: "68e6031b7637b7e6d82af2f8",
    name: "Nest.js",
  },
  {
    _id: "68e6031b7637b7e6d82af2f9",
    name: "Fastify",
  },
  {
    _id: "68e6031b7637b7e6d82af2fd",
    name: "Deno",
  },
  {
    _id: "68e6031b7637b7e6d82af2fe",
    name: "Bun",
  },
  {
    _id: "68e6031b7637b7e6d82af2ff",
    name: "Django",
  },
  {
    _id: "68e6031b7637b7e6d82af300",
    name: "Flask",
  },
  {
    _id: "68e6031b7637b7e6d82af301",
    name: "FastAPI",
  },
  {
    _id: "68e6031b7637b7e6d82af338",
    name: "MongoDB",
  },
  {
    _id: "68e6031b7637b7e6d82af339",
    name: "Redis",
  },
  {
    _id: "68e6031b7637b7e6d82af331",
    name: "PostgreSQL",
  },
  {
    _id: "68e6031b7637b7e6d82af332",
    name: "MySQL",
  },
  {
    _id: "68e6031b7637b7e6d82af341",
    name: "Firestore",
  },
  {
    _id: "68e6031b7637b7e6d82af342",
    name: "Prisma",
  },
  {
    _id: "68e6031b7637b7e6d82af343",
    name: "TypeORM",
  },
  {
    _id: "68e6031b7637b7e6d82af34a",
    name: "AWS",
  },
];

const generateSkills = () => {
  const shuffled = skillsList.sort(() => 0.5 - Math.random());
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
  (user, index) => ({
    name: user.name,
    email: `${user.name.replace(" ", "")!.toLowerCase()}@devtinder.com`,
    password: "$2b$12$l28iPzQcY2rfzxCwTH4JUON1nt4e6j9DHkXTWLgLCFW8q5aCn7sGu",
    gender: user.gender,
    isEmailVerified: true,
    onboardingCompleted: true,
    about: abouts[index],
    location: {
      city: cities[index]?.city,
      state: cities[index]?.state,
      country: cities[index]?.country,
      coords: {
        type: "Point",
        coordinates: cities[index]?.coords,
      },
    },
    dateOfBirth: generateDOB(),
    profilePicture: user.profilePicture,
    skills: generateSkills(),
  })
);
