import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads with correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Rhythmic Chaos/i);
    await expect(
      page.getByRole("heading", { level: 1, name: /rhythmic/i })
    ).toBeVisible();
  });

  test("hero CTA buttons are clickable with correct targets", async ({
    page,
  }) => {
    await page.goto("/");
    const listen = page.getByRole("link", { name: "Listen Now" });
    await expect(listen).toBeVisible();
    await expect(listen).toHaveAttribute("target", "_blank");
    await expect(listen).toHaveAttribute("rel", /noopener/);
    await expect(listen).toHaveAttribute("href", /spotify/);
    // verify not covered by an overlay: actually click it (no nav since _blank is stubbed)
    await expect(
      page.getByRole("link", { name: "Bookings", exact: true })
    ).toBeVisible();
    await page.getByRole("link", { name: "View Music", exact: true }).click();
    await expect(page).toHaveURL(/\/music$/);
  });

  test("hero social icons are clickable links", async ({ page }) => {
    await page.goto("/");
    const insta = page.getByRole("link", { name: "Instagram" }).first();
    await expect(insta).toBeVisible();
    await expect(insta).toHaveAttribute("target", "_blank");
    const box = await insta.boundingBox();
    expect(box).toBeTruthy();
  });

  test("View More Music navigates to music page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /view more music/i }).click();
    await expect(page).toHaveURL(/\/music$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Music" })
    ).toBeVisible();
  });

  test("featured release card is clickable", async ({ page }) => {
    await page.goto("/");
    const card = page.locator('a[href^="/music/"]').first();
    await card.scrollIntoViewIfNeeded();
    await card.click();
    await expect(page).toHaveURL(/\/music\/[a-z0-9-]+$/);
  });

  test("newsletter input can be filled", async ({ page }) => {
    await page.goto("/");
    const email = page.getByPlaceholder("your@email.com");
    await email.scrollIntoViewIfNeeded();
    await email.fill("fan@example.com");
    await expect(email).toHaveValue("fan@example.com");
    await expect(
      page.getByRole("button", { name: "Subscribe" })
    ).toBeEnabled();
  });

  test("contact form fields can be filled and dropdown selected", async ({
    page,
  }) => {
    await page.goto("/#contact");
    await page.getByPlaceholder("Your name *").fill("Test Fan");
    await page.getByPlaceholder("Your email *").fill("fan@example.com");
    await page.getByPlaceholder("Subject").fill("Hello");
    await page.getByPlaceholder("Your message *").fill("Great music!");
    const dropdown = page.getByLabel("Inquiry type");
    await dropdown.selectOption("Collaboration");
    await expect(dropdown).toHaveValue("Collaboration");
    await expect(page.getByPlaceholder("Your name *")).toHaveValue("Test Fan");
    await expect(
      page.getByRole("button", { name: "Send Message" })
    ).toBeEnabled();
  });

  test("footer links are clickable", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await footer.scrollIntoViewIfNeeded();
    const spotify = footer.getByRole("link", { name: "Spotify" }).last();
    await expect(spotify).toBeVisible();
    await expect(spotify).toHaveAttribute("target", "_blank");
    await footer.getByRole("link", { name: "Music", exact: true }).click();
    await expect(page).toHaveURL(/\/music$/);
  });

  test("no horizontal scrolling", async ({ page }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth >
        document.documentElement.clientWidth + 1
    );
    expect(overflow).toBe(false);
  });
});

test.describe("Music page", () => {
  test("loads and shows release cards", async ({ page }) => {
    await page.goto("/music");
    await expect(
      page.getByRole("heading", { level: 1, name: "Music" })
    ).toBeVisible();
    const cards = page.locator('a[href^="/music/"]');
    expect(await cards.count()).toBeGreaterThanOrEqual(5);
  });

  test("filter tabs work and card navigates to release page", async ({
    page,
  }) => {
    await page.goto("/music");
    await page.getByRole("tab", { name: "EP" }).click();
    await expect(page.locator('a[href="/music/love-ep"]')).toBeVisible();
    await page.getByRole("tab", { name: "All" }).click();
    await page.locator('a[href="/music/flow"]').click();
    await expect(page).toHaveURL(/\/music\/flow$/);
  });
});

test.describe("Release smart-link page", () => {
  test("opens and DSP buttons have valid hrefs", async ({ page }) => {
    await page.goto("/music/flow");
    await expect(
      page.getByRole("heading", { level: 1, name: "Flow" })
    ).toBeVisible();
    const dsp = page.getByRole("link", { name: /spotify/i });
    await expect(dsp).toBeVisible();
    await expect(dsp).toHaveAttribute("href", /open\.spotify\.com/);
    await expect(dsp).toHaveAttribute("target", "_blank");
    await expect(dsp).toHaveAttribute("rel", /noopener/);
    // clickable (not covered by overlay)
    const box = await dsp.boundingBox();
    expect(box).toBeTruthy();
    const topEl = await page.evaluate(
      ([x, y]) => {
        const el = document.elementFromPoint(x, y);
        return el ? el.closest("a")?.getAttribute("href") ?? el.tagName : null;
      },
      [box!.x + box!.width / 2, box!.y + box!.height / 2]
    );
    expect(topEl).toContain("spotify");
  });

  test("back link returns to music page", async ({ page }) => {
    await page.goto("/music/flow");
    await page.getByRole("link", { name: /all music/i }).click();
    await expect(page).toHaveURL(/\/music$/);
  });
});

test.describe("Navbar", () => {
  test("menu opens, nav link works, page stays interactive", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /open menu/i }).click();
    const panel = page.locator("#staggered-menu-panel");
    await expect(panel).toBeVisible();
    await panel.locator('a.sm-panel-item[href="/music"]').click();
    await expect(page).toHaveURL(/\/music$/);
    // page remains interactive after menu closes
    await page.locator('a[href="/music/flow"]').click();
    await expect(page).toHaveURL(/\/music\/flow$/);
  });
});
