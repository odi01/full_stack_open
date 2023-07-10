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

export default Phonebook
