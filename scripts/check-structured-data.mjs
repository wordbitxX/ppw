// Run after `npm run build`: node scripts/check-structured-data.mjs
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = ".next/server/app";

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith(".html")) yield path;
  }
}

async function schemas(path) {
  const html = await readFile(path, "utf8");
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

function* objects(value) {
  if (Array.isArray(value)) {
    for (const item of value) yield* objects(item);
  } else if (value && typeof value === "object") {
    yield value;
    for (const item of Object.values(value)) yield* objects(item);
  }
}

function hasType(value, type) {
  return Array.isArray(value["@type"]) ? value["@type"].includes(type) : value["@type"] === type;
}

let count = 0;
for await (const path of htmlFiles(root)) {
  for (const schema of await schemas(path)) {
    for (const entity of objects(schema)) {
      assert.ok(!(hasType(entity, "Product") && entity.name === "Properties Pak"), `Unexpected Product in ${path}`);
    }
  }
  count++;
}
assert.ok(count > 0, "No prerendered pages found; run the production build first");

for (const page of ["index.html", "portfolio/properties-pak-property-portal.html", "products/properties-pak.html", "services/web-development.html"]) {
  const data = await schemas(join(root, page));
  const organization = data.find((item) => hasType(item, "Organization"));
  assert.ok(organization && hasType(organization, "ProfessionalService"), `Missing organization in ${page}`);
  assert.ok(data.some((item) => hasType(item, "WebSite")), `Missing WebSite in ${page}`);
}

const portfolio = await schemas(join(root, "portfolio/properties-pak-property-portal.html"));
const work = portfolio.find((item) => hasType(item, "WebPage"))?.about;
assert.equal(work?.["@type"], "CreativeWork");
assert.equal(work.name, "Properties Pak");
assert.equal(work.url, "https://dha.wordbitx.pk");
assert.equal(work.author?.["@id"], "https://www.wordbitx.pk/#organization");
for (const property of ["offers", "review", "aggregateRating"]) assert.ok(!(property in work));

const service = await schemas(join(root, "services/web-development.html"));
assert.ok(service.some((item) => hasType(item, "Service")), "Missing Service schema");
console.log(`Checked ${count} prerendered HTML files and representative structured-data schemas.`);
