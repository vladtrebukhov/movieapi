import React from 'react';
import '../styling/movie_component.css';

export default function Movie(props) {
    const {id, title, release_date, popularity, vote_average, overview, poster_path} = props.movieData;
    const posterSrc = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`;

    return (
        <tr>
            <td>{id}</td>
            <td>
                {poster_path ?  <img id="poster" src={posterSrc} alt="Movie poster"/> : "No image found"}
            </td>
            <td>{title}</td>
            <td>{release_date}</td>
            <td>{popularity}</td>
            <td>{vote_average}</td>
            <td id="overview">{overview}</td>
        </tr>
    )
}