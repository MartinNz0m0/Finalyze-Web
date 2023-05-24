import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from "../../components/UserContext";
import axios from 'axios';
import Statement from '../../components/Statement';



const UserDashboard = ({ jibu }) => {
  const { user, setUser } = useContext(UserContext)
  const [sndata, setSndata] = useState([]);
  const [showdata, setshowdata] = useState(false);


  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: 'loading...',
      statement: 'Statement 1',
      date: 'loading...',
      uploaded: 'loading...',
      pdf_name: 'loading...'
    }
  ]);
  useEffect(() => {
    setTimeout(() => {

      if (jibu) {
        setCardData(jibu)
      } else if (!jibu) {
        //make api call to get data
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
          // user has token, make api call
          axios.post("http://localhost:8000/dash", {} , {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${jwt}`
            },
          })
            .then((response) => {
              setCardData(response.data)
            })
        }
        else {
          // user has no token, redirect to login
          window.location.href = '/login'
        }
      }

    }, 200);
  }, [])



  const handleApiCall = (e) => {
    let k = e.target.value
    let pdf_name = cardData[k].pdf_name
    let pdata = JSON.parse(cardData[k].piedata)
    const jwt = localStorage.getItem('jwt');
    console.log(k, cardData[k])
    // setshowdata(true)
    axios.post('http://localhost:8000/retrieve', { pdf_name }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
    })
      .then(response => {
        console.log(response.data)
        if (response.status === 200) {
          setshowdata(true)
          sndata.push(response.data[0], response.data[1])

        } else {
          alert('No data found')
        }
      })
      .catch(error => console.log(error));
  }

  const handleRefresh = () => {
    setshowdata(false)
    setSndata([])
  }

  return (
    <>
      {showdata ?
        <Statement data={sndata[1]} pdata={sndata[0]} refresh={handleRefresh} />
        :

        <div className="container text-center">
          <h1>User Dashboard</h1>
          <div className="row">
            {cardData.map((card, i) => (
              <div className="col-md-4 mt-3" key={i}>
                <div className="card bg-dark text-white">
                  <div className="card-body">
                    <h5 className="card-title">{card.pdf_name.split("_")[0]} {card.pdf_name.split("_")[1]}</h5>
                    {/* <h6 className="card-subtitle mb-2 text-muted">{card.statement}</h6> */}
                    <p className="card-text">Date: {card.date}</p>
                    <p className="card-text">Uploaded: {card.date_uploaded}</p>
                    <button className="btn btn-primary" onClick={handleApiCall} value={i} key={i}>View Charts</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-secondary mt-5">
            <Link to='/' className='nav-link'>

              Upload a Statement
            </Link>
          </button>
        </div>
      }

    </>
  );
};

export default UserDashboard;
