import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/academia';
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado!'))
  .catch(err => console.error('Erro ao conectar no MongoDB:', err));

// Schema e Model
const empresaSchema = new mongoose.Schema({
  nomeEmpresa: String,
  cnpj: String,
  emailEmpresa: String,
  telefoneEmpresa: String,
  responsavel: String,
  senha: String
});
const Empresa = mongoose.model('Empresa', empresaSchema);

// Rotas
app.get('/empresas', async (req, res) => {
  const empresas = await Empresa.find();
  res.json(empresas);
});

app.post('/empresas', async (req, res) => {
  const { nomeEmpresa, cnpj, emailEmpresa, telefoneEmpresa, responsavel, senha } = req.body;
  if (!nomeEmpresa || !cnpj || !emailEmpresa || !senha) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando.' });
  }
  const empresaExistente = await Empresa.findOne({ cnpj });
  if (empresaExistente) {
    return res.status(409).json({ error: 'CNPJ já cadastrado.' });
  }
  const empresa = new Empresa({ nomeEmpresa, cnpj, emailEmpresa, telefoneEmpresa, responsavel, senha });
  await empresa.save();
  res.status(201).json(empresa);
});

app.post('/empresas/login', async (req, res) => {
  const { cnpj, senha } = req.body;
  const empresa = await Empresa.findOne({ cnpj });
  if (!empresa || empresa.senha !== senha) {
    return res.status(401).json({ error: 'CNPJ ou senha inválidos.' });
  }
  res.json({ message: 'Login realizado com sucesso!', empresa });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
