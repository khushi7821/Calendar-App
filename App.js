// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEvents,
  addEventAsync,
  updateEventAsync,
  deleteEventAsync,
} from './redux/eventsSlice';
import { fetchGoals } from './redux/goalsSlice';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from './components/EventModal';
import Sidebar from './components/Sidebar';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.events);
  const goals = useSelector((state) => state.goals.goals);

  const [modalOpen, setModalOpen] = useState(false);
  const [slotInfo, setSlotInfo] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleDateSelect = (selectInfo) => {
    setSelectedEvent(null);
    setSlotInfo({
      start: selectInfo.start,
      end: selectInfo.end,
    });
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setSlotInfo({
      start: clickInfo.event.start,
      end: clickInfo.event.end,
    });
    setModalOpen(true);
  };

  const handleEventSave = (eventData, isEdit = false) => {
    const goalColor =
      goals.find((g) => g.name.toLowerCase() === eventData.category?.toLowerCase())
        ?.color || '#3788d8';

    const coloredEvent = {
      ...eventData,
      color: goalColor,
    };

    if (isEdit) {
      coloredEvent.id = selectedEvent.id || selectedEvent._id;
      dispatch(updateEventAsync(coloredEvent));
    } else {
      dispatch(addEventAsync(coloredEvent));
    }
  };

  const handleEventDelete = (id) => {
    dispatch(deleteEventAsync(id));
  };

  const handleExternalDrop = (info) => {
    const taskName = info.draggedEl.getAttribute('data-taskname');
    const goalId = info.draggedEl.getAttribute('data-goalid');

    const goal = goals.find((g) => g._id === goalId);
    const goalColor = goal?.color || '#2196F3';

    const newEvent = {
      title: taskName,
      start: info.date,
      end: new Date(info.date.getTime() + 30 * 60000), // 30 mins
      category: goal?.name || 'task',
      color: goalColor,
    };

    dispatch(addEventAsync(newEvent));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ flex: 1, marginLeft: '260px', padding: '10px' }}>
        <h1>📅 My Calendar App</h1>

        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          editable={true}
          selectable={true}
          droppable={true}
          events={events}
          select={handleDateSelect}
          eventClick={handleEventClick}
          drop={handleExternalDrop}
          headerToolbar={{
            start: 'prev,next today',
            center: 'title',
            end: 'timeGridWeek,timeGridDay',
          }}
          height="auto"
        />

        <EventModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedEvent(null);
          }}
          onSave={handleEventSave}
          onDelete={handleEventDelete}
          slotInfo={slotInfo}
          selectedEvent={selectedEvent}
        />
      </div>
    </div>
  );
};

export default App;
