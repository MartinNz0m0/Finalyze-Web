import { Link } from "react-router-dom/cjs/react-router-dom.min";

const AboutView = () => {
  return (
    <div>
      <div className="text-center">
        <h3 className="ttl text-center bg-success bg-opacity-75 p-5 w-100">
          Data Management in M-Pesa Insights🚀
        </h3>
        <h5 className="text-center p-4">
          Step 1: After clicking uploading in the upload file section, your PDF
          statement is sent to the server for processing🏃
        </h5>
       <h1 className="text-center">⬇</h1>
        <h5 className="text-center p-4">
          Step 2: When you click 'start data processing', your code is used to
          unlock the statement.
        </h5>
        <h1 className="text-center">⬇</h1>

        <h5 className="text-center p-4">
          Step 3: The server converts your pdf to a csv with readable data and
          alerts you when the process is completed
        </h5>
        <h1 className="text-center">⬇</h1>

        <h5 className="text-center p-4">
          Step 4: When you click 'Show me the money' data is read from the csv
          file in the server and sent to the client (you). When the server
          confirms data reading is successful, it deletes all your files (csv
          and pdf)
        </h5>
        <h1 className="text-center">⬇</h1>

        <h5 className="text-center p-4">
          Final step: You are now viewing your data in graphs and the data only
          exists on your device (and maybe device/browser cache). When you leave
          the tab you data is no longer existent, if you want to view you charts
          again, you'll have to upload your statement again.
        </h5>
        <button className="pbut btn btn-submit btn-lg btn-outline-warning">
          <Link className="nav-link" to='/'>
          I'm ready to upload!!
          </Link>
        </button>
      </div>
    </div>
  );
};

export default AboutView;
