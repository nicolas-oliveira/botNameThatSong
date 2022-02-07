## Index

- [Tech Stack](#tech-stack)
- [Dependências](#dependências)
- [Orquestrador](#orquestrador)
- [Instalação e Execução](#instalação-e-execução)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Logs](#logs)
- [Configuração](#config)
- [Documentação para Devs](#node-docs)
- [Equipe](#squad-ômega)
- [Extra](#extra)

# NameThatSong

Esse projeto é um Bot de WhatsApp que:
- Reconhece a música tocada no áudio enviado pelo usuário
- também reconhece a música que o usuário falou ou cantou 
- também pode procurar músicas com a letra que o usuário enviou por texto.

Ao achar a música no áudio, o Bot pode enviar a letra da música ou enviar um preview caso pedido pelo usuário.


## Dependências
É necessário ter as chaves / tokens com contas ativas nas seguintes plataformas:
- ZenviaSDK | AudD | GeniusAPI | Google Cloud Platform

Bibliotecas e ferramentas necessárias:
- yarn ou npm
- MongoDB
- Typescript
- Express
- Nodejs >= 12.13.0

## Orquestrador

Nesse projeto, um Orquestrador foi criado do zero para organizar o fluxo do Bot, possibilitando que **novos fluxos sejam criados a partir dele**, podendo ter qualquer objetivo já que a criação de novos nós (clasess) é genérico e multi-uso. Outra função é gerenciar as mensagens recebidas pela Zenvia.

O objetivo é que qualquer desenvolvedor possa fazer um Bot de maneira rápida utilizando esse projeto.

## Como o Orquestrador funciona

![Fluxo](https://i.imgur.com/Y9iuCcC.jpg)


## Node Flow

Os Nós (Nodes) são classes com IDs específicos que rodam
um pedaço da lógica do Bot. 


Os nós podem ser executados por outros nós ou pela interação do usuário.

Todo nó recebe algum tipo de input ou informação extra.

Para saber mais como nós funcionam, [clique aqui](#node-docs).

## Instalação e Execução

Versão Recomendada NodeJS: v12.13.0

```bash
  git clone https://github.com/NameThatSong/Orchestrator.git
```
```bash
  cd Orchestrator
```
```bash
  yarn install
```
  Para development:
```bash
  yarn dev
```
  Para production:
```bash
  yarn build
```
```bash
  yarn start
```


Depois de rodar o programa, é necessário configurar a sua conta Zenvia.

É recomendável ler [a documentação da Zenvia](https://zenvia.github.io/zenvia-openapi-spec/v2/#section/Getting-started-with-Sandbox) para ter um guia caso não conheça a plataforma.
    
## Variáveis de Ambiente

Para o Bot funcionar, é necessário as chaves:

```env
ZENVIA_TOKEN=Token da Zenvia

AUDD_TOKEN=Token da AudD

GOOGLE_APPLICATION_CREDENTIALS=Credenciais baixadas da plataforma do Google (default: gcp_credentials.json)

GENIUS_TOKEN=Credenciais da API do Genius

MONGODB_URL=Url de Conexão do MongoDB

CHANNEL=whatsapp
```

## Logs

O Bot mantém logs separados pelo dia atual, por exemplo:

![Exemplo Logs](https://i.imgur.com/7kJDsRz.png)

## Config

Esta configuração altera valores importantes no Bot. Caso esteja em prod, a configuração estará em [build/config.ts](build/config.ts), caso contrário, em [src/config.ts](src/config.ts).

```js
const config = {
    DEBUG // Se o Bot está em modo Debug

    RESET_TIME // Quanto tempo deve passar desde a última interação para o Bot reiniciar a interação do usuário

    MINIMUM_SEARCH_LENGTH // Mínimo de caracteres necessários para o Bot considerar como pesquisa por letra da música
    
    MAXIMUM_SEARCH_LENGTH // Máximo número de caracteres em pesquisa por letra da música

    MINIMUM_AUDIO_FILE_SIZE // Tamanho mínimo de arquivo de áudio

    MAX_GENIUS_RESULTS // Quantos resultados devem retornar pro usuário

    AUDIO_SAMPLE_RATE // Sample Rate do Áudio dos usuários (Isso será alterado no futuro)
}
```

## Node Docs

Para criar um nó você precisa colocar uma classe nova dentro de uma pasta especificada:

```ts
import AbstractNode from "../core/cortex/abstract-node";
import { UserInput } from "../core/cortex/input-types";

export default class Teste extends AbstractNode {

    public getID(): string {
        return "node_aRkA3kaM1lBVI20"; // Cada nó deve possuir um ID único para identificação e execução
    }

    public async run(input: UserInput): Promise<void> {
        

    }

}
```
Dentro da classe `run()` a lógica pode ser feita conforme a necessidade do desenvolvedor. As possibilidades são:
```ts
 if (input.isAudio()) {
      // Verifica se a input é audio  
  }
```

```ts
if (input.getMessage() === "Oi") {
    // Executa esse bloco de código se a mensagem for igual a 'Oi'

    // Roda o Nó de ID 2 com a mesma input recebida por esse Nó
    this.runNode(2, input);
}
```

```ts
if (input.getMessage() === "Quem é você?") {

// Envia uma mensagem de texto para o usuário
this.sendTextMessage("Olá, sou um Bot Teste!"); 

// Envia uma mensagem de audio para o usuário, o tipo deve ser especificado (mpeg, mp4, etc)
this.sendAudioMessage("url-do-audio", "audio/mpeg");
}
```

```ts
// É possível setar variáveis para este usuário específico
// Para que no futuro elas possam ser recuperadas
this.setGlobals({"idade": 25});
this.setGlobals({"nome": "Marcela"},{"hobby": "vôlei"});

this.getGlobals("hobby"); // Retorno: "vôlei"
this.getGlobals("idade", "nome"); // Retorno: {idade: 25, nome: "Marcela"}

// Na próxima vez que o usuário interagir, ele será mandado para este nó
this.setNextInteractionNode("node_m29alPcm27BAkl");
```

## Squad Ômega

- Ana Luiza Monteiro
- Gabriel Freitas
- Marcos Flávio Kicis
- Nicolas Oliveira


## Extra

**Árvore Inicial do Bot**

Árvore utilizada como referência para o desenvolvimento do fluxo
![Fluxo](https://i.imgur.com/zjfdgBU.png)
