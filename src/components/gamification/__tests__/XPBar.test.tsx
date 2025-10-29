import { describe, it, expect } from "vitest";
import { render, screen } from "@/test-utils";
import { XPBar } from "../XPBar";

describe("XPBar", () => {
  it("renders current level correctly", () => {
    render(
      <XPBar
        currentXP={1500}
        level={5}
        xpToNextLevel={500}
        levelTitle="Intermediate Developer"
      />
    );

    expect(screen.getByText("Level 5")).toBeInTheDocument();
    expect(screen.getByText("Intermediate Developer")).toBeInTheDocument();
  });

  it("displays current XP with formatting", () => {
    render(
      <XPBar
        currentXP={15000}
        level={10}
        xpToNextLevel={1000}
        levelTitle="Advanced Developer"
      />
    );

    expect(screen.getByText(/15,000 XP/)).toBeInTheDocument();
  });

  it("shows XP needed for next level", () => {
    render(
      <XPBar
        currentXP={2500}
        level={3}
        xpToNextLevel={500}
        levelTitle="Junior Developer"
      />
    );

    expect(screen.getByText(/500 to Level 4/)).toBeInTheDocument();
  });

  it("displays progress percentage", () => {
    render(
      <XPBar
        currentXP={250}
        level={2}
        xpToNextLevel={150}
        levelTitle="Novice"
      />
    );

    expect(screen.getByText(/% Complete/)).toBeInTheDocument();
  });

  it("renders with level 1 user", () => {
    render(
      <XPBar
        currentXP={50}
        level={1}
        xpToNextLevel={50}
        levelTitle="Beginner"
      />
    );

    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Beginner")).toBeInTheDocument();
  });

  it("handles large XP values", () => {
    render(
      <XPBar
        currentXP={100000}
        level={50}
        xpToNextLevel={5000}
        levelTitle="Master Developer"
      />
    );

    expect(screen.getByText(/100,000 XP/)).toBeInTheDocument();
    expect(screen.getByText(/5,000 to Level 51/)).toBeInTheDocument();
  });
});
