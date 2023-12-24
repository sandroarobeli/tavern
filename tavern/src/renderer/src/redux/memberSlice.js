import { createSlice } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const memberSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
        state.members.push({ ...action.payload, tables: [] })
      })
      .addMatcher(apiSlice.endpoints.logout.matchFulfilled, (state, action) => {
        state.members = state.members.filter((member) => member.name !== action.payload)
      })
  }
})

// Exports reducer functions
// export const { reducer } = membersSlice.actions;

// Exports individual selectors
export const selectLoggedInMembers = (state) => state.members.members

export default memberSlice.reducer
