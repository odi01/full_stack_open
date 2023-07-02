import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const isPersonExist = (newPerson) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newPerson.name) {
        return true;
      }
    }
    return false;
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    if (!isPersonExist(newPerson)) {
      setPersons(persons.concat(newPerson));
      setNewName("");
    } else {
      alert(`${newPerson.name} is already added to the phonebook`);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
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
          {persons.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
