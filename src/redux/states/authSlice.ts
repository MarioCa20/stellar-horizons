import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, login, type CreatedUserResponse, type UserCredentials } from "../../utils/api";
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

export const loginUser = createAsyncThunk<
    { access: string; refresh: string }, // tipo de respuesta
    { email: string; password: string }, // payload que recibe
    { rejectValue: string } // tipo de error
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
    try {
        const data = await login(email, password);
        return data; // { access, refresh }
    } catch {
        return thunkAPI.rejectWithValue("Verifique sus credenciales.");
    }
});

export const registerUser = createAsyncThunk<
  CreatedUserResponse,
  UserCredentials,
  { rejectValue: string }
>("auth/registerUser", async (credentials, thunkAPI) => {
  try {
    const user = await createUser(credentials);
    return user;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
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

        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.loading = false;
                // no se actualizan tokens aquí directamente
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error al registrarse";
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
