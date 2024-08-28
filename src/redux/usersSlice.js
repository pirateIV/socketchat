import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  selectedUser: null,
  userSelected: false,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setSelectedUser(state, action) {
      state.selectedUser = action.payload;
    },
    setUserSelected(state, action) {
      state.userSelected = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const { setUsername, setUsers, setSelectedUser, setUserSelected } =
  userSlice.actions;

export default userSlice.reducer;
