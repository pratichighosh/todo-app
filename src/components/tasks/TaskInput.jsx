import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/slices/taskSlice';
import { v4 as uuidv4 } from 'uuid';

const TaskInput = () => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    
    const newTask = {
      id: uuidv4(),
      text: taskText,
      completed: false,
      category: 'Personal', // Default category
      createdAt: new Date().toISOString(),
      dueDate: null
    };
    
    dispatch(addTask(newTask));
    setTaskText('');
  };
  
  return (
    <form className="task-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input 
          type="text" 
          className="task-input" 
          placeholder="Add a task" 
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />
        <button type="submit" className="add-task-btn">Add Task</button>
      </div>
    </form>
  );
};

export default TaskInput;