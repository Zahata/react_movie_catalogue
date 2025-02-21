import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie">
            <div>
                <p>{movie.Year}</p>
            </div>
            <div>
                <img src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'} alt={movie.Title}></img>
            </div>
            <div>
                <span>{movie.Type}</span>
                <h2>{movie.Title}</h2>
            </div>
        </div>
    )
}

// TODO: Maybe implement click on card to open a window with details about movie :)

export default MovieCard;