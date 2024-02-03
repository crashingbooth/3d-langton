// import { myFunction } from './myModule';

const myFunction = (num1: number, num2: number): number => {
    return num1 + num2
}

test('should return the sum of two numbers', () => {
  expect(myFunction(2, 3)).toBe(5);
});