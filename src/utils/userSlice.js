
import { createSlice } from "@reduxjs/toolkit";

// Hydrate from localStorage if available
const storedUser = localStorage.getItem("user");

const userSlice = createSlice({
  name: "user",
  initialState: storedUser ? JSON.parse(storedUser) : null,
  reducers: {
    addUser: (state, action) => {
      const userData = action.payload;
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    },
    removeUser: () => {
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;