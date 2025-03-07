// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Password strength validation
  export const isStrongPassword = (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  };
  
  // Check if passwords match
  export const doPasswordsMatch = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  // Required field validation
  export const isRequired = (value) => {
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    return value !== null && value !== undefined;
  };
  
  // Minimum length validation
  export const minLength = (value, min) => {
    if (!value) return false;
    return value.length >= min;
  };
  
  // Maximum length validation
  export const maxLength = (value, max) => {
    if (!value) return true; // Empty values should be caught by isRequired
    return value.length <= max;
  };
  
  // Form validation helper
  export const validateForm = (formData, validationRules) => {
    const errors = {};
    
    Object.keys(validationRules).forEach(field => {
      const value = formData[field];
      const rules = validationRules[field];
      
      if (rules.required && !isRequired(value)) {
        errors[field] = 'This field is required';
        return;
      }
      
      if (rules.minLength && !minLength(value, rules.minLength)) {
        errors[field] = `Must be at least ${rules.minLength} characters`;
        return;
      }
      
      if (rules.maxLength && !maxLength(value, rules.maxLength)) {
        errors[field] = `Cannot exceed ${rules.maxLength} characters`;
        return;
      }
      
      if (rules.isEmail && !isValidEmail(value)) {
        errors[field] = 'Please enter a valid email address';
        return;
      }
      
      if (rules.isStrongPassword && !isStrongPassword(value)) {
        errors[field] = 'Password must be at least 8 characters with uppercase, lowercase and numbers';
        return;
      }
      
      if (rules.match && formData[rules.match] !== value) {
        errors[field] = `Must match ${rules.matchDisplay || rules.match}`;
        return;
      }
      
      if (rules.custom && typeof rules.custom === 'function') {
        const customError = rules.custom(value, formData);
        if (customError) {
          errors[field] = customError;
        }
      }
    });
    
    return errors;
  };