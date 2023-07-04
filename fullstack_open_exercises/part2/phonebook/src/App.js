import { useState } from "react";

const App = () => {
  const [phonebook, setPhonebook] = useState([
    { name: "Arto Hellas", number: "054-5415482" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <div>
      <h2>Phonebook</h2>
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

      <h2>Numbers</h2>
      <table>
        <tbody>
          {phonebook.map((contact, index) => (
            <tr key={index}>
              <td>
                {contact.name} {contact.number}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
