import Contact from '../db/models/contacts.js';
import { countPaginationData } from '../utils/countPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });
    const totalItems = await Contact.countDocuments();

    const paginationData = countPaginationData({ totalItems, page, perPage });

    return { contacts, page, perPage, totalItems, ...paginationData };
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
