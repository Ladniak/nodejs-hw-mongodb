import Contact from '../db/models/contacts.js';
import { countPaginationData } from '../utils/countPaginationData.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = 'asc',
  userId,
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find({ userId })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder });
    const totalItems = await Contact.countDocuments({ userId });

    const paginationData = countPaginationData({ totalItems, page, perPage });

    return { contacts, page, perPage, totalItems, ...paginationData };
  } catch (error) {
    throw new Error('Error:', error.message);
  }
};

export const getContact = (filter) => Contact.findOne(filter);

export const addContacts = (payload) => Contact.create(payload);

export const updateContact = async (filter, payload, options = {}) => {
  const { upsert = false } = options;
  const result = await Contact.findOneAndUpdate(filter, payload, {
    upsert,
    includeResultMetadata: true,
  });

  if (!result || !result.value) return null;

  const isNew = Boolean(result.lastErrorObject.upserted);

  return {
    isNew,
    data: result.value,
  };
};

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);
