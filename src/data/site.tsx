import { Icons } from "@/components/icons";
import {
  BookOpenTextIcon,
  FileTextIcon,
  HomeIcon,
  NotebookPenIcon,
} from "lucide-react";

export const SITE = {
  name: "Taewon Park",
  initials: "TP",
  url: "https://taewonpark.github.io",
  avatarUrl: "/me.jpg",
  cvPdf: "/pdf/cv_taewon.pdf",
  position: "Research Engineer",
  affiliation: "PLAYTAG",
  description:
    "Research Engineer at PLAYTAG. Memory-augmented neural networks, modular representation learning, and continual learning.",
  summary: `I'm a Research Engineer at [PLAYTAG](https://playtag.ai), where I build person-centric video understanding systems that turn raw video into structured records of individual behavior and answer questions grounded in visual evidence. This work powers [monoxyz.ai](https://monoxyz.ai).

Previously, I was a Research Engineer at NeoALI. I received my Ph.D. in Artificial Intelligence from Kyungpook National University (KNU) in 2025, advised by Prof. Minho Lee and Prof. Hyun-Chul Kim.

My research interests center on how AI systems represent, understand, and reason about the world. In particular, I focus on learning **structured representations**, built through **memory** and **modularity**, that allow models to **generalize systematically** and **adapt continually** to new knowledge.`,
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/publications/", icon: BookOpenTextIcon, label: "Publications" },
    { href: "/blog/", icon: NotebookPenIcon, label: "Research Notes" },
    { href: "/cv/", icon: FileTextIcon, label: "CV" },
  ],
  social: [
    {
      name: "Email",
      url: "mailto:ptw7998@gmail.com",
      icon: Icons.email,
    },
    {
      name: "Google Scholar",
      url: "https://scholar.google.com/citations?user=VA5ypd4AAAAJ",
      icon: Icons.scholar,
    },
    {
      name: "GitHub",
      url: "https://github.com/taewonpark",
      icon: Icons.github,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/taewon-park-755394169",
      icon: Icons.linkedin,
    },
  ],
  email: "ptw7998@gmail.com",
} as const;

// Shown on the home page, newest first. `date` is YYYY-MM.
export const NEWS = [
  { date: "2026-04", text: "Joined [PLAYTAG](https://playtag.ai) as a Research Engineer." },
  { date: "2025-03", text: "Joined NeoALI as a Research Engineer." },
  { date: "2025-02", text: "Received my Ph.D. in Artificial Intelligence from Kyungpook National University." },
  { date: "2024-09", text: "One paper has been accepted at **NeurIPS 2024**." },
  { date: "2024-01", text: "One paper has been accepted at **ICLR 2024**." },
] as const;
