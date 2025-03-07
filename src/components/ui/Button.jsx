import React from 'react';
import styled, { css } from 'styled-components';

const ButtonSizes = {
  small: css`
    padding: ${props => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
    font-size: ${props => props.theme.typography.fontSize.sm};
  `,
  medium: css`
    padding: ${props => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
    font-size: ${props => props.theme.typography.fontSize.md};
  `,
  large: css`
    padding: ${props => `${props.theme.spacing.md} ${props.theme.spacing.lg}`};
    font-size: ${props => props.theme.typography.fontSize.lg};
  `,
};

const ButtonVariants = {
  primary: css`
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary}dd;
    }
  `,
  secondary: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: 1px solid ${props => props.theme.colors.primary};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary}11;
    }
  `,
  text: css`
    background-color: transparent;
    color: ${props => props.theme.colors.primary};
    border: none;
    padding: ${props => props.theme.spacing.xs};
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.hover};
    }
  `,
  danger: css`
    background-color: ${props => props.theme.colors.error};
    color: white;
    border: none;
    
    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.error}dd;
    }
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};
  outline: none;
  
  ${props => ButtonSizes[props.size || 'medium']}
  ${props => ButtonVariants[props.variant || 'primary']}
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  ${props => props.iconButton && css`
    width: ${props => {
      switch (props.size) {
        case 'small': return '32px';
        case 'large': return '48px';
        default: return '40px';
      }
    }};
    height: ${props => {
      switch (props.size) {
        case 'small': return '32px';
        case 'large': return '48px';
        default: return '40px';
      }
    }};
    padding: 0;
    border-radius: ${props => props.theme.borderRadius.full};
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
  ...props 
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      disabled={disabled}
      fullWidth={fullWidth}
      iconButton={iconButton}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;