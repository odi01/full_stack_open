import { useState, useEffect } from "react";
import Form from "./components/Form";
import Phonebook from "./components/Phonebook";
import FilterPhonebook from "./components/FilterPhonebook";
import {
  SuccessAlertMessage,
  FailureAlertMsg,
} from "./components/AlertMessages";
import contactsService from "./services/contacts";

const App = () => {
  const [phonebook, setPhonebook] = useState([]);
  const [filteredPhonebook, setFilteredPhonebook] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filterKeyword, setFilterKeyword] = useState("");

  const [successMessage, setSuccessMessage] = useState();
  const [failureMessage, setFailureMessage] = useState();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => fetchPhonebook(), []);

  useEffect(() => {
    if (successMessage || failureMessage) {
      setShowAlert(true);
      const timeout = setTimeout(() => {
        setShowAlert(false);
        setSuccessMessage();
        setFailureMessage();
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [successMessage, failureMessage]);

  const fetchPhonebook = () => {
    contactsService.getAll().then((contacts) => {
      setPhonebook(contacts);
      setFilteredPhonebook(contacts);
    });
  };

  const createContact = (newContact) => {
    contactsService
      .create(newContact)
      .then((res) => {
        fetchPhonebook();
        setNewName("");
        setNewNumber("");
        setSuccessMessage(newContact.name);
      })
      .catch((res) => {
        setFailureMessage(res.response.data.error);
      });
  };

  const updateContact = (id, newObject) => {
    contactsService
      .update(id, newObject)
      .then(() => {
        setSuccessMessage(newObject.name);
      })
      .catch(() => {
        let errMsg = `Information of ${newObject.name} has already been removed from server`;
        setFailureMessage(errMsg);
      });
    fetchPhonebook();
  };

  const deleteContact = (id) => {
    contactsService.remove(id).then(() => {
      const updatedPhonebook = phonebook.filter((contact) => contact.id !== id);
      setPhonebook(updatedPhonebook);
      setFilteredPhonebook(updatedPhonebook);
    });
  };

  const changeName = (event) => {
    setNewName(event.target.value);
  };

  const changeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const updatePhoneNumber = (name, newPhoneNumber) => {
    const [originalObject] = phonebook.filter(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    const modifiedObject = { ...originalObject, number: newPhoneNumber };
    updateContact(originalObject.id, modifiedObject);
  };

  const isContactNameExist = (name) => {
    return phonebook.some(
      (entry) => entry.name.toLowerCase() === name.toLowerCase()
    );
  };

  const isUpdateNumberApproved = () =>
    window.confirm(
      `${newName} is already added to phonebook, replace the old number with a new one?`
    );

  const addContact = (event) => {
    event.preventDefault();
    if (isContactNameExist(newName)) {
      if (isUpdateNumberApproved()) {
        updatePhoneNumber(newName, newNumber);
      }
    } else {
      const newEntry = {
        name: newName,
        number: newNumber,
        id: phonebook.length + 1,
      };
      createContact(newEntry);
    }
  };

  const filterKeywordMatch = (keyword) => {
    return phonebook.filter((contact) =>
      contact.name.toLowerCase().includes(keyword.toLowerCase())
    );
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

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessAlertMessage message={successMessage} showAlert={showAlert} />
      <FailureAlertMsg msg={failureMessage} showAlert={showAlert} />
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
