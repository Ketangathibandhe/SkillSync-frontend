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

// Fetch all roadmaps for sidebar
export const fetchUserRoadmaps = createAsyncThunk(
  "skill/fetchUserRoadmaps",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/ai/roadmaps`, { withCredentials: true });
      return res.data.roadmaps;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//  Fetch single roadmap by ID
export const fetchRoadmapById = createAsyncThunk(
  "skill/fetchRoadmapById",
  async (roadmapId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/ai/roadmap/${roadmapId}`, { withCredentials: true });
      return res.data.roadmap;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//  Fetch latest roadmap (default load)
export const fetchLatestRoadmap = createAsyncThunk(
  "skill/fetchLatestRoadmap",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/ai/roadmaps/latest`, { withCredentials: true });
      return res.data.roadmap;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Delete roadmap by ID (DB + Redux state)
export const deleteRoadmapById = createAsyncThunk(
  "skill/deleteRoadmapById",
  async (roadmapId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/ai/roadmap/${roadmapId}`, { withCredentials: true });
      return roadmapId; // return id so we can remove from state
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
  userRoadmaps: [],        //  sidebar list
  selectedRoadmap: null,   // currently viewed roadmap
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
    resetSkillState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Analyze Skill Gap
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

      // Generate Roadmap
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
      })

      //  Fetch all roadmaps
      .addCase(fetchUserRoadmaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRoadmaps.fulfilled, (state, action) => {
        state.loading = false;
        state.userRoadmaps = action.payload;
      })
      .addCase(fetchUserRoadmaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Fetch roadmap by ID
      .addCase(fetchRoadmapById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoadmapById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoadmap = action.payload;
      })
      .addCase(fetchRoadmapById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Fetch latest roadmap
      .addCase(fetchLatestRoadmap.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestRoadmap.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedRoadmap = action.payload;
      })
      .addCase(fetchLatestRoadmap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //  Delete roadmap
      .addCase(deleteRoadmapById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoadmapById.fulfilled, (state, action) => {
        state.loading = false;
        state.userRoadmaps = state.userRoadmaps.filter(r => r._id !== action.payload);
        if (state.selectedRoadmap?._id === action.payload) {
          state.selectedRoadmap = null;
        }
      })
      .addCase(deleteRoadmapById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setTargetRole, setCurrentSkills, resetSkillState } = skillSlice.actions;
export default skillSlice.reducer;