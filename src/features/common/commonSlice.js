import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../../helper/axios';
import { requests } from "../../helper/request";


const initialState={
    headerVideo:{
   status:"idle",
   data:null,
   error:null
    },
    videoDetails:{
      status:"idle",
      data:null,
      error:null
       },
       
       platformType:""
   
}




export const fetchHeaderVideo= createAsyncThunk(
    'common/fetchHeaderVideo',
    async(details)=>{
        const response=await axios(requests.getVideoById(details))
        return response.data;
    }
)

export const fetchVideoDetails= createAsyncThunk(
  'common/fetchVideoDetails',
  async(details)=>{
      const response=await axios(requests.getVideoById(details))
      return response.data;
  }
)


const commonSlice= createSlice({
    name:"common",
    initialState,
    reducers:{
      platformAction:(state,action)=>{
   state.platformType=action.payload;

      }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchHeaderVideo.pending,(state,action)=>{
            state.headerVideo.status="Loading"
          })
          .addCase(fetchHeaderVideo.fulfilled,(state,action)=>{
            state.headerVideo.status="success";
            state.headerVideo.data=action.payload;
          })
          .addCase(fetchHeaderVideo.rejected,(state,action)=>{
            state.headerVideo.status="failed";
            state.headerVideo.error=action.error;
          })
          .addCase(fetchVideoDetails.pending,(state,action)=>{
            state.videoDetails.status="Loading"
          })
          .addCase(fetchVideoDetails.fulfilled,(state,action)=>{
            state.videoDetails.status="success";
            state.videoDetails.data=action.payload;
          })
          .addCase(fetchVideoDetails.rejected,(state,action)=>{
            state.videoDetails.status="failed";
            state.videoDetails.error=action.error;
          })
    }
})

export const {platformAction}=commonSlice.actions;
export const headerVideoSelector= (state)=>state.common.headerVideo;
export const videoDetailsSelector= (state)=>state.common.videoDetails;
export const platformSelector=(state)=>state.common.platformType;
export default commonSlice.reducer;