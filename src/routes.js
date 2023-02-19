import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Movie from './pages/Movie';
import Bookmarks from "./pages/Bookmarks";

import Error from "./pages/Error";

import Header from './components/Header';

function RoutesApp(){
  return(
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/movie/:id" element={ <Movie /> } />
      <Route path="/bookmarks" element={ <Bookmarks /> } />

      <Route path="*" element={ <Error /> } />
    </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;