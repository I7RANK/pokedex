// tests/utils/copyToClipboard.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { copyToClipboard } from "@/utils/copyToClipboard";

describe("copyToClipboard", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return true when copy succeeds", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);

    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard("test");
    expect(writeTextMock).toHaveBeenCalledWith("test");
    expect(result).toBe(true);
  });

  it("should return false when copy fails", async () => {
    const writeTextMock = vi.fn().mockRejectedValue(new Error("Copy failed"));

    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const result = await copyToClipboard("test");
    expect(result).toBe(false);
  });
});
