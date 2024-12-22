import { createProjectGraphAsync } from "@nx/devkit";
import * as fs from "fs";
import type { KnipConfig } from "knip";
import * as path from "path";

function withCriteria(roots: string[], criteria: (root: string) => boolean) {
  const filteredRoots = roots.filter(criteria);
  if (filteredRoots.length === 1) {
    return `${filteredRoots[0]}`;
  }
  // Should not include any spacing between the curly braces or after the comma
  return `{${filteredRoots.join(",")}}`;
}

const config = async (): Promise<KnipConfig> => {
  const graph = await createProjectGraphAsync();
  const roots = Object.values(graph.nodes)
    .map((node) => node.data.root)
    .sort();
  const withCspell = withCriteria(roots, (root) =>
    fs.existsSync(path.join(root, ".cspell.json"))
  );
  const withJest = withCriteria(roots, (root) =>
    fs.existsSync(path.join(root, "jest.config.ts"))
  );
  const withNext = withCriteria(roots, (root) =>
    fs.existsSync(path.join(root, "next.config.js"))
  );
  const withPlaywright = withCriteria(roots, (root) =>
    fs.existsSync(path.join(root, "playwright.config.ts"))
  );
  const withTypeScript = withCriteria(roots, (root) =>
    fs.existsSync(path.join(root, "tsconfig.json"))
  );
  return {
    cspell: {
      config: [".cspell.json", `${withCspell}/.cspell.json`],
    },
    jest: {
      config: [`${withJest}/jest.config.ts`],
    },
    next: {
      entry: [
        `${withNext}/next.config.js`,
        `${withNext}/pages/**/*.{js,jsx,ts,tsx}`,
      ],
    },
    playwright: {
      config: [`${withPlaywright}/playwright.config.ts`],
    },
    remark: {
      config: [".remarkrc"],
    },
    typescript: {
      config: [`${withTypeScript}/tsconfig.json`],
    },
  };
};

export default config;
