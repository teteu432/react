// Para acessar uma imagem enviada:
// http://localhost:3000/static/nomedaimagem

// Importa a biblioteca json-server
// Responsável por criar uma API fake rapidamente
const jsonServer = require("json-server")

// Cria a aplicação/servidor
const server = jsonServer.create()

// Conecta o servidor ao arquivo db.json
// Esse arquivo funciona como o "banco de dados"
const router = jsonServer.router("db.json")

// Middlewares padrões do json-server
// Exemplo: logs, CORS e cache
const middlewares = jsonServer.defaults()

// Biblioteca para trabalhar com caminhos de arquivos/pastas
const path = require("path")

// Biblioteca para manipulação do sistema de arquivos
const fs = require("fs")

// Framework backend Express
const express = require("express")

// Biblioteca responsável pelo upload de arquivos
const multer = require("multer")

// Biblioteca que adiciona autenticação ao json-server
const auth = require("json-server-auth")

// Porta onde o servidor será executado
const port = 3000;

// Variável que armazenará o nome da imagem enviada
let imagem = ""


// ======================================================
// CRIAÇÃO DA PASTA DE IMAGENS
// ======================================================

// Verifica se a pasta "img" existe
if (!fs.existsSync(path.join(__dirname, "img"))) {

    // Caso não exista, cria automaticamente
    fs.mkdirSync(path.join(__dirname, "img"))
}


// ======================================================
// CONFIGURAÇÃO DO MULTER (UPLOAD)
// ======================================================

// Configura como e onde os arquivos serão salvos
let storage = multer.diskStorage({

    // Define a pasta de destino dos uploads
    destination: (req, file, cb) => {

        // Salva os arquivos na pasta img/
        cb(null, path.join(__dirname, "img"))
    },

    // Define o nome do arquivo salvo
    filename: (req, file, cb) => {

        // Gera nome único usando timestamp
        // Exemplo:
        // 1692210839596.jpeg
        imagem = Date.now() + (path.extname(file.originalname) || ".jpg")

        // Finaliza a criação do nome
        cb(null, imagem)
    }
})


// Cria o middleware de upload usando a configuração acima
let upload = multer({ storage })


// ======================================================
// SERVE AS IMAGENS
// ======================================================

// Permite acessar imagens pelo navegador
// Exemplo:
// http://localhost:3000/static/foto.jpeg
server.use("/static", express.static(path.join(__dirname, "img")))


// ======================================================
// MIDDLEWARES
// ======================================================

// Ativa middlewares padrões do json-server
server.use(middlewares)

// Permite upload de arquivos em qualquer rota
server.use(upload.any())


// ======================================================
// MIDDLEWARE PERSONALIZADO
// ======================================================

// Intercepta requisições antes de salvar dados
server.use((req, res, next) => {

    // Verifica se a rota acessada é /users
    if (req.originalUrl === "/users") {

        // Adiciona automaticamente o nome da imagem
        // dentro do objeto enviado
        req.body = {
            ...req.body,
            user_img: imagem
        }
    }

    // Continua para o próximo middleware
    next()
})


// ======================================================
// AUTENTICAÇÃO
// ======================================================

// Ativa login, cadastro e criptografia de senha
server.use(auth)


// ======================================================
// BANCO DE DADOS
// ======================================================

// Disponibiliza o banco do router dentro do server
server.db = router.db

// Ativa as rotas do db.json
server.use(router)


// ======================================================
// INICIALIZAÇÃO DO SERVIDOR
// ======================================================

// Inicia o servidor na porta definida
server.listen(port, () => {

    // Mensagem colorida no terminal
    console.log(
        "\x1b[36m%s\x1b[0m",
        "JSON Server executando na porta: " + port
    )

    // Texto em negrito
    console.log(
        "\x1b[1m%s\x1b[0m",
        "\nRecursos disponíveis: "
    )

    // Rotas disponíveis da API
    console.log("\nhttp://localhost:3000/users")
    console.log("http://localhost:3000/servicos\n")
})