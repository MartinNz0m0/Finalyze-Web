import NavBar from "./components/NavBar";
import Hero, { Footer } from "./components/Hero";
import Upload from "./components/Upload";
import { Route } from "react-router-dom";
import { Switch } from "react-router";
import notFound from "./components/notFound";
import AboutView from "./components/AboutView";
import Statement from "./components/Statement";
import './App.css';
import Howto from "./components/Howto";
import Login from "./components/Login";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { UserContext } from "./components/UserContext";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import SearchPage from "./components/SearchPage";
import UserModel from "./components/UserModel";
import jwt_decode from 'jwt-decode';
import Managecat from "./components/Managecat";
import BudgetBuilder from "./components/BudgetBuilder";
import Home from "./components/Home";



function App() {

  const [user, setUser] = useState(null)
  // get jwt and set user
  useEffect(() => {
  const jwt = localStorage.getItem('jwt')
  if (jwt) {
    let name = jwt_decode(jwt).name
    setUser(name)
  }
  }, [user])

  return (
    <div className="App">
      {/* <NavBar searchText={searchText} setSearchText={setSearchText}/> */}
      <Hero/>
       <UserContext.Provider value={{ user, setUser}}>
      <Switch> 
        <div className="body-content">

        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/upload" component={Upload} />
        <Route path="/privacy" component={AboutView} />
        <Route path='/howto' component={Howto}/> 
        <Route path='/Statement' component={Statement} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={UserDashboard} />
        <Route path='/search' component={SearchPage} />
        <Route path='/usermodel' component={UserModel} />
        <Route path='/managecat' component={Managecat} />
        <Route path='/budgetbuild' component={BudgetBuilder} />
        </div>
        <Route path='*' component={notFound}></Route>
      </Switch>
        </UserContext.Provider>
        <Footer />
    </div>
  );
}

export default App;
