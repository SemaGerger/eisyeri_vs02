import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CTAButton from "./CTAButton";

it("provides a keyboard accessible link with the actual destination", () => {
  const click = jest.fn((event) => event.preventDefault());
  render(<CTAButton href="https://example.com/apply" onClick={click}>Apply</CTAButton>);
  const link = screen.getByRole("link", { name: "Apply" });
  expect(link).toHaveAttribute("href", "https://example.com/apply");
  expect(link).toHaveAttribute("target", "_blank");
  expect(link).toHaveAttribute("rel", "noopener noreferrer");
  link.focus();
  userEvent.keyboard("{Enter}");
  expect(click).toHaveBeenCalledTimes(1);
});

it("provides a native action button without submitting the containing form", () => {
  const click = jest.fn();
  const submit = jest.fn((event) => event.preventDefault());
  render(<form onSubmit={submit}><CTAButton onClick={click}>Continue</CTAButton></form>);
  const button = screen.getByRole("button", { name: "Continue" });
  button.focus();
  userEvent.keyboard(" ");
  expect(click).toHaveBeenCalledTimes(1);
  expect(submit).not.toHaveBeenCalled();
});
