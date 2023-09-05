# Trybe Futebol Clube

## Descrição do projeto

O Projeto TFC é um site dedicado a fornecer informações detalhadas sobre partidas e classificações de futebol. O objetivo deste projeto foi criar um robusto back-end dockerizado e uma API utilizando a metodologia TDD (Desenvolvimento Orientado por Testes). Além disso, as aplicações foram integradas por meio do Docker Compose, garantindo que elas funcionem perfeitamente, conectando-se a um banco de dados.

A abordagem baseia-se em modelagem de dados eficiente usando o Sequelize. Uma característica fundamental é a necessidade de autenticação por token para adicionar uma partida, o que exige que os usuários estejam autenticados para efetuar alterações. Foi estabelecido um relacionamento entre as tabelas "teams" e "matches" para garantir que as partidas sejam atualizadas de forma precisa e consistente.

O objetivo central foi criar um back-end sólido e altamente escalável que cumpra todas as regras de negócio do projeto. Isso permite alimentar adequadamente a tabela no front-end, garantindo que as informações sejam apresentadas de maneira clara e acessível aos usuários do sistema.

## Tecnologias, ferramentas e habilidades utilizadas
- TypeScript
- MySQL
- Node.js 
-  Express
- Mocha, Chai e Sinon
- Docker
- JWT
- Sequelize
- Testes unitários e de integração
- Arquitetura em camadas
- Programação orientada a objetos

  ## Como executar o projeto

<br/>

```bash
# Clone ou baixe o repositório
git clone git clone git@github.com:LarissaSimoes/project_trybe_futebol_clube.git
# Entre no diretório
cd project_trybe_futebol_clube
# Instale as dependências
npm i && npm run install:front && npm run install:back
# Inicie o Docker Compose
cd app && docker-compose up
```

<br /><hr /><br />

<p align='center'>
  Desenvolvido por <b>Larissa Simões</b>
  <br/><br/>

  <a href="https://www.linkedin.com/in/dev-larissa-carneiro-simoes/">
    <img alt="linkedIn" height="30px" src="https://i.imgur.com/TQRXxhT.png" />
  </a>
  &nbsp;&nbsp;
</p>

