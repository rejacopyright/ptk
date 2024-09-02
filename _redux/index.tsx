/* eslint-disable no-unsafe-optional-chaining */
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

import { authReducer, persistedAuthReducer } from './auth'
import { tokenReducer } from './token'
import { persistedWalletReducer, walletReducer } from './wallet'

// Reducers
const allReducers = combineReducers({
  user: persistedAuthReducer(),
  wallet: persistedWalletReducer(),
})

// Store - Redux
export const store = configureStore({
  reducer: allReducers,
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
  logout: logoutApp,
} = authReducer?.actions
export const { setToken: updateToken } = tokenReducer?.actions
export const { setWalletDetail: updateWalletDetail } = walletReducer?.actions

// USER & AUTH DISPATCHER
export const setErrors = (e: any) => store.dispatch(dispatchErrors(e))
export const setToken = (e: any) => store.dispatch(updateToken(e))
export const setUser = (e: any) => store.dispatch(updateUser(e))
export const logout = () => store.dispatch(logoutApp())

// WALLET DISPATCHER
export const setWalletDetail = (e: any) => store.dispatch(updateWalletDetail(e))
