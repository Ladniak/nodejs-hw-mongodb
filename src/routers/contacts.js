import express from 'express';
import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));
contactsRouter.get(
  '/:contactId',
  ctrlWrapper(contactsController.getContactByIdController),
);

export default contactsRouter;
