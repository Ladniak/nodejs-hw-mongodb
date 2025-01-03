import express from 'express';
import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import {
  contactsAddShema,
  contactsUpdateShema,
} from '../validation/contacts.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactsController.getContactsController));
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactsAddShema),
  ctrlWrapper(contactsController.addContactsController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactsUpdateShema),
  ctrlWrapper(contactsController.patchContactsController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(contactsController.deleteContactController),
);

export default contactsRouter;
