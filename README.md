# React + TypeScript + Vite
# Libris

Uma aplicação web para descobrir livros, consultar seus detalhes e organizar uma estante pessoal. As buscas usam dados reais da Google Books API, com paginação, filtros e tratamento de estados de carregamento e erro.

## Deploy

[Acessar o Libris publicado](https://react-frontend-challenge-five.vercel.app/)

## Stack

- React 19 com TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand para estado global e persistência da estante e do tema
- TanStack Query para buscas e detalhes de livros
- TanStack Form e Zod para o formulário de login e validação
- Lucide React para ícones
- Vitest e Testing Library para testes
- Google Books API como fonte de dados

## Como rodar

Pré-requisito: Node.js instalado.

```bash
npm install
npm run dev
```

Depois, abra a URL exibida pelo Vite, normalmente `http://localhost:5173`.

Para validar o projeto ou gerar a build de produção:

```bash
npm run test:run
npm run lint
npm run build
```

### Variáveis de ambiente

A variável `VITE_GOOGLE_BOOKS_API_KEY` é opcional. A aplicação funciona sem chave para uso simples, mas a API pode aplicar limites de requisição menores. Para configurar uma chave localmente, copie [.env.example](.env.example) para `.env` e preencha o valor.

## Credenciais de demo

O login é uma simulação local, sem backend. Não existe uma conta fixa: use qualquer e-mail válido e uma senha com pelo menos 7 caracteres. Por exemplo:

```text
E-mail: leitor@teste.com
Senha: segredo123
```

A sessão é armazenada no `localStorage` e pode ser encerrada pelo menu da conta.

## Principais decisões arquiteturais

- As páginas ficam em `src/pages`, os componentes são separados por domínio em `src/components`, e os comportamentos de tela ficam em hooks.
- A comunicação com fontes externas é isolada em `src/services`, deixando a interface independente da Google Books API e da simulação de autenticação.
- A estante e o tema usam slices separados no Zustand, com persistência local quando aplicável.
- As respostas incompletas da Google Books API são normalizadas para contratos internos de livro, com valores de fallback e conversão de capas para HTTPS.
- As buscas usam debounce e cancelamento de requisições antigas para evitar concorrência enquanto o usuário digita.
- As rotas protegidas exigem uma sessão local antes de renderizar descoberta, estante e detalhes.

Para o detalhamento das decisões de arquitetura e do fluxo Git, consulte [ARCHITECTURE.md](ARCHITECTURE.md).
