const mongoose = require('mongoose');
const httpStatus = require('http-status');
const request = require('supertest');
const app = require('../../index');
const chai = require('chai');


const expect = chai.expect;

chai.config.includeStack = true;

/**
 * root level hooks
 */

after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Expenditure APIs', () => {
    let Expenditure={
        amount:10321312.12,
        date:new Date('2022-05-21T00:00:00.000Z'),
        description:'test',
        title:'test',
        isFixed:false,
    }

    describe('# POST /api/expenditure', () => {
        it("should create a new expenditure", (done) => {
          request(app)
            .post('/api/expenditure')
            .send(Expenditure)
            .expect(httpStatus.CREATED)
            .then((res) => {
              expect(Date(res.body.date)).to.equal(Date(Expenditure.date));
              expect(res.body.description).to.equal(Expenditure.description);
              expect(res.body.title).to.equal(Expenditure.title);
              expect(res.body.isFixed).to.equal(Expenditure.isFixed);
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

});