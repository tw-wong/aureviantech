import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

describe("HomePage in-page anchors", () => {
  it("renders anchored sections for in-page navigation", () => {
    const { container } = render(<HomePage />);
    expect(container.querySelector("#services")).toBeInTheDocument();
    expect(container.querySelector("#how-we-work")).toBeInTheDocument();
    expect(container.querySelector("#studio")).toBeInTheDocument();
    expect(container.querySelector("#testimonials")).toBeInTheDocument();
  });

  it("links the hero 'Learn More' to the studio section", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /learn more/i })).toHaveAttribute("href", "#studio");
  });
});
