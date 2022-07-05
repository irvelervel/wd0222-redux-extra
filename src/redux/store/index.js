import { configureStore, combineReducers } from '@reduxjs/toolkit' // core/main redux library
import cartReducer from '../reducers/cart'
import userReducer from '../reducers/user'
import bookReducer from '../reducers/book'
// @reduxjs/toolkit is the CORE redux library!
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'

import { encryptTransform } from 'redux-persist-transform-encrypt'

// now we split up the reducer into multiple files
// each little reducer is aware just of itself
// how can all of them re-create the big reducer once again?

// let's configure how redux-persist is going to work inside our app
const persistConfig = {
  key: 'root', // with this we're going to persist the whole store
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SUPER_SECRET_KEY,
    }),
  ],
}

const bigReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  book: bookReducer,
})
// with combineReducers I'm basically re-creating the structure I had in the beginning:
// const initialState = {
//   cart: {
//     content: [],
//   },
//   user: {
//     name: '',
//   },
// }

const persistedReducer = persistReducer(persistConfig, bigReducer)

// in this way we achieved a structure that not only is better organized than before,
// with proper case division, but can also grow and scale gracefully!

export const store = configureStore({
  // this configuration objects sets up the redux store
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false, // disabling the serializable action payload check
    }) // fixing the browser error
  },
})

export const persistor = persistStore(store)

// now the redux store is up and running! ...but just in memory!
// we have to attach our React App to it!
