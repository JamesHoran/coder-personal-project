import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@/test-utils";
import { ProjectButton } from "../ProjectButton";
import * as ProgressContext from "@/contexts/ProgressContext";

// Mock the ProgressContext
vi.mock("@/contexts/ProgressContext", () => ({
  useProgress: vi.fn(),
}));

// Mock the ProjectModal component
vi.mock("@/components/modals/ProjectModal", () => ({
  ProjectModal: ({ isOpen, project }: any) =>
    isOpen ? <div data-testid="project-modal">{project.name}</div> : null,
}));

describe("ProjectButton", () => {
  const mockProject = {
    id: "project-1",
    name: "Build a React App",
    description: "Create a React application from scratch",
    xp: 500,
    successCriteria: ["Working app"],
    timeEstimate: "2 hours",
    instructions: "Build the app",
    deliverables: ["Working app"],
  };

  const mockMarkProjectComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Start Project button when project is not completed", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 0,
      userLevel: 1,
      markProjectComplete: mockMarkProjectComplete,
      markChallengeComplete: vi.fn(),
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ProjectButton project={mockProject} />);
    expect(screen.getByText("Start Project")).toBeInTheDocument();
  });

  it("renders Completed button when project is completed", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(["project-1"]),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 500,
      userLevel: 1,
      markProjectComplete: mockMarkProjectComplete,
      markChallengeComplete: vi.fn(),
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ProjectButton project={mockProject} />);
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("disables button when project is completed", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(["project-1"]),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 500,
      userLevel: 1,
      markProjectComplete: mockMarkProjectComplete,
      markChallengeComplete: vi.fn(),
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ProjectButton project={mockProject} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("opens modal when clicking Start Project", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 0,
      userLevel: 1,
      markProjectComplete: mockMarkProjectComplete,
      markChallengeComplete: vi.fn(),
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ProjectButton project={mockProject} />);
    const button = screen.getByText("Start Project");
    fireEvent.click(button);

    expect(screen.getByTestId("project-modal")).toBeInTheDocument();
    expect(screen.getByText("Build a React App")).toBeInTheDocument();
  });

  it("does not open modal when clicking completed button", () => {
    vi.mocked(ProgressContext.useProgress).mockReturnValue({
      completedProjects: new Set(["project-1"]),
      completedChallenges: new Set(),
      completedLessons: new Set(),
      userXP: 500,
      userLevel: 1,
      markProjectComplete: mockMarkProjectComplete,
      markChallengeComplete: vi.fn(),
      loadProgress: vi.fn(),
      isLoading: false,
    });

    render(<ProjectButton project={mockProject} />);
    const button = screen.getByText("Completed");
    fireEvent.click(button);

    expect(screen.queryByTestId("project-modal")).not.toBeInTheDocument();
  });
});
