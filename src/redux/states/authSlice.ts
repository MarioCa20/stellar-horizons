import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "../../utils/api";
import { clearAuthStateLocalStorage } from "../../utils/localStorage";

interface AuthState {
    access: string | null;
    refresh: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    access: null,
    refresh: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

// AsyncThunk para login con fetch
export const loginUser = createAsyncThunk<
    { access: string; refresh: string }, // tipo de respuesta
    { email: string; password: string }, // payload que recibe
    { rejectValue: string } // tipo de error
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
    try {
        const data = await login(email, password);
        return data; // { access, refresh }
    } catch {
        return thunkAPI.rejectWithValue("Error de red o del servidor");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.access = null;
            state.refresh = null;
            state.isAuthenticated = false;
            state.error = null;
            clearAuthStateLocalStorage();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error desconocido";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
