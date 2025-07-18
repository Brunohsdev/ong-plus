const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const ErrorResponse = require('../utils/errorResponse');

// Proteger rotas
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Verificar se o token existe
  if (!token) {
    return next(new ErrorResponse('Não autorizado a acessar esta rota', 401));
  }

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = await Usuario.findById(decoded.id);

    next();
  } catch (err) {
    return next(new ErrorResponse('Não autorizado a acessar esta rota', 401));
  }
};

// Autorizar por tipo de usuário
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.tipo)) {
      return next(
        new ErrorResponse(
          `Usuário do tipo ${req.usuario.tipo} não está autorizado a acessar esta rota`,
          403
        )
      );
    }
    next();
  };
};