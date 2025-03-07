// Generate a random ID (useful for demo purposes)
export const generateId = (prefix = '') => {
    return `${prefix}${Math.random().toString(36).substring(2, 9)}`;
  };
  
  // Debounce function to limit how often a function can be called
  export const debounce = (func, wait) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  // Throttle function to ensure function is called at most once in specified time
  export const throttle = (func, limit) => {
    let inThrottle;
    
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  };
  
  // Format number with commas
  export const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  
  // Truncate text with ellipsis
  export const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };
  
  // Convert hex color to rgba with opacity
  export const hexToRgba = (hex, opacity = 1) => {
    if (!hex) return '';
    
    hex = hex.replace('#', '');
    
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  // Get contrast text color (black/white) based on background color
  export const getContrastColor = (hexColor) => {
    if (!hexColor) return '#000000';
    
    // Remove hash
    hexColor = hexColor.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return black for bright colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };
  
  // Deep clone an object
  export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
  
  // Sort array of objects by property
  export const sortByProperty = (array, property, direction = 'asc') => {
    const sortedArray = [...array];
    
    sortedArray.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return direction === 'asc' 
          ? valueA.localeCompare(valueB) 
          : valueB.localeCompare(valueA);
      }
      
      return direction === 'asc' 
        ? valueA - valueB 
        : valueB - valueA;
    });
    
    return sortedArray;
  };