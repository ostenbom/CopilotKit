import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const suite = resolve(process.argv[2]);
const here = dirname(fileURLToPath(import.meta.url));
const path = join(suite, "playwright.config.ts");
let config = readFileSync(path, "utf8");
for (const [from, to] of [
  ['globalSetup: "./test-isolation-setup.ts",', 'globalSetup: undefined,'],
  ['globalTeardown: "./test-isolation-teardown.ts",', 'globalTeardown: undefined,'],
  ['fullyParallel: process.env.CI ? true : true,', 'fullyParallel: true,'],
  ['    headless: true,', '    headless: true,\n    trace: "retain-on-failure",'],
  ['  console.error("BASE_URL is not set");\n  process.exit(1);', '  return "http://localhost:9999";'],
]) {
  if (!config.includes(from)) throw new Error(`Pinned Dojo configuration changed: missing ${from}`);
  config = config.replace(from, to);
}
writeFileSync(path, config);
copyFileSync(join(here, "endform.config.ts"), join(suite, "endform.config.ts"));
