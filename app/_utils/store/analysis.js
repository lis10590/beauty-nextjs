import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  revenueByMonth,
  productSales,
  treatmentsSales,
} from "../requests/analysis";

const initialAnalysisState = {
  purchasedProducts: [],
  treatmentHistory: [],
  monthSales: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllPurchasedProducts = createAsyncThunk(
  "analysis/getPurchasedProducts",
  async (thunkAPI) => {
    try {
      return await getPurchasedProducts();
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

export const getAllTreatmentHistory = createAsyncThunk(
  "analysis/getTreatmentHistory",
  async (thunkAPI) => {
    try {
      return await getTreatmentHistory();
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

export const getRevenueByMonth = createAsyncThunk(
  "analysis/revenueByMonth",
  async (thunkAPI) => {
    try {
      return await revenueByMonth();
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

export const getProductSales = createAsyncThunk(
  "analysis/productSales",
  async (thunkAPI) => {
    try {
      return await productSales();
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

export const getTreatmentsSales = createAsyncThunk(
  "analysis/treatmentsSales",
  async (thunkAPI) => {
    try {
      return await treatmentsSales();
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

const analysisSlice = createSlice({
  name: "analysis",
  initialState: initialAnalysisState,
  reducers: {
    reset: (state) => initialAnalysisState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getAllPurchasedProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPurchasedProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchasedProducts = action.payload;
      })
      .addCase(getAllPurchasedProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllTreatmentHistory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllTreatmentHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.treatmentHistory = action.payload;
      })
      .addCase(getAllTreatmentHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRevenueByMonth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getRevenueByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.monthSales = action.payload;
      })
      .addCase(getRevenueByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductSales.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getProductSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchasedProducts = action.payload;
      })
      .addCase(getProductSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTreatmentsSales.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTreatmentsSales.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.treatmentHistory = action.payload;
      })
      .addCase(getTreatmentsSales.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default analysisSlice.reducer;
