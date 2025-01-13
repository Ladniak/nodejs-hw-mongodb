import createHttpError from 'http-errors';

import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import * as contactServices from '../services/contacts.js';
import { parsePagination } from '../utils/parsePagination.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { page, perPage } = parsePagination(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId: _id } = req.params;

  const contact = await contactServices.getContact({ _id, userId });

  if (!contact) {
    res.status(404).json({
      status: 404,
      message: `Contact with id ${_id} not found.`,
    });
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${_id}!`,
    data: contact,
  });
};

export const addContactsController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  try {
    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const contactData = { ...req.body, userId, photo: photoUrl };

    const data = await contactServices.addContacts(contactData);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { contactId: _id } = req.params;
  const { _id: userId } = req.user;

  const data = await contactServices.deleteContact({ _id, userId });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

export const patchContactsController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;

  let photoUrl;

  try {
    if (photo) {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    }

    const result = await contactServices.updateContact(
      { _id: contactId },
      { ...req.body, photo: photoUrl },
    );

    if (!result) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: `Successfully patched a contact!`,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
