# Ki-Limpinho 💦🚗

![logo](testes-integracao/src/resources/logoRodas.svg) 

**Código da Disciplina**: FGA0208<br>
**Número do Grupo**: 02<br>

## Alunos 🤓
|Matrícula | Aluno |
| -- | -- |
| 18/0074741  |  [Caio Martins Ferreira](https://github.com/linktocaio) |
| 19/0042419  |  [Davi Matheus da Rocha de Oliveira](https://github.com/DaviMatheus) |
| 17/0144488  |  [Henrique Amorim](https://github.com/HenriqueAmorim20) |
| 18/0103580  |  [Jonathan Jorge Barbosa Oliveira](https://github.com/Jonathan-Oliveira) |
| 18/0105345  |  [Lucas Lima Ferraz](https://github.com/mibasFerraz) |
| 18/0125885  |  [Lucas Melo dos Santos](https://github.com/luucas-melo) |
| 19/0058650  |  [Natanael Fernandes Coelho Filho](https://github.com/fernandes-natanael) |
| 17/0122468  |  [Nilvan Peres Costa](https://github.com/NilvanPeres) |
| 18/0011308  |  [Peniel Etèmana Désirez-Jésus Zannoukou](https://github.com/zpeniel09) |
| 18/0078640  |  [Yuri Alves Bacarias](https://github.com/yuriAlves5) |

## Sobre 🤔
Você trabalhou a semana toda e decide fazer aquela viagem no sábado que tanto sonhava, acorda cedo para levar o carro para lavar, e depois tem que ficar horas esperando o carro ficar pronto, triste né. É pior ainda quando você é um gerente de uma empresa e tem que além de gerenciar os funcionários, lidar com ações repetitivas da gerência financeira, 😨.

É por isso que a Ki-limpinho fornece uma aplicação web que ajuda ao cliente no monitoramento do veículo e ao gerente na organização do lava-jato e gerência das finanças. Com ela, o cliente consegue manter contato com o lava-jato e acompanhar o status do carro, já o gerente pode visualizar dashboards, planilhas, etc. que fornece a liquidez mensal e entre outros fatores importantes para a gestão do lava-jato.

# Tecnologias [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

[![Build Status](https://img.shields.io/travis/kunalkapadia/express-mongoose-es6-rest-api/master.svg?style=flat-square)](https://travis-ci.org/kunalkapadia/express-mongoose-es6-rest-api)
[![Coverage Status](https://img.shields.io/coveralls/kunalkapadia/express-mongoose-es6-rest-api/master.svg?style=flat-square)](https://coveralls.io/github/kunalkapadia/express-mongoose-es6-rest-api?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/kunalkapadia/express-mongoose-es6-rest-api.svg?style=flat-square)](https://codeclimate.com/github/kunalkapadia/express-mongoose-es6-rest-api)
[![bitHound Overall Score](https://www.bithound.io/github/kunalkapadia/express-es6-rest-api-starter/badges/score.svg)](https://www.bithound.io/github/kunalkapadia/express-es6-rest-api-starter)
[![bitHound Dependencies](https://www.bithound.io/github/kunalkapadia/express-mongoose-es6-rest-api/badges/dependencies.svg)](https://www.bithound.io/github/kunalkapadia/express-mongoose-es6-rest-api/master/dependencies/npm)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![MIT License](https://img.shields.io/npm/l/stack-overflow-copy-paste.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![Support via Paypal](https://img.shields.io/badge/support-paypal-yellowgreen.svg?style=flat-square)](https://www.paypal.me/KunalKapadia)

# [![Express ES6 REST API Starter](https://cloud.githubusercontent.com/assets/4172932/12660610/90f5b856-c63a-11e5-878e-c9f0bbf33090.jpg)](https://github.com/kunalkapadia/express-mongoose-es6-rest-api)

## Sponsor
You can support the project by checking out our sponsor page. It takes only one click:

<a href="https://tracking.gitads.io/?repo=express-mongoose-es6-rest-api" target="_blank"> <img src="https://images.gitads.io/express-mongoose-es6-rest-api" alt="Some great stuff" style="height: auto !important;width: auto !important;"/> </a>

## Overview

This is a boilerplate application for building REST APIs in Node.js using ES6 and Express with Code Coverage and JWT Authentication. Helps you stay productive by following best practices. Follows [Airbnb's Javascript style guide](https://github.com/airbnb/javascript).

Heavily inspired from [Egghead.io - How to Write an Open Source JavaScript Library](https://egghead.io/courses/how-to-write-an-open-source-javascript-library).

### Features

| Feature| Summary  |
|--|--|
| ES6 via Babel                  	 	 | ES6 support using [Babel](https://babeljs.io/).  |
| Authentication via JsonWebToken                  	 	 | Supports authentication using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).  |
| Code Linting               			 | JavaScript code linting is done using [ESLint](http://eslint.org) - a pluggable linter tool for identifying and reporting on patterns in JavaScript. Uses ESLint with [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which tries to follow the Airbnb JavaScript style guide.                                                                                                |
| Auto server restart                  	 | Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made, with babel compilation and eslint.                                                                                                                                                                            |
| ES6 Code Coverage via [istanbul](https://www.npmjs.com/package/istanbul)                  | Supports code coverage of ES6 code using istanbul and mocha. Code coverage reports are saved in `coverage/` directory post `yarn test` execution. Open `coverage/lcov-report/index.html` to view coverage report. `yarn test` also displays code coverage summary on console. Code coverage can also be enforced overall and per file as well, configured via .istanbul.yml                                                                                                                                                                            |
| Debugging via [debug](https://www.npmjs.com/package/debug)           | Instead of inserting and deleting console.log you can replace it with the debug function and just leave it there. You can then selectively debug portions of your code by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console.                       |
| Promisified Code via [bluebird](https://github.com/petkaantonov/bluebird)           | We love promise, don't we ? All our code is promisified and even so our tests via [supertest-as-promised](https://www.npmjs.com/package/supertest-as-promised).                       |
| API parameter validation via [express-validation](https://www.npmjs.com/package/express-validation)           | Validate body, params, query, headers and cookies of a request (via middleware) and return a response with errors; if any of the configured validation rules fail. You won't anymore need to make your route handler dirty with such validations. |
| Pre-commit hooks           | Runs lint and tests before any commit is made locally, making sure that only tested and quality code is committed
| Secure app via [helmet](https://github.com/helmetjs/helmet)           | Helmet helps secure Express apps by setting various HTTP headers. |
| Uses [yarn](https://yarnpkg.com) over npm            | Uses new released yarn package manager by facebook. You can read more about it [here](https://code.facebook.com/posts/1840075619545360) |

- CORS support via [cors](https://github.com/expressjs/cors)
- Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code. It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code.
- Has `.editorconfig` which helps developers define and maintain consistent coding styles between different editors and IDEs.

## Como rodar?

Pré-requisitos, ter o docker e o docker-compose instalados na máquina a qual deseja rodar o projeto.

Clonando o projeto:
```sh
git clone git@github.com:UnBArqDsw2021-2/2021.2_G2_Ki-Limpinho_Backend.git

cd 2021.2_G2_Ki-Limpinho_Backend
```

Subindo o container docker:
```sh
docker-compose up
```

Pronto, agora você já pode acessar a REST APT do projeto de Ki-limpinho, o acesso estará disponível pela porta 4040.

Entre em seu navegador padrão pela porta <http://localhost:4040>.

Obrigado por contribuir para a ki-limpinho, qualquer dúvida fale com a nossa equipe.
