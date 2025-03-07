import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/thunks/taskThunks';
// Remove the Layout import
import TaskInput from '../tasks/TaskInput';
import TaskList from '../tasks/TaskList';
import TaskCalendar from '../tasks/TaskCalendar';

const DashboardContainer = styled.div``;

const DashboardHeader = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const PageDescription = styled.p`
  font-size: ${props => props.theme.typography.fontSize.md};
  color: ${props => props.theme.colors.textSecondary};
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  return (
    // Remove the Layout wrapper
    <DashboardContainer>
      <DashboardHeader>
      <PageTitle style={{ color: '#006400' }}>Welcome, {user?.name || 'User'}</PageTitle>
      <PageDescription style={{ color: '#24c650' }}>
  Manage your tasks efficiently with our task manager. Add, organize, and track your progress.
</PageDescription>

      </DashboardHeader>
      
      <TaskInput />
      <TaskList />
      <TaskCalendar tasks={tasks} />
    </DashboardContainer>
  );
};

export default Dashboard;