const { v4 } = require('uuid');

const listContacts = require('./listContacts');
const updatedContacts = require('./updateContacts');

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  if (allContacts.find(contact => contact.phone === newContact.phone)) {
    throw new Error(
      `Contact with phone number ${newContact.phone} is alredy in contact list`
    );
    return;
  }
  allContacts.push(newContact);
  await updatedContacts(allContacts);
  return newContact;
};

module.exports = addContact;
