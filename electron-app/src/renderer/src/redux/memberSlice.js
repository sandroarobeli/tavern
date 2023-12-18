import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const api = window.api

// Lists all existing members
export const listMembers = createAsyncThunk(
  'list:members',
  async (initialPost, { rejectWithValue }) => {
    try {
      const members = await api.invoke('list:members', null)

      if (!members) {
        // NON-NETWORK (NON 500 STATUS CODE) RELATED ERRORS
        // THIS FUNCTIONALITY WILL BE REAL TESTED WHEN LOGIN IS ENABLED
        // E.I. WHEN I CAN MANUALLY CAUSE AN ERROR
        return rejectWithValue('Server error. unable to generate member list')
      }
      return members
    } catch (error) {
      // NETWORK RELATED ERRORS
      console.log('from thunk catch') //test
      console.log(error.message) //test
      return rejectWithValue(error.message)
    }
  }
)

const statusStates = {
  isIdle: 'isIdle',
  isFetching: 'isFetching',
  isSuccess: 'isSuccess',
  isError: 'isError'
}

const memberSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
    status: statusStates.isIdle,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listMembers.pending, (state) => {
        state.status = statusStates.isFetching
      })
      .addCase(listMembers.fulfilled, (state, action) => {
        state.status = statusStates.isSuccess
        state.members = action.payload.map((m) => ({ ...m, tables: [] }))
        console.log('success action.payload: ', action.payload) // test
      })
      .addCase(listMembers.rejected, (state, action) => {
        state.status = statusStates.isError
        console.log('custom error action.payload: ', action.payload) // ALLOWS CUSTOM MESSAGING
        state.error = action.payload // CUSTOM
      })
  }
})

export const selectAllMembers = (state) => state.members.members // temp for now
export const selectLoggedInMembers = (state) => state.members.members.map((member) => member.name) // temp
export const selectMemberError = (state) => state.members.error
export const selectMemberStatus = (state) => state.members.status

export default memberSlice.reducer
