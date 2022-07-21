import { expect, it } from "vitest";
import { formatNumber } from "../helpers/numbers";

const testCases: [number, string][] = [
    [1, "1"],
    [100, "100"],
    [2424, "2,424"],
    [25559, "25,559"],
    [925324, "925,324"],
    [1098234, "1,098,234"],
    [44589634, "44,589,634"],
    [991442052, "991,442,052"],
    [2029532432, "2,029,532,432"],
];

it("should properly format numbers", () => {
    for (const c of testCases) {
        expect(formatNumber(c[0])).toBe(c[1]);
    }
});
