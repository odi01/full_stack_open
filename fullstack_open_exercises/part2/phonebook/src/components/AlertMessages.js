export const SuccessAlertMessage = ({ message, showAlert }) => {
  const successBoxStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  console.log("succes msg value", message);
  console.log("succes showalert", showAlert);
  if (message === undefined || !showAlert) {
    return undefined;
  }

  return <div style={successBoxStyle}> Added: {message}</div>;
};

export const FailureAlertMsg = ({ msg, showAlert }) => {
  const failureBoxStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (msg === undefined || !showAlert) {
    return undefined;
  }

  return <div style={failureBoxStyle}> {msg} </div>;
};
