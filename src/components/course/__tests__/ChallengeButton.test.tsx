import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@/test-utils";
import { ChallengeButton } from "../ChallengeButton";
import * as ProgressContext from "@/contexts/ProgressContext";

// Mock the ProgressContext
vi.mock("@/contexts/ProgressContext", () => ({
  useProgress: vi.fn(),
}));

// Mock the ChallengeEditorModal component
vi.mock("@/components/modals/ChallengeEditorModal", () => ({
  ChallengeEditorModal: ({ isOpen, challenge }: any) =>
    isOpen ? <div data-testid="challenge-modal">{challenge.title}</div> : null,
}));

describe("ChallengeButton", () => {
  const mockChallenge = {
    id: "challenge-1",
    name: "FizzBuzz",
    title: "FizzBuzz",
    description: "Implement the FizzBuzz algorithm",
    difficulty: "beginner" as const,
    type: "completion" as const,
    xp: 100,
    instructions: "Write the code",
    starterCode: "function fizzBuzz() {}",
  };

  const mockMarkChallengeComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Start button when challenge is not completed", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 0,
      userLevel: 1,
      markProjectComplete: vi.fn(),
      markChallengeComplete: mockMarkChallengeComplete,
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ChallengeButton challenge={mockChallenge} />);
    expect(screen.getByText("Start")).toBeInTheDocument();
  });

  it("renders Take Challenge for boss challenges", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 0,
      userLevel: 1,
      markProjectComplete: vi.fn(),
      markChallengeComplete: mockMarkChallengeComplete,
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ChallengeButton challenge={mockChallenge} isBoss />);
    expect(screen.getByText("Take Challenge")).toBeInTheDocument();
  });

  it("renders Completed button when challenge is completed", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(["challenge-1"]),
      completedLessons: new Set(),
      userXP: 100,
      userLevel: 1,
      markProjectComplete: vi.fn(),
      markChallengeComplete: mockMarkChallengeComplete,
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ChallengeButton challenge={mockChallenge} />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("disables button when challenge is completed", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(["challenge-1"]),
      completedLessons: new Set(),
      userXP: 100,
      userLevel: 1,
      markProjectComplete: vi.fn(),
      markChallengeComplete: mockMarkChallengeComplete,
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ChallengeButton challenge={mockChallenge} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("opens modal when clicking Start", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 0,
      userLevel: 1,
      markProjectComplete: vi.fn(),
      markChallengeComplete: mockMarkChallengeComplete,
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ChallengeButton challenge={mockChallenge} />);
    const button = screen.getByText("Start");
    fireEvent.click(button);

    expect(screen.getByTestId("challenge-modal")).toBeInTheDocument();
    expect(screen.getByText("FizzBuzz")).toBeInTheDocument();
  });

  it("applies custom variant and size props", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 0,
      userLevel: 1,
      markProjectComplete: vi.fn(),
      markChallengeComplete: mockMarkChallengeComplete,
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(
      <ChallengeButton
        challenge={mockChallenge}
        size="lg"
        variant="secondary"
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("applies custom className", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 0,
      userLevel: 1,
      markProjectComplete: vi.fn(),
      markChallengeComplete: mockMarkChallengeComplete,
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(
      <ChallengeButton challenge={mockChallenge} className="custom-class" />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
