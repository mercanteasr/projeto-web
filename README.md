# Corrilet - Projeto de Programação Web Front-End

Projeto da disciplina de Programação Web Front-End (AS62F - UTFPR Cornélio Procópio).

A Corrilet é uma loja de moda masculina fictícia. O site tem uma página principal com os produtos da coleção de inverno, página de cadastro, página de login e um painel admin com funcionalidades em JavaScript (cadastro, listagem, exclusão e pesquisa de usuários usando Local Storage).

**Site publicado:** https://mercanteasr.github.io/projeto-web/

## Funcionalidades

- **Página principal:** banner, vitrine de produtos com janela de inspeção, filtro por categorias e carrinho fictício salvo no Local Storage
- **Cadastro:** formulário com validação de senha, que leva o usuário para a página de login
- **Login:** confere o e-mail e a senha cadastrados (página própria e pop-up na página principal)
- **Admin:** cadastra usuários (nome e e-mail) numa lista com a data de envio, com opções de limpar campos, excluir um item, excluir todos e pesquisar. Os dados ficam numa única chave do Local Storage, em JSON

## Tecnologias

- HTML5
- CSS3
- JavaScript (APIs DOM e Web Storage)

## Estrutura do projeto

```
projeto-web/
├── imgs/            imagens dos produtos e do banner
├── index.html       página principal (produtos, categorias, carrinho e login)
├── cadastro.html    página de cadastro de usuário
├── login.html       página de login
├── admin.html       painel admin (cadastro, listagem, exclusão e pesquisa)
├── elements.css     estilos de todas as páginas
├── global.js        JavaScript do admin, carrinho, categorias, cadastro e login
└── README.md
```

## Como abrir

1. Clone este repositório
2. Abra o arquivo `index.html` no navegador (ou use a extensão Live Server no VS Code)

## Integrantes

- Carlos Eduardo Casu Filho
- Gabriel Campos de Souza
- João Vitor Souza Silva Goulart
- Ricardo Augusto Scalada Mercante
