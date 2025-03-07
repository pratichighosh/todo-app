import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';

const TaskList = () => {
  const { tasks } = useSelector(state => state.tasks);
  const { viewMode } = useSelector(state => state.ui);
  
  // Group tasks by category
  const groupedTasks = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {});
  
  return (
    <div className={`task-list-container ${viewMode}`}>
      {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
        <div key={category} className="task-category-group">
          <h3 className="task-category-title">{category}</h3>
          <div className={`task-list ${viewMode === 'card' ? 'task-grid' : ''}`}>
            {categoryTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      ))}
      
      {tasks.length === 0 && (
        <div className="empty-state">
          <p>No tasks yet. Add a task to get started!</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;