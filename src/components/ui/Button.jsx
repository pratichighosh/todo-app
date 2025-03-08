import React from 'react';
import styled, { css } from 'styled-components';

// Define fallback values to prevent undefined errors
const getThemeValue = (props, path, fallback) => {
  const parts = path.split('.');
  let value = props.theme;
  
  for (const part of parts) {
    if (value && value[part] !== undefined) {
      value = value[part];
    } else {
      return fallback;
    }
  }
  
  return value;
};

const ButtonSizes = {
  small: css`
    padding: ${props => `${getThemeValue(props, 'spacing.xs', '0.25rem')} ${getThemeValue(props, 'spacing.sm', '0.5rem')}`};
    font-size: ${props => getThemeValue(props, 'typography.fontSize.sm', '0.875rem')};
  `,
  medium: css`
    padding: ${props => `${getThemeValue(props, 'spacing.sm', '0.5rem')} ${getThemeValue(props, 'spacing.md', '1rem')}`};
    font-size: ${props => getThemeValue(props, 'typography.fontSize.md', '1rem')};
  `,
  large: css`
    padding: ${props => `${getThemeValue(props, 'spacing.md', '1rem')} ${getThemeValue(props, 'spacing.lg', '1.5rem')}`};
    font-size: ${props => getThemeValue(props, 'typography.fontSize.lg', '1.125rem')};
  `,
};

const ButtonVariants = {
  primary: css`
    background-color: ${props => getThemeValue(props, 'colors.primary', '#4cd964')};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: ${props => getThemeValue(props, 'colors.primary', '#4cd964')}dd;
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${props => getThemeValue(props, 'colors.primary', '#4cd964')};
    border: 1px solid ${props => getThemeValue(props, 'colors.primary', '#4cd964')};
    
    &:hover:not(:disabled) {
      background-color: ${props => getThemeValue(props, 'colors.primary', '#4cd964')}11;
    }
  `,
  text: css`
    background-color: transparent;
    color: ${props => getThemeValue(props, 'colors.primary', '#4cd964')};
    border: none;
    padding: ${props => getThemeValue(props, 'spacing.xs', '0.25rem')};
    
    &:hover:not(:disabled) {
      background-color: ${props => getThemeValue(props, 'colors.hover', 'rgba(76, 217, 100, 0.1)')};
    }
  `,
  danger: css`
    background-color: ${props => getThemeValue(props, 'colors.error', '#ff3b30')};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: ${props => getThemeValue(props, 'colors.error', '#ff3b30')}dd;
    }
  `,
};

// Using $-prefixed props (transient props) so they're not passed to the DOM
const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => getThemeValue(props, 'spacing.sm', '0.5rem')};
  border-radius: ${props => getThemeValue(props, 'borderRadius.md', '8px')};
  font-weight: ${props => getThemeValue(props, 'typography.fontWeight.medium', '500')};
  cursor: pointer;
  transition: all ${props => getThemeValue(props, 'transitions.fast', '0.2s ease')};
  outline: none;
  
  ${props => ButtonSizes[props.$size || 'medium']}
  ${props => ButtonVariants[props.$variant || 'primary']}
  
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.$iconButton && css`
    width: ${props => {
      switch (props.$size) {
        case 'small': return '32px';
        case 'large': return '48px';
        default: return '40px';
      }
    }};
    height: ${props => {
      switch (props.$size) {
        case 'small': return '32px';
        case 'large': return '48px';
        default: return '40px';
      }
    }};
    padding: 0;
    border-radius: ${props => getThemeValue(props, 'borderRadius.full', '9999px')};
  `}
`;

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  type = 'button', 
  disabled = false, 
  fullWidth = false,
  iconButton = false,
  ...otherProps 
}) => {
  // Pass styled component props with $ prefix to prevent them from being added to the DOM
  return (
    <StyledButton
      type={type}
      disabled={disabled}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $iconButton={iconButton}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
};

export default Button;