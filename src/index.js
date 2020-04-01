//importação de bibliotecas Express e CORS
const express = require('express');
const cors = require('cors');

//Importação das rotas da API
const routes = require('./routes');

//Configuração das bibliotecas + Passagem das rotas
const app = express();
app.use(cors())
app.use(express.json())
app.use(routes)

//"Setagem" de porta localhost
app.listen(3333);