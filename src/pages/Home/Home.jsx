import React, { useState } from "react";
import IMG from "../../images/homeimg.png";
import { useHistory } from "react-router-dom";
import sttimg from "../../images/statements.png";
import report from '../../images/reports.png'
import './Home.scss'
import { NavLink } from "react-router-dom";
import { MdDashboard, MdLogin, MdPrivateConnectivity, MdUpload } from "react-icons/md";
import { GiEntryDoor, GiMoneyStack } from "react-icons/gi";
import { FaFile, FaLockOpen, FaMobile, FaMoneyBill, FaTag } from "react-icons/fa";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  const history = useHistory();
  const [mobilemode, setmobilemode] = useState(false);
  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setmobilemode(true);
    } else {
      setmobilemode(false);
    }
  }, []);
  return (
    <div className="Home">
      <Navbar />
      {/* <Navbar bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand href="/">Finalyze</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => history.push("/demo")}>Demo</Nav.Link>
            <Nav.Link onClick={() => history.push("/upload")}>
              Upload
            </Nav.Link>
            <Nav.Link onClick={() => history.push("/login")}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar> */}
      <div className="home-banner">
        <div className="image-holder">
          <img
            src={IMG}
            alt="home"
          />
        </div>
        <div className="banner-info">
          <h1 className="fw-bold">Finalyze</h1>
          <h4 className="text-warning fw-light text-opacity-75">
            An open source project that helps you track your personal finances.
          </h4>
          <div className="banner-items">
            <span><FaLockOpen /> Open-source</span>
            <span><FaMobile /> Mobile Solution</span>
            <span><MdPrivateConnectivity /> Private</span>
            <span><GiMoneyStack /> Financial Planner</span>
          </div>
        </div>
      </div>
      <div className="service-utility">
        <div className="utility-card">
          <FaFile id="utility-icon" />
          <h4>Statement Manager</h4>
          <p>
            Upload and manage your M-Pesa and bank statements in one
            centralized platform. Gain a comprehensive overview of your
            financial transactions and track expenses.
          </p>
        </div>
        <div className="utility-card">
          <FaMoneyBill id="utility-icon" />
          <h4>Budget Builder</h4>
          <p>
            Seamlessly integrate with your category model to effortlessly
            create personalized budgets and stay in control of your spending
            across multiple accounts.
          </p>
        </div>
        <div className="utility-card">
          <FaTag id="utility-icon" />
          <h4>Category Manager</h4>
          <p>
            Transform the details in your statements into a comprehensive
            category model, empowering you to optimize your finances and make
            informed decisions with ease.
          </p>
        </div>
      </div>
      <div className="overview">
        <div className="reports">
          <div className="report-image">
            <img src={report} />
          </div>
          <div className="report-card">
            <h4>Comprehensive Reports</h4>
            <p>
              Unlock Insights and Take Control with our Monthly Spending
              Reports. Track your expenses on a monthly basis with
              detailed reports categorizing your spending. Gain valuable
              insights, identify trends, and make informed decisions to
              achieve your financial goals.
            </p>
          </div>
        </div>
        <div className="statements">
          <div className="statement-card">
            <h4>Statement Support</h4>
            <p>
              Effortlessly Manage Your Financial Statements with our App!
              Keep track of your M-Pesa, Cooperative Bank, and Equity Bank
              statements hassle-free. Gain valuable insights into your
              financial activities and stay organized in one convenient
              location. Exciting news! We're actively working on expanding
              our bank support to offer you even more options soon.
            </p>
          </div>
          <div className="statement-image">
            <img src={sttimg} width={mobilemode ? 380 : 600} height={mobilemode ? 400 : 500} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
