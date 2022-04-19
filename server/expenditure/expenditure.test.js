const mongoose = require('mongoose');
const httpStatus = require('http-status');
const request = require('supertest');
const app = require('../../index');
const chai = require('chai');
const Expenditure = require("./expenditure.model");
const { beforeEach } = require('mocha');

const expect = chai.expect;

chai.config.includeStack = true;

const ignoredFields = ['_id','created_at', '__v', /detail.*_info/];
/**
 * root level hooks
 */
let expenditures=[];
 for (var i=0; i<30; i++) {
  expenditures.push({
    amount: Math.floor(Math.random() * 100),
    date: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)),
    description: "Teste",
    title: "Teste",
    isFixed: Math.random() < 0.5,
  });
}
for (var i=0; i<20; i++) {
  expenditures.push({
      amount: Math.floor(Math.random() * 100),
      description: "Teste",
      title: "Teste",
      date: new Date("2020-05-1"),
      isFixed: true,
    }
  );
}
/** clear database and populate the database before all tests */
beforeEach(async () => {
  await Expenditure.deleteMany({});
  await Expenditure.insertMany(expenditures);
});


after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.dropDatabase();
  mongoose.connection.close();
  done();
});

describe('## Expenditure APIs', () => {

  let expenditure = {
    amount: Math.floor(Math.random() * 100),
    date: new Date(+(new Date()) - Math.floor(Math.random()*10000000000)),
    description: "Teste",
    title: "Teste",
    isFixed: Math.random() < 0.5,
  };

    describe('# POST /api/expenditure', () => {
        it("should create a new expenditure", (done) => {
          request(app)
            .post('/api/expenditure')
            .send(expenditure)
            .expect(httpStatus.CREATED)
            .then((res) => {
              expect(Date(res.body.date)).to.equal(Date(expenditure.date));
              expect(res.body.description).to.equal(expenditure.description);
              expect(res.body.title).to.equal(expenditure.title);
              expect(res.body.isFixed).to.equal(expenditure.isFixed);
              done();
            }
          )
          .catch(done);
      });
      it("should not create a new expenditure", (done) => {
        request(app)
          .post('/api/expenditure')
          .send({})
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.equal(`\n "amount" is required\n "date" is required\n "description" is required\n "title" is required\n "isFixed" is required`);
            done();
          }
        ).catch(done);
  });
});

    describe('# GET /api/expenditure/', () => {
      it("should get from first page", (done) => {
        request(app)
          .get('/api/expenditure')
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.length).to.equal(20);                    
            expect(res.headers.hasOwnProperty('x-total-count')).to.equal(true);
            expect(res.headers['x-total-count']).to.equal('50');
            done();

          }
        ).catch(done);
      });
      it("should get from second page", (done) => {
        request(app)
          .get('/api/expenditure/?pagina=2&tamanhoPagina=20')
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.headers.hasOwnProperty('x-total-count')).to.equal(true);
            expect(res.headers['x-total-count']).to.equal('50');
            expect(res.body.length).to.equal(10);
            done();

          }
        ).catch(done);
        });
        it("should get all expenditure from month 05 of 2020", (done) => {
          request(app)
            .get('/api/expenditure/?tamanhoPagina=20&filtros={"date": "2020-05-11T21:35:59.187Z"}')
            .expect(httpStatus.OK)
            .then((res) => {
              expect(res.headers.hasOwnProperty('x-total-count')).to.equal(true);
              expect(res.headers['x-total-count']).to.equal('20');
              expect(res.body.length).to.equal(20);
              done();
  
            }
          ).catch(done);
          });
          it("should get all expenditure from month 05 of 2020", (done) => {
            request(app)
              .get('/api/expenditure/?filtros={"isFixed":true}')
              .expect(httpStatus.OK)
              .then((res) => {
                expect(res.headers.hasOwnProperty('x-total-count')).to.equal(true);
                expect(Number(res.headers['x-total-count'])).greaterThanOrEqual(20);
                expect(res.body.length).greaterThanOrEqual(20);
                done();
    
              }
            ).catch(done);
            });
  });

});