import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RightSidebarContainer = styled.aside`
  width: 280px;
  background-color: var(--card-bg);
  border-left: 1px solid var(--border-color);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const SidebarTitle = styled.h3`
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
  color: var(--text-secondary);
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: var(--border-radius);
  background-color: transparent;
  color: var(--text-color);
  font-weight: 500;
  transition: var(--transition);
  border: 1px solid var(--border-color);
  width: 100%;
  text-align: left;

  &:hover {
    background-color: rgba(76, 217, 100, 0.1);
    border-color: var(--primary-color);
  }

  .icon {
    margin-right: 0.75rem;
    font-size: 1.25rem;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: var(--border-color);
  margin: 1.5rem 0;
`;

const CalendarContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--card-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker {
    font-family: inherit;
    border-color: var(--border-color);
  }
  
  .react-datepicker__header {
    background-color: var(--primary-color);
    color: white;
  }
  
  .react-datepicker__current-month {
    color: white;
  }
  
  .react-datepicker__day--selected {
    background-color: var(--primary-color);
  }
`;

const TimeSelectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
`;

const TimeInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  width: 45%;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.75rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  
  &.cancel {
    background-color: transparent;
    border: 1px solid var(--border-color);
    color: var(--text-color);
  }
  
  &.confirm {
    background-color: var(--primary-color);
    border: 1px solid var(--primary-color);
    color: white;
  }
`;

const RightSidebar = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');

  const handleAddToCalendar = () => {
    // Here you would handle the actual calendar addition
    console.log('Adding to calendar:', {
      date: selectedDate,
      startTime,
      endTime
    });
    
    // Close the calendar after adding
    setIsCalendarOpen(false);
  };

  return (
    <RightSidebarContainer>
      <SidebarTitle style={{ color: '#006400' }}>Task Actions</SidebarTitle>
      
      <ActionButton onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
        <span className="icon">📅</span>
        Add to Calendar
      </ActionButton>
      
      {isCalendarOpen && (
        <CalendarContainer>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            inline
          />
          
          <TimeSelectionRow>
            <TimeInput 
              type="time" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              aria-label="Start time"
            />
            <TimeInput 
              type="time" 
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              aria-label="End time"
            />
          </TimeSelectionRow>
          
          <ButtonRow>
            <Button 
              className="cancel" 
              onClick={() => setIsCalendarOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="confirm" 
              onClick={handleAddToCalendar}
            >
              Add
            </Button>
          </ButtonRow>
        </CalendarContainer>
      )}
      
      <ActionButton>
        <span className="icon">+</span>
        Add Step
      </ActionButton>
      
      <ActionButton>
        <span className="icon">⏰</span>
        Set Reminder
      </ActionButton>
      
      <Divider />
      
      <SidebarTitle style={{ color: '#006400' }}>Task Details</SidebarTitle>
      
      <ActionButton>
        <span className="icon">🏷️</span>
        Add Tags
      </ActionButton>
      
      <ActionButton>
        <span className="icon">📎</span>
        Add Attachment
      </ActionButton>
      
      <ActionButton>
        <span className="icon">🔗</span>
        Add Link
      </ActionButton>
    </RightSidebarContainer>
  );
};

export default RightSidebar;
