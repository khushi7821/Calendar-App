// src/redux/eventsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getEvents, createEvent, updateEvent, deleteEventById } from '../api';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const res = await getEvents();
  return res.data;
});

export const addEventAsync = createAsyncThunk('events/addEvent', async (event) => {
  const res = await createEvent(event);
  return res.data;
});

export const updateEventAsync = createAsyncThunk('events/updateEvent', async (event) => {
  const res = await updateEvent(event.id, event);
  return res.data;
});

export const deleteEventAsync = createAsyncThunk('events/deleteEvent', async (id) => {
  await deleteEventById(id);
  return id;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(addEventAsync.fulfilled, (state, action) => {
        state.events.push(action.payload);
      })
      .addCase(updateEventAsync.fulfilled, (state, action) => {
        const index = state.events.findIndex(e => e._id === action.payload._id);
        if (index !== -1) state.events[index] = action.payload;
      })
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.events = state.events.filter(e => e._id !== action.payload);
      });
  },
});

export default eventsSlice.reducer;
