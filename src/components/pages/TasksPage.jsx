import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../redux/thunks/taskThunks';
import Layout from '../layout/Layout';
import TaskInput from '../tasks/TaskInput';
import TaskList from '../tasks/TaskList';
import Dropdown from '../ui/Dropdown';

const TasksPageContainer = styled.div``;

const TasksHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${props => props.theme.spacing.md};
  }
`;

const HeaderLeft = styled.div``;

const HeaderRight = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PageTitle = styled.h1`
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const FilterContainer = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  gap: ${props => props.theme.spacing.md};
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TasksPage = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector(state => state.tasks);
  
  const [filter, setFilter] = useState({
    status: 'all',
    priority: 'all',
  });
  
  const [sortBy, setSortBy] = useState('date');
  
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  
  const statusOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'completed', label: 'Completed' },
    { value: 'active', label: 'Active' },
  ];
  
  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
  ];
  
  const sortOptions = [
    { value: 'date', label: 'Sort by Date' },
    { value: 'priority', label: 'Sort by Priority' },
    { value: 'alphabetical', label: 'Sort Alphabetically' },
  ];
  
  const handleFilterChange = (type, value) => {
    setFilter({
      ...filter,
      [type]: value,
    });
  };
  
  // Apply filters and sorting
  const filteredTasks = tasks.filter(task => {
    // Status filter
    if (filter.status === 'completed' && !task.completed) return false;
    if (filter.status === 'active' && task.completed) return false;
    
    // Priority filter
    if (filter.priority !== 'all' && task.priority !== filter.priority) return false;
    
    return true;
  }).sort((a, b) => {
    // Sort by selected option
    switch (sortBy) {
      case 'date':
        return new Date(b.date) - new Date(a.date);
      case 'priority': {
        const priorityValues = { high: 3, medium: 2, low: 1 };
        return priorityValues[b.priority] - priorityValues[a.priority];
      }
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  
  return (
    <Layout>
      <TasksPageContainer>
        <TasksHeader>
          <HeaderLeft>
            <PageTitle>Task Management</PageTitle>
          </HeaderLeft>
          <HeaderRight>
            <Dropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort Tasks"
            />
          </HeaderRight>
        </TasksHeader>
        
        <TaskInput />
        
        <FilterContainer>
          <Dropdown
            options={statusOptions}
            value={filter.status}
            onChange={(value) => handleFilterChange('status', value)}
            placeholder="Filter by Status"
          />
          
          <Dropdown
            options={priorityOptions}
            value={filter.priority}
            onChange={(value) => handleFilterChange('priority', value)}
            placeholder="Filter by Priority"
          />
        </FilterContainer>
        
        <TaskList tasks={filteredTasks} />
      </TasksPageContainer>
    </Layout>
  );
};

export default TasksPage;