import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    // Faithful static-marketing migration: the homepage and static pages use
    // plain <img> tags (including two external store-badge SVGs and CSS
    // background images). Image optimization via next/image is intentionally
    // deferred. Scope the override to page files only.
    files: ["app/**/*.tsx"],
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "out/**", "next-env.d.ts", "outputs/**"],
  },
];

export default eslintConfig;
