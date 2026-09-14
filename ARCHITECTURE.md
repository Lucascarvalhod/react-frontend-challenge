*Sobre o fluxo Git*

Como se trata de um desafio individual com prazo curto (7 dias), optei por um fluxo simplificado baseado no GitHub Flow / trunk-based adaptado:

Fork do repositório;
Branch de feature única partindo da main (feature/desenvolvimento-da-área-administrativa-do-usuário);
Commits semânticos ao longo de todo o desenvolvimento;
PR final para a main do meu fork;

Decidi não criar uma branch development nem múltiplas feature branches granulares porque, em um contexto solo e de tempo limitado, isso geraria overhead desnecessário sem trazer ganho real de colaboração ou integração contínua. O foco ficou em manter o histórico limpo, legível e rastreável via commits semânticos, que é o principal sinal de maturidade que buscamos avaliar em desafios desse tipo. Em um ambiente de time real eu seguiria o GitFlow completo (ou o fluxo adotado pela empresa) com development + branches feat/fix por história.

*Sobre a estrutura de pastas*

O projeto foi organizado por responsabilidade, para manter a camada visual desacoplada das regras de negócio e de acesso a dados:

- `pages/` reúne as telas associadas às rotas da aplicação: descoberta, estante e detalhe do livro.
- `components/` concentra componentes reutilizáveis, subdivididos por domínio (`auth/` e `books/`) e por elementos de interface compartilhados (`ui/`).
- `hooks/` encapsula os comportamentos das telas, como autenticação, busca com debounce, consulta de detalhes, formulário de login, tema e gerenciamento da estante.
- `services/` é a fronteira com fontes externas ou de infraestrutura. Nela estão a comunicação com a Google Books API e a simulação do login.
- `store/` contém o estado global persistido com Zustand, separado em slices de biblioteca e tema.
- `types/` centraliza os contratos TypeScript utilizados no mapeamento dos dados de livros.
- `lib/` guarda utilitários transversais, e os testes ficam próximos aos componentes, hooks e store que exercitam.

Essa divisão permite que páginas priorizem composição, componentes priorizem apresentação e interações, hooks concentrem estado e comunicação com a API, e serviços lidem com I/O. Assim, a troca da API ou a inclusão de um backend não exige reestruturar a interface inteira.

*Sobre a autenticação sem backend*

Como o desafio não fornece uma API de autenticação, implementei uma sessão local de demonstração. O serviço de login valida e-mail e senha com Zod; quando os critérios são atendidos, grava um identificador gerado por `crypto.randomUUID()` no `localStorage`. O logout remove essa chave.

As rotas de descoberta, estante e detalhe são envolvidas por um componente de proteção que consulta a existência da sessão antes de renderizá-las, redirecionando visitantes sem sessão para `/login`. A solução representa o fluxo de navegação e o ciclo de sessão esperado pela interface, mas não deve ser tratada como mecanismo de segurança: em produção, a validação seria feita no servidor, com tokens ou cookies seguros e controle de autorização no backend.

*Sobre os desafios da Google Books API*

A resposta da Google Books API possui metadados incompletos e variáveis entre os volumes. Por isso, o serviço normaliza cada resposta para um tipo interno de livro e define valores de fallback para título, autores, data, editora, descrição e capa. As miniaturas também são convertidas de HTTP para HTTPS, evitando conteúdo misto em ambientes seguros.

A API pode funcionar sem chave para consultas simples, mas esse modo tem limites de uso mais restritivos. A chave `VITE_GOOGLE_BOOKS_API_KEY` é opcional e é adicionada à URL apenas quando configurada. O tratamento de erros distingue livro não encontrado, limite de requisições (429), indisponibilidade do serviço (5xx) e falha de rede, permitindo mensagens adequadas na interface.

Por fim, as buscas são paginadas com `startIndex`, limitadas a dez itens por consulta e recebem um `AbortSignal` do React Query. O cancelamento evita que requisições antigas concorram com buscas mais recentes enquanto o usuário digita, comportamento complementado por um debounce de 400 ms no campo de pesquisa.