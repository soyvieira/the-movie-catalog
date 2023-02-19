import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';
import './movie.css';
import { toast } from 'react-toastify';

function Movie(){
  const {id} = useParams();
  const navigation = useNavigate();
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
        navigation('/', {replace: true});
        return
      })
    }

    loadMovies();

}, [id, navigation])

  function saveMovie(){
    const myBookmarks = localStorage.getItem("@moviecatalog");
    
    let savedMovies = JSON.parse(myBookmarks) || [];

    const hasMovie = savedMovies.some( (savedMovies) => savedMovies.id === movies.id)

    if(hasMovie){
      toast.warn('This movie is already on bookmarks.');
      return;
    }

    savedMovies.push(movies);
    localStorage.setItem(("@moviecatalog"), JSON.stringify(savedMovies));
    toast.success('Movie saved!');

  }

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
        <button onClick={saveMovie}>Save</button>
        <button>
          <a href={`https://www.youtube.com/results?search_query=${movies.title} trailer`} target="_blank" rel="noreferrer"> {/** Youtube search about the movie */}
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Movie;