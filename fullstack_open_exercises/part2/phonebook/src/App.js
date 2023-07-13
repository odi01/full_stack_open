import { useState, useEffect } from "react";
import Form from "./components/Form";
import Phonebook from "./components/Phonebook";
import FilterPhonebook from "./components/FilterPhonebook";
import contactsService from "./services/contacts";

const App = () => {
  const [phonebook, setPhonebook] = useState([]);
  const [filteredPhonebook, setFilteredPhonebook] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterKeyword, setFilterKeyword] = useState("");

  useEffect(() => fetchContacts(), []);

  const fetchContacts = () => {
    contactsService.getAll().then((contacts) => {
      setPhonebook(contacts);
      setFilteredPhonebook(contacts);
    });
  };

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const isContactNameExist = (name) => {
    return phonebook.some(
      (entry) => entry.name.toLowerCase() === name.toLowerCase()
    );
  };

  const updatePhoneNumber = (name, newPhoneNumber) => {
    const originalObject = phonebook.filter(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )[0];
    const modifiedObject = { ...originalObject, number: newPhoneNumber };
    contactsService.update(originalObject.id, modifiedObject).then(() => {
      console.log(`Successfull the updated new phone number`);
      fetchContacts();
    });
  };

  const addContact = (event) => {
    event.preventDefault();
    if (isContactNameExist(newName)) {
      const isUpdateContact = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (isUpdateContact) {
        updatePhoneNumber(newName, newNumber);
      }
    } else {
      handleNonExistContact();
    }
  };

  const filterKeywordMatch = (keyword) => {
    return phonebook.filter((contact) =>
      contact.name.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const handleNonExistContact = () => {
    const newEntry = {
      name: newName,
      number: newNumber,
      id: phonebook.length + 1,
    };
    contactsService.create(newEntry).then((res) => {
      const updated_phonebook = phonebook.concat(res);
      setPhonebook(updated_phonebook);
      setFilteredPhonebook(updated_phonebook);
      setNewName("");
      setNewNumber("");
    });
  };

  const handleKeywordChange = (event) => {
    const keyword = event.target.value;
    setFilterKeyword(keyword);
    const matches = filterKeywordMatch(keyword);
    if (matches.length !== 0) {
      setFilteredPhonebook(matches);
    } else {
      setFilteredPhonebook([]);
    }
  };

  const deleteContact = (id) => {
    contactsService.remove(id).then(() => {
      const updatedPhonebook = phonebook.filter((contact) => contact.id !== id);
      setPhonebook(updatedPhonebook);
      setFilteredPhonebook(updatedPhonebook);
    });
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
        onAddContact={addContact}
      />
      <h2>Numbers</h2>
      <Phonebook contacts={filteredPhonebook} onDeleteContact={deleteContact} />
    </div>
  );
};

export default App;
