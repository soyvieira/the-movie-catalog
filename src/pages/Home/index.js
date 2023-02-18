import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from "react-router-dom";
import './home.css';

function Home(){

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect( () => {

    async function loadMovies(){
      const response = await api.get('movie/now_playing', {
        params: {
          api_key: "", //Insert api key here. See documentation on https://www.themoviedb.org/ , config section.
          //language: 'pt-BR', uncomment it to show the content in Portuguese
          page: 1,
        }
      })
      setMovies(response.data.results.slice(0,10));
      setLoading(false);
    }
    loadMovies();
  }, [] )  

  if (loading){
    return(
      <div className="loading">
        <h2>Loading movies...</h2>
      </div>
    )
  }

  return(
    <div className="container">
      <div className="movie-list">
        {movies.map( (movies) => {
          return(
            <article key={movies.id}>
              <strong>{movies.title}</strong>
              <img src={`https://image.tmdb.org/t/p/original/${movies.poster_path}`} alt={movies.title}  /> 
              { /* https://image.tmdb.org/t/p/original/ is a static URL from API, for images */ }
              <Link to={`/movie/${movies.id}`}>See more</Link>
            </article>
          )
        }
        )}
      </div>
      
    </div>
  )
}

export default Home;