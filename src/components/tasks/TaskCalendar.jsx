import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';

const TaskCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { tasks } = useSelector(state => state.tasks);
  
  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <div className="month-navigation">
          <button className="prev-month" onClick={() => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))}>
            &lt;
          </button>
          <h2>{format(currentDate, 'MMMM yyyy')}</h2>
          <button className="next-month" onClick={() => setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))}>
            &gt;
          </button>
        </div>
      </div>
    );
  };
  
  const renderDays = () => {
    const days = [];
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    weekDays.forEach(day => {
      days.push(
        <div className="calendar-day-header" key={day}>
          {day}
        </div>
      );
    });
    
    return <div className="calendar-days">{days}</div>;
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const tasksForDay = tasks.filter(task => {
          if (!task.dueDate) return false;
          return isSameDay(new Date(task.dueDate), day);
        });
        
        days.push(
          <div
            className={`calendar-cell ${!isSameMonth(day, monthStart) ? 'disabled' : ''} ${isSameDay(day, new Date()) ? 'today' : ''}`}
            key={day.toString()}
          >
            <span className="calendar-date">{format(day, 'd')}</span>
            {tasksForDay.length > 0 && (
              <div className="calendar-tasks">
                {tasksForDay.map(task => (
                  <div 
                    key={task.id} 
                    className={`calendar-task ${task.category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {task.text.length > 15 ? task.text.substring(0, 15) + '...' : task.text}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    
    return <div className="calendar-body">{rows}</div>;
  };
  
  return (
    <div className="task-calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default TaskCalendar;