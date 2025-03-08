import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/thunks/taskThunks';
import TaskInput from '../tasks/TaskInput';
import TaskList from '../tasks/TaskList';
import TaskCalendar from '../tasks/TaskCalendar';

const DashboardContainer = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const DashboardHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    margin-bottom: ${props => props.theme.spacing.md || '1rem'};
    padding: 0 0.5rem;
  }
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
  
  @media (max-width: 768px) {
    font-size: calc(${props => props.theme.typography.fontSize.lg || '1.25rem'} * 0.9);
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.theme.typography.fontSize.lg || '1.25rem'};
  }
`;

const PageDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
  
  @media (max-width: 768px) {
    font-size: calc(${props => props.theme.typography.fontSize.md || '1rem'} * 0.9);
  }
  
  @media (max-width: 480px) {
    font-size: ${props => props.theme.typography.fontSize.sm || '0.875rem'};
    margin-bottom: 0.5rem;
  }
`;

const ContentSection = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <PageTitle style={{ color: '#006400' }}>
          Welcome, {user?.name || 'User'}
        </PageTitle>
        <PageDescription style={{ color: '#24c650' }}>
          Manage your tasks efficiently with our task manager. Add, organize, and track your progress.
        </PageDescription>
      </DashboardHeader>
      
      <ContentSection>
        <TaskInput />
        <TaskList />
        <TaskCalendar tasks={tasks} />
      </ContentSection>
    </DashboardContainer>
  );
};

export default Dashboard;