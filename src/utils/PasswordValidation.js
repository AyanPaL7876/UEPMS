// src/utils/passwordValidation.js

export function validatePassword(currentPassword, newPassword, confirmPassword) {
    const errors = [];
  
    // Current password validation
    if (!currentPassword.trim()) {
      errors.push('Current password is required');
    }
  
    // New password validations
    if (!newPassword.trim()) {
      errors.push('New password is required');
    } else {
      if (newPassword.length < 8) {
        errors.push('New password must be at least 8 characters');
      }
      if (!/[A-Z]/.test(newPassword)) {
        errors.push('New password must contain at least one uppercase letter');
      }
      if (!/[a-z]/.test(newPassword)) {
        errors.push('New password must contain at least one lowercase letter');
      }
      if (!/[0-9]/.test(newPassword)) {
        errors.push('New password must contain at least one number');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
        errors.push('New password must contain at least one special character');
      }
      if (newPassword === currentPassword) {
        errors.push('New password cannot be the same as current password');
      }
    }
  
    // Confirm password validation
    if (!confirmPassword.trim()) {
      errors.push('Confirm password is required');
    } else if (newPassword !== confirmPassword) {
      errors.push('New passwords do not match');
    }
  
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  export function calculatePasswordStrength(password) {
    let strength = 0;
  
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
  
    // Character type checks
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
  
    // Maximum strength is 6
    return Math.min(strength, 6);
  }