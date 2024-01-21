import { faStar } from '@fortawesome/free-regular-svg-icons';
import {faStar as solidStar} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

function Ratings(props) {
    const {voteCount,voteAverage}=props;
    const votes = Math.round(voteAverage/2);
    const totalStars=[...Array(5)];

    return (
        <div className='d-flex py-2 align-items-center'>
            <div className='d-flex'>
            {
                totalStars.map((star,index)=>{
                    return(
                        votes > index ? 
                        <FontAwesomeIcon key={index} icon={solidStar}/>  
                         :
                        <FontAwesomeIcon key={index} icon={faStar}/>
                    )
                })
            }
            </div>
            <p className='mb-0 ms-3'>{voteCount}</p>
        </div>
    );
}

export default Ratings; 