# Dreamcatcher Docs

Documentation frontend for the Dreamcatcher REST API. It covers groups, albums, and idols, with endpoint examples and schemas.

## Technologies

- Angular 21 and TypeScript
- Nx for workspace tasks and builds
- PrimeNG for tables and navigation
- Tailwind CSS for styling
- Highlight.js for JSON examples
- RxJS for API requests

## Run locally

```sh
pnpm install
pnpm nx serve dreamcatcher-docs
```

Create a production build with:

```sh
pnpm nx build dreamcatcher-docs
```

## API URL

Development uses `http://localhost:8080/api`. Production uses `https://dreamcatcher-api-4hw4.onrender.com/api`, configured in `src/environments/environment.ts`.