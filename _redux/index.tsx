/* eslint-disable no-unsafe-optional-chaining */
import { configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import { authReducer, persistedAuthReducer } from './auth'
import { tokenReducer } from './token'

// Storage
// const allReducers = combineReducers({
//   auth: persistedAuthReducer,
//   cookies: persistedTokenReducer,
// })

// Store - Redux
export const store = configureStore({
  reducer: persistedAuthReducer(),
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: [thunk],
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// Store - Persist
export const persistor = persistStore(store)

// Dispatcher
export const {
  setErrors: dispatchErrors,
  setUser: updateUser,
  setPreference: updatePreference,
  logout: logoutApp,
} = authReducer?.actions
export const { setToken: updateToken } = tokenReducer?.actions

export const setErrors = (e: any) => store.dispatch(dispatchErrors(e))
export const setToken = (e: any) => store.dispatch(updateToken(e))
export const setUser = (e: any) => store.dispatch(updateUser(e))
export const setPreference = (e: any) => store.dispatch(updatePreference(e))
export const logout = () => store.dispatch(logoutApp())
