// skillSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "./constants";

// Async thunks
export const analyzeSkillGap = createAsyncThunk(
  "skill/analyzeSkillGap",
  async ({ targetRole, currentSkills }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        BASE_URL + "/api/ai/skill-gap",
        { targetRole, currentSkills },
        { withCredentials: true }
      );
      return res.data.gapAnalysis;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const generateRoadmap = createAsyncThunk(
  "skill/generateRoadmap",
  async ({ targetRole, currentSkills }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        BASE_URL + "/api/ai/roadmap",
        { targetRole, currentSkills },
        { withCredentials: true }
      );
      return res.data.roadmap;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const initialState = {
  targetRole: "",
  currentSkills: [],
  gapAnalysis: "",
  roadmap: null,
  loading: false,
  error: null,
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    setTargetRole: (state, action) => {
      state.targetRole = action.payload;
    },
    setCurrentSkills: (state, action) => {
      state.currentSkills = action.payload;
    },
    resetSkillState: () => initialState, // 👈 Add this reducer
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeSkillGap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(analyzeSkillGap.fulfilled, (state, action) => {
        state.loading = false;
        state.gapAnalysis = action.payload;
      })
      .addCase(analyzeSkillGap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generateRoadmap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateRoadmap.fulfilled, (state, action) => {
        state.loading = false;
        state.roadmap = action.payload;
      })
      .addCase(generateRoadmap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTargetRole, setCurrentSkills, resetSkillState } = skillSlice.actions;
export default skillSlice.reducer;