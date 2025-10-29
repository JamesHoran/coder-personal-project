import { describe, it, expect } from "vitest";
import { checkStreakAchievements } from "../streak-tracker";

describe("streak-tracker", () => {
  describe("checkStreakAchievements", () => {
    it("returns empty array for streak less than 7", () => {
      expect(checkStreakAchievements(1)).toEqual([]);
      expect(checkStreakAchievements(5)).toEqual([]);
      expect(checkStreakAchievements(6)).toEqual([]);
    });

    it("returns 7-Day Streak achievement for 7 day streak", () => {
      const achievements = checkStreakAchievements(7);
      expect(achievements).toContain("7-Day Streak");
      expect(achievements).toHaveLength(1);
    });

    it("returns 14-Day Streak achievement for 14 day streak", () => {
      const achievements = checkStreakAchievements(14);
      expect(achievements).toContain("14-Day Streak");
      expect(achievements).toHaveLength(1);
    });

    it("returns 30-Day Streak achievement for 30 day streak", () => {
      const achievements = checkStreakAchievements(30);
      expect(achievements).toContain("30-Day Streak");
      expect(achievements).toHaveLength(1);
    });

    it("returns 60-Day Streak achievement for 60 day streak", () => {
      const achievements = checkStreakAchievements(60);
      expect(achievements).toContain("60-Day Streak");
      expect(achievements).toHaveLength(1);
    });

    it("returns 100-Day Streak achievement for 100 day streak", () => {
      const achievements = checkStreakAchievements(100);
      expect(achievements).toContain("100-Day Streak");
      expect(achievements).toHaveLength(1);
    });

    it("returns 1-Year Streak achievement for 365 day streak", () => {
      const achievements = checkStreakAchievements(365);
      expect(achievements).toContain("1-Year Streak");
      expect(achievements).toHaveLength(1);
    });

    it("returns empty array for streaks between milestones", () => {
      expect(checkStreakAchievements(8)).toEqual([]);
      expect(checkStreakAchievements(15)).toEqual([]);
      expect(checkStreakAchievements(31)).toEqual([]);
      expect(checkStreakAchievements(50)).toEqual([]);
      expect(checkStreakAchievements(99)).toEqual([]);
      expect(checkStreakAchievements(200)).toEqual([]);
    });
  });
});
