const fs = require("fs/promises");
// const { nanoid } = require("nanoid");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(contactsPath, "utf-8");
  const parsedData = await JSON.parse(data);
  return parsedData;
}
// listContacts().then((parsedData) => console.log(parsedData));

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();

  const foundData = data.filter((element) => element.id === contactId);
  if (!foundData.length) {
    return null;
  }
  return foundData;
}
// getContactById("sdfsc").then((parsedData) => console.log(parsedData));

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const data = await listContacts();

  const deletedContact = await data.filter(
    (element) => element.id === contactId
  );
  if (!deletedContact.length) {
    return null;
  }
  const dataToWrite = await data.filter((element) => element.id !== contactId);
  const stringifiedData = [JSON.stringify(dataToWrite)];
  fs.writeFile(contactsPath, stringifiedData);
  return deletedContact;
}
// removeContact("rsKkOQUi80UsgVPCcLZZW").then((data) => console.log(data));

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const data = await listContacts();
  data.push({ id: nanoid(), name, email, phone });
  fs.writeFile(contactsPath, JSON.stringify(data));
}

addContact("Ivan", "ian@getMaxListeners.com", "+38094382498").then((data) =>
  console.log(data)
);
