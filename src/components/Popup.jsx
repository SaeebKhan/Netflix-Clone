import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { platformSelector, videoDetailsSelector } from '../features/common/commonSlice';
import { getYear } from '../helper';
import Ratings from './Ratings';
import { numToTime } from '../helper';
import Genre from './Genre';
import axios from '../helper/axios';
import { requests } from '../helper/request';
import Card from './Card';
import VideoPlayer from './VideoPlayer';



function Popup(props) {

  const { data } = useSelector(videoDetailsSelector);
  const platform = useSelector(platformSelector);

  const [recommended, setRecommended] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [showTrailer,setShowTrailer]=useState(false)
  
  
  const fetchRecommended = async(platform,id) => {
    const response = await axios.get(requests.getRecommendedVideos(platform,id));
   setRecommended(response.data.results);
  }

  const fetchSimilarVideo=async(platform,id)=>{
    const response=await axios.get(requests.getSimilarVideos(platform,id));
    setSimilar(response.data.results);
  }


  useEffect(()=>{
    if(data){
      fetchRecommended(platform,data.id);
      fetchSimilarVideo(platform,data.id);
    }
  },[data])





  return (
    <div className="modal" tabIndex="-1" id="videopopup">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">  
          <div className='position-relative'>
            {
              data?.videos.results.length > 0 ?
            <VideoPlayer videoList={data.videos.results} /> :
          <img className="img-fluid" src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt='' />
            }
          </div> 
            <h3 className='title display-2'>{data?.name || data?.title || data?.origina_title || data?.original_name}</h3>
            <div className="d-flex align-items-center py-2">
            {data?.release_date ? (
              <p className="pe-4 mb-0">{getYear(data?.release_date)}</p>
            ) : (
              <p className="pe-4 mb-0">{getYear(data?.first_air_date)}</p>
            )}
            {data?.runtime ? (
              <p className="me-4 mb-0">{data?.runtime ? numToTime(data?.runtime) : numToTime(data?.episode_run_time[0])}</p>
            ) : (
              <p className="me-4 mb-0">{numToTime(data?.episode_run_time)}</p>
            )}
            <div style={{ 'marginTop': '-5px' }}>
              <Ratings voteAverage={data?.vote_average} voteCount={data?.vote_count} />
            </div>
          </div>
          <p className="mt-3 mb-5">{data?.overview}</p>
        </div>
        <div>
          <span className="text-white">Genres: </span>
          {
            data?.genres.map((genre) => {
              return <Genre key={genre.id} genreItem={genre} />
            })
          }
        </div>
        <div className='row gy-2'>
          <h3 className='text-white'>Recommendation</h3>
        {
          recommended?.map((rec,index)=>{
            return(
              index <8 ?
              <div className="col-md-3">
                <Card video={rec} platform={platform}/>
              </div> :""
            )
          })
        }
        </div>
        <div className='row gy-2'>
          <h4 className='text-white'>Similar</h4>
          {
            similar?.map((rec,index)=>{
              return(
                index<8?
                <div className='col-md-3'>
                <Card video={rec} platform={platform}/>
                </div> : ""
              )
            })
          }
        </div>
          </div>
       
      </div>
    </div>
  );
}


export default Popup;