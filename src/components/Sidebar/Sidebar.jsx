import React, { useContext, useState } from 'react'
import './Sidebar.scss'
import { MdArrowBack, MdArrowDownward, MdArrowUpward, MdBuild, MdCategory, MdClose, MdDashboard, MdDelete, MdInfo, MdLogout, MdMoney, MdOutlineReorder, MdSettingsCell, MdUpload } from "react-icons/md";
import Logo from '../../images/logo.png'
import Loginfinalyze from '../../images/login-finalyze.png'
import { NavLink } from "react-router-dom";
import { ImFolderUpload } from 'react-icons/im'
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { BsBank2, BsPhoneFill } from 'react-icons/bs'
import { RiListSettingsLine } from 'react-icons/ri'
import { UserContext } from '../UserContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Mpesa from '../../images/mpesa-2.png'
import Equity from '../../images/equity-2.png'
import Coop from '../../images/coop.png'

const Sidebar = ({ onClose }) => {
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
    const [showalert, setshowalert] = useState(false);
    const [showdelmodal, setshowdelmodal] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [coopbankupload, setcoopbankupload] = useState(false);
    const [uploadedfile, setuploadedfile] = useState(null);
    const [currentupload, setcurrentupload] = useState("");
    const [showuploadmodal, setshowuploadmodal] = useState(false);
    const [disabledbutton, setdisabledbutton] = useState(true);
    const closeuploadmodal = () => {
        setshowuploadmodal(false);
        setcoopbankupload(false);
        setuploadedfile(null);
    };

    const getdetails = () => {
        history.push("/usermodel");
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
                .post("https://backend.finalyze.app/uploadequity", formData, {
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
                    contentClassName="bg-dark"
                    fullscreen="md-down"
                >
                    <Modal.Header closeButton closeVariant="white">
                        <Modal.Title>Upload Statement</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {coopbankupload ? (
                            <div className="d-flex flex-column align-items-center bank-modal">
                                {showalert && (
                                    <Alert
                                        variant="danger"
                                        onClose={() => setshowalert(false)}
                                        dismissible
                                    >
                                        <Alert.Heading>Computer says no</Alert.Heading>
                                        <p>
                                            That won't work, only PDF files are allowed. You can
                                            dismiss me and try again
                                        </p>
                                    </Alert>
                                )}
                                <div className="action">
                                    <p onClick={() => {
                                        setcoopbankupload(false);
                                        setcurrentupload("");
                                    }}>Back <MdArrowBack id='back' /></p>

                                </div>
                                <Form.Group controlId="formFileSm" className="mb-3" bg="dark">
                                    <Form.Label
                                        style={{ textTransform: "uppercase" }}
                                        className="p-3 rounded m-3 text-warning fs-5 text-opactiy-50"
                                    >
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
                            <div className='modal-options'>
                                <div className="M-pesa" onClick={() => history.push("/upload")}>
                                    <h4>Mpesa Statement</h4>
                                    <img src={Mpesa} alt="" />
                                </div>
                                <div className="Coop" onClick={() => {
                                    setcoopbankupload(true);
                                    setcurrentupload("coop");
                                }}>
                                    <h4>Coop Bank Statement</h4>
                                    <img src={Coop} alt="" />
                                </div>
                                <div className="Equity" onClick={() => {
                                    setcoopbankupload(true);
                                    setcurrentupload("equity");
                                }}>
                                    <h4>Equity Bank Statement</h4>
                                    <img src={Equity} alt="" />
                                </div>
                                <div className="div"></div>
                                {/* <Row className="">
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
                                                <i
                                                    class="bi bi-phone-vibrate"
                                                    style={{ fontSize: "5.5rem" }}
                                                ></i>
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
                                                <i
                                                    class="bi bi-bank"
                                                    style={{ fontSize: "5.5rem" }}
                                                ></i>
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
                                                <i
                                                    class="bi bi-bank"
                                                    style={{ fontSize: "5.5rem" }}
                                                ></i>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row> */}
                            </div>
                        )}
                    </Modal.Body>
                </Modal>
            </>
        );
    };

    return (
        <div className="sidebar-container">
            <div className="sidebar">
                <div className="top">
                    <MdClose id='close' onClick={onClose} />
                    <div className="navigation">
                        <NavLink to='/dashboard'>Dashboard <MdDashboard /></NavLink>
                        <div className="divider"></div>
                        <h4>Utilities</h4>
                        <NavLink to='/usermodel'>Category Model <MdCategory /></NavLink>
                        <NavLink to='/managecat'>Category Manager <RiListSettingsLine /></NavLink>
                        <NavLink to='/budgetbuild'>Budget Builder <MdBuild /></NavLink>
                        <span onClick={() => setshowuploadmodal(true)}>Upload a Statement <MdUpload /></span>
                        <div className="divider"></div>
                        <h4>Help</h4>
                        <NavLink to='/howto'>How to use App <MdInfo /></NavLink>
                        {/* <Button
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
                      </Button> */}
                    </div>
                </div>
                <div className="bottom">
                    <button
                        onClick={() => {
                            localStorage.removeItem("jwt");
                            setUser(null);
                            history.push("/");
                        }}
                    >
                        Logout <MdLogout />
                    </button>
                </div>
                {showuploadmodal && (
                    <Uploadmodal
                        show={showuploadmodal}
                        onHide={() => setshowuploadmodal(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default Sidebar