import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axiosConfig/axios";
import { RootState } from "../store";
import { UserInfo } from "../../utils/User";

export const fetchLogin = createAsyncThunk(
  "fetchLoginUser",
  async (params: { email: string; password: string }) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);
export const fetchAuth = createAsyncThunk("fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});
export const fetchRegistr = createAsyncThunk(
  "fetchRegistrUser",
  async (params: {
    email: string;
    password: string;
    fullName: string;
    imgUrl?: string;
  }) => {
    const { data } = await axios.post("/auth/registration", params);
    return {
      ...data,
      userParams: {
        name: params.fullName,
        password: params.password,
        email: params.email,
        avatar: params.imgUrl,
      },
    };
  }
);
enum fetchRequest {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface IinitialState {
  data: null;
  status: fetchRequest;
  emailProps: string;
  userObject: {
    name: string;
    password: string;
    email: string;
    avatar?: string;
  };
}
const initialState: IinitialState = {
  data: null,
  status: fetchRequest.LOADING,
  emailProps: "",
  userObject: UserInfo(),
};
const authSlice = createSlice({
  name: "fetchAutorization",
  initialState,
  reducers: {
    setLogout(state) {
      state.data = null;
    },
    setEmail(state, action) {
      state.emailProps = action.payload;
    },
    setImageUser(state, action) {
      state.userObject.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = fetchRequest.SUCCESS;
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.status = fetchRequest.ERROR;
      state.data = null;
    });
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = fetchRequest.LOADING;
      state.data = null;
    });
    builder.addCase(fetchRegistr.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = fetchRequest.SUCCESS;
      state.userObject = action.payload.userParams;
    });
    builder.addCase(fetchRegistr.rejected, (state) => {
      state.status = fetchRequest.ERROR;
      state.data = null;
    });
    builder.addCase(fetchRegistr.pending, (state) => {
      state.status = fetchRequest.LOADING;
      state.data = null;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = fetchRequest.SUCCESS;
    });
    builder.addCase(fetchAuth.rejected, (state) => {
      state.status = fetchRequest.ERROR;
      state.data = null;
    });
    builder.addCase(fetchAuth.pending, (state) => {
      state.status = fetchRequest.LOADING;
      state.data = null;
    });
  },
});
export const { setLogout, setEmail, setImageUser } = authSlice.actions;
export const fetchData = (state: RootState) => Boolean(state.auth.data);

export const fetchAccParams = (state: RootState) => state.auth.userObject;
export const fetchEmail = (state: RootState) => state.auth.emailProps;
export const statusData = (state: RootState) => state.auth.status;

export default authSlice.reducer;
