import React from 'react';
import { Link } from 'react-router-dom';

function Genre(props) {
    const {genreItem}=props;

    return (
             
            <Link to="/browsebygenre" className='badge text-bg-warning text-decoration-none me-2'>
              {genreItem.name}
            </Link>
                  
    );
}

export default Genre;