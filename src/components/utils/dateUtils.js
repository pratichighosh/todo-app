import { format, isToday, isThisWeek, isTomorrow } from 'date-fns';

// Format a date string or Date object to a readable format
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return format(date, 'MMM d, yyyy');
};

// Format a date as relative (today, tomorrow, etc)
export const formatRelativeDate = (dateStr) => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  
  if (isToday(date)) {
    return 'Today';
  }
  
  if (isTomorrow(date)) {
    return 'Tomorrow';
  }
  
  if (isThisWeek(date)) {
    return format(date, 'EEEE'); // Day of week
  }
  
  return format(date, 'MMM d, yyyy');
};

// Get time in 12 hour format
export const formatTime = (dateStr) => {
  if (!dateStr) return '';
  
  const date = new Date(dateStr);
  return format(date, 'h:mm a');
};

// Check if a date is past its due date
export const isPastDue = (dateStr) => {
  if (!dateStr) return false;
  
  const dueDate = new Date(dateStr);
  const now = new Date();
  
  return dueDate < now;
};

// Group dates by month
export const groupByMonth = (dates) => {
  return dates.reduce((acc, date) => {
    const monthYear = format(new Date(date), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(date);
    return acc;
  }, {});
};

// Calculate days remaining until a date
export const daysRemaining = (dateStr) => {
  if (!dateStr) return null;
  
  const date = new Date(dateStr);
  const now = new Date();
  
  // Reset hours to compare just the day
  date.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  
  const diffTime = date - now;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};