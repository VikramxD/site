# Repository Guidelines

## Project Structure & Module Organization
- `src/components`: React components in `.tsx` (PascalCase filenames).
- `src/utils`: Shared helpers in `.ts` (camelCase exports).
- `src/content/posts/*.md`: Blog posts with frontmatter; generates `src/content/posts.json`.
- `public/`: Static assets served as-is (e.g., `favicon.svg`).
- `scripts/generate-posts.js`: Builds `posts.json` from Markdown.
- Root configs: `vite.config.ts`, `tailwind.config.js`, `eslint.config.js`, `tsconfig*.json`.

## Build, Test, and Development Commands
- `npm run dev`: Start Vite dev server. Also regenerates posts on `.md` changes.
- `npm run build`: Generate `posts.json`, then build production assets.
- `npm run preview`: Preview the production build locally.
- `npm run lint`: Lint the codebase with ESLint (TypeScript + React rules).

## Coding Style & Naming Conventions
- TypeScript + React function components; prefer hooks over classes.
- Filenames: components `PascalCase.tsx`, utilities `camelCase.ts`.
- TailwindCSS for styling; keep classlists readable and composable.
- Import order: external → internal; avoid deep relative paths when possible.
- Run `npm run lint` and address warnings before pushing.

## Testing Guidelines
- No formal tests yet. Recommended: Vitest + React Testing Library.
- Suggested naming: `ComponentName.test.tsx` near the component or under `src/__tests__`.
- Keep tests deterministic; mock network and time when needed.
- Run tests in CI before merging once added.

## Commit & Pull Request Guidelines
- Commits (current history): short, imperative subject (e.g., "Add copy code button").
- Scope small; prefer multiple focused commits over one large.
- PRs must include: clear description, rationale, screenshots/GIFs for UI, and linked issues.
- Verify locally: `npm run lint`, `npm run build`, and a quick `npm run preview`.
- Reference affected paths (e.g., `src/components/Header.tsx`) in PR notes.

## Architecture Notes
- Vite + React + TypeScript app with TailwindCSS.
- Markdown posts parsed via `gray-matter`; content is surfaced through generated `posts.json` and hot-reloaded in dev.
