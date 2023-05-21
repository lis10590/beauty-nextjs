import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRegister } from "../requests/auth";

// Get user from localStorage

// const user = JSON.parse(localStorage.getItem("user"));

// const getUserFromStorage = async () => {
//   const user = await storage.getItem("user");
//   return user ? user : null;
// };
// const user = storage.getItem("user");

const initialState = {
  user: null /*getUserFromStorage()*/,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await postRegister(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
// export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
//   try {
//     return await postLogin(user);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// export const logout = createAsyncThunk("auth/logout", async () => {
//   await logoutUser();
// });

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
    // .addCase(login.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(login.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.user = action.payload;
    // })
    // .addCase(login.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    //   state.user = null;
    // })
    // .addCase(logout.fulfilled, (state) => {
    //   state.user = null;
    // });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
export const selectAllAuth = (state) => state.auth;
