require('dotenv').config(); // Carrega variáveis do .env
const app = require('./src/app');

// Usa a porta do .env ou padrão 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
