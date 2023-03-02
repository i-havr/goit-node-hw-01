const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const parsedContacts = JSON.parse(contacts);
    console.table(parsedContacts);
    return parsedContacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();

    const selectedContact = contacts.find(({ id }) => id == contactId);
    console.table(selectedContact);
    if (!selectedContact) {
      return null;
    }
    return selectedContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(({ id }) => id != contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    await listContacts();
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = [
      ...contacts,
      { id: (contacts.length + 1).toString(), name, email, phone },
    ];

    await fs.writeFile(contactsPath, JSON.stringify(newContact), "utf8");
    await listContacts();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
