import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Button from '../ui/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: ${props => props.theme.spacing.lg};
  text-align: center;
  background-color: ${props => props.theme.colors.background};
`;

const NotFoundCode = styled.h1`
  font-size: 6rem;
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.primary};
  margin: 0;
  line-height: 1;
`;

const NotFoundTitle = styled.h2`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
  margin: ${props => props.theme.spacing.md} 0;
`;

const NotFoundDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.lg};
  max-width: 500px;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundCode>404</NotFoundCode>
      <NotFoundTitle>Page Not Found</NotFoundTitle>
      <NotFoundDescription>
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </NotFoundDescription>
      <Link to="/">
        <Button variant="primary">
          <FaArrowLeft /> Back to Dashboard
        </Button>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound;