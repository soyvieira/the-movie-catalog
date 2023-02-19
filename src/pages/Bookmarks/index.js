import { useEffect, useState } from 'react';
import './bookmarks.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Bookmarks(){

  const[movies, setMovies] = useState([]);

  useEffect ( () => {
    const myBookmarks = localStorage.getItem("@moviecatalog");
    setMovies(JSON.parse(myBookmarks) || [])

  }, []);

  function deleteMovie(id){

    let filterDelete = movies.filter( (item) => {
      return(item.id !== id)
    })

    setMovies(filterDelete);
    //Refresh the localstage
    localStorage.setItem("@moviecatalog", JSON.stringify(filterDelete))
    toast.success('You deleted the movie')
    
  }

  return(
    <div className='my-bookmarks'>
      <h1>My bookmarks</h1>
      <span className='status'>
        {movies.length === 0 ? 'You do not have movies saved' : 'Welcome to the best movies!'}
      </span>
      <ul>
        {movies.map( (item)=> {
          return(
            <li key={item.id}>
              <span>{item.title}</span>
              <div>
              <button>
                <Link to={`/movie/${item.id}`}>See more</Link>
              </button>
                <button onClick={() => deleteMovie(item.id)}>Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Bookmarks;