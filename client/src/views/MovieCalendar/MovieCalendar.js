import React, { useContext } from "react";
import { MovieStore } from 'data/MovieStore';
import { MovieContext } from 'data/MovieStore';
import styles from "./MovieCalendar.module.css";

const Template = () => {
  const [state, dispatch] = useContext(MovieContext);
  const trailers = state.trailers;

  const iframeParams = {
    frameBorder: 0,
    allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; csp",
    allowFullScreen: true
  }

  const date = state.date;

  return (
      <div>
        <header className={styles.header}>{date}</header>
        {trailers.map((movie, index) => (
          <div className={styles.trailer} key={index}>
            <div className={styles.title}>
             {movie.name} 
            </div>
            <iframe
              title={movie.name}
              width={movie.trailer.width}
              height={movie.trailer.height}
              src={movie.trailer.embedUrl}
              {...iframeParams}
            ></iframe>
          </div>
          ))}
        </div>
  );
}

const MovieCalendar = () => {
  return(
    <MovieStore>
      <Template />
    </MovieStore>
  );
}

export default MovieCalendar;
