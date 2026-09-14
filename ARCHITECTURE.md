*Sobre o fluxo Git*

Como se trata de um desafio individual com prazo curto (7 dias), optei por um fluxo simplificado baseado no GitHub Flow / trunk-based adaptado:

Fork do repositório;
Branch de feature única partindo da main (feature/desenvolvimento-da-área-administrativa-do-usuário);
Commits semânticos ao longo de todo o desenvolvimento;
PR final para a main do meu fork;

Decidi não criar uma branch development nem múltiplas feature branches granulares porque, em um contexto solo e de tempo limitado, isso geraria overhead desnecessário sem trazer ganho real de colaboração ou integração contínua.O foco ficou em manter o histórico limpo, legível e rastreável via commits semânticos, que é o principal sinal de maturidade que buscamos avaliar em desafios desse tipo. Em um ambiente de time real eu seguiria o GitFlow completo (ou o fluxo adotado pela empresa) com development + branches feat//fix/ por história.