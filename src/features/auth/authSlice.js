import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

// Register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message = ""
        },
        // New reducer to set the user from localStorage
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
        });
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
    }
})

export const { reset, setUser } = authSlice.actions
export default authSlice.reducer
