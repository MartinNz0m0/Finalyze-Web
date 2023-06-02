import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

const LoginSuccessAlert = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Alert show={show} variant="success">
        <Alert.Heading>Success!</Alert.Heading>
        <p>Looks like you've got the right credentials, you're in!</p>
      </Alert>
    </div>
  );
};

const FailedLoginAlert = () => {
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div>
      <Alert show={visible} variant="danger" key={visible}>
        <Alert.Heading>You shall not pass!</Alert.Heading>
        <p>Your login attempt was unsuccessful. Let's try that again</p>
      </Alert>
    </div>
  );
};

const FailedataloadAlert = () => {
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div>
      <Alert show={visible} variant="danger" key={visible}>
        <Alert.Heading>Something went wrong!</Alert.Heading>
        <p>Your data could not be loaded. Please try again</p>
      </Alert>
    </div>
  );
};

const FormSubmitSuccessAlert = () => {
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div>
      <Alert show={visible} variant="success" key={visible}>
        <Alert.Heading>Success!</Alert.Heading>
        <p>Everything went well, category added</p>
      </Alert>
    </div>
  );
};

const DeleteSuccessAlert = () => {
  const [show, setShow] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div>
      <Alert show={visible} variant="success" key={visible}>
        <Alert.Heading>Success!</Alert.Heading>
        <p>Everything went well, category deleted</p>
      </Alert>
    </div>
  );
};

const NoStatementAlert = () => {
  return (
    <div>
      <Alert show variant="secondary" className="w-25 bg-opacity-25">
        <Alert.Heading>No Statements Found</Alert.Heading>
        <p>You can upload a statement in the menu section. Try it out with last month's statement to get started</p>
      </Alert>
    </div>
  );
};


export default LoginSuccessAlert;
export { FailedLoginAlert };
export { FailedataloadAlert };
export { FormSubmitSuccessAlert };
export { DeleteSuccessAlert };
export {NoStatementAlert}