import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders copyright text with the year and company", () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
    expect(screen.getByText(/aurevian tech solutions/i)).toBeInTheDocument();
  });

  it("renders the Services and Company column titles", () => {
    render(<Footer />);
    expect(screen.getByText(/^services$/i)).toBeInTheDocument();
    expect(screen.getByText(/^company$/i)).toBeInTheDocument();
  });

  it("renders a link to About", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute("href", "/about");
  });

  it("links Services items to the Home services section", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /web development/i })).toHaveAttribute("href", "/#services");
  });
});
