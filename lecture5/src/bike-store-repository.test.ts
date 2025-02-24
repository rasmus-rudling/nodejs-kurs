import {describe, expect, test} from "@jest/globals";
import 'dotenv/config';

const sum = (a: number, b: number) => {
  return a + b
}

describe('ShouldSumProperly', () => {
  test.each([
    [1, 2, 3],
    [4, 4, 8],
    [9, 9, 18],
    [10, 10, 20]
  ])("adds %i + %i to equal %i", (firstNum, secondNum, expected) => {
    expect(sum(firstNum, secondNum)).toBe(expected);
  });
});