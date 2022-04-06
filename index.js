const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const util = require("util");
// config should be imported before importing any other file
const config = require("./config/config");
const app = require("./config/express");

const debug = require("debug")("kilimpinho-backend:index");

// make bluebird default Promise
Promise = require("bluebird"); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
(async () => {
  let mongoUri = config.mongo.host;
  if (config.env == "test") {
    const mongod = new MongoMemoryServer();
    await mongod.start();
    mongoUri = mongod.getUri();
  }
  await mongoose.connect(mongoUri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  });
})();

mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set("debug", (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
