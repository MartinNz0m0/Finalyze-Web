import React from "react";
import home from '../home.png'

const Howto = () => {
  return (
    <div className="">
      <h3 className="text-center p-5 bg-success">How to use Mpesa Insights🚀</h3>
      <div>
        <div className="d-flex inline-flex mt-5">
<div>

      <h3 className="ms-5 m-5">Uploading a Statement</h3>
      <ul className="ms-5 m-5">
  <li>Open the MPESA Insights app.</li>
  <li>Click on the "Choose File" button and select your MPESA statement in PDF format.</li>
  <li>Click on the "Upload" button to upload your statement.</li>
  <li>Wait for the app to process your statement. You should see a message indicating that the app is uploading your file.</li>
  <li>Once the app has finished processing your statement, you should see a message indicating that the file has been uploaded successfully.</li>
</ul>
</div>
<img src={home} alt='home' className="picha"/>
        </div>
<h3 className="ms-5 m-5">Start Data Processing</h3>
      <ul className="ms-5 m-5"> 
  <li>Enter the password for your statement in the "Code sent to your phone" input field.</li>
  <li>Click on the "Start Data Processing" button to start the conversion process.</li>
  <li>Wait for the app to convert your statement to CSV format.</li>
  <li>Once the conversion process has finished, you should see a message indicating that the conversion was successful.</li>
</ul>
      <h3 className="ms-5 m-5">Viewing Charts</h3>
      <ul className="ms-5 m-5">
  <li>Click on the "SHOW ME THE MONEY💸" button to view the charts generated from your MPESA statement.</li>
  <li>Wait for the app to process your statement and generate the charts.</li>
  <li>Once the charts have been generated, you should see them displayed on the page.</li>
</ul>
     
    </div>
    </div>
  );
};

export default Howto;
