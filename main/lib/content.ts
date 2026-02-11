export type Service = {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  deliverables: string[];
  deployments: string[];
  faqs: { question: string; answer: string }[];
};

export const services: Service[] = [
  {
    slug: "voice-sip-pbx",
    title: "Voice / SIP Trunks / PBX",
    summary:
      "Carrier-grade voice services with survivable routing, elevator lines, and reliable call flows.",
    problem:
      "Voice systems fail when trunking, power, or routing is an afterthought.",
    solution:
      "We design SIP and PBX stacks that can reroute, fail over, and keep critical calls live.",
    deliverables: [
      "Carrier trunks + SIP registration",
      "Hosted or hybrid PBX design",
      "Failover routing + call testing",
      "Documentation + admin training",
    ],
    deployments: [
      "Retail locations and small campuses",
      "Multi-tenant buildings and elevators",
      "Rural facilities with intermittent connectivity",
    ],
    faqs: [
      {
        question: "Do you support elevator lines?",
        answer: "Yes, including line monitoring and survivable routing options.",
      },
      {
        question: "Can you integrate with existing PBX hardware?",
        answer: "We can extend or migrate existing systems while minimizing downtime.",
      },
    ],
  },
  {
    slug: "wisp-rural-connectivity",
    title: "WISP / Rural Connectivity",
    summary:
      "Surveys, backhaul planning, and dependable last-mile coverage for hard terrain.",
    problem:
      "Rural coverage suffers when RF design and power budgets are guessed instead of measured.",
    solution:
      "We map terrain, plan backhaul, and deploy hardened gear built for remote sites.",
    deliverables: [
      "Site surveys + RF path analysis",
      "Backhaul planning and tower builds",
      "Customer premises installs",
      "Monitoring + maintenance plan",
    ],
    deployments: [
      "Rural residential coverage",
      "Industrial sites and farms",
      "Remote public safety facilities",
    ],
    faqs: [
      {
        question: "Which vendors do you work with?",
        answer: "Ubiquiti, Cambium, Aruba, MikroTik, and custom mixes as needed.",
      },
      {
        question: "Can you rescue underperforming links?",
        answer: "Yes. We troubleshoot and re-engineer for stability and throughput.",
      },
    ],
  },
  {
    slug: "security-access",
    title: "Security & Access",
    summary:
      "Cameras, access control, and structured cabling with clean installs and secure retention.",
    problem:
      "Security systems fail when cabling, power, and storage are not designed together.",
    solution:
      "We integrate cameras, access control, and network infrastructure as one secure system.",
    deliverables: [
      "Camera + access control deployment",
      "Structured cabling + network design",
      "Storage and retention planning",
      "As-built documentation",
    ],
    deployments: [
      "Retail and warehouse facilities",
      "Multi-building campuses",
      "Rural properties and remote sites",
    ],
    faqs: [
      {
        question: "Can you integrate with existing cameras?",
        answer: "We can unify and reconfigure most modern IP systems.",
      },
      {
        question: "Do you handle offsite monitoring?",
        answer: "We can coordinate with monitoring providers and central stations.",
      },
    ],
  },
  {
    slug: "fire-burg-comms",
    title: "Fire & Burg Panel Communications",
    summary:
      "Reliable communications paths, dialer capture, and central station coordination.",
    problem:
      "Fire and burglar panels lose signal when comms paths are outdated or untested.",
    solution:
      "We deploy cellular communicators, dialer capture, and testing plans that keep signals alive.",
    deliverables: [
      "Communications path planning",
      "Cellular communicator installs",
      "Signal testing + monitoring setup",
      "Coordination with central stations",
    ],
    deployments: [
      "Commercial buildings",
      "Remote facilities",
      "Legacy panel upgrades",
    ],
    faqs: [
      {
        question: "Are you a fire alarm installer?",
        answer: "We focus on communications and integration support, not AHJ-required installations.",
      },
      {
        question: "Do you work with Telguard?",
        answer: "Yes, including configuration, testing, and ongoing monitoring coordination.",
      },
    ],
  },
  {
    slug: "lora-asset-monitoring",
    title: "LoRa Asset + Animal Monitoring",
    summary:
      "Low-power tracking, geofencing, and telemetry for long-range coverage.",
    problem:
      "Traditional tracking fails in wide, rural environments with limited power and coverage.",
    solution:
      "We design LoRa networks with gateways, sensors, and alerts tailored to the terrain.",
    deliverables: [
      "LoRa gateway deployment",
      "Asset or animal trackers",
      "Telemetry dashboards",
      "Alerting + data retention",
    ],
    deployments: [
      "Homesteads and ranches",
      "Remote equipment yards",
      "Agricultural operations",
    ],
    faqs: [
      {
        question: "How far will LoRa reach?",
        answer: "Coverage depends on terrain, but multi-mile ranges are common with clear lines.",
      },
      {
        question: "Can you integrate with existing software?",
        answer: "Yes, we can expose data to existing dashboards or APIs.",
      },
    ],
  },
  {
    slug: "pos-business-software",
    title: "POS + Business Software",
    summary:
      "Custom POS, inventory, and operational tooling built for offline and real-world needs.",
    problem:
      "Retail systems break when connectivity drops or workflows demand custom logic.",
    solution:
      "We build POS and business software that works offline and integrates with critical tools.",
    deliverables: [
      "POS + inventory workflows",
      "Offline-first architecture",
      "Reporting + analytics",
      "Integrations + support",
    ],
    deployments: [
      "Independent retailers",
      "Multi-location operators",
      "Field sales teams",
    ],
    faqs: [
      {
        question: "Can you integrate with existing hardware?",
        answer: "Yes. We support scanners, printers, card readers, and custom devices.",
      },
      {
        question: "Do you migrate data from older POS systems?",
        answer: "We can import data and maintain continuity during cutovers.",
      },
    ],
  },
  {
    slug: "custom-engineering-lab",
    title: "Custom Engineering Lab",
    summary:
      "ESP32 systems, sensors, automation, 3D printing, and rapid prototyping.",
    problem:
      "Off-the-shelf tech rarely fits unique field constraints and rugged environments.",
    solution:
      "We prototype and build custom hardware and software that behaves in the field.",
    deliverables: [
      "ESP32 and sensor prototypes",
      "Rugged enclosures + wiring",
      "Firmware + dashboards",
      "3D printing + rapid iteration",
    ],
    deployments: [
      "Custom monitoring systems",
      "Automation and controls",
      "Specialty field equipment",
    ],
    faqs: [
      {
        question: "Can you build a proof of concept quickly?",
        answer: "Yes. We focus on fast prototypes with clear upgrade paths.",
      },
      {
        question: "Do you handle small batch production?",
        answer: "We can support limited runs and coordinate manufacturing partners.",
      },
    ],
  },
];

export const projectTags = [
  "WISP",
  "VoIP",
  "LoRa",
  "Security",
  "Fire/Burg",
  "POS",
  "ESP32",
  "3D Printing",
  "Homestead Tech",
];

export const labPosts = [
  {
    slug: "ridge-backhaul-tuning",
    title: "Ridge backhaul tuning",
    excerpt:
      "Reworked link budgets, replaced aging radios, and stabilized a multi-county path.",
    tags: ["WISP"],
  },
  {
    slug: "retail-security-refresh",
    title: "Retail security refresh",
    excerpt:
      "Unified access control and camera retention across 12 stores with clean cabling.",
    tags: ["Security"],
  },
  {
    slug: "lora-pasture-tracking",
    title: "LoRa pasture tracking",
    excerpt:
      "Built a low-power tracker and gateway stack for wide-range animal monitoring.",
    tags: ["LoRa", "Homestead Tech"],
  },
];
