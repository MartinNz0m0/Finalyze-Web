import React from "react";
import Logo from "../images/logo1.png";
import { useHistory } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

const Hero = ({ text }) => {
    return (
        <header className="bg-dark text-warning text-center">
            <div>⚠️ This app is still in beta testing ⚠️</div>
        </header>
    )
}

const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark" className="footer">
                <Navbar.Text className="d-flex text-light justify-content-start mx-2" style={{fontSize: '0.8rem'}}>
                    Made with ❤️ in Nairobi 🇰🇪 
                </Navbar.Text>
                <Navbar.Text className="d-flex text-info mx-2 position-absolute end-0 text-info" style={{fontSize: '0.8rem'}}>
                © Finalyze v1.6.0
                </Navbar.Text>
            {/* <div style={{fontSize: '0.8rem'}} className="d-flex flex-row align-items-center"> */}
                {/* </div> */}
        </Navbar>
    )
}


const AppTitle = () => {
    const history = useHistory()
  return (
    <div className="d-flex flex-row mx-4 align-items-center app-title" onClick={()=>history.push('/')}>
    <div className="d-flex flex-column">
      <h1 style={{ margin: 0,  marginRight: 5 }} className="text-info">Finalyze</h1>
            <p style={{ margin: 0, fontSize: "1.0rem"}}>To the moon🚀</p>
    </div>
        <div className="d-flex justify-content-start">
        <img
          src={Logo}
          alt="Logo"
          style={{ width: 80, height: 80}}
        />

        </div>
    </div>
    
  );
};


export default Hero;
export { Footer };
export { AppTitle };
