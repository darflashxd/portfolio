import assert from "node:assert/strict";

const origin = process.env.PORTFOLIO_URL || "http://localhost:3000";
const routes = ["/", "/work/pomicat", "/work/the-poisoned-aur", "/work/csc-ctf-infrastructure"];

for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, `${route} must load`);
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route} must have one H1`);
  assert.match(html, /id="main-content"/, `${route} must have a skip-link target`);
  assert.doesNotMatch(html, /<canvas\b|PRIVATE RESEARCH REPO|79 PRS MERGED/);
  if (route === "/") {
    assert.equal((html.match(/data-experience-id=/g) || []).length, 7, "All seven experiences must be visible");
    assert.match(html, /project-pulmoai/);
    assert.match(html, /Choose a portrait/);
    assert.match(html, /Show next portrait/);
    assert.doesNotMatch(html, /In my BINUS jacket|Building things\.|class="portrait"/);
    assert.doesNotMatch(html, /hero-project/);
    assert.match(html, /https:\/\/github.com\/darflashxd\/pomicat/);
    assert.match(html, /id="recognition-title"/);
    assert.match(html, /Finalist — Wreck-IT 7\.0/);
    assert.match(html, /official PETIR member in October 2026/);
    assert.match(html, /Previously Apprentice/);
  }
  if (route === "/work/pomicat") {
    assert.match(html, /Hiding a number is not enough/);
    assert.match(html, /From the blog/);
    assert.match(html, /darflashxd.github.io\/pomicat/);
  }

  const assets = [...html.matchAll(/href="(\/(?:writeups\/[^"?]+\.pdf|certificates\/[^"?]+\.pdf|Resume_[^"?]+\.pdf))"/g)];
  for (const [, path] of assets) {
    const asset = await fetch(new URL(path, origin), { method: "HEAD" });
    assert.equal(asset.status, 200, `${path} must exist`);
    assert.match(asset.headers.get("content-type") || "", /application\/pdf/);
  }
  console.log(`PASS ${route}`);
}

const legacy = await fetch(new URL("/work/safeshare", origin), { redirect: "manual" });
assert.ok([301, 308].includes(legacy.status), "Legacy SafeShare URL must redirect");
assert.equal(new URL(legacy.headers.get("location"), origin).pathname, "/work/pomicat", "Legacy URL must redirect to PomiCat");
console.log("PASS legacy SafeShare URL redirects");

const missing = await fetch(new URL("/work/unknown-project", origin));
assert.equal(missing.status, 404, "Unknown projects must return 404");
console.log("PASS unknown project returns 404");
