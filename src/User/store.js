import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Configuration for redux-persist using sessionStorage
const persistConfig = {
  key: 'root',
  storage, // Use sessionStorage
};

// Wrap the reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, authReducer);

// Create store with persisted reducer
const store = createStore(persistedReducer);

// Create a persistor object
export const persistor = persistStore(store);
export default store;

export const login = (user) => ({
  type: 'LOGIN',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT',
});
