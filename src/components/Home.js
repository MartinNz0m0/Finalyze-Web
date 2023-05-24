import React from "react";
import IMG from "../images/homeimg.png";
import { useHistory } from "react-router-dom";
import { Card, Container, Nav, Navbar } from "react-bootstrap";
import sttimg from "../images/statementssupport.png";
import report from "../images/reports.png";

const Home = () => {
  const history = useHistory();
  return (
    <div>
      <div className="bg-dark p-1 d-flex flex-row align-items-center">
        <Navbar bg="dark" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="/">Finalyze</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#Demo">Demo</Nav.Link>
              <Nav.Link onClick={() => history.push("/upload")}>
                Upload
              </Nav.Link>
              <Nav.Link onClick={() => history.push("/login")}>Login</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      <div className="bg-info bg-opacity-25 d-flex justify-content-between align-items-center">
        <img
          className="home-img"
          src={IMG}
          alt="home"
          style={{ width: 450, height: 450 }}
        />
        <div className="position-absolute start-50 translate-middle-y ">
          <h1 className="fw-bold">Finalyze</h1>
          <h4 className="text-warning fw-light text-opacity-75">
            An open source project that helps you track your personal finances.
          </h4>
        </div>
      </div>
      <div className="bg-secondary bg-opacity-50 d-flex justify-content-center pb-5 pt-5">
        <Card className="bg-dark text-light m-4 text-center w-25 p-2">
          <Card.Body>
            <i
              class="bi bi-file-earmark-arrow-up"
              style={{ fontSize: "3rem" }}
            ></i>
            <Card.Title className="text-info fw-bold mb-3">
              Statement Manager
            </Card.Title>
            <Card.Text>
              Upload and manage your M-Pesa and bank statements in one
              centralized platform. Gain a comprehensive overview of your
              financial transactions and track expenses.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="bg-dark text-light m-4 text-center w-25 p-2">
          <Card.Body>
            <i class="bi bi-cash-stack" style={{ fontSize: "3rem" }}></i>
            <Card.Title className="text-info fw-bold mb-3">
              Budget Builder
            </Card.Title>
            <Card.Text>
              Seamlessly integrate with your category model to effortlessly
              create personalized budgets and stay in control of your spending
              across multiple accounts.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="bg-dark text-light m-4 text-center w-25 p-2">
          <Card.Body>
            <i class="bi bi-tags" style={{ fontSize: "3rem" }}></i>
            <Card.Title className="text-info fw-bold mb-3">
              Category Manager
            </Card.Title>
            <Card.Text>
              Transform the details in your statements into a comprehensive
              category model, empowering you to optimize your finances and make
              informed decisions with ease.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="bg-secondary bg-opacity-50 pt-5">
        <div>
        <div className="d-flex justify-content-between align-items-center p-3">
            <div className="w-100 mx-5">
              <img src={report} />
            </div>
            <div className="w-100 mx-5">
              <Card className="bg-secondary text-light text-center">
                <Card.Body>
                  <Card.Title className="text-info fw-bold mb-3">
                    Comnprehensive Reports
                  </Card.Title>
                  <Card.Text>
                    "Unlock Insights and Take Control with our Monthly Spending
                    Reports. Track your expenses on a monthly basis with
                    detailed reports categorizing your spending. Gain valuable
                    insights, identify trends, and make informed decisions to
                    achieve your financial goals.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center p-3">
            <div className="w-100 mx-5">
              <Card className="bg-secondary text-light text-center">
                <Card.Body>
                  <Card.Title className="text-info fw-bold mb-3">
                    Statement Support
                  </Card.Title>
                  <Card.Text>
                    Effortlessly Manage Your Financial Statements with our App!
                    Keep track of your M-Pesa, Cooperative Bank, and Equity Bank
                    statements hassle-free. Gain valuable insights into your
                    financial activities and stay organized in one convenient
                    location. Exciting news! We're actively working on expanding
                    our bank support to offer you even more options soon.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="w-100 mx-5">
              <img src={sttimg} width="600" height="500" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;
