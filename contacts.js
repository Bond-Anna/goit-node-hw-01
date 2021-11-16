const fs = require('fs/promises');
const path = require('path');

const { v4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

const updatedContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(response);
  return contacts;
};

const getContactById = async contactId => {
  const allContacts = await listContacts();
  const contact = allContacts.find(cont => cont.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

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

const updateByName = async (name, email, phone) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(cont => cont.name === name);
  if (idx === -1) {
    return null;
  }
  allContacts[idx] = { id: v4(), name, email, phone };
  await updatedContacts(allContacts);
  return allContacts[idx];
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(cont => cont.id === contactId);
  if (idx === -1) {
    return null;
  }
  const removedContact = allContacts.splice(idx, 1);
  await updatedContacts(allContacts);
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateByName,
  removeContact,
};
