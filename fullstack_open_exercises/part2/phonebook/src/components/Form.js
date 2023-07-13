const Form = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onAddContact,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={onNameChange} />
        <br />
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onAddContact}>
          add
        </button>
      </div>
    </form>
  );
};

export default Form