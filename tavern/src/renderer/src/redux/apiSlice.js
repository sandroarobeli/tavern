import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = window.api

// Define our single API slice object
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: ''
  }),

  tagTypes: ['Member', 'Serving'],
  endpoints: (builder) => ({
    /* MEMBERS */
    listMembers: builder.query({
      queryFn: async () => {
        try {
          const members = await api.invoke('list:members', null)
          if (!members) {
            return {
              error: 'Unable to display team members. Check the database connection and try again.'
            }
          }
          // Return the result in an object with a `data` field
          return { data: members }
        } catch (error) {
          // Catch any errors and return them as an object with an `error` field
          return { error }
        }
      },
      providesTags: ['Member']
    }),
    login: builder.mutation({
      queryFn: async ({ id, password }) => {
        try {
          const member = await api.invoke('login:members', {
            id,
            password
          })
          if (!member) {
            return {
              error: 'Login failed. Please check your credentials and try again.'
            }
          }

          return { data: member }
        } catch (error) {
          return { error }
        }
      },
      providesTags: ['Serving']
    }),
    logout: builder.mutation({
      queryFn: async ({ id, password }) => {
        try {
          const member = await api.invoke('logout:members', {
            id,
            password
          })
          if (!member) {
            return { error: 'Logout failed. Please check your credentials and try again' }
          }

          return { data: member }
        } catch (error) {
          return { error }
        }
      },
      invalidatesTags: ['Serving']
    })
  })
})

export const { useListMembersQuery, useLoginMutation, useLogoutMutation } = apiSlice
