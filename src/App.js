import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import Upload from "./components/Upload";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import notFound from "./components/notFound";
import AboutView from "./components/AboutView";
import Statement from "./components/Statement";
import './App.css';
import Howto from "./components/Howto";


function App() {


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
