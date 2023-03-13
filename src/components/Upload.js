import React, { useState, createContext } from "react";
import Statement from "./Statement";
import LoadingSequence from "./LoadingSequence";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProgressBar from "./ProgressBar";

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

      fetch("https://backend.finalyze.app/api", {
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
          alert(err);
        });
    } catch (error) {
      alert(error);
    }
  };

  const btnClick = () => {
    Setdatanotloaded(false);
    setloadingstate(true)
    fetch("https://backend.finalyze.app/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileselected, filepath }),
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
        "https://backend.finalyze.app/csv",
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
          console.log("successful");
          Setcsvcon(true);
          Setpwdtrue(false);
          Setdatapros(false);
        }
      })
      .catch((err) => {
        alert(err);
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
        <div className="d-flex flex-column h-100 align-items-center">
          <div className="text-center bg-info bg-gradient bg-opacity-50 p-4 w-100">
            <h2>
              Welcome To Finalyze🚀
            </h2>
            <p>
              Financial Analysis To Track Your Spending
            </p>
          </div>
          <h3 className="mt-5 text-center">
            Parse Your MPESA Statement and View Some Charts
          </h3>
          <h5 className="mt-5 text-center">
            Upload your PDF Statement and enter your code below👇🏾
          </h5>
          <div className="w-50 d-flex flex-column justify-content-center align-items-center">
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
                  class="pdfpass form-control bg-dark text-light border-success"
                  value={pdfpwd}
                  onChange={(e) => SetPdfpwd(e.target.value)}
                  aria-describedby="passwordHelpInline"
                />
                <label for="floatingInput">PDF code</label>
                <button className="ms-3 mybtn btn btn-submit btn-sm btn-outline-dark" type="submit" onClick={() => setshowhelp(true)}>❔</button>
                {
                  showhelp &&


                  <div className="sumbua position-absolute p-3 ms-5 text-center border border-info rounded border-opacity-25">
                    <button className="clos position-absolute h-25 top-0 end-0 fs-4 btn btn-sm" onClick={() => setshowhelp(false)}>&times;</button>
                    <p className="">
                      Upon the statement request, 'SAFARICOM' sent you a text message. The message has the code for your pdf statement. Input The code sent to your phone by 'SAFARICOM'

                    </p>
                  </div>
                }


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
