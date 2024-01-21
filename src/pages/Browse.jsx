import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchNetflixOriginals, netflixOriginalsSelector } from '../features/tv/tvSlice';
import Header from '../components/Header';
import axios from '../helper/axios'
import { requests } from '../helper/request';
import Row from '../components/Row';


function Browse(props) {
    const {platform}=useParams();
    const [genreList,setGenreList]=useState(null)

    const dispatch = useDispatch();
    const netflixOriginals = useSelector(netflixOriginalsSelector);
 //const {results}=netflixOriginals.data; ether destructure the property or assign it to variable like the following 

    const  nfresults  = netflixOriginals.data?.results;
     const randomIndex=Math.floor(Math.random()*nfresults?.length)


    useEffect(() => {
        dispatch(fetchNetflixOriginals())
    }, []);

//fetch genrelist
const fetchGenreList= async(type)=>{
    const response =await axios.get(requests.getGenreList(type));
    setGenreList(response.data.genres)
}

useEffect(()=>{
    if(platform){
        fetchGenreList(platform);
    }
},[platform])



    return (
        <div className='py-5'>
             {
            nfresults?
            <Header item={nfresults[randomIndex]} platform={platform}/>: "no data"
         }
         <div className='container-fluid'>
            {
                genreList?.map((genre,index)=>(
                     index < 6 ?
                    <Row key={genre.id} genre={genre} selector={()=>{}} platform={platform}/> : ""
                ))
            }
            </div>
        </div>
    );
}
export default Browse;