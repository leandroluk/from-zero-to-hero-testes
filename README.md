# **🚀 From Zero to Hero - Testes no Backend 🚀**

Nesse conteúdo será apresentado a ideia do que são testes em software no ponto de vista de uma pessoa desenvolvedora com foco em backend utilizando [NodeJS](https://nodejs.org/en). Os conteúdos aqui apresentados foram levantados com base no meu conhecimento adquirido e em conteúdos diversos. 

Além disso será utilizada como stack de testes a combinação de 4 bibliotecas sendo [Mocha](https://mochajs.org), [Chai](http://chaijs.com), [Sinon](https://sinonjs.org), [Nyc](https://github.com/istanbuljs/nyc) além de outros recursos.

## **Dependências**

- [NodeJS](https://nodejs.org/en/download)
- [VS Code](https://code.visualstudio.com)

## **📚 Dicionário**

- **<u>Stakeholder</u>**: A pessoa que levantou os casos de uso. Normalmente o cliente, aquele que define as funcionalidades do produto no todo.
- **<u>Bug</u>**: Um erro não catalogado sobre um caso de uso. Mal funcionamento ocorrido por incoerência no desenvolvimento, na definição do caso de uso ou no entendimento dos stakeholders para o requisito em si.
- **<u>Feature</u>**: Definição técnica do caso de uso ou de partes do mesmo. Podem ser de evolução ou refatoração de outros requisitos.
- **<u>Product Owner (PO)</u>**: Dono do produto. É aquela pessoa que gerencia casos de uso da solução, conhece o contexto do negócio e que faz a interface entre os stakeholders e a operação (equipe de desenvolvimento do produto).
- **<u>Churn</u>**: Quando o stakeholder ou o usuário do produto perde a confiança e desiste de utilizá-lo.

## **📄 Sumário**

- **[Parte I](#👆-parte-i)**
  - **[O que são testes](#o-que-são-testes)**: fazer uma introdução sobre o que são e contar como era antigamente para que a cultura de testes fosse criada
  - **[Por que testar](#por-que-testar)**: levantar os principais problemas de quando se tem uma solução sem testes, respondendo perguntas como "vale a pena fazer testes?", "demora mais fazer testes?"
  - **[Quando devo testar](#quando-devo-testar)**: definir o que são os códigos que devem ter testes e os que não devem
  - **[O que devo testar](#o-que-devo-testar)**: apresentar os principais comportamentos em funções (call, math, conditional, type, template) e como deve-se testar cada um.
  - **[Como devo testar](#como-devo-testar)**: apresentar as ferramentas (mocha, chai, sino, nyc) usadas em backend para testes, suas peculiaridades (ex, para testar async precisa da chai-as-promised) e boas práticas.
  - **[Tipos de testes](#tipos-de-testes)**: mostrar visivelmente dos 3 principais tipos de testes (unitários, de integração e de ponta-a-ponta), como eles funcionam e o que deve ser testado falando sobre outros tipos de testes como os testes de sobrecarga, resiliência, segurança, etc.
- **[Parte II](#✌️-parte-ii)**
  - **[Testes unitários em JS](#testes-unitários-em-js)**: mostrar testes unitários com funções tendo todos os tipos de comportamentos listados em um exemplo de projeto com MSC
  - **[Testes de integração em JS](#testes-de-integração-em-js)**: mostrar testes de integração no contexto do express, dizendo o que é importante e o que não é e mostrando como mockar um banco de dados
  - **[Testes de ponta-a-ponta em JS](#testes-de-ponta-a-ponta-em-js)**: mostrar os testes utilizando o banco de dados e, como construí-los.
  - **[Diferenças entre TS e JS](#diferenças-entre-ts-e-js)**: mostrar os principais pontos que diferem testes de typescript e javascript e como contorná-los
  - **[Debugando testes](#debugando-testes)**: mostrar como configurar o vscode para testes com a stack tanto em TS quanto em JS

## **👆 Parte I**

### **O que são testes**

Quando se constrói uma solução é comum que sejam avaliados os requisitos que foram desenvolvidos na mesma para garantir que estão de acordo com os casos de uso que foram levantados com os stakeholders. 

Essa avaliação também é conhecida como a "definição de pronto" e, após a afirmação dos requisitos entende-se que alterações nos mesmos são bugs ou novas features. 

Antigamente essas avaliações eram feitas somente pelo Product Owner ou pelo Stakeholder quando utilizava o produto. Isso além de trazer desconforto para o usuário final, também se caracteriza como desperdício de tempo e dinheiro sobre o produto. 

Hoje, com a evolução do processo de desenvolvimento foi criada a cultura de testes que além de atender a "definição de pronto", também garante que a solução esteja atendendo aos requisitos que foram levantados.

### **Por que testar**

Quando se compra um produto ou um serviço, espera-se que o mesmo atenda a uma finalidade com qualidade, agilidade e o menor custo possível. Quando o mesmo falha, além da experiência de um usuário ser prejudicada também gera frustração, levando-o a refletir se era realmente aquele produto o que ele precisava, podendo levar ao churn.

Toda solução é feita para resolver um problema e no ponto de vista comercial também deve dar lucro. Podemos dizer que testar a solução tem uma relação direta com o lucro e por isso relacionamos a palavra "qualidade" à testes. Afinal uma solução que lhe traz uma boa experiência (e sem bugs) é uma solução que atende com excelência seu propósito.

Podemos definir quanto custa um bug dentro de uma solução com base de onde o mesmo é descoberto e o tempo que demora para ser resolvido. Se um bug é identificado ainda na fase de desenvolvimento ele custará muito menos do que se for encontrado pelo usuário e por isso devemos sempre testar.

### **Quando devo testar**

Se refletirmos sobre as afirmações anteriores podemos chegar a conclusão de que os testes são mais que necessários no processo de desenvolvimento. A questão é que da mesma forma que eles representam qualidade no processo eles também têm um custo de seu desenvolvimento pois demanda tempo que poderia ser aplicado em novas features. 

Dependendo do teste ele vai consumir recursos que reflitam a estrutura da solução e que também têm seu custo. Além disso, com a evolução do projeto, os testes também precisam se adaptar e novamente há o custo de uma pessoa fazer as alterações nos mesmos ao invés de focar em evoluções do projeto.

No geral devemos testar os artefatos que foram construídos dentro da solução, evitando excessos, reutilizando recursos, e trabalhando com boas práticas de testes como o padrão de projeto "factory".

### **O que devo testar**

Para garantir a qualidade e ao mesmo tempo economizar recursos para que o produto possa dar lucro, o que realmente deve ser testado? A resposta é os comportamentos. Independente da visão que aplicarmos (micro ou macro) sobre a solução, temos comportamentos diversos e que definem as possibilidades de ocorrências de bug's:

- Se olharmos para as funções que constroem a solução temos o comportamento de cada instrução escrita.  
- Olhando para os processos que utilizam das funções para atender aos requisitos da aplicação, temos o comportamento das integrações entre elas.
- Pensando nos artefatos gerais da solução, existem recursos que são utilizados mas não foram construídos e eles podem apresentar comportamentos não mapeados e que também impactam no resultado final da solução.

Podem existir inúmeros comportamentos dentro da solução sendo que os principais são:

- **<u>Chamada de função (call):</u>** quando uma ou função é chamada em outra função. Normalmente esse tipo de chamada pode ter 2 resultados possíveis sendo o sucesso, retornando um tipo predefinido ou o erro quando é disparada uma exceção. Caso o método tenha outro retorno não mapeado então o mesmo precisa de manutenção.
- **<u>Cálculos matemáticos (math):</u>** quando a função faz algum cálculo matemático e retorna o resultado. Para esse comportamento, deve-se passar valores estáticos e ter os resultados esperados. Também pode ocorrer erros caso haja alguma incoerência matemática.
- **<u>Operadores de condição (condition):</u>** quando se faz verificações de condição como if..else if.. else. Esse tipo de comportamento sempre trará 2 retornos possíveis para cada condição, podendo trazer mais resultados quando se combina operadores diversos.
- **<u>Estrutura de dados (typing):</u>** quando se faz manipulações ou conversões de tipos como converter uma string e um número, desestruturação de um objeto, seleção de um item em uma lista. Nesse tipo de comportamento é validado os comportamentos caso sejam passados tipos incorretos como a falta de propriedades em um objeto e o resultado caso os dados passados estejam corretos.
- **<u>Interpolação de dados (templating):</u>** quando se tem a interpolação de informação para a formação de um determinado template. Nesse caso deve-se ter o template final montado e verificar se a função ao se passar os dados esperados, se o resultado é como o passado.

### **Como devo testar**

Quando se procura sobre testes na internet sempre surgem artigos que falam sobre TDD (Test Driven Design), BDD (Behavior Driven Design) e como essas metodologias são boas práticas em desenvolvimento e que toda empresa deveria utilizá-las, mas se uma pessoa não tem experiência em testes e não sabe o que deve testar e como testar, ela não conseguiria aplicar tais metodologias com excelência. Então vamos focar no que realmente definem os testes, a arquitetura dos mesmos, as estruturas funcionais e técnicas utilizadas para simular e validar os comportamentos de um produto.

Em cada tecnologia se tem uma metodologia diferente para o mesmo, em Angular os testes devem ficar junto dos artefatos que testam, no jest, somos orientados a criar um diretório com o nome "__test__" nos módulos que serão testados, em outras tecnologias haverão outras formas de organizar os testes. 

Independente da tecnologia, o que devemos levar em consideração é que os testes são necessários, mas eles não são os códigos da aplicação e devem ficar separados da mesma. Uma boa estrutura de testes deve refletir a estrutura de diretórios da sua solução, assim ficando fácil de encontrar cada teste ao observar a aplicação.

Olhando os testes, podemos utilizar o método _"Triple A (Arrange, Act, Assert)"_ para estruturar nossos testes. O importante é que cada teste deve ser atômico e não dependente de outros testes ou do resultado dos mesmos, ou seja, não compartilhar o contexto entre os mesmos, pois caso um teste falhe ele pode causar um efeito borboleta em outros testes, trazendo falsos-positivos.

Em backend usamos como stack de testes 4 ferramentas no geral sendo:

- **<u>Mocha:</u>** é um framework construído para a criação e execução de testes.
- **<u>Chai:</u>** é uma biblioteca para fazer a asserção de resultados.
- **<u>Sinon:</u>** é uma biblioteca criada para manipular o comportamento de recursos, permitindo simular os resultados de respostas.
- **<u>Nyc:</u>** é uma biblioteca que analisa os resultados de asserções gerados pelo chai e o mocha, criando relatórios de cobertura sobre o código da aplicação
  
Todas essas bibliotecas são não dependentes de artefatos específicos como bibliotecas para construção de API's (como o Express), ORM's (como o Sequelize) e podem ser utilizadas tanto para o backend quanto para o frontend.

### **Tipos de testes**

Existem diversos tipos de testes que podem ser aplicados em uma solução mas no geral são utilizados 4 tipos de teste:

- **<u>Testes unitários:</u>** são testes que validam o comportamento de um método, função ou artefato dentro de uma solução de forma unitária, simulando o comportamento de suas dependências. 
- **<u>Testes de integração:</u>** são testes que visam o comportamento integrado entre os métodos, funções ou artefatos da solução. Esses testes devem simular o comportamento de artefatos que não são controláveis como API's externas, bancos de dados ou outros serviços.
- **<u>Testes de ponta-à-ponta:</u>** são testes que validam o comportamento descrito nos casos de uso por completo, integrando bancos de dados, API's externas, e os serviços que compõem a aplicação.
- **<u>Testes manuais:</u>** são aqueles testes que são executados após o término de cada feature ou bugfix. Podemos dizer que são os testes mais importantes pois devem ser executados para que possamos validar inicialmente se o que foi desenvolvido atende aos requisitos.

Além desses existem outros tipos de testes que são feitos de forma esporádica, aqui podemos listar algum deles:

- **<u>Testes de resiliência:</u>** quando em uma visão macro da solução são mapeados os principais problemas que podem ocorrer quando um artefato da solução não está funcionando como esperado.
- **<u>Testes de sobrecarga:</u>** quando se prepara um ambiente em que ele será sobrecarregado para ver possíveis falhas com esse tipo de situação e formas de contornar o problema.
- **<u>Testes de segurança:</u>** quando se analisa se há alguma falha de segurança em relação ao acesso aos dados da aplicação, por exemplo se um usuário consegue acessar ambientes que não deveria.
- **<u>Testes de UI/UX:</u>** são feitos normalmente quando ocorre uma grande mudança de design e para um público específico, visando validar a experiência do usuário. Também são chamados de testes "a/b"

## **✌️ Parte II**

### **Configurando um projeto**

1. Para iniciarmos um projeto com a stack crie um repositório e inicie uma aplicação NodeJS na mesma:

    ```
    $ mkdir testes && cd testes && npm init -y && code .
    ```

2. Em seguida instale em modo de desenvolvimento as bibliotecas necessárias:

    ```
    $ npm i -D mocha chai sinon nyc @types/mocha @types/chai @types/sinon
    ```

3. Instale também 2 plugins do chai, necessários para que possamos criar testes assíncronos e os testes de integração ou de ponta-a-ponta:

    ```
    $ npm i -D chai-as-promised chai-http @types/chai-as-promised @types/chai-http
    ```

    > Node que estamos instalando não só as bibliotecas mas também os tipos declarados das mesmas. Mesmo que a aplicação não seja feita em Javascript, ainda é possível aproveitar das declarações de tipos para facilitar o acesso as propriedades das bibliotecas.

4. Crie os diretórios que compõem uma estrutura básica de uma aplicação NodeJS e que é comumente utilizada em projetos pela comunidade:

    - **<u>src:</u>** diretório onde fica os códigos referentes à aplicação
    - **<u>tests:</u>** diretório onde se mantém os códigos dos testes

5. Configure os script's de testes do projeto conforme o arquivo abaixo:

    > package.json
    ```json
    {
      "scripts": {
        /*
        - Executa os tests usando o mocha, procurando por testes no diretório 
          "./tests" e que tenham os pós-fixos ".spec.js" ou ".test.js".
        - Além disso, com o comando "--exit" ele força que os testes sejam 
          encerrados mesmo que ainda existam processos em execução (promises).
        */
        "test": "mocha tests/**/*.{spec,test}.js --exit",
        /*
        - Coleta a cobertura de testes usando o nyc com base no 
          comando de configuração anterior
        */
        "test:coverage": "nyc npm run test"
      },
    }
    ```

6. Agora precisamos criar um arquivo `.nycrc` para configurar a biblioteca nyc no diretório raiz da aplicação:

    ```json
    {
      // roda todos os arquivos de testes no diretório de testes
      "all": true,
      // inclue todos os arquivos no diretório `src`
      "include": [ "src/**" ],
      // exclui arquivos que normalmente não são testáveis como no ex:
      "exclude": [ "src/**/index.js" ]
    }
    ```

Feito isso agora já podemos iniciar as aplicações e em seguida criar os testes. Note que os os arquivos observados devem ter os pós-fixos `.spec.js` ou `.test.js`. 

Normalmente utiliza-se a definição **"spec"** para testes unitários pois especificam os comportamentos dos métodos de uma aplicação e **"test"** para testes de integração. 

> Essas denominações são não-dependentes a stack's de desenvolvimento (como Angular, React, Vue, etc) e a stack's de teste (como a apresentada agora ou o Jest).

### **Testes unitários em JS**

Como já definimos anteriormente, devemos testar os comportamentos existentes na solução para garantir seu funcionamento e nos testes unitários validamos cada instrução conforme os comportamentos citados anteriormente. Vamos ver alguns exemplos atômicos de cada comportamento e como devem ser construídos

#### **Chamada de função (call)**

Vejam um exemplo de código que representa uma chamada de função:

> `src/call/service.js`
```javascript
const service = {
  getById: async (id) => { /* código aqui... */ }
}

module.exports = service
```

> `src/call/controller.js`
```javascript
const service = require('./service')

const controller = {
  getById: async (id) => await service.getById(id)
}

module.exports = controller 
```

No exemplo acima, o método `controller.getById` chama o método `service.getById`. Nessa situação podemos esperar somente 2 comportamentos sendo:

- **falha** quando o service dispara um erro inesperado
- **sucesso** quando o service retorna o resultado esperado

Podemos dizer que em comportamentos do tipo de chamada de função que sempre haverão os comportamentos acima, sendo que, dependendo da estrutura do service pode ser que hajam mais situações de falha.

Para testarmos a função `controller.getById` podemos fazer da seguinte maneira:

```javascript
// importações das bibliotecas
const { expect, use } = require('chai')
const sinon = require('sinon')
// usa o plugin do chai para trabalhar com funções assíncronas de forma
// mais fácil
const chaiAsPromised = require('chai-as-promised')
// importações dos elementos do teste
const controller = require('../../src/call/controller')
const service = require('../../src/call/service')

use(chaiAsPromised)

// definição do teste (normalmente usado o path do arquivo na pasta de `src`)
describe('call/controller', () => { 
  // remove qualquer alteração de comportamento usada em algum teste
  beforeEach(sinon.restore) 

  // descreve qual método será testado dentro do controller
  describe('getById', () => { 
    // verifica o comportamento de falha
    it('falha quando o service dispara um erro inesperado', () => { 
      // manipula a dependencia para obrigar o comportamento
      sinon.stub(service, 'getById').rejects() 
      // espera que o controller dispare um erro pois ele não trata
      // os erros do service
      expect(controller.getById(0)).to.eventually.be.rejected
    })

    // verifica o comportamento de sucesso
    it('sucesso quando o service retorna o resultado esperado', () => { 
      // manipula a demepndência para obrigar o comportamento
      sinon.stub(service, 'getById').resolves(0)
      // testa o que foi retornado do service
      expect(controller.getById(0)).to.eventually.equal(0)
    })
  })
})
```

#### **Cálculos matemáticos (math)**

Em situações em que existem cálculos matemáticos é necessário testar se o valor resultante realmente é o esperado. Ex:

> src/math/service.js

```javascript
const service = {
  sum: (a, b) => a + b
}

module.exports = service
```

Para a função acima podemos definir que o teste a ser feito é somente no valor resultante visto que não há outros comportamentos, Veja:

```javascript
// importações das bibliotecas
const { expect } = require('chai')
// importações dos elementos do teste
const service = require('../../src/math/service')

// definição do teste (normalmente usado o path do arquivo na pasta de `src`)
describe('math/service', () => { 
   // descreve qual método será testado dentro do service
  describe('sum', () => {
    // verifica o comportamento de sucesso
    it('sucesso caso a soma de 2 com 2 seja 4', () => {
      // valida o comportamento
      expect(service.sum(2,2)).to.equal(4)
    })
  })
})
```

#### **Operadores de condição (condition)**



### **Testes de integração em JS**

text

### **Testes de ponta-a-ponta em JS**

text

### **Diferenças entre TS e JS**

text

### Debugando testes

text
