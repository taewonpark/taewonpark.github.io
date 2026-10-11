# taewonpark.github.io

Personal academic site, built with Next.js (static export) on top of the
[Magic UI portfolio template](https://github.com/magicuidesign/portfolio), with an
[al-folio](https://github.com/alshedivat/al-folio)-style structure.

## Editing content

| What | Where |
| --- | --- |
| Name, bio, links, dock menu, news | `src/data/site.tsx` |
| CV (education, experience, projects, patents, awards) | `src/data/cv.ts` |
| Publications (`selected={true}` shows on the home page) | `content/papers.bib` |
| Research notes | `content/blog/*.mdx` |
| Profile photo, CV PDF | `public/me.jpg`, `public/pdf/cv_taewon.pdf` |

## Local preview

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

## Deploy

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the site and
publishes `out/` to the `gh-pages` branch served by GitHub Pages.
