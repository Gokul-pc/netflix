import React, { useEffect, useState } from 'react'
import { Scrollbar} from 'swiper';
import { API_KEY, imageUrl } from '../../constants/constants'
import YouTube from 'react-youtube'
import "./row.css"
import axios from '../../axios'
import { Swiper, SwiperSlide } from 'swiper/react'

function Rowpost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState("")
    useEffect(() => {
        axios.get(props.url).then(response => {
            setMovies(response.data.results)
        })
    }, )
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };
    const handleMovie = (id) => {
        console.log(id);
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response => {
            console.log(response.data);
            if (response.data.results.length !== 0) {
                setUrlId(response.data.results[0])
                
            }
        })


    }

    return (
      
        <div className="row">
            <h2 className="poster-title">{props.title}</h2>
            <Swiper 
             modules={Scrollbar}
             spaceBetween={0}
             slidesPerView={0.1}
             freeMode={true} pagination={{
                el: ".swiper-pagination",
              clickable: true
            }}
            navigation= {{
                nextEl: ".swiper-button-next", // arrows on the side of the slides
                prevEl: ".swiper-button-prev", // arrows on the side of the slides
            }}
            
             onSlideChange={() => console.log('slide change')}
             onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
            <div className="poster">
                {movies.map((obj) =>

                    <img onClick={() => handleMovie(obj.id)} className={props.isSmall ? "small-poster" : 'normal-poster'} src={`${imageUrl + obj.poster_path}`} alt="poster" />

                )}

            </div>
            </SwiperSlide>
            </Swiper>
            {urlId && <YouTube videoId={urlId.key} opts={opts} />}
        </div>
    )
}

export default Rowpost