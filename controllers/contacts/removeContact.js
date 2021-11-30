const listContacts = require('./listContacts');
const updatedContacts = require('./updateContacts');

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
module.exports = removeContact;
