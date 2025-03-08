import React from 'react';
import { useSelector } from 'react-redux';
import TaskCalendar from '../tasks/TaskCalendar';
import styled from 'styled-components';

// Styled components for responsive design
const CalendarPageContainer = styled.div`
  width: 100%;
  padding: 1rem;
  
  @media (max-width: 768px) {
    padding: 0.75rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
  }
`;

const CalendarWrapper = styled.div`
  width: 100%;
  overflow-x: auto; /* Allow horizontal scrolling if needed */
  box-shadow: 0 0 10px 4px rgba(33, 199, 33, 0.1);
  border-radius: var(--border-radius);
  
  /* Ensure calendar is usable on small screens */
  @media (max-width: 480px) {
    margin: 0 -0.5rem; /* Extend slightly beyond container on very small screens */
    border-radius: 0;
  }
`;

const CalendarPage = () => {
  const { tasks } = useSelector(state => state.tasks);
  
  return (
    <CalendarPageContainer>
      <PageTitle>Calendar</PageTitle>
      <PageDescription>
        View and manage your tasks in calendar view
      </PageDescription>
      <CalendarWrapper>
        <TaskCalendar tasks={tasks} />
      </CalendarWrapper>
    </CalendarPageContainer>
  );
};

export default CalendarPage;