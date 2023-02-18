import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../services/api';
import './movie.css';

function Movie(){
  const {id} = useParams();
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect (()=> {
    async function loadMovies(){
      await api.get(`/movie/${id}`,{
        params:{
          api_key: "", //Insert api key here. See documentation on https://www.themoviedb.org/ , config section.
          //language: 'pt-BR', uncomment it to show the content in Portuguese
        }
      })
      .then((response)=>{
        setMovies(response.data);
        setLoading(false);
      })
      .catch( ()=>{
        console.log("Movie not found");
      })
    }

    loadMovies();

}, [])

  if (loading){
    return(
      <div className="movie-details-loading">
        <h2>Loading details...</h2>
      </div>
    )
  }

  return(
    <div className="movie-details">
      <h1>{movies.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`} alt={movies.title}  /> 

      <h2>Overview</h2>
      <span>{movies.overview}</span>
      <strong>Rate: {movies.vote_average} / 10</strong>

      <div className="area-buttons">
        <button>Save</button>
        <button>
          <a href="https://www.youtube.com/"> {/** Youtube link about the movie */}
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Movie;