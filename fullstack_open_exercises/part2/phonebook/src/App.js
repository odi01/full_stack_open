import { useState } from "react";

const App = () => {
  const [contacts, setContact] = useState([
    { name: "Arto Hellas", number: "054-5415482" },
  ]);

  const [newContact, setNewContact] = useState("");

  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const [numbers, setNumbers] = useState([{ number: "054-5415482" }]);
  const [newNumber, setNewNumber] = useState("");

  const handleContactFormChange = (event) => {
    console.log(event.target);
    setNewContact(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const isPersonExist = (newPerson) => {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newPerson.name) {
        return true;
      }
    }
    return false;
  };

  const isNumberExist = (newNumber) => {
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i].number === newNumber.number) {
        return true;
      }
    }
    return false;
  };

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    const newPhone = { number: newNumber };

    if (isPersonExist(newPerson)) {
      alert(`${newPerson.name} is already added to the phonebook`);
    } else if (isNumberExist(newPhone)) {
      alert(`${newPhone.number} is already added to the phonebook`);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNumbers(numbers.concat(newPhone));
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newContact} onChange={handleContactFormChange} />
          <br />
          number:{" "}
          <input value={newContact} onChange={handleContactFormChange} />
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
