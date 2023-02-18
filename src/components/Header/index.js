import './style.css';
import { Link }  from 'react-router-dom';

function Header(){
  return(
    <header>
      <Link className='logo' to='/'>Movie Catalog</Link>
      <Link className='bookmarks' to='/bookmarks'>Bookmarks</Link>
    </header>
  )
}

export default Header;