import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/components/ui/Button";

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Get Started</Button>);
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  });

  it("fires onClick when clicked", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = jest.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick} disabled>Click</Button>);
    await user.click(screen.getByRole("button", { name: /click/i }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders right icon content", () => {
    render(<Button iconRight={<span data-testid="icn" />}>Next</Button>);
    expect(screen.getByTestId("icn")).toBeInTheDocument();
  });
});
