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
import Login from "./components/Login";
import { useContext, useState } from "react";
import { createContext } from "react";
import { UserContext } from "./components/UserContext";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";



function App() {

  const [user, setUser] = useState(null)

  return (
    <div className="App">
      {/* <NavBar searchText={searchText} setSearchText={setSearchText}/> */}
      <Hero/>
       <UserContext.Provider value={{ user, setUser}}>
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
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={UserDashboard} />

        <Route path='*' component={notFound}></Route>
      </Switch>
        </UserContext.Provider>
    </div>
  );
}

export default App;
