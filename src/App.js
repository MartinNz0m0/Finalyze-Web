import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Upload from "./components/Upload";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import SearchView from "./components/SearchView";
import { useState, useEffect } from 'react';
import notFound from "./components/notFound";
import Newtry from "./components/Newtry";
import AboutView from "./components/AboutView";
import Statement from "./components/Statement";
import './App.css';
import Howto from "./components/Howto";


// API key for movie db: 04fb22bad75f8ceb8a3fff0df956f9d6
// Movie searches look like: https://api.themoviedb.org/3/search/movie?api_key=04fb22bad75f8ceb8a3fff0df956f9d6&language=en-US&query=fast%207&page=1&include_adult=false



function App() {

  // const [searchResults, setSearchResults] = useState([])
  // const [searchText, setSearchText] = useState('')
  // const [resultsFound, setresultsFound] = useState('false')


  // useEffect (() => {
  //   if (searchText) {
  //     fetch(`https://api.themoviedb.org/3/search/movie?api_key=04fb22bad75f8ceb8a3fff0df956f9d6&language=en-US&query=${searchText}&page=1&include_adult=false
  //     `)
  //       .then (response => response.json() )
  //       .then (data => {
  //         console.log(data)
  //         setSearchResults(data.results)
  //         console.log(data.total_results)
  //         if (data.total_results === 0) {
  //           setresultsFound(true)
  //         }
  //       })
  //   }
  // }, [searchText])

  return (
    <div className="App">
      {/* <NavBar searchText={searchText} setSearchText={setSearchText}/> */}
      <Hero/>
      <Switch> 
        <Route path="/" exact>
          <Upload />
        </Route>
        <Route path="/privacy" component={AboutView} />
        {/* 
        <Route path='/search'>
          <SearchView keyword={searchText} resultsFound={resultsFound} searchResults={searchResults}/>
        </Route>
       */}
        <Route path='/howto' component={Howto}/> 
        <Route path='/Statement' component={Statement} />
        {/* <Route path='/Upload' component={Upload} /> */}
        <Route path='*' component={notFound}></Route>
      </Switch>
    </div>
  );
}

export default App;
