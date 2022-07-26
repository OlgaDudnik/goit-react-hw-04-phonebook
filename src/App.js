import ContactForm from './Components/ContactForm';
import Contacts from './Components/ContactList';
import Filter from './Components/Filter';
import Section from './Components/Section';
import shortid from 'shortid';
import { useState, useEffect } from 'react';

export default function App() {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const addContact = (name, number) => {
    const newName = {
      id: shortid.generate(),
      name,
      number,
    };

    setContacts(state => {
      if (
        state.every(
          ({ name }) => name.toLowerCase() !== newName.name.toLowerCase()
        )
      ) {
        return [newName, ...state];
      } else {
        alert(`${newName.name} is already in contacts`);
        return state;
      }
    });
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const visibleNames = () => {
    const convertFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(convertFilter)
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter value={filter} onChange={handleChangeFilter} />
        <Contacts contacts={visibleNames()} onDeleteContact={deleteContact} />
      </Section>
    </div>
  );
}
