const bcrypt = require('bcryptjs');

// Gera um hash criptografado da senha usando bcrypt 
const hashPassword = async (password) => {
    const saltRounds = 8; // Pode ser ajustado conforme a necessidade
    return await bcrypt.hash(password, saltRounds);
};

// Compara uma senha em texto com um hash já salvo no banco 
const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword,
};
