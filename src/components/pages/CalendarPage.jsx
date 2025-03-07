// src/components/pages/CalendarPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import TaskCalendar from '../tasks/TaskCalendar';

const CalendarPage = () => {
  const { tasks } = useSelector(state => state.tasks);
  
  return (
    <div className="calendar-page">
      <h1 className="page-title">Calendar</h1>
      <p className="page-description">
        View and manage your tasks in calendar view
      </p>
      <TaskCalendar tasks={tasks} />
    </div>
  );
};

export default CalendarPage;