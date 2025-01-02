import * as authServices from '../services/auth.js';

export const registerController = async (req, res) => {
  const users = await authServices.register(req.body);
  const { name, email, createdAt, updatedAt } = users.toObject();

  return res.status(200).json({
    status: 201,
    message: 'Successfully registered user!',
    data: { name, email, createdAt, updatedAt },
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  return res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
