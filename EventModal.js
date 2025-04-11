// EventModal.js
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

Modal.setAppElement('#root');

const EventModal = ({ isOpen, onClose, onSave, onDelete, slotInfo, selectedEvent }) => {
  const [title, setTitle] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setStart(new Date(selectedEvent.start));
      setEnd(new Date(selectedEvent.end));
      setCategory(selectedEvent.extendedProps?.category || '');
    } else if (slotInfo) {
      setTitle('');
      setStart(slotInfo.start);
      setEnd(slotInfo.end);
      setCategory('');
    }
  }, [selectedEvent, slotInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: selectedEvent ? selectedEvent.id : Date.now().toString(),
      title,
      start,
      end,
      category,
      color: '#3788d8',
    };
    onSave(newEvent, !!selectedEvent);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Event Modal">
      <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <br /><br />
        <DatePicker selected={start} onChange={(date) => setStart(date)} showTimeSelect dateFormat="Pp" />
        <br /><br />
        <DatePicker selected={end} onChange={(date) => setEnd(date)} showTimeSelect dateFormat="Pp" />
        <br /><br />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <br /><br />
        <button type="submit">{selectedEvent ? 'Update' : 'Save'}</button>
        {selectedEvent && (
          <button type="button" onClick={() => {
            onDelete(selectedEvent.id);
            onClose();
          }}>Delete</button>
        )}
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default EventModal;
