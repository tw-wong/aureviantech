import { render, screen } from "@testing-library/react";
import Footer from "@/components/Footer";

describe("Footer", () => {
  it("renders copyright text", () => {
    render(<Footer />);
    expect(screen.getByText(/2026/)).toBeInTheDocument();
  });

  it("renders company name in copyright", () => {
    render(<Footer />);
    expect(screen.getByText(/aurevian tech solutions/i)).toBeInTheDocument();
  });
});
