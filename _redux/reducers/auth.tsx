// import { googleLogout } from '@react-oauth/google'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { persistReducer } from 'redux-persist'

import storageLocal from '../utils/conditionalStorage'

export const persistKey = 'global'
// Original Reducer
export const authReducer = createSlice({
  name: 'root',
  initialState: {
    errors: undefined,
    data: {},
  },
  reducers: {
    setErrors: (state: any, action: any) => {
      state.errors = action?.payload
    },
    setUser: (state: any, action: any) => {
      state.data = { ...state.data, ...action?.payload }
    },
    logout: (_state: any) => {
      // googleLogout()
      // localStorage.removeItem(/(persist):([a-zA-Z0-9])\w*/g)
      const guardedItems: string[] = ['ally-supports-cache']
      if (localStorage) {
        Object.keys(localStorage)
          ?.filter((x: any) => !guardedItems?.includes(x))
          ?.forEach((item: any) => {
            localStorage.removeItem(item)
          })
      }
      Cookies.remove(`token`)
    },
  },
})

// Persist Reducer
export const persistedAuthReducer = () =>
  persistReducer(
    {
      key: persistKey,
      version: 1,
      whitelist: ['errors', 'data'],
      storage: storageLocal,
    },
    authReducer.reducer
  )
