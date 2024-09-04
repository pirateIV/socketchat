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
    setUser(state, action) {
      state.users = [...state.users, action.payload];
    },
    setUsers(state, action) {
      state.users = [...state.users, ...action.payload];
    },
    connectUser(state, action) {
      const { userID, connected } = action.payload;

      // if users state doesn't contain users just add user
      const existingUser = state.users.find((user) => user.userID === userID);
      if (!existingUser) {
        state.users = [...state.users, action.payload];
        return;
      }

      state.users = state.users.map((user) =>
        user.userID === userID ? { ...user, connected } : user,
      );
      console.log(action.payload);
    },
    disconnectUser(state, action) {
      state.users = state.users.map((user) =>
        user.userID === action.payload ? { ...user, connected: false } : user,
      );
    },
  },
});

export const {
  setUsername,
  setUsers,
  setSelectedUser,
  setUserSelected,
  connectUser,
  disconnectUser,
} = userSlice.actions;

export default userSlice.reducer;
