1. Padrão de arquivos e arquitetura
A estrutura de arquivos deve seguir uma separação clara de responsabilidades, evitando que componentes de UI concentrem regras de negócio, comunicação com API ou gerenciamento de estado que pertençam a outras camadas.

Regras
O código deve ser organizado por responsabilidade.
A lógica de UI deve permanecer nos componentes.
Hooks customizados devem encapsular lógica reutilizável relacionada à UI, estado local ou estado/comunicação de servidor.
O estado global deve ser organizado em uma store, subdividida em slices quando o zustand for utilizado.
A comunicação com APIs deve permanecer na camada de services.
Cada service deve possuir uma responsabilidade específica.
Exemplos:

services/
├── login-service.ts
├── register-service.ts
├── get-products-service.ts
└── create-order-service.ts
Nomeação
Todos os arquivos devem utilizar kebab-case.

Exemplos:

login-service.ts
register-form.tsx
use-product-search.ts
product-card.tsx
auth-provider.tsx
Não utilizar:

loginService.ts
LoginService.ts
useProductSearch.ts


2. Hooks customizados
Hooks customizados devem ser utilizados para encapsular lógica reutilizável e evitar que componentes fiquem excessivamente complexos.

Um hook customizado deve ter uma das seguintes responsabilidades:

Gerenciar estado local complexo de um componente.
Encapsular lógica de interação com o usuário.
Gerenciar estado de servidor.
Encapsular comunicação indireta com services.
Compor outros hooks quando isso melhorar a organização da lógica.
A comunicação HTTP não deve ser implementada diretamente dentro de componentes.

Evitar:

function Login() {
  async function handleSubmit() {
    await fetch("/api/login");
  }
}
Preferir:

Component
   ↓
Hook
   ↓
Service
   ↓
API
Exemplo:

const { mutate, isPending } = useLogin();
com a comunicação HTTP permanecendo em:

login-service.ts
Hooks não devem ser criados apenas para abstrair código trivial sem necessidade de reutilização ou organização.



3. Camada de Network
A camada de network da aplicação deve estar concentrada na camada de services.

Os services são responsáveis por:

Realizar requisições HTTP.
Configurar método HTTP.
Enviar headers.
Enviar autenticação quando necessário.
Serializar dados enviados.
Interpretar respostas.
Normalizar erros da API.
Centralizar configurações relacionadas à comunicação externa.
Exemplo:

Component
   ↓
Hook
   ↓
Service
   ↓
HTTP/API
Componentes não devem realizar chamadas HTTP diretamente.

Hooks também não devem conter detalhes de implementação da API quando esses detalhes puderem permanecer no service.


4. Tree shaking


O código deve permitir que o bundler elimine código não utilizado.

Preferir imports específicos:

import { format } from "date-fns";
em vez de padrões que possam trazer módulos desnecessários:

import * as dateFns from "date-fns";
A aplicação deve evitar dependências com grande impacto no bundle quando existir uma alternativa equivalente e significativamente menor.

Code splitting
Quando uma funcionalidade não for necessária no carregamento inicial, considerar carregamento sob demanda.

Exemplo:

const Chart = dynamic(() => import("./chart"));
Exemplos de candidatos:

Gráficos.
Editores.
Modais complexos.
Componentes administrativos.
Bibliotecas de mapas.
Funcionalidades acessadas somente após uma interação.
Componentes visualmente ou computacionalmente pesados.

5. Performance — Renderização
A aplicação deve minimizar renders desnecessários e trabalho computacional durante a renderização.

Regras obrigatórias
Manter componentes pequenos e com responsabilidades bem definidas.
Evitar atualizar estados em componentes de escopo maior do que o necessário.
Colocar o estado o mais próximo possível de onde ele é utilizado.
Evitar prop drilling excessivo quando uma solução de composição ou estado apropriado for mais adequada.
Não utilizar memoização automaticamente.
Utilizar useMemo quando houver cálculo suficientemente custoso ou quando a estabilidade da referência for necessária para evitar trabalho/renderizações desnecessárias.
Utilizar useCallback quando a estabilidade da função tiver impacto real na renderização ou no comportamento de componentes dependentes.
Utilizar React.memo quando houver benefício mensurável ou uma razão arquitetural clara para evitar renders.
Não utilizar memoização em componentes simples apenas por convenção.
Evitar cálculos pesados durante cada render.
Evitar criar estruturas de dados complexas desnecessariamente durante a renderização.
Evitar efeitos (useEffect) para derivar valores que podem ser calculados diretamente durante a renderização.
Evitar atualizar estado dentro de efeitos quando o valor puder ser derivado de props ou estado existente.
A regra geral é:

Não memoizar por padrão.
Memoizar quando houver custo ou necessidade de estabilidade de referência.

6. Princípios fundamentais
1.1 Single Responsibility Principle
Cada componente deve possuir uma responsabilidade clara.

Evite componentes que simultaneamente:

Buscam dados.
Processam regras de negócio complexas.
Gerenciam múltiplos estados.
Controlam navegação.
Renderizam grandes quantidades de UI.
Contêm regras de formatação.
Contêm componentes visuais profundamente aninhados.
Evite
function ProductPage() {
  // busca dados
  // valida permissões
  // calcula preço
  // controla carrinho
  // controla modal
  // renderiza toda a página
  // trata erros
  // faz navegação
}
Prefira
function ProductPage() {
  return (
    <>
      <ProductHeader />
      <ProductDetails />
      <ProductActions />
      <RelatedProducts />
    </>
  );
}
A página deve funcionar principalmente como um compositor de componentes.