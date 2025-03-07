import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTasks as fetchTasksAction, 
  createTask,
  editTask,
  removeTask
} from '../redux/thunks/taskThunks';
import { 
  toggleTask as toggleTaskAction,
  clearCompletedTasks,
} from '../redux/slices/taskSlice';

export const useTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector(state => state.tasks);
  
  const fetchTasks = async () => {
    return await dispatch(fetchTasksAction());
  };
  
  const addTask = async (task) => {
    return await dispatch(createTask(task));
  };
  
  const updateTask = async (task) => {
    return await dispatch(editTask(task));
  };
  
  const deleteTask = async (taskId) => {
    return await dispatch(removeTask(taskId));
  };
  
  const toggleTask = (taskId) => {
    dispatch(toggleTaskAction(taskId));
  };
  
  const clearCompleted = () => {
    dispatch(clearCompletedTasks());
  };
  
  // Computed values
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completionPercentage = tasks.length > 0 
    ? Math.round((completedTasks.length / tasks.length) * 100) 
    : 0;
  
  // Group tasks by different criteria
  const tasksByCategory = tasks.reduce((acc, task) => {
    const category = task.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(task);
    return acc;
  }, {});
  
  const tasksByDueDate = tasks.reduce((acc, task) => {
    if (!task.dueDate) {
      if (!acc['No Due Date']) {
        acc['No Due Date'] = [];
      }
      acc['No Due Date'].push(task);
      return acc;
    }
    
    const date = new Date(task.dueDate).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {});
  
  return {
    tasks,
    completedTasks,
    incompleteTasks,
    completionPercentage,
    tasksByCategory,
    tasksByDueDate,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    clearCompleted,
  };
};

export default useTasks;