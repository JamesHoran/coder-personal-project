import { describe, it, expect } from "vitest";
import { render, screen } from "@/test-utils";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";

describe("Card Components", () => {
  describe("Card", () => {
    it("renders card element", () => {
      render(<Card data-testid="card">Card content</Card>);
      const card = screen.getByTestId("card");
      expect(card).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Card data-testid="card" className="custom-class">
          Content
        </Card>
      );
      const card = screen.getByTestId("card");
      expect(card).toHaveClass("custom-class");
    });

    it("renders children", () => {
      render(<Card>Test content</Card>);
      expect(screen.getByText("Test content")).toBeInTheDocument();
    });
  });

  describe("CardHeader", () => {
    it("renders header element", () => {
      render(<CardHeader data-testid="header">Header content</CardHeader>);
      expect(screen.getByTestId("header")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <CardHeader data-testid="header" className="custom-header">
          Header
        </CardHeader>
      );
      expect(screen.getByTestId("header")).toHaveClass("custom-header");
    });
  });

  describe("CardTitle", () => {
    it("renders title as h3 element", () => {
      render(<CardTitle>Card Title</CardTitle>);
      const title = screen.getByText("Card Title");
      expect(title.tagName).toBe("H3");
    });

    it("applies custom className", () => {
      render(<CardTitle className="custom-title">Title</CardTitle>);
      const title = screen.getByText("Title");
      expect(title).toHaveClass("custom-title");
    });
  });

  describe("CardDescription", () => {
    it("renders description as paragraph", () => {
      render(<CardDescription>Card description text</CardDescription>);
      const desc = screen.getByText("Card description text");
      expect(desc.tagName).toBe("P");
    });

    it("applies muted foreground class", () => {
      render(<CardDescription>Description</CardDescription>);
      const desc = screen.getByText("Description");
      expect(desc).toHaveClass("text-muted-foreground");
    });
  });

  describe("CardContent", () => {
    it("renders content element", () => {
      render(
        <CardContent data-testid="content">Content text</CardContent>
      );
      expect(screen.getByTestId("content")).toBeInTheDocument();
    });

    it("renders children", () => {
      render(
        <CardContent>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
        </CardContent>
      );
      expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
      expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    });
  });

  describe("CardFooter", () => {
    it("renders footer element", () => {
      render(<CardFooter data-testid="footer">Footer content</CardFooter>);
      expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    it("applies flex items-center classes", () => {
      render(<CardFooter data-testid="footer">Footer</CardFooter>);
      const footer = screen.getByTestId("footer");
      expect(footer).toHaveClass("flex", "items-center");
    });
  });

  describe("Full Card Composition", () => {
    it("renders complete card with all components", () => {
      render(
        <Card data-testid="full-card">
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByTestId("full-card")).toBeInTheDocument();
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
      expect(screen.getByText("Test Content")).toBeInTheDocument();
      expect(screen.getByText("Test Footer")).toBeInTheDocument();
    });
  });
});
