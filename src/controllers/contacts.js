import createHttpError from 'http-errors';

import * as contactServices from '../services/contacts.js';
import { getContactById } from '../services/contacts.js';
import { parsePagination } from '../utils/parsePagination.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePagination(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const contacts = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactsController = async (req, res) => {
  const data = await contactServices.addContacts(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const upsertContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contactServices.updateContact(contactId, req.body);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  const contact = await contactServices.getContactById(contactId);

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const data = await contactServices.deleteContact(contactId);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};
