import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewClient,
  getClients,
  deleteClient,
  addNewClientFromCalendar,
  updateClient,
  getClient,
  getPurchasedProducts,
} from "../requests/clients";

const initialClientsState = {
  clients: [],
  client: {},
  purchasedProducts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const purchasedProductsUpdate = createAsyncThunk(
  "clients/updateClient",
  async (client, thunkAPI) => {
    try {
      return await updateClient(client);
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

export const clientAdditionFromCalendar = createAsyncThunk(
  "clients/newClientFromCalendar",
  async (client, thunkAPI) => {
    try {
      return await addNewClientFromCalendar(client);
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

export const clientAddition = createAsyncThunk(
  "clients/newClient",
  async (client, thunkAPI) => {
    try {
      return await addNewClient(client);
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

export const getAllClients = createAsyncThunk(
  "clients/getClients",
  async (thunkAPI) => {
    try {
      return await getClients();
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

export const deleteOneClient = createAsyncThunk(
  "clients/deleteClient",
  async (clientId, thunkAPI) => {
    try {
      return await deleteClient(clientId);
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

export const getAllPurchasedProducts = createAsyncThunk(
  "clients/getPurchasedProducts",
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

export const getClientById = createAsyncThunk(
  "clients/getClientById",
  async (clientId, thunkAPI) => {
    try {
      return await getClient(clientId);
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

const clientSlice = createSlice({
  name: "clients",
  initialState: initialClientsState,
  reducers: {
    reset: (state) => initialClientsState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(clientAdditionFromCalendar.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(clientAdditionFromCalendar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients.push(action.payload);
      })
      .addCase(clientAdditionFromCalendar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(clientAddition.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(clientAddition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients.push(action.payload);
      })
      .addCase(clientAddition.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllClients.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = action.payload;
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteOneClient.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOneClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload.id
        );
      })
      .addCase(deleteOneClient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(purchasedProductsUpdate.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(purchasedProductsUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clients.push(action.payload);
        state.client = action.payload;
      })
      .addCase(purchasedProductsUpdate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
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
      })
      .addCase(getClientById.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.client = action.payload;
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export default clientSlice.reducer;
export const { reset } = clientSlice.actions;
export const selectAllClients = (state) => state.clients.clients;
