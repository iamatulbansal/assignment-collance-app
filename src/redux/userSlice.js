import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [
    {
      name: "atul",
      dateOfBirth: "2019-01-27",
      id: "1690480906756",
      age: 4,
      phoneNumber: "0987654321",
      password: "Admin@2021",
      confirmPassword: "Admin@2021",
      address: ["gwalio", "agra", "morena"],
    },
    {
      name: "amit",
      dateOfBirth: "2020-01-27",
      age: 3,
      phoneNumber: "44545454",
      password: "Admin@20211",
      confirmPassword: "Admin@20211",
      address: ["gwalio", "dsfds", "sdfdsf"],
      id: "1690481672948",
    },
  ],
  updateValue: null,
};
export const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    register: (state = initialState, action) => {
      state.users.push(action.payload);
      state.updateValue = null;
    },
    removeUser: (state = initialState, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    editUser: (state = initialState, action) => {
      state.updateValue = action.payload;
    },
    updateUser: (state = initialState, action) => {
      const { id } = action.payload;
      const index = state.users.findIndex((user) => user.id === id);
      state.users.splice(index, 1, action.payload);
      state.updateValue = null;
    },
  },
});
export const { register, removeUser, updateUser, editUser } = userSlice.actions;
export default userSlice.reducer;
