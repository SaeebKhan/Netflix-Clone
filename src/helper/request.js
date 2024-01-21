const API_KEY = "0c298bfa44cfe127023f8bda3c5aa949";

// https://google.com/india/abc?abc&efg&gdgj    protocol  domainName  path query

 export const requests={
     getNetflixOriginals: `discover/tv?api_key=${API_KEY}&with_networks=213`,
     getCollection:(platform,endpoint)=>`${platform}/${endpoint}?api_key=${API_KEY}&language=en-US&page=1`,
     getVideoById:(details)=>`${details.platform}/${details.id}?api_key=${API_KEY}&language=en-US&page=1&append_to_response=videos`,
     getSimilarVideos:(platform,id)=>`${platform}/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
     getRecommendedVideos:(platform,id)=>`${platform}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
     getGenreList:(platform)=>`genre/${platform}/list?api_key=${API_KEY}&language=en-US`,
     getVideosByGenre:(platform,genreId)=>`discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${genreId}`
    }


export const platform= {
    tv:"tv",
    movie:"movie"
}

export const endpoints={
   popular:"popular",
   upcoming:"upcoming",
   topRated:"top_rated",
   nowPlaying:"now_playing",
   airing:"airing_today",
   onTheAir:"on_the_air",
}