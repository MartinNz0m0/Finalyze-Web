import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { Doughnut } from "react-chartjs-2";
import { HashLoader } from "react-spinners";
import './Budget.scss'
import { MdOutlineReorder } from "react-icons/md";
import Sidebar from "../../components/Sidebar/Sidebar";
import { NavLink } from "react-router-dom";
import Logo from '../../images/logo.png';

const BudgetBuilder = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [validated, setValidated] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [validatedinputs, setValidatedinputs] = useState({});
  const [removeduplicates, setRemoveduplicates] = useState(true);
  const [userinp, setUserinp] = useState("");
  const [inputs, setInputs] = useState({});
  const [priority, setPriority] = useState(null);
  const [loadstate, setLoadstate] = useState(false);
  const [showpie, setShowpie] = useState(false);
  const [showSideNavigation, setShowSideNavigation] = useState(false);


  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios
        .post(
          "https://backend.finalyze.app/py/getallcats",
          { removeduplicates },
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
  }, [refresh]);

  const handlechange = (e) => {
    // handle change in the edit form
    // validate its a plain number
    console.log(e.target.value);
    if (e.target.value.match(/^[0-9]+$/)) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  const handleClearInputs = () => {
    setInputs((inputs) =>
      Object.keys(inputs).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {})
    );
  };

  const handleInputChange = (key, value) => {
    setInputs((inputs) => ({
      ...inputs,
      [key]: value,
    }));
    // validate its a plain number and set validated to true for that specific input
    if (value.match(/^[0-9]+$/)) {
      console.log("its a number");
      setValidated(true);
      setValidatedinputs((validatedinputs) => ({
        ...validatedinputs,
        [key]: true,
      }));
    } else {
      console.log("its not a number");
      setValidated(false);
      setValidatedinputs((validatedinputs) => ({
        ...validatedinputs,
        [key]: false,
      }));
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const budget = inputs[e.target.value];
    const cat = categories[e.target.value][3];
    const sttype = categories[e.target.value][5];
    const jwt = localStorage.getItem("jwt");
    console.log(budget, cat, sttype);
    // check that budget is a number
    if (!budget && priority) {
      if (jwt) {
        axios
          .post(
            "https://backend.finalyze.app/py/addbudget",
            { budget, cat, sttype, priority },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          .then((response) => {
            setCategories(response.data);
            handleClearInputs();
            refresh ? setRefresh(false) : setRefresh(true);
            setPriority(null);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    else if (budget && budget.match(/^[0-9]+$/)) {
      // make axios call to update budget
      if (jwt) {
        axios
          .post(
            "https://backend.finalyze.app/py/addbudget",
            { budget, cat, sttype, priority },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          .then((response) => {
            setCategories(response.data);
            handleClearInputs();
            refresh ? setRefresh(false) : setRefresh(true);
            setPriority(null);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      console.log("its not a number");
      alert("You didn't make any change or you didn't enter a valid number");
      return;
    }
  };

  const body = categories.map((cat, i) => {
    if (cat[6]) {
      if (!showpie) {
        setShowpie(true);
      }
    }
    return (
      <tr key={cat[0]}>
        <td>{i + 1}</td>
        <td>{cat[3]}</td>
        <td style={{ "text-transform": "uppercase" }}>{cat[5]}</td>
        <td>
          <div>
            {cat[6] ? (
              <div className="text-success">KES {cat[6]}</div>
            ) : (
              <div className="">
                <Form noValidate>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Write a plain number here, e.g 12000"
                    onChange={(e) => handleInputChange(i, e.target.value)}
                    isValid={validatedinputs[i]}
                    isInvalid={!validatedinputs[i]}
                    value={inputs[i] || ""}
                    className='bg-secondary bg-opacity-50 border-dark text-light'

                  />

                  <Form.Control.Feedback type="invalid">
                    Not a number
                  </Form.Control.Feedback>
                  <Form.Control.Feedback type="valid">
                    Looks good!
                  </Form.Control.Feedback>
                </Form>
              </div>
            )}
          </div>
        </td>
        <td>
          <Form.Select className="item-selector bg-dark border border-secondary border-opacity-50 text-light m-2 w-auto"
            onChange={(e) => setPriority(e.target.value)}
          >
            {cat[7] === 'medium' ? (
              <>
                <option value="medium">{cat[7]}</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </>
            ) : <>{cat[7] === 'high' ? (
              <>
                <option value="high">{cat[7]}</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </>
            ) : (
              <>
                <option value="low">{cat[7]}</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </>
            )}
            </>}

          </Form.Select>
        </td>
        <td className="text-center">
          <Button
            variant="outline-info"
            size="sm"
            className=" mx-3 h-50"
            value={i}
            onClick={handlesubmit}
          >
            Save
          </Button>
        </td>
      </tr>
    );
  });

  const predefinedColors = [
    "rgb(0, 0, 255)",
    "rgb(0, 128, 255)",
    "rgb(0, 191, 255)",
    "rgb(0, 255, 255)",
    "rgb(0, 255, 128)",
    "rgb(0, 255, 0)",
    "rgb(0, 128, 0)",
    "rgb(0, 64, 0)",
    "rgb(128, 255, 0)",
    "rgb(255, 255, 0)",
    "rgb(255, 191, 0)",
    "rgb(255, 128, 0)",
    "rgb(255, 64, 0)",
    "rgb(255, 0, 0)",
    "rgb(191, 0, 0)",
    "rgb(128, 0, 0)",
  ];

  // Function to generate a random color from the predefined colors array
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  };

  const piedata = {
    labels: categories.map((cat) => cat[3]),
    datasets: [
      {
        label: "Budget",
        data: categories.map((cat) => cat[6]),
        backgroundColor: categories.map((cat) => getRandomColor()),
        pointBackgroundColor: "aqua",
        borderWidth: 1,
        borderColor: (context) => context.dataset.backgroundColor,
      },
    ],
    legend: {
      display: false,
    },
  };
  const pieoptions = {
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        fontSize: 30,
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: "#333",
      },
    },
  };

  return (
    <div className="Budget">
      {
        loadstate ? (
          <>

            <div className='top-nav'>
              <div className="site-header">
                <div className="reorder-button">
                  <MdOutlineReorder id="reorder" onClick={() => setShowSideNavigation(true)} />
                </div>
                <div className="app-title">
                  <h1><NavLink to='/'><img src={Logo} alt="" /> Finalyze</NavLink></h1>
                </div>
              </div>
            </div>
            {showSideNavigation ? (
              <Sidebar onClose={() => setShowSideNavigation(false)} />
            ) : null}
            <h5 className="p-3 m-3 bg-dark text-left">
              Here you can build your budget based on your categories. We recommend
              you build your category model first.
            </h5>

            <div className="d-flex content">
              <div className="w-75 table-content">
                <Table striped bordered hover variant="dark" responsive="md">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Category</th>
                      <th>Statement Type</th>
                      <th>Budget Amount</th>
                      <th>Priority</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>{body}</tbody>
                </Table>
                {categories.length > 0 ? null : (
                  <h5 className="text-center text-warning mt-5">
                    Wow such empty! Please create a category first.
                  </h5>
                )}
              </div>
              <div className="flex-grow-1 pie-content">
                <h6 className="p-3 m-3 text-center bg-dark">
                  Total Budget: KES{" "}
                  {categories.reduce((acc, cat) => {
                    if (cat[6]) {
                      return acc + parseInt(cat[6]);
                    } else {
                      return acc;
                    }
                  }, 0)}
                </h6>
                <div className="w-100">
                  {showpie ?
                    <Doughnut
                      data={piedata}
                      options={pieoptions}
                      width={100}
                      height={50}
                    />
                    :
                    <p className="text-center mt-5 fs-5 text-warning">Such emptiness...</p>
                  }
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="position-absolute top-50 start-50 translate-middle">
            <HashLoader color={"#008897"} size={100} />
          </div>
        )}
    </div>
  );
};

export default BudgetBuilder;
