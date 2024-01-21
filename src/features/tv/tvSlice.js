// initial state 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../helper/axios';
import { endpoints, platform, requests } from "../../helper/request";

const initialState = {
     netflixOriginals:{
         status:"idle",
         data:null,
         error:null
     },

     popularTv:{
      status:"idle",
      data:null,
      error:null
     }

}

export const fetchNetflixOriginals = createAsyncThunk(
    'tv/fetchNetflixOriginals',
    async (amount) => {
      const response = await axios.get(requests.getNetflixOriginals);
      return response.data;
    }
    );
    


  export const fetchPopularTv = createAsyncThunk(
    'tv/fetchPopularTv',
    async (amount) => {
      const response = await axios.get(requests.getCollection(platform.tv,endpoints.popular));
      return response.data;
    }
  );



export const tvSlice = createSlice({
    name:"tv",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(fetchNetflixOriginals.pending,(state,action)=>{
        state.netflixOriginals.status="Loading"
      })
      .addCase(fetchNetflixOriginals.fulfilled,(state,action)=>{
          state.netflixOriginals.status="success";
          state.netflixOriginals.data=action.payload;
        })
        .addCase(fetchNetflixOriginals.rejected,(state,action)=>{
          state.netflixOriginals.status="failed";
          state.netflixOriginals.error=action.error;
        })
        .addCase(fetchPopularTv.pending,(state)=>{
          state.popularTv.status="loading";
        })
        .addCase(fetchPopularTv.fulfilled,(state,action)=>{
          state.popularTv.status="success";
          state.popularTv.data=action.payload;
        })
        .addCase(fetchPopularTv.rejected,(state,action)=>{
          state.popularTv.status="failed";
          state.popularTv.error=action.error;
        })
    }
    
})

export const netflixOriginalsSelector = (state)=>state.tv.netflixOriginals;

export const popularTvSelector=(state)=>state.tv.popularTv;



export default tvSlice.reducer;