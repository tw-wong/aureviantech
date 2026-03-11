import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navbar from "@/components/Navbar";

describe("Navbar", () => {
  // ── Existing: static content ──────────────────────────────────────────────

  it("renders the logo text", () => {
    render(<Navbar />);
    expect(screen.getByText(/aurevian/i)).toBeInTheDocument();
    expect(screen.getByText(/tech solutions/i)).toBeInTheDocument();
  });

  it("renders desktop navigation links", () => {
    render(<Navbar />);
    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute("href", "/contact");
  });

  // ── Hamburger button ───────────────────────────────────────────────────────

  it("renders a hamburger button with correct aria attributes", () => {
    render(<Navbar />);
    const btn = screen.getByRole("button", { name: /open menu/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-expanded", "false");
    expect(btn).toHaveAttribute("aria-controls", "mobile-drawer");
  });

  // ── Drawer opens ──────────────────────────────────────────────────────────

  it("opens the drawer when the hamburger button is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const btn = screen.getByRole("button", { name: /open menu/i });
    await user.click(btn);
    expect(btn).toHaveAttribute("aria-expanded", "true");
    // Drawer panel is in DOM and no longer translated off-screen
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).not.toHaveClass("translate-x-full");
    expect(drawer).toHaveClass("translate-x-0");
  });

  // ── Drawer closes: X button ───────────────────────────────────────────────

  it("closes the drawer when the X button inside the drawer is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("button", { name: /close menu/i }));
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });

  // ── Drawer closes: backdrop ───────────────────────────────────────────────

  it("closes the drawer when the backdrop is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByTestId("nav-backdrop"));
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });

  // ── Drawer closes: Escape key ─────────────────────────────────────────────

  it("closes the drawer when Escape is pressed", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.keyboard("{Escape}");
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });

  // ── Drawer closes: link click ─────────────────────────────────────────────

  it("closes the drawer when a drawer link is clicked", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    // The drawer renders its own set of links; click one
    const drawerLinks = screen.getAllByRole("link", { name: /home/i });
    await user.click(drawerLinks[drawerLinks.length - 1]);
    const drawer = document.getElementById("mobile-drawer");
    expect(drawer).toHaveClass("translate-x-full");
  });

  // ── Scroll lock ───────────────────────────────────────────────────────────

  it("adds overflow-hidden to body when drawer opens", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    expect(document.body).toHaveClass("overflow-hidden");
  });

  it("removes overflow-hidden from body when drawer closes", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    await user.click(screen.getByRole("button", { name: /open menu/i }));
    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(document.body).not.toHaveClass("overflow-hidden");
  });
});
