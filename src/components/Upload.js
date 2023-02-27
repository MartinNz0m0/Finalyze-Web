import React, { useState, createContext } from "react";
import Statement from "./Statement";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Upload = () => {
  const [uploadfile, SetUploadfile] = useState(null);
  const [fileselected, SetFileselected] = useState();
  const [pdfpwd, SetPdfpwd] = useState("");
  const [filepath, Setfilepath] = useState("");
  const [pwdtrue, Setpwdtrue] = useState(false);
  const [csvcon, Setcsvcon] = useState(false);
  const [dataloaded, Setdataloaded] = useState(false);
  const [datanotloaded, Setdatanotloaded] = useState(true);
  const [data, Setdata] = useState([]);
  const [pdata, Setpdata] = useState([]);
  const [upload, Setupload] = useState(false);
  const [filetype, Setfiletype] = useState(false);
  const [datapros, Setdatapros] = useState(false);
  const [privacy, Setprivacy] = useState(true);

  const onChange = (e) => {
    if (e.target.files[0]) {
      document.querySelector(".woi").style.pointerEvents = "auto";
    }
    SetUploadfile(e.target.files[0]);
    console.log(e.target.files[0]);
    SetFileselected(e.target.files[0].name);
    Setdataloaded(false);
    Setupload(false);
    Setcsvcon(false);
    if (e.target.files[0].type !== "application/pdf") {
      console.log(e.target.files[0].type);
      Setfiletype(true);
    } else {
      Setfiletype(false);
    }
  };

  const onClick = () => {
    document.querySelector(".ingine").innerHTML = "Uploading your File...";
    try {
      const formData = new FormData();

      formData.append("file", uploadfile);

      fetch("http://192.168.3.79:8000/api", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        // if (response.status === 400) {

        //   Setfiletype(true)
        // } else {
        //   Setfiletype(false)
        //   // Setupload(true)
        // })
        .then((result) => {
          var res = JSON.parse(result);
          setTimeout(() => {
            Setfilepath(res.fileinfo);
            Setupload(true);
            var btn = document.querySelector(".inn");
            btn.style.pointerEvents = "auto";
            document.querySelector(".ingine").innerHTML = "";
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const btnClick = () => {
    fetch("http://192.168.3.79:8000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileselected, filepath }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result[0]);
        Setdata(result[1]);
        Setpdata(result[0]);
        Setdataloaded(true);
        Setdatanotloaded(false);
      });
  };
  const csvClick = () => {
    Setdatapros(true);
    Setupload(false);
    Setpwdtrue(false);
    Setprivacy(false);
    axios
      .post(
        "http://192.168.3.79:8000/csv",
        { fileselected, filepath, pdfpwd },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.data.code === 1 || response.data.code === 2) {
          console.log("wrong pass");
          Setpwdtrue(true);
          Setdatapros(false);
        }
        var trures = response.data;
        var f = JSON.parse(trures);
        if (f.s === "Success") {
          console.log("conversion successful");
          Setcsvcon(true);
          Setpwdtrue(false);
          Setdatapros(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRefresh = () => {
    Setdataloaded(false)
    Setdatanotloaded(true)
    Setcsvcon(false)
    document.getElementsByClassName('.pdfpass').value = ""
    SetPdfpwd("")
    Setprivacy(true)
  }

  setTimeout(() => {
    if (filetype) {
      document.querySelector(".woi").style.pointerEvents = "none";
    }
    // } else if (!filetype) {
    //   document.querySelector('.woi').style.pointerEvents = 'auto'
    // }
  }, 1000);

  return (
    <div>
      {datanotloaded && (
        <div className="d-flex flex-column h-100 align-items-center">
          <h1 className="text-center bg-success bg-opacity-75 p-5 w-100">
            Welcome To MPESA Insights🚀
          </h1>
          <h3 className="mt-5 text-center">
            Parse Your MPESA Statement and View Some Charts
          </h3>
          <h5 className="mt-5 text-center">
            Upload your PDF Statement and enter your code below👇🏾
          </h5>
          {/* Upload
      <input type="file" name="file" onChange={onChange} />
      <button type="submit" className="btn btn-submit btn-lg" onClick={onClick}>
        {" "}
        Upload
      </button> */}
          <div className="w-50 d-flex flex-column align-items-center">
            <div class="fujo input-group bg-dark mb-5 mt-5">
              <input
                type="file"
                class="form-control bg-dark text-light border-secondary"
                id="inputGroupFile04"
                aria-describedby="inputGroupFileAddon04"
                aria-label="Upload"
                onChange={onChange}
              />
              <button
                class="woi btn btn-outline-secondary bg-success text-light"
                type="button"
                id="inputGroupFileAddon04"
                onClick={onClick}
                style={{ pointerEvents: "none" }}
              >
                Upload
              </button>
            </div>
            <p className="ingine"></p>
            {upload && (
              <h4 className="text-success text-center">
                Upload completed successfully <br />
                Enter Your code below👇🏾 and start data processing🏃
              </h4>
            )}

            {filetype && (
              <div className="text-danger">
                🚫Wrong filetype. Ensure you upload a PDF file🚫
              </div>
            )}
            <div class="row g-3 align-items-center mb-5 mt-2 ">
              <div class="col-auto">
                <input
                  type="text"
                  id="floatingInput"
                  class="pdfpass form-control bg-dark text-light border-success"
                  value={pdfpwd}
                  onChange={(e) => SetPdfpwd(e.target.value)}
                  aria-describedby="passwordHelpInline"
                  placeholder="Code sent to your phone"
                />
              </div>
            </div>
            <button
              type="submit"
              className="inn btn btn-submit btn-bg btn-outline-warning mb-4 mt-2 "
              onClick={csvClick}
              style={{ pointerEvents: "none" }}
            >
              Start Data Processing💨
            </button>
            {privacy && (
              <div className="kuja d-flex flex-row justify-content-evenly mt-3">
                <button className="btn btn-submit btn-bg btn-outline-info m-3">
                  <Link to="/privacy" class="nav-link">
                    Privacy Concerns?
                  </Link>
                </button>
                <button className="btn btn-submit btn-bg btn-outline-info m-3">
                  <Link class='nav-link' to='/howto'>

                    How to use the app
                  </Link>
                </button>
              </div>
            )}
            {datapros && (
              <div className="mti">
                <h4 className="text-info text-center mt-3 mb-3">
                  Processing your data...
                </h4>
                <div class="progress">
                  <div
                    class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                    role="progressbar"
                    aria-label="Animated striped example"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style={{ width: 400 }}
                  ></div>
                </div>
              </div>
            )}
            <div className="kiti">
              {pwdtrue && (
                <h4 className="text-danger">
                  🚫Wrong Code, please use code sent to your phone by
                  Safaricom🚫
                </h4>
              )}

              {csvcon && (
                <div className="d-flex flex-column justify-content-center m-3">
                  <h4 className="text-success mb-4">
                    File Processing Complete🤸
                  </h4>
                  <button
                    type="submit"
                    className="btn btn-submit btn-lg btn-outline-info ms-3"
                    onClick={btnClick}
                  >
                    SHOW ME THE MONEY💸
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {dataloaded && (

        <div>
         
          <Statement data={data} pdata={pdata} refresh={handleRefresh} />
        </div>
      )}
    </div>
  );
};

export default Upload;
