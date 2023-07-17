const SuccessMessageBox = ({ message, showAlert }) => {
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

export default SuccessMessageBox;
