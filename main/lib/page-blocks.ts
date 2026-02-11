import type { ContentBlock } from "@/components/blocks";

export const homeBlocks: ContentBlock[] = [
  {
    type: "hero",
    data: {
      eyebrow: "Abstruse Networks, LLC",
      title: "Connectivity + Control for the Real World",
      subtitle:
        "We are a full-stack technology integrator and applied engineering shop. From WISP backhaul to custom electronics, we design systems that survive real terrain, weather, and deadlines.",
      primaryCta: { label: "Request a Quote / Talk to a Tech", href: "/contact" },
      secondaryCta: { label: "See Projects / Lab Log", href: "/projects" },
    },
  },
  {
    type: "featureGrid",
    data: {
      title: "One team for connectivity, security, and custom builds",
      items: [
        {
          title: "Voice / SIP / PBX",
          description:
            "Carrier-grade trunks, hosted PBX, elevator lines, and survivable voice designs.",
        },
        {
          title: "WISP / Rural Connectivity",
          description:
            "Site surveys, backhaul planning, tower installs, and reliable last-mile coverage.",
        },
        {
          title: "Security + Access",
          description:
            "Cameras, access control, structured cabling, and hardened edge recording.",
        },
        {
          title: "Fire + Burg Comms",
          description:
            "Dialer capture, cellular communicators, testing paths, and central station coordination.",
        },
        {
          title: "LoRa Monitoring",
          description:
            "Asset + animal tracking, geofencing, low-power telemetry, and alerts.",
        },
        {
          title: "POS + Business Apps",
          description:
            "Offline-first POS, inventory, reporting, and integration with payments.",
        },
        {
          title: "Custom Engineering Lab",
          description:
            "ESP32 devices, sensor networks, dashboards, 3D printing, and rapid prototyping.",
        },
        {
          title: "Field Systems Integration",
          description:
            "One team for power, data, enclosures, and everything between the rack and the pole.",
        },
      ],
    },
  },
  {
    type: "steps",
    data: {
      title: "Built for rural, retail, and real-world environments",
      items: [
        {
          title: "Discover",
          description:
            "We map constraints, walk the site, and identify failure points before we build.",
        },
        {
          title: "Design",
          description:
            "We select hardware, write diagrams, and plan for maintenance and uptime.",
        },
        {
          title: "Deploy",
          description:
            "We install, validate communications paths, and document everything.",
        },
        {
          title: "Support",
          description:
            "We monitor, tune, and provide a clear escalation path when it matters.",
        },
      ],
    },
  },
  {
    type: "splitSection",
    data: {
      title: "Stop fighting your technology",
      body:
        "We build systems that are engineered and documented, not just installed. Your staff gets clear diagrams, escalation paths, and a plan for upkeep.",
      bullets: [
        "Field-ready power, enclosure, and cabling",
        "Verified comms paths and testing",
        "Clear handoff documentation",
      ],
    },
  },
  {
    type: "logoCloud",
    data: {
      title: "Trusted by operators who cannot afford downtime",
      logos: ["TowerCo", "Central Station", "Retail Chain", "Agri Ops"],
    },
  },
  {
    type: "testimonials",
    data: {
      title: "Field notes",
      items: [
        {
          quote:
            "Abstruse walked the sites, diagnosed the failure points, and rebuilt our comms with a plan we can maintain.",
          name: "Operations Director",
          role: "Regional WISP",
        },
        {
          quote:
            "They integrate hardware and software like one team and document everything clearly.",
          name: "Security Manager",
          role: "Retail Group",
        },
      ],
    },
  },
  {
    type: "projectCards",
    data: {
      title: "Recent field deployments",
      items: [
        {
          title: "Mountain ridge WISP refresh",
          description:
            "Backhaul optimization and improved coverage for a multi-county network.",
        },
        {
          title: "Retail security + access upgrade",
          description:
            "Unified cameras, access control, and structured cabling across 12 locations.",
        },
        {
          title: "LoRa cattle monitoring pilot",
          description:
            "Low-power tracking with geofenced alerts and long-range gateways.",
        },
      ],
    },
  },
  {
    type: "stats",
    data: {
      title: "Field-ready metrics",
      items: [
        { value: "99.9%", label: "Targeted uptime for critical comms" },
        { value: "48h", label: "Typical on-site response window" },
        { value: "15+", label: "Integrated vendor stacks supported" },
      ],
    },
  },
  {
    type: "gallery",
    data: {
      title: "Field-ready visuals",
      items: [
        { label: "Tower climbs + backhaul paths" },
        { label: "Structured cabling + rack builds" },
        { label: "Rugged sensor enclosures" },
      ],
    },
  },
  {
    type: "faq",
    data: {
      title: "Compliance-friendly guidance",
      items: [
        {
          question: "Are you a fire alarm installer?",
          answer:
            "We focus on communications and integration support, not AHJ-required installations.",
        },
        {
          question: "Do you coordinate with central stations?",
          answer:
            "Yes. We help validate comm paths, testing, and monitoring coordination.",
        },
      ],
    },
  },
  {
    type: "cta",
    data: {
      title: "Built to work. Documented to last.",
      body: "Get a clear plan, a stable install, and a support path you can trust.",
      cta: { label: "Request a Quote", href: "/contact" },
    },
  },
  {
    type: "contactStrip",
    data: {
      title: "Ready to stabilize your systems?",
      body: "East Tennessee + surrounding. Fast response for comms, security, and custom builds.",
      phone: "(865) 555-0199",
      email: "hello@abstruse.local",
    },
  },
];

export const servicesBlocks: ContentBlock[] = [
  {
    type: "hero",
    data: {
      eyebrow: "Services",
      title: "Stop fighting your technology",
      subtitle:
        "We integrate connectivity, security, and custom engineering into systems that hold up under real-world constraints.",
      primaryCta: { label: "Request a Quote", href: "/contact" },
      secondaryCta: { label: "See Projects", href: "/projects" },
    },
  },
  {
    type: "splitSection",
    data: {
      title: "Built to work in the field",
      body:
        "From rural backhaul to access control, we design systems around uptime, serviceability, and clean documentation.",
      bullets: [
        "Field-ready installs with clear diagrams",
        "Redundancy where it matters",
        "Support you can reach",
      ],
    },
  },
  {
    type: "cta",
    data: {
      title: "Need a custom build?",
      body: "We can prototype hardware, integrate sensors, and deliver dashboards fast.",
      cta: { label: "Talk to a Tech", href: "/contact" },
    },
  },
];
