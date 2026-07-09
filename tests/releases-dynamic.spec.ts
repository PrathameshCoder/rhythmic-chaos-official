import { test, expect } from "@playwright/test";

/**
 * Public site — dynamic (Supabase/fallback) release rendering.
 * Works whether or not Supabase is configured (falls back to the bundled
 * snapshot). Run against a dev/preview server: npm run dev && npm run test:e2e
 */

test("homepage shows featured releases", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /featured releases/i })).toBeVisible();
  // At least one release card links into /music/<slug>
  await expect(page.locator('a[href^="/music/"]').first()).toBeVisible();
});

test("music page lists releases and links to smart-link pages", async ({ page }) => {
  await page.goto("/music");
  await expect(page.getByRole("heading", { name: "Music", exact: true })).toBeVisible();
  const cards = page.locator('a[href^="/music/"]');
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBeGreaterThan(0);
});

test("a smart-link page opens by slug and shows a listen button", async ({ page }) => {
  await page.goto("/music/flow");
  await expect(page.getByRole("heading", { name: /flow/i })).toBeVisible();
  // DSP button present (Spotify listen in the seed/fallback data)
  await expect(page.getByRole("link", { name: /listen on spotify/i })).toBeVisible();
});

test("a non-existent slug returns 404", async ({ page }) => {
  const res = await page.goto("/music/this-does-not-exist-xyz");
  expect(res?.status()).toBe(404);
});
