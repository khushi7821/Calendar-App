// src/api.js

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000', // backend server
});

export const getEvents = () => API.get('/events');
export const createEvent = (event) => API.post('/events', event);
export const updateEvent = (id, updatedEvent) => API.put(`/events/${id}`, updatedEvent);
export const deleteEventById = (id) => API.delete(`/events/${id}`);
