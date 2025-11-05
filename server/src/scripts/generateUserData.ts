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

const users = [
  {
    name: "Liam Anderson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfnNpTHSqRFAoUzlBVJTpLQORfYPd5ZyjubMgE",
    about:
      "Full-stack developer who loves building tools that make life easier.",
  },
  {
    name: "Oliver Martinez",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfAJooyKXzYUDMNphfgQyB15086nZHqc4ej7lC",
    about: "Turning coffee into clean code and complex APIs.",
  },
  {
    name: "Noah Thompson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfRZoUVcpNw1LfA04skr7v8WMtPSI9aHDJdeBi",
    about: "Passionate about frontend architecture and great UX.",
  },
  {
    name: "Elijah Robinson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LflEnA9eTawtDTq7i5jOlyfv4m1cZXNsebUHzg",
    about: "Backend engineer obsessed with scalability and clean design.",
  },
  {
    name: "James Carter",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfJKJbLrkuFP8DIayV5YnMlCB3bshcW1JNtiLQ",
    about: "Exploring AI integrations and NLP for next-gen products.",
  },
  {
    name: "William Johnson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfNqav8GTebZrSqWXy9d5fepGJzC0alvMuYiOT",
    about: "I build web apps that are fast, secure, and beautiful.",
  },
  {
    name: "Benjamin Davis",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lf1UMG71VJ1MqY6JKkuXbe53wOsn8ACpdZWlL4",
    about: "Code, design, and debugging — in that exact order.",
  },
  {
    name: "Lucas Garcia",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfB9jyfbrnlo3AqjRCW7rZbdPVsIacO6N4hkzX",
    about: "Bringing ideas to life through code and collaboration.",
  },
  {
    name: "Henry Wilson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfXlwdlzJ8xN4knHcqbi5g1SGdDAB6KFCfjyam",
    about: "React enthusiast who enjoys solving UI challenges.",
  },
  {
    name: "Alexander Moore",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfOJXZJ5lDRx3JT9VSLnP8eq7oYElh4y2pXMcz",
    about: "Building things for the web since my teenage years.",
  },
  {
    name: "Michael Taylor",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfWImfLByGpLlEVP3t7jYwGBc2dJTAegHZyzsM",
    about: "Always learning something new about cloud and DevOps.",
  },
  {
    name: "Ethan White",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfRbSwjrpNw1LfA04skr7v8WMtPSI9aHDJdeBi",
    about: "Frontend developer with a backend mindset.",
  },
  {
    name: "Daniel Harris",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfEUBepAfYVN7iHq95pG8MtnevbThAkX0lW64s",
    about: "Clean code, clean commits, clean conscience.",
  },
  {
    name: "Logan Walker",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfEUBepAfYVN7iHq95pG8MtnevbThAkX0lW64s",
    about: "Currently obsessed with TypeScript and performance tuning.",
  },
  {
    name: "Jacob Lewis",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfFVB3PXKYM6Ky0lU9jm2VpDTzBEFbecdoSZOJ",
    about: "Software engineer who believes good design is invisible.",
  },
  {
    name: "Jackson Hall",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfZHm8CsdI8FGjm6klbxDQVPCi342caJBEXYRW",
    about: "I like my APIs well-documented and my code readable.",
  },
  {
    name: "Levi Allen",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfQVnPUzaZw1E49bLQJkBMr0DyCGHtmaAj7nPd",
    about: "Product-minded engineer focused on delivering real value.",
  },
  {
    name: "Sebastian Young",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfP3JjZi1AP97gqWlwC2Ek1tOYV04Gj63ezKH5",
    about: "Design systems make me happy. So does refactoring.",
  },
  {
    name: "Mateo King",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfAhJkEHXzYUDMNphfgQyB15086nZHqc4ej7lC",
    about: "Solving problems one pull request at a time.",
  },
  {
    name: "Jack Wright",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfi81XCgVHQmrb0y7pejYTNUcoPlRXJw2fBGIF",
    about: "Trying to write less code that does more.",
  },
  {
    name: "Owen Scott",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfe0Ns17uP2N9AXWEhtUb0g4kVIOsYwDvJeZoi",
    about: "Engineer by trade, builder by passion.",
  },
  {
    name: "Theodore Green",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfcC4M8azOlLRZmEGWJwsUtNAq4uIygfMidjBD",
    about: "I believe good software starts with good conversations.",
  },
  {
    name: "Aiden Adams",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfTJykDwtNXKGwUodlyzBT0PLjHbiuZxDfC5EQ",
    about: "Code reviewer who gives honest but kind feedback.",
  },
  {
    name: "Samuel Baker",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfdd2E7BCbhecX8Z4lAaf7QitkNjJwvrY13KP5",
    about: "Always optimizing something — code, workflows, or coffee brewing.",
  },
  {
    name: "Joseph Nelson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfcSFTuqzOlLRZmEGWJwsUtNAq4uIygfMidjBD",
    about: "Focused on making developer experience smoother and faster.",
  },
  {
    name: "John Hill",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfn6IPrxRFAoUzlBVJTpLQORfYPd5ZyjubMgEs",
    about: "Helping startups scale from prototype to production.",
  },
  {
    name: "David Rivera",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfHJsXFK0sJckvrfA68VtPueNZTy04Olp7E1I3",
    about: "Data-driven developer with a love for clean APIs.",
  },
  {
    name: "Wyatt Campbell",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfLj18JUh48qhgsytM6zVPj10uQ9DZdbFBo2eC",
    about: "Turning business logic into elegant backend solutions.",
  },
  {
    name: "Matthew Mitchell",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfGebXfeg8JZLvlPR4njgzfKYIHA5Thqboa23U",
    about: "Writing code that other people actually enjoy reading.",
  },
  {
    name: "Luke Perez",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfm3DvQjZiO2FKrZ6NHCzBIstDUxTkEPJpSq9w",
    about: "Software developer who enjoys turning chaos into structure.",
  },
  {
    name: "Julian Roberts",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfIyhWyJvclCuOAWNGs2n61oK5bfgUxeIZmkwd",
    about: "Passionate about automation, testing, and continuous delivery.",
  },
  {
    name: "Isaac Turner",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfNqEUAWKebZrSqWXy9d5fepGJzC0alvMuYiOT",
    about: "From concept to commit, I like to see things through.",
  },
  {
    name: "Olivia Johnson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfNPkOxbebZrSqWXy9d5fepGJzC0alvMuYiOTA",
    about: "Team player who values clarity over cleverness.",
  },
  {
    name: "Emma Brown",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfemNm4JuP2N9AXWEhtUb0g4kVIOsYwDvJeZoi",
    about: "Currently building tools that empower other developers.",
  },
  {
    name: "Ava Garcia",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfT6I9uutNXKGwUodlyzBT0PLjHbiuZxDfC5EQ",
    about: "I believe good architecture saves time and sanity.",
  },
  {
    name: "Sophia Martinez",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfT6I9uutNXKGwUodlyzBT0PLjHbiuZxDfC5EQ",
    about: "Driven by curiosity, grounded in code quality.",
  },
  {
    name: "Isabella Rodriguez",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfes0tE8uP2N9AXWEhtUb0g4kVIOsYwDvJeZoi",
    about: "Engineer who loves small details and big ideas.",
  },
  {
    name: "Mia Davis",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfeKeim5uP2N9AXWEhtUb0g4kVIOsYwDvJeZoi",
    about: "Backend dev exploring the world of machine learning.",
  },
  {
    name: "Amelia Lopez",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfNq4Doa0ebZrSqWXy9d5fepGJzC0alvMuYiOT",
    about: "Focused on performance, maintainability, and developer happiness.",
  },
  {
    name: "Harper Gonzalez",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfH9LSTe0sJckvrfA68VtPueNZTy04Olp7E1I3",
    about: "JavaScript all day, side projects all night.",
  },
  {
    name: "Evelyn Wilson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfzaFuqYwMLq6f7o23bRdIeXQHYErmW9NFcnPa",
    about: "Coding for impact, not just output.",
  },
  {
    name: "Abigail Anderson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfk4jyKnUW7cV83MFp2tleydbu96NoI5SHfsOD",
    about: "Engineer who believes design and code are one craft.",
  },
  {
    name: "Ella Thomas",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfUGPb6rcfAdqziM4vkoIS3V91mC7whxNas2ju",
    about: "Helping teams move fast without breaking things.",
  },
  {
    name: "Scarlett Taylor",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfJcQ50NtkuFP8DIayV5YnMlCB3bshcW1JNtiL",
    about: "I like debugging almost as much as building.",
  },
  {
    name: "Grace Moore",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfu0VZYsqDxLMtcv2yBUnWr68ShfwaEZmoXF0g",
    about: "Solving real problems with thoughtful software.",
  },
  {
    name: "Chloe Jackson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfTqZmrtNXKGwUodlyzBT0PLjHbiuZxDfC5EQv",
    about: "Lover of open-source and clean documentation.",
  },
  {
    name: "Luna Martin",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfEV4dADfYVN7iHq95pG8MtnevbThAkX0lW64s",
    about: "Building digital experiences that actually feel good to use.",
  },
  {
    name: "Victoria Lee",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfWC1QFLGpLlEVP3t7jYwGBc2dJTAegHZyzsMu",
    about: "Striving for elegant solutions to complex challenges.",
  },
  {
    name: "Aria Perez",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfBHpdSXrnlo3AqjRCW7rZbdPVsIacO6N4hkzX",
    about: "Engineer who enjoys teaching and mentoring juniors.",
  },
  {
    name: "Layla Thompson",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfEnVSe5fYVN7iHq95pG8MtnevbThAkX0lW64s",
    about: "Focused on simplicity, scalability, and sustainability.",
  },
  {
    name: "Penelope White",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LflrNrQNTawtDTq7i5jOlyfv4m1cZXNsebUHzg",
    about: "I enjoy refactoring messy code into something beautiful.",
  },
  {
    name: "Riley Harris",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lf9Z1h4LmfMR2dnov8m67zaXb4gcHStejTPKDl",
    about: "Always looking for better ways to build and deploy.",
  },
  {
    name: "Nora Clark",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LfmbgmD7iO2FKrZ6NHCzBIstDUxTkEPJpSq9w8",
    about: "Product-focused developer who loves user feedback.",
  },

  {
    name: "Lily Young",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1LffujEPoLMwQHXiWT74nbhtcopYCuGjvmFkLxR",
    about: "Turning messy requirements into maintainable systems.",
  },
  {
    name: "Hannah Walker",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lfu1EYWZqDxLMtcv2yBUnWr68ShfwaEZmoXF0g",
    about: "Writing less boilerplate, more business logic.",
  },

  {
    name: "Violet Green",
    picture:
      "https://sz1jfkffhi.ufs.sh/f/RkjMxMpNw1Lf4S4ZYvFV9NxkfbIcel0ZWHT7GRLd3oAmar8E",
    about: "Bridging the gap between design and engineering.",
  },
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

export const skills = [
  {
    name: "React",
    _id: "6904a969d6f129bb595057ed",
  },
  {
    name: "Next.js",
    _id: "6904a969d6f129bb595057ee",
  },
  {
    name: "Vue.js",
    _id: "6904a969d6f129bb595057ef",
  },
  {
    name: "Nuxt.js",
    _id: "6904a969d6f129bb595057f0",
  },
  {
    name: "Angular",
    _id: "6904a969d6f129bb595057f1",
  },
  {
    name: "Svelte",
    _id: "6904a969d6f129bb595057f2",
  },
  {
    name: "SvelteKit",
    _id: "6904a969d6f129bb595057f3",
  },
  {
    name: "Solid.js",
    _id: "6904a969d6f129bb595057f4",
  },
  {
    name: "Qwik",
    _id: "6904a969d6f129bb595057f5",
  },
  {
    name: "Astro",
    _id: "6904a969d6f129bb595057f6",
  },
  {
    name: "Remix",
    _id: "6904a969d6f129bb595057f7",
  },
  {
    name: "Gatsby",
    _id: "6904a969d6f129bb595057f8",
  },
  {
    name: "Ember.js",
    _id: "6904a969d6f129bb595057f9",
  },
  {
    name: "Backbone.js",
    _id: "6904a969d6f129bb595057fa",
  },
  {
    name: "Alpine.js",
    _id: "6904a969d6f129bb595057fb",
  },
  {
    name: "Preact",
    _id: "6904a969d6f129bb595057fc",
  },
  {
    name: "Lit",
    _id: "6904a969d6f129bb595057fd",
  },
  {
    name: "HTML",
    _id: "6904a969d6f129bb595057fe",
  },
  {
    name: "CSS",
    _id: "6904a969d6f129bb595057ff",
  },
  {
    name: "JavaScript",
    _id: "6904a969d6f129bb59505800",
  },
  {
    name: "TypeScript",
    _id: "6904a969d6f129bb59505801",
  },
  {
    name: "WebAssembly",
    _id: "6904a969d6f129bb59505802",
  },
  {
    name: "jQuery",
    _id: "6904a969d6f129bb59505803",
  },
  {
    name: "Tailwind CSS",
    _id: "6904a969d6f129bb59505804",
  },
  {
    name: "Bootstrap",
    _id: "6904a969d6f129bb59505805",
  },
  {
    name: "Material UI",
    _id: "6904a969d6f129bb59505806",
  },
  {
    name: "Chakra UI",
    _id: "6904a969d6f129bb59505807",
  },
  {
    name: "Ant Design",
    _id: "6904a969d6f129bb59505808",
  },
  {
    name: "Shadcn/ui",
    _id: "6904a969d6f129bb59505809",
  },
  {
    name: "Radix UI",
    _id: "6904a969d6f129bb5950580a",
  },
  {
    name: "Mantine",
    _id: "6904a969d6f129bb5950580b",
  },
  {
    name: "Styled Components",
    _id: "6904a969d6f129bb5950580c",
  },
  {
    name: "CSS Modules",
    _id: "6904a969d6f129bb5950580d",
  },
  {
    name: "Sass",
    _id: "6904a969d6f129bb5950580e",
  },
  {
    name: "SCSS",
    _id: "6904a969d6f129bb5950580f",
  },
  {
    name: "Less",
    _id: "6904a969d6f129bb59505810",
  },
  {
    name: "PostCSS",
    _id: "6904a969d6f129bb59505811",
  },
  {
    name: "Emotion",
    _id: "6904a969d6f129bb59505812",
  },
  {
    name: "Vanilla Extract",
    _id: "6904a969d6f129bb59505813",
  },
  {
    name: "Node.js",
    _id: "6904a969d6f129bb59505814",
  },
  {
    name: "Express.js",
    _id: "6904a969d6f129bb59505815",
  },
  {
    name: "Nest.js",
    _id: "6904a969d6f129bb59505816",
  },
  {
    name: "Fastify",
    _id: "6904a969d6f129bb59505817",
  },
  {
    name: "Koa",
    _id: "6904a969d6f129bb59505818",
  },
  {
    name: "Hapi",
    _id: "6904a969d6f129bb59505819",
  },
  {
    name: "Adonis.js",
    _id: "6904a969d6f129bb5950581a",
  },
  {
    name: "Deno",
    _id: "6904a969d6f129bb5950581b",
  },
  {
    name: "Bun",
    _id: "6904a969d6f129bb5950581c",
  },
  {
    name: "Django",
    _id: "6904a969d6f129bb5950581d",
  },
  {
    name: "Flask",
    _id: "6904a969d6f129bb5950581e",
  },
  {
    name: "FastAPI",
    _id: "6904a969d6f129bb5950581f",
  },
  {
    name: "Pyramid",
    _id: "6904a969d6f129bb59505820",
  },
  {
    name: "Tornado",
    _id: "6904a969d6f129bb59505821",
  },
  {
    name: "Bottle",
    _id: "6904a969d6f129bb59505822",
  },
  {
    name: "Spring Boot",
    _id: "6904a969d6f129bb59505823",
  },
  {
    name: "Spring Framework",
    _id: "6904a969d6f129bb59505824",
  },
  {
    name: "Hibernate",
    _id: "6904a969d6f129bb59505825",
  },
  {
    name: "Micronaut",
    _id: "6904a969d6f129bb59505826",
  },
  {
    name: "Quarkus",
    _id: "6904a969d6f129bb59505827",
  },
  {
    name: "Play Framework",
    _id: "6904a969d6f129bb59505828",
  },
  {
    name: "Vert.x",
    _id: "6904a969d6f129bb59505829",
  },
  {
    name: ".NET",
    _id: "6904a969d6f129bb5950582a",
  },
  {
    name: ".NET Core",
    _id: "6904a969d6f129bb5950582b",
  },
  {
    name: "ASP.NET",
    _id: "6904a969d6f129bb5950582c",
  },
  {
    name: "ASP.NET Core",
    _id: "6904a969d6f129bb5950582d",
  },
  {
    name: "Blazor",
    _id: "6904a969d6f129bb5950582e",
  },
  {
    name: "Entity Framework",
    _id: "6904a969d6f129bb5950582f",
  },
  {
    name: "C#",
    _id: "6904a969d6f129bb59505830",
  },
  {
    name: "Laravel",
    _id: "6904a969d6f129bb59505831",
  },
  {
    name: "Symfony",
    _id: "6904a969d6f129bb59505832",
  },
  {
    name: "CodeIgniter",
    _id: "6904a969d6f129bb59505833",
  },
  {
    name: "CakePHP",
    _id: "6904a969d6f129bb59505834",
  },
  {
    name: "Yii",
    _id: "6904a969d6f129bb59505835",
  },
  {
    name: "Slim",
    _id: "6904a969d6f129bb59505836",
  },
  {
    name: "Phalcon",
    _id: "6904a969d6f129bb59505837",
  },
  {
    name: "Ruby on Rails",
    _id: "6904a969d6f129bb59505838",
  },
  {
    name: "Sinatra",
    _id: "6904a969d6f129bb59505839",
  },
  {
    name: "Hanami",
    _id: "6904a969d6f129bb5950583a",
  },
  {
    name: "Gin",
    _id: "6904a969d6f129bb5950583b",
  },
  {
    name: "Echo",
    _id: "6904a969d6f129bb5950583c",
  },
  {
    name: "Fiber",
    _id: "6904a969d6f129bb5950583d",
  },
  {
    name: "Beego",
    _id: "6904a969d6f129bb5950583e",
  },
  {
    name: "Revel",
    _id: "6904a969d6f129bb5950583f",
  },
  {
    name: "Actix",
    _id: "6904a969d6f129bb59505840",
  },
  {
    name: "Rocket",
    _id: "6904a969d6f129bb59505841",
  },
  {
    name: "Axum",
    _id: "6904a969d6f129bb59505842",
  },
  {
    name: "Warp",
    _id: "6904a969d6f129bb59505843",
  },
  {
    name: "React Native",
    _id: "6904a969d6f129bb59505844",
  },
  {
    name: "Flutter",
    _id: "6904a969d6f129bb59505845",
  },
  {
    name: "Swift",
    _id: "6904a969d6f129bb59505846",
  },
  {
    name: "SwiftUI",
    _id: "6904a969d6f129bb59505847",
  },
  {
    name: "Kotlin",
    _id: "6904a969d6f129bb59505848",
  },
  {
    name: "Jetpack Compose",
    _id: "6904a969d6f129bb59505849",
  },
  {
    name: "Ionic",
    _id: "6904a969d6f129bb5950584a",
  },
  {
    name: "Xamarin",
    _id: "6904a969d6f129bb5950584b",
  },
  {
    name: "Cordova",
    _id: "6904a969d6f129bb5950584c",
  },
  {
    name: "Capacitor",
    _id: "6904a969d6f129bb5950584d",
  },
  {
    name: "Expo",
    _id: "6904a969d6f129bb5950584e",
  },
  {
    name: "PostgreSQL",
    _id: "6904a969d6f129bb5950584f",
  },
  {
    name: "MySQL",
    _id: "6904a969d6f129bb59505850",
  },
  {
    name: "MariaDB",
    _id: "6904a969d6f129bb59505851",
  },
  {
    name: "SQLite",
    _id: "6904a969d6f129bb59505852",
  },
  {
    name: "Microsoft SQL Server",
    _id: "6904a969d6f129bb59505853",
  },
  {
    name: "Oracle Database",
    _id: "6904a969d6f129bb59505854",
  },
  {
    name: "CockroachDB",
    _id: "6904a969d6f129bb59505855",
  },
  {
    name: "MongoDB",
    _id: "6904a969d6f129bb59505856",
  },
  {
    name: "Redis",
    _id: "6904a969d6f129bb59505857",
  },
  {
    name: "Cassandra",
    _id: "6904a969d6f129bb59505858",
  },
  {
    name: "DynamoDB",
    _id: "6904a969d6f129bb59505859",
  },
  {
    name: "Couchbase",
    _id: "6904a969d6f129bb5950585a",
  },
  {
    name: "CouchDB",
    _id: "6904a969d6f129bb5950585b",
  },
  {
    name: "Neo4j",
    _id: "6904a969d6f129bb5950585c",
  },
  {
    name: "ArangoDB",
    _id: "6904a969d6f129bb5950585d",
  },
  {
    name: "Firebase Realtime Database",
    _id: "6904a969d6f129bb5950585e",
  },
  {
    name: "Firestore",
    _id: "6904a969d6f129bb5950585f",
  },
  {
    name: "Prisma",
    _id: "6904a969d6f129bb59505860",
  },
  {
    name: "TypeORM",
    _id: "6904a969d6f129bb59505861",
  },
  {
    name: "Sequelize",
    _id: "6904a969d6f129bb59505862",
  },
  {
    name: "Drizzle",
    _id: "6904a969d6f129bb59505863",
  },
  {
    name: "Mongoose",
    _id: "6904a969d6f129bb59505864",
  },
  {
    name: "Knex.js",
    _id: "6904a969d6f129bb59505865",
  },
  {
    name: "SQLAlchemy",
    _id: "6904a969d6f129bb59505866",
  },
  {
    name: "Eloquent",
    _id: "6904a969d6f129bb59505867",
  },
  {
    name: "AWS",
    _id: "6904a969d6f129bb59505868",
  },
  {
    name: "Google Cloud Platform",
    _id: "6904a969d6f129bb59505869",
  },
  {
    name: "Microsoft Azure",
    _id: "6904a969d6f129bb5950586a",
  },
  {
    name: "DigitalOcean",
    _id: "6904a969d6f129bb5950586b",
  },
  {
    name: "Heroku",
    _id: "6904a969d6f129bb5950586c",
  },
  {
    name: "Vercel",
    _id: "6904a969d6f129bb5950586d",
  },
  {
    name: "Netlify",
    _id: "6904a969d6f129bb5950586e",
  },
  {
    name: "Railway",
    _id: "6904a969d6f129bb5950586f",
  },
  {
    name: "Render",
    _id: "6904a969d6f129bb59505870",
  },
  {
    name: "Fly.io",
    _id: "6904a969d6f129bb59505871",
  },
  {
    name: "Cloudflare",
    _id: "6904a969d6f129bb59505872",
  },
  {
    name: "Linode",
    _id: "6904a969d6f129bb59505873",
  },
  {
    name: "Vultr",
    _id: "6904a969d6f129bb59505874",
  },
  {
    name: "AWS Lambda",
    _id: "6904a969d6f129bb59505875",
  },
  {
    name: "AWS EC2",
    _id: "6904a969d6f129bb59505876",
  },
  {
    name: "AWS S3",
    _id: "6904a969d6f129bb59505877",
  },
  {
    name: "AWS RDS",
    _id: "6904a969d6f129bb59505878",
  },
  {
    name: "AWS DynamoDB",
    _id: "6904a969d6f129bb59505879",
  },
  {
    name: "AWS CloudFront",
    _id: "6904a969d6f129bb5950587a",
  },
  {
    name: "AWS API Gateway",
    _id: "6904a969d6f129bb5950587b",
  },
  {
    name: "AWS Cognito",
    _id: "6904a969d6f129bb5950587c",
  },
  {
    name: "AWS ECS",
    _id: "6904a969d6f129bb5950587d",
  },
  {
    name: "AWS EKS",
    _id: "6904a969d6f129bb5950587e",
  },
  {
    name: "Docker",
    _id: "6904a969d6f129bb5950587f",
  },
  {
    name: "Kubernetes",
    _id: "6904a969d6f129bb59505880",
  },
  {
    name: "Jenkins",
    _id: "6904a969d6f129bb59505881",
  },
  {
    name: "GitHub Actions",
    _id: "6904a969d6f129bb59505882",
  },
  {
    name: "GitLab CI",
    _id: "6904a969d6f129bb59505883",
  },
  {
    name: "CircleCI",
    _id: "6904a969d6f129bb59505884",
  },
  {
    name: "Travis CI",
    _id: "6904a969d6f129bb59505885",
  },
  {
    name: "ArgoCD",
    _id: "6904a969d6f129bb59505886",
  },
  {
    name: "Terraform",
    _id: "6904a969d6f129bb59505887",
  },
  {
    name: "Ansible",
    _id: "6904a969d6f129bb59505888",
  },
  {
    name: "Chef",
    _id: "6904a969d6f129bb59505889",
  },
  {
    name: "Puppet",
    _id: "6904a969d6f129bb5950588a",
  },
  {
    name: "Vagrant",
    _id: "6904a969d6f129bb5950588b",
  },
  {
    name: "Helm",
    _id: "6904a969d6f129bb5950588c",
  },
  {
    name: "Prometheus",
    _id: "6904a969d6f129bb5950588d",
  },
  {
    name: "Grafana",
    _id: "6904a969d6f129bb5950588e",
  },
  {
    name: "Nginx",
    _id: "6904a969d6f129bb5950588f",
  },
  {
    name: "Apache",
    _id: "6904a969d6f129bb59505890",
  },
  {
    name: "Caddy",
    _id: "6904a969d6f129bb59505891",
  },
  {
    name: "Git",
    _id: "6904a969d6f129bb59505892",
  },
  {
    name: "GitHub",
    _id: "6904a969d6f129bb59505893",
  },
  {
    name: "GitLab",
    _id: "6904a969d6f129bb59505894",
  },
  {
    name: "Bitbucket",
    _id: "6904a969d6f129bb59505895",
  },
  {
    name: "Mercurial",
    _id: "6904a969d6f129bb59505896",
  },
  {
    name: "SVN",
    _id: "6904a969d6f129bb59505897",
  },
  {
    name: "Jest",
    _id: "6904a969d6f129bb59505898",
  },
  {
    name: "Vitest",
    _id: "6904a969d6f129bb59505899",
  },
  {
    name: "Mocha",
    _id: "6904a969d6f129bb5950589a",
  },
  {
    name: "Chai",
    _id: "6904a969d6f129bb5950589b",
  },
  {
    name: "Jasmine",
    _id: "6904a969d6f129bb5950589c",
  },
  {
    name: "Cypress",
    _id: "6904a969d6f129bb5950589d",
  },
  {
    name: "Playwright",
    _id: "6904a969d6f129bb5950589e",
  },
  {
    name: "Selenium",
    _id: "6904a969d6f129bb5950589f",
  },
  {
    name: "Puppeteer",
    _id: "6904a969d6f129bb595058a0",
  },
  {
    name: "Testing Library",
    _id: "6904a969d6f129bb595058a1",
  },
  {
    name: "Enzyme",
    _id: "6904a969d6f129bb595058a2",
  },
  {
    name: "JUnit",
    _id: "6904a969d6f129bb595058a3",
  },
  {
    name: "PyTest",
    _id: "6904a969d6f129bb595058a4",
  },
  {
    name: "PHPUnit",
    _id: "6904a969d6f129bb595058a5",
  },
  {
    name: "RSpec",
    _id: "6904a969d6f129bb595058a6",
  },
  {
    name: "Postman",
    _id: "6904a969d6f129bb595058a7",
  },
  {
    name: "Insomnia",
    _id: "6904a969d6f129bb595058a8",
  },
  {
    name: "Redux",
    _id: "6904a969d6f129bb595058a9",
  },
  {
    name: "Redux Toolkit",
    _id: "6904a969d6f129bb595058aa",
  },
  {
    name: "MobX",
    _id: "6904a969d6f129bb595058ab",
  },
  {
    name: "Zustand",
    _id: "6904a969d6f129bb595058ac",
  },
  {
    name: "Recoil",
    _id: "6904a969d6f129bb595058ad",
  },
  {
    name: "Jotai",
    _id: "6904a969d6f129bb595058ae",
  },
  {
    name: "XState",
    _id: "6904a969d6f129bb595058af",
  },
  {
    name: "Context API",
    _id: "6904a969d6f129bb595058b0",
  },
  {
    name: "Pinia",
    _id: "6904a969d6f129bb595058b1",
  },
  {
    name: "Vuex",
    _id: "6904a969d6f129bb595058b2",
  },
  {
    name: "NgRx",
    _id: "6904a969d6f129bb595058b3",
  },
  {
    name: "REST API",
    _id: "6904a969d6f129bb595058b4",
  },
  {
    name: "GraphQL",
    _id: "6904a969d6f129bb595058b5",
  },
  {
    name: "Apollo",
    _id: "6904a969d6f129bb595058b6",
  },
  {
    name: "tRPC",
    _id: "6904a969d6f129bb595058b7",
  },
  {
    name: "gRPC",
    _id: "6904a969d6f129bb595058b8",
  },
  {
    name: "WebSockets",
    _id: "6904a969d6f129bb595058b9",
  },
  {
    name: "Socket.io",
    _id: "6904a969d6f129bb595058ba",
  },
  {
    name: "JSON",
    _id: "6904a969d6f129bb595058bb",
  },
  {
    name: "XML",
    _id: "6904a969d6f129bb595058bc",
  },
  {
    name: "OpenAPI",
    _id: "6904a969d6f129bb595058bd",
  },
  {
    name: "Swagger",
    _id: "6904a969d6f129bb595058be",
  },
  {
    name: "OAuth",
    _id: "6904a969d6f129bb595058bf",
  },
  {
    name: "JWT",
    _id: "6904a969d6f129bb595058c0",
  },
  {
    name: "Auth0",
    _id: "6904a969d6f129bb595058c1",
  },
  {
    name: "Firebase Auth",
    _id: "6904a969d6f129bb595058c2",
  },
  {
    name: "NextAuth",
    _id: "6904a969d6f129bb595058c3",
  },
  {
    name: "Passport.js",
    _id: "6904a969d6f129bb595058c4",
  },
  {
    name: "Keycloak",
    _id: "6904a969d6f129bb595058c5",
  },
  {
    name: "Okta",
    _id: "6904a969d6f129bb595058c6",
  },
  {
    name: "Kafka",
    _id: "6904a969d6f129bb595058c7",
  },
  {
    name: "RabbitMQ",
    _id: "6904a969d6f129bb595058c8",
  },
  {
    name: "MQTT",
    _id: "6904a969d6f129bb595058c9",
  },
  {
    name: "Apache Pulsar",
    _id: "6904a969d6f129bb595058ca",
  },
  {
    name: "Redis Pub/Sub",
    _id: "6904a969d6f129bb595058cb",
  },
  {
    name: "AWS SQS",
    _id: "6904a969d6f129bb595058cc",
  },
  {
    name: "AWS SNS",
    _id: "6904a969d6f129bb595058cd",
  },
  {
    name: "Elasticsearch",
    _id: "6904a969d6f129bb595058ce",
  },
  {
    name: "Algolia",
    _id: "6904a969d6f129bb595058cf",
  },
  {
    name: "Meilisearch",
    _id: "6904a969d6f129bb595058d0",
  },
  {
    name: "Typesense",
    _id: "6904a969d6f129bb595058d1",
  },
  {
    name: "Solr",
    _id: "6904a969d6f129bb595058d2",
  },
  {
    name: "WordPress",
    _id: "6904a969d6f129bb595058d3",
  },
  {
    name: "Contentful",
    _id: "6904a969d6f129bb595058d4",
  },
  {
    name: "Strapi",
    _id: "6904a969d6f129bb595058d5",
  },
  {
    name: "Sanity",
    _id: "6904a969d6f129bb595058d6",
  },
  {
    name: "Ghost",
    _id: "6904a969d6f129bb595058d7",
  },
  {
    name: "Prismic",
    _id: "6904a969d6f129bb595058d8",
  },
  {
    name: "Directus",
    _id: "6904a969d6f129bb595058d9",
  },
  {
    name: "Payload CMS",
    _id: "6904a969d6f129bb595058da",
  },
  {
    name: "Webpack",
    _id: "6904a969d6f129bb595058db",
  },
  {
    name: "Vite",
    _id: "6904a969d6f129bb595058dc",
  },
  {
    name: "Rollup",
    _id: "6904a969d6f129bb595058dd",
  },
  {
    name: "Parcel",
    _id: "6904a969d6f129bb595058de",
  },
  {
    name: "esbuild",
    _id: "6904a969d6f129bb595058df",
  },
  {
    name: "Turbopack",
    _id: "6904a969d6f129bb595058e0",
  },
  {
    name: "SWC",
    _id: "6904a969d6f129bb595058e1",
  },
  {
    name: "Babel",
    _id: "6904a969d6f129bb595058e2",
  },
  {
    name: "Gulp",
    _id: "6904a969d6f129bb595058e3",
  },
  {
    name: "Grunt",
    _id: "6904a969d6f129bb595058e4",
  },
  {
    name: "npm",
    _id: "6904a969d6f129bb595058e5",
  },
  {
    name: "Yarn",
    _id: "6904a969d6f129bb595058e6",
  },
  {
    name: "pnpm",
    _id: "6904a969d6f129bb595058e7",
  },
  {
    name: "pip",
    _id: "6904a969d6f129bb595058e8",
  },
  {
    name: "Composer",
    _id: "6904a969d6f129bb595058e9",
  },
  {
    name: "Maven",
    _id: "6904a969d6f129bb595058ea",
  },
  {
    name: "Gradle",
    _id: "6904a969d6f129bb595058eb",
  },
  {
    name: "NuGet",
    _id: "6904a969d6f129bb595058ec",
  },
  {
    name: "Python",
    _id: "6904a969d6f129bb595058ed",
  },
  {
    name: "Java",
    _id: "6904a969d6f129bb595058ee",
  },
  {
    name: "Go",
    _id: "6904a969d6f129bb595058ef",
  },
  {
    name: "Rust",
    _id: "6904a969d6f129bb595058f0",
  },
  {
    name: "C",
    _id: "6904a969d6f129bb595058f1",
  },
  {
    name: "C++",
    _id: "6904a969d6f129bb595058f2",
  },
  {
    name: "PHP",
    _id: "6904a969d6f129bb595058f3",
  },
  {
    name: "Ruby",
    _id: "6904a969d6f129bb595058f4",
  },
  {
    name: "Scala",
    _id: "6904a969d6f129bb595058f5",
  },
  {
    name: "Elixir",
    _id: "6904a969d6f129bb595058f6",
  },
  {
    name: "Clojure",
    _id: "6904a969d6f129bb595058f7",
  },
  {
    name: "Haskell",
    _id: "6904a969d6f129bb595058f8",
  },
  {
    name: "Dart",
    _id: "6904a969d6f129bb595058f9",
  },
  {
    name: "Objective-C",
    _id: "6904a969d6f129bb595058fa",
  },
  {
    name: "R",
    _id: "6904a969d6f129bb595058fb",
  },
  {
    name: "Julia",
    _id: "6904a969d6f129bb595058fc",
  },
  {
    name: "Lua",
    _id: "6904a969d6f129bb595058fd",
  },
  {
    name: "Perl",
    _id: "6904a969d6f129bb595058fe",
  },
  {
    name: "TensorFlow",
    _id: "6904a969d6f129bb595058ff",
  },
  {
    name: "PyTorch",
    _id: "6904a969d6f129bb59505900",
  },
  {
    name: "Keras",
    _id: "6904a969d6f129bb59505901",
  },
  {
    name: "scikit-learn",
    _id: "6904a969d6f129bb59505902",
  },
  {
    name: "Pandas",
    _id: "6904a969d6f129bb59505903",
  },
  {
    name: "NumPy",
    _id: "6904a969d6f129bb59505904",
  },
  {
    name: "Jupyter",
    _id: "6904a969d6f129bb59505905",
  },
  {
    name: "OpenAI API",
    _id: "6904a969d6f129bb59505906",
  },
  {
    name: "Langchain",
    _id: "6904a969d6f129bb59505907",
  },
  {
    name: "Langgraph",
    _id: "6904a969d6f129bb59505908",
  },
  {
    name: "Langfuse",
    _id: "6904a969d6f129bb59505909",
  },
  {
    name: "Machine Learning",
    _id: "6904a969d6f129bb5950590a",
  },
  {
    name: "Deep Learning",
    _id: "6904a969d6f129bb5950590b",
  },
  {
    name: "Natural Language Processing",
    _id: "6904a969d6f129bb5950590c",
  },
  {
    name: "Computer Vision",
    _id: "6904a969d6f129bb5950590d",
  },
  {
    name: "Data Analysis",
    _id: "6904a969d6f129bb5950590e",
  },
  {
    name: "Qdrant",
    _id: "6904a969d6f129bb5950590f",
  },
  {
    name: "Solidity",
    _id: "6904a969d6f129bb59505910",
  },
  {
    name: "Ethereum",
    _id: "6904a969d6f129bb59505911",
  },
  {
    name: "Web3.js",
    _id: "6904a969d6f129bb59505912",
  },
  {
    name: "Ethers.js",
    _id: "6904a969d6f129bb59505913",
  },
  {
    name: "Smart Contracts",
    _id: "6904a969d6f129bb59505914",
  },
  {
    name: "Hardhat",
    _id: "6904a969d6f129bb59505915",
  },
  {
    name: "Truffle",
    _id: "6904a969d6f129bb59505916",
  },
  {
    name: "Unity",
    _id: "6904a969d6f129bb59505917",
  },
  {
    name: "Unreal Engine",
    _id: "6904a969d6f129bb59505918",
  },
  {
    name: "Godot",
    _id: "6904a969d6f129bb59505919",
  },
  {
    name: "Phaser",
    _id: "6904a969d6f129bb5950591a",
  },
  {
    name: "Three.js",
    _id: "6904a969d6f129bb5950591b",
  },
  {
    name: "Babylon.js",
    _id: "6904a969d6f129bb5950591c",
  },
  {
    name: "PixiJS",
    _id: "6904a969d6f129bb5950591d",
  },
  {
    name: "Electron",
    _id: "6904a969d6f129bb5950591e",
  },
  {
    name: "Tauri",
    _id: "6904a969d6f129bb5950591f",
  },
  {
    name: "Qt",
    _id: "6904a969d6f129bb59505920",
  },
  {
    name: "WPF",
    _id: "6904a969d6f129bb59505921",
  },
  {
    name: "WinForms",
    _id: "6904a969d6f129bb59505922",
  },
  {
    name: "GTK",
    _id: "6904a969d6f129bb59505923",
  },
  {
    name: "Linux",
    _id: "6904a969d6f129bb59505924",
  },
  {
    name: "Bash",
    _id: "6904a969d6f129bb59505925",
  },
  {
    name: "PowerShell",
    _id: "6904a969d6f129bb59505926",
  },
  {
    name: "Vim",
    _id: "6904a969d6f129bb59505927",
  },
  {
    name: "VS Code",
    _id: "6904a969d6f129bb59505928",
  },
  {
    name: "IntelliJ IDEA",
    _id: "6904a969d6f129bb59505929",
  },
  {
    name: "Eclipse",
    _id: "6904a969d6f129bb5950592a",
  },
  {
    name: "Xcode",
    _id: "6904a969d6f129bb5950592b",
  },
  {
    name: "Android Studio",
    _id: "6904a969d6f129bb5950592c",
  },
  {
    name: "Figma",
    _id: "6904a969d6f129bb5950592d",
  },
  {
    name: "Adobe XD",
    _id: "6904a969d6f129bb5950592e",
  },
  {
    name: "Sketch",
    _id: "6904a969d6f129bb5950592f",
  },
  {
    name: "Jira",
    _id: "6904a969d6f129bb59505930",
  },
  {
    name: "Confluence",
    _id: "6904a969d6f129bb59505931",
  },
  {
    name: "Notion",
    _id: "6904a969d6f129bb59505932",
  },
  {
    name: "Slack",
    _id: "6904a969d6f129bb59505933",
  },
  {
    name: "Discord",
    _id: "6904a969d6f129bb59505934",
  },
  {
    name: "Agile",
    _id: "6904a969d6f129bb59505935",
  },
  {
    name: "Scrum",
    _id: "6904a969d6f129bb59505936",
  },
  {
    name: "Kanban",
    _id: "6904a969d6f129bb59505937",
  },
  {
    name: "Microservices",
    _id: "6904a969d6f129bb59505938",
  },
  {
    name: "Monorepo",
    _id: "6904a969d6f129bb59505939",
  },
  {
    name: "Serverless",
    _id: "6904a969d6f129bb5950593a",
  },
  {
    name: "JAMstack",
    _id: "6904a969d6f129bb5950593b",
  },
  {
    name: "Progressive Web Apps",
    _id: "6904a969d6f129bb5950593c",
  },
  {
    name: "Responsive Design",
    _id: "6904a969d6f129bb5950593d",
  },
  {
    name: "Accessibility",
    _id: "6904a969d6f129bb5950593e",
  },
  {
    name: "SEO",
    _id: "6904a969d6f129bb5950593f",
  },
  {
    name: "Performance Optimization",
    _id: "6904a969d6f129bb59505940",
  },
  {
    name: "Code Review",
    _id: "6904a969d6f129bb59505941",
  },
  {
    name: "Technical Writing",
    _id: "6904a969d6f129bb59505942",
  },
  {
    name: "System Design",
    _id: "6904a969d6f129bb59505943",
  },
  {
    name: "Design Patterns",
    _id: "6904a969d6f129bb59505944",
  },
  {
    name: "Data Structures",
    _id: "6904a969d6f129bb59505945",
  },
  {
    name: "Algorithms",
    _id: "6904a969d6f129bb59505946",
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

export const dummyUsersData = users.map((user, index) => {
  const cityIndex = index % cities.length;

  return {
    name: user.name,
    email: `${user.name.replace(" ", "")!.toLowerCase()}@devtinder.com`,
    password: "$2b$12$l28iPzQcY2rfzxCwTH4JUON1nt4e6j9DHkXTWLgLCFW8q5aCn7sGu",
    gender: index <= 32 ? "male" : "female",
    isEmailVerified: true,
    onboardingCompleted: true,
    about: user.about,
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
    profilePicture: user.picture,
    skills: generateSkills(),
  };
});
