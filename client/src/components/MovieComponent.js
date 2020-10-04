import React from 'react';
import '../styling/movie_component.css';

export default function Movie(props) {
    const {id, title, release_date, popularity, average_rating, overview, poster} = props;
    const posterSrc = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster}`;
    return (
        <tr>
            <td># {id}</td>
            <td>
                {poster ?  <img id="poster" src={posterSrc}/> : "No image found"}
            </td>
            <td>{title}</td>
            <td>{release_date}</td>
            <td>{popularity}</td>
            <td>{average_rating}</td>
            <td id="overview">{overview}</td>
        </tr>
    )
}