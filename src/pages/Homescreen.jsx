import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNetflixOriginals, fetchPopularTv, netflixOriginalsSelector, popularTvSelector } from '../features/tv/tvSlice';
import Header from '../components/Header';
import Row from '../components/Row';
import { platform } from '../helper/request';
import { fetchMovieOriginals, movieOriginalsSelector } from '../features/movie/movieSlice';

function Homescreen(props) {
    const dispatch = useDispatch();
   
    const netflixOriginals = useSelector(netflixOriginalsSelector);
 //const {results}=netflixOriginals.data; ether destructure the property or assign it to variable like the following 
    
    const  nfresults  = netflixOriginals.data?.results;
  
     const randomIndex=Math.floor(Math.random()*nfresults?.length)


    useEffect(() => {
        dispatch(fetchNetflixOriginals())
    }, [fetchNetflixOriginals]);


    return (
        <>
        {
            nfresults?
            <Header item={nfresults[randomIndex]} platform={platform.tv}/>: "no data"
         }

         <div className='container-fluid'>
<Row title="Popular Shows" action={fetchPopularTv} selector={popularTvSelector} platform={platform.tv}/>
<Row title="Netflix Originals" action={fetchNetflixOriginals} selector={netflixOriginalsSelector} platform={platform.tv}/>
<Row title="Now Playing" action={fetchMovieOriginals} selector={movieOriginalsSelector} platform={platform.movie}/>

         </div>
        </>
    );
}

export default Homescreen;