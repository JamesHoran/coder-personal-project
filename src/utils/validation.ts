/**
 * Validation utility functions for form fields
 * Provides specific, user-friendly error messages
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates an email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === "") {
    return {
      isValid: false,
      error: "Email is required",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: "Please enter a valid email address (e.g., you@example.com)",
    };
  }

  return { isValid: true };
}

/**
 * Validates a password with specific requirements
 */
export function validatePassword(password: string): ValidationResult {
  if (!password || password.trim() === "") {
    return {
      isValid: false,
      error: "Password is required",
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      error: "Password must be at least 8 characters long",
    };
  }

  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one uppercase letter",
    };
  }

  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one lowercase letter",
    };
  }

  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      error: "Password must contain at least one number",
    };
  }

  return { isValid: true };
}

/**
 * Validates that two passwords match
 */
export function validatePasswordMatch(
  password: string,
  confirmPassword: string
): ValidationResult {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "Passwords do not match. Please ensure both passwords are identical.",
    };
  }

  return { isValid: true };
}

/**
 * Validates a display name
 */
export function validateDisplayName(name: string): ValidationResult {
  if (!name || name.trim() === "") {
    return {
      isValid: false,
      error: "Name is required",
    };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      error: "Name must be at least 2 characters long",
    };
  }

  if (name.trim().length > 50) {
    return {
      isValid: false,
      error: "Name must be less than 50 characters",
    };
  }

  return { isValid: true };
}

/**
 * Gets password strength level
 */
export function getPasswordStrength(password: string): {
  strength: "weak" | "medium" | "strong" | "very-strong";
  label: string;
  color: string;
} {
  if (!password) {
    return { strength: "weak", label: "Weak", color: "text-red-500" };
  }

  let score = 0;

  // Length check
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) {
    return { strength: "weak", label: "Weak", color: "text-red-500" };
  } else if (score <= 4) {
    return { strength: "medium", label: "Medium", color: "text-yellow-500" };
  } else if (score <= 6) {
    return { strength: "strong", label: "Strong", color: "text-green-500" };
  } else {
    return {
      strength: "very-strong",
      label: "Very Strong",
      color: "text-green-600",
    };
  }
}

/**
 * Password requirements for display
 */
export const PASSWORD_REQUIREMENTS = [
  "At least 8 characters long",
  "Contains at least one uppercase letter (A-Z)",
  "Contains at least one lowercase letter (a-z)",
  "Contains at least one number (0-9)",
];
