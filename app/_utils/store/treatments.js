import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewTreatment,
  getTreatments,
  deleteTreatment,
} from "../requests/treatments";

const initialTreatmentsState = {
  treatments: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const treatmentAddition = createAsyncThunk(
  "treatments/newTreatment",
  async (treatment, thunkAPI) => {
    try {
      return await addNewTreatment(treatment);
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

export const getAllTreatments = createAsyncThunk(
  "treatments/getTreatments",
  async (thunkAPI) => {
    try {
      return await getTreatments();
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

export const deleteOneTreatment = createAsyncThunk(
  "treatments/deleteTreatment",
  async (treatmentId, thunkAPI) => {
    try {
      return await deleteTreatment(treatmentId);
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

const treatmentsSlice = createSlice({
  name: "treatments",
  initialState: initialTreatmentsState,
  reducers: {
    reset: (state) => initialTreatmentsState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(treatmentAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(treatmentAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.treatments.push(action.payload);
      })
      .addCase(treatmentAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTreatments.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllTreatments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.treatments = action.payload;
      })
      .addCase(getAllTreatments.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteOneTreatment.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOneTreatment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.treatments = state.treatments.filter(
          (treatment) => treatment._id !== action.payload.id
        );
      })
      .addCase(deleteOneTreatment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default treatmentsSlice.reducer;
export const { reset } = treatmentsSlice.actions;
export const selectAllTreatments = (state) => state.treatments.treatments;
