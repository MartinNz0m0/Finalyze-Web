import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "./UserContext";
import axios from "axios";
import Statement from "./Statement";
import SearchPage from "./SearchPage";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { DashboardLoadingSequence } from "./LoadingSequence";
import Table from "react-bootstrap/Table";
import { Bar, Line } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";
import { AppTitle } from "./Hero";
import HashLoader from "react-spinners/HashLoader";
import './css/Dashboard.css'

const UserDashboard = ({ jibu }) => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);
  const [sndata, setSndata] = useState([]);
  const [showdata, setshowdata] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showresults, setshowresults] = useState(false);
  const [updatedata, setupdatedata] = useState(false);
  const [quickanalresults, setquickanalresults] = useState({});
  const [showquickanal, setshowquickanal] = useState(false);
  const [stttype, setstttype] = useState("mpesa");

  const [title, settitle] = useState("");
  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: "loading...",
      statement: "loading...",
      date: "loading...",
      uploaded: "loading...",
      pdf_name: "loading...",
    },
  ]);
  const [loadstate, setloadstate] = useState(false);
  const [show, setShow] = useState(false);
  const [showuploadmodal, setshowuploadmodal] = useState(false);
  const handleClose = () => setShow(false);
  const [coopbankupload, setcoopbankupload] = useState(false);
  const [uploadedfile, setuploadedfile] = useState(null);
  const [currentupload, setcurrentupload] = useState("");
  const closeuploadmodal = () => {
    setshowuploadmodal(false);
    setcoopbankupload(false);
    setuploadedfile(null);
  };
  const handleShow = () => setShow(true);
  const [showalert, setshowalert] = useState(false);
  const [showdelmodal, setshowdelmodal] = useState(false);
  const [delid, setdelid] = useState(0);
  const [budgetlist, setbudgetlist] = useState([]);
  const [graphmode, setgraphmode] = useState(false);
  const [graphdata, setgraphdata] = useState([]);
  const [linedata, setlinedata] = useState([]);
  const [disabledbutton, setdisabledbutton] = useState(true);
  const [mobilemode, setmobilemode] = useState(false);
  const [showsidebar, setshowsidebar] = useState(false);
  const backend = process.env.REACT_APP_BACKEND;

  useEffect(() => {
    //make api call to get data
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // user has token, make api call
      axios
        .post(
          `${backend}/dash`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          if (response.status == 401) {
            history.push("/login");
          } else if (response.status == 200) {
          setCardData(response.data);
          }
          else {
            alert('something went wrong')
          }
        });

      // get latest statement data
      axios
        .post(
          "https://backend.finalyze.app/py/lateststatement",
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          if (response.data == 'nothing happened') {
            setloadstate(true);
            return;
          }
          setgraphdata(response.data[0]);
          setlinedata(response.data[1]);
          setloadstate(true);
        });
    } else {
      // user has no token, redirect to login
      history.push("/login");
    }

    // check if user exists if not verify token and check expiry
    if (!user) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        // user has token, make api call
        axios
          .post(
            `${backend}/verify`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          .then((response) => {
            // response will be user data if token is valid

            if (response.data) {
              // token is valid
              setUser(response.data);
            } else {
              // token is invalid
              history.push("/login");
            }
          });
      } else {
        // user has no token, redirect to login
        history.push("/login");
      }
    }
  }, [updatedata]);

  React.useEffect(() => {
    // check screen size
    if (window.innerWidth < 768) {
      setmobilemode(true);
    } else {
      // set desktop mode
    }
  }, []);

  const Analysismodal = (props) => {
    const keys = Object.keys(props.data);
    console.log(props.data, keys);
    const body = keys.map((key, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td key={index}>{key}</td>
          <td>
            {props.data[key]["amount"] > props.data[key]["budget"] ? (
              <p className="text-danger">KES {props.data[key]["amount"]}</p>
            ) : (
              <p className="text-success">KES {props.data[key]["amount"]}</p>
            )}
          </td>
          <td className="text-info">KES {props.data[key]["budget"]}</td>
        </tr>
      );
    });
    const bardatasaet = {
      labels: keys,
      datasets: [
        {
          label: "Amount Spent",
          data: keys.map((key) => props.data[key]["amount"]),
          backgroundColor: ["rgb(28, 231, 129)"],
          borderWidth: 1,
        },
        {
          label: "Budget",
          data: keys.map((key) => props.data[key]["budget"]),
          backgroundColor: ["rgb(231, 102, 28)"],
          borderWidth: 1,
        },
      ],
    };
    const baroptions = {
      barThickness: 20,
      barPercentage: 0.8,
      categoryPercentage: 0.8,
      maintainAspectRatio: true,
      plugins: {
        title: {
          display: true,
        },
        legend: {
          display: true,
        },
      },
    };
    return (
      <>
        <Modal show={show} onHide={handleClose} contentClassName="bg-dark ">
          <Modal.Header closeButton>
            <Modal.Title>{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Check if object is null */}
            {
                keys.length === 0 ? (
                    <p className="text-warning text-center">No data to display, visit the category model to add some categories first</p>
                ) : (
                    <>
                    
            {graphmode ? (
              <div className="h-100">
                <Bar
                  data={bardatasaet}
                  options={baroptions}
                  width={100}
                  height={100}
                ></Bar>
              </div>
            ) : (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Amount</th>
                    <th>Budget Amount</th>
                  </tr>
                </thead>
                <tbody>{body}</tbody>
              </Table>
            )}
            <Button
              onClick={() =>
                graphmode ? setgraphmode(false) : setgraphmode(true)
              }
              variant="info"
            >
              {graphmode ? "Table mode" : "Graph mode"}
            </Button>
                    </>
                )
            }
          </Modal.Body>
        </Modal>
      </>
    );
  };
  const Lateststatement = ({ data }) => {
    if (data == "no statement") {
      return (
        <div className="text-center">
          <h4 className="text-danger">Last month's statement not found</h4>
          <h6 className="text-warning">Did you upload it?</h6>
        </div>
      );
    } else {
      if (data[0]) {
        const keys = Object.keys(data[0]);
        const bardata = {
          labels: keys,
          datasets: [
            {
              label: "Amount Spent",
              data: keys.map((key) => data[0][key]["amount"]),
              backgroundColor: keys.map((key) => {
                const amountSpent = data[0][key]["amount"];
                const budget = data[0][key]["budget"];
                return amountSpent > budget
                  ? "rgb(200, 0, 0)"
                  : "rgb(28, 231, 129)";
              }),
              borderWidth: 1,
            },
            {
              label: "Budget",
              data: keys.map((key) => data[0][key]["budget"]),
              backgroundColor: "rgb(0, 81, 134)",
              borderWidth: 1,
            },
          ],
        };

        const baroptions = {
          barThickness: mobilemode ? 20 : 40,
          barPercentage: 0.8,
          categoryPercentage: 0.8,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: "Category Analysis",
              fontSize: 50,
            },
            legend: {
              display: true,
            },
          },
        };
        return (
          <div className="">
              <Bar
              data={bardata}
              options={baroptions}
              width={100}
              height={mobilemode ? 100 : 50}
            ></Bar>         
          </div>
        );
      } else {
        return (
          <div className="h-100">
            <h3 className="text-center">No data to display</h3>
          </div>
        );
      }
    }
  };

  const Linechart = ({ data }) => {
    if (data) {
      const linedataset = {
        labels: data.map((item) => item["date"]),
        datasets: [
          {
            label: "Average Balance",
            data: data.map((item) => item["average_balance"]),
            backgroundColor: "rgb(28, 231, 129)",
            borderColor: "rgba(28, 231, 129, 0.2)",
          },
          {
            label: "Withdrawn",
            data: data.map((item) => item["total_withdrawn"]),
            backgroundColor: "rgb(231, 102, 28)",
            borderColor: "rgba(231, 102, 28, 0.2)",
          },
          {
            label: "Paid In",
            data: data.map((item) => item["total_paid_in"]),
            backgroundColor: "rgb(0, 81, 134)",
            borderColor: "rgba(0, 81, 134, 0.2)",
          },
        ],
      };
      const lineoptions = {
        maintainAspectRatio: true,
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            // max: 20000,
            ticks: {
              stepSize: 5000,
            },
          },
        },
        plugins: {
          legend: {},
          title: {
            display: true,
            fontSize: 50,
            text: "Account Activity"
          },
        },
      };
      return (
        <div className="">
          <Line
            data={linedataset}
            options={lineoptions}
            width={100}
            height={mobilemode ? 100 : 50}
          />
          
        </div>
      );
    }
  };

  const handlecoopupload = () => {
    // make api call to upload coop bank statement
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // user has token, make api call
      const formData = new FormData();
      formData.append("file", uploadedfile);
      axios
        .post("https://backend.finalyze.app/uploadcoop", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          if (response.status === 500) {
            console.log("server error");
            // alert for server error
            alert("Server error");
          } else if (response.status === 200) {
            console.log(response.data);
            // alert for successful upload
            alert("File uploaded successfully");
            closeuploadmodal();
            setuploadedfile(null);
            updatedata ? setupdatedata(false) : setupdatedata(true);
          }
        });
    }
  };

  const handleequityupload = () => {
    // make api call to upload equity bank statement
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // user has token, make api call
      const formData = new FormData();
      formData.append("file", uploadedfile);
      axios
        .post(`${backend}/uploadequity`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((response) => {
          if (response.status === 500) {
            console.log("server error");
            // alert for server error
            alert("Server error");
          } else if (response.status === 200) {
            console.log(response.data);
            // alert for successful upload
            alert("File uploaded successfully");
            closeuploadmodal();
            setuploadedfile(null);
            updatedata ? setupdatedata(false) : setupdatedata(true);
          }
        });
    }
  };

  const coopfilechange = (e) => {
    setdisabledbutton(false);
    // get file from input
    const file = e.target.files[0];
    // check file type
    if (file.size > 10000000) {
      alert("File size too large only files less than 10MB allowed");
      setdisabledbutton(true);
      return;
    }
    if (file.type !== "application/pdf") {
      setshowalert(true);
      setdisabledbutton(true);
      return;
    }
    if (user === "demo") {
      alert("This feature is disabled in demo mode");
      setdisabledbutton(true);
      return;
    }

    setuploadedfile(file);
  };
  // modal for choosing a statement to upload
  const Uploadmodal = () => {
    return (
      <>
        <Modal
          show={showuploadmodal}
          onHide={closeuploadmodal}
          contentClassName="bg-dark "
        >
          <Modal.Header closeButton>
            <Modal.Title>Upload Statement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {coopbankupload ? (
              <div className="d-flex flex-column align-items-center">
                {showalert && (
                  <Alert
                    variant="danger"
                    onClose={() => setshowalert(false)}
                    dismissible
                  >
                    <Alert.Heading>Computer says no</Alert.Heading>
                    <p>
                      That won't work, only PDF files are allowed. You can dismiss me and try again
                    </p>
                  </Alert>
                )}
                <Form.Group controlId="formFileSm" className="mb-3" bg="dark">
                  <Form.Label style={{textTransform: "uppercase"}} className="p-3 rounded bg-secondary bg-opacity-50 m-3 text-warning fs-5 text-opactiy-50">
                    Upload your {currentupload} bank statement
                  </Form.Label>
                  <Form.Control
                    type="file"
                    size="sm"
                    className="bg-secondary text-light border border-secondary"
                    onChange={coopfilechange}
                  />
                </Form.Group>
                <div className="text-center">
                  {" "}
                  {uploadedfile ? (
                    <>
                      <p className="text-info">
                      File name: {uploadedfile.name} <br />
                        Click below to upload the file
                      </p>
                    </>
                  ) : (
                    <p className="">Waiting for upload...</p>
                  )}
                </div>

                <Button
                  disabled={disabledbutton}
                  variant="outline-success"
                  className="text-center w-25"
                  onClick={() => {
                    if (currentupload === "coop") {
                      handlecoopupload();
                    } else if (currentupload === "equity") {
                      handleequityupload();
                    }
                  }}
                >
                  Upload File
                </Button>
              </div>
            ) : (
              <Container>
                <Row className="">
                  <Col>
                    <Card
                      bg="secondary"
                      border="dark"
                      className="m-3 text-center"
                      style={{ width: "11rem" }}
                      onClick={() => history.push("/upload")}
                    >
                      <Card.Body>
                        <Card.Title>MPESA Statement</Card.Title>
                        <i class="bi bi-phone-vibrate" style={{fontSize: '5.5rem'}}></i>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card
                      bg="secondary"
                      border="dark"
                      className="m-3 text-center"
                      style={{ width: "11rem" }}
                      onClick={() => {
                        setcoopbankupload(true);
                        setcurrentupload("coop");
                      }}
                    >
                      <Card.Body>
                        <Card.Title>COOP Bank Statement</Card.Title>
                        <i class="bi bi-bank" style={{fontSize: '5.5rem'}}></i>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card
                      bg="secondary"
                      border="dark"
                      className="m-3 text-center"
                      style={{ width: "11rem" }}
                      onClick={() => {
                        setcoopbankupload(true);
                        setcurrentupload("equity");
                      }}
                    >
                      <Card.Body>
                        <Card.Title>Equity Bank Statement</Card.Title>
                        <i class="bi bi-bank" style={{fontSize: '5.5rem'}}></i>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const handleApiCall = (e) => {
    let k = e.target.value;
    let pdf_name = cardData[k].pdf_name;
    const jwt = localStorage.getItem("jwt");
    console.log(k, cardData[k]);
    // setshowdata(true)
    axios
      .post(
        "https://backend.finalyze.app/retrieve",
        { pdf_name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setshowdata(true);
          sndata.push(response.data[0], response.data[1]);
        } else {
          alert("No data found");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleRefresh = () => {
    setshowdata(false);
    setSndata([]);
  };
  const updateSearch = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setshowresults(false);
      setstttype("mpesa");
    } else {
      setshowresults(true);
    }
  };
  const handledelete = (eventKey, e) => {
    // send api call to delete
    setshowdelmodal(false);
    let k = delid;
    let pdf_name = cardData[k].pdf_name;
    const jwt = localStorage.getItem("jwt");
    axios
      .post(
        `${backend}/delete`,
        { pdf_name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert("Deleted");
          updatedata ? setupdatedata(false) : setupdatedata(true);
        } else {
          alert("Error");
        }
      })
      .catch((error) => console.log(error));
  };

  const handledelete1 = (eventKey, e) => {
    // show modal to confirm delete
    if (user === "demo") {
      alert("This feature is disabled in demo mode");
      return;
    }
    setshowdelmodal(true);
    setdelid(eventKey);
  };

  const getdetails = () => {
    history.push("/usermodel");
  };

  const quickanalysis = (e) => {
    setloadstate(false);
    // make api call with filename
    let k = e.target.value;
    let pdf_name = cardData[k].pdf_name;
    let statement_type = cardData[k].statement_type;
    console.log(pdf_name, statement_type);
    const jwt = localStorage.getItem("jwt");
    axios
      .post(
        "https://backend.finalyze.app/py/getcat",
        { pdf_name, statement_type },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
            setquickanalresults(response.data[0]);
            settitle(response.data[1]);
            setbudgetlist(response.data[2]);
            setshowquickanal(true);
            handleShow();
            setloadstate(true);
        } else {
          alert("Error");
        }
      })
      .catch((error) => console.log(error));
  };

  const handlesttchange = (e) => {
    if (e.target.value === "1") {
      setstttype("mpesa");
    } else if (e.target.value === "2") {
      setstttype("coop");
    } else if (e.target.value === "3") {
      setstttype("equity");
    }
  };

  const ConfirmDelete = () => {
    return (
      <>
        <Modal
          show={showdelmodal}
          onHide={() => setshowdelmodal(false)}
          contentClassName="bg-dark "
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column m-3 align-items-center">
              <h5 className="text-info my-3 text-center">
                Are you absolutely positive you want to delete this?
                <br />
                We won't say we told you so.
              </h5>
              <div className="d-flex flex-row m-3">
                <Button onClick={handledelete} className="my-2 mx-3">
                  Yes
                </Button>
                <Button
                  onClick={() => setshowdelmodal(false)}
                  className="my-2 mx-3"
                  variant="danger"
                >
                  No
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const showsidebarhandler = () => {
    if (showsidebar) {
      setshowsidebar(false);
      if (mobilemode) {
        document.getElementsByClassName("dash-content")[0].style.transform = "translateX(0rem)"
        document.getElementsByClassName("sidebar")[0].style.left = "-15rem";
      }
      else {
        document.getElementsByClassName("sidebar")[0].style.left = "-20rem";
      }
      return;
    }
    setshowsidebar(true);
    document.getElementsByClassName("sidebar")[0].style.left = "0px";
    if (mobilemode) {
    document.getElementsByClassName("dash-content")[0].style.transform = "translateX(15rem)"
    } 
  };

  return (
    <div className="">
      {showdata ? (
        <Statement data={sndata[1]} pdata={sndata[0]} refresh={handleRefresh} />
      ) : (
        <div className="text-center">
          <div className="d-flex flex-row align-items-center p-2 bg-dark top-nav">
            <div className="d-flex flex-row-reverse">
           <AppTitle/>
             <div className="menu-sel mt-3" onClick={showsidebarhandler}>
              <i class="bi bi-list"></i>
            </div>
            </div>
            <div className="home-search">
            <form
              class="d-flex text-center mb-1"
              role="search"
            >
              <input
                class="text-light form-control bg-secondary bg-opacity-50 border-dark"
                type="search"
                placeholder="Search for a transaction"
                aria-label="Search"
                value={searchText}
                onChange={updateSearch}
              />
            </form>
              </div>
            {showresults && (
              <div className="d-flex flex-row position-absolute top-25 start-50  m-3 source-sel">
                <p>Statement Source:</p>
                <Form.Select
                  className="item-selector  bg-dark border border-info text-light m-2 w-auto translate-middle-y"
                  onChange={handlesttchange}
                >
                  <option value="1">M-pesa</option>
                  <option value="2">Cooperative</option>
                  <option value="3">Equity</option>
                </Form.Select>
              </div>
            )}
            
          </div>
          <div className="">
            <div className="d-flex flex-column p-3 bg-dark sidebar position-absolute">
              <Button
                className="w-100 my-2 text-light"
                onClick={getdetails}
                variant="secondary"
              >
                Category Model
              </Button>
              <Button
                className="w-100 my-2 text-light"
                onClick={() => history.push("/managecat")}
                variant="secondary"
              >
                Category Manager
              </Button>
              <Button
                className="w-100 my-2 text-light"
                onClick={() => history.push("/budgetbuild")}
                variant="secondary"
              >
                Budget Builder
              </Button>
              <Button
                className="w-100 my-2 text-light"
                variant="secondary"
                onClick={() => setshowuploadmodal(true)}
              >
                Upload a Statement
              </Button>
              <Button
              className="text-center btn-sm w-50 my-2 mx-5 bottom-0 position-absolute"
              onClick={() => {
                localStorage.removeItem("jwt");
                setUser(null);
                history.push("/");
              }}
              variant="outline-warning"
            >
              Logout
            </Button>
            </div>
            <div className="d-flex flex-fill w-100 dash-content">
              {showresults ? (
                <div className="w-100 flex-fill search-page">
                <SearchPage searchText={searchText} stttype={stttype} />
                </div>
              ) : (
                <div className="flex-fill">
                  {loadstate ? (
                    <div>
                      <div className="w-25 m-3 stt-up">
                        <Card bg="dark" className="mt-5">
                          <Card.Body>
                            Statements Uploaded:
                            <strong>{" " + cardData.length}</strong>
                          </Card.Body>
                        </Card>
                      </div>
                      <h5 className="p-3 bg-dark m-3 text-info">
                          Last Month at a glance
                          <br />
                          {graphdata ? graphdata[1] : "No data"}
                        </h5>
                      <div className="d-flex justify-content-evenly align-items-center dash-graphs">
                        <div className="text-info w-100">
                          <Lateststatement data={graphdata} />
                        </div>
                        <div className="w-100">
                          <Linechart data={linedata} />
                        </div>
                      </div>
                      <h5 className="p-3 bg-dark m-3 text-info">
                        Statements Uploaded
                        </h5>
                      <div className="row mx-4">
                        {cardData.map((card, i) => (
                          <div className="col-md-4 mt-3" key={i}>
                            <div className="card bg-dark text-white">
                              <DropdownButton
                                onSelect={handledelete1}
                                id={`dropdown-button-${i}`}
                                title=""
                                variant="secondary"
                                menuVariant="dark"
                                size="sm"
                                className="position-absolute top-0 end-0"
                              >
                                <Dropdown.Item eventKey={i} value={i}>
                                  Delete
                                </Dropdown.Item>
                              </DropdownButton>
                              <div className="card-body">
                                <h5 className="card-title">
                                  {card.pdf_name.split("_")[0]}{" "}
                                  {card.pdf_name.split("_")[1]}
                                </h5>
                                {/* <h6 className="card-subtitle mb-2 text-muted">{card.statement}</h6> */}
                                <p className="card-text d-flex flex-row justify-content-center">
                                  Date:{" "}
                                  {card.statement_type == "coop" ? (
                                    <p className="mx-2"> {card.date}</p>
                                  ) : (
                                    <p className="mx-2"> {card.date}</p>
                                  )}
                                </p>
                                <p className="card-text">
                                  Statement type:{" "}
                                  {card.statement_type.toUpperCase()}
                                </p>
                                <div>
                                  {card.statement_type == "mpesa" ? (
                                    <>
                                      <button
                                        className="btn btn-primary"
                                        onClick={handleApiCall}
                                        value={i}
                                        key={i}
                                      >
                                        View Charts
                                      </button>
                                      <button
                                        className="btn btn-primary mx-3"
                                        onClick={quickanalysis}
                                        value={i}
                                        key={i}
                                      >
                                        Quick Analysis
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      className="btn btn-primary mx-3"
                                      onClick={quickanalysis}
                                      value={i}
                                      key={i}
                                    >
                                      Quick Analysis
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {showquickanal && (
                        <Analysismodal title={title} data={quickanalresults} />
                      )}
    
                      {showuploadmodal && (
                        <Uploadmodal
                          show={showuploadmodal}
                          onHide={() => setshowuploadmodal(false)}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center my-5">
                     <HashLoader color="#008897" size={100}/>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {showdelmodal && ConfirmDelete()}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
