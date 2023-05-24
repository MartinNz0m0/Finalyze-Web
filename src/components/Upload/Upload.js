import React, { useState, createContext, useContext } from "react";
import Statement from "../../components/Statement";
import LoadingSequence from "../../components/LoadingSequence";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProgressBar from "../../components/ProgressBar";
import { UserContext } from "../UserContext";
import './Upload.scss'


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
  const [showhelp, setshowhelp] = useState(false)
  const [loadingstate, setloadingstate] = useState(false)
  const [progress, setProgress] = useState(0);
  const [Color, setColor] = useState("progress-bar bg-info bg-opacity-75");
  const [uploadingpdf, setuploadingpdf] = useState(false)
  const { user, setUser } = useContext(UserContext)
  const [pdfsave, setpdfsave] = useState(false);

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
    setProgress(0)
    if (e.target.files[0].type !== "application/pdf") {
      Setfiletype(true);
    } else {
      Setfiletype(false);
    }
  };

  const onClick = () => {
    const interval = setInterval(() => {
      setProgress(prevProgress => prevProgress + 20);
    }, 500);
    setuploadingpdf(true)
    try {
      const formData = new FormData();

      formData.append("file", uploadfile);

      fetch("http://localhost:8000/api", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())

        .then((result) => {
          var res = JSON.parse(result);
          setTimeout(() => {
            Setfilepath(res.fileinfo);
            Setupload(true);
            var btn = document.querySelector(".inn");
            btn.style.pointerEvents = "auto";
            document.querySelector(".ingine").innerHTML = "";
            clearInterval(interval)
            setProgress(300)
            setColor("progress-bar bg-success bg-opacity-75")
          }, 500);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const btnClick = () => {
    Setdatanotloaded(false);
    setloadingstate(true)
    fetch("http://localhost:8000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileselected, filepath, user, pdfsave }),
    })
      .then((response) => response.json())
      .then((result) => {
        Setdata(result[1]);
        Setpdata(result[0]);
        setloadingstate(false)
        Setdataloaded(true);
      });
  };
  const csvClick = () => {
    Setdatapros(true);
    Setupload(false);
    setuploadingpdf(false)
    Setpwdtrue(false);
    Setprivacy(false);
    axios
      .post(
        "http://localhost:8000/csv",
        { fileselected, filepath, pdfpwd, user },
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
          console.log("successful");
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
  const handleCheckboxChange = (e) => {
    // Do something when the checkbox value changes
    console.log(e.target.checked);
    // set pdf dave to true
    if (e.target.checked) {
      setpdfsave(true)
    }
    else if (!e.target.checked) {
      setpdfsave(false)
    }
  }

  const helppop = (e) => {
    const btn = document.querySelector('.mybtn')
    const sumbua = document.querySelector('.sumbua')
    if (e.target !== sumbua && e.target !== btn) {
      setshowhelp(false)
    }
  }

  window.addEventListener('click', helppop)

  setTimeout(() => {
    if (filetype) {
      document.querySelector(".woi").style.pointerEvents = "none";
    }

  }, 500);

  return (
    <div>
      {datanotloaded && (
        <div className="Upload">
          <div className="header">
            <h2>
              Welcome To Finalyze🚀
            </h2>
            <p>
              Financial Analysis To Track Your Spending
            </p>
          </div>
          <div className="upload-body">
            <h3>
              Parse Your MPESA Statement and View Some Charts
            </h3>
            <h5>
              Upload your PDF Statement and enter your code below👇🏾
            </h5>
          </div>
          <div className="upload-body">
            <div class="upload-button">
              <input
                type="file"
                class="form-control text-light border-secondary"
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
            {uploadingpdf &&
              <div className="prog">
                <ProgressBar percent={progress} color={Color} />
              </div>
            }
            <p className="ingine"></p>
            {upload && (
              <div className="d-flex flex-column">
                <h6 className="text-info text-opacity-50 text-center mb-3">
                  Upload completed successfully
                </h6>
                <h6 className="text-info text-opacity-50 text-center">
                  Enter Your code below👇🏾 and start data processing🏃
                </h6>
              </div>
            )}

            {filetype && (
              <div className="text-danger">
                🚫Wrong filetype. Ensure you upload a PDF file🚫
              </div>
            )}
            <div class="row g-3 align-items-center mb-5 mt-2 ">
              <div class="w-100 d-flex align-items-center form-floating mb-3">
                <input
                  type="text"
                  id="floatingInput"
                  class="pdfpass text-light form-control border-success"
                  value={pdfpwd}
                  placeholder="PDF Code"
                  onChange={(e) => SetPdfpwd(e.target.value)}
                  aria-describedby="passwordHelpInline"
                />
                <label>PDF Code</label>
                <button className="ms-3 mybtn btn btn-submit btn-sm btn-outline-dark" type="submit" onClick={() => setshowhelp(true)}>❔</button>
                {
                  showhelp &&


                  <div className="sumbua position-absolute p-3 ms-5 text-center border border-info rounded border-opacity-25">
                    <button className="close" onClick={() => setshowhelp(false)}>&times;</button>
                    <p className="">
                      Upon the statement request, 'SAFARICOM' sent you a text message. The message has the code for your pdf statement. Input The code sent to your phone by 'SAFARICOM'
                    </p>
                  </div>
                }


              </div>
            </div>

            {user &&
              <div className="mb-3 text-center">
                <p>Your are logged in</p>
                <div class="form-check">
                  <input class="form-check-input bg-secondary btn-outline-secondary" type="checkbox" value="" id="flexCheckDefault" onChange={handleCheckboxChange} />
                  <label class="form-check-label" for="flexCheckDefault">
                    Check this box if you want to save this statement
                  </label>
                </div>

              </div>
            }

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
              <div className="mti d-flex justify-content-center">
                <LoadingSequence />
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
      {loadingstate && (
        <div className="d-flex flex-row position-absolute top-50 start-50 translate-middle">
          <h4 className="load m-1 text-info">Starting Chart Engine...</h4>

          <div class="spinner-grow spinner-grow-sm text-info m-1" role="status">
            <span class="visually-hidden">Loading...</span>
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
