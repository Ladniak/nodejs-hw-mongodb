import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { getContacts } from './services/contacts.js';
import { getContactById } from './services/contacts.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  const corsMiddleware = cors();
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(corsMiddleware);
  app.use(logger);

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Failed to get contacts', error: error.message });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    try {
      const contact = await getContactById(contactId);

      if (!contact) {
        return res.status(404).json({
          message: 'Contact not found',
        });
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Something went wrong',
        error: error.message,
      });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};
