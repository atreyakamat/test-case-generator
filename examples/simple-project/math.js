// Example JavaScript file for testing TestPilot
// This demonstrates various function types that TestPilot can generate tests for

/**
 * Adds two numbers together
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} Sum of a and b
 */
export function add(a, b) {
  return a + b;
}

/**
 * Validates an email address
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * User class for demonstration
 */
export class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  /**
   * Gets the user's display name
   * @returns {string} Formatted display name
   */
  getDisplayName() {
    return `User: ${this.name} (${this.email})`;
  }

  /**
   * Checks if the user has a valid email
   * @returns {boolean} True if email is valid
   */
  hasValidEmail() {
    return isValidEmail(this.email);
  }
}

/**
 * Calculates the factorial of a number
 * @param {number} n - Number to calculate factorial for
 * @returns {number} Factorial result
 */
export const factorial = (n) => {
  if (n < 0) {
    throw new Error('Factorial is not defined for negative numbers');
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
};

/**
 * Fetches user data (simulated async function)
 * @param {string} userId - User ID to fetch
 * @returns {Promise<Object>} User data
 */
export async function fetchUserData(userId) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'John Doe',
        email: 'john@example.com'
      });
    }, 100);
  });
}
