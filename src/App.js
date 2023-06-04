import Upload from "./components/Upload/Upload";
import Hero, { Footer } from "./components/Hero";
import { Route } from "react-router-dom";
import notFound from "./components/notFound";
import Statement from "./components/Statement";
import './App.css';
import { Switch } from "react-router-dom";
import UserDashboard from "./pages/Dashboard/UserDashboard";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AboutView from "./components/AboutView/AboutView";
import Howto from "./components/Howto/Howto";
// import Howto from "./components/Howto";
// import Login from "./components/Login";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./components/UserContext";
// import Register from "./components/Register";
// import UserDashboard from "./components/UserDashboard";
import SearchPage from "./components/SearchPage";
import UserModel from "./components/UserModel";
import jwt_decode from 'jwt-decode';
import Managecat from "./components/Managecat";
import BudgetBuilder from "./components/BudgetBuilder";
import Home from "./pages/Home/Home";



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
        <Route path='/demo' component={Login} />
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
