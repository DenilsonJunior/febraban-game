# Flamboyant Framework

A framework trabalha com a [*Flamboyant Engine*](https://gitlab.com/learning_solutions/flamboyant/flamboyant-engine/blob/master/README.md)

## Inicialização do repositório para desenvolvimento

Os pré-requisitos para o uso são:

1. Ter NodeJS v10.10.0 instalado
2. Ter GIT instalado
3. Ter chaves SSH criadas no diretório "pasta de usuario"/.ssh/

### Inicializando e Atualizando dependências de build

-> Use o comando `npm i` para instalar e preparar o ambiente do projeto.

-> Baixar o `Flamboyant-cli tool` dentro da pasta do projeto: 
`npm i -g git+ssh://git@gitlab.com:learning_solutions/flamboyant/flamboyant-cli.git`

-> `fb -h`: Lista os comandos disponíveis.

-> `fb i`: Instala as dependências que estão na flamboyant.json.

-> `fb dev`: Constrói o projeto (dist e config) e abre no navegador padrão.

### Para gerar o config.js
User o comando `fb config` para a criação do arquivo config.js.

### Para gerar o pacote scorm
User o comando `fb scorm`.

### Caso o Fb não funcione globalmente

Instale localmente no projeto pelo comando:
`npm i git+ssh://git@gitlab.com:learning_solutions/flamboyant/flamboyant-cli.git`

Para utilizar a ferramenta utilize desta forma:

npx fb -h


Instalando no MAC

Instalar o MVN para instalar uma versão específica do onde v10.10.10

Instalar o MVN
https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/


nano .bash_profile 

Adicionar a linha abaixo:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

Gerar a chave da seguinte maneira:
ssh-keygen -p -m PEM -f ~/.ssh/id_rsa

# Responsáveis
* Leandro Soares - leandro.soares@afferolab.com.br
* Bruna Freitas - bruna.escudelario@afferolab.com.br