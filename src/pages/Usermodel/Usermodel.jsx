import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { FormSubmitSuccessAlert } from '../../components/Alerts';
import HashLoader from 'react-spinners/HashLoader';
import './Usermodel.scss'
import Sidebar from '../../components/Sidebar/Sidebar';
import { MdOutlineReorder } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.png'



const UserModel = () => {
  const history = useHistory();
  const [details, setdetails] = useState([])
  const [userinput, setuserinput] = useState('')
  const [refresh, setrefresh] = useState(false)
  const [itemnumber, setitemnumber] = useState(3)
  const [inputs, setInputs] = useState({});
  const [stttype, setstttype] = useState('mpesa')
  const [formsuccessalert, setformsuccessalert] = useState(false)
  const [loadstate, setLoadstate] = useState(false);
  const [showSideNavigation, setShowSideNavigation] = useState(false);

  useEffect(() => {
    axios.post('https://backend.finalyze.app/py/usermodel', { itemnumber, stttype }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then((response) => {
        if (stttype === 'mpesa') {
          setdetails(response.data.flat(1))
          console.log(response.data.flat(1))
        }
        else if (stttype === 'coop') {
          setdetails(response.data)
        }
        else if (stttype === 'equity') {
          setdetails(response.data)
        }
        setLoadstate(true);

      })
  }, [refresh, itemnumber, stttype])

  const handleClearInputs = () => {
    setInputs((inputs) =>
      Object.keys(inputs).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {})
    );
  };


  const handlesubmit = (e, i) => {
    // send data to server
    e.preventDefault();
    let key = i
    // const key = e.target.getAttribute('data-key');
    setformsuccessalert(false)
    console.log(inputs[i], details[i], e.currentTarget)
    const det = details[i]
    axios.post('https://backend.finalyze.app/py/usersubmit', { userinput: inputs[key], det, stttype }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
    })
      .then((response) => {
        if (response.status === 400 || response.status === 500) {
          console.log('error')
        }
        else if (response.status === 200) {
          console.log('success')
          setformsuccessalert(true)
        }
        setrefresh(!refresh)
        handleClearInputs()
      })

  }


  const InputGroup = ({ details, key }) => {
    return (
      <Form>
        <Form.Group as={Row} className="mb-3 text-light" controlId="formPlaintext">
          <Col sm="10">
            <Form.Control plaintext readOnly defaultValue={details} key={key} className='text-light' />
          </Col>
        </Form.Group>

      </Form>
    );
  }
  const handleInputChange = (key, value) => {
    setInputs((inputs) => ({
      ...inputs,
      [key]: value,
    }));
  };

  const final = details.map((item, i) => {
    const key = i.toString();
    return (

      <tr>
        <td><p className='d-flex align-items-center justify-content-center m-0'>{i + 1}</p></td>
        <td> <p className='d-flex align-items-center justify-content-left mb-0' key={key}>{item}</p></td>
        {/* <td> <InputGroup details={item} key={key} /></td> */}

        <td>
          <Form onSubmit={(e) => handlesubmit(e, i)} id='form'>
            <Form.Group as={Row} className="d-flex align-items-center" controlId={`category-${key}`}>
              <Col sm="10">
                <Form.Control
                  type="text"
                  className='bg-secondary bg-opacity-50 border-dark text-light'
                  placeholder="Category"
                  value={inputs[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </Col>
            </Form.Group>
          </Form>
        </td>
        <td><Button onClick={(e) => handlesubmit(e, i)} value={key} variant='outline-success'>Done</Button></td>
      </tr>

    )
  })

  const handleitemchange = (e) => {
    setitemnumber(e.target.value)
  }
  // handle change for statement selector
  const handlesttchange = (e) => {
    if (e.target.value === '1') {
      setstttype('mpesa')
    }
    else if (e.target.value === '2') {
      setstttype('coop')
    }
    else if (e.target.value === '3') {
      setstttype('equity')
    }
  }

  return (
    <div>

      {loadstate ?
        (

          <div className='Usermodel'>
            <div className='top-nav'>
              <div className="site-header">
                <div className="reorder-button">
                  <MdOutlineReorder id="reorder" onClick={() => setShowSideNavigation(true)} />
                </div>
                <div className="app-title">
                  <h1><NavLink to='/'><img src={Logo} alt="" /> Finalyze</NavLink></h1>
                </div>
              </div>
              <div className='source-sel'>
                <p>
                  Statement Source:
                </p>
                <select onChange={handlesttchange}>
                  <option value="1">M-pesa</option>
                  <option value="2">Cooperative</option>
                  <option value="3">Equity</option>
                </select>
              </div>
            </div>
            {
              showSideNavigation ?
                <Sidebar onClose={() => setShowSideNavigation(false)} />
                :
                null
            }
            {
              formsuccessalert ?
                <div className='position-fixed top-0 end-0 m-5'>
                  <FormSubmitSuccessAlert visible={formsuccessalert} />
                </div>
                :
                null
            }
            <div className='top-text'>
              <p>
                Seeing too much nonsense?
                You are seeing transcations that appeared at least
                <select onChange={handleitemchange}>
                  <option value="3">3</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                times in each statement. Increase the number to see less.
              </p>

            </div>
            <div className='text-center m-3'>
              <Table striped bordered hover variant="dark" responsive="md">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Transcation Details</th>
                    <th>Category</th>
                    <th>Submit</th>
                  </tr>
                </thead>
                <tbody>
                  {final}
                </tbody>
              </Table>
            </div>
          </div>
        ) :
        (
          <div className="position-absolute top-50 start-50 translate-middle">
            <HashLoader color={"#008897"} size={100} />
          </div>
        )
      }
    </div >
  )
}

export default UserModel;