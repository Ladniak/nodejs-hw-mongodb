import express from 'express';
import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));
contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsController.getContactByIdController),
);

contactsRouter.post('/', ctrlWrapper(contactsController.addContactsController));

contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(contactsController.upsertContactsController),
);

contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
