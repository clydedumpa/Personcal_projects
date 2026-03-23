import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { profile } from "@/content/profile";

import { PortfolioShowcase } from "./portfolio-showcase";

describe("PortfolioShowcase", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("switches the highlighted operating mode", async () => {
    render(<PortfolioShowcase profile={profile} />);

    const supportButton = screen.getByRole("button", {
      name: /application support/i,
    });

    fireEvent.click(supportButton);

    await waitFor(() => {
      expect(supportButton).toHaveAttribute("aria-pressed", "true");
    });

    expect(
      await screen.findByText(
        /Strong when reliability matters more than flashy architecture slides/i,
      ),
    ).toBeInTheDocument();
  });

  it("sends a chat prompt and renders the reply", async () => {
    const fetchMock = vi.fn(async () => {
      return {
        ok: true,
        json: async () => ({
          reply: "I do my best work when operations need calm, structured troubleshooting.",
        }),
      };
    });

    vi.stubGlobal("fetch", fetchMock);

    render(<PortfolioShowcase profile={profile} />);

    fireEvent.change(screen.getByLabelText(/ask about delivery style/i), {
      target: { value: "What do you solve best?" },
    });
    const sendButton = screen
      .getAllByRole("button", { name: /^send message$/i })
      .find((button) => !button.hasAttribute("disabled"));

    expect(sendButton).toBeDefined();
    fireEvent.click(sendButton!);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(screen.getByText("What do you solve best?")).toBeInTheDocument();
    expect(
      await screen.findByText(
        "I do my best work when operations need calm, structured troubleshooting.",
      ),
    ).toBeInTheDocument();
  });
});
