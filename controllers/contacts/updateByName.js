const { v4 } = require('uuid');

const listContacts = require('./listContacts');
const updatedContacts = require('./updateContacts');

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

module.exports = updateByName;
