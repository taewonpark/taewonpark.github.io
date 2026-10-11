// Structured CV content. Rendered on /cv and (partially) on the home page.

export type Position = {
  organization: string;
  short: string;
  logo?: string;
  href?: string;
  location: string;
  title: string;
  // Short tag shown next to the title, e.g. an employment type.
  note?: string;
  start: string;
  end?: string;
  bullets?: readonly string[];
};

export const EDUCATION = [
  {
    school: "Kyungpook National University (KNU)",
    href: "https://www.knu.ac.kr",
    location: "Daegu, Republic of Korea",
    logo: "/logos/knu.png",
    degree: "Ph.D. in Artificial Intelligence",
    start: "Mar 2019",
    end: "Feb 2025",
    details: [
      "**Advisor:** Prof. Minho Lee and Prof. Hyun-Chul Kim",
      "**Dissertation:** Improving Modularity of Deep Neural Networks for Associative Memory and Systematic Generalization",
    ],
  },
  {
    school: "Kyungpook National University (KNU)",
    href: "https://www.knu.ac.kr",
    location: "Daegu, Republic of Korea",
    logo: "/logos/knu.png",
    degree: "B.S. in Electronics Engineering",
    start: "Mar 2015",
    end: "Feb 2019",
    details: [],
  },
] as const;

export const INDUSTRY: readonly Position[] = [
  {
    organization: "PLAYTAG",
    short: "PT",
    logo: "/logos/playtag.png",
    href: "https://playtag.ai",
    location: "Seoul, Republic of Korea",
    title: "Research Engineer",
    start: "Apr 2026",
    bullets: [
      "Developed a person-centric video understanding framework that combines tracking, re-identification, and VLM-based reasoning to extract structured behavioral representations of individual people across motion, object use, and social interaction.",
      "Built a grounded video question-answering system for person-specific quantitative and temporal reasoning over extracted behavioral records.",
      "Contributed these capabilities to [monoxyz.ai](https://monoxyz.ai), a video analytics platform for person-level behavioral understanding.",
    ],
  },
  {
    organization: "NeoALI",
    note: "Alternative Military Service",
    short: "NA",
    logo: "/logos/neoali.png",
    location: "Seoul, Republic of Korea",
    title: "Research Engineer",
    start: "Mar 2025",
    end: "Apr 2026",
    bullets: [
      "Developed an LLM faithfulness guardrail for on-premise RAG systems that verifies whether generated responses are supported by retrieved evidence under strict latency and resource constraints.",
      "Designed a hierarchical schema extraction framework that transforms unstructured documents into structured, schema-aware representations for retrieval.",
      "Developed a schema-guided retrieval approach that routes queries across learned document schemas and aggregates evidence from schema-specific representations.",
    ],
  },
];

export const RESEARCH: readonly Position[] = [
  {
    organization: "Kyungpook National University",
    short: "KNU",
    logo: "/logos/knu.png",
    href: "https://www.knu.ac.kr",
    location: "Daegu, Republic of Korea",
    title: "Graduate Researcher",
    start: "Mar 2019",
    end: "Feb 2025",
    bullets: [
      "Investigated associative and memory-augmented neural architectures for retaining and reasoning over information in long sequential data.",
      "Developed modular representation learning methods, including iterative and discrete decomposition mechanisms, to learn structured representations that support systematic and compositional generalization.",
    ],
  },
  {
    organization: "Carnegie Mellon University (CMU)",
    short: "CMU",
    logo: "/logos/cmu.png",
    href: "https://www.cs.cmu.edu",
    location: "Pittsburgh, PA, USA",
    title: "Visiting Scholar, School of Computer Science",
    start: "Aug 2022",
    end: "Feb 2023",
    bullets: ["AI-intensive program sponsored by the Korean government."],
  },
  {
    organization: "Nara Institute of Science and Technology (NAIST)",
    short: "NAIST",
    logo: "/logos/naist.png",
    href: "https://www.naist.jp/en/",
    location: "Nara, Japan",
    title: "Research Intern, Graduate School of Information Science",
    start: "Jan 2020",
    end: "Feb 2020",
    bullets: ["Explored reinforcement learning methods for multiple neural memory blocks."],
  },
];

export const PATENTS = [
  {
    title:
      "Multi-Model Hierarchical Reasoning Method based on Cognitive Behavioral Cycle, and Device for Performing It",
    number: "Korea Patent Granted No. 10-2666682-00-00",
    date: "May 2024",
    authors: "Taewon Park, Junwon Lee, Minho Lee",
  },
  {
    title:
      "Information Processing Method for Systematic Generalization and Electric Device for Performing the Same",
    number: "Korea Patent Granted No. 10-2582003-00-00",
    date: "Sep 2023",
    authors: "Jun-Hyun Bae, Taewon Park, Minho Lee",
  },
  {
    title:
      "Distributed Associative Memory Network System Enabling to Store the Relation Information Existing in Long Sequential Data",
    number: "Korea Patent Granted No. 10-2455681-00-00",
    date: "Oct 2022",
    authors: "Taewon Park, Inchul Choi, Minho Lee",
  },
] as const;

export const AWARDS = [
  { title: "Financial Aid Award from NeurIPS 2024", date: "2024" },
  { title: "KNU President's Excellence Award in Brain Korea Forum", date: "2021" },
  { title: "Academic Excellence Scholarship in Electronics Engineering Department", date: "2019" },
  { title: "National Science & Technology Scholarship", date: "2017 – 2018" },
] as const;

export const SERVICE = [{ role: "Reviewer", venues: "ICLR 2025–2027, NeurIPS 2025" }] as const;
