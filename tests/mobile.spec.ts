import { test, expect } from "@playwright/test";

test.describe("Mobile", () => {
  test("mobile menu opens, closes on nav click, page stays interactive", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    const panel = page.locator("#staggered-menu-panel");
    await expect(panel).toBeVisible();

    await panel.locator('a.sm-panel-item[href="/music"]').click();
    await expect(page).toHaveURL(/\/music$/);
    await expect(panel).toBeHidden({ timeout: 5000 });

    // page interactive after menu closed: tap a release card
    const card = page.locator('a[href^="/music/"]').first();
    await card.click();
    await expect(page).toHaveURL(/\/music\/[a-z0-9-]+$/);
  });

  test("mobile: hero CTAs visible and clickable, no horizontal scroll", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Listen Now" })).toBeVisible();
    await page.getByRole("link", { name: "View Music", exact: true }).click();
    await expect(page).toHaveURL(/\/music$/);
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1
    );
    expect(overflow).toBe(false);
  });

  test("mobile: newsletter input fillable", async ({ page }) => {
    await page.goto("/");
    const email = page.getByPlaceholder("your@email.com");
    await email.scrollIntoViewIfNeeded();
    await email.fill("fan@example.com");
    await expect(email).toHaveValue("fan@example.com");
  });
});
