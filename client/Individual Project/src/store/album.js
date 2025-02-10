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
    setLoading: (state, action) => {  // 🔥 Ganti nama dari isLoading ➝ setLoading
      state.isLoading = action.payload;
    },
    setError: (state, action) => { // 🔥 Ganti nama dari isError ➝ setError
      state.errors = action.payload;
    },
  },
});

export const { fetchAlbumSuccess, setLoading, setError } = albumSlice.actions;

export default albumSlice.reducer;

export const fetchAlbum = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true)); 
      let { data } = await axios({
        method: "get",
        url: "http://localhost:3000/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      dispatch(fetchAlbumSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(setError(error.message)); 
    } finally {
      dispatch(setLoading(false));
    }
  };
};
