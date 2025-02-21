import React, { useState, useEffect } from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=f862c73b';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const searchMovies = async (title) => {
        setIsLoading(true);
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setIsLoading(false);

        if (data.Search) {
            setMovies(data.Search);
        } else {
            setMovies([]);
        }
    }

    const searchRandomMovies = () => {
        const randomSearchTerms = ["Batman", "Avengers", "Star Wars", "Harry Potter", "Matrix"];
        const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
        searchMovies(randomTerm);
    };

    useEffect(() => { // this on load
        searchRandomMovies();
    }, []);

    useEffect(() => { // this when typing in search bar
        if (searchTerm) {
            const delayDebounceFn = setTimeout(() => {
                searchMovies(searchTerm);
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        } else {
            searchRandomMovies();
        }
    }, [searchTerm]);

    return(
       <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input placeholder="Search for movies" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)}></img>
            </div>
            {isLoading
                ? (
                    <div className="loading">
                        <h3>Loading...</h3>
                    </div>
                ) : (
                    movies.length > 0
                        ? (
                            <div className="container">
                                {movies.map((movie) => (
                                    <MovieCard key={movie.imdbID} movie={movie}/>
                                ))}
                            </div>
                        ) : (
                            <div className="empty">
                                <h3>No movies found</h3>
                            </div>
                        )
                )
            }
       </div>
    );
}

export default App;
