import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Details from './pages/details/Details';
import SearchResult from './pages/SearchResult';
import Explore from './pages/Explore';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Favorites from './pages/Favorites';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, [])

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      // console.log(res);
      const url = {
        image_path :"https://image.tmdb.org/t/p/" + "original",
      }
      dispatch(getApiConfiguration(url));
    });
  }

  const genresCall = async() => {
      let genreData = [];
      let allGenres = {};
      genreData.push(fetchDataFromApi(`/genre/movie/list`));
      genreData.push(fetchDataFromApi(`/genre/tv/list`));
      const data = await Promise.all(genreData);
      // console.log(data);
      data.map(({ genres }) => {
          return genres.map((item) => (allGenres[item.id] = item));
      });
      dispatch(getGenres(allGenres));
    }

  return(
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/:mediaType/:id' element={<Details />}/>
        <Route path='/search/:query' element={<SearchResult />}/>
        <Route path='/explore/:mediaType' element={<Explore />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/favorites' element={<Favorites />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App
