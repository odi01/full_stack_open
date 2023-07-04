import { useState } from "react";

const Form = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
        <br />
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={addPerson}>
          add
        </button>
      </div>
    </form>
  );
};

const Phonebook = ({ phonebook }) => {
  return (
    <table>
      <tbody>
        {phonebook.map((contact) => (
          <tr key={contact.id}>
            <td>
              {contact.name} {contact.number}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const initialPhonebook = [
    { id: 1, name: "Arto Hellas", number: "040-123456" },
    { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
    { id: 3, name: "Dan Abramov", number: "12-43-234345" },
    { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
  ];
  const [phonebook, setPhonebook] = useState(initialPhonebook);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const isEntryExist = (name, number) => {
    return phonebook.some(
      (entry) => entry.name === name || entry.number === number
    );
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (isEntryExist(newName, newNumber)) {
      alert("Entry already exists in the phonebook");
    } else {
      const newEntry = { name: newName, number: newNumber };
      setPhonebook(phonebook.concat(newEntry));
      setNewName("");
      setNewNumber("");
    }
  };

  const filterKeywordMatch = (keyword) => {
    return initialPhonebook.filter((contact) =>
      contact.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleKeyword = (event) => {
    const keyword = event.target.value;
    setFilterKeyword(keyword);
    if (keyword === "") {
      setPhonebook(initialPhonebook);
    } else {
      const matches = filterKeywordMatch(keyword);

      if (matches.length === 0) {
        setPhonebook([]);
      } else {
        setPhonebook(matches);
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter shown with:{" "}
          <input value={filterKeyword} onChange={handleKeyword} />
        </div>
      </form>
      <h2>Add New</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Phonebook phonebook={phonebook} />
    </div>
  );
};

export default App;
