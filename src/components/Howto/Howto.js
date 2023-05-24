import React from "react";
import home from '../../images/home.png';
import fuliza from '../../images/fuliza.png';
import insights from '../../images/insights.png'
import line from '../../images/line.png'
import paidin from '../../images/paidin.png'
import pbill from '../../images/pbill.png'
import processing from '../../images/processing.png'
import sent from '../../images/sent.png'
import summary from '../../images/summary.png'
import till from '../../images/till.png'
import uploading from '../../images/uploading.png'
import viewchart from '../../images/viewchart.png'
import { Link } from "react-router-dom";
import './Howto.scss'


const Howto = () => {
  return (
    <div className="Howto">
      <div className="top">
        <div className="banner">
          <button className="btn btn-submit btn-sm bg-success text-light">
            <Link class='nav-link' to='/'>

              ⏪ Back to Home
            </Link>
          </button>
          <h3 className="text-center flex-grow-1 me-5">How to use Finalyze🚀</h3>
        </div>
        <div class="howcard">
          <div class="howcard-body">
            <div class="left">
              <div class="card-body">
                <h5 class="card-title text-success">Requesting an M-PESA Statement</h5>
                <ul className="ms-5 m-5">
                  <li>Dial *334# on your Safaricom line.</li>
                  <li>Select "My M-PESA Account" from the menu options and press "Reply" or "Send."</li>
                  <li>Select "M-PESA Statement" from the next menu options and press "Reply" or "Send."</li>
                  <li>Select the time period for the statement you want to request. You can choose to view the last 3, 6 or 12 months or select a custom range by selecting "Full Statement." Press "Reply" or "Send" to continue.</li>
                  <li>Enter your email address where you want to receive the statement and press "Reply" or "Send" to continue.</li>
                  <li>You will be prompted to confirm your email address. Check that the information is correct and press "Reply" or "Send" to confirm.</li>
                  <li>You will receive a message from Safaricom with your M-PESA statement details. The statement will be sent as a PDF attachment to the message.</li>
                </ul>
              </div>
            </div>
            <div class="right">
              <img src={home} class="img-fluid " alt="..." />
            </div>
          </div>
        </div>
        <div>
          <div class="howcard">
            <div class="howcard-body">
              <div class="left">
                <div class="card-body">
                  <h5 class="card-title text-success">Uploading a Statement</h5>
                  <ul className="ms-5 m-5">
                    <li>Open the Finalyze app.</li>
                    <li>Click on the "Choose File" button and select your MPESA statement in PDF format.</li>
                    <li>Click on the "Upload" button to upload your statement.</li>
                    <li>Wait for the app to process your statement. You should see a message indicating that the app is uploading your file.</li>
                    <li>Once the app has finished processing your statement, you should see a message indicating that the file has been uploaded successfully.</li></ul>
                </div>
              </div>
              <div class="right">
                <img src={uploading} class="img-fluid " alt="..." />
              </div>
            </div>
          </div>
          <div class="howcard">
            <div class="howcard-body">
              <div class="left">
                <div class="card-body">
                  <h5 class="card-title text-success">Start Data Processing</h5>
                  <ul className="ms-5 m-5">
                    <li>Enter the password for your statement in the "Code sent to your phone" input field.</li>
                    <li>Click on the "Start Data Processing" button to start the conversion process.</li>
                    <li>Wait for the app to convert your statement to CSV format.</li>
                    <li>Once the conversion process has finished, you should see a message indicating that the conversion was successful.</li>
                  </ul>
                </div>
              </div>
              <div class="right">
                <img src={processing} class="img-fluid " alt="..." />
              </div>
            </div>
          </div>
          <div class="howcard">
            <div class="howcard-body">
              <div class="left">
                <div class="card-body">
                  <h5 class="card-title text-success">Viewing Charts</h5>
                  <ul className="ms-5 m-5">
                    <li>Click on the "SHOW ME THE MONEY💸" button to view the charts generated from your MPESA statement.</li>
                    <li>Wait for the app to process your statement and generate the charts.</li>
                    <li>Once the charts have been generated, you should see them displayed on the page.</li>
                  </ul>
                </div>
              </div>
              <div class="right">
                <img src={viewchart} class="img-fluid " alt="..." />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <h3>How to Interpret the Charts</h3>
        <div class="charts-body">
          <div class="chart">
            <div class="cards">
              <img src={insights} class="img-fluid " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Insights (Cards)</h5>
                <p class="card-text">The Insights section consists of four cards that provide a summary of your financial activity over the statement period.</p>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="cards">
              <img src={sent} class="img-fluid " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Who Have You Sent Money to? (Bar chart)</h5>
                <p class="card-text">This bar chart shows the people that you have sent money to.</p>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="cards">
              <img src={till} class="img-fluid " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Which Till Number Have you paid the most? (Bar chart)</h5>
                <p class="card-text">This bar chart shows the Till numbers that you have paid the most.</p>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="cards">
              <img src={pbill} class="img-fluid " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Which Pay Bill Number Have you paid the most? (Bar chart)</h5>
                <p class="card-text">This bar chart shows the Pay Bill numbers that you have paid the most.</p>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="cards">
              <img src={paidin} class="img-fluid " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Who has sent you money (Doughnut charts)</h5>
                <p class="card-text">The two doughnut charts show the people or accounts that have sent you money. The first doughnut chart shows the top senders (people) while the second chart shows the business payment senders (Bank transfers to mpesa etc..)</p>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="cards">
              <img src={line} class="img-fluid " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Balance Outlook (Line chart)</h5>
                <p class="card-text">This line chart shows the balance outlook of your account over time. If the statement period is less than 24 months, the last 12 months are considered for the chart. If you have uploaded a two-year statement, the graphs will compare the balance outlook for the two years.</p>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="cards">
              <img src={summary} class="img-fluid " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Transaction Summary (Doughnut chart)</h5>
                <p class="card-text">This doughnut chart summarizes the types of transactions in your account.</p>
              </div>
            </div>
          </div>
          <div class="chart">
            <div class="cards">
              <img src={fuliza} class="img-fluid " alt="..." />
              <div class="card-body">
                <h5 class="card-title">Transactions done without Fuliza vs Fuliza Transactions (Doughnut chart)</h5>
                <p class="card-text">This doughnut chart shows the breakdown of your transactions into those done without using Fuliza and those done using Fuliza.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howto;
