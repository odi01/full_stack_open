const Phonebook = ({ contacts, onDeleteContact }) => {
  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) {
      onDeleteContact(contact.id);
      alert(`${contact.name} deleted`);
    }
  };

  return (
    <table>
      <tbody>
        {contacts.map((contact) => (
          <tr key={contact.id}>
            <td>
              {contact.name} {contact.number}{" "}
              <button onClick={() => deleteContact(contact)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Phonebook;
