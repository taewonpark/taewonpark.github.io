import fs from "node:fs";
import path from "node:path";

export type Author = { name: string; isMe: boolean; equal: boolean };

export type Publication = {
  key: string;
  type: string;
  title: string;
  authors: Author[];
  year: number;
  venue: string;
  abbr?: string;
  abstract?: string;
  pdf?: string;
  html?: string;
  doi?: string;
  code?: string;
  selected: boolean;
  bibtex: string;
};

const BIB_PATH = path.join(process.cwd(), "content", "papers.bib");

// Fields used only by the site (al-folio convention); hidden from the BibTeX export.
const SITE_FIELDS = new Set(["abbr", "abstract", "selected", "pdf", "html", "code", "preview"]);

// Matches al-folio's `scholar.last_name` / `first_name` settings.
const ME = { last: "Park", first: "Taewon" };

function readValue(src: string, start: number): [string, number] {
  const open = src[start];
  if (open === "{") {
    let depth = 0;
    for (let i = start; i < src.length; i++) {
      if (src[i] === "{") depth++;
      else if (src[i] === "}" && --depth === 0) return [src.slice(start + 1, i), i + 1];
    }
    throw new Error("Unbalanced braces in papers.bib");
  }
  if (open === '"') {
    const end = src.indexOf('"', start + 1);
    return [src.slice(start + 1, end), end + 1];
  }
  const m = /^[^,}\s]+/.exec(src.slice(start));
  return [m ? m[0] : "", start + (m ? m[0].length : 0)];
}

function parseEntries(src: string) {
  const entries: { type: string; key: string; fields: [string, string][] }[] = [];
  const head = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let m: RegExpExecArray | null;
  while ((m = head.exec(src))) {
    const fields: [string, string][] = [];
    let i = head.lastIndex;
    while (i < src.length) {
      const fm = /^\s*,?\s*(\w+)\s*=\s*/.exec(src.slice(i));
      if (!fm) break;
      i += fm[0].length;
      const [value, next] = readValue(src, i);
      fields.push([fm[1].toLowerCase(), value.replace(/\s+/g, " ").trim()]);
      i = next;
    }
    entries.push({ type: m[1].toLowerCase(), key: m[2], fields });
    head.lastIndex = i;
  }
  return entries;
}

function parseAuthors(raw: string): Author[] {
  return raw.split(/\s+and\s+/).map((a) => {
    const equal = a.includes("*");
    const clean = a.replace(/\*/g, "").trim();
    const [last, first] = clean.includes(",")
      ? clean.split(",").map((s) => s.trim())
      : [clean.split(" ").slice(-1)[0], clean.split(" ").slice(0, -1).join(" ")];
    return {
      name: first ? `${first} ${last}` : last,
      isMe: last === ME.last && first === ME.first,
      equal,
    };
  });
}

function toBibtex(type: string, key: string, fields: [string, string][]) {
  const body = fields
    .filter(([k]) => !SITE_FIELDS.has(k))
    .map(([k, v]) => `  ${k}={${v}}`)
    .join(",\n");
  return `@${type}{${key},\n${body}\n}`;
}

export function getPublications(): Publication[] {
  const src = fs.readFileSync(BIB_PATH, "utf8");
  return parseEntries(src)
    .map(({ type, key, fields }) => {
      const f = Object.fromEntries(fields);
      return {
        key,
        type,
        title: f.title,
        authors: parseAuthors(f.author ?? ""),
        year: Number(f.year),
        venue: f.booktitle ?? f.journal ?? "",
        abbr: f.abbr,
        abstract: f.abstract,
        pdf: f.pdf,
        html: f.html,
        doi: f.doi ? f.doi.replace(/^https?:\/\/doi\.org\//, "") : undefined,
        code: f.code,
        selected: f.selected === "true",
        bibtex: toBibtex(type, key, fields),
      };
    })
    .sort((a, b) => b.year - a.year);
}
