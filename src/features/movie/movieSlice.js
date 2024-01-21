import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../../helper/axios';
import { endpoints,requests,platform } from "../../helper/request";

const initialState={
    movieOriginals:{
        status:"idle",
        data:null,
        error:null
    },

}

export const fetchMovieOriginals= createAsyncThunk(
    'movie/fetchMovieOriginals',
    async()=>{
        const response=await axios.get(requests.getCollection(platform.movie,endpoints.nowPlaying));
        return response.data;
    }
)



export const movieSlice= createSlice({
    name:"movie",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(fetchMovieOriginals.pending,(state,action)=>{
        state.movieOriginals.status="Loading"
      })
      .addCase(fetchMovieOriginals.fulfilled,(state,action)=>{
        state.movieOriginals.status="success";
        state.movieOriginals.data=action.payload;
      })
      .addCase(fetchMovieOriginals.rejected,(state,action)=>{
        state.movieOriginals.status="failed";
        state.movieOriginals.error=action.error;
      })
    }
})

export const movieOriginalsSelector=(state)=>state.movie.movieOriginals;

export default movieSlice.reducer;