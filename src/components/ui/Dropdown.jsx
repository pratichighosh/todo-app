import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.text};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => `${props.theme.spacing.sm} ${props.theme.spacing.md}`};
  font-size: ${props => props.theme.typography.fontSize.md};
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: all ${props => props.theme.transitions.fast};
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}33;
  }
`;

const ChevronIcon = styled(FaChevronDown)`
  transition: transform ${props => props.theme.transitions.fast};
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.boxShadow.medium};
  max-height: 250px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  text-align: left;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  cursor: pointer;
  transition: background-color ${props => props.theme.transitions.fast};
  
  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
  
  ${props => props.selected && `
    background-color: ${props.theme.colors.primary}11;
    font-weight: ${props.theme.typography.fontWeight.medium};
  `}
`;

const Dropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option', 
  fullWidth = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const selectedOption = options.find(option => option.value === value);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <DropdownContainer ref={dropdownRef} fullWidth={fullWidth}>
      <DropdownButton onClick={handleToggle}>
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronIcon isOpen={isOpen} />
      </DropdownButton>
      
      <DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            onClick={() => handleSelect(option)}
            selected={option.value === value}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;