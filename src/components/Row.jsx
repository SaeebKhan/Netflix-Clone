import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularTv, popularTvSelector } from '../features/tv/tvSlice';
import Card from './Card';
import axios from '../helper/axios';
import { requests } from '../helper/request';
function Row(props) {
const {title,action,selector,platform}=props;
const collection=useSelector(selector);
const collectionResult=collection?.data?.results;
const dispatch=useDispatch();
const {genre}=props
const [videosByGenre,setVideosByGenre]=useState(null);

const fetchVideosByGenre=async(type,id)=>{
  const response=await axios.get(requests.getVideosByGenre(type,id));
  setVideosByGenre(response.data.results);
}


useEffect(()=>{
  if(action){
    dispatch(action());
  }
},[action])

useEffect(()=>{
   if(platform,genre){
    fetchVideosByGenre(platform,genre.id)
   }
},[genre,platform])


    return (
      <div className='py-3'>
        <h3 className='text-white'>{title}</h3>
        <Swiper
      spaceBetween={20}
      slidesPerView={5}
      modules={[Navigation]}
      navigation
    >
      {
        genre ?
    videosByGenre?.map((item)=>{
  return (
    <SwiperSlide  key={item.id}>
    <Card video={item} platform={platform}/>
     </SwiperSlide>
  )
       })
        :
        collectionResult?.map((item)=>{
          return (
            <SwiperSlide  key={item.id}>
            <Card video={item} platform={platform}/>
             </SwiperSlide>
          )
        })
      }
    </Swiper>
    </div>
    );
}

export default Row;