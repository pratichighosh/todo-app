import { 
    fetchTasksStart, 
    fetchTasksSuccess, 
    fetchTasksFailure, 
    addTask, 
    updateTask, 
    deleteTask 
  } from '../slices/taskSlice';
  
  
  // For demo purposes, simulating API calls
  export const fetchTasks = () => async (dispatch) => {
    try {
      dispatch(fetchTasksStart());
      
      // In a real app, you would make an API call here
      // const response = await api.get('/tasks');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Sample tasks for demo
      const sampleTasks = [
        {
          id: '1',
          text: 'Complete Frontend challenge',
          completed: false,
          category: 'Work Items',
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 86400000).toISOString() // tomorrow
        },
        {
          id: '2',
          text: 'Buy groceries',
          completed: true,
          category: 'Shopping',
          createdAt: new Date().toISOString(),
          dueDate: new Date().toISOString()
        },
        {
          id: '3',
          text: 'Morning run',
          completed: false,
          category: 'Personal',
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 172800000).toISOString() // day after tomorrow
        },
        {
          id: '4',
          text: 'Read design books',
          completed: false,
          category: 'Other things',
          createdAt: new Date().toISOString(),
          dueDate: null
        }
      ];
      
      dispatch(fetchTasksSuccess(sampleTasks));
      return { success: true };
    } catch (error) {
      dispatch(fetchTasksFailure(error.message || 'Failed to fetch tasks'));
      return { success: false, error: error.message };
    }
  };
  
  export const createTask = (taskData) => async (dispatch) => {
    try {
      // In a real app, you would make an API call here
      // const response = await api.post('/tasks', taskData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Add the task to the store
      dispatch(addTask(taskData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  export const editTask = (taskData) => async (dispatch) => {
    try {
      // In a real app, you would make an API call here
      // const response = await api.put(`/tasks/${taskData.id}`, taskData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update the task in the store
      dispatch(updateTask(taskData));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };
  
  export const removeTask = (taskId) => async (dispatch) => {
    try {
      // In a real app, you would make an API call here
      // const response = await api.delete(`/tasks/${taskId}`);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Remove the task from the store
      dispatch(deleteTask(taskId));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };