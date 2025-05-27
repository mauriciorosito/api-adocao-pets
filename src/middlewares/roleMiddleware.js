// Middleware que verifica se o usuário possui uma das roles permitidas. 
const authorizeRoles = (allowedRoles) => {
  return (req, res, next) => {
    // Verifica se o authMiddleware populou req.user
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Acesso negado: permissão insuficiente' });
    }
    // Permissão concedida
    next();
  };
};

module.exports = authorizeRoles;
