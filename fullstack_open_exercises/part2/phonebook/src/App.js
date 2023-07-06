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

const FilterPhonebook = ({ filterKeyword, handleKeyword }) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input value={filterKeyword} onChange={handleKeyword} />
      </div>
    </form>
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
  const [tmpFilterdPhonebook, setFilterdPhonebook] = useState(initialPhonebook);
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
      const newEntry = {
        id: phonebook.length + 1,
        name: newName,
        number: newNumber,
      };
      const updated_phonebook = phonebook.concat(newEntry)
      setPhonebook(updated_phonebook);
      setFilterdPhonebook(updated_phonebook)
      setNewName("");
      setNewNumber("");
    }
  };

  const filterKeywordMatch = (keyword) => {
    return phonebook.filter((contact) =>
      contact.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleKeyword = (event) => {
    console.log("filter")
    const keyword = event.target.value;
    setFilterKeyword(keyword);
    const matches = filterKeywordMatch(keyword);
    if (matches.length !== 0) {
      setFilterdPhonebook(matches);
    } else {
      setFilterdPhonebook([]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPhonebook
        filterKeyword={filterKeyword}
        handleKeyword={handleKeyword}
      />
      <h2>Add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Phonebook phonebook={tmpFilterdPhonebook} />
    </div>
  );
};

export default App;
