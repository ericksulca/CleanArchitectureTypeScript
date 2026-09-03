import { checkHealth } from "../../src/shared/health";

describe("checkHealth", () => {
    it("should return 'OK'", () => {
        const result = checkHealth();
        expect(result.status).toBe("OK");
        expect(new Date(result.timestamp).toString()).not.toBe("Invalid Date");
    });

    it("should return a timestamp", () => {
        const before = new Date().getTime(); // Convertir a timestamp
        const result = checkHealth();
        const after = new Date().getTime(); // Convertir a timestamp
        expect(result.timestamp.getTime()).toBeGreaterThanOrEqual(before);
        expect(result.timestamp.getTime()).toBeLessThanOrEqual(after);
    });
});