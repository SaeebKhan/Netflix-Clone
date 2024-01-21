import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeaderVideo, headerVideoSelector } from '../features/common/commonSlice';
import Ratings from './Ratings';
import Genre from './Genre';
import { getYear, truncateText } from '../helper';
import VideoPlayer from './VideoPlayer';


function Header(props) {
    const { item,platform } = props;
    const [showTrailer,setShowTrailer]=useState(false);
    console.log(item);
   const dispatch=useDispatch();
   const details = useSelector(headerVideoSelector);
   const video=details.data

   useEffect(()=>{
        if(item){
         dispatch(fetchHeaderVideo({platform:platform,id:item.id}))
        }
    },[item])


const viewTrailer =()=>{
    setShowTrailer(true);
}


    return (
          <div className="position-relative vh-100">
            {
                showTrailer ? <VideoPlayer videoList={video?.videos.results}/> :
            <>
        <img  className="header-img" src={`https://image.tmdb.org/t/p/original${video?.backdrop_path}`} alt='' />
        <div className='caption'>
            <h1 className='title display-2'>{truncateText(video?.name || video?.title || video?.origina_title || video?.original_name,40)}</h1>
            <p className='tagline display-5 text-warning'>{video?.tagline}</p>
            <p>{truncateText(video?.overview,180)}</p>
            <p>{getYear(video?.first_air_date)}</p>
            <div className="d-flex align-items-center">
             {
                video?.genres.map((genre)=>{
                 return<Genre key={genre.id} genreItem = {genre}/>
                })
             }
            </div>
            <Ratings voteCount={video?.vote_count} voteAverage={video?.vote_average}/>
            <div className="d-flex align-items-center">
                <button className='btn btn-danger me-2' onClick={viewTrailer}>Play</button>
                <button className='btn btn-success'>More Info</button>
            </div>
            </div> 
            <div className='header-vignette'></div>
            </>
            }
            <div className='header-bottom-vignette'></div>
        </div>
    );
}

export default Header;