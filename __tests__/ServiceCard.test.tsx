import { render, screen } from "@testing-library/react";
import ServiceCard from "@/components/ServiceCard";

const props = {
  icon: "🌐",
  title: "Web Development",
  description: "We build fast, scalable web applications.",
};

describe("ServiceCard", () => {
  it("renders the title", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByText("Web Development")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByText("We build fast, scalable web applications.")).toBeInTheDocument();
  });

  it("renders the icon", () => {
    render(<ServiceCard {...props} />);
    expect(screen.getByText("🌐")).toBeInTheDocument();
  });
});
