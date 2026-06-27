import path from "node:path";
import { defineConfig } from "vitest/config";

// Test-only config. Mirrors the `@/*` path alias from tsconfig so route handlers
// (which import via `@/lib/...`) can be unit-tested. Adds no dependencies — vitest
// is already a devDependency. Does not affect the Next.js build.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd()),
    },
  },
});
