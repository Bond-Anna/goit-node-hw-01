const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(response);
  return contacts;
};

module.exports = listContacts;
