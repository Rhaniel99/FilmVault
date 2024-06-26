import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import api from '../../services/api';
import "./style.css";

function Home(){
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function loadFilmes (){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "21e05b16cc4230db64212138922c0de0",
                    language: "pt-BR",
                    page: 1,
                }
            });
            setMovies(response.data.results.slice(0, 10));
            setLoading(false);
        }
        loadFilmes();
    }, []);

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        );
    }

    return(
        <div className="container">
            <div className="list-movies">
                {movies.map((movie) => {
                    return(
                        <article key={movie.id}>
                            <strong>{movie.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title}></img>
                            <Link to={`/movie/${movie.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;