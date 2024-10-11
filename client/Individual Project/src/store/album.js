import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const albumSlice = createSlice({
  name: "album",
  initialState: {
    albums: [],
    isLoading: false,
    errors: null,
  },
  reducers: {
    fetchAlbumSuccess: (state, action) => {
      state.albums = action.payload;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    isError: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export const { fetchAlbumSuccess, isLoading, isError } = albumSlice.actions;

export default albumSlice.reducer;

export const fetchAlbum = () => {
  return async (dispatch) => {
    try {
      dispatch(isLoading(true));
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    //   console.log(data);
    dispatch(fetchAlbumSuccess(data))

    } catch (error) {
      console.log(error);
      dispatch(isError(error));
    } finally {
      dispatch(isLoading(false));
    }
  };
};
