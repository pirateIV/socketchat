import { socket } from "@/socket";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  selectedUser: {
    userID: "",
    username: "",
    messages: [],
    self: true,
    imgSrc: "",
    connected: false,
    hasNewMessages: false,
  },
  userSelected: false,
  messages: [],
  hasNewMessages: false,
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
    setMessages(state, action) {
      const message = action.payload;
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
    setSelectedUserMessages(state, action) {
      const message = action.payload;
      state.selectedUser.messages.push(message);
      // update the users state
      // state.users = state.users.map((user) => {
      //   if (user.userID === state.selectedUser.userID) {
      //     user.messages.push(message);
      //   }
      //   return user;
      // });
    },
    setMessagesPerUser(state, action) {
      const { message, from, to } = action.payload;
      console.log(action.payload);
      const fromSelf = socket.userID === from;
      state.users = state.users.map((user) => {
        if (user.userID === fromSelf ? from : to) {
          // return {
          //   ...user,
          //   messages: [...user.messages, message],
          //   hasNewMessages: user.userID !== state.selectedUser.userID,
          // };
          user.messages.push({ message, from, fromSelf });
          user.hasNewMessages = user.userID !== state.selectedUser.userID;
          return user;
        }
        return user;
      });
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
  setMessagesPerUser,
  setSelectedUserMessages,
} = userSlice.actions;

export default userSlice.reducer;
