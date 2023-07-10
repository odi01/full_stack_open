import { useState, useEffect } from "react";
import axios from "axios";

const Form = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onAddPerson,
}) => {
  return (
    <form>
      <div>
        name: <input value={newName} onChange={onNameChange} />
        <br />
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={onAddPerson}>
          add
        </button>
      </div>
    </form>
  );
};

const Phonebook = ({ contacts }) => {
  return (
    <table>
      <tbody>
        {contacts.map((contact) => (
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

const FilterPhonebook = ({ filterKeyword, onKeywordChange }) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input value={filterKeyword} onChange={onKeywordChange} />
      </div>
    </form>
  );
};

const App = () => {
  const [phonebook, setPhonebook] = useState([]);
  const [filteredPhonebook, setFilteredPhonebook] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");

  useEffect(() => {
    console.log("request");
    axios.get("http://localhost:3001/persons")
    .then((persons) => {
      setPhonebook(persons.data);
      setFilteredPhonebook(persons.data);
    })
}, [])

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNumber = (event) => {
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
      const updated_phonebook = phonebook.concat(newEntry);
      setPhonebook(updated_phonebook);
      setFilteredPhonebook(updated_phonebook);
      setNewName("");
      setNewNumber("");
    }
  };

  const filterKeywordMatch = (keyword) => {
    return phonebook.filter((contact) =>
      contact.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleKeywordChange = (event) => {
    console.log("filter");
    const keyword = event.target.value;
    setFilterKeyword(keyword);
    const matches = filterKeywordMatch(keyword);
    if (matches.length !== 0) {
      setFilteredPhonebook(matches);
    } else {
      setFilteredPhonebook([]);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPhonebook
        filterKeyword={filterKeyword}
        onKeywordChange={handleKeywordChange}
      />
      <h2>Add a new</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        onNameChange={changeName}
        onNumberChange={changeNumber}
        onAddPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Phonebook contacts={filteredPhonebook} />
    </div>
  );
};

export default App;
