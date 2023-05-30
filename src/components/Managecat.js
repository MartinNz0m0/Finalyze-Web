import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { DeleteSuccessAlert, FormSubmitSuccessAlert } from "./Alerts";
import { HashLoader } from "react-spinners";
import './css/Managecat.css'


const Managecat = () => {
  // useffect for getting all categories
  // usestate for storing all categories
  const history = useHistory();
  const ref = useRef(null);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [showdel, setShowdel] = useState(false);
  const handleClose = () => setShow(false);
  const closedel = () => setShowdel(false);
  const [newcat, setNewcat] = useState("");
  const [showalert, setShowalert] = useState(false);
  const [showdelalert, setShowdelalert] = useState(false);
  const [removeduplicates, setRemoveduplicates] = useState(false);
  const [currindex, setCurrindex] = useState(0);
  const [readonly, setReadonly] = useState(true);
  const [newbudget, setNewbudget] = useState("");
  const [loadstate, setLoadstate] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios
        .post(
          "https://backend.finalyze.app/py/getallcats",
          {removeduplicates},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          setCategories(response.data);
          setLoadstate(true);

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [newcat, showdel]);

  const handleeditchange = (e) => {
    // handle change in the edit form
    setNewcat(e.target.value);
  };

  const submitnewcat = () => {
    // submit the new category to the backend
    if (newcat === "") {
      alert("Please enter a category");
    }
    else if (readonly === false && !parseInt(newbudget)) {
      alert("You clicked the edit budget button, please enter a valid number for budget");
    } 
    else {
    const jwt = localStorage.getItem("jwt");
    const det = categories[currindex][2];
    const sttype = categories[currindex][5];
    if (jwt) {
      axios
        .post(
          "https://backend.finalyze.app/py/editcat",
          { newcat, det, sttype, newbudget },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setCategories(response.data);
            setShow(false);
            setCurrindex(0);
            setNewcat("");
            setNewbudget("");
            setReadonly(true);
            setShowalert(true);
          } else if (response.status === 401) {
            localStorage.removeItem("jwt");
            history.push("/login");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  };

  const deletecat = (index) => {
    // delete the category from the backend
    const jwt = localStorage.getItem("jwt");
    const det = categories[currindex][2];
    const sttype = categories[currindex][5];
    if (jwt) {
      axios
        .post(
          "https://backend.finalyze.app/py/deletecat",
          { det, sttype },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setCategories(response.data);
            setShowdel(false);
            setCurrindex(0);
            setShowdelalert(true);
          } else if (response.status === 401) {
            history.push("/login");
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const EditModal = (details) => {
    return (
      <>
        <Modal show={show} onHide={()=>{
          setReadonly(true)
          handleClose() 
        }} contentClassName="bg-dark ">
          <Modal.Header closeButton>
            <Modal.Title>Edit Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex flex-column m-3 align-items-center">
              <h3 className="text-info my-3">Details</h3>
              <h6>{categories[currindex][2]}</h6>
              <h3 className="text-info my-3">New Category</h3>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Category"
                onChange={handleeditchange}
                className="bg-secondary bg-opacity-50 border-dark text-light"
              />
              <h3 className="text-info my-3">Budget Set</h3>
              <div className="d-flex flex-row-reverse">

              <Button size='sm' variant="secondary mx-2" className="rounded" onClick={()=>{setReadonly(false) 
                ref.current.focus()}}>Edit</Button>
              <Form.Control onChange={(e)=>setNewbudget(e.target.value)} ref={ref} type="text" placeholder={"Current Budget: KES " + categories[currindex][6]} readOnly={readonly} className="bg-secondary bg-opacity-50 border-dark text-light" />
              </div>
              <Button onClick={submitnewcat} className="my-2">
                Done
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  const ConfirmDelete = () => {
    return (
      <>
        <Modal show={showdel} onHide={closedel} contentClassName="bg-dark ">
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
                <Button onClick={deletecat} className="my-2 mx-3">
                  Yes
                </Button>
                <Button
                  onClick={closedel}
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

  const handleedit = (e) => {
    // show popup with a form to edit the category
    setShowalert(false);
    setShow(true);
    setCurrindex(e.target.value);
  };

  const handledelete = (e) => {
    // show popup to confirm delete
    setShowdelalert(false);
    setShowdel(true);
    setCurrindex(e.target.value);
  };

  const final = categories.map((item, i) => {
    return (
      <tr>
        <td>{item[2]}</td>
        <td>{item[3]}</td>
        <td className="text-info">{ item[6] ? (<p>KES {item[6]}</p>) : <p>Not Set</p>}</td>
        <td style={{ "text-transform": "uppercase" }}>{item[5]}</td>
        <td className="text-center">
          <Button variant="outline-primary" onClick={handleedit} value={i}>
            Edit
          </Button>
        </td>
        <td className="text-center">
          <Button variant="outline-danger" onClick={handledelete} value={i}>
            Delete
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div>

      {
        loadstate ? (

          <div>
    
          
          <div className="p-4 bg-dark manage-nav">
            <h1>Manage Categories</h1>
    
            <Button
              variant="outline-info"
              className="position-absolute top-0 end-0 my-5 mx-3"
              onClick={() => history.push("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>
          <div className="position-relative m-4">
            <Table striped bordered hover variant="dark" responsive="md">
              <thead>
                <tr>
                  <th>Details</th>
                  <th>Category</th>
                  <th>Budget Set</th>
                  <th>Statement Type</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{final}</tbody>
            </Table>
            {showalert && (
            <div className="position-fixed top-0 end-0 m-5">
          
              <FormSubmitSuccessAlert visible={showalert} />
            </div>
          )}
          {
            showdelalert && (
              <div className="position-fixed top-0 end-0 m-5">
                <DeleteSuccessAlert visible={showdelalert} />
              </div>
          )}
          </div>
          {categories.length && EditModal()}
          {categories.length && ConfirmDelete()}
          {categories.length === 0 && (
            <h1 className="text-center text-info">No Categories to Show</h1>
          )}
          </div>
        
        ) :
        (
          <div className="position-absolute top-50 start-50 translate-middle">
          <HashLoader color={"#008897"} size={100} />
          </div>
        )
      }
    </div>
  );
};

export default Managecat;
