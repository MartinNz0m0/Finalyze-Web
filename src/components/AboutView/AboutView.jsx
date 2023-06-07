import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './AboutView.scss'
import Navbar from "../Navbar/Navbar";

const AboutView = () => {
  return (
    <div className="About-view">
      <Navbar />
      <h3 className="ttl">
        Data Management in Finalyze🚀
      </h3>
      <div className="privacy-body">
        <h4>
          Privacy Policy
        </h4>
        <p >
          Thank you for using Finalyze🚀. We understand that your privacy is important to you and we are committed to protecting your personal data. This Privacy Policy outlines how we manage and process your data when you use our service.
        </p>
        <h4>
          Data Management
        </h4>
        <p >
          When you upload your PDF statement, it is sent to our server for processing. Your file is stored securely and is only accessible to authorized personnel. We do not share your data with any third parties.
        </p>
        <h4>
          Data Processing
        </h4>
        <p >
          When you click 'start data processing', your code is used to unlock the statement. The server converts your PDF to a CSV file with readable data and alerts you when the process is completed. When you click 'Show me the money', data is read from the CSV file in the server and sent to you. When the server confirms data reading is successful, it deletes all your files (CSV and PDF).
        </p>
        <h4>
          Data Retention
        </h4>

        <p >
          The data only exists on your device. When you leave the tab, your data is no longer existent, and if you want to view your charts again, you'll have to upload your statement again.
        </p>
        <h4>
          Security
        </h4>
        <p >
          We take appropriate measures to ensure the security of your personal data. We use industry-standard security technologies and procedures to protect your data from unauthorized access, use, or disclosure.
        </p>
        <h4>
          Changes to Privacy Policy
        </h4>
        <p >
          We reserve the right to modify or update this Privacy Policy at any time. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your data        </p>
        <h4>
          Contact Us
        </h4>
        <p >
          If you have any questions or concerns about our Privacy Policy, please contact us at [insert contact information].
        </p>
        <Link className="nav-link" to='/upload'>
          I'm ready to upload!!
        </Link>

      </div>
    </div>
  );
};

export default AboutView;
