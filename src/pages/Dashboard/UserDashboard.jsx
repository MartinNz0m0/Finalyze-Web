import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../components/UserContext";
import axios from "axios";
import Statement from "../../components/Statement/Statement";
import SearchPage from "./../../components/SearchPage";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import { Bar, Line } from "react-chartjs-2";
import { Col, Container, Row } from "react-bootstrap";
import { AppTitle } from "./../../components/Hero";
import HashLoader from "react-spinners/HashLoader";
import "./Dashboard.scss";
import { NoStatementAlert } from "../../components/Alerts";
import Navbar from "../../components/Navbar/Navbar";
import { MdArrowDownward, MdArrowUpward, MdBuild, MdCategory, MdClose, MdDashboard, MdDelete, MdInfo, MdLogout, MdMoney, MdOutlineReorder, MdSettingsCell, MdUpload } from "react-icons/md";
import Logo from '../../images/logo.png'
import Loginfinalyze from '../../images/login-finalyze.png'
import { NavLink } from "react-router-dom";
import { ImFolderUpload } from 'react-icons/im'
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { TbAlertTriangleFilled } from 'react-icons/tb'
import { RiListSettingsLine } from 'react-icons/ri'
import Sidebar from "../../components/Sidebar/Sidebar";

const UserDashboard = ({ jibu }) => {
  const history = useHistory();
  const popRef = useRef(null);
  const { user, setUser } = useContext(UserContext);
  const [sndata, setSndata] = useState([]);
  const [showdata, setshowdata] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showresults, setshowresults] = useState(false);
  const [updatedata, setupdatedata] = useState(false);
  const [quickanalresults, setquickanalresults] = useState({});
  const [showquickanal, setshowquickanal] = useState(false);
  const [stttype, setstttype] = useState("mpesa");
  const [showSideNavigation, setShowSideNavigation] = useState(false);
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
  const [dashdata, setdashdata] = useState([]);
  const [graphmode, setgraphmode] = useState(false);
  const [graphdata, setgraphdata] = useState([]);
  const [linedata, setlinedata] = useState([]);
  const [disabledbutton, setdisabledbutton] = useState(true);
  const [mobilemode, setmobilemode] = useState(false);
  const [showsidebar, setshowsidebar] = useState(false);
  const [showdash, setshowdash] = useState(false);

  useEffect(() => {
    //make api call to get data
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      // user has token, make api call
      axios
        .post(
          "https://backend.finalyze.app/dash",
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
          } else {
            alert("something went wrong");
          }
        });

      axios
        .post(
          "https://backend.finalyze.app/py/dashdata",
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
            setdashdata(response.data);
            setTimeout(() => {
              setloadstate(true);
            }, 1000);
          } else {
            alert("something went wrong");
          }
        });

      // other dash data

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
          if (response.data == "nothing happened") {
            alert("nothing happened");
            setloadstate(true);
            return;
          }
          setgraphdata(response.data[0]);
          setlinedata(response.data[1]);
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
            "https://backend.finalyze.app/verify",
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
      maintainAspectRatio: mobilemode ? false : true,
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
            {keys.length === 0 ? (
              <p className="text-warning text-center">
                No data to display, visit the category model to add some
                categories first
              </p>
            ) : (
              <>
                {graphmode ? (
                  <div className="h-100">
                    <Bar
                      data={bardatasaet}
                      options={baroptions}
                      width={mobilemode ? 450 : 100}
                      height={mobilemode ? 450 : 100}
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
            )}
          </Modal.Body>
        </Modal>
      </>
    );
  };
  const Lateststatement = ({ data }) => {
    if (data == "n") {
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
          barThickness: mobilemode ? 15 : 30,
          barPercentage: 0.8,
          categoryPercentage: 0.8,
          maintainAspectRatio: mobilemode ? false : true,
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
              width={mobilemode ? 450 : 100}
              height={mobilemode ? 500 : 50}
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
    if (data === "o") {
      return (
        <div className="h-100">
          <h3 className="text-center">No data to display</h3>
        </div>
      );
    } else {
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
        maintainAspectRatio: mobilemode ? false : true,
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
            text: "Account Activity",
          },
        },
      };
      return (
        <div className="">
          <Line
            data={linedataset}
            options={lineoptions}
            width={mobilemode ? 450 : 100}
            height={mobilemode ? 500 : 50}
          />
        </div>
      );
    }
  };

  // const handlecoopupload = () => {
  //   // make api call to upload coop bank statement
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     // user has token, make api call
  //     const formData = new FormData();
  //     formData.append("file", uploadedfile);
  //     axios
  //       .post("https://backend.finalyze.app/uploadcoop", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${jwt}`,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.status === 500) {
  //           console.log("server error");
  //           // alert for server error
  //           alert("Server error");
  //         } else if (response.status === 200) {
  //           // alert for successful upload
  //           alert("File uploaded successfully");
  //           closeuploadmodal();
  //           setuploadedfile(null);
  //           updatedata ? setupdatedata(false) : setupdatedata(true);
  //         }
  //       });
  //   }
  // };

  // const handleequityupload = () => {
  //   // make api call to upload equity bank statement
  //   const jwt = localStorage.getItem("jwt");
  //   if (jwt) {
  //     // user has token, make api call
  //     const formData = new FormData();
  //     formData.append("file", uploadedfile);
  //     axios
  //       .post("https://backend.finalyze.app/uploadequity", formData, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer ${jwt}`,
  //         },
  //       })
  //       .then((response) => {
  //         if (response.status === 500) {
  //           console.log("server error");
  //           // alert for server error
  //           alert("Server error");
  //         } else if (response.status === 200) {
  //           // alert for successful upload
  //           alert("File uploaded successfully");
  //           closeuploadmodal();
  //           setuploadedfile(null);
  //           updatedata ? setupdatedata(false) : setupdatedata(true);
  //         }
  //       });
  //   }
  // };

  // const coopfilechange = (e) => {
  //   setdisabledbutton(false);
  //   // get file from input
  //   const file = e.target.files[0];
  //   // check file type
  //   if (file.size > 10000000) {
  //     alert("File size too large only files less than 10MB allowed");
  //     setdisabledbutton(true);
  //     return;
  //   }
  //   if (file.type !== "application/pdf") {
  //     setshowalert(true);
  //     setdisabledbutton(true);
  //     return;
  //   }
  //   if (user === "demo") {
  //     alert("This feature is disabled in demo mode");
  //     setdisabledbutton(true);
  //     return;
  //   }

  //   setuploadedfile(file);
  // };
  // // modal for choosing a statement to upload
  // const Uploadmodal = () => {
  //   return (
  //     <>
  //       <Modal
  //         show={showuploadmodal}
  //         onHide={closeuploadmodal}
  //         contentClassName="bg-dark"
  //         fullscreen="md-down"
  //       >
  //         <Modal.Header closeButton closeVariant="white">
  //           <Modal.Title>Upload Statement</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           {coopbankupload ? (
  //             <div className="d-flex flex-column align-items-center">
  //               {showalert && (
  //                 <Alert
  //                   variant="danger"
  //                   onClose={() => setshowalert(false)}
  //                   dismissible
  //                 >
  //                   <Alert.Heading>Computer says no</Alert.Heading>
  //                   <p>
  //                     That won't work, only PDF files are allowed. You can
  //                     dismiss me and try again
  //                   </p>
  //                 </Alert>
  //               )}
  //               <Form.Group controlId="formFileSm" className="mb-3" bg="dark">
  //                 <Form.Label
  //                   style={{ textTransform: "uppercase" }}
  //                   className="p-3 rounded bg-secondary bg-opacity-50 m-3 text-warning fs-5 text-opactiy-50"
  //                 >
  //                   Upload your {currentupload} bank statement
  //                 </Form.Label>
  //                 <Form.Control
  //                   type="file"
  //                   size="sm"
  //                   className="bg-secondary text-light border border-secondary"
  //                   onChange={coopfilechange}
  //                 />
  //               </Form.Group>
  //               <div className="text-center">
  //                 {" "}
  //                 {uploadedfile ? (
  //                   <>
  //                     <p className="text-info">
  //                       File name: {uploadedfile.name} <br />
  //                       Click below to upload the file
  //                     </p>
  //                   </>
  //                 ) : (
  //                   <p className="">Waiting for upload...</p>
  //                 )}
  //               </div>

  //               <Button
  //                 disabled={disabledbutton}
  //                 variant="outline-success"
  //                 className="text-center w-25"
  //                 onClick={() => {
  //                   if (currentupload === "coop") {
  //                     handlecoopupload();
  //                   } else if (currentupload === "equity") {
  //                     handleequityupload();
  //                   }
  //                 }}
  //               >
  //                 Upload File
  //               </Button>
  //             </div>
  //           ) : (
  //             <Container>
  //               <Row className="">
  //                 <Col>
  //                   <Card
  //                     bg="secondary"
  //                     border="dark"
  //                     className="m-3 text-center"
  //                     style={{ width: "11rem" }}
  //                     onClick={() => history.push("/upload")}
  //                   >
  //                     <Card.Body>
  //                       <Card.Title>MPESA Statement</Card.Title>
  //                       <i
  //                         class="bi bi-phone-vibrate"
  //                         style={{ fontSize: "5.5rem" }}
  //                       ></i>
  //                     </Card.Body>
  //                   </Card>
  //                 </Col>
  //                 <Col>
  //                   <Card
  //                     bg="secondary"
  //                     border="dark"
  //                     className="m-3 text-center"
  //                     style={{ width: "11rem" }}
  //                     onClick={() => {
  //                       setcoopbankupload(true);
  //                       setcurrentupload("coop");
  //                     }}
  //                   >
  //                     <Card.Body>
  //                       <Card.Title>COOP Bank Statement</Card.Title>
  //                       <i
  //                         class="bi bi-bank"
  //                         style={{ fontSize: "5.5rem" }}
  //                       ></i>
  //                     </Card.Body>
  //                   </Card>
  //                 </Col>
  //               </Row>
  //               <Row>
  //                 <Col>
  //                   <Card
  //                     bg="secondary"
  //                     border="dark"
  //                     className="m-3 text-center"
  //                     style={{ width: "11rem" }}
  //                     onClick={() => {
  //                       setcoopbankupload(true);
  //                       setcurrentupload("equity");
  //                     }}
  //                   >
  //                     <Card.Body>
  //                       <Card.Title>Equity Bank Statement</Card.Title>
  //                       <i
  //                         class="bi bi-bank"
  //                         style={{ fontSize: "5.5rem" }}
  //                       ></i>
  //                     </Card.Body>
  //                   </Card>
  //                 </Col>
  //               </Row>
  //             </Container>
  //           )}
  //         </Modal.Body>
  //       </Modal>
  //     </>
  //   );
  // };

  const handleApiCall = (e) => {
    let k = e.target.value;
    let pdf_name = cardData[k].pdf_name;
    const jwt = localStorage.getItem("jwt");
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
        "https://backend.finalyze.app/delete",
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

  // const getdetails = () => {
  //   history.push("/usermodel");
  // };

  const quickanalysis = (e) => {
    setloadstate(false);
    // make api call with filename
    let k = e.target.value;
    let pdf_name = cardData[k].pdf_name;
    let statement_type = cardData[k].statement_type;
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

  const showsidebarhandler = (e) => {
    if (showsidebar) {
      if (mobilemode) {
        document.getElementsByClassName("dash-content")[0].style.transform =
          "translateX(0rem)";
        document.getElementsByClassName("sidebar")[0].style.left = "-15rem";
      } else {
        document.getElementsByClassName("sidebar")[0].style.left = "-20rem";
      }
      let closer = document.querySelector(".bi-x");
      if (closer) {
        document.querySelector(".bi-x").className = "bi bi-list";
      }
      setshowsidebar(false);
      return;
    }
    setshowsidebar(true);
    document.getElementsByClassName("sidebar")[0].style.left = "0px";
    if (mobilemode) {
      document.getElementsByClassName("dash-content")[0].style.transform =
        "translateX(15rem)";
    }
    let closer = document.querySelector(".bi-list");
    if (closer) {
      document.querySelector(".bi-list").className = "bi bi-x";
    }
  };

  // click outside of sidebar to close it

  // window.onclick = (event) => {
  //   const sidebar = document.getElementsByClassName("sidebar")[0];
  //   const menusel = document.getElementsByClassName("bi-list")[0]
  //   console.log(event.target)
  //   if (event.target != sidebar && event.target != menusel && event.target.type != 'button') {
  //     setshowsidebar(false);
  //     if (mobilemode) {
  //       document.getElementsByClassName("dash-content")[0].style.transform = "translateX(0rem)"
  //       document.getElementsByClassName("sidebar")[0].style.left = "-15rem";
  //     }
  //     else {
  //       document.getElementsByClassName("sidebar")[0].style.left = "-20rem";
  //     }
  //   }
  // }
  // trying to close the sidebar when clicking outside of it
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popRef.current && !popRef.current.contains(event.target)) {
  //       setshowsidebar(false);
  //     if (mobilemode) {
  //       document.getElementsByClassName("dash-content")[0].style.transform = "translateX(0rem)"
  //       document.getElementsByClassName("sidebar")[0].style.left = "-15rem";
  //     }
  //     else {
  //       document.getElementsByClassName("sidebar")[0].style.left = "-20rem";
  //     }
  //     }
  //   };
  //   document.addEventListener('click', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('click', handleClickOutside);
  //   };
  // }, [popRef]);

  return (
    <div className="" ref={popRef}>
      {showdata ? (
        <Statement data={sndata[1]} pdata={sndata[0]} refresh={handleRefresh} />
      ) : (
        <div className="dashboard">
          <div className="top-nav">
            <div className="site-header">
              <div className="reorder-button">
                <MdOutlineReorder id="reorder" onClick={() => setShowSideNavigation(true)} />
              </div>
              <div className="app-title">
                <h1><NavLink to='/'><img src={Logo} alt="" /> Finalyze</NavLink></h1>
              </div>
            </div>
            <div className="search-actions">
              {showresults && (
                <div className="source-sel">
                  <p>Statement Source:</p>
                  <select
                    className="type"
                    onChange={handlesttchange}
                  >
                    <option value="1">M-pesa</option>
                    <option value="2">Cooperative</option>
                    <option value="3">Equity</option>
                  </select>
                </div>
              )}
              <div className="home-search">
                <form role="search">
                  <input
                    class=""
                    type="search"
                    style={!showresults ? { width: '100%'} : null}
                    placeholder="Search for a transaction"
                    aria-label="Search"
                    value={searchText}
                    onChange={updateSearch}
                  />
                </form>
              </div></div>
          </div>
          <div className="body-container">
            {showSideNavigation ? (
              <Sidebar onClose={() => setShowSideNavigation(false)} />
            ) : null}
            <div className="dash-content">
              {showresults ? (
                <div className="w-100 flex-fill search-page">
                  <SearchPage searchText={searchText} stttype={stttype} />
                </div>
              ) : (
                <div className="dashboard-body">
                  {loadstate ? (
                    <div className="body-component">
                      <div className="stats-strip">
                        <div className="stats-card">
                          <div className="heading">
                            Statements Uploaded <ImFolderUpload id="card-icons" />
                          </div>
                          <div className="value">
                            <div className="value-item">
                              {" " + cardData.length}
                            </div>
                            <div className="indicator">
                              <MdArrowUpward id="up" />
                              <MdArrowDownward id="down" />
                            </div>
                          </div>
                        </div>
                        <div className="stats-card">
                          <div className="heading">
                            Categories Added <MdCategory id="card-icons" />
                          </div>
                          <div className="value">
                            <div className="value-item">
                              {dashdata ? (
                                <p>
                                  {" " + dashdata[0]}
                                </p>
                              ) : (
                                <p>{" " + 0}</p>
                              )}
                            </div>
                            <div className="indicator">
                              <MdArrowUpward id="up" />
                              <MdArrowDownward id="down" />
                            </div>
                          </div>
                        </div>
                        <div className="stats-card">
                          <div className="heading">
                            Total Budget <GiTakeMyMoney id="card-icons" />
                          </div>
                          <div className="value">
                            <div className="value-item">
                              {dashdata ? (
                                <p>
                                  {" " + dashdata[1]}
                                </p>
                              ) : (
                                <p>{" " + 0}</p>
                              )}
                            </div>
                            <div className="indicator">
                              <MdArrowUpward id="up" />
                              <MdArrowDownward id="down" />
                            </div>
                          </div>
                        </div>
                        <div className="stats-card">
                          <div className="heading">
                            Overspend Index <GiPayMoney id="card-icons" />
                          </div>
                          <div className="value">
                            <div className="value-item">
                              {dashdata ? (
                                <>
                                  {dashdata[2] < 25 ? (
                                    <p className="text-success">
                                      {" " + dashdata[2] + "%"}
                                    </p>
                                  ) : dashdata[2] < 75 ? (
                                    <p className="text-warning">
                                      {" " + dashdata[2] + "%"}
                                    </p>
                                  ) : (
                                    <p className="text-danger">
                                      {" " + dashdata[2] + "%"}
                                    </p>
                                  )}
                                </>
                              ) : (
                                <p className="text-info">{" " + 0}</p>
                              )}
                            </div>
                            <div className="indicator">
                              <MdArrowUpward id="up" />
                              <MdArrowDownward id="down" />
                            </div>
                          </div>
                        </div>

                        {/* <div className="m-3 stt-up">
                          <Card bg="dark" className="mt-2">
                            <Card.Body>
                              Statements Uploaded:
                              <strong className="text-info">
                                {" " + cardData.length}
                              </strong>
                            </Card.Body>
                          </Card>
                        </div>
                        <div className="m-3 stt-up">
                          <Card bg="dark" className="mt-2">
                            <Card.Body>
                              Categories added:
                              {dashdata ? (
                                <strong className="text-info">
                                  {" " + dashdata[0]}
                                </strong>
                              ) : (
                                <strong className="text-info">{" " + 0}</strong>
                              )}
                            </Card.Body>
                          </Card>
                        </div>
                        <div className="m-3 stt-up">
                          <Card bg="dark" className="mt-2">
                            <Card.Body>
                              Total Budget:
                              {dashdata ? (
                                <strong className="text-info">
                                  {" " + dashdata[1]}
                                </strong>
                              ) : (
                                <strong className="text-info">{" " + 0}</strong>
                              )}
                            </Card.Body>
                          </Card>
                        </div>
                        <div className="m-3 stt-up">
                          <Card bg="dark" className="mt-2">
                            <Card.Body>
                              Overspend Index:
                              {dashdata ? (
                                <>
                                  {dashdata[2] < 25 ? (
                                    <strong className="text-success">
                                      {" " + dashdata[2] + "%"}
                                    </strong>
                                  ) : dashdata[2] < 75 ? (
                                    <strong className="text-warning">
                                      {" " + dashdata[2] + "%"}
                                    </strong>
                                  ) : (
                                    <strong className="text-danger">
                                      {" " + dashdata[2] + "%"}
                                    </strong>
                                  )}
                                </>
                              ) : (
                                <strong className="text-info">{" " + 0}</strong>
                              )}
                            </Card.Body>
                          </Card>
                        </div> */}
                      </div>
                      <div className="last-month">
                        <h1>Last Month at a Glance:</h1>
                        <div className="last-month-body">
                          <div className="left">
                            <div className="graph-last">
                              {graphdata ? (
                                <Lateststatement data={graphdata} />
                              ) : (
                                "No data"
                              )}
                            </div>
                          </div>
                          <div className="right">
                            <div className="w-70 line">
                              {linedata ? <Linechart data={linedata} /> : "No data"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <h5 className="p-3 bg-dark m-3 text-info">
                        Last Month at a glance
                        <br />
                        {graphdata ? graphdata[1] : "No data"}
                      </h5>
                      <div className="d-flex justify-content-evenly align-items-center dash-graphs">
                        <div className="text-info w-100">
                          {graphdata ? (
                            <Lateststatement data={graphdata} />
                          ) : (
                            "No data"
                          )}
                        </div>
                        <div className="w-100">
                          {linedata ? <Linechart data={linedata} /> : "No data"}
                        </div>
                      </div> */}

                      <div className="uploaded-statements">
                        <h1>Statements Uploaded</h1>
                        <div className="upload-body">
                          {cardData.length == 0 && (
                            <div className="text-info">
                              <h3>No Statements Found  <TbAlertTriangleFilled id="warn" /></h3>
                              <h5>
                                You can upload a statement in the menu section.
                                Try it out with last month's statement to get
                                started
                              </h5>
                            </div>
                          )}
                          {cardData.map((card, i) => (
                            <div className="" key={i}>
                              <div className="statement-card">
                                <DropdownButton
                                  onSelect={handledelete1}
                                  id={`dropdown-button-${i}`}
                                  title=""
                                  className="delete-btn"
                                  variant="secondary"
                                  menuVariant="dark"
                                  size="sm"
                                >
                                  <Dropdown.Item eventKey={i} value={i} className="item">
                                    Delete <MdDelete />
                                  </Dropdown.Item>
                                </DropdownButton>
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {card.pdf_name.split("_")[0]}{" "}
                                    {card.pdf_name.split("_")[1]}
                                  </h5>
                                  {/* <h6 className="card-subtitle mb-2 text-muted">{card.statement}</h6> */}
                                  <p className="card-text text-success d-flex flex-row justify-content-center">
                                    <span>Date:</span>{" "}
                                    {card.statement_type == "coop" ? (
                                      <p className="mx-2"> {card.date}</p>
                                    ) : (
                                      <p className="mx-2"> {card.date}</p>
                                    )}
                                  </p>
                                  <p className="card-text text-success">
                                    <span>Statement type:</span>{" "}
                                    {card.statement_type.toUpperCase()}
                                  </p>
                                  <div className="actions">
                                    {card.statement_type == "mpesa" ? (
                                      <>
                                        <button
                                          className="view-charts"
                                          onClick={handleApiCall}
                                          value={i}
                                          key={i}
                                        >
                                          View Charts
                                        </button>
                                        <button
                                          className="quick-analysis"
                                          onClick={quickanalysis}
                                          value={i}
                                          key={i}
                                        >
                                          Quick Analysis
                                        </button>
                                      </>
                                    ) : (
                                      <button
                                        className="btn btn-outline-info mx-3"
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
                      </div>
                      {/* <>
                      <h5 className="p-3 bg-dark m-3 text-info">
                        Statements Uploaded
                      </h5>
                      <div className="row mx-4">
                        {cardData.length == 0 && (
                          <div className="text-info text-opacity-75">
                            <h3>No Statements Found</h3>
                            <h5>
                              You can upload a statement in the menu section.
                              Try it out with last month's statement to get
                              started
                            </h5>
                          </div>
                        )}
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
                                
                                <p className="card-text text-success d-flex flex-row justify-content-center">
                                  Date:{" "}
                                  {card.statement_type == "coop" ? (
                                    <p className="mx-2"> {card.date}</p>
                                  ) : (
                                    <p className="mx-2"> {card.date}</p>
                                  )}
                                </p>
                                <p className="card-text text-success">
                                  Statement type:{" "}
                                  {card.statement_type.toUpperCase()}
                                </p>
                                <div>
                                  {card.statement_type == "mpesa" ? (
                                    <>
                                      <button
                                        className="btn btn-outline-info"
                                        onClick={handleApiCall}
                                        value={i}
                                        key={i}
                                      >
                                        View Charts
                                      </button>
                                      <button
                                        className="btn btn-outline-info mx-3"
                                        onClick={quickanalysis}
                                        value={i}
                                        key={i}
                                      >
                                        Quick Analysis
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      className="btn btn-outline-info mx-3"
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
                      </> */}
                      {showquickanal && (
                        <Analysismodal title={title} data={quickanalresults} />
                      )}

                      {/* {showuploadmodal && (
                        <Uploadmodal
                          show={showuploadmodal}
                          onHide={() => setshowuploadmodal(false)}
                        />
                      )} */}
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center my-5">
                      <HashLoader color="#008897" size={100} />
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
