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

  if (message === undefined || !showAlert) {
    return undefined;
  }

  return <div style={successBoxStyle}> Added: {message}</div>;
};


export const FailureAlertMessage = ({ name, showAlert }) => {
  const failureBoxStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (name === undefined || !showAlert) {
    return undefined;
  }

  return <div style={failureBoxStyle}> Information of {name} has already been removed from server </div>;

}
