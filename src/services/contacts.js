import Contact from '../db/models/contacts.js';

export const getContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (error) {
    throw new Error('Error:', error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact;
  } catch (error) {
    throw new Error('Error:', error);
  }
};

export const addContacts = (payload) => Contact.create(payload);

export const updateContact = async (_id, payload) => {
  const result = await Contact.findOneAndUpdate({ _id }, payload);
  return result;
};

export const deleteContact = async (_id) => {
  const result = await Contact.findOneAndDelete({ _id });
  return result;
};
