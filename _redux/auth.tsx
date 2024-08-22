// import { googleLogout } from '@react-oauth/google'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { persistReducer } from 'redux-persist'
import storageLocal from 'redux-persist/lib/storage'

// Original Reducer
export const authReducer = createSlice({
  name: 'root',
  initialState: {
    errors: undefined,
    user: {},
    preference: {},
  },
  reducers: {
    setErrors: (state: any, action: any) => {
      state.errors = action?.payload
    },
    setUser: (state: any, action: any) => {
      state.user = { ...state.user, ...action?.payload }
    },
    setPreference: (state: any, action: any) => {
      state.preference = { ...state?.preference, ...action?.payload }
    },
    logout: (state: any) => {
      state.user = {}
      state.errors = undefined
      state.currentUser = {}
      state.preference = {}
      // googleLogout()
      localStorage.removeItem(`persist:global`)
      localStorage.removeItem(`REACT_QUERY_OFFLINE_CACHE`)
      Cookies.remove(`token`)
    },
  },
})

// Persist Reducer
export const persistedAuthReducer = () =>
  persistReducer(
    {
      key: 'global',
      version: 1,
      whitelist: ['errors', 'user', 'preference'],
      storage: storageLocal,
    },
    authReducer.reducer
  )
