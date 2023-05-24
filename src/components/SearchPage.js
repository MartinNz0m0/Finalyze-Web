import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import HashLoader from "react-spinners/HashLoader";

const Result = (item) => {
  return (
    <tr>
      <td>{item["Receipt No"]}</td>
      <td>{item.Details}</td>
      <td>{item["Completion Time"]}</td>
      <td>{item["Withdrawn"]}</td>
      <td>{item["Paid In"]}</td>
      <td>{item["Transaction Status"]}</td>
      <td>Rafa</td>
    </tr>
  );
};

const SearchPage = ({ searchText, stttype }) => {
  console.log(stttype);
  const title = `You are seaching for '${searchText}'`;
  const query = searchText;
  const [sttype, setSttype] = useState("mpesa");
  console.log(query, stttype);
  // make api call to get search results
  const [searchResults, setSearchResults] = useState([]);
  const [resultsFound, setResultsFound] = useState(false);
  const [loadstate, setLoadstate] = useState(false);

  useEffect(() => {
    setSttype(stttype);
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios
        .post(
          "http://localhost:8001/search",
          { query, stttype },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((response) => {
          if (response.data.length > 0) {
            setSearchResults(response.data.flat(1));
            setResultsFound(true);
            setLoadstate(true);
          }
        });
    }
  }, [searchText, stttype]);
  const final = searchResults.map((item) => {
    if (stttype === "mpesa") {
      return (
        <tr>
          <td>{item["Receipt No."]}</td>
          <td>{item.Details}</td>
          <td>{item["Completion Time"]}</td>
          <td>{item["Withdrawn"]}</td>
          <td>{item["Paid In"]}</td>
          <td>{item["Transaction Status"]}</td>
        </tr>
      );
    } else if (stttype === "coop") {
      return (
        <tr>
          <td>{item["Ref"]}</td>
          <td>{item.Details}</td>
          <td>{item["Date"]}</td>
          <td>{item["Debit"]}</td>
          <td>{item["Credit"]}</td>
        </tr>
      );
    } else if (stttype === "equity") {
      return (
        <tr>
          <td>{item["Details"]}</td>
          <td>{item["Value Date"]}</td>
          <td>{item["Debit"]}</td>
          <td>{item["Credit"]}</td>
        </tr>
      );
    }
  });
  const header = () => {
    if (stttype === "mpesa") {
      return (
        <thead>
          <tr>
            <th>Receipt No.</th>
            <th>Details</th>
            <th>Completion Time</th>
            <th>Withdrawn</th>
            <th>Paid In</th>
            <th>Transaction Status</th>
          </tr>
        </thead>
      );
    } else if (stttype === "coop") {
      return (
        <thead>
          <tr>
            <th>Receipt No.</th>
            <th>Details</th>
            <th>Completion Time</th>
            <th>Withdrawn</th>
            <th>Paid In</th>
          </tr>
        </thead>
      );
    } else if (stttype === "equity") {
      return (
        <thead>
          <tr>
            <th>Details</th>
            <th>Completion Time</th>
            <th>Withdrawn</th>
            <th>Paid In</th>
          </tr>
        </thead>
      );
    }
  };

  return (
    <div className="w-100">
      <h5 className="bg-dark text-info p-2 m-3">{title}</h5>
      <>
      {loadstate ? (
        <>
        {resultsFound ? (
          <div className="mx-3">
            <Table striped bordered hover variant="dark" responsive="md">
              {header()}
              <tbody>{final}</tbody>
            </Table>
          </div>
        ) : (
          "No results found"
        )}
        </>
      ) : (
        <div className="position-relative d-flex justify-content-center my-5">
        <HashLoader color={"#008897"} size={50} />
        </div>
      )
      }
      </>
    </div>
  );
};

export default SearchPage;
