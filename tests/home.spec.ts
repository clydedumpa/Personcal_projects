import { expect, test } from "@playwright/test";

test("renders the portfolio and chat surface", async ({ page }) => {
  await page.route("**/api/chat", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        reply:
          "I blend consulting delivery with production support, especially where reliability matters.",
      }),
    });
  });

  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Clyde Dumpa" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Operating modes" }),
  ).toBeVisible();

  await page.getByRole("button", { name: /application support/i }).click();
  await expect(
    page.getByText(/Handles live-environment support with a bias for speed/i),
  ).toBeVisible();

  await page.getByLabel(/ask about delivery style/i).fill(
    "What kind of technical work fits Clyde best?",
  );
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(
    page.getByText(
      "I blend consulting delivery with production support, especially where reliability matters.",
    ),
  ).toBeVisible();
});
