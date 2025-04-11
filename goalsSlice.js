import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
  const res = await axios.get('http://localhost:5000/goals');
  return res.data;
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.fulfilled, (state, action) => {
      state.goals = action.payload;
    });
  },
});

export default goalsSlice.reducer;
