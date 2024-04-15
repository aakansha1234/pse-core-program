function modularCalculator(op, num1, num2, mod) {
  if (op == '+') {
    return (num1 + num2) % mod;
  } else if (op== '-') {
    return (num1 - num2) % mod + mod;
  } else if (op == '*') {
    return (num1 * num2) % mod;
  }
}
 
console.log(modularCalculator('+', 10, 15, 12)); // Should return: 1
console.log(modularCalculator('-', 10, 15, 12)); // Should return: 7
console.log(modularCalculator('*', 10, 15, 12)); // Should return: 6