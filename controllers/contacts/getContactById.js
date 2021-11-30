const listContacts = require('./listContacts');

const getContactById = async contactId => {
  const allContacts = await listContacts();
  const contact = allContacts.find(cont => cont.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

module.exports = getContactById;
