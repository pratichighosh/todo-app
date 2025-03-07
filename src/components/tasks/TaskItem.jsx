import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTask, deleteTask, updateTask } from '../redux/slices/taskSlice';
import Modal from '../ui/Modal';

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();
  const { viewMode } = useSelector(state => state.ui);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  
  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };
  
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };
  
  const handleEdit = () => {
    setIsModalOpen(true);
  };
  
  const handleSave = () => {
    dispatch(updateTask(editedTask));
    setIsModalOpen(false);
  };
  
  // Get category color class
  const getCategoryColorClass = (category) => {
    switch(category) {
      case 'Personal':
        return 'green';
      case 'Work Items':
        return 'blue';
      case 'Shopping':
        return 'orange';
      case 'Other things':
        return 'purple';
      default:
        return 'green';
    }
  };
  
  return (
    <>
      <div className={`task-item ${viewMode === 'card' ? 'task-card' : ''}`}>
        <div className="task-item-left">
          <div 
            className={`task-checkbox ${task.completed ? 'checked' : ''} ${getCategoryColorClass(task.category)}`}
            onClick={handleToggle}
          >
            {task.completed && <span className="check-mark">✓</span>}
          </div>
          <div className="task-content">
            <p className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</p>
            {task.dueDate && (
              <p className="task-due-date">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}
          </div>
        </div>
        
        <div className="task-actions">
          <button className="task-action-btn edit" onClick={handleEdit}>
            <span className="edit-icon">✎</span>
          </button>
          <button className="task-action-btn delete" onClick={handleDelete}>
            <span className="delete-icon">×</span>
          </button>
        </div>
      </div>
      
      {isModalOpen && (
        <Modal title="Edit Task" onClose={() => setIsModalOpen(false)}>
          <div className="edit-task-form">
            <div className="form-group">
              <label htmlFor="taskText">Task</label>
              <input 
                type="text" 
                id="taskText" 
                value={editedTask.text} 
                onChange={(e) => setEditedTask({...editedTask, text: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="taskCategory">Category</label>
              <select 
                id="taskCategory" 
                value={editedTask.category}
                onChange={(e) => setEditedTask({...editedTask, category: e.target.value})}
              >
                <option value="Personal">Personal</option>
                <option value="Work Items">Work Items</option>
                <option value="Shopping">Shopping</option>
                <option value="Other things">Other things</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="taskDueDate">Due Date</label>
              <input 
                type="date" 
                id="taskDueDate" 
                value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''} 
                onChange={(e) => setEditedTask({...editedTask, dueDate: e.target.value ? new Date(e.target.value).toISOString() : null})}
              />
            </div>
            
            <div className="form-actions">
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Save</button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default TaskItem;