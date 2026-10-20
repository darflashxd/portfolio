import assert from "node:assert/strict";

const origin = process.env.PORTFOLIO_URL || "http://localhost:3000";
const routes = ["/", "/work/safeshare", "/work/the-poisoned-aur", "/work/csc-ctf-infrastructure"];

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
    assert.match(html, /https:\/\/github.com\/darflashxd\/safeshare/);
  }
  if (route === "/work/safeshare") {
    assert.match(html, /Black Hat Asia Arsenal 2027/);
    assert.match(html, /It has not been submitted yet/);
  }

  const assets = [...html.matchAll(/href="(\/(?:writeups\/[^"?]+\.pdf|Resume_[^"?]+\.pdf))"/g)];
  for (const [, path] of assets) {
    const asset = await fetch(new URL(path, origin), { method: "HEAD" });
    assert.equal(asset.status, 200, `${path} must exist`);
    assert.match(asset.headers.get("content-type") || "", /application\/pdf/);
  }
  console.log(`PASS ${route}`);
}

const missing = await fetch(new URL("/work/unknown-project", origin));
assert.equal(missing.status, 404, "Unknown projects must return 404");
console.log("PASS unknown project returns 404");
