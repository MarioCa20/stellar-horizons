import { configureStore } from '@reduxjs/toolkit';
import { loadAuthStateFromLocalStorage, saveAuthStateLocalStorage } from '../utils/localStorage';
import authSlice from './states/authSlice';

// Cargar el estado de auth desde localStorage (si existe)
const preloadedAuthState = loadAuthStateFromLocalStorage();

export const store = configureStore({
    reducer: {
        auth: authSlice,
    },
    preloadedState: {
        auth: preloadedAuthState, // solo cargamos auth persistido
    },
});

// Persistir cambios en el estado de auth en localStorage
store.subscribe(() => {
    const { auth } = store.getState();
    if (auth.isAuthenticated) {
        saveAuthStateLocalStorage(auth);
    }
});

// Tipos del store para usar en hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
