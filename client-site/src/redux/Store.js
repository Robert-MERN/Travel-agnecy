import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'travel-user',
    version: 3,
    storage,
  }
const rootReducer = combineReducers({
  user: userReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer)
  

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    
});

export let persistor = persistStore(store)
