## Libris

Gerenciador de biblioteca pessoal construído com React, TypeScript e Vite. A aplicação usa a Google Books API para pesquisar livros, consultar detalhes e permitir que o usuário mantenha uma estante local.

### Requisitos

- Node.js 20 ou superior
- npm 10 ou superior

### Como executar

```bash
npm install
npm run dev
```

Abra a URL informada pelo Vite no navegador.

### Credenciais de demonstração

Use as seguintes credenciais para acessar a aplicação:

- E-mail: `lucas@email.com`
- Senha: `1234567`

### Google Books API

A aplicação funciona sem `VITE_GOOGLE_BOOKS_API_KEY`: as pesquisas e os detalhes continuam sendo consultados diretamente na Google Books API. Nesse modo, a API aplica limites de uso menores.

Para aumentar a cota disponível, crie um arquivo `.env` a partir de `.env.example` e informe uma chave opcional:

```dotenv
VITE_GOOGLE_BOOKS_API_KEY=sua_chave_opcional
```

Quando a API estiver indisponível ou o limite de requisições for atingido, a aplicação apresenta o erro retornado em vez de substituir os resultados por dados locais.

### Scripts

```bash
npm run dev
npm run build
npm run lint
npm test
```
